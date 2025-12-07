/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      xs: "240px",
      sm: "360px",
      md: "480px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1200px",
      "3xl": "1400px",
      hd: "1900px",
      wide: "1921px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
