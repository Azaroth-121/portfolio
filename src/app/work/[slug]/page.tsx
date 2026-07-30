import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, creativeWorkSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

const SOFTWARE_APPLICATION_SLUGS = new Set([
  "retrieval-augmented-chatbot",
  "interactive-business-calculator",
  "calcsprint",
]);

export function generateStaticParams() {
  return getAllWork().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};

  return buildMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/work/${entry.slug}`,
    ogSubtitle: entry.role,
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: entry.title, path: `/work/${entry.slug}` },
        ])}
      />
      <JsonLd
        data={creativeWorkSchema({
          type: SOFTWARE_APPLICATION_SLUGS.has(entry.slug)
            ? "SoftwareApplication"
            : "CreativeWork",
          name: entry.title,
          description: entry.summary,
          url: `/work/${entry.slug}`,
        })}
      />
      <p className="font-mono text-xs text-muted">
        {entry.role} · {entry.year}
      </p>
      <h1 className="mt-2 font-mono text-2xl font-medium tracking-tight">
        {entry.title}
      </h1>
      <p className="mt-3 text-lg text-muted">{entry.summary}</p>
      <p className="mt-4 font-mono text-xs text-muted">
        {entry.stack.join(" · ")}
      </p>
      {entry.links && entry.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-4">
          {entry.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent underline underline-offset-4"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:font-mono prose-headings:font-medium prose-a:text-accent">
        <MDXRemote source={entry.content} components={mdxComponents} />
      </div>
    </article>
  );
}
