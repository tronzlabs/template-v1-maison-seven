import { useEffect, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects.js";
import { LinesReveal, Reveal } from "../components/Reveal.jsx";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const horizontalRef = useRef(null);
  const trackRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!project || !horizontalRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = horizontalRef.current;

      const getScroll = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hero image parallax
      gsap.fromTo(
        ".pd-hero-img",
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".pd-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Figure reveals
      gsap.utils.toArray(".pd-fig").forEach((el) => {
        gsap.fromTo(
          el.querySelector("img"),
          { scale: 1.2, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) return <Navigate to="/projects" replace />;

  const index = projects.findIndex((p) => p.id === id);
  const next = projects[(index + 1) % projects.length];

  return (
    <main ref={rootRef} className="bg-bone">
      {/* Hero */}
      <section className="pd-hero relative h-[110vh] overflow-hidden">
        <img
          src={project.cover}
          alt={project.name}
          className="pd-hero-img absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/10 via-coal/0 to-coal/60" />
        <div className="absolute inset-0 flex flex-col">
          <div className="wrap flex-1 flex flex-col justify-end pb-16 text-bone">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-bone/80">
              <span className="inline-block h-px w-10 bg-bone/70" />
              <span>{project.index}</span>
              <span>·</span>
              <span>{project.location}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(3rem,13vw,16rem)] leading-[0.85] tracking-[-0.035em]">
              <LinesReveal text={project.name} />
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl leading-[1.3] italic text-bone/80">
              {project.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Credits table */}
      <section className="wrap border-b border-ink/10 py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
          {[
            ["Typology", project.typology],
            ["Discipline", project.discipline],
            ["Location", project.location],
            ["Area", project.area],
            ["Duration", project.duration],
            ["Year", project.year],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
                — {k}
              </div>
              <div className="mt-2 font-serif text-lg">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro + Palette */}
      <section className="wrap grid grid-cols-1 gap-10 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-4">
          <p className="eyebrow sticky top-28">— The Work</p>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.15] tracking-[-0.01em] text-pretty">
              {project.summary}
            </p>
          </Reveal>

          <div className="mt-14 border-t border-ink/10 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">— Palette</p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 font-serif italic text-ink/75">
              {project.palette.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Horizontal chapters */}
      <section ref={horizontalRef} className="relative h-screen overflow-hidden bg-mist/70">
        <div
          ref={trackRef}
          className="flex h-full items-center gap-10 pl-[8vw] pr-[20vw] will-3d"
        >
          <div className="flex h-full w-[45vw] flex-col justify-center pr-8">
            <p className="eyebrow">— Chapters</p>
            <h2 className="mt-8 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-tight">
              Read <em className="font-serif italic text-ink/70">sideways.</em>
            </h2>
            <p className="mt-8 max-w-md font-serif text-lg italic text-ink/60">
              A project narrated laterally — a walk through the house, one room at a time.
            </p>
          </div>

          {project.chapters.map((c, i) => (
            <article
              key={i}
              className="pd-fig relative h-[70vh] w-[55vw] shrink-0 overflow-hidden bg-ink/5"
            >
              <img
                src={project.images[i % project.images.length]}
                alt={c.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-coal/10 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-bone">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-bone/80">
                  <span>Ch. {String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-block h-px w-8 bg-bone/60" />
                </div>
                <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{c.title}</h3>
                <p className="mt-3 max-w-md font-serif text-base leading-relaxed text-bone/80">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full-bleed stack with parallax reveals */}
      <section className="bg-bone py-28 md:py-40">
        <div className="wrap space-y-24">
          {project.images.slice(0, 3).map((src, i) => {
            const layouts = [
              "md:w-full aspect-[16/9]",
              "md:w-[60%] aspect-[4/5] md:ml-[10%]",
              "md:w-[75%] aspect-[3/2] md:ml-auto md:mr-[5%]",
            ];
            return (
              <figure
                key={i}
                className={`pd-fig relative overflow-hidden bg-ink/5 ${layouts[i]}`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </figure>
            );
          })}
        </div>
      </section>

      {/* Pull quote */}
      <section className="wrap py-28 md:py-40">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,5vw,5rem)] leading-[1.1] tracking-tight text-balance">
            “The luxury we design for is
            <em className="font-serif italic text-gold-deep"> the slow return</em> of attention to a single, quiet room.”
          </p>
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
            — Maison Seven · Studio Note, {project.year}
          </p>
        </Reveal>
      </section>

      {/* Next project */}
      <section className="relative h-[80vh] overflow-hidden">
        <img src={next.cover} alt={next.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-coal/55" />
        <Link
          to={`/projects/${next.id}`}
          data-cursor="view"
          data-cursor-label="Enter"
          className="group absolute inset-0 flex flex-col items-center justify-center text-bone"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/70">
            — Next · {next.index}
          </p>
          <h3 className="mt-6 font-display text-[clamp(3rem,11vw,13rem)] leading-[0.85] tracking-[-0.03em]">
            <span className="inline-block transition-transform duration-[900ms] ease-lux group-hover:-translate-y-2 group-hover:skew-x-[-2deg]">
              {next.name}
            </span>
          </h3>
          <p className="mt-4 font-serif italic text-bone/70">{next.typology}</p>
        </Link>
      </section>
    </main>
  );
}
