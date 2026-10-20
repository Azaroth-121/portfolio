import type { Metadata } from "next";
import Link from "next/link";
import { PRICING } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, faqPage, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ArrowIcon, Container, PageHero, SectionHeading } from "@/components/ui/section";
import { Faq } from "@/components/ui/faq";
import { ICONS, type IconId } from "@/components/stack/icons";
import { StackLogo } from "@/components/stack/stack-logo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "AI chatbot implementation, automation workflow builds, and web platform builds — three packages with starting prices, from Kurt Rainier Sacay.",
  path: "/services",
});

const PACKAGES: {
  id: string;
  name: string;
  description: string;
  included: string[];
  excluded: string[];
  startingPrice: string;
  icons: IconId[];
  featured?: boolean;
}[] = [
  {
    id: "ai-chatbot",
    name: "AI Chatbot Implementation",
    description:
      "A RAG chatbot built on your own documents — not a generic wrapper around an LLM. I handle chunking strategy, retrieval tuning, and the chat interface end to end.",
    included: [
      "Document ingestion and chunking pipeline",
      "Vector search tuned for retrieval accuracy",
      "Chat interface wired to your site or product",
      "Guardrails so the bot defers instead of guessing",
    ],
    excluded: [
      "Ongoing content/document maintenance after launch",
      "Custom model training or fine-tuning",
    ],
    startingPrice: PRICING.aiChatbot.startingPrice,
    icons: ["openai", "supabase", "typescript"],
    featured: true,
  },
  {
    id: "automation-workflow",
    name: "Automation Workflow Build",
    description:
      "n8n or Make.com automation connecting your CRM, forms, and telephony so information stops getting lost between systems.",
    included: [
      "Process mapping of the current manual workflow",
      "n8n or Make.com automation build",
      "CRM integration (HubSpot or similar)",
      "Handoff documentation for your team",
    ],
    excluded: ["CRM licensing or platform subscription costs", "Data migration from legacy systems"],
    startingPrice: PRICING.automationWorkflow.startingPrice,
    icons: ["n8n", "make", "hubspot"],
  },
  {
    id: "web-platform",
    name: "Web Platform Build",
    description:
      "A Next.js or WordPress site that's SEO-correct from day one — structured data, page speed, and information architecture built in, not bolted on after launch.",
    included: [
      "Next.js or WordPress build, your choice",
      "Technical SEO: structured data, sitemap, page speed",
      "CRM-connected lead capture",
      "Mobile-first, accessible by default",
    ],
    excluded: ["Ongoing content writing", "Paid hosting or domain costs"],
    startingPrice: PRICING.webPlatform.startingPrice,
    icons: ["next", "wordpress", "tailwind"],
  },
];

const PROCESS = [
  { title: "Understand", body: "The business problem first: what breaks today, who it costs, and what done looks like." },
  { title: "Map it by hand", body: "Run the current process manually until it's clear what's actually true — never automate guesses." },
  { title: "Build small, ship early", body: "A working slice in production quickly, then improve it against real use." },
  { title: "Hand it off", body: "Documentation your team can run with, so it keeps working without me." },
];

const FAQ = [
  {
    question: "How much does a RAG chatbot cost to build?",
    answer:
      "Starting prices for each package are listed above. The final number depends on how much of your documentation needs structuring and how complex the retrieval logic needs to be — a chatbot answering from ten pages is a different scope than one answering from a thousand.",
  },
  {
    question: "How long does an automation workflow take to build?",
    answer:
      "It depends on how many systems it connects and how well the manual process is already documented. I map the existing process by hand first, which is also what determines the timeline — a well-understood process automates faster than one nobody's written down.",
  },
  {
    question: "Do you work with clients outside the Philippines?",
    answer:
      "Yes. I work PHT (UTC+8) and regularly coordinate with clients in the US and Australia — see /contact for overlap hours. Everything is delivered remotely regardless of time zone.",
  },
  {
    question: "What's not included in a starting price?",
    answer:
      "Each package lists what's excluded above. In general: ongoing content maintenance, third-party platform costs (hosting, CRM licenses), and scope discovered after the project starts are quoted separately once the actual scope is clear.",
  },
];

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-accent">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

function Dash() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-muted">
      <path strokeLinecap="round" d="M6 12h12" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      {PACKAGES.map((pkg) => (
        <JsonLd key={pkg.id} data={serviceSchema({ name: pkg.name, description: pkg.description })} />
      ))}
      <JsonLd data={faqPage(FAQ)} />

      <PageHero
        eyebrow="Services"
        title={
          <>
            Three ways to <em className="text-iridescent">work together</em>.
          </>
        }
        lead="Starting prices are listed so we both know quickly whether it's a fit. Every package is scoped after a short conversation — no surprises later."
      />

      <Container>
        <ul className="grid gap-4 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <li
              key={pkg.id}
              data-spotlight
              className={`reveal glass lift flex flex-col p-7 ${pkg.featured ? "ring-1 ring-[color-mix(in_oklab,var(--accent-2)_45%,transparent)]" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-1.5">
                  {pkg.icons.map((id) => (
                    <span key={id} title={ICONS[id].title} className="glass-chip grid h-9 w-9 place-items-center rounded-xl">
                      <StackLogo icon={ICONS[id]} size={17} />
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight">{pkg.name}</h2>
              <p className="mt-3 leading-relaxed text-muted">{pkg.description}</p>
              <p className="mt-6">
                <span className="eyebrow block">Starting at</span>
                <span className="font-serif text-5xl tracking-tight">{pkg.startingPrice}</span>
                <span className="ml-2 font-mono text-xs text-muted">{PRICING.aiChatbot.currency}</span>
              </p>
              <div className="hairline my-6" />
              <h3 className="eyebrow">Included</h3>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm">
                {pkg.included.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="eyebrow mt-6">Not included</h3>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm text-muted">
                {pkg.excluded.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Dash />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" prefetch={false} className="mt-auto pt-8">
                <span className={`${pkg.featured ? "btn-primary" : "btn-ghost"} w-full justify-center px-5 py-3 font-mono text-sm`}>
                  Discuss this package <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <section className="py-20">
        <Container>
          <SectionHeading
            className="reveal"
            eyebrow="Process"
            title={
              <>
                How every project <em className="text-iridescent">runs</em>.
              </>
            }
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} data-spotlight className="reveal glass p-6">
                <span className="glass-chip grid h-10 w-10 place-items-center font-mono text-sm text-accent">{i + 1}</span>
                <h3 className="mt-5 font-serif text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-10">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            className="reveal"
            eyebrow="FAQ"
            title="Frequently asked."
            lead={
              <>
                Something else?{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
                  Email me
                </a>{" "}
                — I read every message myself.
              </>
            }
          />
          <Faq items={FAQ} />
        </Container>
      </section>
    </>
  );
}
