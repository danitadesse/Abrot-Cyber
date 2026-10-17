"use client";

import { useState } from "react";

const COMMON_PORTS: { port: number; service: string }[] = [
  { port: 21, service: "FTP" },
  { port: 22, service: "SSH" },
  { port: 25, service: "SMTP" },
  { port: 53, service: "DNS" },
  { port: 80, service: "HTTP" },
  { port: 443, service: "HTTPS" },
  { port: 3306, service: "MySQL" },
  { port: 3389, service: "RDP" },
  { port: 5432, service: "PostgreSQL" },
  { port: 6379, service: "Redis" },
  { port: 8080, service: "HTTP-alt" },
  { port: 27017, service: "MongoDB" }
];

export default function PortScanner() {
  const [host, setHost] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<{ open: number; closed: number } | null>(null);

  function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function scan() {
    setError("");
    setSummary(null);
    const value = host.trim();
    if (!/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value) && !/^(\d{1,3}\.){3}\d{1,3}$/.test(value)) {
      setError("Enter a valid hostname or IPv4 address.");
      return;
    }
    setScanning(true);
    setLines(["[+] starting simulated scan of " + value]);
    // deterministic pseudo-random from host string so results are stable per host
    let seed = 0;
    for (const ch of value) seed = (seed * 31 + ch.charCodeAt(0)) % 100000;
    let openCount = 0;
    for (const p of COMMON_PORTS) {
      await sleep(160);
      const isOpen = (seed = (seed * 1103515245 + 12345) % 2147483648) % 100 < 30;
      if (isOpen) openCount++;
      setLines((prev) =>
        prev.concat(
          isOpen
            ? "[OPEN]   tcp " + p.port + " - " + p.service
            : "[closed] tcp " + p.port + " - " + p.service
        )
      );
    }
    await sleep(160);
    setLines((prev) => prev.concat("[+] scan complete: " + COMMON_PORTS.length + " ports checked"));
    setSummary({ open: openCount, closed: COMMON_PORTS.length - openCount });
    setScanning(false);
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Port Exposure Scanner</h2>
        <span className="chip neutral">simulated</span>
      </div>
      <div className="panel-body">
        <label htmlFor="scan-host">Host to scan</label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            id="scan-host"
            className="mono"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="example.com or 192.168.1.10"
            autoComplete="off"
          />
          <button className="btn" type="button" disabled={scanning} onClick={scan}>
            {scanning ? "Scanning..." : "Scan"}
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
        {lines.length > 0 && (
          <div className="hash-out" style={{ minHeight: 120, marginTop: 14 }}>
            {lines.map((l, i) => (
              <div className="scan-line" key={i}>
                <span className="port"></span>
                {l.startsWith("[OPEN]") ? <span style={{ color: "var(--ok)" }}>{l}</span> : l}
              </div>
            ))}
          </div>
        )}
        {summary && (
          <div className={"notice " + (summary.open > 4 ? "warn" : "ok")} style={{ marginTop: 12 }}>
            {summary.open} of {summary.open + summary.closed} common ports simulated as open.
            In a real assessment, every open port is an interview question: why does this
            service face the internet, and who patches it?
          </div>
        )}
        <p className="tool-disclaimer" style={{ marginTop: 14 }}>
          Educational simulation. No packets are sent to any host - results are generated
          locally for demonstration. Never port-scan systems you do not own or lack
          written permission to test.
        </p>
      </div>
    </div>
  );
}
