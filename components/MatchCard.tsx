import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Fixture, getTeamById } from "@/lib/data";

interface MatchCardProps {
  fixture: Fixture;
  compact?: boolean;
}

export default function MatchCard({ fixture, compact = false }: MatchCardProps) {
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  if (!home || !away) return null;

  const isLive      = fixture.status === "live";
  const isCompleted = fixture.status === "completed";

  const dateLabel = new Date(fixture.date).toLocaleDateString("en-GB", {
    weekday: "short",
    day:     "numeric",
    month:   "short",
  });

  return (
    <Link
      href={`/matches/${fixture.id}`}
      className={`block rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group ${compact ? "p-3" : "p-4"}`}
    >
      {/* Stage / Group badge + live indicator */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest">
          {fixture.group ? `Group ${fixture.group} · MD${fixture.matchday}` : fixture.stage.replace(/-/g, " ")}
        </span>
        {isLive && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-navy bg-brand-red px-2 py-0.5 rounded-full animate-pulse">
            <span className="w-1 h-1 rounded-full bg-white" />
            LIVE {fixture.liveMinute}&apos;
          </span>
        )}
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-2">
        {/* Home */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-2xl">{home.flag}</span>
          <span className={`text-center font-semibold text-brand-white group-hover:text-brand-yellow transition-colors ${compact ? "text-xs" : "text-sm"}`}>
            {home.shortName}
          </span>
        </div>

        {/* Score / VS */}
        <div className="flex flex-col items-center min-w-[64px]">
          {isCompleted || isLive ? (
            <span
              className="text-xl sm:text-2xl font-bold text-brand-white"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {fixture.homeScore} – {fixture.awayScore}
            </span>
          ) : (
            <>
              <span
                className="text-base font-bold text-brand-yellow"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                VS
              </span>
              <span className="text-xs text-brand-muted mt-0.5">{fixture.time}</span>
            </>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-2xl">{away.flag}</span>
          <span className={`text-center font-semibold text-brand-white group-hover:text-brand-yellow transition-colors ${compact ? "text-xs" : "text-sm"}`}>
            {away.shortName}
          </span>
        </div>
      </div>

      {/* Meta */}
      {!compact && (
        <div className="flex items-center justify-center gap-3 mt-3 text-[11px] text-brand-muted">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {dateLabel}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {fixture.city}
          </span>
        </div>
      )}
    </Link>
  );
}
