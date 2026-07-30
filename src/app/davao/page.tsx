import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, faqPage, professionalServiceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

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
    answer:
      "Yes, I'm based in Davao City and can meet in person to talk through the project before anything is built.",
  },
  {
    question: "Do you quote in pesos?",
    answer:
      "Yes, quotes for Davao-based clients are in PHP.",
  },
  {
    question: "What if I just need automation, not a full website?",
    answer:
      "That's a common request — connecting your booking system, CRM, or messaging to cut down manual work without touching the website at all. See /services for what that looks like.",
  },
];

export default function DavaoPage() {
  return (
    <div className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Davao", path: "/davao" },
        ])}
      />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={faqPage(FAQ)} />
      <h1 className="font-mono text-2xl font-medium tracking-tight">
        Web & automation for Davao businesses
      </h1>
      <p className="mt-3 text-lg">
        Kurt Rainier Sacay is a Davao City-based engineer building websites
        and automation for local clinics, restaurants, and shops — in person
        when it helps, quoted in PHP.
      </p>

      <section className="mt-12">
        <h2 className="font-mono text-lg font-medium">What that looks like</h2>
        <p className="mt-3 text-muted">
          Most local businesses don&apos;t need a huge system — they need a
          site that loads fast, shows up when someone searches, and makes it
          easy for a customer to book, call, or message. That&apos;s the
          work: a clean website, connected to whatever booking or messaging
          tool you already use, without extra complexity you&apos;ll never
          touch.
        </p>
        <p className="mt-3 text-muted">
          If the bottleneck isn&apos;t the website but the manual work behind
          it — answering the same questions over messenger, re-entering
          bookings by hand — that&apos;s an automation problem, and I build
          those too.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-lg font-medium">Working together</h2>
        <p className="mt-3 text-muted">
          Based in Davao City and available to meet in person across Davao
          City and the wider Davao Region. Quotes are in PHP. See{" "}
          <Link href="/services" className="text-accent underline underline-offset-4">
            /services
          </Link>{" "}
          for package details, or reach out directly.
        </p>
      </section>

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
          Get in touch
        </h2>
        <p className="mt-3 text-muted">
          Email directly or use the contact form.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded bg-foreground px-5 py-2.5 font-mono text-sm text-background transition-opacity hover:opacity-90"
          >
            Contact form
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded border border-border px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent"
          >
            {siteConfig.email}
          </a>
        </div>
      </section>
    </div>
  );
}
