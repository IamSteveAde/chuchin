import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#2B2A2A",
          950: "#1A1918",
          800: "#3A3836",
          600: "#5C5955"
        },
        orange: {
          DEFAULT: "#F4661E",
          light: "#F98A50"
        },
        gold: {
          DEFAULT: "#F5A623",
          light: "#F8C15C"
        },
        offwhite: {
          DEFAULT: "#FAF7F2",
          dim: "#F1ECE3"
        },
        white: "#FFFFFF"
      },
      fontFamily: {
  display: ["var(--font-sora)", "sans-serif"],
  body: ["var(--font-body)", "sans-serif"]
},
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }]
      },
      backgroundImage: {
        "aperture-gradient": "linear-gradient(135deg, #F4661E 0%, #F5A623 100%)",
        "film-grain": "url('/images/grain.png')"
      },
      boxShadow: {
        card: "0 20px 60px -20px rgba(43, 42, 42, 0.25)"
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: []
};

export default config;
