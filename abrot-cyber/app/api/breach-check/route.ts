import { NextResponse } from "next/server";

// Simulated breached-credential dataset. In a real k-anonymity service
// (like Have I Been Pwned) only a 5-char hash prefix is ever exchanged.
const MOCK_PREFIXES = [
  "a1b2c",
  "0f3e7",
  "5d9c1",
  "7f2a8",
  "b4e6d",
  "c8a92",
  "e5f01",
  "9d3b4",
  "3a7c5",
  "f1e2d"
];

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const prefix = typeof body?.prefix === "string" ? body.prefix : "";
    if (!/^[0-9a-f]{5}$/.test(prefix)) {
      return NextResponse.json(
        { error: "Invalid request. Send the first 5 hex characters of a SHA-256 hash." },
        { status: 400 }
      );
    }
    const found = MOCK_PREFIXES.includes(prefix);
    return NextResponse.json({
      found,
      note: found
        ? "Hash prefix " + prefix + " matched the simulated breach dataset (k = unknown, prefix only)."
        : "Hash prefix " + prefix + " had no match among " + MOCK_PREFIXES.length + " simulated breach records."
    });
  } catch {
    return NextResponse.json(
      { error: "Breach check failed. Run: npx prisma db push" },
      { status: 500 }
    );
  }
}
