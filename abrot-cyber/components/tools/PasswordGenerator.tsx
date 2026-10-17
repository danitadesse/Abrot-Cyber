"use client";

import { useState } from "react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/"
};
const AMBIGUOUS = "Il1O0o";

function pick(pool: string): string {
  // rejection sampling for unbiased selection
  const max = 256 - (256 % pool.length);
  const buf = new Uint32Array(1);
  let v: number;
  do {
    crypto.getRandomValues(buf);
    v = buf[0] % 256;
  } while (v >= max);
  return pool[v % pool.length];
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ upper: true, digits: true, symbols: true, avoidAmbiguous: true });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    setCopied(false);
    let pool = SETS.lower;
    if (opts.upper) pool += SETS.upper;
    if (opts.digits) pool += SETS.digits;
    if (opts.symbols) pool += SETS.symbols;
    if (opts.avoidAmbiguous) {
      pool = pool.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
    }
    const chars: string[] = [];
    for (let i = 0; i < length; i++) chars.push(pick(pool));
    // Fisher-Yates shuffle with crypto randomness
    const buf = new Uint32Array(chars.length);
    crypto.getRandomValues(buf);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = buf[i] % (i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    setPw(chars.join(""));
  }

  async function copy() {
    if (!pw) return;
    try {
      await navigator.clipboard.writeText(pw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const entropy = pw ? Math.round(length * Math.log2(
    26 + (opts.upper ? 26 : 0) + (opts.digits ? 10 : 0) + (opts.symbols ? 25 : 0)
  )) : 0;
  const strength =
    !pw ? { cls: "neutral", text: "Generate a password" } :
    entropy >= 100 ? { cls: "ok", text: "Excellent" } :
    entropy >= 70 ? { cls: "ok", text: "Strong" } :
    { cls: "warn", text: "Moderate" };

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Password Generator</h2>
        <span className={"chip " + strength.cls}>{strength.text}</span>
      </div>
      <div className="panel-body">
        <div className="range-row" style={{ marginBottom: 12 }}>
          <label htmlFor="pg-length" style={{ margin: 0, minWidth: 130 }}>Length: <strong className="mono">{length}</strong></label>
          <input
            id="pg-length"
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>
        <div className="opt-row">
          <label>
            <input type="checkbox" checked={opts.upper} onChange={(e) => setOpts({ ...opts, upper: e.target.checked })} />
            Uppercase
          </label>
          <label>
            <input type="checkbox" checked={opts.digits} onChange={(e) => setOpts({ ...opts, digits: e.target.checked })} />
            Digits
          </label>
          <label>
            <input type="checkbox" checked={opts.symbols} onChange={(e) => setOpts({ ...opts, symbols: e.target.checked })} />
            Symbols
          </label>
          <label>
            <input type="checkbox" checked={opts.avoidAmbiguous} onChange={(e) => setOpts({ ...opts, avoidAmbiguous: e.target.checked })} />
            Avoid look-alikes (I, l, 1, O, 0)
          </label>
        </div>
        <div className="hash-out" style={{ minHeight: 48, display: "flex", alignItems: "center" }}>
          {pw || "Click Generate"}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button className="btn" type="button" onClick={generate}>Generate</button>
          <button className="btn ghost" type="button" onClick={copy} disabled={!pw}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {pw && (
          <p className="sub" style={{ marginTop: 12, marginBottom: 0 }}>
            About <strong className="mono">{entropy} bits</strong> of entropy. Generated
            with crypto.getRandomValues - the same random source browsers use for TLS
            keys - never a predictable Math.random.
          </p>
        )}
        <p className="tool-disclaimer" style={{ marginTop: 14 }}>
          Educational tool. Passwords are generated locally and never stored or
          transmitted. For real accounts, pair any password with multi-factor
          authentication.
        </p>
      </div>
    </div>
  );
}
