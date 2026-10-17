import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { SERVICES } from "../../../lib/content";

// Lightweight in-memory rate limiter: 5 submissions per 15 minutes per IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "local";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many requests from this address. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success, store nothing.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.length > 0) {
    return NextResponse.json({ reference: "AC-" + Date.now().toString(16).slice(-6).toUpperCase() });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const service = String(body.service || "").trim();
  const message = String(body.message || "").trim();

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Name is required (max 120 characters)." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (company.length > 120) {
    return NextResponse.json({ error: "Organization name is too long." }, { status: 400 });
  }
  if (!SERVICES.some((s) => s.name === service)) {
    return NextResponse.json({ error: "Select a valid service." }, { status: 400 });
  }
  if (!message || message.length > 4000) {
    return NextResponse.json({ error: "Message is required (max 4000 characters)." }, { status: 400 });
  }

  try {
    const saved = await prisma.contactRequest.create({
      data: { name, email, company, service, message }
    });
    const reference =
      "AC-" + saved.id.toString(16).padStart(6, "0").toUpperCase();
    return NextResponse.json({ ok: true, reference });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not save your request. If this is a fresh install, run: npx prisma db push"
      },
      { status: 500 }
    );
  }
}
