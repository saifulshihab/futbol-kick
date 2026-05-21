import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { WEBSITE_BASE_URL } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, Oswald, Poppins } from "next/font/google";
import "./globals.css";

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FutbolKick",
  url: WEBSITE_BASE_URL,
  description:
    "FIFA World Cup 2026 fixtures, standings, team profiles, and fan content.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${WEBSITE_BASE_URL}/fixtures?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap"
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_BASE_URL),
  title: {
    default: "FutbolKick – FIFA World Cup 2026",
    template: "%s | FutbolKick"
  },
  description:
    "Your #1 source for FIFA World Cup 2026 fixtures, group standings, team profiles, match previews, and fan content.",
  keywords: [
    "FIFA World Cup 2026",
    "football",
    "soccer",
    "fixtures",
    "standings",
    "predictions"
  ],
  openGraph: {
    type: "website",
    siteName: "FutbolKick",
    title: "FutbolKick – FIFA World Cup 2026",
    description:
      "Follow every match, every team, and every moment of the 2026 FIFA World Cup."
  },
  twitter: {
    card: "summary_large_image",
    title: "FutbolKick – FIFA World Cup 2026",
    description:
      "Follow every match, every team, and every moment of the 2026 FIFA World Cup."
  },
  other: {
    "google-site-verification": "rCoTDvqU4l0wusI9cxu5uUYWEw_LZzaAV9Hkpwwg_-w"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${poppins.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={WEBSITE_LD} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
