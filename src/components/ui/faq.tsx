/** Glass accordion built on native <details>: keyboard and screen-reader
 *  friendly with no JavaScript. */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details key={item.question} className="faq glass reveal px-6 py-5" name="faq">
          <summary className="flex items-center justify-between gap-6 font-serif text-xl tracking-tight">
            {item.question}
            <span
              aria-hidden="true"
              className="faq-plus glass-chip grid h-8 w-8 shrink-0 place-items-center font-mono text-base"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
