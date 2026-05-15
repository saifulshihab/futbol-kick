import FlagImg from "@/components/FlagImg";
import { fixtures, getTeamById, groups } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import FixturesClient from "./FixturesClient";

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description:
    "Full FIFA World Cup 2026 match schedule — upcoming fixtures, live scores, and completed results with filters by group, stage, team, and venue."
};

// Top scorers dummy data
const topScorers = [
  { name: "Kylian Mbappé", team: "france", goals: 3, flag: "fr" },
  { name: "Lionel Messi", team: "argentina", goals: 3, flag: "ar" },
  { name: "Vinícius Júnior", team: "brazil", goals: 2, flag: "br" },
  { name: "Harry Kane", team: "england", goals: 2, flag: "gb-eng" },
  { name: "Julián Álvarez", team: "argentina", goals: 2, flag: "ar" }
];

// "Most watched" = completed fixtures with highest combined goals
const mostWatched = fixtures
  .filter((f) => f.status === "completed" && f.homeScore !== undefined)
  .sort((a, b) => b.homeScore! + b.awayScore! - (a.homeScore! + a.awayScore!))
  .slice(0, 4);

export default function FixturesPage() {
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
          Fixtures &amp; Results
        </h1>
        <p className="text-brand-muted mt-2 text-sm">
          All {fixtures.length} group-stage matches · Filter by group, stage, or
          team
        </p>
      </div>

      {/* Ad – leaderboard */}
      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        {/* ── Main: interactive fixtures list ── */}
        <FixturesClient fixtures={fixtures} />

        {/* ── Sidebar ───────────────────────── */}
        <aside className="space-y-6">
          {/* Group quick-links */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Browse by Group
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {groups.map((g) => {
                const teamCodes = g.teamIds
                  .slice(0, 2)
                  .map((id) => getTeamById(id)?.flag ?? "");
                return (
                  <Link
                    key={g.id}
                    href={`/groups/${g.id}`}
                    className="border-brand-accent hover:border-brand-lime hover:bg-brand-accent group flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors"
                  >
                    <span
                      className="text-brand-white group-hover:text-brand-lime text-lg font-bold transition-colors"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {g.id}
                    </span>
                    <div className="flex gap-1">
                      {teamCodes.map(
                        (code) =>
                          code && <FlagImg key={code} code={code} size="xs" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Top scorers */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Top Scorers
            </h3>
            <div className="space-y-3">
              {topScorers.map((s, i) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="text-brand-muted w-5 text-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <FlagImg code={s.flag} size="xs" />
                  <div className="min-w-0 flex-1">
                    <p className="text-brand-white truncate text-sm font-medium">
                      {s.name}
                    </p>
                  </div>
                  <span className="bg-brand-accent text-brand-lime flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
                    {s.goals}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad rectangle */}
          {/* <AdBanner size="rectangle" /> */}

          {/* Most watched */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Goal Fests
            </h3>
            <div className="space-y-2">
              {mostWatched.map((f) => {
                const home = getTeamById(f.homeTeamId);
                const away = getTeamById(f.awayTeamId);
                if (!home || !away) return null;
                const total = (f.homeScore ?? 0) + (f.awayScore ?? 0);
                return (
                  <Link
                    key={f.id}
                    href={`/matches/${f.id}`}
                    className="hover:bg-brand-accent group flex items-center justify-between gap-2 rounded-lg p-2 transition-colors"
                  >
                    <div className="text-brand-white group-hover:text-brand-lime flex min-w-0 items-center gap-1 text-sm transition-colors">
                      <FlagImg code={home.flag} size="xs" />
                      <span className="truncate">
                        {home.code} {f.homeScore}–{f.awayScore} {away.code}
                      </span>
                      <FlagImg code={away.flag} size="xs" />
                    </div>
                    <span className="text-brand-muted shrink-0 text-xs">
                      {total} goals
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
