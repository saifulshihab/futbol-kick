"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface PollOption {
  label: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

const POLLS: Poll[] = [
  {
    id: "winner",
    question: "Who will win the 2026 World Cup?",
    options: [
      { label: "🇦🇷 Argentina", votes: 1482 },
      { label: "🇫🇷 France",    votes: 1204 },
      { label: "🇧🇷 Brazil",    votes: 983  },
      { label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   votes: 671  },
      { label: "🇩🇪 Germany",   votes: 448  },
      { label: "Other",          votes: 612  },
    ],
  },
  {
    id: "topscorer",
    question: "Who will be the tournament top scorer?",
    options: [
      { label: "🇫🇷 Kylian Mbappé",    votes: 1831 },
      { label: "🇦🇷 Lionel Messi",     votes: 1523 },
      { label: "🇧🇷 Vinícius Júnior",  votes: 894  },
      { label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Harry Kane",       votes: 712  },
      { label: "🇵🇹 Cristiano Ronaldo",votes: 659  },
    ],
  },
  {
    id: "surprise",
    question: "Which team will surprise everyone?",
    options: [
      { label: "🇲🇦 Morocco",    votes: 847 },
      { label: "🇯🇵 Japan",      votes: 634 },
      { label: "🇺🇸 USA",        votes: 521 },
      { label: "🇨🇦 Canada",     votes: 388 },
      { label: "🇸🇳 Senegal",    votes: 291 },
    ],
  },
];

const BAR_COLORS = [
  "bg-brand-yellow",
  "bg-blue-500",
  "bg-green-500",
  "bg-brand-red",
  "bg-purple-500",
  "bg-orange-500",
];

function SinglePoll({ poll }: { poll: Poll }) {
  const [options,  setOptions]  = useState(poll.options);
  const [selected, setSelected] = useState<number | null>(null);

  const total = options.reduce((s, o) => s + o.votes, 0);

  function vote(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setOptions((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, votes: o.votes + 1 } : o)),
    );
  }

  return (
    <div className="rounded-xl border border-brand-accent bg-brand-blue p-5">
      <p
        className="text-base font-bold text-brand-white mb-5"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {poll.question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, idx) => {
          const pct      = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted  = selected === idx;
          const hasVoted = selected !== null;
          const color    = BAR_COLORS[idx % BAR_COLORS.length];

          return (
            <button
              key={idx}
              onClick={() => vote(idx)}
              disabled={hasVoted}
              className={`w-full text-left rounded-lg border transition-all overflow-hidden ${
                isVoted
                  ? "border-brand-yellow"
                  : hasVoted
                  ? "border-brand-accent opacity-75"
                  : "border-brand-accent hover:border-brand-yellow cursor-pointer"
              }`}
            >
              <div className="relative px-4 py-2.5">
                {hasVoted && (
                  <div
                    className={`absolute inset-y-0 left-0 ${color} opacity-20 transition-all duration-700 rounded-l-lg`}
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-brand-white">
                    {isVoted && <CheckCircle size={13} className="text-brand-yellow shrink-0" />}
                    {opt.label}
                  </span>
                  {hasVoted && (
                    <span
                      className={`text-sm font-bold shrink-0 ${isVoted ? "text-brand-yellow" : "text-brand-muted"}`}
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {pct}%
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-brand-muted mt-4">
        {(total + (selected !== null ? 1 : 0)).toLocaleString()} votes cast
        {selected === null && " · Click an option to vote"}
      </p>
    </div>
  );
}

export default function FanPolls() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {POLLS.map((poll) => (
        <SinglePoll key={poll.id} poll={poll} />
      ))}
    </div>
  );
}
