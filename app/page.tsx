import Link from "next/link";
import { COMPANY, SERVICES, CASE_STUDIES, STATS } from "../lib/content";
import AnimatedStats from "../components/AnimatedStats";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="hero-kicker">abrot@ethiopia:~$ securing the digital frontier</span>
          <h1>The fortress for your digital frontiers.</h1>
          <p className="sub">
            {COMPANY.name} is an Addis Ababa cybersecurity consultancy. We break into
            your systems before criminals do, watch your logs while your team sleeps,
            and stand next to you at 2 AM when something goes wrong.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/contact">Get an assessment</Link>
            <Link className="btn ghost" href="/toolkit">Try the free toolkit</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <AnimatedStats stats={STATS} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="page-head">
            <h2>Services</h2>
            <Link href="/services">All services</Link>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div className="card" key={s.slug}>
                <div className="num-badge">0{i + 1}</div>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="page-head">
            <h2>Proof, not promises</h2>
            <Link href="/case-studies">All case studies</Link>
          </div>
          <div className="grid-3">
            {CASE_STUDIES.map((c) => (
              <div className="card" key={c.id}>
                <span className="chip neutral">{c.sector}</span>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="panel">
            <div className="panel-body">
              <h2>Know where you stand before an attacker tells you.</h2>
              <p className="sub">
                Start with a free, no-commitment conversation. We will tell you in plain
                language what your biggest risk is likely to be, and what a first
                engagement would look like.
              </p>
              <Link className="btn" href="/contact">Book a call</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
