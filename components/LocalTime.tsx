import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

interface LocalTimeProps {
  date: string;
  time: string;
  className?: string;
}

export default function LocalTime({ date, time, className }: LocalTimeProps) {
  const local = dayjs.tz(`${date}T${time}`, "America/New_York").local();
  const display = local.format("HH:mm");
  return <span className={className}>{display}</span>;
}
