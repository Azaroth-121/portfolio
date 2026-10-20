import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content", "work");
const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type WorkLink = { label: string; href: string };

export type WorkFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  stack: string[];
  year: string;
  outcome?: string;
  links?: WorkLink[];
  cover?: string;
};

export type WorkEntry = WorkFrontmatter & { content: string };

export type NoteFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  date: string;
};

export type NoteEntry = NoteFrontmatter & { content: string };

function readEntries<T>(dir: string): (T & { content: string })[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as T), content };
    });
}

export function getAllWork(): WorkEntry[] {
  return readEntries<WorkFrontmatter>(WORK_DIR).sort((a, b) =>
    b.year.localeCompare(a.year)
  );
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getAllWork().find((entry) => entry.slug === slug);
}

export function getAllNotes(): NoteEntry[] {
  return readEntries<NoteFrontmatter>(NOTES_DIR).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getNoteBySlug(slug: string): NoteEntry | undefined {
  return getAllNotes().find((entry) => entry.slug === slug);
}

/** ~220 words a minute, never less than one. */
export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
