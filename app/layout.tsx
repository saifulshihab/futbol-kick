import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Oswald } from "next/font/google";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FutbolKick",
  url: "https://futbolkick.com",
  description: "FIFA World Cup 2026 fixtures, standings, team profiles, and fan content.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://futbolkick.com/fixtures?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FutbolKick – FIFA World Cup 2026",
    template: "%s | FutbolKick",
  },
  description:
    "Your #1 source for FIFA World Cup 2026 fixtures, group standings, team profiles, match previews, and fan content.",
  keywords: ["FIFA World Cup 2026", "football", "soccer", "fixtures", "standings", "predictions"],
  openGraph: {
    type: "website",
    siteName: "FutbolKick",
    title: "FutbolKick – FIFA World Cup 2026",
    description:
      "Follow every match, every team, and every moment of the 2026 FIFA World Cup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FutbolKick – FIFA World Cup 2026",
    description: "Follow every match, every team, and every moment of the 2026 FIFA World Cup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
          <JsonLd data={WEBSITE_LD} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
    </html>
  );
}
