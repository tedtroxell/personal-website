import type { Metadata } from "next";
import "./wordpress-base.css";
import "./globals.css";
import "./field-notes.css";
import { SiteRuntime } from "@/components/SiteRuntime";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";

export const metadata: Metadata = {
  title: "Ted Troxell | Technology. People. Possibility.",
  description: "Engineer, founder and technical leader. Turning complex problems into clear direction.",
  icons: { icon: "/assets/site-icon.svg" },
  metadataBase: new URL("https://tedtroxell.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ContactDialog />
        <SiteRuntime />
      </body>
    </html>
  );
}
