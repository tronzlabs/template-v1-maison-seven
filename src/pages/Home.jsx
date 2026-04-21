import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "../components/Scene3D.jsx";
import { LinesReveal, Reveal } from "../components/Reveal.jsx";
import Marquee from "../components/Marquee.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { projects, rooms, pressQuotes } from "../data/projects.js";

export default function Home() {
  const sceneContainer = useRef(null);
  const scrollRef = useRef(0);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  /* Link scroll progress of the 3D hero to a ref the Canvas reads. */
  useEffect(() => {
    const el = sceneContainer.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      },
    });

    return () => st.kill();
  }, []);

  /* Big number parallax for room sections */
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: () => -ScrollTrigger.maxScroll(window) * speed * 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      gsap.utils.toArray(".featured-project").forEach((el, i) => {
        gsap.fromTo(
          el.querySelector(".fp-img"),
          { scale: 1.2, y: 40 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="relative">
      {/* ===================== HERO / 3D ROOMS ===================== */}
      <section ref={sceneContainer} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <Scene3D scrollRef={scrollRef} />

          {/* Top HUD */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
            <div className="wrap flex h-24 items-end justify-between pb-3">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/60">
                <span className="inline-block h-px w-8 bg-ink/50" />
                <span>N. 41°8′58″ — W. 8°36′39″</span>
              </div>
              <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/60 md:flex">
                <span>Porto · 17°C · Overcast</span>
                <span className="inline-block h-px w-8 bg-ink/50" />
              </div>
            </div>
          </div>

          {/* Hero copy */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
            <div className="wrap pb-24 md:pb-32">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="eyebrow mb-8 flex items-center gap-3"
              >
                <span className="inline-block h-px w-10 bg-ink/40" />
                An interior design studio — Porto · Paris · Kyoto
              </motion.p>

              <h1 className="font-display text-[clamp(3rem,11vw,13rem)] leading-[0.88] tracking-[-0.035em] text-balance">
                <LinesReveal text="Quiet" delay={0.1} />{" "}
                <LinesReveal
                  text="interiors,"
                  delay={0.25}
                  className="italic font-serif text-ink/70"
                />
                <br />
                <LinesReveal text="slow" delay={0.45} />{" "}
                <LinesReveal text="architecture." delay={0.55} />
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"
              >
                <p className="max-w-md font-serif text-lg leading-[1.45] text-ink/75 md:text-xl">
                  Maison Seven composes houses the way one writes a long,
                  quiet sentence. Scroll to walk through them.
                </p>

                <div className="flex items-center gap-6">
                  <Link
                    to="/projects"
                    data-cursor="link"
                    className="pointer-events-auto group flex items-center gap-4 border-b border-ink/30 pb-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors hover:border-ink hover:text-ink"
                  >
                    <span>Selected work</span>
                    <svg width="28" height="10" viewBox="0 0 28 10" fill="none" className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                      <path d="M0 5h26m0 0L22 1m4 4l-4 4" stroke="currentColor" strokeWidth="0.75" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
            <span>Enter</span>
            <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
              <span className="absolute inset-x-0 top-0 block h-3 bg-ink/70 animate-scrollHint" />
            </span>
          </div>

          {/* Room labels — small HUD that changes with scroll */}
          <RoomHUD scrollRef={scrollRef} />
        </div>
      </section>

      {/* ===================== PRINCIPLES ===================== */}
      <section className="relative bg-bone py-32 md:py-48">
        <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow sticky top-28">— 01 · Principles</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              <LinesReveal text="We design" />{" "}
              <LinesReveal text="houses" className="italic font-serif text-ink/70" />{" "}
              <LinesReveal text="that learn to stay quiet." delay={0.15} />
            </h2>
            <Reveal delay={0.2} className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
              {[
                {
                  n: "P.01",
                  t: "Restraint",
                  b: "Four materials, three volumes, one long horizon. The discipline of less is where the luxury lives.",
                },
                {
                  n: "P.02",
                  t: "Light as material",
                  b: "Every opening is composed like a sentence. We place apertures for what they subtract, not for what they show.",
                },
                {
                  n: "P.03",
                  t: "Slowness",
                  b: "A house should reveal itself over ten years, not ten minutes. We design for tenants of time.",
                },
              ].map((p) => (
                <div key={p.n} className="group">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
                    <span className="inline-block h-px w-6 bg-ink/40" />
                    {p.n}
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">
                    {p.t}
                  </h3>
                  <p className="mt-3 font-serif text-base leading-relaxed text-ink/70">
                    {p.b}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== ROOM CHAPTERS ===================== */}
      <section className="relative bg-mist/70 py-32 md:py-48">
        <div className="wrap">
          <div className="mb-20 flex items-end justify-between">
            <p className="eyebrow">— 02 · The Rooms</p>
            <p className="hidden max-w-xs font-serif italic text-ink/60 md:block">
              A sequence of four spaces — read, or simply walked through.
            </p>
          </div>

          <div className="space-y-28 md:space-y-40">
            {rooms.map((r, i) => (
              <RoomBlock key={r.id} room={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE / MANIFESTO ===================== */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-bone py-14">
        <Marquee
          items={[
            "Light as material",
            "Hush",
            "Patina",
            "Slow rooms",
            "Shadow is architecture",
            "Four materials",
            "Long horizons",
          ]}
        />
      </section>

      {/* ===================== FEATURED PROJECTS ===================== */}
      <section className="relative bg-bone py-32 md:py-48">
        <div className="wrap">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-8">— 03 · Selected</p>
              <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] tracking-tight">
                <LinesReveal text="Six houses," />{" "}
                <LinesReveal text="six weathers." className="italic font-serif text-ink/70" delay={0.1} />
              </h2>
            </div>
            <Link
              to="/projects"
              data-cursor="link"
              className="btn-ghost hidden md:inline-flex"
            >
              All works
              <svg width="34" height="10" viewBox="0 0 34 10" fill="none">
                <path d="M0 5h32m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-28 md:grid-cols-12">
            {projects.slice(0, 4).map((p, i) => (
              <FeaturedProject project={p} index={i} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRESS ===================== */}
      <section className="relative bg-coal text-bone py-32 md:py-40">
        <div className="wrap">
          <p className="eyebrow text-bone/50">— 04 · Press</p>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {pressQuotes.map((q, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border-t border-bone/15 pt-6">
                  <p className="font-display text-2xl leading-[1.15] tracking-tight">
                    {q.line}
                  </p>
                  <p className="mt-8 font-mono text-[10px] uppercase tracking-widest2 text-bone/50">
                    — {q.source}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative bg-bone py-28 md:py-40">
        <div className="wrap text-center">
          <p className="eyebrow">— 05 · Residency</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,9vw,9rem)] leading-[0.9] tracking-tight">
            <LinesReveal text="Stay" />{" "}
            <LinesReveal text="with us" className="italic font-serif text-ink/70" />{" "}
            <LinesReveal text="a while." delay={0.1} />
          </h2>
          <Reveal delay={0.3} className="mt-14 flex flex-col items-center gap-6">
            <MagneticButton
              as="button"
              type="button"
              onClick={() => navigate("/contact")}
              data-cursor="view"
              data-cursor-label="Enter"
              className="group relative flex h-48 w-48 items-center justify-center rounded-full border border-ink/30 font-mono text-[11px] uppercase tracking-widest2 transition-colors hover:border-ink"
            >
              <span className="absolute inset-0 m-auto h-[1px] w-10 origin-center scale-x-100 bg-ink/40 transition-transform duration-700 ease-lux group-hover:scale-x-0" />
              <span className="relative">Begin a project</span>
            </MagneticButton>
            <p className="max-w-md font-serif italic text-ink/60">
              Two new residencies for 2026. We accept a small number of projects each year.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ============================ sub-components ============================ */

function RoomBlock({ room, index }) {
  const even = index % 2 === 0;
  return (
    <article
      className={`grid grid-cols-1 gap-10 md:grid-cols-12 ${
        even ? "" : "md:[&>.txt]:order-2"
      }`}
    >
      <div className="txt md:col-span-6 md:pr-8">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
          <span>{room.tag}</span>
          <span className="h-px w-10 bg-ink/30" />
        </div>
        <h3 className="mt-6 font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
          <LinesReveal text={room.title} />
        </h3>
        <p className="mt-8 max-w-md font-serif text-2xl leading-[1.25] italic text-ink/75">
          {room.lead}
        </p>
        <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-ink/65">
          {room.body}
        </p>
      </div>

      <div className="md:col-span-6" data-parallax="0.6">
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
          <img
            src={
              [
                "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=80",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80",
                "https://images.unsplash.com/photo-1615875605825-6f6a9f8d2f0d?auto=format&fit=crop&w=1800&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
              ][index] ||
              "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=80"
            }
            alt={room.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-widest2 text-bone mix-blend-difference">
            — {room.label}
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

function FeaturedProject({ project, index }) {
  const spans = ["md:col-span-8", "md:col-span-4 md:mt-40", "md:col-span-5", "md:col-span-7 md:mt-20"];
  const ratios = ["aspect-[16/10]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[16/9]"];
  return (
    <Link
      to={`/projects/${project.id}`}
      data-cursor="view"
      data-cursor-label="View"
      className={`featured-project group block ${spans[index % 4]}`}
    >
      <figure className={`relative overflow-hidden bg-ink/5 ${ratios[index % 4]}`}>
        <img
          src={project.cover}
          alt={project.name}
          loading="lazy"
          className="fp-img h-full w-full object-cover transition-transform duration-[1500ms] ease-lux group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-coal/0 transition-colors duration-700 group-hover:bg-coal/10" />
      </figure>
      <figcaption className="mt-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
            <span>{project.index}</span>
            <span className="h-px w-8 bg-ink/30" />
            <span>{project.location}</span>
          </div>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 font-serif italic text-ink/55">{project.typology}</p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
          {project.year}
        </span>
      </figcaption>
    </Link>
  );
}

function RoomHUD({ scrollRef }) {
  const labels = ["Arrival", "Living", "Workspace", "Bedroom", "Concept"];
  const activeRef = useRef(0);
  const elRef = useRef(null);

  useEffect(() => {
    let raf;
    const loop = () => {
      const p = scrollRef.current || 0;
      const idx = Math.min(
        labels.length - 1,
        Math.max(0, Math.floor(p * labels.length - 0.001))
      );
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        if (elRef.current) {
          elRef.current.querySelectorAll("[data-i]").forEach((el) => {
            el.dataset.active = el.dataset.i == idx ? "true" : "false";
          });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scrollRef]);

  return (
    <div
      ref={elRef}
      className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 font-mono text-[10px] uppercase tracking-widest2 md:flex"
    >
      {labels.map((l, i) => (
        <div
          key={l}
          data-i={i}
          data-active={i === 0 ? "true" : "false"}
          className="group flex items-center gap-3 text-ink/40 data-[active=true]:text-ink"
        >
          <span className="inline-block h-px w-6 bg-current transition-all duration-500 ease-lux group-data-[active=true]:w-14" />
          <span>
            {String(i + 1).padStart(2, "0")} {l}
          </span>
        </div>
      ))}
    </div>
  );
}
