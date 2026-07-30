import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { siteConfig, navLinks } from "@/config/site";
import { ThemeScript } from "@/components/theme-script";
import { ThemeToggle } from "@/components/theme-toggle";
import { JsonLd } from "@/components/json-ld";
import { personSchema, websiteSchema } from "@/lib/schema";

// display: "optional" (not "swap") is deliberate — under throttled mobile
// networks a late font swap repaints the largest text node and pushes LCP
// past budget. "optional" paints immediately with the fallback and only
// uses the custom face if it's already cached/fast, no late repaint.
const fontBody = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "optional",
});

const fontSignature = Geist_Mono({
  variable: "--font-signature",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: { en: "/" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontBody.variable} ${fontSignature.variable} h-full`}
    >
      <head>
        <ThemeScript />
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
          <Link href="/" prefetch={false} className="font-mono text-sm font-medium">
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-6">
            <nav aria-label="Primary">
              <ul className="flex flex-wrap gap-5 font-mono text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} prefetch={false} className="hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main id="content" className="flex-1">
          {children}
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-6 text-sm text-muted">
          <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
            {siteConfig.email}
          </a>
          <div className="flex gap-5 font-mono text-xs">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              LinkedIn
            </a>
            <span>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
