import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, faqPage, professionalServiceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ArrowIcon, Container, PageHero, SectionHeading } from "@/components/ui/section";
import { Faq } from "@/components/ui/faq";

export const metadata: Metadata = buildMetadata({
  title: "Web & Automation for Davao Businesses",
  description:
    "Kurt Rainier Sacay builds websites and automation for Davao City clinics, restaurants, and shops — in-person meetings available, quoted in PHP.",
  path: "/davao",
});

const FAQ = [
  {
    question: "Do you build websites for small businesses in Davao?",
    answer:
      "Yes — clinics, restaurants, shops, and local service businesses. I build the site, connect it to a way for customers to reach you (forms, chat, or booking), and make sure it actually shows up in local search.",
  },
  {
    question: "Can we meet in person?",
    answer: "Yes, I'm based in Davao City and can meet in person to talk through the project before anything is built.",
  },
  {
    question: "Do you quote in pesos?",
    answer: "Yes, quotes for Davao-based clients are in PHP.",
  },
  {
    question: "What if I just need automation, not a full website?",
    answer:
      "That's a common request — connecting your booking system, CRM, or messaging to cut down manual work without touching the website at all. See /services for what that looks like.",
  },
];

const OFFERS = [
  {
    title: "A site that gets found",
    body: "Loads fast, shows up when someone searches, and makes it easy for a customer to book, call, or message — connected to the tools you already use.",
  },
  {
    title: "Less manual work",
    body: "Answering the same questions over Messenger, re-entering bookings by hand — that's an automation problem, and I build those too.",
  },
  {
    title: "Local, in person",
    body: "Based in Davao City and available to meet across the city and the wider Davao Region. Quotes in PHP.",
  },
];

export default function DavaoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Davao", path: "/davao" },
        ])}
      />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={faqPage(FAQ)} />

      <PageHero
        eyebrow="Davao City · in person · quoted in PHP"
        title={
          <>
            Web & automation for <em className="text-iridescent">Davao</em> businesses.
          </>
        }
        lead={`${siteConfig.name} is a Davao City-based engineer building websites and automation for local clinics, restaurants, and shops — without extra complexity you'll never touch.`}
      >
        <div className="rise mt-8 flex flex-wrap gap-3">
          <Link href="/contact" prefetch={false} className="btn-primary px-6 py-3 font-mono text-sm">
            Book a meeting <ArrowIcon />
          </Link>
          <Link href="/work/davao-digital-storefront" prefetch={false} className="btn-ghost px-6 py-3 font-mono text-sm">
            See the storefront project
          </Link>
        </div>
      </PageHero>

      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <article key={offer.title} data-spotlight className="reveal glass lift p-7">
              <h2 className="font-serif text-2xl tracking-tight">{offer.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{offer.body}</p>
            </article>
          ))}
        </div>
      </Container>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            className="reveal"
            eyebrow="FAQ"
            title="Frequently asked."
            lead={
              <>
                Or email directly:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
                  {siteConfig.email}
                </a>
              </>
            }
          />
          <Faq items={FAQ} />
        </Container>
      </section>
    </>
  );
}
