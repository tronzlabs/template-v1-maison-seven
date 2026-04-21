import { Link } from "react-router-dom";
import tronzlabsLogo from "../assets/tronzlabs-logo.png";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-coal text-bone">
      <div className="wrap pb-10 pt-24 md:pt-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-bone/50">— Available for 2026</p>
            <h2 className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
              Design a <em className="font-serif italic text-gold">quieter</em>
              <br /> house.
            </h2>
            <Link
              to="/contact"
              data-cursor="link"
              className="mt-10 inline-flex items-center gap-4 border-b border-bone/30 pb-2 font-mono text-[11px] uppercase tracking-widest2 text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <span>Begin a conversation</span>
              <svg width="36" height="10" viewBox="0 0 36 10" fill="none">
                <path d="M1 5h33m0 0L30 1m4 4L30 9" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-5 md:grid-cols-2">
            <Block
              heading="Atelier"
              items={[
                "12 Rua das Flores",
                "Porto 4050-262",
                "Portugal",
                "",
                "+351 22 000 1407",
                "hello@maisonseven.studio",
              ]}
            />
            <Block
              heading="Navigate"
              items={[
                ["Projects", "/projects"],
                ["Studio", "/studio"],
                ["Services", "/services"],
                ["Contact", "/contact"],
              ]}
            />
          </div>
        </div>

        <div className="mt-24 border-t border-bone/10 pt-8 flex flex-col gap-6 font-mono text-[10px] uppercase tracking-widest2 text-bone/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Maison Seven — All works reserved.</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-shimmer rounded-full bg-gold" />
            Porto · 41.1496° N · 8.6109° W
          </span>
          <span className="flex items-center gap-2 normal-case tracking-normal text-[11px]">
            <span>Built by</span>
            <a href="https://www.tronzlabs.com" target="_blank" rel="noreferrer">
              <span className="text-white">Tron</span>
              <span className="text-red-500 underline underline-offset-2">z</span>
              <span className="text-gray-400">labs</span>
            </a>
            <img src={tronzlabsLogo} alt="Tronzlabs logo" className="h-4 w-4 object-contain" />
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-6vw] left-0 right-0 select-none text-center"
      >
        <span className="font-display text-[min(22vw,20rem)] leading-none tracking-tight text-bone/[0.045]">
          MAISON · VII
        </span>
      </div>
    </footer>
  );
}

function Block({ heading, items }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
        — {heading}
      </h4>
      <ul className="mt-5 space-y-2 font-serif text-base text-bone/80">
        {items.map((it, i) =>
          Array.isArray(it) ? (
            <li key={i}>
              <Link
                to={it[1]}
                className="link-underline transition-colors hover:text-gold"
                data-cursor="link"
              >
                {it[0]}
              </Link>
            </li>
          ) : (
            <li key={i} className={it === "" ? "h-2" : ""}>
              {it}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
