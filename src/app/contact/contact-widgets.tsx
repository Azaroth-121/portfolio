"use client";

import { useState, useSyncExternalStore } from "react";

const TICK_MS = 30_000;

function subscribeToClock(onTick: () => void) {
  const id = setInterval(onTick, TICK_MS);
  return () => clearInterval(id);
}

// A stable value per 30-second slot, so React only re-renders on a new slot.
const getSlot = () => Math.floor(Date.now() / TICK_MS);
const getServerSlot = () => null;

/** The current time in Davao — renders a skeleton on the server, then ticks. */
export function DavaoTime() {
  const slot = useSyncExternalStore(subscribeToClock, getSlot, getServerSlot);

  if (slot === null) {
    return <span className="inline-block h-[1em] w-24 animate-pulse rounded bg-[var(--glass-line)] align-middle" />;
  }
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" });
  const day = now.toLocaleDateString("en-US", { timeZone: "Asia/Manila", weekday: "long" });

  return (
    <span className="inline-flex items-center gap-2">
      <span className="pulse-dot" />
      <time suppressHydrationWarning>{time}</time>
      <span className="text-muted">· {day}</span>
    </span>
  );
}

/** Copies the address and confirms it inline. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="btn-ghost px-4 py-2 font-mono text-xs"
      aria-live="polite"
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
