"use client";

import { useState } from "react";

type Question = { q: string; yes: number; no: number; weight: string; tip: string };

const QUESTIONS: Question[] = [
  {
    q: "Do all staff use a password manager with unique passwords per account?",
    yes: 2, no: 0, weight: "Identity",
    tip: "Reused passwords are the number one way one leaked site becomes ten compromised accounts."
  },
  {
    q: "Is multi-factor authentication enforced on email, VPN and admin consoles?",
    yes: 2, no: 0, weight: "Identity",
    tip: "MFA blocks over 99 percent of automated credential-stuffing attempts."
  },
  {
    q: "Are critical security patches applied within 14 days of release?",
    yes: 2, no: 0, weight: "Patching",
    tip: "Most successful exploits target vulnerabilities with patches available for months."
  },
  {
    q: "Do you have offline, tested backups that are separated from the network?",
    yes: 2, no: 0, weight: "Recovery",
    tip: "Ransomware negotiates poorly with a restore button you verified last week."
  },
  {
    q: "Is outbound internet access from servers restricted to approved destinations?",
    yes: 2, no: 0, weight: "Network",
    tip: "Blocking attacker command-and-control channels turns breaches into incidents."
  },
  {
    q: "Are logs from key systems collected, kept for 90+ days and actually reviewed?",
    yes: 2, no: 0, weight: "Detection",
    tip: "An alert nobody reads is a tree falling in an empty forest."
  },
  {
    q: "Has everyone - including leadership - completed phishing training this year?",
    yes: 2, no: 0, weight: "People",
    tip: "Executives are the highest-value targets and the least likely to have had training."
  },
  {
    q: "Do you have a written incident response plan with named owners and contacts?",
    yes: 2, no: 0, weight: "Response",
    tip: "During an incident is the worst time to decide who is allowed to disconnect the server."
  }
];

export default function RiskAssessment() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const score = QUESTIONS.reduce((s, q, i) => s + (answers[i] ? q.yes : q.no), 0);
  const max = QUESTIONS.length * 2;
  const pct = Math.round((score / max) * 100);
  const grade =
    pct >= 85 ? { cls: "ok", label: "Low risk posture" } :
    pct >= 50 ? { cls: "warn", label: "Mixed posture - gaps present" } :
    { cls: "bad", label: "High risk posture" };
  const barColor = pct >= 85 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)";

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Cyber Risk Self-Assessment</h2>
        <span className="chip neutral">{answered} of {QUESTIONS.length} answered</span>
      </div>
      <div className="panel-body">
        {QUESTIONS.map((item, i) => (
          <div className="quiz-q" key={i}>
            <div className="q">
              <span className="chip neutral" style={{ marginRight: 8 }}>{item.weight}</span>
              {item.q}
            </div>
            <div className="quiz-opts">
              <button
                className={"btn sm " + (answers[i] === true ? "" : "ghost")}
                type="button"
                onClick={() => { setAnswers({ ...answers, [i]: true }); setSubmitted(false); }}
              >
                Yes
              </button>
              <button
                className={"btn sm " + (answers[i] === false ? "" : "ghost")}
                type="button"
                onClick={() => { setAnswers({ ...answers, [i]: false }); setSubmitted(false); }}
              >
                No
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn"
          type="button"
          style={{ marginTop: 14 }}
          disabled={answered < QUESTIONS.length}
          onClick={() => setSubmitted(true)}
        >
          {answered < QUESTIONS.length ? "Answer all questions to see results" : "Show my score"}
        </button>

        {submitted && (
          <div style={{ marginTop: 16 }}>
            <div className="page-head" style={{ marginBottom: 8 }}>
              <strong>Score: {score}/{max} ({pct}%)</strong>
              <span className={"chip " + grade.cls}>{grade.label}</span>
            </div>
            <div className="meter">
              <div style={{ width: pct + "%", background: barColor }}></div>
            </div>
            <ul className="check-list">
              {QUESTIONS.map((item, i) =>
                answers[i] ? null : (
                  <li key={i}>
                    <span className="mark bad">!</span>
                    <span>{item.tip}</span>
                  </li>
                )
              )}
            </ul>
            {pct === 100 && (
              <div className="notice ok" style={{ marginTop: 12 }}>
                All yes answers. The next step is having someone verify the claims -
                a gap between policy and practice is still a gap.
              </div>
            )}
          </div>
        )}

        <p className="tool-disclaimer" style={{ marginTop: 16 }}>
          Educational self-assessment, not a security audit or a certification. The
          questions mirror the control areas we examine in a paid gap assessment.
        </p>
      </div>
    </div>
  );
}
