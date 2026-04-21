import { useEffect, useRef, useState } from "react";

/**
 * A luxury, silent cursor.
 * - A thin ring that lags behind with spring easing
 * - A precise dot that follows exactly
 * - Scales/morphs on hover over interactive elements
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let raf = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      }
    };

    const loop = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactive = "a, button, [data-cursor], input, textarea, label, [role=button]";

    const onOver = (e) => {
      const el = e.target.closest(interactive);
      if (!el) return;
      const type = el.getAttribute("data-cursor") || "link";
      setVariant(type);
      setLabel(el.getAttribute("data-cursor-label") || "");
    };
    const onOut = (e) => {
      const el = e.target.closest(interactive);
      if (!el) return;
      setVariant("default");
      setLabel("");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  const ringSize =
    variant === "view"
      ? "h-24 w-24 border-transparent bg-ink text-bone"
      : variant === "link"
      ? "h-14 w-14 border-ink/40"
      : "h-9 w-9 border-ink/30";

  return (
    <>
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full border transition-[width,height,background,color,border-color] duration-500 ease-lux md:flex items-center justify-center ${ringSize}`}
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        {variant === "view" && (
          <span className="font-mono text-[10px] uppercase tracking-widest2">
            {label || "View"}
          </span>
        )}
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-1.5 w-1.5 rounded-full bg-ink md:block"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
    </>
  );
}
