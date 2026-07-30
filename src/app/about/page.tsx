import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Kurt Rainier Sacay on how he works: building to understand, shipping before perfecting, and why he goes from RAG architecture to PCB design.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <h1 className="font-mono text-2xl font-medium tracking-tight">About</h1>

      <p className="mt-6 text-lg">
        I&apos;m Kurt Rainier Sacay, an AI implementation and full-stack
        engineer based in Davao City, Philippines. I&apos;ve spent about two
        years building production RAG systems, automation workflows, and web
        platforms for a B2B technology company, and I&apos;m currently a
        second-year Computer Engineering student taking on outside client
        work.
      </p>

      <section className="mt-14">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          Philosophy
        </h2>

        <div className="mt-6">
          <h3 className="font-mono text-base font-medium">
            Building is how I understand.
          </h3>
          <p className="mt-2">
            I failed a calculus course a few times while working full time.
            Reading the textbook and grinding practice problems on paper
            wasn&apos;t making it stick, so I built{" "}
            <Link href="/work/calcsprint" className="text-accent underline underline-offset-4">
              CalcSprint
            </Link>
            , an exam-prep app for that exact course. Structuring the material
            well enough to teach it forced me to actually understand it — the
            building was the studying.
          </p>
          <p className="mt-3">
            That&apos;s how I approach client work now, too. I don&apos;t
            fully understand a system until I&apos;ve built it, so I build
            early and small rather than specifying endlessly.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-mono text-base font-medium">
            Understand the business problem before the technical one.
          </h3>
          <p className="mt-2">
            My process is the same regardless of scale: understand the
            business problem, model the system carefully, then build
            interfaces that make the complexity invisible. The user should
            never see the machinery. A retrieval pipeline and a PCB routing
            GPS signals are the same job at different altitudes — make
            something complicated behave simply.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-mono text-base font-medium">
            Ship it. Then make it good.
          </h3>
          <p className="mt-2">
            A working thing in production teaches more than a perfect plan.
            The corollary I apply just as strictly: don&apos;t automate a
            process you&apos;ve never run by hand. Automating your guesses
            just encodes your guesses. Do it manually until you know
            what&apos;s actually true, then build the tooling against
            reality.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-mono text-base font-medium">
            Systems that keep working.
          </h3>
          <p className="mt-2">
            Not demos. Not things that impress once and then rot. The measure
            I hold my own work to is whether it&apos;s still running six
            months later without me. Everything in my stack is chosen because
            it holds up unattended.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          The span
        </h2>
        <p className="mt-3">
          I go from RAG architecture to PCB design, and that combination is
          genuinely uncommon. Most AI implementation people have never routed
          a trace; most hardware people have never tuned a retrieval
          pipeline. I&apos;ve done both, and it means I think about systems —
          software or physical — the same way: as something that has to keep
          working without supervision, not just work once in a demo.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          Experience
        </h2>
        <p className="mt-3">
          For about two years, I architected and built production
          infrastructure for a B2B technology company (unnamed under NDA):
          client-server configuration, backend and frontend systems,
          automation workflows, RAG-based conversational AI, and CRM and
          telephony integrations. I owned these systems end to end, not as a
          maintainer brought in after the fact.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xl font-medium tracking-tight">
          Education
        </h2>
        <p className="mt-3">
          Second-year Computer Engineering student, currently enrolled.
        </p>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-mono text-xl font-medium tracking-tight">Now</h2>
        <p className="mt-3">
          I&apos;m available for AI chatbot implementation, automation
          workflow builds, and web platform work — for remote clients and for
          local Davao businesses. I work PHT (UTC+8); see{" "}
          <Link href="/contact" className="text-accent underline underline-offset-4">
            /contact
          </Link>{" "}
          for overlap hours if you&apos;re remote.
        </p>
        <p className="mt-3">
          The fastest way to reach me is email:{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
