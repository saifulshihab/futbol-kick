import FlagImg from "@/components/FlagImg";
import { getStandingsSorted, getTeamById, groups } from "@/lib/data";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Groups",
  description:
    "All FIFA World Cup 2026 groups A–F — standings, teams, and fixtures for every group in the tournament."
};

function qualificationLabel(idx: number) {
  if (idx === 0) return { label: "1st", color: "bg-green-600" };
  if (idx === 1) return { label: "2nd", color: "bg-blue-600" };
  return { label: `${idx + 1}th`, color: "bg-brand-accent" };
}

export default function GroupsPage() {
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
          Group Stage
        </h1>
        <p className="text-brand-muted mt-2 text-sm">
          6 groups · 24 teams · Top 2 from each group advance
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      {/* Qualification key */}
      <div className="text-brand-muted mb-6 flex flex-wrap items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-green-600" /> 1st
          — Advances
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-blue-600" /> 2nd —
          Advances
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-brand-accent inline-block h-3 w-3 rounded-sm" />{" "}
          Eliminated
        </span>
      </div>

      {/* Group cards grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const sorted = getStandingsSorted(group);
          const playedGames = sorted.some((s) => s.played > 0);

          return (
            <div
              key={group.id}
              className="border-brand-accent bg-brand-blue hover:border-brand-lime group overflow-hidden rounded-xl border transition-colors"
            >
              {/* Card header */}
              <div className="bg-brand-mid border-brand-accent flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-brand-lime text-xl font-bold"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Group {group.id}
                  </span>
                  {playedGames && (
                    <span className="text-brand-muted flex items-center gap-1 text-[10px]">
                      <TrendingUp size={10} className="text-green-500" />
                      Live standings
                    </span>
                  )}
                </div>
                <Link
                  href={`/groups/${group.id}`}
                  className="text-brand-lime flex items-center gap-1 text-xs hover:underline"
                >
                  Full table <ArrowRight size={11} />
                </Link>
              </div>

              {/* Standings mini-table */}
              <div className="px-4 pt-3 pb-1">
                {/* Table header */}
                <div className="text-brand-muted mb-1 grid grid-cols-[16px_1fr_24px_24px_24px_24px_28px] gap-x-2 px-1 text-[10px] font-bold tracking-wider uppercase">
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
                      className="hover:bg-brand-accent grid grid-cols-[16px_1fr_24px_24px_24px_24px_28px] items-center gap-x-2 rounded px-1 py-1.5 transition-colors"
                    >
                      <span className={`h-4 w-1 rounded-sm ${qual.color}`} />
                      <span className="flex min-w-0 items-center gap-1.5">
                        <FlagImg code={team.flag} size="xs" />
                        <span className="text-brand-white truncate text-xs font-medium">
                          {team.code}
                        </span>
                      </span>
                      <span className="text-brand-muted text-center text-xs">
                        {s.played}
                      </span>
                      <span className="text-brand-muted text-center text-xs">
                        {s.won}
                      </span>
                      <span className="text-brand-muted text-center text-xs">
                        {s.drawn}
                      </span>
                      <span className="text-brand-muted text-center text-xs">
                        {s.lost}
                      </span>
                      <span
                        className="text-brand-white text-center text-xs font-bold"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {s.points}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Card footer */}
              <div className="border-brand-accent mt-1 border-t px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  {group.teamIds.map((id) => {
                    const t = getTeamById(id);
                    return t ? (
                      <Link
                        key={id}
                        href={`/teams/${id}`}
                        className="text-brand-muted hover:text-brand-lime flex items-center gap-1 text-xs transition-colors"
                      >
                        <FlagImg code={t.flag} size="xs" />
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
