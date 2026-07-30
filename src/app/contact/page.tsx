import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Kurt Rainier Sacay about an AI chatbot, automation workflow, or web platform build.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <h1 className="font-mono text-2xl font-medium tracking-tight">Contact</h1>
      <p className="mt-3 text-muted">
        Tell me about the project. I read every message myself.
      </p>

      <p className="mt-6">
        Prefer email? Reach me directly at{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-accent underline underline-offset-4"
        >
          {siteConfig.email}
        </a>
        .
      </p>

      <p className="mt-3 text-muted">
        I work {siteConfig.location.timezone} from Davao City, Philippines.
        For US clients, my working day starts in your evening the day
        before; for Australian east-coast clients there&apos;s a comfortable
        midday overlap. Email me and we&apos;ll find a time that works.
      </p>

      <ContactForm />
    </div>
  );
}
