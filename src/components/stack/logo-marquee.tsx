import type { CSSProperties } from "react";
import { ICONS, MARQUEE_ROWS } from "./icons";
import { StackChip } from "./stack-logo";
import { MotionGate } from "@/components/motion/motion-gate";

/** Two rows of logo capsules drifting in opposite directions. Pure CSS. */
export function LogoMarquee() {
  return (
    <MotionGate className="flex flex-col gap-3">
      {MARQUEE_ROWS.map((row, i) => (
        <div
          key={i}
          className="marquee"
          data-reverse={i % 2 ? "" : undefined}
          style={{ "--dur": `${55 + i * 15}s` } as CSSProperties}
        >
          {/* The row is rendered twice so the -50% loop is seamless. */}
          <div className="marquee-track py-1">
            {[...row, ...row].map((id, j) => (
              <span key={`${id}-${j}`} aria-hidden={j >= row.length ? true : undefined}>
                <StackChip icon={ICONS[id]} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </MotionGate>
  );
}
