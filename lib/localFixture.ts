import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { Fixture } from "./data";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ_MAP: Record<string, string> = {
  ET: "America/New_York",
  "ET-1": "America/Chicago",
  "ET-2": "America/Denver",
  "ET-3": "America/Los_Angeles"
};

export function toLocalFixture(f: Fixture): Fixture {
  const local = dayjs.tz(`${f.date}T${f.time}`, TZ_MAP[f.timezone]).local();
  return {
    ...f,
    date: local.format("YYYY-MM-DD"),
    time: local.format("HH:mm")
  };
}

export function toLocalFixtures(fixtures: Fixture[]): Fixture[] {
  return fixtures.map(toLocalFixture);
}
