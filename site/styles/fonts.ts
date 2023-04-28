import { Bitter, Poppins } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const headerFont: NextFont = Bitter({
  subsets: ["latin"],
  weight: "500",
});

export const bodyFont: NextFont = Poppins({
  subsets: ["latin"],
  weight: "300",
});
