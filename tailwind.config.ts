import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "monospace"],
        display: ["DM Sans", "sans-serif"],
      },
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        surface2: "#1a1a24",
        border: "#2a2a3a",
        accent: "#00e5a0",
        accent2: "#7c6bff",
        accent3: "#ff6b6b",
        muted: "#6b6b80",
      },
      animation: {
        pulse2: "pulse2 2s infinite",
        fadeIn: "fadeIn 0.3s ease",
        slideIn: "slideIn 0.4s ease",
      },
      keyframes: {
        pulse2: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".5", transform: "scale(1.3)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
