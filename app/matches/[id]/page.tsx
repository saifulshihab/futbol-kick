import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, ChevronRight, Swords, TrendingUp, AlignLeft } from "lucide-react";
import {
  fixtures,
  getFixtureById,
  getTeamById,
  type Team,
  type Player,
} from "@/lib/data";
import AdBanner from "@/components/AdBanner";
import JsonLd from "@/components/JsonLd";
import MatchPoll from "./MatchPoll";

export function generateStaticParams() {
  return fixtures.map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const fixture = getFixtureById(id);
  if (!fixture) return {};
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  return {
    title: `${home?.name} vs ${away?.name} – Match Preview`,
    description: `FIFA World Cup 2026 match preview: ${home?.name} vs ${away?.name}. Stats, key battles, predicted score, and fan poll.`,
  };
}

// ─── Recent form helpers ──────────────────────────────────────────────────────

// Generates a plausible 5-game form string from FIFA rank (higher rank = better form)
function syntheticForm(team: Team): string[] {
  const seed = team.fifaRank;
  const pool: string[] = seed <= 10
    ? ["W","W","W","D","W"]
    : seed <= 20
    ? ["W","W","D","W","L"]
    : seed <= 35
    ? ["W","D","W","L","D"]
    : ["D","L","W","D","L"];
  // Shuffle deterministically based on team id
  const offset = team.id.charCodeAt(0) % 5;
  return [...pool.slice(offset), ...pool.slice(0, offset)];
}

function formColor(r: string) {
  if (r === "W") return "bg-green-600 text-white";
  if (r === "D") return "bg-brand-yellow text-brand-navy";
  return "bg-brand-red text-white";
}

// ─── H2H helpers ─────────────────────────────────────────────────────────────

function syntheticH2H(home: Team, away: Team) {
  const diff = home.fifaRank - away.fifaRank; // negative = home stronger
  if (diff < -15) return { homeWins: 5, draws: 2, awayWins: 2 };
  if (diff < 0)   return { homeWins: 4, draws: 2, awayWins: 3 };
  if (diff < 15)  return { homeWins: 3, draws: 3, awayWins: 3 };
  return            { homeWins: 2, draws: 2, awayWins: 5 };
}

// ─── Key battles ──────────────────────────────────────────────────────────────

function buildBattles(home: Team, away: Team) {
  const homeFWD  = home.players.find((p) => p.position === "FWD") ?? home.players[0];
  const homeMID  = home.players.find((p) => p.position === "MID") ?? home.players[0];
  const awayFWD  = away.players.find((p) => p.position === "FWD") ?? away.players[0];
  const awayMID  = away.players.find((p) => p.position === "MID") ?? away.players[0];
  const homeDEF  = home.players.find((p) => p.position === "DEF") ?? home.players[0];
  const awayDEF  = away.players.find((p) => p.position === "DEF") ?? away.players[0];

  return [
    {
      label: "Attack vs Defence",
      home: homeFWD,
      away: awayDEF,
      desc: `Can ${homeFWD.name} break through ${awayDEF.name}'s defensive line?`,
    },
    {
      label: "Midfield Battle",
      home: homeMID,
      away: awayMID,
      desc: `The engine room clash — ${homeMID.name} vs ${awayMID.name} will dictate tempo.`,
    },
    {
      label: "Attack vs Defence",
      home: awayFWD,
      away: homeDEF,
      desc: `${awayFWD.name} will test ${homeDEF.name} with pace and movement.`,
    },
  ];
}

// ─── Predicted context ───────────────────────────────────────────────────────

