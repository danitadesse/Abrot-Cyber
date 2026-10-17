"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

// Brand mark: a shield with a keyhole, inline SVG, ASCII-safe.
function BrandMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3z"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.2" fill="var(--accent)" />
      <rect x="11.2" y="11" width="1.6" height="4.4" rx="0.8" fill="var(--accent)" />
    </svg>
  );
}

export default function SiteHeader() {
  const path = usePathname();
  const on = (href: string) =>
    path === href || (href !== "/" && path.startsWith(href + "/")) ? " active" : "";

  return (
    <header className="site-header">
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Link href="/" className="site-brand">
          <BrandMark />
          <span>Abrot Cyber</span>
        </Link>
        <nav className="main-nav">
          <Link href="/services" className={on("/services")}>Services</Link>
          <Link href="/toolkit" className={on("/toolkit")}>Toolkit</Link>
          <Link href="/case-studies" className={on("/case-studies")}>Case Studies</Link>
          <Link href="/about" className={on("/about")}>About</Link>
          <Link href="/contact" className={on("/contact")}>Contact</Link>
        </nav>
        <span className="header-cta">
          <Link href="/contact" className="btn sm">Get an assessment</Link>
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
