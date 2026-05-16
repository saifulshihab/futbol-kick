import CountdownTimer from "@/components/CountdownTimer";
import FlagImg from "@/components/FlagImg";
import UpcomingMatchCards from "@/components/UpcomingMatchCards";
import PostCard from "@/components/PostCard";
import TeamMarquee from "@/components/TeamMarquee";
import {
  getTeamById,
  getUpcomingFixtures,
  groups,
  newsPosts
} from "@/lib/data";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  ChevronRight,
  Star,
  Users,
  Zap
} from "lucide-react";
import Link from "next/link";

// ─── Quick-link card ──────────────────────────────────────────────────────────
function QuickLink({
  href,
  icon: Icon,
  label,
  sub
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="border-brand-accent bg-brand-blue hover:border-brand-lime hover:bg-brand-accent group flex items-center gap-3 rounded-lg border p-3 transition-colors"
    >
      <div className="bg-brand-accent group-hover:bg-brand-lime/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors">
        <Icon size={18} className="text-brand-lime" />
      </div>
      <div className="min-w-0">
        <p className="text-brand-white group-hover:text-brand-lime text-sm font-semibold transition-colors">
          {label}
        </p>
        <p className="text-brand-muted truncate text-[11px]">{sub}</p>
      </div>
      <ChevronRight
        size={14}
        className="text-brand-muted group-hover:text-brand-lime ml-auto shrink-0 transition-colors"
      />
    </Link>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  title,
  href,
  linkLabel = "See all"
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2
        className="text-brand-white text-lg font-bold tracking-wide uppercase"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-brand-lime flex items-center gap-1 text-xs font-medium hover:underline"
        >
          {linkLabel} <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const upcomingFixtures = getUpcomingFixtures(5);
  const featuredPosts = newsPosts.slice(0, 6);
  const sidebarPosts = newsPosts.slice(0, 5);

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
            "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #1a3a5c 70%, #0a1628 100%)"
        }}
      >
        {/* Decorative circles */}
        <div className="bg-brand-lime/5 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full" />
        <div className="bg-brand-red/5 pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28">
          {/* Badge */}
          <span className="text-brand-lime border-brand-lime/40 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase">
            <Zap size={12} />
            FIFA World Cup 2026 · USA · Canada · Mexico
          </span>

          <h1
            className="text-brand-white mb-4 text-4xl leading-tight font-bold sm:text-5xl md:text-7xl"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            The Greatest Show <span className="text-brand-lime">on Earth</span>
          </h1>
          <p
            className="text-brand-muted mx-auto mb-10 max-w-2xl text-base sm:text-lg"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Follow every match, every team, and every moment of the 2026 FIFA
            World Cup — the biggest tournament in football history.
          </p>

          {/* Countdown */}
          <div className="mb-10 flex flex-col items-center gap-3">
            <p className="text-brand-muted text-xs tracking-widest uppercase">
              Kick-off countdown
            </p>
            <CountdownTimer />
            <p className="text-brand-muted text-xs">
              Opening match · June 11, 2026 · Mexico City
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/fixtures"
              className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              View Fixtures <ArrowRight size={16} />
            </Link>
            <Link
              href="/predictions"
              className="border-brand-white/30 text-brand-white hover:border-brand-lime hover:text-brand-lime inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Predict the Winner
            </Link>
          </div>
        </div>
      </section>

      <TeamMarquee />

      {/* ── Main 3-column grid ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ── Col 1: Fixtures & Groups ───────────────────────────────────── */}
          <div className="space-y-6">
            <SectionHeading title="Upcoming Matches" href="/fixtures" />
            <UpcomingMatchCards fixtures={upcomingFixtures} />

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
          </div>

          {/* ── Col 2: Latest Posts ────────────────────────────────────────── */}
          <div className="space-y-6">
            <SectionHeading title="Latest Articles" href="/news" />
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* ── Col 3: Sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Top Stories */}
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
              <SectionHeading title="Top Stories" />
              <div className="space-y-1">
                {sidebarPosts.map((post) => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
            </div>

            {/* Popular Teams */}
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
              <SectionHeading title="Top Teams" href="/teams" />
              <div className="space-y-2">
                {topTeams.map((team, i) =>
                  team ? (
                    <Link
                      key={team.id}
                      href={`/teams/${team.id}`}
                      className="hover:bg-brand-accent group flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <span className="text-brand-muted w-4 text-xs font-bold">
                        {i + 1}
                      </span>
                      <FlagImg code={team.flag} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-brand-white group-hover:text-brand-lime truncate text-sm font-medium transition-colors">
                          {team.name}
                        </p>
                        <p className="text-brand-muted text-[11px]">
                          FIFA Rank #{team.fifaRank}
                        </p>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </div>

            {/* Fan Poll */}
            <div className="border-brand-lime/30 bg-brand-blue rounded-xl border p-4">
              <div className="mb-4 flex items-center gap-2">
                <Star size={16} className="text-brand-lime" />
                <h3
                  className="text-brand-white text-base font-bold uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Fan Poll
                </h3>
              </div>
              <p className="text-brand-white mb-4 text-sm font-medium">
                Who will win the 2026 World Cup?
              </p>
              <div className="space-y-2">
                {[
                  { team: "🇦🇷 Argentina", pct: 28 },
                  { team: "🇫🇷 France", pct: 22 },
                  { team: "🇧🇷 Brazil", pct: 18 },
                  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", pct: 12 },
                  { team: "Other", pct: 20 }
                ].map(({ team, pct }) => (
                  <div key={team}>
                    <div className="text-brand-muted mb-1 flex justify-between text-xs">
                      <span>{team}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="bg-brand-accent h-2 overflow-hidden rounded-full">
                      <div
                        className="bg-brand-lime h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/fan-zone"
                className="text-brand-lime mt-4 flex w-full items-center justify-center gap-1 text-xs font-semibold hover:underline"
              >
                Vote in Fan Zone <ArrowRight size={12} />
              </Link>
            </div>

            {/* Quick nav */}
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
              <SectionHeading title="Quick Nav" />
              <div className="flex flex-wrap gap-2">
                {groups.map((g) => (
                  <Link
                    key={g.id}
                    href={`/groups/${g.id}`}
                    className="border-brand-accent text-brand-muted hover:border-brand-lime hover:text-brand-lime rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
                  >
                    Group {g.id}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stay Updated CTA ──────────────────────────────────────────────── */}
      <section
        className="border-brand-accent border-t py-16"
        style={{
          background:
            "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)"
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="text-brand-lime mb-4 inline-block text-xs font-bold tracking-widest uppercase">
            Stay in the game
          </span>
          <h2
            className="text-brand-white mb-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Never Miss a Kick-Off
          </h2>
          <p className="text-brand-muted mx-auto mb-8 max-w-xl">
            Get match alerts, live score updates, and exclusive analysis
            delivered straight to you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/fan-zone"
              className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Join the Fan Zone <ArrowRight size={16} />
            </Link>
            <Link
              href="/predictions"
              className="border-brand-white/30 text-brand-white hover:border-brand-lime hover:text-brand-lime inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
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
