import Link from "next/link";
import { ArrowRight, Zap, BarChart2, Users, Calendar, Star, ChevronRight } from "lucide-react";
import {
  getLiveFixtures,
  getUpcomingFixtures,
  newsPosts,
  groups,
  getTeamById,
} from "@/lib/data";
import CountdownTimer from "@/components/CountdownTimer";
import MatchCard from "@/components/MatchCard";
import PostCard from "@/components/PostCard";
import AdBanner from "@/components/AdBanner";
import FlagImg from "@/components/FlagImg";

// ─── Quick-link card ──────────────────────────────────────────────────────────
function QuickLink({
  href,
  icon: Icon,
  label,
  sub,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg border border-brand-accent bg-brand-blue hover:border-brand-yellow hover:bg-brand-accent transition-colors group"
    >
      <div className="w-9 h-9 rounded-lg bg-brand-accent group-hover:bg-brand-yellow/20 flex items-center justify-center shrink-0 transition-colors">
        <Icon size={18} className="text-brand-yellow" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-brand-white group-hover:text-brand-yellow transition-colors">
          {label}
        </p>
        <p className="text-[11px] text-brand-muted truncate">{sub}</p>
      </div>
      <ChevronRight size={14} className="ml-auto text-brand-muted group-hover:text-brand-yellow transition-colors shrink-0" />
    </Link>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  title,
  href,
  linkLabel = "See all",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2
        className="text-lg font-bold text-brand-white uppercase tracking-wide"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-medium text-brand-yellow hover:underline"
        >
          {linkLabel} <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const liveFixtures     = getLiveFixtures();
  const upcomingFixtures = getUpcomingFixtures(5);
  const featuredPosts    = newsPosts.slice(0, 6);
  const sidebarPosts     = newsPosts.slice(0, 5);

  // Top teams by FIFA rank for the "Popular Teams" widget
  const topTeams = ["argentina", "france", "belgium", "england", "brazil"]
    .map(getTeamById)
    .filter(Boolean);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #1a3a5c 70%, #0a1628 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-yellow/5" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-red/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-yellow border border-brand-yellow/40 px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            <Zap size={12} />
            FIFA World Cup 2026 · USA · Canada · Mexico
          </span>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-brand-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            The World&apos;s Greatest{" "}
            <span className="text-brand-yellow">Stage</span>
          </h1>
          <p
            className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Follow every match, every team, and every moment of the 2026 FIFA
            World Cup — the biggest tournament in football history.
          </p>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <p className="text-xs text-brand-muted uppercase tracking-widest">
              Kick-off countdown
            </p>
            <CountdownTimer />
            <p className="text-xs text-brand-muted">Opening match · June 11, 2026 · Los Angeles</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/fixtures"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-navy text-sm font-bold hover:bg-yellow-400 transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              View Fixtures <ArrowRight size={16} />
            </Link>
            <Link
              href="/predictions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-white/30 text-brand-white text-sm font-medium hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Predict the Winner
            </Link>
          </div>
        </div>
      </section>

      {/* ── Live / Upcoming Match Strip ────────────────────────────────────── */}
      <section className="bg-brand-mid border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-brand-navy bg-brand-red px-2.5 py-1 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              LIVE NOW
            </span>
            <span className="text-xs text-brand-muted">
              {liveFixtures.length > 0
                ? `${liveFixtures.length} match${liveFixtures.length > 1 ? "es" : ""} in progress`
                : "Next upcoming matches"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveFixtures.length > 0
              ? liveFixtures.map((f) => <MatchCard key={f.id} fixture={f} compact />)
              : upcomingFixtures
                  .slice(0, 3)
                  .map((f) => <MatchCard key={f.id} fixture={f} compact />)}
          </div>
        </div>
      </section>

      {/* ── AdSense leaderboard ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* <AdBanner size="leaderboard" /> */}
      </div>

      {/* ── Main 3-column grid ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Col 1: Fixtures & Groups ───────────────────────────────────── */}
          <div className="space-y-6">
            <SectionHeading title="Upcoming Matches" href="/fixtures" />
            <div className="space-y-3">
              {upcomingFixtures.map((f) => (
                <MatchCard key={f.id} fixture={f} />
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <SectionHeading title="Quick Links" />
              <QuickLink
                href="/groups"
                icon={BarChart2}
                label="Group Tables"
                sub="Standings after Matchday 2"
              />
              <QuickLink
                href="/fixtures?stage=knockout"
                icon={Zap}
                label="Knockout Bracket"
                sub="Round of 32 preview"
              />
              <QuickLink
                href="/groups"
                icon={Users}
                label="All Groups A – F"
                sub="48 teams · 12 groups"
              />
              <QuickLink
                href="/fixtures"
                icon={Calendar}
                label="Full Schedule"
                sub="Group stage to Final"
              />
            </div>

            {/* <AdBanner size="rectangle" /> */}
          </div>

          {/* ── Col 2: Latest Posts ────────────────────────────────────────── */}
          <div className="space-y-6">
            <SectionHeading title="Latest Articles" href="/news" />
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {/* <AdBanner size="inline" /> */}
          </div>

          {/* ── Col 3: Sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* <AdBanner size="rectangle" /> */}

            {/* Top Stories */}
            <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
              <SectionHeading title="Top Stories" />
              <div className="space-y-1">
                {sidebarPosts.map((post) => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
            </div>

            {/* Popular Teams */}
            <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
              <SectionHeading title="Top Teams" href="/teams" />
              <div className="space-y-2">
                {topTeams.map((team, i) =>
                  team ? (
                    <Link
                      key={team.id}
                      href={`/teams/${team.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-accent transition-colors group"
                    >
                      <span className="text-xs font-bold text-brand-muted w-4">{i + 1}</span>
                      <FlagImg code={team.flag} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-white group-hover:text-brand-yellow transition-colors truncate">
                          {team.name}
                        </p>
                        <p className="text-[11px] text-brand-muted">FIFA Rank #{team.fifaRank}</p>
                      </div>
                    </Link>
                  ) : null,
                )}
              </div>
            </div>

            {/* Fan Poll */}
            <div className="rounded-xl border border-brand-yellow/30 bg-brand-blue p-4">
              <div className="flex items-center gap-2 mb-4">
                <Star size={16} className="text-brand-yellow" />
                <h3
                  className="text-base font-bold text-brand-white uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Fan Poll
                </h3>
              </div>
              <p className="text-sm text-brand-white mb-4 font-medium">
                Who will win the 2026 World Cup?
              </p>
              <div className="space-y-2">
                {[
                  { team: "🇦🇷 Argentina", pct: 28 },
                  { team: "🇫🇷 France",    pct: 22 },
                  { team: "🇧🇷 Brazil",    pct: 18 },
                  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   pct: 12 },
                  { team: "Other",          pct: 20 },
                ].map(({ team, pct }) => (
                  <div key={team}>
                    <div className="flex justify-between text-xs text-brand-muted mb-1">
                      <span>{team}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-brand-accent overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-yellow"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/fan-zone"
                className="mt-4 w-full flex items-center justify-center gap-1 text-xs font-semibold text-brand-yellow hover:underline"
              >
                Vote in Fan Zone <ArrowRight size={12} />
              </Link>
            </div>

            {/* Quick nav */}
            <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
              <SectionHeading title="Quick Nav" />
              <div className="flex flex-wrap gap-2">
                {groups.map((g) => (
                  <Link
                    key={g.id}
                    href={`/groups/${g.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-brand-accent text-brand-muted hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                  >
                    Group {g.id}
                  </Link>
                ))}
              </div>
            </div>

            {/* <AdBanner size="rectangle" /> */}
          </div>
        </div>
      </section>

      {/* ── Stay Updated CTA ──────────────────────────────────────────────── */}
      <section
        className="py-16 border-t border-brand-accent"
        style={{
          background:
            "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-bold text-brand-yellow uppercase tracking-widest mb-4">
            Stay in the game
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-brand-white mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Never Miss a Kick-Off
          </h2>
          <p className="text-brand-muted mb-8 max-w-xl mx-auto">
            Get match alerts, live score updates, and exclusive analysis
            delivered straight to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/fan-zone"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-navy text-sm font-bold hover:bg-yellow-400 transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Join the Fan Zone <ArrowRight size={16} />
            </Link>
            <Link
              href="/predictions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-white/30 text-brand-white text-sm font-medium hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Prediction League
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
