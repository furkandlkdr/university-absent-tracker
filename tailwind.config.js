/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Ana renkler - direkt OKLCH ile seçilen ana renk
        primary: {
          50: "oklch(97% 0.025 var(--hue, 240))",
          100: "oklch(94% 0.05 var(--hue, 240))",
          200: "oklch(89% 0.08 var(--hue, 240))",
          300: "oklch(84% 0.12 var(--hue, 240))",
          400: "oklch(76% 0.16 var(--hue, 240))",
          500: "oklch(68% 0.19 var(--hue, 240))",
          600: "oklch(60% 0.20 var(--hue, 240))",
          700: "oklch(52% 0.18 var(--hue, 240))",
          800: "oklch(44% 0.15 var(--hue, 240))",
          900: "oklch(36% 0.12 var(--hue, 240))",
          950: "oklch(28% 0.09 var(--hue, 240))",
        },

        // İkincil renkler - ana renkten farklı tonda
        accent: {
          50: "oklch(97% 0.025 calc(var(--hue, 240) + 40))",
          100: "oklch(94% 0.05 calc(var(--hue, 240) + 40))",
          200: "oklch(89% 0.08 calc(var(--hue, 240) + 40))",
          300: "oklch(84% 0.12 calc(var(--hue, 240) + 40))",
          400: "oklch(76% 0.16 calc(var(--hue, 240) + 40))",
          500: "oklch(68% 0.19 calc(var(--hue, 240) + 40))",
          600: "oklch(60% 0.20 calc(var(--hue, 240) + 40))",
          700: "oklch(52% 0.18 calc(var(--hue, 240) + 40))",
          800: "oklch(44% 0.15 calc(var(--hue, 240) + 40))",
          900: "oklch(36% 0.12 calc(var(--hue, 240) + 40))",
          950: "oklch(28% 0.09 calc(var(--hue, 240) + 40))",
        },

        // Ana gri tonlar - düşük kromalı ana renk tonları
        gray: {
          50: "oklch(98% 0.003 var(--hue, 240))",
          100: "oklch(95% 0.006 var(--hue, 240))",
          200: "oklch(90% 0.008 var(--hue, 240))",
          300: "oklch(83% 0.01 var(--hue, 240))",
          400: "oklch(70% 0.012 var(--hue, 240))",
          500: "oklch(60% 0.01 var(--hue, 240))",
          600: "oklch(49% 0.008 var(--hue, 240))",
          700: "oklch(39% 0.006 var(--hue, 240))",
          800: "oklch(30% 0.004 var(--hue, 240))",
          900: "oklch(22% 0.002 var(--hue, 240))",
          950: "oklch(15% 0.001 var(--hue, 240))",
        },

        // Arkaplan renkleri
        background: {
          light: "oklch(98% 0.003 var(--hue, 240))", // Açık mod için arkaplan
          DEFAULT: "oklch(98% 0.003 var(--hue, 240))",
          dark: "oklch(15% 0.008 var(--hue, 240))", // Koyu mod için arkaplan
        },

        // Surface renkleri (kartlar, modaller vb.)
        surface: {
          light: "oklch(100% 0 0)", // Beyaz
          dark: "oklch(22% 0.005 var(--hue, 240))", // Koyu mod yüzeyler
        },
      },
    },
  },
  plugins: [],
};
