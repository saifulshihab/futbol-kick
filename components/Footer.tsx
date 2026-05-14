import Link from "next/link";
import { Trophy, Globe, Share2, MessageCircle, Play } from "lucide-react";

const tournamentLinks = [
  { href: "/groups", label: "Groups" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/groups", label: "Standings" },
  { href: "/fixtures?stage=knockout", label: "Knockout Bracket" },
];

const teamLinks = [
  { href: "/teams", label: "Teams" },
  { href: "/teams", label: "Player Profiles" },
  { href: "/news?category=Player", label: "Players to Watch" },
];

const infoLinks = [
  { href: "/news?tag=How+to+Watch", label: "How to Watch" },
  { href: "/news?tag=Timezone", label: "Timezone Guide" },
  { href: "/fan-zone", label: "FAQ" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/advertise", label: "Advertising Disclosure" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", icon: Globe, label: "Facebook" },
  { href: "#", icon: Share2, label: "Instagram" },
  { href: "#", icon: MessageCircle, label: "WhatsApp" },
  { href: "#", icon: Play, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue border-t border-brand-accent mt-auto">
      {/* Row 1 – Link columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-yellow">
                <Trophy size={15} className="text-brand-navy" />
              </div>
              <span
                className="text-lg font-bold text-brand-white"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Futbol<span className="text-brand-yellow">Kick</span>
              </span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              Your #1 source for FIFA World Cup 2026 coverage — fixtures,
              standings, team profiles, and fan content.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent hover:bg-brand-yellow hover:text-brand-navy text-brand-muted transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Tournament */}
          <div>
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Tournament
            </h3>
            <ul className="space-y-2">
              {tournamentLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-muted hover:text-brand-white transition-colors"
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
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Teams &amp; Players
            </h3>
            <ul className="space-y-2">
              {teamLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-muted hover:text-brand-white transition-colors"
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
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Help &amp; Info
            </h3>
            <ul className="space-y-2">
              {infoLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-muted hover:text-brand-white transition-colors"
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
      <div className="border-t border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} FutbolKick. Fan site — not affiliated with FIFA.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-brand-muted hover:text-brand-white transition-colors"
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
