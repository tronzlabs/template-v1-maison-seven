import { LinesReveal, Reveal } from "../components/Reveal.jsx";
import Marquee from "../components/Marquee.jsx";

const team = [
  { name: "Ines de Mora", role: "Principal, Architecture", since: "2014" },
  { name: "Hugo Sant'Ana", role: "Principal, Interiors", since: "2014" },
  { name: "Mei Arakawa", role: "Head of Research", since: "2017" },
  { name: "Luca Veneri", role: "Design Director", since: "2019" },
  { name: "Ada Folch", role: "Material Library", since: "2021" },
  { name: "Tadao Imai", role: "Kyoto Atelier Lead", since: "2022" },
];

const timeline = [
  ["2014", "Maison Seven opens on a single floor above a bakery in Porto."],
  ["2017", "The studio wins its first international commission — Palazzo Ombra, Milan."],
  ["2019", "Paris atelier opens. Research division formally established."],
  ["2022", "Kyoto residency begins. A year dedicated to one house."],
  ["2024", "Casa Lumen published across nine countries; we refuse the tenth."],
  ["2026", "Two residencies for the year. Two. No more."],
];

export default function Studio() {
  return (
    <main className="bg-bone pb-32 pt-28 md:pt-32">
      <section className="wrap">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">— The Studio</p>
          </div>
          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(3rem,11vw,13rem)] leading-[0.85] tracking-[-0.035em] text-balance">
              <LinesReveal text="A" />{" "}
              <LinesReveal
                text="small"
                delay={0.08}
                className="italic font-serif text-ink/70"
              />{" "}
              <LinesReveal text="atelier" delay={0.15} />
              <br />
              <LinesReveal text="in a noisy century." delay={0.25} className="italic font-serif text-ink/70" />
            </h1>
          </div>
        </div>
      </section>

      {/* Portrait + Manifesto */}
      <section className="wrap mt-28 grid grid-cols-1 gap-10 md:grid-cols-12 md:mt-40">
        <figure className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80"
              alt="Atelier portrait"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
            — Rua das Flores, Porto. Photographed in low winter light.
          </figcaption>
        </figure>

        <div className="md:col-span-7 md:pl-10">
          <p className="eyebrow mb-8">— Manifesto · A Quiet Practice</p>
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.15] tracking-[-0.01em] text-balance">
              We are a studio of six. We take two projects a year. We believe that the best rooms
              are the ones that outlive the conversations they began in. We work slowly,
              <em className="font-serif italic text-gold-deep"> deliberately</em>, and for a very small number of people.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <p className="font-serif text-base leading-relaxed text-ink/70">
              Our method begins with a week of measurement — not of the site, but of how our
              clients already live. We listen before we draw. The first drawing is usually the
              fourth conversation.
            </p>
            <p className="font-serif text-base leading-relaxed text-ink/70">
              The studio holds a private material library of over 1,400 samples. We are proud
              that we have used fewer than 40 of them across 12 years.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="wrap mt-32 border-y border-ink/10 py-16 md:mt-48">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            ["12", "Years practicing"],
            ["38", "Projects, all told"],
            ["4", "Material per room"],
            ["2", "New clients a year"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col">
              <span className="font-display text-6xl leading-none md:text-8xl">{n}</span>
              <span className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
                {l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="wrap mt-32">
        <div className="mb-12 flex items-end justify-between">
          <p className="eyebrow">— Atelier · Six people</p>
          <p className="hidden max-w-xs font-serif italic text-ink/50 md:block">
            A small band of stubborn romantics.
          </p>
        </div>

        <ul>
          {team.map((m, i) => (
            <li key={m.name} className="group">
              <div className="grid grid-cols-12 items-baseline gap-4 border-b border-ink/10 py-8">
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/45 md:col-span-1">
                  0{i + 1}
                </span>
                <h3 className="col-span-10 font-display text-3xl leading-none tracking-tight md:col-span-5 md:text-5xl">
                  <span className="inline-block transition-transform duration-700 ease-lux group-hover:translate-x-2">
                    {m.name}
                  </span>
                </h3>
                <span className="col-span-8 font-serif italic text-ink/65 md:col-span-4">
                  {m.role}
                </span>
                <span className="col-span-4 text-right font-mono text-[11px] uppercase tracking-widest2 text-ink/45 md:col-span-2">
                  Since {m.since}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Timeline */}
      <section className="wrap mt-32">
        <p className="eyebrow mb-10">— A Short Chronicle</p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              <LinesReveal text="Twelve" />
              <br />
              <LinesReveal text="measured" className="italic font-serif text-ink/70" delay={0.06} />
              <br />
              <LinesReveal text="years." delay={0.12} />
            </h2>
          </div>
          <ol className="md:col-span-8">
            {timeline.map(([year, event], i) => (
              <li key={i} className="grid grid-cols-12 gap-4 border-b border-ink/10 py-6">
                <span className="col-span-3 font-display text-3xl tracking-tight md:col-span-2 md:text-4xl">
                  {year}
                </span>
                <p className="col-span-9 font-serif text-base leading-relaxed text-ink/75 md:col-span-10 md:text-lg">
                  {event}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-32 overflow-hidden border-y border-ink/10 bg-bone py-14">
        <Marquee
          items={[
            "Lime wash",
            "Travertine",
            "Oak",
            "Brushed brass",
            "Ink linen",
            "Rice paper",
            "Shou sugi ban",
            "Wool bouclé",
          ]}
        />
      </section>
    </main>
  );
}
