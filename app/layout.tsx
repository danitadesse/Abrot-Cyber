import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Abrot Cyber - Cybersecurity Consulting in Ethiopia",
  description:
    "Penetration testing, managed SOC, incident response and compliance for Ethiopian organizations. Abrot means fortress."
};

// Runs before first paint so a saved light theme never flashes dark.
const themeInit = `(function(){try{var t=localStorage.getItem("abrot-theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
