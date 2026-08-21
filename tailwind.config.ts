import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tonal scale — official Arzon Built Branding (Deep Forest & Electric Lime)
        bg: "#060B08",       // deep forest green-black base
        surface: {
          DEFAULT: "#0C120F", // dark forest surface
          warm:    "#121B16", // mid forest slate
          cool:    "#0E1612", // dark slate
          plum:    "#15221B", // forest about background
        },
        card:    "#0E1612",  // elevated glass card
        lime:    { DEFAULT: "#D6FF38", dark: "#B2E01D", light: "#E2FF66" }, // mapped lime to official electric branding lime
        amber:   "#CFFF24",
        muted:   "#6b7280",
        subtle:  "#9ca3af",
      },
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "marquee":    "marquee 28s linear infinite",
        "count-up":   "fadeUp 0.6s ease forwards",
        "shimmer":    "shimmer 3s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "lime-glow":   "0 0 30px rgba(214,255,56,0.18), 0 0 60px rgba(214,255,56,0.06)",
        "lime-strong": "0 0 50px rgba(214,255,56,0.30), 0 0 100px rgba(214,255,56,0.12)",
        "card":        "0 4px 24px rgba(0,0,0,0.6)",
        "card-hover":  "0 8px 40px rgba(214,255,56,0.08), 0 4px 20px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};
export default config;
