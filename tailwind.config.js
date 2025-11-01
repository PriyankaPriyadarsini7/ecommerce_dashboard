/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#7c3aed",
        accent: "#06b6d4",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(2,6,23,0.08)",
      },
    },
  },
  plugins: [],
};
