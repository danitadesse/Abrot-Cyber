"use client";

import { useState } from "react";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function BreachChecker() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ found: boolean; note: string } | null>(null);
  const [error, setError] = useState("");

  async function check() {
    setError("");
    setResult(null);
    const value = email.trim();
    if (!value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy(true);
    try {
      // k-anonymity style: only the first 5 hex chars of the SHA-256
      // of the email ever leave the browser.
      const prefix = (await sha256Hex(value.toLowerCase())).slice(0, 5);
      const res = await fetch("/api/breach-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefix })
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Check failed. Is the dev server running with the database pushed?");
      } else {
        setResult(body);
      }
    } catch {
      setError("Could not reach the breach-check API.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Breach Exposure Checker</h2>
        <span className="chip neutral">k-anonymity</span>
      </div>
      <div className="panel-body">
        <label htmlFor="breach-email">Email to check</label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            id="breach-email"
            className="mono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="off"
          />
          <button className="btn" type="button" disabled={busy} onClick={check}>
            {busy ? "Checking..." : "Check"}
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
        {result && (
          <div className={"notice " + (result.found ? "bad" : "ok")} style={{ marginTop: 14 }}>
            {result.found
              ? "This address appears in the simulated breach dataset. If it were real: change the password now, enable MFA, and stop reusing it anywhere else."
              : "No exposure found in the simulated breach dataset. Keep it that way: unique passwords and MFA everywhere."}
            <div className="sub" style={{ marginTop: 6 }}>{result.note}</div>
          </div>
        )}
        <p className="tool-disclaimer" style={{ marginTop: 14 }}>
          Educational simulation only. This checks a small local mock dataset, not any
          real breach database. Only a 5-character hash prefix is ever sent to the
          server, mirroring the k-anonymity model used by real breach-notification
          services.
        </p>
      </div>
    </div>
  );
}
