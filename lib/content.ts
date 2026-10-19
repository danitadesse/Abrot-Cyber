// Shared marketing content for Abrot Cyber. Server-safe (no crypto,
// no prisma) so any component can import it.

export const COMPANY = {
  name: "Abrot Cyber",
  tagline: "The fortress for your digital frontiers",
  city: "Addis Ababa, Ethiopia",
  email: "hello@abrotcyber.et",
  phone: "+251 91 100 4400"
};

export const SERVICES = [
  {
    slug: "penetration-testing",
    name: "Penetration Testing",
    short: "Find the holes before attackers do.",
    body:
      "Manual, standards-driven penetration testing of web applications, mobile apps, APIs and internal networks. Every finding ships with a proof of concept, business impact rating and a fix recommendation your engineers can act on the same week.",
    bullets: [
      "OWASP Testing Guide and PTES methodology",
      "Web, mobile, API, network and wireless scopes",
      "Retest included after remediation",
      "Executive and technical report tracks"
    ]
  },
  {
    slug: "managed-soc",
    name: "Managed SOC",
    short: "24/7 monitoring without building a night shift.",
    body:
      "Our security operations center watches your logs, endpoints and cloud accounts around the clock. Ethiopian business hours get a senior analyst on the phone in minutes, not a ticket queue on another continent.",
    bullets: [
      "24/7 alerting and incident triage",
      "Log pipeline setup and tuning included",
      "Monthly threat landscape briefing for your team",
      "Playbooks tested against real-world attack paths"
    ]
  },
  {
    slug: "incident-response",
    name: "Incident Response and Forensics",
    short: "Calm hands when it is 2 AM and something is wrong.",
    body:
      "Ransomware, account takeover, data leak or a suspicious midnight alert: we contain, eradicate, recover and reconstruct the attack chain so you can answer management, regulators and customers with facts.",
    bullets: [
      "15-minute emergency engagement line",
      "Containment, eradication and recovery",
      "Disk, memory and log forensics",
      "Post-incident report and hardening plan"
    ]
  },
  {
    slug: "compliance-audit",
    name: "Compliance and Audit",
    short: "ISO 27001 and NIST alignment, minus the paperwork panic.",
    body:
      "Gap assessments, internal audits and remediation roadmaps for ISO 27001, NIST CSF 2.0 and data protection requirements relevant to Ethiopian and cross-border operations.",
    bullets: [
      "Gap assessment with prioritized roadmap",
      "Policy and procedure drafting support",
      "Internal audit ahead of certification",
      "Vendor and third-party risk reviews"
    ]
  },
  {
    slug: "security-training",
    name: "Security Awareness Training",
    short: "Your people are the widest attack surface. Train them.",
    body:
      "Role-based training from boardroom to helpdesk, with phishing simulations run against your actual mail flows and quarterly refresher campaigns that measure real behavior change.",
    bullets: [
      "Phishing simulations with per-department scores",
      "Developer secure-coding workshops",
      "Executive risk briefings",
      "Amharic and English delivery"
    ]
  },
  {
    slug: "cloud-security",
    name: "Cloud Security Review",
    short: "AWS, Azure or GCP configured like you meant it.",
    body:
      "Configuration review, identity and access hardening, network segmentation and cost-aware guardrails across your cloud estate, mapped to CIS benchmarks.",
    bullets: [
      "Full configuration review vs CIS benchmarks",
      "IAM least-privilege redesign",
      "Guardrails and detections as code",
      "Container and CI/CD pipeline review"
    ]
  }
];

export const CASE_STUDIES = [
  {
    id: "bank-soc",
    client: "A private commercial bank",
    sector: "Banking",
    title: "From alert fatigue to a working SOC in 90 days",
    summary:
      "The bank generated 11,000 unactioned alerts a month. We built a tuned pipeline, cut false positives by 87 percent and delivered 24/7 coverage with two minutes to first triage.",
    results: [
      "87 percent reduction in false positives",
      "2 minutes average time to first triage",
      "2 real intrusions caught in the first quarter"
    ]
  },
  {
    id: "fintech-api-pentest",
    client: "A payments fintech",
    sector: "Fintech",
    title: "API penetration test before a national rollout",
    summary:
      "Three weeks of manual testing on the payment API found a broken object-level authorization chain that could have let one merchant read another's settlement data. Shipped patched before launch.",
    results: [
      "14 findings, 2 critical, all fixed pre-launch",
      "Broken access control chain closed",
      "Retest clean; zero findings open at launch"
    ]
  },
  {
    id: "logistics-ransomware",
    client: "A regional logistics operator",
    sector: "Logistics",
    title: "Ransomware contained in an afternoon",
    summary:
      "A dispatcher clicked a fake waybill invoice at 11:40 AM. By 1:05 PM our IR line had isolated the encryption attempt, restored operations from verified backups and rebuilt the compromised jump host.",
    results: [
      "85 minutes from first call to containment",
      "Zero ransom paid, zero data lost",
      "Backup and VPN hardening program followed"
    ]
  }
];

export const TEAM = [
  {
    name: "Selamawit Kebede",
    role: "Managing Partner, Offensive Security",
    bio: "OSCP-certified lead tester. 11 years breaking banks (with permission) across East Africa.",
    initials: "SK"
  },
  {
    name: "Dawit Haile",
    role: "Head of Detection Engineering",
    bio: "Built SOC pipelines for three national banks. Believes a rule nobody tunes is worse than no rule.",
    initials: "DH"
  },
  {
    name: "Meron Alemu",
    role: "Incident Response Lead",
    bio: "Digital forensics specialist. Has led containment through four ransomware events with zero ransoms paid.",
    initials: "MA"
  },
  {
    name: "Yonas Tesfaye",
    role: "Principal Consultant, GRC",
    bio: "Leads ISO 27001 programs from gap assessment to certification day. Fluent in audit and in Amharic.",
    initials: "YT"
  }
];

export const STATS = [
  { l: "Engagements delivered", n: "120+" },
  { l: "Ethiopian organizations protected", n: "40+" },
  { l: "Average IR response time", n: "15 min" },
  { l: "Findings retested for free", n: "100%" }
];
