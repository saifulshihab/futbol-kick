"use client";

import { Menu, Trophy, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
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
                  className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-brand-accent text-brand-lime"
                      : "text-brand-muted hover:text-brand-lime hover:bg-brand-accent"
                  }`}
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="text-brand-muted hover:text-brand-lime md:hidden"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              {drawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        className={`bg-brand-blue border-brand-accent fixed top-16 right-0 z-40 flex h-[calc(100dvh-4rem)] w-72 flex-col gap-1 overflow-y-auto border-l p-4 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setDrawerOpen(false)}
            className={`rounded px-4 py-3 text-base font-medium transition-colors ${
              pathname === link.href
                ? "bg-brand-accent text-brand-lime"
                : "text-brand-muted hover:text-brand-lime hover:bg-brand-accent"
            }`}
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
