import { Instrument_Serif, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/** Body text. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Headings. */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Italic accent words inside headings. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

/** Labels, tags and code. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = [
  inter.variable,
  spaceGrotesk.variable,
  instrumentSerif.variable,
  jetbrainsMono.variable,
].join(" ");
