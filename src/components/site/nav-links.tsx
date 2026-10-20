"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/site";

/** Primary nav; the current section is lit with a glass capsule. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-end gap-0.5 font-mono text-[12px] sm:text-[13px] md:justify-center">
      {navLinks.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          // Notes is the least-visited page: on phones it moves to the footer so
          // Contact always fits on screen.
          <li key={link.href} className={link.href === "/notes" ? "hidden sm:block" : undefined}>
            <Link
              href={link.href}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={`block whitespace-nowrap rounded-full px-2.5 py-1.5 transition-colors sm:px-3 ${
                active ? "glass-chip text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
