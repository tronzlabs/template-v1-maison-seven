import { useState } from "react";
import { LinesReveal, Reveal } from "../components/Reveal.jsx";
import MagneticButton from "../components/MagneticButton.jsx";

const INTENTS = ["Residential", "Commercial", "Custom", "Press", "Other"];
const BUDGETS = ["< €150k", "€150k — €400k", "€400k — €1M", "€1M +"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    intent: "Residential",
    budget: "",
    location: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="bg-bone pb-32 pt-28 md:pt-32">
      <section className="wrap">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">— Begin · A Correspondence</p>
            <Reveal delay={0.2}>
              <p className="mt-12 max-w-sm font-serif italic text-ink/70">
                We read every letter carefully and reply within five working days. Two new
                residencies for 2026.
              </p>
            </Reveal>

            <div className="mt-14 space-y-7 font-serif text-lg">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
                  — Atelier
                </p>
                <p className="mt-2">12 Rua das Flores, Porto</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
                  — Write
                </p>
                <a href="mailto:hello@maisonseven.studio" className="link-underline mt-2 inline-block">
                  hello@maisonseven.studio
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
                  — Press
                </p>
                <a href="mailto:press@maisonseven.studio" className="link-underline mt-2 inline-block">
                  press@maisonseven.studio
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(3rem,11vw,13rem)] leading-[0.85] tracking-[-0.035em] text-balance">
              <LinesReveal text="Write" />{" "}
              <LinesReveal text="to us" className="italic font-serif text-ink/70" delay={0.08} />
              <br />
              <LinesReveal text="slowly." delay={0.2} />
            </h1>

            {/* Form */}
            {!sent ? (
              <form onSubmit={submit} className="mt-20 space-y-12">
                <FieldRow>
                  <Field
                    label="Your name"
                    n="01"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                  <Field
                    label="Email"
                    n="02"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    required
                  />
                </FieldRow>

                <FieldRow>
                  <div className="flex-1">
                    <Legend n="03" label="The work is…" />
                    <div className="mt-4 flex flex-wrap gap-3">
                      {INTENTS.map((i) => (
                        <Chip
                          key={i}
                          active={form.intent === i}
                          onClick={() => update("intent")(i)}
                        >
                          {i}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </FieldRow>

                <FieldRow>
                  <div className="flex-1">
                    <Legend n="04" label="Budget range" />
                    <div className="mt-4 flex flex-wrap gap-3">
                      {BUDGETS.map((b) => (
                        <Chip key={b} active={form.budget === b} onClick={() => update("budget")(b)}>
                          {b}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <Field
                    label="Location"
                    n="05"
                    value={form.location}
                    onChange={update("location")}
                    placeholder="Porto, Lisbon, elsewhere…"
                  />
                </FieldRow>

                <div>
                  <Legend n="06" label="Tell us about the room you'd like to live in." />
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className="mt-4 w-full resize-none border-b border-ink/25 bg-transparent pb-3 pt-1 font-serif text-2xl leading-[1.35] outline-none placeholder:italic placeholder:text-ink/35 focus:border-ink"
                    placeholder="A long window, a deep chair, a quiet floor…"
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-10 md:flex-row md:items-center">
                  <p className="max-w-sm font-serif italic text-ink/55">
                    By writing to us, you accept the slow pace of our reply.
                  </p>
                  <MagneticButton
                    type="submit"
                    data-cursor="view"
                    data-cursor-label="Send"
                    className="group relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-ink text-bone transition-colors hover:bg-coal md:h-44 md:w-44"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-widest2">
                      Send letter
                    </span>
                  </MagneticButton>
                </div>
              </form>
            ) : (
              <Reveal>
                <div className="mt-20 border-t border-ink/15 pt-12">
                  <p className="eyebrow">— Received</p>
                  <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
                    Your letter is with us.
                  </h2>
                  <p className="mt-6 max-w-xl font-serif text-lg italic text-ink/70">
                    We will reply in five working days, from Porto. In the meantime, the light
                    over our drafting table is quiet, and yours should be too.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldRow({ children }) {
  return <div className="flex flex-col gap-10 md:flex-row md:items-end md:gap-12">{children}</div>;
}

function Legend({ n, label }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
      <span className="text-ink/35">{n}</span>
      <span className="h-px w-6 bg-ink/25" />
      <span>{label}</span>
    </div>
  );
}

function Field({ label, n, ...rest }) {
  return (
    <label className="flex-1">
      <Legend n={n} label={label} />
      <input
        {...rest}
        className="mt-4 w-full border-b border-ink/25 bg-transparent pb-3 pt-1 font-serif text-2xl outline-none placeholder:italic placeholder:text-ink/35 focus:border-ink"
      />
    </label>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="link"
      className={`rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
        active
          ? "border-ink bg-ink text-bone"
          : "border-ink/25 text-ink/65 hover:border-ink/70 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
