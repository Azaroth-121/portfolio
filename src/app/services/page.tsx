import type { Metadata } from "next";
import Link from "next/link";
import { PRICING } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, faqPage, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "AI chatbot implementation, automation workflow builds, and web platform builds — three packages with starting prices, from Kurt Rainier Sacay.",
  path: "/services",
});

const PACKAGES = [
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
  },
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

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      {PACKAGES.map((pkg) => (
        <JsonLd
          key={pkg.id}
          data={serviceSchema({ name: pkg.name, description: pkg.description })}
        />
      ))}
      <JsonLd data={faqPage(FAQ)} />
      <h1 className="font-mono text-2xl font-medium tracking-tight">Services</h1>
      <p className="mt-3 text-muted">
        Three ways to work together. Starting prices are listed so we both
        know quickly whether it&apos;s a fit.
      </p>

      <ul className="mt-10 flex flex-col gap-10">
        {PACKAGES.map((pkg) => (
          <li key={pkg.id} className="border-t border-border pt-8">
            <article>
              <h2 className="font-mono text-lg font-medium">{pkg.name}</h2>
              <p className="mt-2 text-muted">{pkg.description}</p>
              <p className="mt-3 font-mono text-sm">Starting at {pkg.startingPrice}</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                    Included
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1">
                    {pkg.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                    Not included
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-muted">
                    {pkg.excluded.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          Frequently asked
        </h2>
        <dl className="mt-6 flex flex-col gap-6">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-mono text-base font-medium">{item.question}</dt>
              <dd className="mt-2 text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          Ready to start?
        </h2>
        <p className="mt-3 text-muted">
          Tell me about the project and I&apos;ll follow up.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded bg-foreground px-5 py-2.5 font-mono text-sm text-background transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
        <p className="mt-3 text-sm text-muted">
          Or email directly:{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
            {siteConfig.email}
          </a>
        </p>
      </section>
    </div>
  );
}
