import { useState } from "react";
import { LinesReveal, Reveal } from "../components/Reveal.jsx";
import { services } from "../data/projects.js";

export default function Services() {
  return (
    <main className="bg-bone pb-32 pt-28 md:pt-32">
      <section className="wrap">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">— Services · 2026</p>
          </div>
          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(3rem,10vw,12rem)] leading-[0.88] tracking-[-0.035em] text-balance">
              <LinesReveal text="Three" />{" "}
              <LinesReveal text="disciplines," className="italic font-serif text-ink/70" delay={0.08} />
              <br />
              <LinesReveal text="one" delay={0.2} />{" "}
              <LinesReveal text="intention." delay={0.28} className="italic font-serif text-ink/70" />
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-12 max-w-xl font-serif text-xl leading-[1.4] italic text-ink/70">
                Whatever the scale, the work is the same: to make rooms that are quiet, honest,
                and weatherproof against fashion.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Accordion of services */}
      <section className="wrap mt-28 md:mt-40">
        {services.map((s, i) => (
          <ServiceRow key={s.n} service={s} index={i} defaultOpen={i === 0} />
        ))}
      </section>

      {/* Process */}
      <section className="wrap mt-40">
        <p className="eyebrow mb-12">— Process · Four Movements</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            ["M.01", "Listening", "A month of conversations before a line is drawn."],
            ["M.02", "Drawing", "Small, patient studies. Models. Many pinned to a single wall."],
            ["M.03", "Choosing", "A long edit. We subtract until the room holds."],
            ["M.04", "Making", "Craft with trusted makers. We are on site often."],
          ].map(([n, t, b], i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="relative border-t border-ink/20 pt-6">
                <div className="absolute right-0 top-0 -translate-y-1/2 bg-bone px-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
                  {n}
                </div>
                <h3 className="font-display text-2xl leading-tight">{t}</h3>
                <p className="mt-4 font-serif text-base leading-relaxed text-ink/70">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Engagement */}
      <section className="wrap mt-40 border-t border-ink/10 pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-8">— Engagement</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight">
              A long correspondence, not a brief.
            </h2>
          </div>
          <div className="md:col-span-7">
            <dl className="space-y-5 font-serif text-lg">
              {[
                ["Residential", "From €180 / m² · 14–22 months"],
                ["Commercial", "From €240 / m² · 9–16 months"],
                ["Custom commissions", "Project-based · 4–10 months"],
                ["Material research", "Retainer, quarterly"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
                  <dt className="italic text-ink/80">{k}</dt>
                  <dd className="text-ink/55">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 font-serif italic text-ink/55">
              All engagements begin with a complimentary studio conversation. We travel for residencies only.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceRow({ service, index, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-ink/15">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="link"
        className="group grid w-full grid-cols-12 items-baseline gap-4 py-10 text-left"
      >
        <span className="col-span-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/50 md:col-span-1">
          {service.n}
        </span>
        <h3 className="col-span-8 font-display text-4xl leading-none tracking-tight md:col-span-7 md:text-7xl">
          <span className="inline-block transition-transform duration-700 ease-lux group-hover:translate-x-2">
            {service.title}
          </span>
        </h3>
        <span className="col-span-2 hidden font-serif italic text-ink/60 md:col-span-3 md:block">
          {service.lead}
        </span>
        <span className="col-span-2 flex justify-end font-mono text-[11px] uppercase tracking-widest2 text-ink/50 md:col-span-1">
          <span
            className={`relative block h-5 w-5 transition-transform duration-700 ease-lux ${
              open ? "rotate-45" : ""
            }`}
          >
            <span className="absolute left-1/2 top-0 block h-5 w-px -translate-x-1/2 bg-ink" />
            <span className="absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-ink" />
          </span>
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-[900ms] ease-lux ${
          open ? "grid-rows-[1fr] pb-16" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-2">
              <p className="font-serif text-xl leading-[1.35] italic text-ink/70">
                {service.body}
              </p>
            </div>
            <ul className="md:col-span-5 md:col-start-7 space-y-3 font-serif text-lg">
              {service.items.map((it) => (
                <li key={it} className="flex items-center gap-4 border-b border-ink/10 pb-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
