"use client";

import { fixtures } from "@/lib/data";
import { TZ_MAP } from "@/lib/localFixture";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

const opening = fixtures.find((f) => f.matchNumber === 1)!;
// UTC Date used for the countdown diff — correct regardless of timezone
const OPENING = dayjs
  .tz(`${opening.date}T${opening.time}`, TZ_MAP[opening.timezone])
  .toDate();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calc(): TimeLeft {
  const diff = OPENING.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000)
  };
}

function Pad({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-brand-lime text-3xl font-bold tabular-nums sm:text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {String(n).padStart(2, "0")}
      </span>
      <span className="text-brand-muted mt-1 text-[10px] tracking-widest uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(calc());

  // Computed in render so .local() resolves to the user's browser timezone,
  // same pattern as LocalTime.tsx. suppressHydrationWarning handles the
  // server/client timezone mismatch.
  const localKickoff = dayjs
    .tz(`${opening.date}T${opening.time}`, TZ_MAP[opening.timezone])
    .local()
    .format("ddd, MMM D, YYYY · h:mm A");

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
  }, []);

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <p
        className="text-brand-lime text-xl font-bold"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        THE TOURNAMENT IS LIVE!
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4 sm:gap-6">
        <Pad n={time.days} label="Days" />
        <span className="text-brand-lime mb-4 text-2xl font-bold">:</span>
        <Pad n={time.hours} label="Hours" />
        <span className="text-brand-lime mb-4 text-2xl font-bold">:</span>
        <Pad n={time.minutes} label="Minutes" />
        <span className="text-brand-lime mb-4 text-2xl font-bold">:</span>
        <Pad n={time.seconds} label="Seconds" />
      </div>
      <span className="text-brand-muted text-xs" suppressHydrationWarning>
        Opening match · {localKickoff}
      </span>
    </div>
  );
}
