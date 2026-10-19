import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "../../lib/content";

export const metadata: Metadata = {
  title: "Services - Abrot Cyber",
  description: "Penetration testing, managed SOC, incident response, compliance, training and cloud security."
};

export default function ServicesPage() {
  return (
    <div className="wrap section">
      <div className="page-head">
        <div>
          <h1>Services</h1>
          <p className="sub">
            Six practice areas, one goal: make your organization hard, boring and
            expensive to attack.
          </p>
        </div>
        <Link className="btn" href="/contact">Request pricing</Link>
      </div>

      <div className="tool-grid">
        {SERVICES.map((s, i) => (
          <div className="panel" key={s.slug}>
            <div className="panel-head">
              <h2>{s.name}</h2>
              <span className="chip neutral">0{i + 1}</span>
            </div>
            <div className="panel-body">
              <p>{s.body}</p>
              <ul className="check-list">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <span className="mark ok">+</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
