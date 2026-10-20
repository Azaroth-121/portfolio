"use client";

import { useEffect } from "react";

/**
 * One delegated listener for the whole site: whichever `[data-spotlight]`
 * card is under a fine pointer gets --sx/--sy set to the pointer's position
 * inside it (the CSS draws the glow). At most one style write per frame.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--sx", `${last.clientX - rect.left}px`);
      target.style.setProperty("--sy", `${last.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
