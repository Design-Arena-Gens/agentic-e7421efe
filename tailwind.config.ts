import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#030712"
      },
      fontFamily: {
        display: ["var(--font-display)", "Rajdhani", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
