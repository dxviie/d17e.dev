import { Bitter, Poppins, Satisfy } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const headerFont: NextFont = Bitter({
  subsets: ["latin"],
  weight: "500",
});

export const bodyFont: NextFont = Poppins({
  subsets: ["latin"],
  weight: "300",
});

export const handWrittenFont: NextFont = Satisfy({
  subsets: ["latin"],
  weight: "400",
});
