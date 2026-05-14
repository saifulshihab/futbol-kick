"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, Calendar, CheckCircle, Radio } from "lucide-react";
import Link from "next/link";
import { Fixture, Team, getTeamById } from "@/lib/data";
import MatchCard from "@/components/MatchCard";

type Tab = "upcoming" | "completed";

const GROUPS  = ["A", "B", "C", "D", "E", "F"];
const STAGES  = [
  { value: "group",         label: "Group Stage" },
  { value: "round-of-32",   label: "Round of 32" },
  { value: "round-of-16",   label: "Round of 16" },
  { value: "quarter-final", label: "Quarter-Final" },
  { value: "semi-final",    label: "Semi-Final" },
  { value: "final",         label: "Final" },
];

interface Props {
  fixtures: Fixture[];
  teams: Team[];
}

export default function FixturesClient({ fixtures, teams }: Props) {
  const [tab,    setTab]    = useState<Tab>("upcoming");
  const [group,  setGroup]  = useState("");
  const [stage,  setStage]  = useState("");
  const [search, setSearch] = useState("");

  const hasFilters = group || stage || search;

  const filtered = useMemo(() => {
    return fixtures
      .filter((f) =>
        tab === "upcoming"
          ? f.status === "upcoming" || f.status === "live"
          : f.status === "completed",
      )
      .filter((f) => (group ? f.group === group : true))
      .filter((f) => (stage ? f.stage === stage : true))
      .filter((f) => {
        if (!search) return true;
        const q = search.toLowerCase();
        const home = getTeamById(f.homeTeamId);
        const away = getTeamById(f.awayTeamId);
        return (
          home?.name.toLowerCase().includes(q) ||
          home?.shortName.toLowerCase().includes(q) ||
          away?.name.toLowerCase().includes(q) ||
          away?.shortName.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.venue.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (tab === "completed") return b.date.localeCompare(a.date);
        return a.date.localeCompare(b.date);
      });
  }, [fixtures, tab, group, stage, search]);

  // Group completed fixtures by date for visual grouping
  const byDate = useMemo(() => {
    const map: Record<string, Fixture[]> = {};
    filtered.forEach((f) => {
      if (!map[f.date]) map[f.date] = [];
      map[f.date].push(f);
    });
    return map;
  }, [filtered]);

  const sortedDates = Object.keys(byDate).sort((a, b) =>
    tab === "completed" ? b.localeCompare(a) : a.localeCompare(b),
  );

  function clearFilters() {
    setGroup("");
    setStage("");
    setSearch("");
  }

  return (
    <div className="space-y-6">
      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-brand-accent bg-brand-blue p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Filter size={15} className="text-brand-yellow" />
          <span
            className="text-sm font-bold text-brand-white uppercase tracking-wide"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Filter Matches
          </span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-xs text-brand-red hover:text-red-400 transition-colors"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative sm:col-span-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Team, city, venue…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-brand-navy border border-brand-accent text-sm text-brand-white placeholder-brand-muted focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>

          {/* Group */}
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="px-3 py-2 rounded-lg bg-brand-navy border border-brand-accent text-sm text-brand-white focus:outline-none focus:border-brand-yellow transition-colors"
          >
            <option value="">All Groups</option>
            {GROUPS.map((g) => (
              <option key={g} value={g}>Group {g}</option>
            ))}
          </select>

          {/* Stage */}
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="px-3 py-2 rounded-lg bg-brand-navy border border-brand-accent text-sm text-brand-white focus:outline-none focus:border-brand-yellow transition-colors"
          >
            <option value="">All Stages</option>
            {STAGES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {group && (
              <span className="flex items-center gap-1 text-xs font-medium bg-brand-accent text-brand-yellow px-2.5 py-1 rounded-full">
                Group {group}
                <button onClick={() => setGroup("")}><X size={10} /></button>
              </span>
            )}
            {stage && (
              <span className="flex items-center gap-1 text-xs font-medium bg-brand-accent text-brand-yellow px-2.5 py-1 rounded-full">
                {STAGES.find((s) => s.value === stage)?.label}
                <button onClick={() => setStage("")}><X size={10} /></button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-1 text-xs font-medium bg-brand-accent text-brand-yellow px-2.5 py-1 rounded-full">
                &ldquo;{search}&rdquo;
                <button onClick={() => setSearch("")}><X size={10} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────── */}
      <div className="flex rounded-xl border border-brand-accent bg-brand-blue p-1 gap-1">
        {(["upcoming", "completed"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-brand-yellow text-brand-navy"
                : "text-brand-muted hover:text-brand-white"
            }`}
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t === "upcoming" ? (
              <><Radio size={14} /> Upcoming</>
            ) : (
              <><CheckCircle size={14} /> Results</>
            )}
          </button>
        ))}
      </div>

      {/* ── Results ───────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-brand-muted">
          <p className="text-4xl mb-3">⚽</p>
          <p className="text-sm">No matches found for the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => {
            const label = new Date(date).toLocaleDateString("en-GB", {
              weekday: "long",
              day:     "numeric",
              month:   "long",
              year:    "numeric",
            });
            return (
              <div key={date}>
                {/* Date group header */}
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={14} className="text-brand-yellow shrink-0" />
                  <span
                    className="text-sm font-bold text-brand-yellow uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-brand-accent" />
                  <span className="text-xs text-brand-muted">
                    {byDate[date].length} match{byDate[date].length > 1 ? "es" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {byDate[date].map((f) => (
                    <MatchCard key={f.id} fixture={f} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Result count */}
      <p className="text-xs text-brand-muted text-center pb-4">
        Showing {filtered.length} match{filtered.length !== 1 ? "es" : ""}
        {hasFilters ? " (filtered)" : ""}
      </p>
    </div>
  );
}
