import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Target, Users, Zap, ArrowRight } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import PredictionsClient from "./PredictionsClient";

export const metadata: Metadata = {
  title: "Predictions",
  description:
    "Make your FIFA World Cup 2026 predictions — pick the winner, Golden Boot scorer, group winners, and exact match scores. Climb the leaderboard!",
};

const HOW_IT_WORKS = [
  { icon: Trophy, label: "Pick the Winner",  desc: "Select which nation lifts the trophy." },
  { icon: Target, label: "Golden Boot",      desc: "Name the tournament top scorer." },
  { icon: Users,  label: "Group Winners",    desc: "Pick who tops each of the 6 groups." },
  { icon: Zap,    label: "Exact Scores",     desc: "Predict scores for upcoming matches." },
];

const SCORING = [
  { points: 5,  label: "Correct exact score" },
  { points: 3,  label: "Correct result (win/draw/loss)" },
  { points: 10, label: "Correct tournament winner" },
  { points: 8,  label: "Correct Golden Boot winner" },
  { points: 4,  label: "Correct group winner" },
];

export default function PredictionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

      {/* Page header */}
      <div
        className="relative rounded-2xl overflow-hidden px-6 py-10 sm:px-10 mb-10 text-center"
        style={{ background: "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)" }}
      >
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand-yellow/5" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-brand-red/5" />
        <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-yellow border border-brand-yellow/40 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          <Trophy size={12} /> Prediction League
        </span>
        <h1
          className="text-3xl sm:text-5xl font-bold text-brand-white mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Make Your Predictions
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-sm sm:text-base">
          Pick the winner, top scorer, group leaders, and exact match scores.
          Earn points, climb the leaderboard, and prove you know your football.
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      {/* How it works */}
      <div className="mb-10">
        <p
          className="text-xs font-bold text-brand-yellow uppercase tracking-widest mb-4 text-center"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          How It Works
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HOW_IT_WORKS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-brand-accent bg-brand-blue text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center">
                <Icon size={18} className="text-brand-yellow" />
              </div>
              <p className="text-sm font-bold text-brand-white" style={{ fontFamily: "var(--font-poppins)" }}>
                {label}
              </p>
              <p className="text-xs text-brand-muted leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring system */}
      <div className="mb-10 rounded-xl border border-brand-accent bg-brand-blue p-4">
        <p
          className="text-xs font-bold text-brand-yellow uppercase tracking-widest mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Scoring System
        </p>
        <div className="flex flex-wrap gap-3">
          {SCORING.map(({ points, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-yellow text-brand-navy text-xs font-bold shrink-0"
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
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-brand-accent bg-brand-blue">
        <div>
          <p className="text-sm font-bold text-brand-white mb-0.5">Check the Leaderboard</p>
          <p className="text-xs text-brand-muted">See how your picks compare to the community.</p>
        </div>
        <Link
          href="/fan-zone"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-navy text-sm font-bold hover:bg-yellow-400 transition-colors"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Fan Zone <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
