"use client";

import FlagImg from "@/components/FlagImg";
import { Team } from "@/lib/data";
import { ArrowUpDown, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type SortKey = "rank" | "name" | "group";

const GROUPS = ["A", "B", "C", "D", "E", "F"];

interface Props {
  teams: Team[];
}

export default function TeamsClient({ teams }: Props) {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
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
        if (sortKey === "rank") return a.fifaRank - b.fifaRank;
        if (sortKey === "name") return a.name.localeCompare(b.name);
        if (sortKey === "group")
          return a.group.localeCompare(b.group) || a.fifaRank - b.fifaRank;
        return 0;
      });
  }, [teams, search, group, sortKey]);

  const positionColors: Record<string, string> = {
    GK: "bg-brand-lime/20 text-brand-lime border-brand-lime/40",
    DEF: "bg-blue-600/20 text-blue-400 border-blue-600/40",
    MID: "bg-green-600/20 text-green-400 border-green-600/40",
    FWD: "bg-red-600/20 text-red-400 border-red-600/40"
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={14}
            className="text-brand-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search team, coach…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-brand-navy border-brand-accent text-brand-white placeholder-brand-muted focus:border-brand-lime w-full rounded-lg border py-2 pr-3 pl-9 text-sm transition-colors focus:outline-none"
          />
        </div>

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="bg-brand-navy border-brand-accent text-brand-white focus:border-brand-lime rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none"
        >
          <option value="">All Groups</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              Group {g}
            </option>
          ))}
        </select>

        <div className="bg-brand-navy border-brand-accent flex items-center gap-2 rounded-lg border px-3 py-2">
          <ArrowUpDown size={13} className="text-brand-muted shrink-0" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="text-brand-white bg-transparent text-sm focus:outline-none"
          >
            <option value="rank">By FIFA Rank</option>
            <option value="name">By Name</option>
            <option value="group">By Group</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-brand-muted text-xs">
        Showing {filtered.length} of {teams.length} teams
      </p>

      {/* Team cards grid */}
      {filtered.length === 0 ? (
        <div className="text-brand-muted py-16 text-center">
          <p className="mb-3 text-4xl">🔍</p>
          <p className="text-sm">No teams match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((team) => {
            const captain = team.players.find((p) => p.isCaptain);
            const starPlayers = team.players
              .filter((p) => !p.isCaptain)
              .slice(0, 2);

            return (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="border-brand-accent bg-brand-blue hover:border-brand-lime group overflow-hidden rounded-xl border transition-colors"
              >
                {/* Card header */}
                <div className="border-brand-accent flex items-center gap-4 border-b p-4">
                  <FlagImg code={team.flag} size="lg" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-brand-white group-hover:text-brand-lime leading-tight font-bold transition-colors"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {team.name}
                      </h3>
                      <span className="text-brand-navy bg-brand-lime shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold">
                        #{team.fifaRank}
                      </span>
                    </div>
                    <p className="text-brand-muted mt-0.5 text-xs">
                      Group {team.group} · {team.formation}
                    </p>
                    <p className="text-brand-muted truncate text-xs">
                      Coach: {team.coach}
                    </p>
                  </div>
                </div>

                {/* Key players */}
                <div className="space-y-1.5 px-4 py-3">
                  {captain && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${positionColors[captain.position]}`}
                      >
                        {captain.position}
                      </span>
                      <span className="text-brand-white flex-1 truncate text-xs">
                        {captain.name}
                      </span>
                      <span className="text-brand-lime text-[10px]">©</span>
                    </div>
                  )}
                  {starPlayers.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${positionColors[p.position]}`}
                      >
                        {p.position}
                      </span>
                      <span className="text-brand-muted flex-1 truncate text-xs">
                        {p.name}
                      </span>
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
