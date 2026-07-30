"use client";

import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT_PX = 768;

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT_PX;
  return !prefersReducedMotion && !isMobileViewport;
}

function getServerSnapshot() {
  return false;
}

// Decides whether the 3D scene should render at all — never on reduced-motion
// or narrow (likely mobile-GPU) viewports. useSyncExternalStore avoids a
// mount-effect setState (see the theme-toggle component for the same pattern).
export function useShouldRender3D() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
