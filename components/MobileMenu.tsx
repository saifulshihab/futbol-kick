"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
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

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="text-brand-white hover:text-brand-lime rounded p-2 transition-colors md:hidden"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="bg-brand-blue border-brand-accent absolute top-full right-0 left-0 z-50 border-t md:hidden">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-brand-white hover:text-brand-lime hover:bg-brand-accent px-6 py-3 font-medium transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
