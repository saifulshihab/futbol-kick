"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface Option {
  label: string;
  votes: number;
}

const INITIAL: Option[] = [
  { label: "Home Win",  votes: 142 },
  { label: "Draw",      votes:  88 },
  { label: "Away Win",  votes: 106 },
];

export default function MatchPoll({
  homeTeam,
  awayTeam,
}: {
  homeTeam: string;
  awayTeam: string;
}) {
  const [options,  setOptions]  = useState<Option[]>(INITIAL);
  const [selected, setSelected] = useState<number | null>(null);

  const total = options.reduce((s, o) => s + o.votes, 0);

  function vote(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setOptions((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, votes: o.votes + 1 } : o)),
    );
  }

  const labels = [
    `${homeTeam} Win`,
    "Draw",
    `${awayTeam} Win`,
  ];

  const barColors = [
    "bg-blue-500",
    "bg-brand-yellow",
    "bg-brand-red",
  ];

  return (
    <div className="rounded-xl border border-brand-yellow/30 bg-brand-blue p-5">
      <p className="text-xs font-bold text-brand-yellow uppercase tracking-widest mb-1"
        style={{ fontFamily: "var(--font-oswald)" }}>
        Fan Poll
      </p>
      <p className="text-base font-semibold text-brand-white mb-5">
        How will this match end?
      </p>

      <div className="space-y-3">
        {options.map((opt, idx) => {
          const pct     = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted = selected === idx;
          const hasVoted = selected !== null;

          return (
            <button
              key={idx}
              onClick={() => vote(idx)}
              disabled={hasVoted}
              className={`w-full text-left rounded-lg border transition-all overflow-hidden group ${
                isVoted
                  ? "border-brand-yellow"
                  : hasVoted
                  ? "border-brand-accent opacity-70"
                  : "border-brand-accent hover:border-brand-yellow cursor-pointer"
              }`}
            >
              <div className="relative px-4 py-3">
                {/* Progress bar fill */}
                {hasVoted && (
                  <div
                    className={`absolute inset-y-0 left-0 ${barColors[idx]} opacity-20 transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-brand-white">
                    {isVoted && <CheckCircle size={14} className="text-brand-yellow shrink-0" />}
                    {labels[idx]}
                  </span>
                  {hasVoted && (
                    <span className={`text-sm font-bold ${isVoted ? "text-brand-yellow" : "text-brand-muted"}`}
                      style={{ fontFamily: "var(--font-oswald)" }}>
                      {pct}%
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-brand-muted mt-4 text-center">
        {total.toLocaleString()} votes · Click to cast yours
      </p>
    </div>
  );
}