function predictedContext(home: Team, away: Team, isCompleted: boolean) {
  if (isCompleted) return null;
  const diff = home.fifaRank - away.fifaRank;
  if (diff < -15) {
    return {
      score: `${home.code} 2 – 0 ${away.code}`,
      text: `${home.name} enter as heavy favourites. Expect a controlled, possession-based performance from the higher-ranked side. ${away.name} will look to stay compact and nick something on the counter, but the quality gap may prove too wide.`,
    };
  }
  if (diff < 0) {
    return {
      score: `${home.code} 1 – 1 ${away.code}`,
      text: `A close encounter is on the cards. ${home.name} hold the slight edge on paper, but ${away.name} are well-organised and dangerous from set pieces. A draw wouldn't surprise anyone following a tightly-contested affair.`,
    };
  }
  if (diff < 15) {
    return {
      score: `${home.code} 1 – 1 ${away.code}`,
      text: `Honours even on paper — this match could go either way. Both teams boast quality across the pitch and tactical flexibility. Set pieces and individual moments of brilliance may prove decisive.`,
    };
  }
  return {
    score: `${home.code} 0 – 2 ${away.code}`,
    text: `${away.name} are the favourites despite the home/away designation. Their superior FIFA ranking and squad depth should tell, but ${home.name} have shown ability to spring surprises and will fight hard for every ball.`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MatchPreviewPage({
  params,
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
  const isLive      = fixture.status === "live";

  const homeForm = syntheticForm(home);
  const awayForm = syntheticForm(away);
  const h2h      = syntheticH2H(home, away);
  const battles  = buildBattles(home, away);
  const prediction = predictedContext(home, away, isCompleted);

  const dateLabel = new Date(fixture.date).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
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
      address: { "@type": "PostalAddress", addressLocality: fixture.city, addressCountry: fixture.country },
    },
    competitor: [
      { "@type": "SportsTeam", name: home.name },
      { "@type": "SportsTeam", name: away.name },
    ],
    ...(isCompleted && {
      result: { "@type": "SportsEventScore", description: `${fixture.homeScore}–${fixture.awayScore}` },
    }),
  };

  return (
    <>
    <JsonLd data={matchLd} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-brand-muted mb-6">
        <Link href="/fixtures" className="hover:text-brand-yellow transition-colors">Fixtures</Link>
        <ChevronRight size={12} />
        <span className="text-brand-white">{home.code} vs {away.code}</span>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-10 px-6 py-10 sm:px-12 sm:py-14 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #0a1628 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #f5c518 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <p className="text-xs text-brand-yellow uppercase tracking-widest mb-4">{stageLabel}</p>

        {/* Teams */}
        <div className="flex items-center justify-center gap-4 sm:gap-10 mb-6">
          <Link href={`/teams/${home.id}`} className="flex flex-col items-center gap-2 group">
            <span className="text-5xl sm:text-7xl">{home.flag}</span>
            <span className="text-sm sm:text-lg font-bold text-brand-white group-hover:text-brand-yellow transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}>{home.name}</span>
          </Link>

          <div className="flex flex-col items-center gap-1">
            {isCompleted || isLive ? (
              <>
                <span className="text-4xl sm:text-6xl font-bold text-brand-white"
                  style={{ fontFamily: "var(--font-oswald)" }}>
                  {fixture.homeScore} – {fixture.awayScore}
                </span>
                {isLive && (
                  <span className="flex items-center gap-1 text-xs font-bold text-brand-navy bg-brand-red px-2.5 py-0.5 rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    LIVE {fixture.liveMinute}&apos;
                  </span>
                )}
                {isCompleted && <span className="text-xs text-brand-muted">Full Time</span>}
              </>
            ) : (
              <>
                <span className="text-2xl sm:text-4xl font-bold text-brand-yellow"
                  style={{ fontFamily: "var(--font-oswald)" }}>VS</span>
                <span className="text-xs text-brand-muted mt-1">{fixture.time} local</span>
              </>
            )}
          </div>

          <Link href={`/teams/${away.id}`} className="flex flex-col items-center gap-2 group">
            <span className="text-5xl sm:text-7xl">{away.flag}</span>
            <span className="text-sm sm:text-lg font-bold text-brand-white group-hover:text-brand-yellow transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}>{away.name}</span>
          </Link>
        </div>

        {/* Venue / Date */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-brand-muted">
          <span className="flex items-center gap-1"><Clock size={12} />{dateLabel} · {fixture.time}</span>
          <span className="flex items-center gap-1"><MapPin size={12} />{fixture.venue}, {fixture.city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* ── Main column ─────────────────────────────────────────── */}
        <div className="space-y-10">

          {/* 1. Quick Stats */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={18} className="text-brand-yellow" />
              <h2 className="text-xl font-bold text-brand-white uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}>Quick Stats</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Recent form */}
              <div className="sm:col-span-3 grid grid-cols-2 gap-4">
                {[
                  { team: home, form: homeForm },
                  { team: away, form: awayForm },
                ].map(({ team, form }) => (
                  <div key={team.id} className="rounded-xl border border-brand-accent bg-brand-blue p-4">
                    <p className="text-xs text-brand-muted mb-3 flex items-center gap-2">
                      <span className="text-lg">{team.flag}</span>
                      <span className="font-medium text-brand-white">{team.shortName}</span>
                      <span>— Recent form</span>
                    </p>
                    <div className="flex gap-1.5">
                      {form.map((r, i) => (
                        <span key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${formColor(r)}`}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* H2H */}
              <div className="sm:col-span-3 rounded-xl border border-brand-accent bg-brand-blue p-4">
                <p className="text-xs font-bold text-brand-yellow uppercase tracking-widest mb-4"
                  style={{ fontFamily: "var(--font-oswald)" }}>Head to Head</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-blue-400"
                      style={{ fontFamily: "var(--font-oswald)" }}>{h2h.homeWins}</span>
                    <p className="text-xs text-brand-muted mt-1">{home.code} wins</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-brand-yellow"
                      style={{ fontFamily: "var(--font-oswald)" }}>{h2h.draws}</span>
                    <p className="text-xs text-brand-muted mt-1">Draws</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-brand-red"
                      style={{ fontFamily: "var(--font-oswald)" }}>{h2h.awayWins}</span>
                    <p className="text-xs text-brand-muted mt-1">{away.code} wins</p>
                  </div>
                </div>
                {/* H2H bar */}
                <div className="mt-4 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 transition-all" style={{ width: `${(h2h.homeWins / (h2h.homeWins + h2h.draws + h2h.awayWins)) * 100}%` }} />
                  <div className="bg-brand-yellow transition-all" style={{ width: `${(h2h.draws / (h2h.homeWins + h2h.draws + h2h.awayWins)) * 100}%` }} />
                  <div className="bg-brand-red flex-1" />
                </div>
                <div className="flex justify-between text-[10px] text-brand-muted mt-1">
                  <span>{home.code}</span><span>Draws</span><span>{away.code}</span>
                </div>
              </div>
            </div>
          </section>

          {/* <AdBanner size="leaderboard" /> */}

          {/* 2. Key Battles */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Swords size={18} className="text-brand-yellow" />
              <h2 className="text-xl font-bold text-brand-white uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}>Key Battles</h2>
            </div>
            <div className="space-y-4">
              {battles.map((battle, i) => (
                <div key={i} className="rounded-xl border border-brand-accent bg-brand-blue p-4">
                  <p className="text-[11px] font-bold text-brand-yellow uppercase tracking-widest mb-3">
                    {battle.label}
                  </p>
                  <div className="flex items-center gap-3">
                    <PlayerChip player={battle.home} team={home} side="left" />
                    <span className="text-brand-muted font-bold text-xs shrink-0">VS</span>
                    <PlayerChip player={battle.away} team={away} side="right" />
                  </div>
                  <p className="text-xs text-brand-muted mt-3 leading-relaxed">{battle.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* <AdBanner size="leaderboard" /> */}

          {/* 3. Predicted Context */}
          {prediction && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <AlignLeft size={18} className="text-brand-yellow" />
                <h2 className="text-xl font-bold text-brand-white uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}>Match Preview</h2>
              </div>
              <div className="rounded-xl border border-brand-accent bg-brand-blue p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-brand-muted">Predicted score</span>
                  <span className="text-lg font-bold text-brand-yellow px-3 py-1 rounded-lg bg-brand-accent"
                    style={{ fontFamily: "var(--font-oswald)" }}>
                    {prediction.score}
                  </span>
                </div>
                <p className="text-sm text-brand-muted leading-relaxed">{prediction.text}</p>
                <p className="text-[11px] text-brand-accent border-t border-brand-accent pt-3">
                  ℹ Predictions are for entertainment only. FutbolKick does not promote or endorse gambling.
                </p>
              </div>
            </section>
          )}

          {/* 4. Fan Poll */}
          <MatchPoll homeTeam={home.shortName} awayTeam={away.shortName} />
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="space-y-6">
          {/* <AdBanner size="rectangle" /> */}

          {/* Match info */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4 space-y-3">
            <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest"
              style={{ fontFamily: "var(--font-oswald)" }}>Match Info</h3>
            {[
              { label: "Date",    value: dateLabel },
              { label: "Time",    value: fixture.time + " local" },
              { label: "Venue",   value: fixture.venue },
              { label: "City",    value: `${fixture.city}, ${fixture.country}` },
              { label: "Stage",   value: stageLabel },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-2 text-sm">
                <span className="text-brand-muted w-14 shrink-0">{label}</span>
                <span className="text-brand-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Team links */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4 space-y-2">
            <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-oswald)" }}>Team Profiles</h3>
            {[home, away].map((t) => (
              <Link key={t.id} href={`/teams/${t.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-accent transition-colors group">
                <span className="text-2xl">{t.flag}</span>
                <div>
                  <p className="text-sm font-medium text-brand-white group-hover:text-brand-yellow transition-colors">{t.name}</p>
                  <p className="text-[11px] text-brand-muted">FIFA #{t.fifaRank} · {t.formation}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Group link */}
          {fixture.group && (
            <Link href={`/groups/${fixture.group}`}
              className="flex items-center justify-between p-4 rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group">
              <div>
                <p className="text-sm font-bold text-brand-white group-hover:text-brand-yellow transition-colors">
                  View Group {fixture.group}
                </p>
                <p className="text-xs text-brand-muted mt-0.5">Standings &amp; fixtures</p>
              </div>
              <ChevronRight size={16} className="text-brand-muted group-hover:text-brand-yellow transition-colors" />
            </Link>
          )}

          {/* <AdBanner size="rectangle" /> */}
        </aside>
      </div>
    </div>
    </>
  );
}

// ─── Player chip ─────────────────────────────────────────────────────────────
function PlayerChip({ player, team, side }: { player: Player; team: Team; side: "left" | "right" }) {
  return (
    <div className={`flex-1 flex items-center gap-2 ${side === "right" ? "flex-row-reverse text-right" : ""}`}>
      <span className="text-2xl shrink-0">{team.flag}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-brand-white truncate">{player.name}</p>
        <p className="text-[11px] text-brand-muted truncate">{player.club}</p>
      </div>
    </div>
  );
}
