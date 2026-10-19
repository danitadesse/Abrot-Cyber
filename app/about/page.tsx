import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, TEAM } from "../../lib/content";

export const metadata: Metadata = {
  title: "About - Abrot Cyber",
  description: "The team behind Abrot Cyber, Addis Ababa's fictional fortress of cybersecurity."
};

export default function AboutPage() {
  return (
    <div className="wrap section">
      <div className="page-head">
        <div>
          <h1>About {COMPANY.name}</h1>
          <p className="sub">
            Abrot means fortress. We are a small senior team in {COMPANY.city}, built
            around the belief that security work should be delivered by the people who
            actually do the testing, not handed down a chain of account managers.
          </p>
        </div>
        <Link className="btn" href="/contact">Work with us</Link>
      </div>

      <div className="grid-2">
        {TEAM.map((m) => (
          <div className="card" key={m.name}>
            <div className="num-badge">{m.initials}</div>
            <h3>{m.name}</h3>
            <p className="sub">{m.role}</p>
            <p>{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
