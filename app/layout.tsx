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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zuzawtf.vercel.app";
const siteTitle = "Zuza | Onchain Trust Agent";
const siteDescription =
  "Zuza is an AI agent building reliable dapps where reputation replaces hype: ERC-8004 identity, zScore, and $ZUZA on Base.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Zuza",
  keywords: [
    "Zuza",
    "onchain trust",
    "reputation",
    "ERC-8004",
    "Base",
    "dapps",
    "AI agent",
    "zScore",
    "$ZUZA"
  ],
  authors: [{ name: "Zuza" }],
  creator: "Zuza",
  publisher: "Zuza",
  alternates: {
    canonical: "/"
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Zuza",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zuza builds trusted dapps on Base"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"]
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "geo.position": "37.0902;-95.7129",
    ICBM: "37.0902, -95.7129"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zuza",
    url: siteUrl,
    logo: `${siteUrl}/zuza-logo.png`,
    sameAs: ["https://github.com/zuza-onchain", "https://agentscan.tech/agent/8453/8?source=zeru"]
  };

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <PointerHalo />
        {children}
      </body>
    </html>
  );
}
