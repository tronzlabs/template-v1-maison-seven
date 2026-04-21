import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * Architectural page transition — a pair of coal panels that retract to
 * reveal the next "room". The content underneath is ALWAYS visible from
 * the first frame — only the panels animate, so nothing ever appears
 * "missing" while waiting for a reveal.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();

  return (
    <>
      {children}

      <AnimatePresence initial={false}>
        <motion.div
          key={pathname + "-slab-top"}
          className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-1/2 origin-top bg-coal"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          key={pathname + "-slab-bottom"}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] h-1/2 origin-bottom bg-coal"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.04 }}
        />
      </AnimatePresence>
    </>
  );
}
