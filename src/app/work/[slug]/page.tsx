import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, creativeWorkSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { iconForLabel } from "@/components/stack/icons";
import { StackLogo } from "@/components/stack/stack-logo";
import { ArrowIcon, Container } from "@/components/ui/section";

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

  const all = getAllWork();
  const next = all[(all.findIndex((e) => e.slug === entry.slug) + 1) % all.length];

  return (
    <article>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: entry.title, path: `/work/${entry.slug}` },
        ])}
      />
      <JsonLd
        data={creativeWorkSchema({
          type: SOFTWARE_APPLICATION_SLUGS.has(entry.slug) ? "SoftwareApplication" : "CreativeWork",
          name: entry.title,
          description: entry.summary,
          url: `/work/${entry.slug}`,
        })}
      />

      <header className="relative pb-10 pt-14 sm:pt-20">
        <div className="grid-veil" />
        <Container>
          <Link
            href="/work"
            prefetch={false}
            className="rise inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-foreground"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" /> All work
          </Link>
          <h1 className="rise mt-6 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            {entry.title}
          </h1>
          <p className="rise mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{entry.summary}</p>
        </Container>
      </header>

      <Container className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
        <div className="sheet order-2 px-6 py-10 sm:px-12 sm:py-14 lg:order-1">
          {entry.outcome && (
            <p className="mb-10 rounded-2xl border border-[var(--glass-line)] bg-[var(--glass-strong)] p-5 font-serif text-xl leading-snug sm:text-2xl">
              <span className="eyebrow mb-2 block font-sans not-italic">Outcome</span>
              {entry.outcome}
            </p>
          )}
          <div className="prose prose-glass max-w-none prose-p:leading-relaxed">
            <MDXRemote source={entry.content} components={mdxComponents} />
          </div>
        </div>

        <aside className="glass order-1 flex flex-col gap-6 p-6 lg:sticky lg:top-24 lg:order-2">
          <div>
            <p className="eyebrow">Role</p>
            <p className="mt-1.5">{entry.role}</p>
          </div>
          <div>
            <p className="eyebrow">Year</p>
            <p className="mt-1.5">{entry.year}</p>
          </div>
          <div>
            <p className="eyebrow">Stack</p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {entry.stack.map((label) => {
                const icon = iconForLabel(label);
                return (
                  <li key={label} className="glass-chip inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs">
                    {icon && <StackLogo icon={icon} size={14} />}
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
          {entry.links && entry.links.length > 0 && (
            <div className="flex flex-col gap-2">
              {entry.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center px-5 py-2.5 font-mono text-sm"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </aside>
      </Container>

      {next && next.slug !== entry.slug && (
        <Container className="mt-6">
          <Link
            href={`/work/${next.slug}`}
            prefetch={false}
            data-spotlight
            className="glass lift group flex flex-wrap items-center justify-between gap-4 p-7 sm:p-9"
          >
            <span>
              <span className="eyebrow">Next case study</span>
              <span className="mt-2 block font-serif text-3xl tracking-tight">{next.title}</span>
            </span>
            <span className="glass-chip grid h-12 w-12 place-items-center transition-transform group-hover:translate-x-1">
              <ArrowIcon className="h-5 w-5" />
            </span>
          </Link>
        </Container>
      )}
    </article>
  );
}
