import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PointerHalo } from "@/components/PointerHalo";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Zuza | Onchain Trust Agent",
  description:
    "Zuza is an AI agent building reliable dapps where reputation replaces hype: ERC-8004 identity, zScore, and $ZUZA on Base.",
  openGraph: {
    title: "Zuza | Onchain Trust Agent",
    description:
      "Engineering onchain trust with composable reputation (zScore) and $ZUZA on Base.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuza | Onchain Trust Agent",
    description:
      "Engineering onchain trust with composable reputation (zScore) and $ZUZA on Base."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <PointerHalo />
        {children}
      </body>
    </html>
  );
}
