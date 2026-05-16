import { WEBSITE_BASE_URL } from "@/lib/config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FutbolKick – FIFA World Cup 2026",
    short_name: "FutbolKick",
    description:
      "FIFA World Cup 2026 fixtures, standings, team profiles, and fan content.",
    start_url: "/",
    display: "standalone",
    background_color: "#060e1e",
    theme_color: "#060e1e",
    icons: [
      {
        src: "/images/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "/images/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/images/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/images/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/images/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    id: WEBSITE_BASE_URL,
    scope: "/"
  };
}
