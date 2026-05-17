"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { TZ_MAP } from "@/lib/localFixture";

dayjs.extend(utc);
dayjs.extend(timezone);

type Format = "time" | "date-short" | "date-long" | "datetime";

interface LocalTimeProps {
  date: string;
  time: string;
  timezone?: string;
  format?: Format;
  className?: string;
}

export default function LocalTime({
  date,
  time,
  timezone: tz = "ET",
  format = "time",
  className
}: LocalTimeProps) {
  const local = dayjs.tz(`${date}T${time}`, TZ_MAP[tz] ?? "America/New_York").local();
  const [y, mo, d] = local.format("YYYY-MM-DD").split("-").map(Number);
  const localDate = new Date(y, mo - 1, d);

  let display = "";
  const timeStr = local.format("h:mm A");
  if (format === "time") {
    display = timeStr;
  } else if (format === "date-short") {
    display = localDate.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });
  } else if (format === "date-long") {
    display = localDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } else {
    display = `${localDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })} · ${timeStr}`;
  }

  return (
    <span className={className} suppressHydrationWarning>
      {display}
    </span>
  );
}
