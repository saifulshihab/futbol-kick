import { ArrowRight, Target, Trophy, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import PredictionsClient from "./PredictionsClient";

export const metadata: Metadata = {
  title: "Predictions",
  description:
    "Make your FIFA World Cup 2026 predictions — pick the winner, Golden Boot scorer, group winners, and exact match scores. Climb the leaderboard!"
};

const HOW_IT_WORKS = [
  {
    icon: Trophy,
    label: "Pick the Winner",
    desc: "Select which nation lifts the trophy."
  },
  {
    icon: Target,
    label: "Golden Boot",
    desc: "Name the tournament top scorer."
  },
  {
    icon: Users,
    label: "Group Winners",
    desc: "Pick who tops each of the 6 groups."
  },
  {
    icon: Zap,
    label: "Exact Scores",
    desc: "Predict scores for upcoming matches."
  }
];

const SCORING = [
  { points: 5, label: "Correct exact score" },
  { points: 3, label: "Correct result (win/draw/loss)" },
  { points: 10, label: "Correct tournament winner" },
  { points: 8, label: "Correct Golden Boot winner" },
  { points: 4, label: "Correct group winner" }
];

export default function PredictionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div
        className="relative mb-10 overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-10"
        style={{
          background:
            "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)"
        }}
      >
        <div className="bg-brand-yellow/5 pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full" />
        <div className="bg-brand-red/5 pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full" />
        <span className="text-brand-yellow border-brand-yellow/40 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase">
          <Trophy size={12} /> Prediction League
        </span>
        <h1
          className="text-brand-white mb-3 text-3xl font-bold sm:text-5xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Make Your Predictions
        </h1>
        <p className="text-brand-muted mx-auto max-w-xl text-sm sm:text-base">
          Pick the winner, top scorer, group leaders, and exact match scores.
          Earn points, climb the leaderboard, and prove you know your football.
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      {/* How it works */}
      <div className="mb-10">
        <p
          className="text-brand-yellow mb-4 text-center text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          How It Works
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {HOW_IT_WORKS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="border-brand-accent bg-brand-blue flex flex-col items-center gap-2 rounded-xl border p-4 text-center"
            >
              <div className="bg-brand-yellow/10 border-brand-yellow/30 flex h-10 w-10 items-center justify-center rounded-xl border">
                <Icon size={18} className="text-brand-yellow" />
              </div>
              <p
                className="text-brand-white text-sm font-bold"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {label}
              </p>
              <p className="text-brand-muted text-xs leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring system */}
      <div className="border-brand-accent bg-brand-blue mb-10 rounded-xl border p-4">
        <p
          className="text-brand-yellow mb-3 text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Scoring System
        </p>
        <div className="flex flex-wrap gap-3">
          {SCORING.map(({ points, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span
                className="bg-brand-yellow text-brand-navy flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                +{points}
              </span>
              <span className="text-brand-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive prediction form */}
      <PredictionsClient />

      {/* <AdBanner size="leaderboard" className="mt-10" /> */}

      {/* Leaderboard CTA */}
      <div className="border-brand-accent bg-brand-blue mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border p-5 sm:flex-row">
        <div>
          <p className="text-brand-white mb-0.5 text-sm font-bold">
            Check the Leaderboard
          </p>
          <p className="text-brand-muted text-xs">
            See how your picks compare to the community.
          </p>
        </div>
        <Link
          href="/fan-zone"
          className="bg-brand-yellow text-brand-navy inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors hover:bg-yellow-400"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Fan Zone <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
