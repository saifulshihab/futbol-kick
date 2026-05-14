import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, Trophy, MapPin, Tv, Star, MessageSquare,
  Heart, ArrowRight, Globe,
} from "lucide-react";
import AdBanner from "@/components/AdBanner";
import FanPolls from "./FanPolls";

export const metadata: Metadata = {
  title: "Fan Zone",
  description:
    "Join the FIFA World Cup 2026 fan community — polls, fan stories, prediction leaderboards, and local watch guides for Bangladesh.",
};

// ─── Dummy data ───────────────────────────────────────────────────────────────

const fanStories = [
  {
    id: 1,
    name: "Rafiq H.",
    location: "Dhaka, Bangladesh",
    flag: "🇧🇩",
    team: "🇧🇷 Brazil",
    story:
      "I stayed up until 4am to watch Brazil vs Argentina in 2022. My whole neighbourhood was on the roof screaming. That's the magic of the World Cup — it doesn't matter if your country is playing. The game belongs to everyone.",
    likes: 142,
  },
  {
    id: 2,
    name: "Tanvir A.",
    location: "Chittagong, Bangladesh",
    flag: "🇧🇩",
    team: "🇦🇷 Argentina",
    story:
      "When Messi lifted the trophy in Qatar I cried. I've been following him since 2006 and to finally see him win it — after all those near misses — was the most emotional moment of my life as a football fan.",
    likes: 218,
  },
  {
    id: 3,
    name: "Karim O.",
    location: "Casablanca, Morocco",
    flag: "🇲🇦",
    team: "🇲🇦 Morocco",
    story:
      "2022 was a miracle. A semi-final! My grandfather was 80 and watching with us. He kept saying, 'I never thought I would live to see this.' In 2026 we go even further. We believe.",
    likes: 334,
  },
  {
    id: 4,
    name: "Priya S.",
    location: "Toronto, Canada",
    flag: "🇨🇦",
    team: "🇨🇦 Canada",
    story:
      "Having the World Cup in Canada means everything to us. I'm taking my daughter to the Toronto matches — she's 7 and she'll grow up telling her own kids she was there for Canada's best ever World Cup. I just know it.",
    likes: 89,
  },
  {
    id: 5,
    name: "José M.",
    location: "Mexico City, Mexico",
    flag: "🇲🇽",
    team: "🇲🇽 Mexico",
    story:
      "Every four years we go through the same heartbreak at the quinto partido. But this time it's different. It's at home. El Azteca will be electric. This is our year — I genuinely believe it for the first time in a long time.",
    likes: 176,
  },
];

