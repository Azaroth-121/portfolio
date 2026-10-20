import type { StackIcon } from "./icons";

/** A brand glyph (or monogram) at a given pixel size. Server-rendered SVG. */
export function StackLogo({ icon, size = 22 }: { icon: StackIcon; size?: number }) {
  if (!icon.path) {
    return (
      <span
        aria-hidden="true"
        className="font-serif leading-none tracking-tight"
        style={{ fontSize: size * 0.9, color: icon.hex }}
      >
        {icon.monogram}
      </span>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={icon.ink ? "currentColor" : icon.hex}
      className={icon.ink ? "text-foreground" : undefined}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** Logo + name in a small glass capsule. */
export function StackChip({ icon, size = 16 }: { icon: StackIcon; size?: number }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 font-mono text-xs">
      <StackLogo icon={icon} size={size} />
      {icon.title}
    </span>
  );
}
