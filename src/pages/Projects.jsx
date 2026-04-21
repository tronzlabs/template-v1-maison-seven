import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects.js";
import { LinesReveal } from "../components/Reveal.jsx";

const FILTERS = ["All", "Residential", "Commercial", "Workspace", "Concept"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);
  const rootRef = useRef(null);

  const filtered = projects.filter(
    (p) => filter === "All" || p.discipline === filter
  );

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".pj-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <main ref={rootRef} className="bg-bone pb-32 pt-28 md:pt-32">
      {/* Header */}
      <section className="wrap mb-20 md:mb-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">— Archive · 2014 — 2026</p>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-widest2 text-ink/50">
              {String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} Works
            </p>
          </div>
          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(3.25rem,12vw,14rem)] leading-[0.85] tracking-[-0.035em] text-balance">
              <LinesReveal text="Twelve" />{" "}
              <LinesReveal text="years," className="italic font-serif text-ink/70" delay={0.08} />
              <br />
              <LinesReveal text="many" delay={0.2} />{" "}
              <LinesReveal text="quiet rooms." delay={0.28} className="italic font-serif text-ink/70" />
            </h1>
          </div>
        </div>
      </section>

      {/* Filter rail */}
      <section className="wrap mb-12 flex flex-col gap-6 border-y border-ink/10 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-cursor="link"
              className={`relative font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                filter === f ? "text-ink" : "text-ink/45 hover:text-ink"
              }`}
            >
              {f}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-lux ${
                  filter === f ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
          Drag · Scroll · Observe
        </p>
      </section>

      {/* List view — editorial rows with hover preview */}
      <section className="wrap relative">
        <ul className="relative">
          {filtered.map((p, i) => (
            <li
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="pj-row group"
            >
              <Link
                to={`/projects/${p.id}`}
                data-cursor="view"
                data-cursor-label="Enter"
                className="relative grid grid-cols-12 items-center gap-4 border-b border-ink/10 py-8 md:py-10"
              >
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/45 md:col-span-1">
                  {p.index}
                </span>
                <h2 className="col-span-10 font-display text-3xl leading-none tracking-tight md:col-span-5 md:text-6xl lg:text-7xl">
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="inline-block transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:skew-x-[-2deg]">
                      {p.name}
                    </span>
                  </span>
                </h2>
                <span className="hidden font-serif italic text-ink/60 md:col-span-3 md:block">
                  {p.typology}
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-widest2 text-ink/50 md:col-span-2 md:block">
                  {p.location}
                </span>
                <span className="hidden justify-end text-right font-mono text-[11px] uppercase tracking-widest2 text-ink/50 md:col-span-1 md:flex">
                  {p.year}
                </span>

                {/* Small image peek */}
                <div
                  className={`pointer-events-none absolute right-0 top-1/2 hidden aspect-[4/5] w-64 -translate-y-1/2 overflow-hidden transition-all duration-[800ms] ease-lux md:block ${
                    hovered === p.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ right: "6%" }}
                >
                  <img
                    src={p.cover}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Grid gallery below list */}
      <section className="wrap mt-32">
        <div className="mb-12 flex items-end justify-between">
          <p className="eyebrow">— Thumbnails</p>
          <p className="hidden font-serif italic text-ink/50 md:block">
            A distant glance before entering.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <Link
              to={`/projects/${p.id}`}
              key={p.id}
              data-cursor="view"
              data-cursor-label="View"
              className="group relative block aspect-[4/5] overflow-hidden bg-ink/5"
            >
              <img
                src={p.cover}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-coal/0 transition-colors group-hover:bg-coal/20" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest2 text-bone mix-blend-difference">
                <span>{p.index}</span>
                <span>·</span>
                <span>{p.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
