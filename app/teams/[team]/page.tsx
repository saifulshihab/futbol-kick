import FlagImg from "@/components/FlagImg";
import JsonLd from "@/components/JsonLd";
import MatchCard from "@/components/MatchCard";
import {
  getFixturesByTeam,
  getGroupById,
  getStandingsSorted,
  getTeamById,
  teams
} from "@/lib/data";
import { ArrowRight, ChevronRight, Clock, Shield, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return teams.map((t) => ({ team: t.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ team: string }>;
}): Promise<Metadata> {
  const { team: teamId } = await params;
  const team = getTeamById(teamId);
  if (!team) return {};
  return {
    title: `${team.name} – World Cup 2026 Profile`,
    description: `${team.name} FIFA World Cup 2026 squad, formation, tactics, World Cup history, and upcoming fixtures. Coach: ${team.coach}.`
  };
}

const positionColors: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  GK: {
    bg: "bg-brand-lime/20",
    text: "text-brand-lime",
    border: "border-brand-lime/40",
    label: "Goalkeeper"
  },
  DEF: {
    bg: "bg-blue-600/20",
    text: "text-blue-400",
    border: "border-blue-600/40",
    label: "Defender"
  },
  MID: {
    bg: "bg-green-600/20",
    text: "text-green-400",
    border: "border-green-600/40",
    label: "Midfielder"
  },
  FWD: {
    bg: "bg-red-600/20",
    text: "text-red-400",
    border: "border-red-600/40",
    label: "Forward"
  }
};

const positionOrder = ["GK", "DEF", "MID", "FWD"];

