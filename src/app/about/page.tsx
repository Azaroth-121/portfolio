import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ArrowIcon, Container, PageHero, SectionHeading } from "@/components/ui/section";
import { ICONS, type IconId } from "@/components/stack/icons";
import { StackChip } from "@/components/stack/stack-logo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Kurt Rainier Sacay on how he works: building to understand, shipping before perfecting, and why he goes from RAG architecture to PCB design.",
  path: "/about",
});

const TIMELINE = [
  {
    when: "Now",
    title: "Software Architect & Core Developer",
    where: "Early-stage AI SaaS company (unnamed under NDA)",
    body: (
      <>
        Designed and built a multi-tenant AI platform on .NET 8, Next.js 16, PostgreSQL and Azure, where AI
        recommendations must quote their source word for word and every decision is approved by a person. Validated
        the AI against a real model and prepared the codebase for a four-developer team. Also lead development of an{" "}
        <Link href="/work/ai-prompt-optimizer-extension" prefetch={false} className="text-accent underline underline-offset-4">
          AI prompt-optimization browser extension
        </Link>
        .
      </>
    ),
    link: { href: "/work/governed-ai-saas-platform", label: "Platform case study" },
  },
  {
    when: "~2 years",
    title: "Production AI, automation & integrations",
    where: "B2B technology company (unnamed under NDA)",
    body: (
      <>
        Architected and built production infrastructure end to end: client-server configuration, backend and front-end
        systems, automation workflows, RAG-based conversational AI, and CRM and telephony integrations. Owned these
        systems, not as a maintainer brought in after the fact.
      </>
    ),
    link: { href: "/work/retrieval-augmented-chatbot", label: "RAG chatbot case study" },
  },
  {
    when: "Ongoing",
    title: "Computer Engineering student",
    where: "Second year, currently enrolled",
    body: <>Studying while working full time — which is how CalcSprint happened.</>,
    link: { href: "/work/calcsprint", label: "CalcSprint" },
  },
];

const PHILOSOPHY = [
  {
    title: "Building is how I understand.",
    body: (
      <>
        I failed a calculus course a few times while working full time. Reading the textbook and grinding practice
        problems on paper wasn&apos;t making it stick, so I built{" "}
        <Link href="/work/calcsprint" prefetch={false} className="text-accent underline underline-offset-4">
          CalcSprint
        </Link>
        , an exam-prep app for that exact course. Structuring the material well enough to teach it forced me to
        actually understand it — the building was the studying. I approach client work the same way: build early and
        small rather than specify endlessly.
      </>
    ),
  },
  {
    title: "Understand the business problem before the technical one.",
    body: (
      <>
        Understand the business problem, model the system carefully, then build interfaces that make the complexity
        invisible. A retrieval pipeline and a PCB routing GPS signals are the same job at different altitudes — make
        something complicated behave simply.
      </>
    ),
  },
  {
    title: "Ship it. Then make it good.",
    body: (
      <>
        A working thing in production teaches more than a perfect plan. The corollary I apply just as strictly:
        don&apos;t automate a process you&apos;ve never run by hand. Automating your guesses just encodes your guesses.
      </>
    ),
  },
  {
    title: "Systems that keep working.",
    body: (
      <>
        Not demos. Not things that impress once and then rot. The measure I hold my own work to is whether it&apos;s
        still running six months later without me.
      </>
    ),
  },
];

const TOOLKIT: IconId[] = [
  "typescript", "react", "next", "node", "dotnet", "csharp", "postgres", "azure",
  "openai", "docker", "githubactions", "supabase", "n8n", "python", "arduino", "kicad",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About"
        title={
          <>
            Engineer by trade, <em className="text-iridescent">builder</em> by habit.
          </>
        }
        lead={`I'm ${siteConfig.name}, an AI and full-stack engineer based in Davao City, Philippines. I build production platforms where AI is useful and accountable — and I go from RAG architecture to PCB design.`}
      />

      <Container className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* Profile card */}
        <aside className="glass flex flex-col gap-6 p-7 lg:sticky lg:top-24">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-foreground font-serif text-4xl italic text-background">
              K
            </span>
            <div>
              <p className="font-serif text-2xl leading-tight tracking-tight">{siteConfig.name}</p>
              <p className="text-sm text-muted">AI & Full-Stack Engineer</p>
            </div>
          </div>
          <dl className="grid gap-4 text-sm">
            <div>
              <dt className="eyebrow">Based in</dt>
              <dd className="mt-1">
                {siteConfig.location.city}, Philippines · {siteConfig.location.timezone}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Status</dt>
              <dd className="mt-1 flex items-center gap-2">
                <span className="pulse-dot" /> Open to full-time roles & projects
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Fastest reply</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="flex flex-col gap-2">
            <Link href="/contact" prefetch={false} className="btn-primary justify-center px-5 py-2.5 font-mono text-sm">
              Get in touch <ArrowIcon />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center px-4 py-2 font-mono text-xs">
                GitHub ↗
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center px-4 py-2 font-mono text-xs">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          {/* Experience timeline */}
          <section className="sheet px-6 py-10 sm:px-10">
            <SectionHeading eyebrow="Experience" title="Where I've built." />
            <ol className="relative mt-10 flex flex-col gap-10 border-l border-[var(--glass-line)] pl-8">
              {TIMELINE.map((item) => (
                <li key={item.title} className="reveal relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] bg-accent shadow-[0_0_0_4px_var(--glass-line)]"
                  />
                  <p className="eyebrow">{item.when}</p>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.where}</p>
                  <p className="mt-3 leading-relaxed">{item.body}</p>
                  <Link
                    href={item.link.href}
                    prefetch={false}
                    className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-accent transition-[gap] hover:gap-3"
                  >
                    {item.link.label} <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {/* Philosophy */}
          <section className="sheet px-6 py-10 sm:px-10">
            <SectionHeading eyebrow="Philosophy" title="How I work." />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {PHILOSOPHY.map((p, i) => (
                <article key={p.title} data-spotlight className="reveal glass p-6">
                  <span className="font-serif text-4xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-serif text-2xl tracking-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* The span */}
          <section className="sheet overflow-hidden px-6 py-10 sm:px-10">
            <SectionHeading
              eyebrow="The span"
              title={
                <>
                  From retrieval pipelines to <em className="text-iridescent">routed traces</em>.
                </>
              }
              lead="Most AI implementation people have never routed a trace; most hardware people have never tuned a retrieval pipeline. I've done both, so I think about every system the same way: it has to keep working without supervision, not just once in a demo."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {TOOLKIT.map((id) => (
                <li key={id}>
                  <StackChip icon={ICONS[id]} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
