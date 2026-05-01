// app/api/send-email/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: track requests per IP (in-memory, resets on server restart)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per IP per window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, message, communicationMethods, formType } =
      body;

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (name.trim().length > 200) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (email.trim().length > 254) {
      return NextResponse.json(
        { error: "Email is too long." },
        { status: 400 },
      );
    }
    if (phone && (typeof phone !== "string" || phone.length > 30)) {
      return NextResponse.json({ error: "Invalid phone." }, { status: 400 });
    }
    if (message && (typeof message !== "string" || message.length > 5000)) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }
    if (
      communicationMethods !== undefined &&
      (!Array.isArray(communicationMethods) ||
        communicationMethods.some(
          (m) => typeof m !== "string" || m.length > 50,
        ))
    ) {
      return NextResponse.json(
        { error: "Invalid communication methods." },
        { status: 400 },
      );
    }
    if (formType !== "enquire" && formType !== "contact") {
      return NextResponse.json(
        { error: "Invalid form type." },
        { status: 400 },
      );
    }

    // Sanitize all user input before embedding in HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : "";
    const safeMessage = message
      ? escapeHtml(message.trim()).replace(/\n/g, "<br/>")
      : "";
    const safeMethods = communicationMethods
      ? communicationMethods.map((m) => escapeHtml(m)).join(", ")
      : "";

    let htmlContent = "";
    let subject = "";

    if (formType === "enquire") {
      subject = `New Enquiry from ${safeName}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7ead7;">
          <h2 style="color: #312618; border-bottom: 2px solid #ed5c3f; padding-bottom: 10px;">New Enquiry</h2>

          <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safePhone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>` : ""}
            ${safeMessage ? `<p style="margin: 10px 0;"><strong>Message:</strong><br/>${safeMessage}</p>` : ""}
            ${safeMethods ? `<p style="margin: 10px 0;"><strong>Preferred Communication:</strong> ${safeMethods}</p>` : ""}
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #c2b49b; text-align: center; color: #666;">
            <p style="margin: 5px 0; font-size: 14px;">The Lake by Placemakers</p>
            <p style="margin: 5px 0; font-size: 12px;">This email was sent from the website contact form</p>
          </div>
        </div>
      `;
    } else {
      subject = `New Contact from ${safeName}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7ead7;">
          <h2 style="color: #312618; border-bottom: 2px solid #ed5c3f; padding-bottom: 10px;">New Contact Message</h2>

          <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safePhone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>` : ""}
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #c2b49b; text-align: center; color: #666;">
            <p style="margin: 5px 0; font-size: 14px;">The Lake by Placemakers</p>
            <p style="margin: 5px 0; font-size: 12px;">This email was sent from the website contact form</p>
          </div>
        </div>
      `;
    }

    await resend.emails.send({
      from: "The Lake Website <info@thelake.ge>",
      to: process.env.CONTACT_EMAIL,
      replyTo: safeEmail,
      subject,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
