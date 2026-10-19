"use client";

import { useState } from "react";

type HeaderCheck = {
  name: string;
  weight: number;
  test: (headers: Record<string, string>) => boolean;
  why: string;
};

const CHECKS: HeaderCheck[] = [
  {
    name: "Content-Security-Policy",
    weight: 30,
    test: (h) => !!h["content-security-policy"],
    why: "Restricts which scripts, styles and frames can load. The strongest single defense against XSS."
  },
  {
    name: "Strict-Transport-Security",
    weight: 15,
    test: (h) => !!h["strict-transport-security"],
    why: "Forces HTTPS for future visits, killing protocol downgrade and cookie theft attempts."
  },
  {
    name: "X-Content-Type-Options",
    weight: 10,
    test: (h) => h["x-content-type-options"]?.toLowerCase() === "nosniff",
    why: "Stops browsers guessing a file is executable when you meant to serve text."
  },
  {
    name: "X-Frame-Options",
    weight: 10,
    test: (h) => !!h["x-frame-options"] || frameAncestorsNone(h),
    why: "Prevents clickjacking by blocking other sites from embedding your page. frame-ancestors in CSP also counts."
  },
  {
    name: "Referrer-Policy",
    weight: 10,
    test: (h) => !!h["referrer-policy"],
    why: "Stops your URLs (which often contain IDs and tokens) leaking to third parties."
  },
  {
    name: "Permissions-Policy",
    weight: 15,
    test: (h) => !!h["permissions-policy"],
    why: "Disables powerful browser features (camera, mic, geolocation) for your origin and embedders."
  }
];

function frameAncestorsNone(h: Record<string, string>): boolean {
  return !!h["content-security-policy"] && /frame-ancestors\s/.test(h["content-security-policy"]);
}

function grade(score: number): { chip: string; label: string } {
  if (score >= 90) return { chip: "ok", label: "A" };
  if (score >= 75) return { chip: "ok", label: "B" };
  if (score >= 60) return { chip: "warn", label: "C" };
  if (score >= 40) return { chip: "warn", label: "D" };
  return { chip: "bad", label: "F" };
}

export default function HeadersAnalyzer() {
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState("");

  function analyze() {
    setError("");
    setParsed(null);
    const headers: Record<string, string> = {};
    for (const line of raw.split(/\r?\n/)) {
      const idx = line.indexOf(":");
      if (idx <= 0) continue;
      const name = line.slice(0, idx).trim().toLowerCase();
      if (!/^[\w-]+$/.test(name)) continue;
      headers[name] = line.slice(idx + 1).trim();
    }
    if (Object.keys(headers).length === 0) {
      setError("No recognizable headers found. Paste raw response headers, one per line, as Name: value.");
      return;
    }
    setParsed(headers);
  }

  const results = parsed
    ? CHECKS.map((c) => ({ ...c, ok: c.test(parsed) }))
    : [];
  const score = parsed ? results.reduce((s, r) => s + (r.ok ? r.weight : 0), 0) : 0;
  const g = grade(score);

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>HTTP Security Headers Analyzer</h2>
        {parsed && <span className={"chip " + g.chip}>Score {score}/100 - Grade {g.label}</span>}
      </div>
      <div className="panel-body">
        <label htmlFor="headers-input">Paste response headers (one per line)</label>
        <textarea
          id="headers-input"
          className="mono"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={"Strict-Transport-Security: max-age=31536000\nContent-Type: text/html"}
        />
        <button className="btn" type="button" onClick={analyze} style={{ marginTop: 12 }}>
          Analyze headers
        </button>
        {error && <p className="error-text">{error}</p>}
        {parsed && (
          <ul className="check-list">
            {results.map((r) => (
              <li key={r.name}>
                <span className={"mark " + (r.ok ? "ok" : "bad")}>{r.ok ? "+" : "x"}</span>
                <span>
                  <strong className="mono">{r.name}</strong> ({r.weight} pts)
                  {!r.ok && <span style={{ display: "block", fontSize: 12.5 }}>Missing. {r.why}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="tool-disclaimer" style={{ marginTop: 14 }}>
          Educational tool. Paste headers from your own sites. You can see them in any
          browser dev tools Network tab, or with: curl -sI https://your-site
        </p>
      </div>
    </div>
  );
}
