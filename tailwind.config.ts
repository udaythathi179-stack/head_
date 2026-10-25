import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          subtle: "var(--surface-subtle)",
          card: "var(--surface-card)",
          border: "var(--surface-border)",
        },
        forest: {
          50: "#F0F6F3",
          100: "#E1EDE7",
          200: "#C4DBD0",
          300: "#9EBFB1",
          400: "#5D947B",
          500: "#2C5743", // Core luxury forest green
          600: "#244937",
          700: "#1D3B2C",
          800: "#152B20",
          900: "#0D1B14",
          950: "#070E0A",
        },
        coral: {
          50: "#FEF4F4",
          100: "#FDE8E8",
          200: "#FCD3D3",
          300: "#F99E9E",
          400: "#F36D6D",
          500: "#E84D4D", // Hairline scanner laser coral red
          600: "#CF3838",
          700: "#A82929",
          800: "#7F2020",
        },
        charcoal: {
          50: "#F5F6F5",
          100: "#E6E8E7",
          200: "#CDD0CF",
          400: "#727875",
          500: "#535956",
          600: "#3A3F3D",
          700: "#272C2A",
          800: "#1A1E1C",
          900: "#141716", // Rich deep obsidian text
          950: "#0C0F0E",
        },
        ivory: {
          DEFAULT: "#F9F8F5", // Warm luxury ivory
          50: "#FDFDFB",
          100: "#F9F8F5",
          200: "#EFECE3",
          300: "#E3DFD3",
        },
        sage: {
          50: "#F5F8F6",
          100: "#EAF1ED",
          200: "#D7E5DD",
          300: "#BDD3C7",
          400: "#92B5A2",
          500: "#67927C",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft-xs': '0 1px 3px rgba(20, 23, 22, 0.04)',
        'soft-sm': '0 2px 8px -2px rgba(20, 23, 22, 0.05), 0 1px 4px -1px rgba(20, 23, 22, 0.02)',
        'soft': '0 12px 32px -10px rgba(20, 23, 22, 0.08), 0 4px 12px -2px rgba(20, 23, 22, 0.03)',
        'soft-lg': '0 24px 48px -15px rgba(20, 23, 22, 0.12), 0 8px 24px -4px rgba(20, 23, 22, 0.06)',
        'glow-forest': '0 0 35px -5px rgba(44, 87, 67, 0.35)',
        'glow-coral': '0 0 30px -5px rgba(232, 77, 77, 0.4)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
      },
      keyframes: {
        "scan-line": {
          "0%": { top: "0%", opacity: "0.2" },
          "50%": { opacity: "0.95" },
          "100%": { top: "100%", opacity: "0.2" }
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      },
      animation: {
        "scan-line": "scan-line 2.8s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "float": "float 5s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      }
    },
  },
  plugins: [],
};
export default config;
