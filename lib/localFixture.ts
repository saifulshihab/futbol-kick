import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { Fixture } from "./data";

dayjs.extend(utc);
dayjs.extend(timezone);

export function toLocalFixture(f: Fixture): Fixture {
  const local = dayjs.tz(`${f.date}T${f.time}`, "America/New_York").local();
  return { ...f, date: local.format("YYYY-MM-DD"), time: local.format("HH:mm") };
}

export function toLocalFixtures(fixtures: Fixture[]): Fixture[] {
  return fixtures.map(toLocalFixture);
}
