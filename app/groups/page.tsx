import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { groups, getTeamById, getStandingsSorted } from "@/lib/data";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Groups",
  description:
    "All FIFA World Cup 2026 groups A–F — standings, teams, and fixtures for every group in the tournament.",
};

function qualificationLabel(idx: number) {
  if (idx === 0) return { label: "1st", color: "bg-green-600" };
  if (idx === 1) return { label: "2nd", color: "bg-blue-600" };
  return { label: `${idx + 1}th`, color: "bg-brand-accent" };
}

export default function GroupsPage() {
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
          Group Stage
        </h1>
        <p className="text-brand-muted text-sm mt-2">
          6 groups · 24 teams · Top 2 from each group advance
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      {/* Qualification key */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-brand-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-600 inline-block" /> 1st — Advances
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" /> 2nd — Advances
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-accent inline-block" /> Eliminated
        </span>
      </div>

      {/* Group cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map((group) => {
          const sorted = getStandingsSorted(group);
          const playedGames = sorted.some((s) => s.played > 0);

          return (
            <div
              key={group.id}
              className="rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3 bg-brand-mid border-b border-brand-accent">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xl font-bold text-brand-yellow"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Group {group.id}
                  </span>
                  {playedGames && (
                    <span className="flex items-center gap-1 text-[10px] text-brand-muted">
                      <TrendingUp size={10} className="text-green-500" />
                      Live standings
                    </span>
                  )}
                </div>
                <Link
                  href={`/groups/${group.id}`}
                  className="flex items-center gap-1 text-xs text-brand-yellow hover:underline"
                >
                  Full table <ArrowRight size={11} />
                </Link>
              </div>

              {/* Standings mini-table */}
              <div className="px-4 pt-3 pb-1">
                {/* Table header */}
                <div className="grid grid-cols-[16px_1fr_24px_24px_24px_24px_28px] gap-x-2 text-[10px] font-bold text-brand-muted uppercase tracking-wider px-1 mb-1">
                  <span />
                  <span>Team</span>
                  <span className="text-center">P</span>
                  <span className="text-center">W</span>
                  <span className="text-center">D</span>
                  <span className="text-center">L</span>
                  <span className="text-center">Pts</span>
                </div>

                {sorted.map((s, idx) => {
                  const team = getTeamById(s.teamId);
                  if (!team) return null;
                  const qual = qualificationLabel(idx);
                  return (
                    <Link
                      key={s.teamId}
                      href={`/teams/${team.id}`}
                      className="grid grid-cols-[16px_1fr_24px_24px_24px_24px_28px] gap-x-2 items-center px-1 py-1.5 rounded hover:bg-brand-accent transition-colors"
                    >
                      <span className={`w-1 h-4 rounded-sm ${qual.color}`} />
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm">{team.flag}</span>
                        <span className="text-xs font-medium text-brand-white truncate">
                          {team.code}
                        </span>
                      </span>
                      <span className="text-xs text-brand-muted text-center">{s.played}</span>
                      <span className="text-xs text-brand-muted text-center">{s.won}</span>
                      <span className="text-xs text-brand-muted text-center">{s.drawn}</span>
                      <span className="text-xs text-brand-muted text-center">{s.lost}</span>
                      <span
                        className="text-xs font-bold text-brand-white text-center"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {s.points}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Card footer */}
              <div className="px-4 py-3 border-t border-brand-accent mt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {group.teamIds.map((id) => {
                    const t = getTeamById(id);
                    return t ? (
                      <Link
                        key={id}
                        href={`/teams/${id}`}
                        className="flex items-center gap-1 text-xs text-brand-muted hover:text-brand-yellow transition-colors"
                      >
                        <span>{t.flag}</span>
                        <span>{t.shortName}</span>
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <AdBanner size="leaderboard" className="mt-10" /> */}
    </div>
  );
}