export default async function TeamDetailPage({
  params
}: {
  params: Promise<{ team: string }>;
}) {
  const { team: teamId } = await params;
  const team = getTeamById(teamId);
  if (!team) notFound();

  const group = getGroupById(team.group);
  const fixtures = getFixturesByTeam(team.id);
  const upcoming = fixtures.filter(
    (f) => f.status === "upcoming" || f.status === "live"
  );
  const nextMatch = upcoming[0];

  const standings = group ? getStandingsSorted(group) : [];
  const teamStanding = standings.find((s) => s.teamId === team.id);

  // Group players by position
  const byPosition = positionOrder.reduce<Record<string, typeof team.players>>(
    (acc, pos) => {
      acc[pos] = team.players.filter((p) => p.position === pos);
      return acc;
    },
    {}
  );

  const teamLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: team.name,
    sport: "Football",
    memberOf: { "@type": "SportsOrganization", name: "FIFA World Cup 2026" },
    coach: { "@type": "Person", name: team.coach },
    athlete: team.players.map((p) => ({ "@type": "Person", name: p.name })),
    url: `https://futbolkick.com/teams/${team.id}`
  };

  return (
    <>
      <JsonLd data={teamLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-brand-muted mb-6 flex items-center gap-1 text-xs">
          <Link
            href="/teams"
            className="hover:text-brand-lime transition-colors"
          >
            Teams
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/groups/${team.group}`}
            className="hover:text-brand-lime transition-colors"
          >
            Group {team.group}
          </Link>
          <ChevronRight size={12} />
          <span className="text-brand-white">{team.name}</span>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <div
          className="relative mb-10 overflow-hidden rounded-2xl p-6 sm:p-10"
          style={{
            background:
              "linear-gradient(135deg, #0d2137 0%, #1a3a5c 60%, #0d2137 100%)"
          }}
        >
          <div className="bg-brand-lime/5 pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full" />
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <FlagImg code={team.flag} size="2xl" className="shrink-0" />
            <div className="flex-1">
              <p className="text-brand-lime mb-1 text-xs tracking-widest uppercase">
                FIFA World Cup 2026 · Group {team.group}
              </p>
              <h1
                className="text-brand-white mb-2 text-3xl leading-tight font-bold sm:text-5xl"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {team.name}
              </h1>
              <div className="text-brand-muted flex flex-wrap gap-3 text-sm">
                <span>
                  FIFA Rank{" "}
                  <strong className="text-brand-lime">#{team.fifaRank}</strong>
                </span>
                <span>·</span>
                <span>
                  Coach{" "}
                  <strong className="text-brand-white">{team.coach}</strong>
                </span>
                <span>·</span>
                <span>
                  Formation{" "}
                  <strong className="text-brand-white">{team.formation}</strong>
                </span>
              </div>
              {teamStanding && (
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  {[
                    { label: "Played", val: teamStanding.played },
                    { label: "Won", val: teamStanding.won },
                    { label: "Drawn", val: teamStanding.drawn },
                    { label: "Lost", val: teamStanding.lost },
                    {
                      label: "GD",
                      val: teamStanding.goalsFor - teamStanding.goalsAgainst
                    },
                    { label: "Points", val: teamStanding.points }
                  ].map(({ label, val }) => (
                    <div
                      key={label}
                      className="flex min-w-[40px] flex-col items-center gap-0.5"
                    >
                      <span
                        className="text-brand-white text-lg font-bold"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {val}
                      </span>
                      <span className="text-brand-muted tracking-wide uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* ── Main column ─────────────────────────────────────────────── */}
          <div className="space-y-10">
            {/* 1. Squad */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <Shield size={18} className="text-brand-lime" />
                <h2
                  className="text-brand-white text-xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Squad
                </h2>
              </div>

              <div className="space-y-4">
                {positionOrder.map((pos) => {
                  const players = byPosition[pos];
                  if (!players?.length) return null;
                  const meta = positionColors[pos];
                  return (
                    <div key={pos}>
                      <p
                        className={`mb-2 text-[11px] font-bold tracking-widest uppercase ${meta.text}`}
                      >
                        {meta.label}s
                      </p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {players.map((player) => (
                          <div
                            key={player.name}
                            className="border-brand-accent bg-brand-blue flex items-center gap-3 rounded-lg border p-3"
                          >
                            <div
                              className={`h-8 w-8 rounded-full ${meta.bg} border ${meta.border} flex shrink-0 items-center justify-center`}
                            >
                              <span
                                className={`text-xs font-bold ${meta.text}`}
                              >
                                {player.number}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-brand-white flex items-center gap-1 truncate text-sm font-semibold">
                                {player.name}
                                {player.isCaptain && (
                                  <span className="text-brand-lime text-[10px] font-bold">
                                    (C)
                                  </span>
                                )}
                              </p>
                              <p className="text-brand-muted truncate text-[11px]">
                                {player.club}
                              </p>
                            </div>
                            <span
                              className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${meta.bg} ${meta.border} ${meta.text} shrink-0`}
                            >
                              {pos}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* <AdBanner size="leaderboard" /> */}

            {/* 2. Tactics & Style */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <Star size={18} className="text-brand-lime" />
                <h2
                  className="text-brand-white text-xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Tactics &amp; Style
                </h2>
              </div>
              <div className="border-brand-accent bg-brand-blue space-y-4 rounded-xl border p-5">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-mid border-brand-accent flex flex-col items-center gap-1 rounded-lg border px-4 py-3">
                    <span
                      className="text-brand-lime text-2xl font-bold"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {team.formation}
                    </span>
                    <span className="text-brand-muted text-[10px] tracking-widest uppercase">
                      Formation
                    </span>
                  </div>
                  <p className="text-brand-muted flex-1 text-sm leading-relaxed">
                    {team.tactics}
                  </p>
                </div>

                {/* Formation visual – simple positional dots */}
                <FormationDots formation={team.formation} />
              </div>
            </section>

            {/* <AdBanner size="leaderboard" /> */}

            {/* 3. WC History */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <Clock size={18} className="text-brand-lime" />
                <h2
                  className="text-brand-white text-xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  World Cup History
                </h2>
              </div>
              <ul className="space-y-2">
                {team.wcHistory.map((item, i) => (
                  <li
                    key={i}
                    className="border-brand-accent bg-brand-blue flex items-start gap-3 rounded-lg border p-3"
                  >
                    <span className="text-brand-lime mt-0.5 shrink-0">▸</span>
                    <span className="text-brand-muted text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Fixtures */}
            {fixtures.length > 0 && (
              <section>
                <h2
                  className="text-brand-white mb-4 text-xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Fixtures
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {fixtures.map((f) => (
                    <MatchCard key={f.id} fixture={f} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Next match CTA */}
            {nextMatch && (
              <div className="border-brand-lime/40 bg-brand-blue rounded-xl border p-4">
                <p
                  className="text-brand-lime mb-3 text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Next Match
                </p>
                <MatchCard fixture={nextMatch} />
                <Link
                  href={`/matches/${nextMatch.id}`}
                  className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-colors"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Match Preview <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* <AdBanner size="rectangle" /> */}

            {/* Group standings */}
            {group && standings.length > 0 && (
              <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3
                    className="text-brand-lime text-sm font-bold tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Group {team.group} Table
                  </h3>
                  <Link
                    href={`/groups/${team.group}`}
                    className="text-brand-muted hover:text-brand-lime text-xs transition-colors"
                  >
                    Full table →
                  </Link>
                </div>
                <div className="space-y-1">
                  {standings.map((s, idx) => {
                    const t = getTeamById(s.teamId);
                    if (!t) return null;
                    const isThis = s.teamId === team.id;
                    const qualColor =
                      idx === 0
                        ? "bg-green-600"
                        : idx === 1
                          ? "bg-blue-600"
                          : "bg-transparent";
                    return (
                      <Link
                        key={s.teamId}
                        href={`/teams/${t.id}`}
                        className={`grid grid-cols-[6px_1fr_20px_28px] items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${isThis ? "bg-brand-accent ring-brand-lime/40 ring-1" : "hover:bg-brand-accent"}`}
                      >
                        <span className={`h-4 w-1 rounded-sm ${qualColor}`} />
                        <span className="flex min-w-0 items-center gap-1.5">
                          <FlagImg code={t.flag} size="xs" />
                          <span
                            className={`truncate text-xs font-medium ${isThis ? "text-brand-lime" : "text-brand-white"}`}
                          >
                            {t.code}
                          </span>
                        </span>
                        <span className="text-brand-muted text-center text-[11px]">
                          {s.played}
                        </span>
                        <span
                          className={`text-center text-xs font-bold ${isThis ? "text-brand-lime" : "text-brand-white"}`}
                          style={{ fontFamily: "var(--font-oswald)" }}
                        >
                          {s.points}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* <AdBanner size="rectangle" /> */}
          </aside>
        </div>
      </div>
    </>
  );
}

// Simple formation dots visualiser
function FormationDots({ formation }: { formation: string }) {
  const parts = formation.split("-").map(Number);
  const rows = [1, ...parts].reverse(); // GK at bottom

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-green-800/30 bg-green-900/20 p-4">
      <p className="text-[10px] tracking-widest text-green-400/60 uppercase">
        Formation · {formation}
      </p>
      {rows.map((count, rowIdx) => (
        <div key={rowIdx} className="flex items-center justify-center gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-green-500/60 bg-green-500/20"
            >
              <span className="text-[7px] font-bold text-green-400">
                {rowIdx === 0
                  ? "GK"
                  : rowIdx === rows.length - 1
                    ? "FW"
                    : rowIdx === 1
                      ? "DF"
                      : "MF"}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
