import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const requiredFields = ["fullName", "email", "subject", "message"] as const;

type ContactPayload = Record<(typeof requiredFields)[number], string>;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const missingField = requiredFields.find((field) => !body?.[field]?.trim());

    if (missingField) {
      return NextResponse.json(
        { error: `Missing required field: ${missingField}` },
        { status: 400 }
      );
    }

    const { fullName, email, subject, message } = body as ContactPayload;

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL ?? gmailUser;

    if (!gmailUser || !gmailAppPassword || !recipient) {
      console.error("Contact API: Missing email environment variables");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword
      }
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${fullName}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin-bottom: 0.5rem;">Yeni iletişim formu mesajı</h2>
          <p style="margin: 0.3rem 0;"><strong>İsim:</strong> ${fullName}</p>
          <p style="margin: 0.3rem 0;"><strong>E-posta:</strong> ${email}</p>
          <p style="margin: 0.3rem 0;"><strong>Konu:</strong> ${subject}</p>
          <hr style="margin: 1rem 0; border: none; border-top: 1px solid #eee;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API: Failed to send message", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
