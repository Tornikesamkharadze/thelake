// app/api/send-email/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, communicationMethods, formType } =
      body;

    // Debug logging - Environment Variables
    console.log("=== EMAIL SEND ATTEMPT ===");
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_SECURE:", process.env.SMTP_SECURE);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);
    console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL);
    console.log("Form Type:", formType);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Enable debug output
      logger: true, // Log to console
    });

    console.log("Transporter created successfully");

    // Verify connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      throw verifyError;
    }

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

    console.log("Attempting to send email...");
    console.log("From:", process.env.SMTP_USER);
    console.log("To:", process.env.CONTACT_EMAIL);

    // Send email
    const info = await transporter.sendMail({
      from: `"The Lake Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: subject,
      html: htmlContent,
      replyTo: email,
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return NextResponse.json(
      { message: "Email sent successfully", messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== EMAIL ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Full error:", error);

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}