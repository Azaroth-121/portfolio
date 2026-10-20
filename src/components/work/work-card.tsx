import Link from "next/link";
import type { WorkEntry } from "@/lib/content";
import { iconForLabel } from "@/components/stack/icons";
import { StackLogo } from "@/components/stack/stack-logo";
import { ArrowIcon } from "@/components/ui/section";

/** A case study as a glass card. `featured` spans both columns. */
export function WorkCard({ entry, featured = false }: { entry: WorkEntry; featured?: boolean }) {
  const icons = entry.stack
    .map(iconForLabel)
    .filter((icon, i, all): icon is NonNullable<typeof icon> => Boolean(icon) && all.indexOf(icon) === i);

  return (
    <article
      data-spotlight
      className={`reveal glass lift group relative flex flex-col p-7 sm:p-9 ${featured ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">
          {entry.role} · {entry.year}
        </p>
        <div className="flex -space-x-1.5">
          {icons.slice(0, 5).map((icon) => (
            <span key={icon.id} title={icon.title} className="glass-chip grid h-8 w-8 place-items-center">
              <StackLogo icon={icon} size={15} />
            </span>
          ))}
        </div>
      </div>

      <h3 className={`mt-6 font-serif tracking-tight ${featured ? "text-4xl sm:text-5xl" : "text-3xl"} leading-[1.05]`}>
        <Link href={`/work/${entry.slug}`} prefetch={false} className="after:absolute after:inset-0 after:rounded-[24px]">
          {entry.title}
        </Link>
      </h3>
      <p className={`mt-4 leading-relaxed text-muted ${featured ? "max-w-3xl text-lg" : ""}`}>{entry.summary}</p>

      {entry.outcome && featured && (
        <p className="mt-6 max-w-3xl border-l-2 border-accent pl-4 text-sm leading-relaxed">{entry.outcome}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
        <p className="font-mono text-xs text-muted">{entry.stack.join(" · ")}</p>
        <span className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-[gap] group-hover:gap-3">
          Read case study <ArrowIcon />
        </span>
      </div>
    </article>
  );
}
