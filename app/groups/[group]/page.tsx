import FlagImg from "@/components/FlagImg";
import MatchCard from "@/components/MatchCard";
import { WEBSITE_BASE_URL } from "@/lib/config";
import {
  getFixturesByGroup,
  getGroupById,
  getStandingsSorted,
  getTeamById,
  groups
} from "@/lib/data";
import { ChevronRight, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return groups.map((g) => ({ group: g.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const g = getGroupById(group);
  if (!g) return {};
  const teamNames = g.teamIds
    .map((id) => getTeamById(id)?.name ?? "")
    .join(", ");
  return {
    title: `Group ${g.id} – FIFA World Cup 2026 Standings & Fixtures`,
    description: `FIFA World Cup 2026 Group ${g.id}: standings, fixtures, and team profiles for ${teamNames}.`,
    keywords: [
      `World Cup 2026 Group ${g.id}`,
      `FIFA 2026 Group ${g.id} standings`,
      `Group ${g.id} fixtures 2026`,
      `World Cup Group ${g.id} teams`,
      ...g.teamIds
        .map((id) => getTeamById(id)?.name)
        .filter(Boolean)
        .map((n) => `${n} World Cup 2026`)
    ],
    alternates: { canonical: `${WEBSITE_BASE_URL}/groups/${group}` },
    openGraph: {
      title: `Group ${g.id} – FIFA World Cup 2026 Standings`,
      description: `Standings and fixtures for FIFA World Cup 2026 Group ${g.id}: ${teamNames}.`,
      url: `${WEBSITE_BASE_URL}/groups/${group}`,
      type: "website",
      siteName: "FutbolKick"
    },
    twitter: {
      card: "summary_large_image",
      title: `Group ${g.id} – FIFA World Cup 2026`,
      description: `Group ${g.id} standings and fixtures: ${teamNames}.`
    }
  };
}

// Generate qualification analysis for each team
function analysisForTeam(
  teamId: string,
  idx: number,
  points: number,
  played: number
): string {
  const remaining = 3 - played;
  if (remaining === 0) {
    if (idx <= 1) return "✅ Qualified for Round of 32";
    return "❌ Eliminated from the tournament";
  }
  if (idx === 0)
    return `Leading the group with ${points} pts — needs to maintain form.`;
  if (idx === 1)
    return `In qualification position — ${remaining} game${remaining > 1 ? "s" : ""} remaining.`;
  if (idx === 2) {
    const needed = Math.max(0, 4 - points);
    return `Needs at least ${needed} more point${needed !== 1 ? "s" : ""} in ${remaining} game${remaining > 1 ? "s" : ""}.`;
  }
  return `Must win remaining ${remaining} game${remaining > 1 ? "s" : ""} and hope for results elsewhere.`;
}

export default async function GroupDetailPage({
  params
}: {
  params: Promise<{ group: string }>;
}) {
  const { group: groupId } = await params;
  const group = getGroupById(groupId);
  if (!group) notFound();

  const sorted = getStandingsSorted(group);
  const fixtures = getFixturesByGroup(group.id);
  const upcoming = fixtures.filter(
    (f) => f.status === "upcoming" || f.status === "live"
  );
  const completed = fixtures.filter((f) => f.status === "completed");

  const tableColumns = ["P", "W", "D", "L", "GF", "GA", "GD", "Pts"];

  function qualBg(idx: number) {
    if (idx === 0) return "border-l-4 border-l-green-600";
    if (idx === 1) return "border-l-4 border-l-blue-600";
    return "border-l-4 border-l-transparent";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="text-brand-muted mb-6 flex items-center gap-1 text-xs">
        <Link
          href="/groups"
          className="hover:text-brand-lime transition-colors"
        >
          Groups
        </Link>
        <ChevronRight size={12} />
        <span className="text-brand-white">Group {group.id}</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <p className="text-brand-lime mb-1 text-xs tracking-widest uppercase">
          Group Stage · Group {group.id}
        </p>
        <h1
          className="text-brand-white text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Group {group.id} — Teams, Fixtures &amp; Standings
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {group.teamIds.map((id) => {
            const t = getTeamById(id);
            return t ? (
              <Link
                key={id}
                href={`/teams/${id}`}
                className="text-brand-muted hover:text-brand-lime flex items-center gap-1.5 text-sm transition-colors"
              >
                <FlagImg code={t.flag} size="xs" />
                <span>{t.name}</span>
              </Link>
            ) : null;
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* ── Main column ─────────────────────────────────────────────── */}
        <div className="space-y-10">
          {/* 1. Standings table */}
          <section>
            <h2
              className="text-brand-white mb-4 text-xl font-bold uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Standings
            </h2>

            <div className="border-brand-accent overflow-hidden rounded-xl border">
              {/* Table header */}
              <div className="bg-brand-mid text-brand-muted grid grid-cols-[4px_1fr_repeat(8,40px)] items-center gap-x-2 px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase">
                <span />
                <span>Team</span>
                {tableColumns.map((c) => (
                  <span key={c} className="text-center">
                    {c}
                  </span>
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
                    className={`border-brand-accent hover:bg-brand-accent grid grid-cols-[4px_1fr_repeat(8,40px)] items-center gap-x-2 border-b px-4 py-3 transition-colors last:border-0 ${qualBg(idx)}`}
                  >
                    <span />
                    <span className="flex min-w-0 items-center gap-2">
                      <FlagImg
                        code={team.flag}
                        size="sm"
                        className="shrink-0"
                      />
                      <span className="text-brand-white truncate text-sm font-semibold">
                        {team.name}
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
                    <span className="text-brand-muted text-center text-xs">
                      {s.goalsFor}
                    </span>
                    <span className="text-brand-muted text-center text-xs">
                      {s.goalsAgainst}
                    </span>
                    <span
                      className={`text-center text-xs ${gd > 0 ? "text-green-400" : gd < 0 ? "text-brand-red" : "text-brand-muted"}`}
                    >
                      {gd > 0 ? `+${gd}` : gd}
                    </span>
                    <span
                      className="text-brand-white text-center text-sm font-bold"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {s.points}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Qualification key */}
            <div className="text-brand-muted mt-3 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-green-600" />{" "}
                Qualifies (1st)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-blue-600" />{" "}
                Qualifies (2nd)
              </span>
            </div>
          </section>

          {/* <AdBanner size="leaderboard" /> */}

          {/* 2. Team cards */}
          <section>
            <h2
              className="text-brand-white mb-4 text-xl font-bold uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Teams
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.teamIds.map((id) => {
                const team = getTeamById(id);
                if (!team) return null;
                return (
                  <Link
                    key={id}
                    href={`/teams/${id}`}
                    className="border-brand-accent bg-brand-blue hover:border-brand-lime group flex items-center gap-4 rounded-xl border p-4 transition-colors"
                  >
                    <FlagImg code={team.flag} size="md" className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-brand-white group-hover:text-brand-lime text-base font-bold transition-colors"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {team.name}
                      </p>
                      <p className="text-brand-muted mt-0.5 text-xs">
                        FIFA Rank #{team.fifaRank} · Coach: {team.coach}
                      </p>
                      <p className="text-brand-muted mt-0.5 truncate text-xs">
                        {team.formation} · {team.tactics.split(".")[0]}.
                      </p>
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
                className="text-brand-white mb-4 text-xl font-bold uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Upcoming Fixtures
              </h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {upcoming.slice(0, 4).map((f) => (
                  <MatchCard key={f.id} fixture={f} />
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section>
              <h2
                className="text-brand-white mb-4 text-xl font-bold uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Results
              </h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {completed.map((f) => (
                  <MatchCard key={f.id} fixture={f} />
                ))}
              </div>
            </section>
          )}

          {/* <AdBanner size="leaderboard" /> */}

          {/* 4. Mini-analysis */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Info size={18} className="text-brand-lime" />
              <h2
                className="text-brand-white text-xl font-bold uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Qualification Picture
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sorted.map((s, idx) => {
                const team = getTeamById(s.teamId);
                if (!team) return null;
                const analysis = analysisForTeam(
                  s.teamId,
                  idx,
                  s.points,
                  s.played
                );
                return (
                  <div
                    key={s.teamId}
                    className="border-brand-accent bg-brand-blue flex gap-3 rounded-xl border p-4"
                  >
                    <FlagImg code={team.flag} size="sm" className="shrink-0" />
                    <div>
                      <p className="text-brand-white mb-1 text-sm font-bold">
                        {team.name}
                      </p>
                      <p className="text-brand-muted text-xs leading-relaxed">
                        {analysis}
                      </p>
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
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
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
                      className="hover:bg-brand-accent group flex items-center justify-between rounded-lg p-2 transition-colors"
                    >
                      <span className="text-brand-white group-hover:text-brand-lime text-sm font-semibold transition-colors">
                        Group {g.id}
                      </span>
                      {leaderTeam && (
                        <span className="text-brand-muted flex items-center gap-1 text-xs">
                          <FlagImg code={leaderTeam.flag} size="xs" />
                          <span>{leaderTeam.code}</span>
                          <span className="text-brand-lime ml-1 font-bold">
                            {leader.points}pts
                          </span>
                        </span>
                      )}
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Group team flags */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
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
                    className="hover:bg-brand-accent group flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <FlagImg code={t.flag} size="sm" />
                    <div>
                      <p className="text-brand-white group-hover:text-brand-lime text-sm font-medium transition-colors">
                        {t.name}
                      </p>
                      <p className="text-brand-muted text-[11px]">
                        #{t.fifaRank} FIFA
                      </p>
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
