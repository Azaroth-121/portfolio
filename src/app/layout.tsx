import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeScript } from "@/components/theme-script";
import { ThemeToggle } from "@/components/theme-toggle";
import { JsonLd } from "@/components/json-ld";
import { NavLinks } from "@/components/site/nav-links";
import { SpotlightTracker } from "@/components/motion/spotlight-tracker";
import { ArrowIcon } from "@/components/ui/section";
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

const fontDisplay = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
      className={`${fontBody.variable} ${fontSignature.variable} ${fontDisplay.variable} h-full`}
    >
      <head>
        <ThemeScript />
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="grain" aria-hidden="true" />
        <SpotlightTracker />

        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>

        <header className="sticky top-3 z-50 px-3 sm:top-5 sm:px-6">
          <div className="glass-pill mx-auto flex max-w-6xl items-center gap-3 py-1.5 pl-2 pr-1.5 sm:gap-4">
            <Link
              href="/"
              prefetch={false}
              aria-label={`${siteConfig.name}, home`}
              className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground font-serif text-lg italic text-background">
                K
              </span>
              <span className="hidden font-mono text-[13px] md:inline">{siteConfig.name}</span>
            </Link>
            <nav aria-label="Primary" className="min-w-0 flex-1 md:flex md:justify-center">
              <NavLinks />
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <main id="content" className="min-w-0 flex-1">
          {children}
        </main>

        <footer className="px-3 pb-6 pt-24 sm:px-6">
          <div className="sheet mx-auto max-w-6xl overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
            <div className="grid-veil" />
            <p className="eyebrow">Open to full-time roles and projects</p>
            <p className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              Let&apos;s build something that is{" "}
              <em className="text-iridescent">still running in six months</em>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" prefetch={false} className="btn-primary px-6 py-3 font-mono text-sm">
                Start a conversation <ArrowIcon />
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="btn-ghost px-5 py-3 font-mono text-sm">
                {siteConfig.email}
              </a>
            </div>
            <div className="hairline mt-12" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted">
              <span>
                © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.location.city},{" "}
                {siteConfig.location.country} · {siteConfig.location.timezone}
              </span>
              <span className="flex gap-5">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  GitHub ↗
                </a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  LinkedIn ↗
                </a>
                <Link href="/notes" prefetch={false} className="hover:text-foreground">
                  Notes
                </Link>
                <Link href="/davao" prefetch={false} className="hover:text-foreground">
                  Davao clients
                </Link>
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
