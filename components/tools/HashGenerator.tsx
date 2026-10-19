"use client";

import { useState } from "react";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  async function hashAll(value: string) {
    setError("");
    if (!value) {
      setOutputs({});
      return;
    }
    try {
      const data = new TextEncoder().encode(value);
      const entries: Record<string, string> = {};
      for (const algo of ALGOS) {
        const digest = await crypto.subtle.digest(algo, data);
        entries[algo] = Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      }
      setOutputs(entries);
    } catch {
      setError("Hashing failed in this browser.");
      setOutputs({});
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Hash Generator</h2>
        <span className="chip neutral">Web Crypto</span>
      </div>
      <div className="panel-body">
        <label htmlFor="hash-input">Text to hash</label>
        <input
          id="hash-input"
          className="mono"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            hashAll(e.target.value);
          }}
          placeholder="Type anything - hashed live in your browser"
        />
        {error && <p className="error-text">{error}</p>}
        {ALGOS.map((algo) => (
          <div key={algo} style={{ marginTop: 14 }}>
            <label>{algo}</label>
            <div className="hash-out">{outputs[algo] || "-"}</div>
          </div>
        ))}
        <p className="sub" style={{ marginTop: 14, marginBottom: 0 }}>
          Computed locally with the browser Web Crypto API. Nothing leaves your machine.
        </p>
      </div>
    </div>
  );
}
