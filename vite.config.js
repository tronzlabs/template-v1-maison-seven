import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * three.js r183 added a deprecation warning to the `Clock` constructor
 * (node_modules/three/src/core/Clock.js:61). Our application code does
 * not use `THREE.Clock`, but `@react-three/fiber@9.6.0` still instantiates
 * one inside its internal state store
 * (node_modules/@react-three/fiber/dist/events-*.esm.js: `new THREE.Clock()`).
 *
 * We cannot reassign `THREE.Clock` at runtime (ESM namespace bindings
 * are immutable and Rolldown rejects the assignment statically), and
 * rewriting fiber's internals would be brittle. Instead we remove the
 * *single* `warn(...)` call from three's Clock module at build time.
 *
 * This is a narrow, auditable patch of a third-party deprecation notice
 * whose root-cause fix (fiber migrating to `THREE.Timer`) is outside
 * our control. Every other three.js deprecation warning remains intact.
 *
 * Vite 8 uses rolldown for both production build AND dev dep
 * pre-bundling, so a single Rollup-style `transform` plugin covers both
 * pipelines when registered in `plugins` *and* `optimizeDeps.rolldownOptions.plugins`.
 */
const CLOCK_WARN_RE =
  /warn\(\s*(['"])Clock: This module has been deprecated\. Please use THREE\.Timer instead\.\1\s*\)\s*;?/;

const threeClockPatch = () => ({
  name: "three-clock-deprecation-patch",
  enforce: "pre",
  transform(code, id) {
    if (
      id.includes("/three/build/three.module.js") ||
      id.includes("/three/src/core/Clock.js") ||
      id.includes("/three/build/three.core.js")
    ) {
      if (CLOCK_WARN_RE.test(code)) {
        return {
          code: code.replace(
            CLOCK_WARN_RE,
            "/* patched: THREE.Clock deprecation warn removed */"
          ),
          map: null,
        };
      }
    }
    return null;
  },
});

export default defineConfig({
  plugins: [react(), threeClockPatch()],
  optimizeDeps: {
    rolldownOptions: {
      plugins: [threeClockPatch()],
    },
  },
});
