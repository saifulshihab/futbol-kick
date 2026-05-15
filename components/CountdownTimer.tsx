"use client";

import { useEffect, useState } from "react";

// Opening match: Mexico vs South Africa, June 11 2026 15:00 UTC
const OPENING = new Date("2026-06-11T15:00:00Z");

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
    <div className="flex items-center gap-4 sm:gap-6">
      <Pad n={time.days} label="Days" />
      <span className="text-brand-lime mb-4 text-2xl font-bold">:</span>
      <Pad n={time.hours} label="Hours" />
      <span className="text-brand-lime mb-4 text-2xl font-bold">:</span>
      <Pad n={time.minutes} label="Minutes" />
      <span className="text-brand-lime mb-4 text-2xl font-bold">:</span>
      <Pad n={time.seconds} label="Seconds" />
    </div>
  );
}
