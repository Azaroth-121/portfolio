import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllNotes, readingMinutes } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ArrowIcon, Container, PageHero } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Notes",
  description: "Writing from Kurt Rainier Sacay on AI implementation, automation, and building things.",
  path: "/notes",
});

const TOPICS = ["RAG systems", "Testing AI against real models", "Automation", "Hardware tangents"];

export default function NotesIndexPage() {
  const notes = getAllNotes();

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Notes", path: "/notes" },
        ])}
      />
      <PageHero
        eyebrow="Notes"
        title={
          <>
            Field notes, <em className="text-iridescent">unhurried</em>.
          </>
        }
        lead="Writing on AI implementation, automation, and building things — published when there's something real to say, never filler."
      >
        <ul className="rise mt-8 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <li key={topic} className="glass-chip px-3.5 py-1.5 font-mono text-xs text-muted">
              {topic}
            </li>
          ))}
        </ul>
      </PageHero>

      <Container>
        <ul className="grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <li key={note.slug}>
              <article data-spotlight className="reveal glass lift group relative flex h-full flex-col p-7 sm:p-9">
                <p className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{readingMinutes(note.content)} min read</span>
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight">
                  <Link href={`/notes/${note.slug}`} prefetch={false} className="after:absolute after:inset-0 after:rounded-[24px]">
                    {note.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{note.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-sm text-accent transition-[gap] group-hover:gap-3">
                  Read <ArrowIcon />
                </span>
              </article>
            </li>
          ))}
          <li>
            <div className="reveal glass flex h-full flex-col justify-center p-7 sm:p-9">
              <p className="eyebrow">Meanwhile</p>
              <p className="mt-4 font-serif text-2xl leading-snug tracking-tight">
                The longest write-ups live in the case studies — problem, approach, architecture, and what I&apos;d do
                differently.
              </p>
              <Link
                href="/work"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent transition-[gap] hover:gap-3"
              >
                Browse the case studies <ArrowIcon />
              </Link>
            </div>
          </li>
        </ul>
      </Container>
    </>
  );
}
