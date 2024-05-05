import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gray-100": "#FFFFFF",
        "gray-200": "#FBFBFB",
        "gray-300": "#EFF1F7",
        "gray-400": "#DDDDDD",
        light: "#E0E6ED",
        "secondary-color": "#3E3D3D",
        primary: "#2A839F",
        secondary: "#b3000c",
        silent: "#B0B0B0",
        danger: "#AF0000",
      },
      fontFamily: {
        noto: ["Noto Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
