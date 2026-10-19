import type { Metadata } from "next";
import PasswordStrength from "../../components/tools/PasswordStrength";
import HashGenerator from "../../components/tools/HashGenerator";
import BreachChecker from "../../components/tools/BreachChecker";
import PortScanner from "../../components/tools/PortScanner";
import HeadersAnalyzer from "../../components/tools/HeadersAnalyzer";
import PasswordGenerator from "../../components/tools/PasswordGenerator";
import RiskAssessment from "../../components/tools/RiskAssessment";

export const metadata: Metadata = {
  title: "Security Toolkit - Abrot Cyber",
  description: "Free browser-side security tools: password strength and generation, hashing, breach exposure, port exposure, header analysis and a risk self-assessment."
};

export default function ToolkitPage() {
  return (
    <div className="wrap section">
      <div className="page-head">
        <div>
          <h1>Security Toolkit</h1>
          <p className="sub">
            Free tools we hand to every client on day one. Most run entirely in your
            browser; the breach checker sends only an unreadable 5-character hash prefix.
          </p>
        </div>
      </div>

      <p className="tool-disclaimer" style={{ marginBottom: 18 }}>
        These tools are for education and self-assessment. They use simulated datasets and
        local computation - they do not scan, query or transmit anything to real third-party
        systems. Use them on systems you own or have permission to test.
      </p>

      <div className="tool-grid">
        <PasswordStrength />
        <PasswordGenerator />
        <HashGenerator />
        <BreachChecker />
        <PortScanner />
        <HeadersAnalyzer />
        <RiskAssessment />
        <div className="panel">
          <div className="panel-head">
            <h2>Why we publish these</h2>
            <span className="chip neutral">philosophy</span>
          </div>
          <div className="panel-body">
            <p>
              Security should not be a black box. Everything in this toolkit is the kind
              of check we run in the first hour of an engagement, and the kind of habit
              we want every developer and admin in Ethiopia to build.
            </p>
            <ul className="check-list">
              <li><span className="mark ok">+</span> No accounts, no tracking, no data collection</li>
              <li><span className="mark ok">+</span> Client-side first: your inputs stay yours</li>
              <li><span className="mark ok">+</span> Same fundamentals we test for in paid work</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
