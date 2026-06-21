import { ArrowRight, Calendar, Home, Newspaper } from "lucide-react";
import Link from "next/link";

const SUGGESTIONS = [
  { href: "/fixtures", icon: Calendar, label: "Fixtures" },
  { href: "/news", icon: Newspaper, label: "Latest News" },
  { href: "/teams", icon: ArrowRight, label: "Teams" }
];

export default function NotFound() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #1a3a5c 70%, #0a1628 100%)"
      }}
    >
      {/* Decorative circles */}
      <div className="bg-brand-lime/5 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full" />
      <div className="bg-brand-red/5 pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <span className="text-brand-lime border-brand-lime/40 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase">
          Error 404
        </span>

        <h1
          className="text-brand-white mb-4 text-7xl leading-none font-bold sm:text-8xl md:text-9xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          4<span className="text-brand-lime">0</span>4
        </h1>

        <h2
          className="text-brand-white mb-4 text-2xl font-bold sm:text-3xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Off the Pitch
        </h2>

        <p
          className="text-brand-muted mx-auto mb-10 max-w-md text-base sm:text-lg"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          The page you&apos;re looking for has gone out of bounds. Let&apos;s get
          you back in the game.
        </p>

        <Link
          href="/"
          className="bg-brand-lime text-brand-navy hover:bg-brand-lime/80 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <Home size={16} /> Back to Home
        </Link>

        {/* Suggested links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {SUGGESTIONS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="border-brand-white/30 text-brand-white hover:border-brand-lime hover:text-brand-lime inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <Icon size={14} /> {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
