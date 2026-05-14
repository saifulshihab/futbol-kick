"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/groups", label: "Groups" },
  { href: "/teams", label: "Teams" },
  { href: "/news", label: "News" },
  { href: "/predictions", label: "Predictions" },
  { href: "/fan-zone", label: "Fan Zone" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="md:hidden p-2 rounded text-brand-white hover:text-brand-yellow transition-colors"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-blue border-t border-brand-accent z-50">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-brand-white hover:text-brand-yellow hover:bg-brand-accent transition-colors font-medium"
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
