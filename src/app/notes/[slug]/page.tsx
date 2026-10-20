import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getAllNotes, getNoteBySlug, readingMinutes } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";
import { buildMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ArrowIcon, Container } from "@/components/ui/section";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};

  return buildMetadata({
    title: note.title,
    description: note.summary,
    path: `/notes/${note.slug}`,
  });
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <article>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Notes", path: "/notes" },
          { name: note.title, path: `/notes/${note.slug}` },
        ])}
      />
      <JsonLd
        data={blogPostingSchema({
          title: note.title,
          description: note.summary,
          path: `/notes/${note.slug}`,
          datePublished: note.date,
        })}
      />
      <header className="relative pb-10 pt-14 sm:pt-20">
        <div className="grid-veil" />
        <Container className="max-w-3xl">
          <Link
            href="/notes"
            prefetch={false}
            className="rise inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-foreground"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" /> All notes
          </Link>
          <p className="rise mt-6 flex flex-wrap gap-3 font-mono text-xs text-muted">
            <time dateTime={note.date}>{formatDate(note.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(note.content)} min read</span>
          </p>
          <h1 className="rise mt-4 font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl">{note.title}</h1>
          <p className="rise mt-5 text-lg leading-relaxed text-muted">{note.summary}</p>
        </Container>
      </header>
      <Container className="max-w-3xl">
        <div className="sheet px-6 py-10 sm:px-12 sm:py-14">
          <div className="prose prose-glass max-w-none prose-p:leading-relaxed">
            <MDXRemote source={note.content} components={mdxComponents} />
          </div>
        </div>
      </Container>
    </article>
  );
}
