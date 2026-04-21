/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F5F5F3",
        mist: "#E7E5E4",
        ink: "#1C1C1C",
        coal: "#0F0F0F",
        gold: "#C2A878",
        "gold-deep": "#A88B5C",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Didot", "Georgia", "serif"],
        display: ['"Fraunces"', '"Cormorant Garamond"', "Didot", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": ["clamp(4rem, 14vw, 18rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "11xl": ["clamp(5rem, 18vw, 22rem)", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.76, 0, 0.24, 1)",
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "scrollHint": "scrollHint 2.4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: 0.4 },
          "50%": { transform: "translateY(14px)", opacity: 1 },
        },
        shimmer: {
          "0%, 100%": { opacity: 0.55 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
