"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useShouldRender3D } from "./use-should-render-3d";

const HeroScene = dynamic(() => import("./scene").then((mod) => mod.HeroScene), {
  ssr: false,
});

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 25% 30%, var(--color-accent) 0%, transparent 40%), radial-gradient(circle at 75% 65%, var(--color-accent) 0%, transparent 35%)",
        opacity: 0.12,
      }}
    />
  );
}

export function HeroSceneLoader() {
  const shouldRender3D = useShouldRender3D();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsTabVisible(document.visibilityState === "visible");
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <StaticFallback />
      {shouldRender3D && (
        <div className="absolute inset-0">
          <HeroScene frameloop={isInViewport && isTabVisible ? "always" : "never"} />
        </div>
      )}
    </div>
  );
}
