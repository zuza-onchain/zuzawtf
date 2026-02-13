import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          0: "rgb(var(--ink-0) / <alpha-value>)",
          1: "rgb(var(--ink-1) / <alpha-value>)",
          2: "rgb(var(--ink-2) / <alpha-value>)",
          3: "rgb(var(--ink-3) / <alpha-value>)",
          4: "rgb(var(--ink-4) / <alpha-value>)"
        },
        brand: {
          0: "rgb(var(--brand-0) / <alpha-value>)",
          1: "rgb(var(--brand-1) / <alpha-value>)",
          2: "rgb(var(--brand-2) / <alpha-value>)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(168, 85, 247, 0.35), 0 20px 80px rgba(168, 85, 247, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;

