import { Syne, DM_Sans } from "next/font/google";

export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
