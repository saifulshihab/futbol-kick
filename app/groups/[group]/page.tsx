import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Info } from "lucide-react";
import {
  groups,
  getGroupById,
  getTeamById,
  getStandingsSorted,
  getFixturesByGroup,
} from "@/lib/data";
import MatchCard from "@/components/MatchCard";
import AdBanner from "@/components/AdBanner";

export function generateStaticParams() {
  return groups.map((g) => ({ group: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const g = getGroupById(group);
  if (!g) return {};
  const teamNames = g.teamIds.map((id) => getTeamById(id)?.name ?? "").join(", ");
  return {
    title: `Group ${g.id} – Standings & Fixtures`,
    description: `FIFA World Cup 2026 Group ${g.id}: standings, fixtures, and team profiles for ${teamNames}.`,
  };
}

// Generate qualification analysis for each team
function analysisForTeam(
  teamId: string,
  idx: number,
  points: number,
  played: number,
): string {
  const remaining = 3 - played;
  if (remaining === 0) {
    if (idx <= 1) return "✅ Qualified for Round of 32";
    return "❌ Eliminated from the tournament";
  }
  if (idx === 0) return `Leading the group with ${points} pts — needs to maintain form.`;
  if (idx === 1) return `In qualification position — ${remaining} game${remaining > 1 ? "s" : ""} remaining.`;
  if (idx === 2) {
    const needed = Math.max(0, 4 - points);
    return `Needs at least ${needed} more point${needed !== 1 ? "s" : ""} in ${remaining} game${remaining > 1 ? "s" : ""}.`;
  }
  return `Must win remaining ${remaining} game${remaining > 1 ? "s" : ""} and hope for results elsewhere.`;
}

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group: groupId } = await params;
  const group = getGroupById(groupId);
  if (!group) notFound();

  const sorted   = getStandingsSorted(group);
  const fixtures = getFixturesByGroup(group.id);
  const upcoming = fixtures.filter((f) => f.status === "upcoming" || f.status === "live");
  const completed = fixtures.filter((f) => f.status === "completed");

  const tableColumns = ["P", "W", "D", "L", "GF", "GA", "GD", "Pts"];

  function qualBg(idx: number) {
    if (idx === 0) return "border-l-4 border-l-green-600";
    if (idx === 1) return "border-l-4 border-l-blue-600";
    return "border-l-4 border-l-transparent";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-brand-muted mb-6">
        <Link href="/groups" className="hover:text-brand-yellow transition-colors">Groups</Link>
        <ChevronRight size={12} />
        <span className="text-brand-white">Group {group.id}</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs text-brand-yellow uppercase tracking-widest mb-1">
          Group Stage · Group {group.id}
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-brand-white"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Group {group.id} — Teams, Fixtures &amp; Standings
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {group.teamIds.map((id) => {
            const t = getTeamById(id);
            return t ? (
              <Link key={id} href={`/teams/${id}`} className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-yellow transition-colors">
                <span className="text-lg">{t.flag}</span>
                <span>{t.name}</span>
              </Link>
            ) : null;
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* ── Main column ─────────────────────────────────────────────── */}
        <div className="space-y-10">

          {/* 1. Standings table */}
          <section>
            <h2
              className="text-xl font-bold text-brand-white mb-4 uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Standings
            </h2>

            <div className="rounded-xl border border-brand-accent overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[4px_1fr_repeat(8,40px)] gap-x-2 items-center bg-brand-mid px-4 py-2.5 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                <span />
                <span>Team</span>
                {tableColumns.map((c) => (
                  <span key={c} className="text-center">{c}</span>
                ))}
              </div>

              {sorted.map((s, idx) => {
                const team = getTeamById(s.teamId);
                if (!team) return null;
                const gd = s.goalsFor - s.goalsAgainst;
                return (
                  <Link
                    key={s.teamId}
                    href={`/teams/${team.id}`}
                    className={`grid grid-cols-[4px_1fr_repeat(8,40px)] gap-x-2 items-center px-4 py-3 border-b border-brand-accent last:border-0 hover:bg-brand-accent transition-colors ${qualBg(idx)}`}
                  >
                    <span />
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">{team.flag}</span>
                      <span className="font-semibold text-brand-white text-sm truncate">{team.name}</span>
                    </span>
                    <span className="text-xs text-brand-muted text-center">{s.played}</span>
                    <span className="text-xs text-brand-muted text-center">{s.won}</span>
                    <span className="text-xs text-brand-muted text-center">{s.drawn}</span>
                    <span className="text-xs text-brand-muted text-center">{s.lost}</span>
                    <span className="text-xs text-brand-muted text-center">{s.goalsFor}</span>
                    <span className="text-xs text-brand-muted text-center">{s.goalsAgainst}</span>
                    <span className={`text-xs text-center ${gd > 0 ? "text-green-400" : gd < 0 ? "text-brand-red" : "text-brand-muted"}`}>
                      {gd > 0 ? `+${gd}` : gd}
                    </span>
                    <span
                      className="text-sm font-bold text-brand-white text-center"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {s.points}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Qualification key */}
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-600" /> Qualifies (1st)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Qualifies (2nd)</span>
            </div>
          </section>

          {/* <AdBanner size="leaderboard" /> */}

          {/* 2. Team cards */}
          <section>
            <h2
              className="text-xl font-bold text-brand-white mb-4 uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Teams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.teamIds.map((id) => {
                const team = getTeamById(id);
                if (!team) return null;
                return (
                  <Link
                    key={id}
                    href={`/teams/${id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group"
                  >
                    <span className="text-4xl shrink-0">{team.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-bold text-brand-white group-hover:text-brand-yellow transition-colors text-base"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {team.name}
                      </p>
                      <p className="text-xs text-brand-muted mt-0.5">
                        FIFA Rank #{team.fifaRank} · Coach: {team.coach}
                      </p>
                      <p className="text-xs text-brand-muted mt-0.5 truncate">{team.formation} · {team.tactics.split(".")[0]}.</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 3. Fixtures */}
          {upcoming.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold text-brand-white mb-4 uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Upcoming Fixtures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {upcoming.slice(0, 4).map((f) => (
                  <MatchCard key={f.id} fixture={f} />
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold text-brand-white mb-4 uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {completed.map((f) => (
                  <MatchCard key={f.id} fixture={f} />
                ))}
              </div>
            </section>
          )}

          {/* <AdBanner size="leaderboard" /> */}

          {/* 4. Mini-analysis */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-brand-yellow" />
              <h2
                className="text-xl font-bold text-brand-white uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Qualification Picture
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sorted.map((s, idx) => {
                const team = getTeamById(s.teamId);
                if (!team) return null;
                const analysis = analysisForTeam(s.teamId, idx, s.points, s.played);
                return (
                  <div
                    key={s.teamId}
                    className="flex gap-3 p-4 rounded-xl border border-brand-accent bg-brand-blue"
                  >
                    <span className="text-2xl shrink-0">{team.flag}</span>
                    <div>
                      <p className="text-sm font-bold text-brand-white mb-1">{team.name}</p>
                      <p className="text-xs text-brand-muted leading-relaxed">{analysis}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="space-y-6">
          {/* <AdBanner size="rectangle" /> */}

          {/* Other groups */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Other Groups
            </h3>
            <div className="space-y-2">
              {groups
                .filter((g) => g.id !== group.id)
                .map((g) => {
                  const leader = getStandingsSorted(g)[0];
                  const leaderTeam = getTeamById(leader.teamId);
                  return (
                    <Link
                      key={g.id}
                      href={`/groups/${g.id}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-brand-accent transition-colors group"
                    >
                      <span className="text-sm font-semibold text-brand-white group-hover:text-brand-yellow transition-colors">
                        Group {g.id}
                      </span>
                      {leaderTeam && (
                        <span className="flex items-center gap-1 text-xs text-brand-muted">
                          <span>{leaderTeam.flag}</span>
                          <span>{leaderTeam.code}</span>
                          <span className="text-brand-yellow font-bold ml-1">{leader.points}pts</span>
                        </span>
                      )}
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Group team flags */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Team Profiles
            </h3>
            <div className="space-y-2">
              {group.teamIds.map((id) => {
                const t = getTeamById(id);
                if (!t) return null;
                return (
                  <Link
                    key={id}
                    href={`/teams/${id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-accent transition-colors group"
                  >
                    <span className="text-xl">{t.flag}</span>
                    <div>
                      <p className="text-sm font-medium text-brand-white group-hover:text-brand-yellow transition-colors">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-brand-muted">#{t.fifaRank} FIFA</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* <AdBanner size="rectangle" /> */}
        </aside>
      </div>
    </div>
  );
}
