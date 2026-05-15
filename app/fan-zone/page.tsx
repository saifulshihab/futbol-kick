import {
  ArrowRight,
  Globe,
  MapPin,
  Star,
  Trophy,
  Tv,
  Users
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import FanPolls from "./FanPolls";

export const metadata: Metadata = {
  title: "Fan Zone",
  description:
    "Join the FIFA World Cup 2026 fan community — polls, fan stories, prediction leaderboards, and local watch guides for Bangladesh."
};

// ─── Dummy data ───────────────────────────────────────────────────────────────

const leaderboard = [
  { rank: 1, name: "FutbolGuru99", country: "bd", points: 148, correct: 12 },
  { rank: 2, name: "GoalMachine", country: "br", points: 141, correct: 11 },
  { rank: 3, name: "TacticoLoco", country: "mx", points: 137, correct: 11 },
  { rank: 4, name: "MessiForever", country: "ar", points: 130, correct: 10 },
  {
    rank: 5,
    name: "ThreeLions2026",
    country: "gb-eng",
    points: 122,
    correct: 10
  },
  { rank: 6, name: "SambaSoul", country: "br", points: 118, correct: 9 },
  { rank: 7, name: "OranjeFan", country: "nl", points: 115, correct: 9 },
  { rank: 8, name: "DhakaKicker", country: "bd", points: 109, correct: 8 },
  { rank: 9, name: "AtlasLion", country: "ma", points: 104, correct: 8 },
  { rank: 10, name: "SamuraiBlue", country: "jp", points: 97, correct: 7 }
];

const watchGuide = {
  title: "How to Watch the World Cup in Bangladesh",
  sections: [
    {
      heading: "TV Channels",
      icon: Tv,
      content:
        "T Sports and Gazi TV traditionally broadcast major international football. Check your local cable/satellite provider for the confirmed 2026 rights holder. Multiple channels may share broadcast rights across the 104-match tournament."
    },
    {
      heading: "Streaming Options",
      icon: Globe,
      content:
        "FanCode and other OTT platforms may carry live streams with subscription plans. A reliable VPN can help access international legal streams from services in the UK, USA or India where you have an existing subscription."
    },
    {
      heading: "Match Times in BST (UTC+6)",
      icon: Star,
      content:
        "Most USA-based evening matches (10 PM ET) kick off at 8 AM BST the next morning — great for early risers! Afternoon USA matches (4 PM ET) are at midnight BST. Mexico matches often start slightly earlier, around 9–11 PM BST."
    },
    {
      heading: "Watch Parties in Dhaka",
      icon: MapPin,
      content:
        "Dhanmondi Lake area, Gulshan 1 & 2, Banani, and Kafrul traditionally host large outdoor screenings for major tournaments. Local clubs, restaurants, and community centres set up big screens — follow social media closer to June for confirmed locations."
    }
  ]
};

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  icon: Icon,
  title,
  subtitle
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="bg-brand-lime/10 border-brand-lime/30 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
        <Icon size={18} className="text-brand-lime" />
      </div>
      <div>
        <h2
          className="text-brand-white text-2xl font-bold uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-brand-muted mt-0.5 text-sm">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FanZonePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-12 text-center sm:px-12"
        style={{
          background:
            "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)"
        }}
      >
        <div className="bg-brand-lime/5 pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full" />
        <div className="bg-brand-red/5 pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full" />
        <span className="text-brand-lime border-brand-lime/40 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase">
          <Users size={12} /> Community Hub
        </span>
        <h1
          className="text-brand-white mb-3 text-3xl font-bold sm:text-5xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Fan Zone
        </h1>
        <p className="text-brand-muted mx-auto max-w-xl text-base">
          Join the World Cup 2026 community — vote in polls, read fan stories,
          climb the prediction leaderboard, and find out how to watch from
          anywhere.
        </p>
      </div>

      {/* <AdBanner size="leaderboard" /> */}

      {/* ── 1. Fan Polls ─────────────────────────────────────────────── */}
      <section>
        <SectionHeading
          icon={Star}
          title="Fan Polls"
          subtitle="Cast your vote — results update live"
        />
        <FanPolls />
      </section>

      {/* <AdBanner size="leaderboard" /> */}

      {/* ── 2. Fan Stories ───────────────────────────────────────────── */}

      {/* <section>
        <SectionHeading
          icon={MessageSquare}
          title="Fan Stories"
          subtitle="Real fans, real moments — from around the world"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {fanStories.map((s) => (
            <div
              key={s.id}
              className="border-brand-accent bg-brand-blue flex flex-col gap-4 rounded-xl border p-5"
            >
              <div className="flex items-center gap-3">
                <div className="bg-brand-mid border-brand-accent flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border">
                  <FlagImg code={s.flag} size="sm" />
                </div>
                <div>
                  <p className="text-brand-white text-sm font-semibold">
                    {s.name}
                  </p>
                  <p className="text-brand-muted flex items-center gap-1 text-[11px]">
                    <MapPin size={10} /> {s.location}
                  </p>
                </div>
                <span className="ml-auto text-base" title="Supports">
                  {s.team}
                </span>
              </div>
              <blockquote className="text-brand-muted border-brand-lime/40 flex-1 border-l-2 pl-3 text-sm leading-relaxed italic">
                &ldquo;{s.story}&rdquo;
              </blockquote>
              <div className="text-brand-muted flex items-center gap-1.5 text-xs">
                <Heart size={13} className="text-brand-red" />
                <span>{s.likes} fans loved this</span>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── 3. Prediction Leaderboard ────────────────────────────────── */}
      <section>
        <div className="mb-6 flex items-start justify-between gap-4">
          <SectionHeading
            icon={Trophy}
            title="Prediction Leaderboard"
            subtitle="Top predictors after Matchday 2"
          />
          <Link
            href="/predictions"
            className="text-brand-lime mt-1 hidden shrink-0 items-center gap-1 text-sm font-semibold hover:underline sm:flex"
          >
            Join & predict <ArrowRight size={14} />
          </Link>
        </div>

        <div className="border-brand-accent overflow-hidden rounded-xl border">
          {/* Header */}
          <div className="bg-brand-mid text-brand-muted grid grid-cols-[40px_1fr_80px_80px] gap-2 px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase">
            <span className="text-center">Rank</span>
            <span>Player</span>
            <span className="text-center">Correct</span>
            <span className="text-center">Points</span>
          </div>

          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`border-brand-accent grid grid-cols-[40px_1fr_80px_80px] items-center gap-2 border-b px-4 py-3 last:border-0 ${
                entry.rank <= 3 ? "bg-brand-lime/5" : "hover:bg-brand-accent/40"
              } transition-colors`}
            >
              {/* Rank */}
              <div className="flex justify-center">
                {entry.rank <= 3 ? (
                  <span
                    className={`text-brand-navy flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      entry.rank === 1
                        ? "bg-brand-lime"
                        : entry.rank === 2
                          ? "bg-gray-300"
                          : "bg-amber-600"
                    }`}
                  >
                    {entry.rank}
                  </span>
                ) : (
                  <span className="text-brand-muted w-7 text-center text-sm font-bold">
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-base">{entry.country}</span>
                <span
                  className={`truncate text-sm font-semibold ${entry.rank <= 3 ? "text-brand-lime" : "text-brand-white"}`}
                >
                  {entry.name}
                </span>
              </div>

              {/* Correct */}
              <div className="text-brand-muted text-center text-sm">
                {entry.correct}
              </div>

              {/* Points */}
              <div className="text-center">
                <span
                  className={`text-sm font-bold ${entry.rank <= 3 ? "text-brand-lime" : "text-brand-white"}`}
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {entry.points}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href="/predictions"
            className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Join the Prediction League <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* <AdBanner size="leaderboard" /> */}

      {/* ── 4. Local Watch Guide ─────────────────────────────────────── */}
      <section>
        <SectionHeading
          icon={MapPin}
          title={watchGuide.title}
          subtitle="Everything Bangladeshi fans need to follow the World Cup"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {watchGuide.sections.map((sec) => (
            <div
              key={sec.heading}
              className="border-brand-accent bg-brand-blue rounded-xl border p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-brand-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <sec.icon size={16} className="text-brand-lime" />
                </div>
                <h3
                  className="text-brand-white text-base font-bold"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {sec.heading}
                </h3>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Dhaka hotspots */}
        {/* <div className="border-brand-lime/30 bg-brand-blue mt-6 rounded-xl border p-5">
          <h3
            className="text-brand-white mb-4 flex items-center gap-2 text-base font-bold"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <MapPin size={16} className="text-brand-lime" />
            Popular Watch-Party Areas in Dhaka
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                area: "Dhanmondi",
                desc: "Lake side screenings and café viewings around Rabindra Sarobar"
              },
              {
                area: "Gulshan / Banani",
                desc: "Rooftop bars and community club gatherings with big-screen setups"
              },
              {
                area: "Kafrul / Mirpur",
                desc: "Outdoor community screenings, lively street atmosphere for big matches"
              }
            ].map((spot) => (
              <div
                key={spot.area}
                className="bg-brand-mid border-brand-accent rounded-lg border p-3"
              >
                <p className="text-brand-lime mb-1 text-sm font-semibold">
                  {spot.area}
                </p>
                <p className="text-brand-muted text-xs leading-relaxed">
                  {spot.desc}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section
        className="rounded-2xl p-8 text-center sm:p-12"
        style={{
          background:
            "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)"
        }}
      >
        <h2
          className="text-brand-white mb-3 text-2xl font-bold sm:text-3xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Don&apos;t Miss a Moment
        </h2>
        <p className="text-brand-muted mx-auto mb-6 max-w-md text-sm">
          Check fixtures, follow your team, and compete in the prediction league
          throughout the tournament.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/fixtures"
            className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View Fixtures <ArrowRight size={15} />
          </Link>
          <Link
            href="/predictions"
            className="border-brand-white/30 text-brand-white hover:border-brand-lime hover:text-brand-lime inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Predict Results
          </Link>
        </div>
      </section>

      {/* <AdBanner size="leaderboard" /> */}
    </div>
  );
}
