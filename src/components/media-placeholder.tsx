export function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label} not yet added`}
      className="my-6 flex h-48 w-full items-center justify-center rounded border border-dashed border-border bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,var(--color-border)_10px,var(--color-border)_11px)] text-center font-mono text-xs text-muted"
    >
      <span className="bg-background px-3 py-1">{label} — TODO: add</span>
    </div>
  );
}
