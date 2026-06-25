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
        // Tonal scale — same dark family, different luminance & hue.
        // Nested object so Tailwind generates bg-surface, bg-surface-warm, etc.
        bg: "#030c08",       // ultra-dark forest green (near-black)
        surface: {
          DEFAULT: "#071510", // very dark pine green
          warm:    "#0c221a", // dark pine green
          cool:    "#071510", // very dark pine green
          plum:    "#0c221a", // dark pine green
        },
        card:    "#071510",  // elevated card background
        lime:    { DEFAULT: "#E3EF26", dark: "#0a3325", light: "#E2FBCE" }, // brand vibrant accent
        amber:   "#f59e0b",
        muted:   "#687d74",  // muted slate green
        subtle:  "#a6bdb2",  // soft cream-green labels
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
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
        "lime-glow":   "0 0 30px rgba(227,239,38,0.20), 0 0 60px rgba(227,239,38,0.08)",
        "lime-strong": "0 0 50px rgba(227,239,38,0.30), 0 0 100px rgba(227,239,38,0.12)",
        "card":        "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover":  "0 8px 40px rgba(227,239,38,0.08), 0 4px 20px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
