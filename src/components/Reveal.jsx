import { motion } from "framer-motion";

/**
 * Section reveal wrapper — fades + rises on enter.
 *
 * NOTE on triggering:
 *   framer-motion's `whileInView` uses IntersectionObserver, which means
 *   it fires *after* the next paint. For above-the-fold content this
 *   creates a visible flash of emptiness. We use a generous positive
 *   rootMargin (+15% bottom) so elements trigger BEFORE entering view,
 *   and `amount: 0` so even 1px of overlap is enough.
 */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px 15% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Masked text reveal. Splits per word, reveals under a translating mask.
 *
 * Default: animates immediately on mount (`immediate={true}`). Use this
 * for hero / above-the-fold headings so they are never caught invisible.
 * Pass `immediate={false}` to defer to scroll-into-view.
 */
export function LinesReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  immediate = true,
}) {
  const words = text.split(" ");

  const triggerProps = immediate
    ? { initial: { y: "110%" }, animate: { y: "0%" } }
    : {
        initial: { y: "110%" },
        whileInView: { y: "0%" },
        viewport: { once: true, amount: 0, margin: "0px 0px 15% 0px" },
      };

  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: 1.05 }}
        >
          <motion.span
            {...triggerProps}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
            className="inline-block pr-[0.25em]"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
