import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAllWork } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { HeroSceneLoader } from "@/components/hero-scene/hero-scene-loader";

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

const CAPABILITIES = [
  {
    title: "AI & LLM systems",
    items: [
      "RAG architecture",
      "Verified citations & output guardrails",
      "Prompt-injection testing",
      "Real-model evaluation",
      "OpenAI API",
    ],
  },
  {
    title: "Full-stack web",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "Chrome extensions", "WordPress"],
  },
  {
    title: "Backend & cloud",
    items: [".NET 8 / C#", "PostgreSQL", "EF Core & Drizzle", "Azure (Container Apps, Bicep)", "Supabase", "Docker"],
  },
  {
    title: "Automation workflows",
    items: ["n8n", "Make.com", "CRM integration", "Telephony APIs"],
  },
  {
    title: "Security & quality",
    items: ["Multi-tenant isolation", "Auth (Entra ID, JWT rotation)", "Automated testing", "CI with security gates"],
  },
  {
    title: "Embedded hardware",
    items: ["Arduino", "KiCad PCB design"],
  },
];

export default function Home() {
  const allWork = getAllWork();
  const selected = SELECTED_WORK_SLUGS.map((slug) =>
    allWork.find((entry) => entry.slug === slug)
  ).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      <section className="relative min-h-[380px] overflow-hidden border-b border-border sm:min-h-[440px]">
        <HeroSceneLoader />
        <div className="relative z-10 mx-auto max-w-[70ch] px-6 py-16">
          <h1 className="font-mono text-3xl font-medium tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg">
            Kurt Rainier Sacay is an AI and full-stack engineer based in Davao
            City, Philippines. I build AI features people can trust — every
            claim cited, every decision approved by a human — on production
            platforms in .NET, Next.js, PostgreSQL and Azure. Available for
            full-time roles and project work, remote or in Davao.
          </p>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            I don&apos;t consider something done until it&apos;s still
            running six months later without me.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded bg-foreground px-5 py-2.5 font-mono text-sm text-background transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
            <Link
              href="/work"
              className="rounded border border-border px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent"
            >
              See the work
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[70ch] px-6 py-16">
      <section className="mt-0">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wide text-muted">
          Selected work
        </h2>
        <ul className="mt-6 flex flex-col gap-8">
          {selected.map((entry) => (
            <li key={entry.slug} className="border-t border-border pt-6">
              <article>
                <h3 className="font-mono text-lg font-medium">
                  <Link
                    href={`/work/${entry.slug}`}
                    prefetch={false}
                    className="hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-2 text-muted">{entry.summary}</p>
              </article>
            </li>
          ))}
        </ul>
        <Link
          href="/work"
          prefetch={false}
          className="mt-6 inline-block font-mono text-sm text-accent underline underline-offset-4"
        >
          View all work →
        </Link>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wide text-muted">
          Capabilities
        </h2>
        <dl className="mt-6 grid gap-8 sm:grid-cols-2">
          {CAPABILITIES.map((group) => (
            <div key={group.title} className="border-t border-border pt-6">
              <dt className="font-mono text-base font-medium">{group.title}</dt>
              <dd className="mt-2 text-muted">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 border-t border-border pt-10">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          Have something to build?
        </h2>
        <p className="mt-3 text-muted">
          I take on a limited number of engagements at a time. If you need a
          RAG system, an automation workflow, or a production web platform,
          get in touch.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded bg-foreground px-5 py-2.5 font-mono text-sm text-background transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
      </section>
      </div>
    </>
  );
}
