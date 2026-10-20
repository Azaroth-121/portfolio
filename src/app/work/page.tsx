import type { Metadata } from "next";
import Link from "next/link";
import { getAllWork } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from Kurt Rainier Sacay's client and personal work — governed AI platforms, RAG systems, browser extensions, automation, full-stack web, and embedded hardware.",
  path: "/work",
});

export default function WorkIndexPage() {
  const work = getAllWork();

  return (
    <div className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <h1 className="font-mono text-2xl font-medium tracking-tight">Work</h1>
      <p className="mt-3 text-muted">
        Case studies from client work and personal builds — governed AI
        platforms, RAG systems, browser extensions, automation, full-stack
        web, and embedded hardware.
      </p>
      <ul className="mt-10 flex flex-col gap-8">
        {work.map((entry) => (
          <li key={entry.slug} className="border-t border-border pt-6">
            <article>
              <h2 className="font-mono text-lg font-medium">
                <Link href={`/work/${entry.slug}`} className="hover:text-accent">
                  {entry.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted">{entry.summary}</p>
              <p className="mt-3 font-mono text-xs text-muted">
                {entry.stack.join(" · ")}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
