import FlagImg from "@/components/FlagImg";
import { teams } from "@/lib/data";
import type { Metadata } from "next";
import TeamsClient from "./TeamsClient";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "All 24 FIFA World Cup 2026 teams — squad lists, coaches, formations, FIFA rankings, and World Cup history for every nation."
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
