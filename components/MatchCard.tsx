import FlagImg from "@/components/FlagImg";
import { Fixture, getTeamById } from "@/lib/data";
import { Clock, MapPin, Shield } from "lucide-react";
import Link from "next/link";

interface MatchCardProps {
  fixture: Fixture;
  compact?: boolean;
}

function TbdFlag({ size }: { size: "sm" | "md" }) {
  const px = size === "sm" ? 32 : 40;
  return (
    <div
      className="border-brand-accent bg-brand-navy flex items-center justify-center rounded-full border"
      style={{ width: px, height: px }}
    >
      <Shield size={px * 0.5} className="text-brand-muted" />
    </div>
  );
}

export default function MatchCard({
  fixture,
  compact = false
}: MatchCardProps) {
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);

  const isLive = fixture.status === "live";
  const isCompleted = fixture.status === "completed";

  const [y, mo, d] = fixture.date.split("-").map(Number);
  const dateLabel = new Date(y, mo - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });

  return (
    <Link
      href={`/matches/${fixture.id}`}
      className={`border-brand-accent bg-brand-blue hover:border-brand-lime group block rounded-xl border transition-colors ${compact ? "p-3" : "p-4"}`}
    >
      {/* Stage / Group badge + live indicator */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-brand-muted text-[10px] font-semibold tracking-widest uppercase">
          {fixture.group
            ? `Group ${fixture.group}`
            : fixture.stage.replace(/-/g, " ")}
        </span>
        {isLive && (
          <span className="text-brand-navy bg-brand-red flex animate-pulse items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold">
            <span className="h-1 w-1 rounded-full bg-white" />
            LIVE {fixture.liveMinute}&apos;
          </span>
        )}
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-2">
        {/* Home */}
        <div className="flex flex-1 flex-col items-center gap-1">
          {home ? (
            <FlagImg code={home.flag} size="sm" />
          ) : (
            <TbdFlag size="sm" />
          )}
          <span
            className={`text-brand-white group-hover:text-brand-lime text-center font-semibold transition-colors ${compact ? "text-xs" : "text-sm"}`}
          >
            {home?.shortName ?? "TBD"}
          </span>
        </div>

        {/* Score / VS */}
        <div className="flex min-w-[64px] flex-col items-center">
          {isCompleted || isLive ? (
            <span
              className="text-brand-white text-xl font-bold sm:text-2xl"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {fixture.homeScore} – {fixture.awayScore}
            </span>
          ) : (
            <>
              <span
                className="text-brand-lime text-base font-bold"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                VS
              </span>
              <span className="text-brand-muted mt-0.5 text-xs">{fixture.time}</span>
            </>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-1 flex-col items-center gap-1">
          {away ? (
            <FlagImg code={away.flag} size="sm" />
          ) : (
            <TbdFlag size="sm" />
          )}
          <span
            className={`text-brand-white group-hover:text-brand-lime text-center font-semibold transition-colors ${compact ? "text-xs" : "text-sm"}`}
          >
            {away?.shortName ?? "TBD"}
          </span>
        </div>
      </div>

      {/* Meta */}
      {!compact && (
        <div className="text-brand-muted mt-3 flex items-center justify-center gap-3 text-[11px]">
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
