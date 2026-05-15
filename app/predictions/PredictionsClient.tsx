"use client";

import FlagImg from "@/components/FlagImg";
import {
  getTeamById,
  getUpcomingFixtures,
  groups,
  teams,
  type Team
} from "@/lib/data";
import {
  ArrowRight,
  CheckCircle,
  RotateCcw,
  Target,
  Trophy,
  Users,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScorePick {
  home: string;
  away: string;
}

interface Predictions {
  winner: string;
  topScorer: string;
  groupWinners: Record<string, string>;
  scores: Record<string, ScorePick>;
}

const EMPTY: Predictions = {
  winner: "",
  topScorer: "",
  groupWinners: {},
  scores: {}
};

// Key players across all teams for top scorer
const TOP_SCORER_CANDIDATES = [
  { name: "Kylian Mbappé", team: "france", flag: "fr" },
  { name: "Lionel Messi", team: "argentina", flag: "ar" },
  { name: "Vinícius Júnior", team: "brazil", flag: "br" },
  { name: "Harry Kane", team: "england", flag: "gb-eng" },
  { name: "Cristiano Ronaldo", team: "portugal", flag: "pt" },
  { name: "Erling Haaland", team: "norway", flag: "no" },
  { name: "Lautaro Martínez", team: "argentina", flag: "ar" },
  { name: "Julián Álvarez", team: "argentina", flag: "ar" },
  { name: "Rodrygo", team: "brazil", flag: "br" },
  { name: "Bukayo Saka", team: "england", flag: "gb-eng" },
  { name: "Jude Bellingham", team: "england", flag: "gb-eng" },
  { name: "Florian Wirtz", team: "germany", flag: "de" }
];

const SCORE_OPTIONS = ["0", "1", "2", "3", "4", "5"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({
  step,
  icon: Icon,
  title,
  subtitle,
  done
}: {
  step: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  done: boolean;
}) {
  return (
    <div className="mb-5 flex items-start gap-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${done ? "border-green-600/40 bg-green-600/20" : "bg-brand-lime/10 border-brand-lime/30"}`}
      >
        {done ? (
          <CheckCircle size={18} className="text-green-400" />
        ) : (
          <Icon size={18} className="text-brand-lime" />
        )}
      </div>
      <div>
        <p className="text-brand-muted text-[10px] font-bold tracking-widest uppercase">
          Step {step}
        </p>
        <h2
          className="text-brand-white text-xl font-bold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {title}
        </h2>
        <p className="text-brand-muted mt-0.5 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

function TeamPicker({
  selected,
  onSelect,
  label
}: {
  selected: string;
  onSelect: (id: string) => void;
  label?: string;
}) {
  const [search, setSearch] = useState("");
  const filtered = teams.filter(
    (t) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {label && <p className="text-brand-muted text-sm">{label}</p>}
      <input
        type="text"
        placeholder="Search team…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-brand-navy border-brand-accent text-brand-white placeholder-brand-muted focus:border-brand-lime w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none"
      />
      <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`flex items-center gap-2 rounded-lg border p-2.5 text-left transition-all ${
              selected === t.id
                ? "border-brand-lime bg-brand-lime/10"
                : "border-brand-accent hover:border-brand-lime/60 hover:bg-brand-accent/40"
            }`}
          >
            <FlagImg code={t.flag} size="sm" className="shrink-0" />
            <div className="min-w-0">
              <p
                className={`truncate text-xs font-semibold ${selected === t.id ? "text-brand-lime" : "text-brand-white"}`}
              >
                {t.shortName}
              </p>
              <p className="text-brand-muted text-[10px]">#{t.fifaRank}</p>
            </div>
            {selected === t.id && (
              <CheckCircle
                size={12}
                className="text-brand-lime ml-auto shrink-0"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Submitted screen ────────────────────────────────────────────────────────

function SubmittedScreen({
  picks,
  onReset
}: {
  picks: Predictions;
  onReset: () => void;
}) {
  const winner = getTeamById(picks.winner);
  const scoreEntries = Object.entries(picks.scores);

  return (
    <div className="space-y-6 text-center">
      <div className="rounded-2xl border border-green-500/40 bg-green-900/10 p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/40 bg-green-600/20">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2
          className="text-brand-white mb-2 text-2xl font-bold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Predictions Saved!
        </h2>
        <p className="text-brand-muted mb-6 text-sm">
          Your picks have been recorded. Check back after matches to see how you
          scored.
        </p>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {winner && (
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
              <p className="text-brand-muted mb-2 text-[10px] tracking-widest uppercase">
                Your winner pick
              </p>
              <p className="text-brand-white flex items-center gap-2 text-lg font-bold">
                <FlagImg code={winner.flag} size="xs" />
                {winner.name}
              </p>
            </div>
          )}
          {picks.topScorer && (
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
              <p className="text-brand-muted mb-2 text-[10px] tracking-widest uppercase">
                Your top scorer pick
              </p>
              <p className="text-brand-white text-base font-bold">
                {picks.topScorer}
              </p>
            </div>
          )}
          {Object.entries(picks.groupWinners).length > 0 && (
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4 sm:col-span-2">
              <p className="text-brand-muted mb-3 text-[10px] tracking-widest uppercase">
                Group winners
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(picks.groupWinners).map(([g, tid]) => {
                  const t = getTeamById(tid);
                  return t ? (
                    <span key={g} className="flex items-center gap-1.5 text-sm">
                      <span className="text-brand-lime font-bold">
                        Grp {g}:
                      </span>
                      <FlagImg code={t.flag} size="xs" />
                      <span className="text-brand-white">{t.code}</span>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/fan-zone"
            className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View Leaderboard <ArrowRight size={14} />
          </Link>
          <button
            onClick={onReset}
            className="border-brand-white/30 text-brand-white hover:border-brand-lime hover:text-brand-lime inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <RotateCcw size={14} /> Edit Picks
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

export default function PredictionsClient() {
  const [picks, setPicks] = useState<Predictions>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const upcomingFixtures = getUpcomingFixtures(5);

  function setWinner(id: string) {
    setPicks((p) => ({ ...p, winner: id }));
  }
  function setTopScorer(name: string) {
    setPicks((p) => ({ ...p, topScorer: name }));
  }
  function setGroupWinner(g: string, teamId: string) {
    setPicks((p) => ({
      ...p,
      groupWinners: { ...p.groupWinners, [g]: teamId }
    }));
  }
  function setScore(fixtureId: string, side: "home" | "away", val: string) {
    setPicks((p) => ({
      ...p,
      scores: {
        ...p.scores,
        [fixtureId]: {
          ...(p.scores[fixtureId] ?? { home: "1", away: "1" }),
          [side]: val
        }
      }
    }));
  }

  const completedSteps = [
    picks.winner !== "",
    picks.topScorer !== "",
    Object.keys(picks.groupWinners).length >= 3,
    Object.keys(picks.scores).length >= 2
  ];
  const totalDone = completedSteps.filter(Boolean).length;
  const allDone = totalDone === completedSteps.length;

  function handleSubmit() {
    if (typeof window !== "undefined") {
      localStorage.setItem("futbolkick_predictions", JSON.stringify(picks));
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <SubmittedScreen picks={picks} onReset={() => setSubmitted(false)} />
    );
  }

  return (
    <div className="space-y-10">
      {/* Progress bar */}
      <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
        <div className="mb-2 flex items-center justify-between">
          <p
            className="text-brand-white text-xs font-bold tracking-wide uppercase"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Your Progress
          </p>
          <p className="text-brand-muted text-xs">
            {totalDone} / {completedSteps.length} sections complete
          </p>
        </div>
        <div className="bg-brand-accent h-2 overflow-hidden rounded-full">
          <div
            className="bg-brand-lime h-full rounded-full transition-all duration-500"
            style={{ width: `${(totalDone / completedSteps.length) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex gap-2">
          {["Winner", "Top Scorer", "Group Picks", "Match Scores"].map(
            (label, i) => (
              <div
                key={label}
                className={`flex items-center gap-1 text-[10px] ${completedSteps[i] ? "text-green-400" : "text-brand-muted"}`}
              >
                {completedSteps[i] ? (
                  <CheckCircle size={10} />
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full border border-current" />
                )}
                <span className="hidden sm:inline">{label}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* ── Step 1: Tournament Winner ──────────────────────────────── */}
      <section className="border-brand-accent bg-brand-blue rounded-xl border p-5 sm:p-6">
        <StepHeader
          step={1}
          icon={Trophy}
          title="Tournament Winner"
          subtitle="Which team will lift the trophy on July 19?"
          done={completedSteps[0]}
        />
        <TeamPicker selected={picks.winner} onSelect={setWinner} />
        {picks.winner && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-green-400">
            <CheckCircle size={14} />
            {(() => {
              const t = getTeamById(picks.winner);
              return t ? (
                <>
                  <FlagImg code={t.flag} size="xs" /> {t.name}
                </>
              ) : null;
            })()}{" "}
            selected
          </p>
        )}
      </section>

      {/* ── Step 2: Top Scorer ─────────────────────────────────────── */}
      <section className="border-brand-accent bg-brand-blue rounded-xl border p-5 sm:p-6">
        <StepHeader
          step={2}
          icon={Target}
          title="Golden Boot Winner"
          subtitle="Who will finish as the tournament's top scorer?"
          done={completedSteps[1]}
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {TOP_SCORER_CANDIDATES.map((c) => (
            <button
              key={c.name}
              onClick={() => setTopScorer(c.name)}
              className={`flex items-center gap-2 rounded-lg border p-2.5 text-left transition-all ${
                picks.topScorer === c.name
                  ? "border-brand-lime bg-brand-lime/10"
                  : "border-brand-accent hover:border-brand-lime/60 hover:bg-brand-accent/40"
              }`}
            >
              <FlagImg code={c.flag} size="sm" className="shrink-0" />
              <div className="min-w-0">
                <p
                  className={`truncate text-xs leading-tight font-semibold ${picks.topScorer === c.name ? "text-brand-lime" : "text-brand-white"}`}
                >
                  {c.name}
                </p>
              </div>
              {picks.topScorer === c.name && (
                <CheckCircle
                  size={11}
                  className="text-brand-lime ml-auto shrink-0"
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Step 3: Group Winners ──────────────────────────────────── */}
      <section className="border-brand-accent bg-brand-blue rounded-xl border p-5 sm:p-6">
        <StepHeader
          step={3}
          icon={Users}
          title="Group Winners"
          subtitle="Pick the team that finishes top of each group"
          done={completedSteps[2]}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => {
            const currentPick = picks.groupWinners[group.id];
            const groupTeams = group.teamIds
              .map((id) => getTeamById(id))
              .filter(Boolean) as Team[];
            return (
              <div
                key={group.id}
                className="border-brand-accent space-y-2 rounded-lg border p-3"
              >
                <p
                  className="text-brand-lime text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Group {group.id}
                </p>
                {groupTeams.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setGroupWinner(group.id, t.id)}
                    className={`flex w-full items-center gap-2 rounded-lg border p-2 transition-all ${
                      currentPick === t.id
                        ? "border-brand-lime bg-brand-lime/10"
                        : "border-brand-accent hover:border-brand-lime/50 hover:bg-brand-accent/30"
                    }`}
                  >
                    <FlagImg code={t.flag} size="xs" />
                    <span
                      className={`flex-1 text-left text-xs font-medium ${currentPick === t.id ? "text-brand-lime" : "text-brand-white"}`}
                    >
                      {t.shortName}
                    </span>
                    <span className="text-brand-muted text-[10px]">
                      #{t.fifaRank}
                    </span>
                    {currentPick === t.id && (
                      <CheckCircle
                        size={12}
                        className="text-brand-lime shrink-0"
                      />
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Step 4: Score Predictions ──────────────────────────────── */}
      <section className="border-brand-accent bg-brand-blue rounded-xl border p-5 sm:p-6">
        <StepHeader
          step={4}
          icon={Zap}
          title="Score Predictions"
          subtitle="Predict the exact score for upcoming matches"
          done={completedSteps[3]}
        />
        <div className="space-y-4">
          {upcomingFixtures.map((f) => {
            const home = getTeamById(f.homeTeamId);
            const away = getTeamById(f.awayTeamId);
            if (!home || !away) return null;
            const score = picks.scores[f.id] ?? { home: "", away: "" };

            return (
              <div
                key={f.id}
                className="border-brand-accent hover:border-brand-lime/40 flex flex-col items-center gap-3 rounded-xl border p-4 transition-colors sm:flex-row"
              >
                {/* Home */}
                <div className="flex flex-1 items-center justify-end gap-2">
                  <span className="text-brand-white hidden text-sm font-semibold sm:block">
                    {home.shortName}
                  </span>
                  <FlagImg code={home.flag} size="sm" />
                </div>

                {/* Score inputs */}
                <div className="flex shrink-0 items-center gap-2">
                  <select
                    value={score.home}
                    onChange={(e) => setScore(f.id, "home", e.target.value)}
                    className="bg-brand-navy border-brand-accent text-brand-white focus:border-brand-lime w-12 rounded-lg border px-1 py-1.5 text-center text-sm font-bold transition-colors focus:outline-none"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    <option value="">-</option>
                    {SCORE_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <span className="text-brand-lime font-bold">–</span>
                  <select
                    value={score.away}
                    onChange={(e) => setScore(f.id, "away", e.target.value)}
                    className="bg-brand-navy border-brand-accent text-brand-white focus:border-brand-lime w-12 rounded-lg border px-1 py-1.5 text-center text-sm font-bold transition-colors focus:outline-none"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    <option value="">-</option>
                    {SCORE_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Away */}
                <div className="flex flex-1 items-center gap-2">
                  <FlagImg code={away.flag} size="sm" />
                  <span className="text-brand-white hidden text-sm font-semibold sm:block">
                    {away.shortName}
                  </span>
                </div>

                {/* Date label */}
                <div className="text-brand-muted shrink-0 text-center text-[11px] sm:ml-2 sm:text-right">
                  <p>
                    {new Date(f.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short"
                    })}
                  </p>
                  <p>{f.city}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Submit ─────────────────────────────────────────────────── */}
      <div className="sticky bottom-4 z-30">
        <button
          onClick={handleSubmit}
          disabled={!allDone}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold shadow-2xl transition-all ${
            allDone
              ? "bg-brand-lime text-brand-navy hover:bg-brand-lime/80 cursor-pointer"
              : "bg-brand-accent text-brand-muted cursor-not-allowed opacity-60"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {allDone ? (
            <>
              <CheckCircle size={18} /> Submit My Predictions
            </>
          ) : (
            `Complete all ${completedSteps.length - totalDone} remaining section${completedSteps.length - totalDone !== 1 ? "s" : ""} to submit`
          )}
        </button>
      </div>
    </div>
  );
}
