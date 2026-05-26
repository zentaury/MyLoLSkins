import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#010A13",
            foreground: "#F0E6D3",
            primary: {
              50:  "#FFF8E1",
              100: "#FFECB3",
              200: "#FFE082",
              300: "#FFD54F",
              400: "#FFCA28",
              500: "#C89B3C",
              600: "#A07830",
              700: "#785624",
              800: "#503418",
              900: "#28120C",
              DEFAULT: "#C89B3C",
              foreground: "#010A13",
            },
            focus: "#C89B3C",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#C89B3C",
              foreground: "#010A13",
            },
            focus: "#C89B3C",
          },
        },
      },
    }),
  ],
}
