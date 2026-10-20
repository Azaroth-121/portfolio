import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { getAllWork } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { LogoOrbit } from "@/components/stack/logo-orbit";
import { LogoMarquee } from "@/components/stack/logo-marquee";
import { ICONS, type IconId } from "@/components/stack/icons";
import { StackLogo } from "@/components/stack/stack-logo";
import { ArrowIcon, Container, SectionHeading } from "@/components/ui/section";
import { WorkCard } from "@/components/work/work-card";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

const SELECTED_WORK_SLUGS = [
  "governed-ai-saas-platform",
  "ai-prompt-optimizer-extension",
  "retrieval-augmented-chatbot",
  "davao-digital-storefront",
];

// Every figure here is from a case study on this site.
const PROOF = [
  { value: "0%", label: "unverifiable AI quotes across 63 real-model runs" },
  { value: "54/54", label: "known gaps found by the AI in validation" },
  { value: "140+", label: "automated tests on one production platform" },
  { value: "~3 KB", label: "per storefront page, zero JavaScript" },
];

const CAPABILITIES: { title: string; body: string; icons: IconId[] }[] = [
  {
    title: "AI you can audit",
    body: "RAG, verified citations, output guardrails, prompt-injection tests and real-model evaluation — AI that proposes, never decides.",
    icons: ["openai", "langchain", "ollama", "python"],
  },
  {
    title: "Full-stack product",
    body: "TypeScript end to end: React and Next.js front ends, Node APIs, browser extensions, offline-first PWAs.",
    icons: ["typescript", "react", "next", "node"],
  },
  {
    title: "Backend & data",
    body: ".NET 8 modular monoliths and Node services on PostgreSQL, with EF Core or Drizzle and migrations you can trust.",
    icons: ["dotnet", "csharp", "postgres", "drizzle"],
  },
  {
    title: "Cloud & delivery",
    body: "Azure Container Apps defined in Bicep, Docker, and CI that blocks leaked secrets and vulnerable packages.",
    icons: ["azure", "bicep", "docker", "githubactions"],
  },
  {
    title: "Automation",
    body: "n8n and Make.com workflows that connect CRMs, forms and telephony so nothing falls between systems.",
    icons: ["n8n", "make", "hubspot", "supabase"],
  },
  {
    title: "Hardware, too",
    body: "From retrieval pipelines to routed PCBs: Arduino prototypes and KiCad boards built to run unattended.",
    icons: ["arduino", "kicad"],
  },
];

const PRINCIPLES = [
  {
    title: "Building is how I understand.",
    body: "I build early and small rather than specify endlessly. A working thing teaches more than a perfect plan.",
  },
  {
    title: "The business problem comes first.",
    body: "Understand the problem, model the system carefully, then hide the machinery behind an interface that feels simple.",
  },
  {
    title: "Ship it. Then make it good.",
    body: "And never automate a process you have not run by hand — automating guesses just encodes guesses.",
  },
  {
    title: "Systems that keep working.",
    body: "Not demos. The measure is whether it is still running six months later, without me.",
  },
];

export default function Home() {
  const allWork = getAllWork();
  const selected = SELECTED_WORK_SLUGS.map((slug) => allWork.find((entry) => entry.slug === slug)).filter(
    (entry): entry is NonNullable<typeof entry> => Boolean(entry)
  );

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <div className="grid-veil" />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0">
            <p className="rise glass-chip inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 px-3.5 py-1.5 font-mono text-xs">
              <span className="pulse-dot" />
              Open to full-time roles
              <span className="hidden sm:inline">· {siteConfig.location.city}, PH · remote-ready</span>
            </p>
            <h1
              className="rise mt-7 font-serif text-[clamp(3rem,8vw,6.2rem)] leading-[0.95] tracking-tight"
              style={{ "--d": "80ms" } as CSSProperties}
            >
              I build AI that has to <em className="text-iridescent">show its work.</em>
            </h1>
            <p
              className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted"
              style={{ "--d": "160ms" } as CSSProperties}
            >
              {siteConfig.name} — AI and full-stack engineer. Production platforms in .NET, Next.js, PostgreSQL and
              Azure, where every AI claim is cited and every decision is approved by a person.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--d": "240ms" } as CSSProperties}>
              <Link href="/work" prefetch={false} className="btn-primary px-6 py-3 font-mono text-sm">
                See the work <ArrowIcon />
              </Link>
              <Link href="/contact" prefetch={false} className="btn-ghost px-6 py-3 font-mono text-sm">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="rise flex min-w-0 justify-center" style={{ "--d": "200ms" } as CSSProperties}>
            <LogoOrbit />
          </div>
        </Container>

        <Container className="mt-16">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {PROOF.map((item, i) => (
              <div
                key={item.value}
                data-spotlight
                className="rise glass p-5"
                style={{ "--d": `${320 + i * 70}ms` } as CSSProperties}
              >
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block font-serif text-4xl tracking-tight sm:text-5xl">{item.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-muted">{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* -------------------------------------------------------------- stack */}
      <section aria-labelledby="stack-heading" className="py-10">
        <Container>
          <p id="stack-heading" className="eyebrow mb-5 text-center">
            The stack, in daily use
          </p>
        </Container>
        <LogoMarquee />
      </section>

      {/* --------------------------------------------------------------- work */}
      <section className="py-20">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Systems built to be <em className="text-iridescent">trusted</em>.
                </>
              }
            />
            <Link href="/work" prefetch={false} className="btn-ghost px-5 py-2.5 font-mono text-sm">
              All case studies <ArrowIcon />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {selected.map((entry, i) => (
              <WorkCard key={entry.slug} entry={entry} featured={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- capabilities */}
      <section className="py-20">
        <Container>
          <SectionHeading
            className="reveal"
            eyebrow="Capabilities"
            title={
              <>
                From prompt to <em className="text-iridescent">printed circuit</em>.
              </>
            }
            lead="Six disciplines, one habit: make something complicated behave simply."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <article key={cap.title} data-spotlight className="reveal glass lift p-7">
                <div className="flex gap-2">
                  {cap.icons.map((id) => (
                    <span key={id} title={ICONS[id].title} className="glass-chip grid h-10 w-10 place-items-center rounded-xl">
                      <StackLogo icon={ICONS[id]} size={18} />
                    </span>
                  ))}
                </div>
                <h3 className="mt-6 font-serif text-2xl tracking-tight">{cap.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{cap.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- principles */}
      <section className="py-20">
        <Container>
          <SectionHeading
            className="reveal"
            eyebrow="How I work"
            title={
              <>
                Four rules I <em className="text-iridescent">don&apos;t</em> bend.
              </>
            }
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} data-spotlight className="reveal glass flex gap-6 p-7">
                <span className="font-serif text-5xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/about"
            prefetch={false}
            className="reveal mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent hover:gap-3 transition-[gap]"
          >
            More about me <ArrowIcon />
          </Link>
        </Container>
      </section>
    </>
  );
}
