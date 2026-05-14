"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpDown } from "lucide-react";
import { Team } from "@/lib/data";

type SortKey = "rank" | "name" | "group";

const GROUPS = ["A", "B", "C", "D", "E", "F"];

interface Props {
  teams: Team[];
}

export default function TeamsClient({ teams }: Props) {
  const [search,  setSearch]  = useState("");
  const [group,   setGroup]   = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");

  const filtered = useMemo(() => {
    return teams
      .filter((t) => (group ? t.group === group : true))
      .filter((t) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortName.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.coach.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortKey === "rank")  return a.fifaRank - b.fifaRank;
        if (sortKey === "name")  return a.name.localeCompare(b.name);
        if (sortKey === "group") return a.group.localeCompare(b.group) || a.fifaRank - b.fifaRank;
        return 0;
      });
  }, [teams, search, group, sortKey]);

  const positionColors: Record<string, string> = {
    GK:  "bg-yellow-600/20 text-yellow-400 border-yellow-600/40",
    DEF: "bg-blue-600/20 text-blue-400 border-blue-600/40",
    MID: "bg-green-600/20 text-green-400 border-green-600/40",
    FWD: "bg-red-600/20 text-red-400 border-red-600/40",
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search team, coach…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-brand-navy border border-brand-accent text-sm text-brand-white placeholder-brand-muted focus:outline-none focus:border-brand-yellow transition-colors"
          />
        </div>

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="px-3 py-2 rounded-lg bg-brand-navy border border-brand-accent text-sm text-brand-white focus:outline-none focus:border-brand-yellow transition-colors"
        >
          <option value="">All Groups</option>
          {GROUPS.map((g) => <option key={g} value={g}>Group {g}</option>)}
        </select>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-navy border border-brand-accent">
          <ArrowUpDown size={13} className="text-brand-muted shrink-0" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="bg-transparent text-sm text-brand-white focus:outline-none"
          >
            <option value="rank">By FIFA Rank</option>
            <option value="name">By Name</option>
            <option value="group">By Group</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-brand-muted">
        Showing {filtered.length} of {teams.length} teams
      </p>

      {/* Team cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-brand-muted">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">No teams match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((team) => {
            const captain = team.players.find((p) => p.isCaptain);
            const starPlayers = team.players.filter((p) => !p.isCaptain).slice(0, 2);

            return (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-4 p-4 border-b border-brand-accent">
                  <span className="text-5xl shrink-0">{team.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-bold text-brand-white group-hover:text-brand-yellow transition-colors leading-tight"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {team.name}
                      </h3>
                      <span className="text-[10px] font-bold text-brand-navy bg-brand-yellow px-1.5 py-0.5 rounded shrink-0">
                        #{team.fifaRank}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Group {team.group} · {team.formation}
                    </p>
                    <p className="text-xs text-brand-muted truncate">
                      Coach: {team.coach}
                    </p>
                  </div>
                </div>

                {/* Key players */}
                <div className="px-4 py-3 space-y-1.5">
                  {captain && (
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${positionColors[captain.position]}`}>
                        {captain.position}
                      </span>
                      <span className="text-xs text-brand-white truncate flex-1">{captain.name}</span>
                      <span className="text-[10px] text-brand-yellow">©</span>
                    </div>
                  )}
                  {starPlayers.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${positionColors[p.position]}`}>
                        {p.position}
                      </span>
                      <span className="text-xs text-brand-muted truncate flex-1">{p.name}</span>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
