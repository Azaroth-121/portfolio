"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a decorative, animated region.
 * - Marks it `data-offscreen` while out of view or while the tab is hidden, so
 *   CSS pauses every loop inside it (no GPU work for things nobody sees).
 * - With `parallax`, feeds the pointer position (-1…1) into --px/--py,
 *   throttled to one write per animation frame, fine pointers only.
 */
export function MotionGate({
  children,
  className,
  parallax = false,
}: {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let inView = true;
    const sync = () => {
      const visible = inView && document.visibilityState === "visible";
      if (visible) node.removeAttribute("data-offscreen");
      else node.setAttribute("data-offscreen", "");
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);

    let frame = 0;
    let cleanupPointer = () => {};
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (parallax && finePointer && !reducedMotion) {
      const onMove = (event: PointerEvent) => {
        if (!inView || frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const x = (event.clientX / window.innerWidth) * 2 - 1;
          const y = (event.clientY / window.innerHeight) * 2 - 1;
          node.style.setProperty("--px", x.toFixed(3));
          node.style.setProperty("--py", y.toFixed(3));
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanupPointer = () => window.removeEventListener("pointermove", onMove);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cleanupPointer();
      cancelAnimationFrame(frame);
    };
  }, [parallax]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
