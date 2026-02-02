// app/api/send-email/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, communicationMethods, formType } =
      body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content based on form type
    let htmlContent = "";
    let subject = "";

    if (formType === "enquire") {
      subject = `New Enquiry from ${name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7ead7;">
          <h2 style="color: #312618; border-bottom: 2px solid #ed5c3f; padding-bottom: 10px;">New Enquiry</h2>
          
          <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            ${message ? `<p style="margin: 10px 0;"><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
            ${communicationMethods ? `<p style="margin: 10px 0;"><strong>Preferred Communication:</strong> ${communicationMethods.join(", ")}</p>` : ""}
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #c2b49b; text-align: center; color: #666;">
            <p style="margin: 5px 0; font-size: 14px;">The Lake by Placemakers</p>
            <p style="margin: 5px 0; font-size: 12px;">This email was sent from the website contact form</p>
          </div>
        </div>
      `;
    } else {
      // Contact form
      subject = `New Contact from ${name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7ead7;">
          <h2 style="color: #312618; border-bottom: 2px solid #ed5c3f; padding-bottom: 10px;">New Contact Message</h2>
          
          <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #c2b49b; text-align: center; color: #666;">
            <p style="margin: 5px 0; font-size: 14px;">The Lake by Placemakers</p>
            <p style="margin: 5px 0; font-size: 12px;">This email was sent from the website contact form</p>
          </div>
        </div>
      `;
    }

    // Send email
    await transporter.sendMail({
      from: `"The Lake Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "tornikesamkharadzee@gmail.com",
      subject: subject,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 },
    );
  }
}
