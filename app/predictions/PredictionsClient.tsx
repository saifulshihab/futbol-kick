"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Trophy, Target, Users, Zap, ArrowRight, RotateCcw } from "lucide-react";
import { teams, groups, getUpcomingFixtures, getTeamById, type Team } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScorePick { home: string; away: string }

interface Predictions {
  winner:      string;
  topScorer:   string;
  groupWinners: Record<string, string>;
  scores:      Record<string, ScorePick>;
}

const EMPTY: Predictions = {
  winner:       "",
  topScorer:    "",
  groupWinners: {},
  scores:       {},
};

// Key players across all teams for top scorer
const TOP_SCORER_CANDIDATES = [
  { name: "Kylian Mbappé",     team: "france",    flag: "🇫🇷" },
  { name: "Lionel Messi",      team: "argentina", flag: "🇦🇷" },
  { name: "Vinícius Júnior",   team: "brazil",    flag: "🇧🇷" },
  { name: "Harry Kane",        team: "england",   flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Cristiano Ronaldo", team: "portugal",  flag: "🇵🇹" },
  { name: "Erling Haaland",    team: "norway",    flag: "🇳🇴" },
  { name: "Lautaro Martínez",  team: "argentina", flag: "🇦🇷" },
  { name: "Julián Álvarez",    team: "argentina", flag: "🇦🇷" },
  { name: "Rodrygo",           team: "brazil",    flag: "🇧🇷" },
  { name: "Bukayo Saka",       team: "england",   flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Jude Bellingham",   team: "england",   flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Florian Wirtz",     team: "germany",   flag: "🇩🇪" },
];

const SCORE_OPTIONS = ["0","1","2","3","4","5"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({
  step, icon: Icon, title, subtitle, done,
}: {
  step: number; icon: React.ElementType; title: string; subtitle: string; done: boolean;
}) {
  return (
    <div className="flex items-start gap-4 mb-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${done ? "bg-green-600/20 border-green-600/40" : "bg-brand-yellow/10 border-brand-yellow/30"}`}>
        {done ? <CheckCircle size={18} className="text-green-400" /> : <Icon size={18} className="text-brand-yellow" />}
      </div>
      <div>
        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Step {step}</p>
        <h2 className="text-xl font-bold text-brand-white" style={{ fontFamily: "var(--font-oswald)" }}>{title}</h2>
        <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function TeamPicker({
  selected, onSelect, label,
}: {
  selected: string; onSelect: (id: string) => void; label?: string;
}) {
  const [search, setSearch] = useState("");
  const filtered = teams.filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      {label && <p className="text-sm text-brand-muted">{label}</p>}
      <input
        type="text"
        placeholder="Search team…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-accent text-sm text-brand-white placeholder-brand-muted focus:outline-none focus:border-brand-yellow transition-colors"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
              selected === t.id
                ? "border-brand-yellow bg-brand-yellow/10"
                : "border-brand-accent hover:border-brand-yellow/60 hover:bg-brand-accent/40"
            }`}
          >
            <span className="text-xl shrink-0">{t.flag}</span>
            <div className="min-w-0">
              <p className={`text-xs font-semibold truncate ${selected === t.id ? "text-brand-yellow" : "text-brand-white"}`}>
                {t.shortName}
              </p>
              <p className="text-[10px] text-brand-muted">#{t.fifaRank}</p>
            </div>
            {selected === t.id && <CheckCircle size={12} className="text-brand-yellow ml-auto shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Submitted screen ────────────────────────────────────────────────────────

function SubmittedScreen({ picks, onReset }: { picks: Predictions; onReset: () => void }) {
  const winner    = getTeamById(picks.winner);
  const scoreEntries = Object.entries(picks.scores);

  return (
    <div className="space-y-6 text-center">
      <div className="rounded-2xl border border-green-500/40 bg-green-900/10 p-8">
        <div className="w-16 h-16 rounded-full bg-green-600/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-brand-white mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
          Predictions Saved!
        </h2>
        <p className="text-brand-muted text-sm mb-6">
          Your picks have been recorded. Check back after matches to see how you scored.
        </p>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
          {winner && (
            <div className="p-4 rounded-xl border border-brand-accent bg-brand-blue">
              <p className="text-[10px] text-brand-muted uppercase tracking-widest mb-2">Your winner pick</p>
              <p className="text-lg flex items-center gap-2 font-bold text-brand-white">
                <span>{winner.flag}</span>{winner.name}
              </p>
            </div>
          )}
          {picks.topScorer && (
            <div className="p-4 rounded-xl border border-brand-accent bg-brand-blue">
              <p className="text-[10px] text-brand-muted uppercase tracking-widest mb-2">Your top scorer pick</p>
              <p className="text-base font-bold text-brand-white">{picks.topScorer}</p>
            </div>
          )}
          {Object.entries(picks.groupWinners).length > 0 && (
            <div className="p-4 rounded-xl border border-brand-accent bg-brand-blue sm:col-span-2">
              <p className="text-[10px] text-brand-muted uppercase tracking-widest mb-3">Group winners</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(picks.groupWinners).map(([g, tid]) => {
                  const t = getTeamById(tid);
                  return t ? (
                    <span key={g} className="flex items-center gap-1.5 text-sm">
                      <span className="text-brand-yellow font-bold">Grp {g}:</span>
                      <span>{t.flag}</span>
                      <span className="text-brand-white">{t.code}</span>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/fan-zone"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-navy text-sm font-bold hover:bg-yellow-400 transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}>
            View Leaderboard <ArrowRight size={14} />
          </Link>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-white/30 text-brand-white text-sm font-medium hover:border-brand-yellow hover:text-brand-yellow transition-colors"
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
  const [picks,     setPicks]     = useState<Predictions>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const upcomingFixtures = getUpcomingFixtures(5);

  function setWinner(id: string)       { setPicks((p) => ({ ...p, winner: id })); }
  function setTopScorer(name: string)  { setPicks((p) => ({ ...p, topScorer: name })); }
  function setGroupWinner(g: string, teamId: string) {
    setPicks((p) => ({ ...p, groupWinners: { ...p.groupWinners, [g]: teamId } }));
  }
  function setScore(fixtureId: string, side: "home" | "away", val: string) {
    setPicks((p) => ({
      ...p,
      scores: {
        ...p.scores,
        [fixtureId]: { ...(p.scores[fixtureId] ?? { home: "1", away: "1" }), [side]: val },
      },
    }));
  }

  const completedSteps = [
    picks.winner !== "",
    picks.topScorer !== "",
    Object.keys(picks.groupWinners).length >= 3,
    Object.keys(picks.scores).length >= 2,
  ];
  const totalDone = completedSteps.filter(Boolean).length;
  const allDone   = totalDone === completedSteps.length;

  function handleSubmit() {
    if (typeof window !== "undefined") {
      localStorage.setItem("futbolkick_predictions", JSON.stringify(picks));
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return <SubmittedScreen picks={picks} onReset={() => setSubmitted(false)} />;
  }

  return (
    <div className="space-y-10">

      {/* Progress bar */}
      <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-brand-white uppercase tracking-wide"
            style={{ fontFamily: "var(--font-oswald)" }}>
            Your Progress
          </p>
          <p className="text-xs text-brand-muted">{totalDone} / {completedSteps.length} sections complete</p>
        </div>
        <div className="h-2 rounded-full bg-brand-accent overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-yellow transition-all duration-500"
            style={{ width: `${(totalDone / completedSteps.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-2 mt-3">
          {["Winner", "Top Scorer", "Group Picks", "Match Scores"].map((label, i) => (
            <div key={label} className={`flex items-center gap-1 text-[10px] ${completedSteps[i] ? "text-green-400" : "text-brand-muted"}`}>
              {completedSteps[i] ? <CheckCircle size={10} /> : <div className="w-2.5 h-2.5 rounded-full border border-current" />}
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Step 1: Tournament Winner ──────────────────────────────── */}
      <section className="rounded-xl border border-brand-accent bg-brand-blue p-5 sm:p-6">
        <StepHeader step={1} icon={Trophy} title="Tournament Winner"
          subtitle="Which team will lift the trophy on July 19?" done={completedSteps[0]} />
        <TeamPicker selected={picks.winner} onSelect={setWinner} />
        {picks.winner && (
          <p className="mt-3 text-sm text-green-400 flex items-center gap-1.5">
            <CheckCircle size={14} />
            {getTeamById(picks.winner)?.flag} {getTeamById(picks.winner)?.name} selected
          </p>
        )}
      </section>

      {/* ── Step 2: Top Scorer ─────────────────────────────────────── */}
      <section className="rounded-xl border border-brand-accent bg-brand-blue p-5 sm:p-6">
        <StepHeader step={2} icon={Target} title="Golden Boot Winner"
          subtitle="Who will finish as the tournament's top scorer?" done={completedSteps[1]} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {TOP_SCORER_CANDIDATES.map((c) => (
            <button
              key={c.name}
              onClick={() => setTopScorer(c.name)}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                picks.topScorer === c.name
                  ? "border-brand-yellow bg-brand-yellow/10"
                  : "border-brand-accent hover:border-brand-yellow/60 hover:bg-brand-accent/40"
              }`}
            >
              <span className="text-xl shrink-0">{c.flag}</span>
              <div className="min-w-0">
                <p className={`text-xs font-semibold truncate leading-tight ${picks.topScorer === c.name ? "text-brand-yellow" : "text-brand-white"}`}>
                  {c.name}
                </p>
              </div>
              {picks.topScorer === c.name && <CheckCircle size={11} className="text-brand-yellow ml-auto shrink-0" />}
            </button>
          ))}
        </div>
      </section>

      {/* ── Step 3: Group Winners ──────────────────────────────────── */}
      <section className="rounded-xl border border-brand-accent bg-brand-blue p-5 sm:p-6">
        <StepHeader step={3} icon={Users} title="Group Winners"
          subtitle="Pick the team that finishes top of each group" done={completedSteps[2]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {groups.map((group) => {
            const currentPick = picks.groupWinners[group.id];
            const groupTeams  = group.teamIds.map((id) => getTeamById(id)).filter(Boolean) as Team[];
            return (
              <div key={group.id} className="rounded-lg border border-brand-accent p-3 space-y-2">
                <p className="text-xs font-bold text-brand-yellow uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-oswald)" }}>
                  Group {group.id}
                </p>
                {groupTeams.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setGroupWinner(group.id, t.id)}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all ${
                      currentPick === t.id
                        ? "border-brand-yellow bg-brand-yellow/10"
                        : "border-brand-accent hover:border-brand-yellow/50 hover:bg-brand-accent/30"
                    }`}
                  >
                    <span className="text-lg">{t.flag}</span>
                    <span className={`text-xs font-medium flex-1 text-left ${currentPick === t.id ? "text-brand-yellow" : "text-brand-white"}`}>
                      {t.shortName}
                    </span>
                    <span className="text-[10px] text-brand-muted">#{t.fifaRank}</span>
                    {currentPick === t.id && <CheckCircle size={12} className="text-brand-yellow shrink-0" />}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Step 4: Score Predictions ──────────────────────────────── */}
      <section className="rounded-xl border border-brand-accent bg-brand-blue p-5 sm:p-6">
        <StepHeader step={4} icon={Zap} title="Score Predictions"
          subtitle="Predict the exact score for upcoming matches" done={completedSteps[3]} />
        <div className="space-y-4">
          {upcomingFixtures.map((f) => {
            const home  = getTeamById(f.homeTeamId);
            const away  = getTeamById(f.awayTeamId);
            if (!home || !away) return null;
            const score = picks.scores[f.id] ?? { home: "", away: "" };

            return (
              <div key={f.id}
                className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl border border-brand-accent hover:border-brand-yellow/40 transition-colors">
                {/* Home */}
                <div className="flex-1 flex items-center gap-2 justify-end">
                  <span className="text-sm font-semibold text-brand-white hidden sm:block">{home.shortName}</span>
                  <span className="text-2xl">{home.flag}</span>
                </div>

                {/* Score inputs */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={score.home}
                    onChange={(e) => setScore(f.id, "home", e.target.value)}
                    className="w-12 text-center px-1 py-1.5 rounded-lg bg-brand-navy border border-brand-accent text-brand-white text-sm font-bold focus:outline-none focus:border-brand-yellow transition-colors"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    <option value="">-</option>
                    {SCORE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <span className="text-brand-yellow font-bold">–</span>
                  <select
                    value={score.away}
                    onChange={(e) => setScore(f.id, "away", e.target.value)}
                    className="w-12 text-center px-1 py-1.5 rounded-lg bg-brand-navy border border-brand-accent text-brand-white text-sm font-bold focus:outline-none focus:border-brand-yellow transition-colors"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    <option value="">-</option>
                    {SCORE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>

                {/* Away */}
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-2xl">{away.flag}</span>
                  <span className="text-sm font-semibold text-brand-white hidden sm:block">{away.shortName}</span>
                </div>

                {/* Date label */}
                <div className="sm:ml-2 text-[11px] text-brand-muted text-center sm:text-right shrink-0">
                  <p>{new Date(f.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
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
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold shadow-2xl transition-all ${
            allDone
              ? "bg-brand-yellow text-brand-navy hover:bg-yellow-400 cursor-pointer"
              : "bg-brand-accent text-brand-muted cursor-not-allowed opacity-60"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {allDone ? (
            <><CheckCircle size={18} /> Submit My Predictions</>
          ) : (
            `Complete all ${completedSteps.length - totalDone} remaining section${completedSteps.length - totalDone !== 1 ? "s" : ""} to submit`
          )}
        </button>
      </div>
    </div>
  );
}
