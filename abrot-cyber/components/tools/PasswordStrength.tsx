"use client";

import { useState } from "react";

type Checklist = { label: string; ok: boolean };

function charsetSize(pw: string): number {
  let size = 0;
  if (/[a-z]/.test(pw)) size += 26;
  if (/[A-Z]/.test(pw)) size += 26;
  if (/[0-9]/.test(pw)) size += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) size += 33;
  return size;
}

function crackTime(entropy: number): string {
  // 10 billion guesses per second (offline GPU attack)
  const seconds = Math.pow(2, entropy) / 1e10;
  if (seconds < 1) return "instantly";
  const units: [number, string][] = [
    [60, "seconds"],
    [60, "minutes"],
    [24, "hours"],
    [365, "days"],
    [100, "years"],
    [1e10, "centuries"]
  ];
  let v = seconds;
  let unit = "seconds";
  for (const [div, name] of units) {
    if (v < div) { unit = name; break; }
    v = v / div;
    unit = name;
  }
  if (unit === "centuries") {
    return v > 1e6 ? "millions of centuries" : Math.round(v).toLocaleString("en-US") + " centuries";
  }
  const n = v >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
  return n + " " + unit;
}

export default function PasswordStrength() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const size = charsetSize(pw);
  const entropy = pw.length === 0 ? 0 : Math.round(pw.length * Math.log2(size || 1));
  const checks: Checklist[] = [
    { label: "At least 12 characters", ok: pw.length >= 12 },
    { label: "Contains lowercase letters", ok: /[a-z]/.test(pw) },
    { label: "Contains uppercase letters", ok: /[A-Z]/.test(pw) },
    { label: "Contains digits", ok: /[0-9]/.test(pw) },
    { label: "Contains symbols", ok: /[^a-zA-Z0-9]/.test(pw) }
  ];
  const passed = checks.filter((c) => c.ok).length;
  const score = Math.min(100, Math.round((entropy / 80) * 100));
  const verdict =
    pw.length === 0 ? { cls: "", text: "Enter a password to analyze" } :
    entropy < 36 ? { cls: "bad", text: "Very weak - trivially cracked" } :
    entropy < 60 ? { cls: "warn", text: "Moderate - vulnerable to offline attacks" } :
    { cls: "ok", text: "Strong - impractical to crack offline" };

  const barColor = verdict.cls === "bad" ? "var(--bad)" : verdict.cls === "warn" ? "var(--warn)" : "var(--ok)";

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Password Strength Meter</h2>
        <span className={"chip " + (verdict.cls || "neutral")}>{verdict.text}</span>
      </div>
      <div className="panel-body">
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Type a password to test"
            autoComplete="off"
          />
          <button className="btn ghost sm" type="button" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <div className="meter">
          <div style={{ width: score + "%", background: barColor }}></div>
        </div>
        <p className="sub" style={{ margin: 0 }}>
          Entropy estimate: <strong className="mono">{entropy} bits</strong>
          {pw.length > 0 && (
            <> - at 10 billion guesses/sec this survives about <strong>{crackTime(entropy)}</strong></>
          )}
        </p>
        <ul className="check-list">
          {checks.map((c) => (
            <li key={c.label}>
              <span className={"mark " + (c.ok ? "ok" : "bad")}>{c.ok ? "+" : "x"}</span> {c.label}
            </li>
          ))}
        </ul>
        <p className="sub" style={{ marginTop: 10, marginBottom: 0 }}>
          {passed} of 5 checks passed. This runs entirely in your browser - nothing is sent anywhere.
        </p>
      </div>
    </div>
  );
}
