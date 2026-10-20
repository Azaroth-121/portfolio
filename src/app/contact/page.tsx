import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Container, PageHero } from "@/components/ui/section";
import { ContactForm } from "./contact-form";
import { CopyEmail, DavaoTime } from "./contact-widgets";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Kurt Rainier Sacay about a full-time role, an AI chatbot, an automation workflow, or a web platform build.",
  path: "/contact",
});

const OVERLAP = [
  { region: "Davao (PHT)", window: "UTC+8" },
  { region: "Sydney (AEST)", window: "Comfortable midday overlap" },
  { region: "US (ET / PT)", window: "My morning = your evening, the day before" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell me what you&apos;re <em className="text-iridescent">building</em>.
          </>
        }
        lead="A role, a project, or a problem you're stuck on. I read every message myself."
      />

      <Container className="grid gap-6 lg:grid-cols-[1fr_1.35fr] lg:items-start">
        <aside className="flex flex-col gap-4">
          <div data-spotlight className="glass p-7">
            <p className="eyebrow">Email — fastest</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block break-all font-serif text-2xl tracking-tight hover:text-accent sm:text-3xl"
            >
              {siteConfig.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              <CopyEmail email={siteConfig.email} />
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2 font-mono text-xs">
                LinkedIn ↗
              </a>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2 font-mono text-xs">
                GitHub ↗
              </a>
            </div>
          </div>

          <div data-spotlight className="glass p-7">
            <p className="eyebrow">Right now in Davao</p>
            <p className="mt-3 font-mono text-sm">
              <DavaoTime />
            </p>
            <ul className="mt-6 flex flex-col divide-y divide-[var(--glass-line)] text-sm">
              {OVERLAP.map((row) => (
                <li key={row.region} className="flex flex-wrap justify-between gap-2 py-3">
                  <span>{row.region}</span>
                  <span className="text-muted">{row.window}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Remote worldwide; in-person meetings available across Davao City and the Davao Region.
            </p>
          </div>
        </aside>

        <div className="sheet px-6 py-8 sm:px-10 sm:py-10">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
