import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { to: "/", label: "Home", index: "N.01" },
  { to: "/projects", label: "Projects", index: "N.02" },
  { to: "/studio", label: "Studio", index: "N.03" },
  { to: "/services", label: "Services", index: "N.04" },
  { to: "/contact", label: "Contact", index: "N.05" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[55] transition-all duration-700 ease-lux ${
          scrolled
            ? "backdrop-blur-xl bg-bone/70 border-b border-ink/10"
            : "bg-transparent"
        }`}
      >
        <div className="wrap flex h-20 items-center justify-between md:h-24">
          <Link to="/" className="group flex items-center gap-3">
            <Monogram />
            <div className="hidden flex-col leading-none md:flex">
              <span className="font-display text-[15px] tracking-[0.25em]">
                MAISON SEVEN
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest2 text-ink/50">
                Interior Design — Est. 2014
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors duration-500 ease-lux ${
                    isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-ink/30">{l.index}</span>
                    <span className="relative">
                      {l.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-ink transition-all duration-700 ease-lux ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="link"
            className="group flex items-center gap-3"
            aria-label="Toggle menu"
          >
            <span className="hidden font-mono text-[11px] uppercase tracking-widest2 text-ink/70 md:block">
              {open ? "Close" : "Menu"}
            </span>
            <span className="relative flex h-8 w-10 flex-col items-end justify-center gap-[7px]">
              <span
                className={`block h-px bg-ink transition-all duration-500 ease-lux ${
                  open ? "w-10 translate-y-[4px] rotate-45" : "w-10"
                }`}
              />
              <span
                className={`block h-px bg-ink transition-all duration-500 ease-lux ${
                  open ? "w-10 -translate-y-[4px] -rotate-45" : "w-6"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>{open && <FullMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function Monogram() {
  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink/40" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-ink"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          M7
        </text>
      </svg>
    </div>
  );
}

function FullMenu({ onClose }) {
  const panels = [
    {
      img: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
      label: "Living",
      to: "/projects",
    },
    {
      img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1600&q=80",
      label: "Workspace",
      to: "/services",
    },
    {
      img: "https://images.unsplash.com/photo-1615875605825-6f6a9f8d2f0d?auto=format&fit=crop&w=1600&q=80",
      label: "Studio",
      to: "/studio",
    },
  ];

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col bg-coal text-bone"
    >
      <div className="wrap flex h-20 items-center justify-between md:h-24">
        <Link to="/" onClick={onClose} className="flex items-center gap-3">
          <span className="font-display text-[15px] tracking-[0.25em]">MAISON SEVEN</span>
        </Link>
        <button
          onClick={onClose}
          data-cursor="link"
          className="font-mono text-[11px] uppercase tracking-widest2 text-bone/70 hover:text-bone"
        >
          Close
        </button>
      </div>

      <div className="wrap grid flex-1 grid-cols-1 gap-10 overflow-hidden pb-14 pt-6 md:grid-cols-12">
        <nav className="md:col-span-7 flex flex-col justify-center gap-3">
          {LINKS.map((l, i) => (
            <motion.div
              key={l.to}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <NavLink
                to={l.to}
                onClick={onClose}
                end={l.to === "/"}
                className="group flex items-baseline gap-6 border-b border-bone/10 py-5"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-bone/40">
                  {l.index}
                </span>
                <span className="font-display text-5xl leading-none tracking-tight md:text-7xl lg:text-8xl">
                  <span className="inline-block transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:skew-x-[-2deg]">
                    {l.label}
                  </span>
                </span>
                <span className="ml-auto hidden font-serif italic text-bone/40 md:block">
                  &mdash;
                </span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <aside className="hidden md:col-span-5 md:flex flex-col gap-4 overflow-hidden">
          {panels.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex-1 overflow-hidden"
            >
              <img
                src={p.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-coal/30 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute bottom-4 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-bone">
                <span className="h-px w-6 bg-bone/60" />
                {p.label}
              </div>
            </motion.div>
          ))}
        </aside>
      </div>

      <div className="wrap flex items-center justify-between border-t border-bone/10 py-6 font-mono text-[10px] uppercase tracking-widest2 text-bone/50">
        <span>Atelier — Porto · Paris · Kyoto</span>
        <span className="hidden md:block">hello@maisonseven.studio</span>
        <span>© MMXXVI</span>
      </div>
    </motion.div>
  );
}
