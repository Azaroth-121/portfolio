import type { ReactNode } from "react";

/** Standard page width + vertical rhythm. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Eyebrow + display heading + optional lead, used to open every section. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        className={`mt-3 font-serif tracking-tight ${
          Tag === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
        } leading-[1.05]`}
      >
        {title}
      </Tag>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

/** Page hero for inner pages: big serif title over the grid veil. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative pb-10 pt-16 sm:pt-24">
      <div className="grid-veil" />
      <Container>
        <div className="rise">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
        </div>
        {children}
      </Container>
    </section>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
