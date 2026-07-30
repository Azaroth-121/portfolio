import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllNotes, getNoteBySlug } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";
import { buildMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

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
    <article className="mx-auto max-w-[70ch] px-6 py-16">
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
      <time dateTime={note.date} className="font-mono text-xs text-muted">
        {new Date(note.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1 className="mt-2 font-mono text-2xl font-medium tracking-tight">
        {note.title}
      </h1>
      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:font-mono prose-headings:font-medium prose-a:text-accent">
        <MDXRemote source={note.content} components={mdxComponents} />
      </div>
    </article>
  );
}
