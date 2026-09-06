import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * The contact form's only backend: receives a lead, validates it
 * server-side (never trust the client), and emails it to KITE via Resend.
 * No database, no queue — a contact form doesn't need one, and adding
 * either would be an unrequested extra service. RESEND_API_KEY is read
 * only here, so it never reaches the browser bundle.
 */

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  needs?: unknown;
  message?: unknown;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const company = asTrimmedString(body.company);
  const message = asTrimmedString(body.message);
  const needs = Array.isArray(body.needs) ? body.needs.filter((n): n is string => typeof n === "string") : [];

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@kitegrowth.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "KITE Website <onboarding@resend.dev>";

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    company && `Company: ${company}`,
    needs.length > 0 ? `Needs: ${needs.join(", ")}` : "Needs: (none selected)",
    "",
    "Message:",
    message || "(none)",
  ].filter((line): line is string => line !== "");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New project inquiry — ${name}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected send failure:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