const leaderboard = [
  { rank: 1,  name: "FutbolGuru99",   country: "🇧🇩", points: 148, correct: 12 },
  { rank: 2,  name: "GoalMachine",    country: "🇧🇷", points: 141, correct: 11 },
  { rank: 3,  name: "TacticoLoco",    country: "🇲🇽", points: 137, correct: 11 },
  { rank: 4,  name: "MessiForever",   country: "🇦🇷", points: 130, correct: 10 },
  { rank: 5,  name: "ThreeLions2026", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", points: 122, correct: 10 },
  { rank: 6,  name: "SambaSoul",      country: "🇧🇷", points: 118, correct: 9  },
  { rank: 7,  name: "OranjeFan",      country: "🇳🇱", points: 115, correct: 9  },
  { rank: 8,  name: "DhakaKicker",    country: "🇧🇩", points: 109, correct: 8  },
  { rank: 9,  name: "AtlasLion",      country: "🇲🇦", points: 104, correct: 8  },
  { rank: 10, name: "SamuraiBlue",    country: "🇯🇵", points: 97,  correct: 7  },
];

const watchGuide = {
  title: "How to Watch the World Cup in Bangladesh",
  sections: [
    {
      heading: "TV Channels",
      icon: Tv,
      content:
        "T Sports and Gazi TV traditionally broadcast major international football. Check your local cable/satellite provider for the confirmed 2026 rights holder. Multiple channels may share broadcast rights across the 104-match tournament.",
    },
    {
      heading: "Streaming Options",
      icon: Globe,
      content:
        "FanCode and other OTT platforms may carry live streams with subscription plans. A reliable VPN can help access international legal streams from services in the UK, USA or India where you have an existing subscription.",
    },
    {
      heading: "Match Times in BST (UTC+6)",
      icon: Star,
      content:
        "Most USA-based evening matches (10 PM ET) kick off at 8 AM BST the next morning — great for early risers! Afternoon USA matches (4 PM ET) are at midnight BST. Mexico matches often start slightly earlier, around 9–11 PM BST.",
    },
    {
      heading: "Watch Parties in Dhaka",
      icon: MapPin,
      content:
        "Dhanmondi Lake area, Gulshan 1 & 2, Banani, and Kafrul traditionally host large outdoor screenings for major tournaments. Local clubs, restaurants, and community centres set up big screens — follow social media closer to June for confirmed locations.",
    },
  ],
};

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={18} className="text-brand-yellow" />
      </div>
      <div>
        <h2
          className="text-2xl font-bold text-brand-white uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {title}
        </h2>
        {subtitle && <p className="text-sm text-brand-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FanZonePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden px-6 py-12 sm:px-12 text-center"
        style={{ background: "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)" }}
      >
        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-yellow/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-brand-red/5" />
        <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-yellow border border-brand-yellow/40 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          <Users size={12} /> Community Hub
        </span>
        <h1
          className="text-3xl sm:text-5xl font-bold text-brand-white mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Fan Zone
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-base">
          Join the World Cup 2026 community — vote in polls, read fan stories,
          climb the prediction leaderboard, and find out how to watch from anywhere.
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
      <section>
        <SectionHeading
          icon={MessageSquare}
          title="Fan Stories"
          subtitle="Real fans, real moments — from around the world"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {fanStories.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-brand-accent bg-brand-blue p-5 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-mid border border-brand-accent flex items-center justify-center text-xl shrink-0">
                  {s.flag}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-white">{s.name}</p>
                  <p className="text-[11px] text-brand-muted flex items-center gap-1">
                    <MapPin size={10} /> {s.location}
                  </p>
                </div>
                <span className="ml-auto text-base" title="Supports">{s.team}</span>
              </div>

              {/* Story */}
              <blockquote className="text-sm text-brand-muted leading-relaxed flex-1 italic border-l-2 border-brand-yellow/40 pl-3">
                &ldquo;{s.story}&rdquo;
              </blockquote>

              {/* Likes */}
              <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                <Heart size={13} className="text-brand-red" />
                <span>{s.likes} fans loved this</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Prediction Leaderboard ────────────────────────────────── */}
      <section>
        <div className="flex items-start justify-between gap-4 mb-6">
          <SectionHeading
            icon={Trophy}
            title="Prediction Leaderboard"
            subtitle="Top predictors after Matchday 2"
          />
          <Link
            href="/predictions"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-yellow hover:underline shrink-0 mt-1"
          >
            Join & predict <ArrowRight size={14} />
          </Link>
        </div>

        <div className="rounded-xl border border-brand-accent overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_80px_80px] gap-2 px-4 py-2.5 bg-brand-mid text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            <span className="text-center">Rank</span>
            <span>Player</span>
            <span className="text-center">Correct</span>
            <span className="text-center">Points</span>
          </div>

          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`grid grid-cols-[40px_1fr_80px_80px] gap-2 items-center px-4 py-3 border-b border-brand-accent last:border-0 ${
                entry.rank <= 3 ? "bg-brand-yellow/5" : "hover:bg-brand-accent/40"
              } transition-colors`}
            >
              {/* Rank */}
              <div className="flex justify-center">
                {entry.rank <= 3 ? (
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-brand-navy ${
                    entry.rank === 1 ? "bg-yellow-400" :
                    entry.rank === 2 ? "bg-gray-300" :
                    "bg-amber-600"
                  }`}>
                    {entry.rank}
                  </span>
                ) : (
                  <span className="text-sm text-brand-muted font-bold w-7 text-center">{entry.rank}</span>
                )}
              </div>

              {/* Name */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base shrink-0">{entry.country}</span>
                <span className={`text-sm font-semibold truncate ${entry.rank <= 3 ? "text-brand-yellow" : "text-brand-white"}`}>
                  {entry.name}
                </span>
              </div>

              {/* Correct */}
              <div className="text-center text-sm text-brand-muted">{entry.correct}</div>

              {/* Points */}
              <div className="text-center">
                <span
                  className={`text-sm font-bold ${entry.rank <= 3 ? "text-brand-yellow" : "text-brand-white"}`}
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {entry.points}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link
            href="/predictions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-navy text-sm font-bold hover:bg-yellow-400 transition-colors"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {watchGuide.sections.map((sec) => (
            <div
              key={sec.heading}
              className="rounded-xl border border-brand-accent bg-brand-blue p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center shrink-0">
                  <sec.icon size={16} className="text-brand-yellow" />
                </div>
                <h3
                  className="text-base font-bold text-brand-white"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {sec.heading}
                </h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>

        {/* Dhaka hotspots */}
        <div className="mt-6 rounded-xl border border-brand-yellow/30 bg-brand-blue p-5">
          <h3
            className="text-base font-bold text-brand-white mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <MapPin size={16} className="text-brand-yellow" />
            Popular Watch-Party Areas in Dhaka
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { area: "Dhanmondi", desc: "Lake side screenings and café viewings around Rabindra Sarobar" },
              { area: "Gulshan / Banani", desc: "Rooftop bars and community club gatherings with big-screen setups" },
              { area: "Kafrul / Mirpur", desc: "Outdoor community screenings, lively street atmosphere for big matches" },
            ].map((spot) => (
              <div key={spot.area} className="p-3 rounded-lg bg-brand-mid border border-brand-accent">
                <p className="text-sm font-semibold text-brand-yellow mb-1">{spot.area}</p>
                <p className="text-xs text-brand-muted leading-relaxed">{spot.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section
        className="rounded-2xl p-8 sm:p-12 text-center"
        style={{ background: "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)" }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-brand-white mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Don&apos;t Miss a Moment
        </h2>
        <p className="text-brand-muted mb-6 max-w-md mx-auto text-sm">
          Check fixtures, follow your team, and compete in the prediction league throughout the tournament.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/fixtures"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-navy text-sm font-bold hover:bg-yellow-400 transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View Fixtures <ArrowRight size={15} />
          </Link>
          <Link
            href="/predictions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-white/30 text-brand-white text-sm font-medium hover:border-brand-yellow hover:text-brand-yellow transition-colors"
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
