"use client";

import { useState } from "react";
import { SERVICES } from "../../lib/content";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: SERVICES[0].name,
    message: "",
    companyWebsite: "" // honeypot
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOk("");
    if (form.companyWebsite) return; // honeypot: silently drop bots
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email and message are required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Something went wrong. Please try again.");
      } else {
        setOk("Request received. Reference: " + body.reference + ". We will reply within one business day.");
        setForm({ name: "", email: "", company: "", service: SERVICES[0].name, message: "", companyWebsite: "" });
      }
    } catch {
      setError("Could not reach the server. Is the dev server running?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Request an assessment</h2>
      </div>
      <div className="panel-body">
        {ok && <div className="notice ok">{ok}</div>}
        {error && <div className="notice bad">{error}</div>}
        <form className="form-stack" onSubmit={submit} autoComplete="off">
          <div>
            <label htmlFor="cf-name">Full name</label>
            <input id="cf-name" value={form.name} onChange={(e) => set("name", e.target.value)} maxLength={120} />
          </div>
          <div>
            <label htmlFor="cf-email">Work email</label>
            <input id="cf-email" className="mono" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={200} />
          </div>
          <div>
            <label htmlFor="cf-company">Organization</label>
            <input id="cf-company" value={form.company} onChange={(e) => set("company", e.target.value)} maxLength={120} />
          </div>
          <div>
            <label htmlFor="cf-service">Service of interest</label>
            <select id="cf-service" value={form.service} onChange={(e) => set("service", e.target.value)}>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cf-message">What are you worried about?</label>
            <textarea
              id="cf-message"
              className="wide-field"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              maxLength={4000}
              placeholder="A few sentences is plenty - scope and urgency can come later."
            />
          </div>
          {/* honeypot: hidden from humans, irresistible to bots */}
          <div style={{ position: "absolute", left: -9999, top: -9999 }}>
            <label htmlFor="cf-website">Company website</label>
            <input
              id="cf-website"
              tabIndex={-1}
              autoComplete="off"
              value={form.companyWebsite}
              onChange={(e) => set("companyWebsite", e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit" disabled={busy}>
              {busy ? "Sending..." : "Send request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
