import FlagImg from "@/components/FlagImg";
import { WEBSITE_BASE_URL } from "@/lib/config";
import { teams } from "@/lib/data";
import type { Metadata } from "next";
import TeamsClient from "./TeamsClient";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Teams & Squad Profiles",
  description:
    "All 24 FIFA World Cup 2026 teams — squad lists, coaches, formations, FIFA rankings, and World Cup history for every nation.",
  keywords: [
    "FIFA World Cup 2026 teams",
    "World Cup 2026 squads",
    "World Cup 2026 national teams",
    "FIFA rankings 2026",
    "World Cup player list 2026",
    "national team formations 2026",
    "World Cup 2026 coaches"
  ],
  alternates: { canonical: `${WEBSITE_BASE_URL}/teams` },
  openGraph: {
    title: "FIFA World Cup 2026 Teams & Squad Profiles",
    description:
      "Explore all 24 national teams at FIFA World Cup 2026 — full squads, tactical formations, FIFA rankings, and tournament history.",
    url: `${WEBSITE_BASE_URL}/teams`,
    type: "website",
    siteName: "FutbolKick"
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026 Teams & Squad Profiles",
    description:
      "Explore all 24 national teams at FIFA World Cup 2026 — squads, formations, rankings, and history."
  }
};

export default function TeamsPage() {
  const byRank = [...teams].sort((a, b) => a.fifaRank - b.fifaRank);
  const top5 = byRank.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-brand-lime mb-1 text-xs tracking-widest uppercase">
          FIFA World Cup 2026
        </p>
        <h1
          className="text-brand-white text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Team Profiles
        </h1>
        <p className="text-brand-muted mt-2 text-sm">
          {teams.length} teams · 6 groups · Browse by rank, group, or name
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      {/* Top favourites strip */}
      <div className="mb-8">
        <p
          className="text-brand-lime mb-3 text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Top Favourites
        </p>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          {top5.map((t, i) => (
            <a
              key={t.id}
              href={`/teams/${t.id}`}
              className="border-brand-accent bg-brand-blue hover:border-brand-lime group flex min-w-[90px] shrink-0 flex-col items-center gap-2 rounded-xl border p-3 transition-colors"
            >
              <FlagImg code={t.flag} size="md" />
              <span className="text-brand-muted text-[10px] font-bold uppercase">
                {t.code}
              </span>
              <span className="text-brand-lime text-[9px] font-bold">
                #{t.fifaRank}
              </span>
            </a>
          ))}
        </div>
      </div>

      <TeamsClient teams={teams} />
    </div>
  );
}
