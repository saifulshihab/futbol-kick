import { Trophy } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/groups", label: "Groups" },
  { href: "/teams", label: "Teams" },
  { href: "/news", label: "News" },
  { href: "/predictions", label: "Predictions" },
  { href: "/fan-zone", label: "Fan Zone" }
];

export default function Header() {
  return (
    <header className="bg-brand-blue border-brand-accent sticky top-0 z-40 border-b shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="FutbolKick home"
          >
            <div className="bg-brand-lime flex h-9 w-9 items-center justify-center rounded-full">
              <Trophy size={18} className="text-brand-navy" />
            </div>
            <span
              className="text-brand-white text-xl font-bold tracking-wide"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Futbol<span className="text-brand-lime">Kick</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-muted hover:text-brand-lime hover:bg-brand-accent rounded px-3 py-2 text-sm font-medium transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Live badge + mobile menu */}
          <div className="flex items-center gap-3">
            <span className="text-brand-navy bg-brand-red hidden animate-pulse items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold sm:flex">
              <span className="bg-brand-white h-1.5 w-1.5 rounded-full" />
              LIVE
            </span>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
