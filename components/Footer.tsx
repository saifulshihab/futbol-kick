import { Globe, MessageCircle, Play, Share2, Trophy } from "lucide-react";
import Link from "next/link";

const tournamentLinks = [
  { href: "/groups", label: "Groups" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/groups", label: "Standings" },
  { href: "/fixtures?stage=knockout", label: "Knockout Bracket" }
];

const teamLinks = [
  { href: "/teams", label: "Teams" },
  { href: "/teams", label: "Player Profiles" },
  { href: "/news?category=Player", label: "Players to Watch" }
];

const infoLinks = [
  { href: "/news?tag=How+to+Watch", label: "How to Watch" },
  { href: "/news?tag=Timezone", label: "Timezone Guide" },
  { href: "/fan-zone", label: "FAQ" }
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/advertise", label: "Advertising Disclosure" },
  { href: "/contact", label: "Contact" }
];

const socialLinks = [
  { href: "#", icon: Globe, label: "Facebook" },
  { href: "#", icon: Share2, label: "Instagram" },
  { href: "#", icon: MessageCircle, label: "WhatsApp" },
  { href: "#", icon: Play, label: "YouTube" }
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue border-brand-accent mt-auto border-t">
      {/* Row 1 – Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-brand-lime flex h-8 w-8 items-center justify-center rounded-full">
                <Trophy size={15} className="text-brand-navy" />
              </div>
              <span
                className="text-brand-white text-lg font-bold"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Futbol<span className="text-brand-lime">Kick</span>
              </span>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed">
              Your #1 source for FIFA World Cup 2026 coverage — fixtures,
              standings, team profiles, and fan content.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="bg-brand-accent hover:bg-brand-lime hover:text-brand-navy text-brand-muted flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Tournament */}
          <div>
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Tournament
            </h3>
            <ul className="space-y-2">
              {tournamentLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-brand-muted hover:text-brand-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams & Players */}
          <div>
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Teams &amp; Players
            </h3>
            <ul className="space-y-2">
              {teamLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-brand-muted hover:text-brand-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Info */}
          <div>
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Help &amp; Info
            </h3>
            <ul className="space-y-2">
              {infoLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-brand-muted hover:text-brand-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 2 – Legal */}
      <div className="border-brand-accent border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6">
          <p className="text-brand-muted text-xs">
            © {new Date().getFullYear()} FutbolKick. Fan site — not affiliated
            with FIFA.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-brand-muted hover:text-brand-white text-xs transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
