import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4F46E5",
          secondary: "#7C3AED",
          accent: "#06B6D4",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          text: "#0F172A",
          "text-secondary": "#475569",
          border: "#E2E8F0",
          success: "#22C55E",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(15 23 42 / 0.04), 0 4px 16px -2px rgb(79 70 229 / 0.08)",
        "card-hover":
          "0 4px 6px -1px rgb(15 23 42 / 0.06), 0 12px 32px -4px rgb(79 70 229 / 0.14)",
        search:
          "0 8px 32px -4px rgb(79 70 229 / 0.12), 0 2px 8px -2px rgb(15 23 42 / 0.04)",
        nav: "0 1px 0 0 rgb(226 232 240 / 0.8)",
      },
      borderRadius: {
        card: "1rem",
        input: "0.75rem",
        pill: "9999px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)",
        "brand-gradient-subtle":
          "linear-gradient(135deg, rgb(79 70 229 / 0.08) 0%, rgb(124 58 237 / 0.06) 50%, rgb(6 182 212 / 0.08) 100%)",
        "page-gradient":
          "radial-gradient(1200px circle at 20% 0%, rgb(79 70 229 / 0.12), transparent 55%), radial-gradient(900px circle at 80% 0%, rgb(6 182 212 / 0.10), transparent 55%), radial-gradient(900px circle at 50% 100%, rgb(124 58 237 / 0.06), transparent 60%)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
