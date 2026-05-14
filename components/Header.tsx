import Link from "next/link";
import { Trophy } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/groups", label: "Groups" },
  { href: "/teams", label: "Teams" },
  { href: "/news", label: "News" },
  { href: "/predictions", label: "Predictions" },
  { href: "/fan-zone", label: "Fan Zone" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-blue border-b border-brand-accent shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="FutbolKick home"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-yellow">
              <Trophy size={18} className="text-brand-navy" />
            </div>
            <span
              className="text-xl font-bold text-brand-white tracking-wide"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Futbol<span className="text-brand-yellow">Kick</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded text-sm font-medium text-brand-muted hover:text-brand-yellow hover:bg-brand-accent transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Live badge + mobile menu */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-brand-red px-2.5 py-1 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-white" />
              LIVE
            </span>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
