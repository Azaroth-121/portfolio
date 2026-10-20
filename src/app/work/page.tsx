import type { Metadata } from "next";
import { getAllWork } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Container, PageHero } from "@/components/ui/section";
import { WorkCard } from "@/components/work/work-card";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from Kurt Rainier Sacay's client and personal work — governed AI platforms, RAG systems, browser extensions, automation, full-stack web, and embedded hardware.",
  path: "/work",
});

export default function WorkIndexPage() {
  const work = getAllWork();

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <PageHero
        eyebrow={`Work · ${work.length} case studies`}
        title={
          <>
            Problems, decisions, and <em className="text-iridescent">results</em>.
          </>
        }
        lead="Client work and personal builds — governed AI platforms, RAG systems, browser extensions, automation, full-stack web, and embedded hardware. Each one: the problem, the approach, the architecture, and what I'd do differently."
      />
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {work.map((entry, i) => (
            <WorkCard key={entry.slug} entry={entry} featured={i === 0} />
          ))}
        </div>
      </Container>
    </>
  );
}
