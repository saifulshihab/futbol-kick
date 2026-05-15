import FlagImg from "@/components/FlagImg";
import JsonLd from "@/components/JsonLd";
import { WEBSITE_BASE_URL } from "@/lib/config";
import {
  fixtures,
  getFixtureById,
  getTeamById,
  type Player,
  type Team
} from "@/lib/data";
import {
  AlignLeft,
  ChevronRight,
  Clock,
  MapPin,
  Swords,
  TrendingUp
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MatchPoll from "./MatchPoll";

export function generateStaticParams() {
  return fixtures.map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const fixture = getFixtureById(id);
  if (!fixture) return {};
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const stageLabel = fixture.group ? `Group ${fixture.group}` : fixture.stage;
  return {
    title: `${home?.name} vs ${away?.name} – FIFA World Cup 2026`,
    description: `FIFA World Cup 2026 match preview: ${home?.name} vs ${away?.name}. Stats, key battles, predicted score, and fan poll.`,
    keywords: [
      `${home?.name} vs ${away?.name} 2026`,
      `${home?.code} vs ${away?.code} World Cup`,
      `World Cup 2026 ${stageLabel}`,
      "FIFA 2026 match preview",
      `${home?.name} World Cup 2026`,
      `${away?.name} World Cup 2026`,
      `World Cup 2026 ${fixture.venue}`
    ],
    alternates: { canonical: `${WEBSITE_BASE_URL}/matches/${id}` },
    openGraph: {
      title: `${home?.name} vs ${away?.name} – FIFA World Cup 2026`,
      description: `Match preview, stats, and fan poll: ${home?.name} vs ${away?.name} at FIFA World Cup 2026.`,
      url: `${WEBSITE_BASE_URL}/matches/${id}`,
      type: "website",
      siteName: "FutbolKick"
    },
    twitter: {
      card: "summary_large_image",
      title: `${home?.name} vs ${away?.name} – World Cup 2026`,
      description: `Match preview, stats, and fan poll: ${home?.name} vs ${away?.name} at FIFA World Cup 2026.`
    }
  };
}

// ─── Recent form helpers ──────────────────────────────────────────────────────

// Generates a plausible 5-game form string from FIFA rank (higher rank = better form)
function syntheticForm(team: Team): string[] {
  const seed = team.fifaRank;
  const pool: string[] =
    seed <= 10
      ? ["W", "W", "W", "D", "W"]
      : seed <= 20
        ? ["W", "W", "D", "W", "L"]
        : seed <= 35
          ? ["W", "D", "W", "L", "D"]
          : ["D", "L", "W", "D", "L"];
  // Shuffle deterministically based on team id
  const offset = team.id.charCodeAt(0) % 5;
  return [...pool.slice(offset), ...pool.slice(0, offset)];
}

function formColor(r: string) {
  if (r === "W") return "bg-green-600 text-white";
  if (r === "D") return "bg-brand-lime text-brand-navy";
  return "bg-brand-red text-white";
}

// ─── H2H helpers ─────────────────────────────────────────────────────────────

function syntheticH2H(home: Team, away: Team) {
  const diff = home.fifaRank - away.fifaRank; // negative = home stronger
  if (diff < -15) return { homeWins: 5, draws: 2, awayWins: 2 };
  if (diff < 0) return { homeWins: 4, draws: 2, awayWins: 3 };
  if (diff < 15) return { homeWins: 3, draws: 3, awayWins: 3 };
  return { homeWins: 2, draws: 2, awayWins: 5 };
}

// ─── Key battles ──────────────────────────────────────────────────────────────

function buildBattles(home: Team, away: Team) {
  const homeFWD =
    home.players.find((p) => p.position === "FWD") ?? home.players[0];
  const homeMID =
    home.players.find((p) => p.position === "MID") ?? home.players[0];
  const awayFWD =
    away.players.find((p) => p.position === "FWD") ?? away.players[0];
  const awayMID =
    away.players.find((p) => p.position === "MID") ?? away.players[0];
  const homeDEF =
    home.players.find((p) => p.position === "DEF") ?? home.players[0];
  const awayDEF =
    away.players.find((p) => p.position === "DEF") ?? away.players[0];

  return [
    {
      label: "Attack vs Defence",
      home: homeFWD,
      away: awayDEF,
      desc: `Can ${homeFWD.name} break through ${awayDEF.name}'s defensive line?`
    },
    {
      label: "Midfield Battle",
      home: homeMID,
      away: awayMID,
      desc: `The engine room clash — ${homeMID.name} vs ${awayMID.name} will dictate tempo.`
    },
    {
      label: "Attack vs Defence",
      home: awayFWD,
      away: homeDEF,
      desc: `${awayFWD.name} will test ${homeDEF.name} with pace and movement.`
    }
  ];
}

// ─── Predicted context ───────────────────────────────────────────────────────

function predictedContext(home: Team, away: Team, isCompleted: boolean) {
  if (isCompleted) return null;
  const diff = home.fifaRank - away.fifaRank;
  if (diff < -15) {
    return {
      score: `${home.code} 2 – 0 ${away.code}`,
      text: `${home.name} enter as heavy favourites. Expect a controlled, possession-based performance from the higher-ranked side. ${away.name} will look to stay compact and nick something on the counter, but the quality gap may prove too wide.`
    };
  }
  if (diff < 0) {
    return {
      score: `${home.code} 1 – 1 ${away.code}`,
      text: `A close encounter is on the cards. ${home.name} hold the slight edge on paper, but ${away.name} are well-organised and dangerous from set pieces. A draw wouldn't surprise anyone following a tightly-contested affair.`
    };
  }
  if (diff < 15) {
    return {
      score: `${home.code} 1 – 1 ${away.code}`,
      text: `Honours even on paper — this match could go either way. Both teams boast quality across the pitch and tactical flexibility. Set pieces and individual moments of brilliance may prove decisive.`
    };
  }
  return {
    score: `${home.code} 0 – 2 ${away.code}`,
    text: `${away.name} are the favourites despite the home/away designation. Their superior FIFA ranking and squad depth should tell, but ${home.name} have shown ability to spring surprises and will fight hard for every ball.`
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MatchPreviewPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fixture = getFixtureById(id);
  if (!fixture) notFound();

  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  if (!home || !away) notFound();

  const isCompleted = fixture.status === "completed";
  const isLive = fixture.status === "live";

  const homeForm = syntheticForm(home);
  const awayForm = syntheticForm(away);
  const h2h = syntheticH2H(home, away);
  const battles = buildBattles(home, away);
  const prediction = predictedContext(home, away, isCompleted);

  const dateLabel = new Date(fixture.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const stageLabel = fixture.group
    ? `Group ${fixture.group} · Matchday ${fixture.matchday}`
    : fixture.stage.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const matchLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${home.name} vs ${away.name}`,
    startDate: `${fixture.date}T${fixture.time}:00`,
    location: {
      "@type": "Place",
      name: fixture.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: fixture.city,
        addressCountry: fixture.country
      }
    },
    competitor: [
      { "@type": "SportsTeam", name: home.name },
      { "@type": "SportsTeam", name: away.name }
    ],
    ...(isCompleted && {
      result: {
        "@type": "SportsEventScore",
        description: `${fixture.homeScore}–${fixture.awayScore}`
      }
    })
  };

  return (
    <>
      <JsonLd data={matchLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-brand-muted mb-6 flex items-center gap-1 text-xs">
          <Link
            href="/fixtures"
            className="hover:text-brand-lime transition-colors"
          >
            Fixtures
          </Link>
          <ChevronRight size={12} />
          <span className="text-brand-white">
            {home.code} vs {away.code}
          </span>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div
          className="relative mb-10 overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-12 sm:py-14"
          style={{
            background:
              "linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #0a1628 100%)"
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle, #e8ff00 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />

          <p className="text-brand-lime mb-4 text-xs tracking-widest uppercase">
            {stageLabel}
          </p>

          {/* Teams */}
          <div className="mb-6 flex items-center justify-center gap-4 sm:gap-10">
            <Link
              href={`/teams/${home.id}`}
              className="group flex flex-col items-center gap-2"
            >
              <FlagImg code={home.flag} size="xl" />
              <span
                className="text-brand-white group-hover:text-brand-lime text-sm font-bold transition-colors sm:text-lg"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {home.name}
              </span>
            </Link>

            <div className="flex flex-col items-center gap-1">
              {isCompleted || isLive ? (
                <>
                  <span
                    className="text-brand-white text-4xl font-bold sm:text-6xl"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {fixture.homeScore} – {fixture.awayScore}
                  </span>
                  {isLive && (
                    <span className="text-brand-navy bg-brand-red flex animate-pulse items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      LIVE {fixture.liveMinute}&apos;
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-brand-muted text-xs">Full Time</span>
                  )}
                </>
              ) : (
                <>
                  <span
                    className="text-brand-lime text-2xl font-bold sm:text-4xl"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    VS
                  </span>
                  <span className="text-brand-muted mt-1 text-xs">
                    {fixture.time} local
                  </span>
                </>
              )}
            </div>

            <Link
              href={`/teams/${away.id}`}
              className="group flex flex-col items-center gap-2"
            >
              <FlagImg code={away.flag} size="xl" />
              <span
                className="text-brand-white group-hover:text-brand-lime text-sm font-bold transition-colors sm:text-lg"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {away.name}
              </span>
            </Link>
          </div>

          {/* Venue / Date */}
          <div className="text-brand-muted flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {dateLabel} · {fixture.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {fixture.venue}, {fixture.city}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* ── Main column ─────────────────────────────────────────── */}
          <div className="space-y-10">
            {/* 1. Quick Stats */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <TrendingUp size={18} className="text-brand-lime" />
                <h2
                  className="text-brand-white text-xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Quick Stats
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Recent form */}
                <div className="grid grid-cols-2 gap-4 sm:col-span-3">
                  {[
                    { team: home, form: homeForm },
                    { team: away, form: awayForm }
                  ].map(({ team, form }) => (
                    <div
                      key={team.id}
                      className="border-brand-accent bg-brand-blue rounded-xl border p-4"
                    >
                      <p className="text-brand-muted mb-3 flex items-center gap-2 text-xs">
                        <FlagImg code={team.flag} size="xs" />
                        <span className="text-brand-white font-medium">
                          {team.shortName}
                        </span>
                        <span>— Recent form</span>
                      </p>
                      <div className="flex gap-1.5">
                        {form.map((r, i) => (
                          <span
                            key={i}
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${formColor(r)}`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* H2H */}
                <div className="border-brand-accent bg-brand-blue rounded-xl border p-4 sm:col-span-3">
                  <p
                    className="text-brand-lime mb-4 text-xs font-bold tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Head to Head
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-center">
                      <span
                        className="text-3xl font-bold text-blue-400"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {h2h.homeWins}
                      </span>
                      <p className="text-brand-muted mt-1 text-xs">
                        {home.code} wins
                      </p>
                    </div>
                    <div className="flex-1 text-center">
                      <span
                        className="text-brand-lime text-3xl font-bold"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {h2h.draws}
                      </span>
                      <p className="text-brand-muted mt-1 text-xs">Draws</p>
                    </div>
                    <div className="flex-1 text-center">
                      <span
                        className="text-brand-red text-3xl font-bold"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {h2h.awayWins}
                      </span>
                      <p className="text-brand-muted mt-1 text-xs">
                        {away.code} wins
                      </p>
                    </div>
                  </div>
                  {/* H2H bar */}
                  <div className="mt-4 flex h-3 overflow-hidden rounded-full">
                    <div
                      className="bg-blue-500 transition-all"
                      style={{
                        width: `${(h2h.homeWins / (h2h.homeWins + h2h.draws + h2h.awayWins)) * 100}%`
                      }}
                    />
                    <div
                      className="bg-brand-lime transition-all"
                      style={{
                        width: `${(h2h.draws / (h2h.homeWins + h2h.draws + h2h.awayWins)) * 100}%`
                      }}
                    />
                    <div className="bg-brand-red flex-1" />
                  </div>
                  <div className="text-brand-muted mt-1 flex justify-between text-[10px]">
                    <span>{home.code}</span>
                    <span>Draws</span>
                    <span>{away.code}</span>
                  </div>
                </div>
              </div>
            </section>


            {/* 2. Key Battles */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <Swords size={18} className="text-brand-lime" />
                <h2
                  className="text-brand-white text-xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Key Battles
                </h2>
              </div>
              <div className="space-y-4">
                {battles.map((battle, i) => (
                  <div
                    key={i}
                    className="border-brand-accent bg-brand-blue rounded-xl border p-4"
                  >
                    <p className="text-brand-lime mb-3 text-[11px] font-bold tracking-widest uppercase">
                      {battle.label}
                    </p>
                    <div className="flex items-center gap-3">
                      <PlayerChip
                        player={battle.home}
                        team={home}
                        side="left"
                      />
                      <span className="text-brand-muted shrink-0 text-xs font-bold">
                        VS
                      </span>
                      <PlayerChip
                        player={battle.away}
                        team={away}
                        side="right"
                      />
                    </div>
                    <p className="text-brand-muted mt-3 text-xs leading-relaxed">
                      {battle.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>


            {/* 3. Predicted Context */}
            {prediction && (
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <AlignLeft size={18} className="text-brand-lime" />
                  <h2
                    className="text-brand-white text-xl font-bold uppercase"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Match Preview
                  </h2>
                </div>
                <div className="border-brand-accent bg-brand-blue space-y-4 rounded-xl border p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-brand-muted text-xs">
                      Predicted score
                    </span>
                    <span
                      className="text-brand-lime bg-brand-accent rounded-lg px-3 py-1 text-lg font-bold"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {prediction.score}
                    </span>
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {prediction.text}
                  </p>
                  <p className="text-brand-accent border-brand-accent border-t pt-3 text-[11px]">
                    ℹ Predictions are for entertainment only. FutbolKick does
                    not promote or endorse gambling.
                  </p>
                </div>
              </section>
            )}

            {/* 4. Fan Poll */}
            <MatchPoll homeTeam={home.shortName} awayTeam={away.shortName} />
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">

            {/* Match info */}
            <div className="border-brand-accent bg-brand-blue space-y-3 rounded-xl border p-4">
              <h3
                className="text-brand-lime text-sm font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Match Info
              </h3>
              {[
                { label: "Date", value: dateLabel },
                { label: "Time", value: fixture.time + " local" },
                { label: "Venue", value: fixture.venue },
                { label: "City", value: `${fixture.city}, ${fixture.country}` },
                { label: "Stage", value: stageLabel }
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2 text-sm">
                  <span className="text-brand-muted w-14 shrink-0">
                    {label}
                  </span>
                  <span className="text-brand-white">{value}</span>
                </div>
              ))}
            </div>

            {/* Team links */}
            <div className="border-brand-accent bg-brand-blue space-y-2 rounded-xl border p-4">
              <h3
                className="text-brand-lime mb-3 text-sm font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Team Profiles
              </h3>
              {[home, away].map((t) => (
                <Link
                  key={t.id}
                  href={`/teams/${t.id}`}
                  className="hover:bg-brand-accent group flex items-center gap-3 rounded-lg p-2 transition-colors"
                >
                  <FlagImg code={t.flag} size="sm" />
                  <div>
                    <p className="text-brand-white group-hover:text-brand-lime text-sm font-medium transition-colors">
                      {t.name}
                    </p>
                    <p className="text-brand-muted text-[11px]">
                      FIFA #{t.fifaRank} · {t.formation}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Group link */}
            {fixture.group && (
              <Link
                href={`/groups/${fixture.group}`}
                className="border-brand-accent bg-brand-blue hover:border-brand-lime group flex items-center justify-between rounded-xl border p-4 transition-colors"
              >
                <div>
                  <p className="text-brand-white group-hover:text-brand-lime text-sm font-bold transition-colors">
                    View Group {fixture.group}
                  </p>
                  <p className="text-brand-muted mt-0.5 text-xs">
                    Standings &amp; fixtures
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-brand-muted group-hover:text-brand-lime transition-colors"
                />
              </Link>
            )}

          </aside>
        </div>
      </div>
    </>
  );
}

// ─── Player chip ─────────────────────────────────────────────────────────────
function PlayerChip({
  player,
  team,
  side
}: {
  player: Player;
  team: Team;
  side: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-1 items-center gap-2 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      <FlagImg code={team.flag} size="sm" className="shrink-0" />
      <div className="min-w-0">
        <p className="text-brand-white truncate text-sm font-semibold">
          {player.name}
        </p>
        <p className="text-brand-muted truncate text-[11px]">{player.club}</p>
      </div>
    </div>
  );
}
