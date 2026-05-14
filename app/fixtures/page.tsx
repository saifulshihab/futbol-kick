import type { Metadata } from "next";
import Link from "next/link";
import { fixtures, teams, groups, getTeamById } from "@/lib/data";
import FixturesClient from "./FixturesClient";
import AdBanner from "@/components/AdBanner";
import FlagImg from "@/components/FlagImg";

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description:
    "Full FIFA World Cup 2026 match schedule — upcoming fixtures, live scores, and completed results with filters by group, stage, team, and venue.",
};

// Top scorers dummy data
const topScorers = [
  { name: "Kylian Mbappé",      team: "france",    goals: 3, flag: "fr" },
  { name: "Lionel Messi",       team: "argentina", goals: 3, flag: "ar" },
  { name: "Vinícius Júnior",    team: "brazil",    goals: 2, flag: "br" },
  { name: "Harry Kane",         team: "england",   goals: 2, flag: "gb-eng" },
  { name: "Julián Álvarez",     team: "argentina", goals: 2, flag: "ar" },
];

// "Most watched" = completed fixtures with highest combined goals
const mostWatched = fixtures
  .filter((f) => f.status === "completed" && f.homeScore !== undefined)
  .sort((a, b) => (b.homeScore! + b.awayScore!) - (a.homeScore! + a.awayScore!))
  .slice(0, 4);

export default function FixturesPage() {
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
          Fixtures &amp; Results
        </h1>
        <p className="text-brand-muted text-sm mt-2">
          All {fixtures.length} group-stage matches · Filter by group, stage, or team
        </p>
      </div>

      {/* Ad – leaderboard */}
      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        {/* ── Main: interactive fixtures list ── */}
        <FixturesClient fixtures={fixtures} teams={teams} />

        {/* ── Sidebar ───────────────────────── */}
        <aside className="space-y-6">
          {/* Group quick-links */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Browse by Group
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {groups.map((g) => {
                const teamCodes = g.teamIds.slice(0, 2).map((id) => getTeamById(id)?.flag ?? "");
                return (
                  <Link
                    key={g.id}
                    href={`/groups/${g.id}`}
                    className="flex flex-col items-center gap-1 p-3 rounded-lg border border-brand-accent hover:border-brand-yellow hover:bg-brand-accent transition-colors group"
                  >
                    <span
                      className="text-lg font-bold text-brand-white group-hover:text-brand-yellow transition-colors"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {g.id}
                    </span>
                    <div className="flex gap-1">
                      {teamCodes.map((code) => code && <FlagImg key={code} code={code} size="xs" />)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Top scorers */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Top Scorers
            </h3>
            <div className="space-y-3">
              {topScorers.map((s, i) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-brand-muted text-center">
                    {i + 1}
                  </span>
                  <FlagImg code={s.flag} size="xs" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-white truncate">{s.name}</p>
                  </div>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-accent text-xs font-bold text-brand-yellow">
                    {s.goals}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad rectangle */}
          {/* <AdBanner size="rectangle" /> */}

          {/* Most watched */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
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
                    className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-brand-accent transition-colors group"
                  >
                    <div className="flex items-center gap-1 text-sm text-brand-white group-hover:text-brand-yellow transition-colors min-w-0">
                      <FlagImg code={home.flag} size="xs" />
                      <span className="truncate">{home.code} {f.homeScore}–{f.awayScore} {away.code}</span>
                      <FlagImg code={away.flag} size="xs" />
                    </div>
                    <span className="text-xs text-brand-muted shrink-0">
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
