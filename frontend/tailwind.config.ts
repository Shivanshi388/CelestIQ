import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-light": "rgb(var(--surface-light-rgb) / <alpha-value>)",
        primary: "rgb(var(--primary-rgb) / <alpha-value>)",
        secondary: "rgb(var(--secondary-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        success: "rgb(var(--success-rgb) / <alpha-value>)",
        warning: "rgb(var(--warning-rgb) / <alpha-value>)",
        danger: "rgb(var(--danger-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        border: "var(--border)",
        foreground: "var(--text-main)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(74, 91, 220, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 229, 255, 0.3)',
      }
    },
  },
  plugins: [],
};

export default config;
