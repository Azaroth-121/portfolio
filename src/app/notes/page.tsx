import type { Metadata } from "next";
import Link from "next/link";
import { getAllNotes } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Notes",
  description:
    "Writing from Kurt Rainier Sacay on AI implementation, automation, and building things.",
  path: "/notes",
});

export default function NotesIndexPage() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto max-w-[70ch] px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Notes", path: "/notes" },
        ])}
      />
      <h1 className="font-mono text-2xl font-medium tracking-tight">Notes</h1>
      <p className="mt-3 text-muted">Writing on AI implementation, automation, and building things.</p>
      <ul className="mt-10 flex flex-col gap-6">
        {notes.map((note) => (
          <li key={note.slug} className="border-t border-border pt-6">
            <article>
              <h2 className="font-mono text-lg font-medium">
                <Link href={`/notes/${note.slug}`} className="hover:text-accent">
                  {note.title}
                </Link>
              </h2>
              <time dateTime={note.date} className="mt-1 block font-mono text-xs text-muted">
                {new Date(note.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <p className="mt-2 text-muted">{note.summary}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
