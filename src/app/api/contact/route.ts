import { NextResponse } from "next/server";

const SUBJECT_LABELS: Record<string, string> = {
  general: "General Inquiry",
  support: "Technical Support",
  feedback: "Feedback",
  partnership: "Partnership / Schools",
  other: "Other",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subjectKey = typeof body.subject === "string" ? body.subject : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  // Honeypot: report success to bots without sending an email.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (
    name.length < 2 ||
    name.length > 100 ||
    !isEmail(email) ||
    email.length > 254 ||
    !SUBJECT_LABELS[subjectKey] ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Please check your name, email, subject, and message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "hello@schoolhomeworkhelper.com";

  if (!apiKey || !from) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      { error: "Contact delivery is temporarily unavailable. Please email us directly." },
      { status: 503 }
    );
  }

  const subject = `[Website ${SUBJECT_LABELS[subjectKey]}] ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${SUBJECT_LABELS[subjectKey]}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ ok: true });
    }

    const details = await response.text();
    console.error("Resend contact delivery failed:", response.status, details);
  } catch (error) {
    console.error("Resend contact delivery request failed:", error);
  }

  return NextResponse.json(
    { error: "We could not send your message. Please try again or email us directly." },
    { status: 502 }
  );
}
