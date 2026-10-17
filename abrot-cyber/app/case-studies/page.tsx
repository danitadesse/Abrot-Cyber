import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "../../lib/content";

export const metadata: Metadata = {
  title: "Case Studies - Abrot Cyber",
  description: "How Abrot Cyber secured banks, fintechs and logistics operators in Ethiopia."
};

export default function CaseStudiesPage() {
  return (
    <div className="wrap section">
      <div className="page-head">
        <div>
          <h1>Case Studies</h1>
          <p className="sub">Three engagements, anonymized to protect the clients involved.</p>
        </div>
        <Link className="btn" href="/contact">Start your engagement</Link>
      </div>

      {CASE_STUDIES.map((c) => (
        <div className="panel" key={c.id}>
          <div className="panel-head">
            <h2>{c.title}</h2>
            <span className="chip neutral">{c.sector}</span>
          </div>
          <div className="panel-body">
            <p className="sub">{c.client}</p>
            <p>{c.summary}</p>
            <ul className="check-list">
              {c.results.map((r) => (
                <li key={r}>
                  <span className="mark ok">+</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
