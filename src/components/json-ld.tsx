export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output cannot contain unescaped user input here — all
      // callers pass static config or trusted MDX frontmatter, never raw form input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
