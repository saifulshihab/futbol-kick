import { teams } from "@/lib/data";
import Image from "next/image";

export default function TeamMarquee() {
  const items = teams.map((t) => ({ name: t.shortName, flag: t.flag, group: t.group }));

  return (
    <div
      className="border-brand-accent/50 border-y py-3"
      style={{ background: "linear-gradient(90deg, #060e1e 0%, #0d2137 50%, #060e1e 100%)" }}
    >
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)"
        }}
      >
        <div className="marquee-track">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2 px-4">
              <Image
                src={`https://flagcdn.com/w40/${item.flag}.png`}
                alt={item.name}
                width={24}
                height={18}
                className="rounded-[2px] object-cover"
              />
              <span
                className="text-brand-white/85 text-[13px] font-medium whitespace-nowrap"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.name}
              </span>
              <span className="text-brand-lime/40 ml-2 text-[8px]">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
