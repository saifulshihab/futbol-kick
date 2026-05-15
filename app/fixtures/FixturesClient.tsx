"use client";

import MatchCard from "@/components/MatchCard";
import { Fixture, getTeamById } from "@/lib/data";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Filter,
  Radio,
  Search,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab = "upcoming" | "completed";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const STAGES = [
  { value: "group", label: "Group Stage" },
  { value: "round-of-32", label: "Round of 32" },
  { value: "round-of-16", label: "Round of 16" },
  { value: "quarter-final", label: "Quarter-Final" },
  { value: "semi-final", label: "Semi-Final" },
  { value: "third-place", label: "Third-Place Play-off" },
  { value: "final", label: "Final" }
];

function CustomSelect({
  value,
  onChange,
  options,
  placeholder
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`bg-brand-navy border-brand-accent text-brand-white flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${open ? "border-brand-lime" : "hover:border-brand-lime"}`}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          size={14}
          className={`text-brand-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="border-brand-accent bg-brand-navy absolute top-full left-0 z-50 mt-1 w-full overflow-auto rounded-lg border"
          style={{ maxHeight: 500 }}
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`text-brand-muted hover:bg-brand-accent hover:text-brand-white w-full px-3 py-2 text-left text-sm transition-colors ${value === "" ? "text-brand-lime" : ""}`}
          >
            {placeholder}
          </button>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`hover:bg-brand-accent w-full px-3 py-2 text-left text-sm transition-colors ${value === o.value ? "text-brand-lime bg-brand-accent" : "text-brand-white hover:text-brand-lime"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  fixtures: Fixture[];
}

export default function FixturesClient({ fixtures }: Props) {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [group, setGroup] = useState("");
  const [stage, setStage] = useState("");
  const [search, setSearch] = useState("");

  const hasFilters = group || stage || search;

  const filtered = useMemo(() => {
    return fixtures
      .filter((f) =>
        tab === "upcoming"
          ? f.status === "upcoming" || f.status === "live"
          : f.status === "completed"
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
    tab === "completed" ? b.localeCompare(a) : a.localeCompare(b)
  );

  function clearFilters() {
    setGroup("");
    setStage("");
    setSearch("");
  }

  return (
    <div className="space-y-6">
      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="border-brand-accent bg-brand-blue space-y-4 rounded-xl border p-4">
        <div className="mb-2 flex items-center gap-2">
          <Filter size={15} className="text-brand-lime" />
          <span
            className="text-brand-white text-sm font-bold tracking-wide uppercase"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Filter Matches
          </span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-brand-red ml-auto flex items-center gap-1 text-xs transition-colors hover:text-red-400"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Search */}
          <div className="relative sm:col-span-1">
            <Search
              size={14}
              className="text-brand-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Team, city, venue…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-brand-navy border-brand-accent text-brand-white placeholder-brand-muted focus:border-brand-lime w-full rounded-lg border py-2 pr-3 pl-9 text-sm transition-colors focus:outline-none"
            />
          </div>

          {/* Group */}
          <CustomSelect
            value={group}
            onChange={setGroup}
            placeholder="All Groups"
            options={GROUPS.map((g) => ({ value: g, label: `Group ${g}` }))}
          />

          {/* Stage */}
          <CustomSelect
            value={stage}
            onChange={setStage}
            placeholder="All Stages"
            options={STAGES}
          />
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {group && (
              <span className="bg-brand-accent text-brand-lime flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
                Group {group}
                <button onClick={() => setGroup("")}>
                  <X size={10} />
                </button>
              </span>
            )}
            {stage && (
              <span className="bg-brand-accent text-brand-lime flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
                {STAGES.find((s) => s.value === stage)?.label}
                <button onClick={() => setStage("")}>
                  <X size={10} />
                </button>
              </span>
            )}
            {search && (
              <span className="bg-brand-accent text-brand-lime flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
                &ldquo;{search}&rdquo;
                <button onClick={() => setSearch("")}>
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────── */}
      <div className="border-brand-accent bg-brand-blue flex gap-1 rounded-xl border p-1">
        {(["upcoming", "completed"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-brand-lime text-brand-navy"
                : "text-brand-muted hover:text-brand-white"
            }`}
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t === "upcoming" ? (
              <>
                <Radio size={14} /> Upcoming
              </>
            ) : (
              <>
                <CheckCircle size={14} /> Results
              </>
            )}
          </button>
        ))}
      </div>

      {/* ── Results ───────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-brand-muted py-16 text-center">
          <p className="mb-3 text-4xl">⚽</p>
          <p className="text-sm">No matches found for the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => {
            const label = new Date(date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            });
            return (
              <div key={date}>
                {/* Date group header */}
                <div className="mb-3 flex items-center gap-3">
                  <Calendar size={14} className="text-brand-lime shrink-0" />
                  <span
                    className="text-brand-lime text-sm font-bold tracking-wide uppercase"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {label}
                  </span>
                  <div className="bg-brand-accent h-px flex-1" />
                  <span className="text-brand-muted text-xs">
                    {byDate[date].length} match
                    {byDate[date].length > 1 ? "es" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
      <p className="text-brand-muted pb-4 text-center text-xs">
        Showing {filtered.length} match{filtered.length !== 1 ? "es" : ""}
        {hasFilters ? " (filtered)" : ""}
      </p>
    </div>
  );
}
