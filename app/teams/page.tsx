import type { Metadata } from "next";
import { teams } from "@/lib/data";
import TeamsClient from "./TeamsClient";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "All 24 FIFA World Cup 2026 teams — squad lists, coaches, formations, FIFA rankings, and World Cup history for every nation.",
};

export default function TeamsPage() {
  const byRank   = [...teams].sort((a, b) => a.fifaRank - b.fifaRank);
  const top5     = byRank.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs text-brand-yellow uppercase tracking-widest mb-1">
          FIFA World Cup 2026
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-brand-white"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Team Profiles
        </h1>
        <p className="text-brand-muted text-sm mt-2">
          {teams.length} teams · 6 groups · Browse by rank, group, or name
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      {/* Top favourites strip */}
      <div className="mb-8">
        <p
          className="text-xs font-bold text-brand-yellow uppercase tracking-widest mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Top Favourites
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {top5.map((t, i) => (
            <a
              key={t.id}
              href={`/teams/${t.id}`}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors shrink-0 min-w-[90px] group"
            >
              <span className="text-3xl">{t.flag}</span>
              <span className="text-[10px] font-bold text-brand-muted uppercase">{t.code}</span>
              <span className="text-[9px] text-brand-yellow font-bold">#{t.fifaRank}</span>
            </a>
          ))}
        </div>
      </div>

      <TeamsClient teams={teams} />
    </div>
  );
}
