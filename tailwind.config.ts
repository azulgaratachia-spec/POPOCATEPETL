import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F766E",
          light: "#14B8A6",
          dark: "#0D5D56",
        },
        secondary: "#1E293B",
        accent: "#F59E0B",
        success: "#10B981",
        warning: "#F97316",
        error: "#EF4444",
        background: "#0F172A",
        surface: "#1E293B",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        border: "#334155",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(15, 118, 110, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
