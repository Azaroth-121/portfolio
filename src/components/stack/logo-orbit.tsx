import type { CSSProperties } from "react";
import { ICONS, ORBIT_RINGS } from "./icons";
import { StackLogo } from "./stack-logo";
import { MotionGate } from "@/components/motion/motion-gate";

/**
 * The hero constellation. Pure CSS (see `.orbit*` in globals.css): each ring
 * spins, each chip counter-spins to stay upright and bobs on its own phase.
 * The only JavaScript is MotionGate (pauses it off screen) and the shared
 * pointer tracker that feeds the parallax variables.
 */
export function LogoOrbit() {
  return (
    <MotionGate className="orbit" parallax>
      {ORBIT_RINGS.map((ring, ringIndex) => (
        <div
          key={ringIndex}
          className="orbit-ring"
          data-reverse={ring.reverse ? "" : undefined}
          style={{ "--r": `${ring.radius}%`, "--dur": `${ring.duration}s` } as CSSProperties}
        >
          {ring.icons.map((id, i) => {
            const icon = ICONS[id];
            // Position on the ring's own box: centre + radius·(cos, sin), in %.
            const angle = ((360 / ring.icons.length) * i + ringIndex * 23) * (Math.PI / 180);
            const left = (50 + 50 * Math.cos(angle)).toFixed(3);
            const top = (50 + 50 * Math.sin(angle)).toFixed(3);
            return (
              <div key={id} className="orbit-slot" style={{ left: `${left}%`, top: `${top}%` }}>
                <div
                  className="orbit-chip"
                  style={
                    {
                      "--size": `${ring.size}px`,
                      "--dur": `${ring.duration}s`,
                      "--delay": `${-((i * 1.3 + ringIndex) % 6)}s`,
                    } as CSSProperties
                  }
                  title={icon.title}
                >
                  <span>
                    <StackLogo icon={icon} size={Math.round(ring.size * 0.46)} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div className="orbit-core" aria-hidden="true">
        <span className="font-serif text-3xl italic text-foreground sm:text-4xl">K</span>
      </div>
      <ul className="sr-only">
        {ORBIT_RINGS.flatMap((ring) => ring.icons).map((id) => (
          <li key={id}>{ICONS[id].title}</li>
        ))}
      </ul>
    </MotionGate>
  );
}
