/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#f4ead8",
        foreground: "#132629",
        primary: "#a8324a",
        secondary: "#1f3c3d",
        accent: "#c9a35a",
        card: "#fbf5e7",
        muted: "#d8cdc0",
        "muted-foreground": "#425f61",
      },
    },
  },
  plugins: [],
};
