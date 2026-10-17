import Link from "next/link";
import { COMPANY } from "../lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <span>
          {COMPANY.name} - {COMPANY.city} - {COMPANY.email}
        </span>
        <span>
          Toolkit tools are educational demonstrations. <Link href="/contact">Book a real assessment</Link>.
        </span>
        <span>Fictional consultancy for a portfolio project.</span>
      </div>
    </footer>
  );
}
