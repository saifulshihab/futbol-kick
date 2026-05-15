import { WEBSITE_BASE_URL } from "@/lib/config";
import { newsPosts, type NewsPost } from "@/lib/data";
import { ArrowRight, Clock, Filter, Tag, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 News & Match Analysis",
  description:
    "Latest FIFA World Cup 2026 news, match analysis, player profiles, tactics breakdowns, and fan guides.",
  keywords: [
    "FIFA World Cup 2026 news",
    "World Cup 2026 match analysis",
    "World Cup 2026 player profiles",
    "football tactics 2026",
    "World Cup 2026 fan guide",
    "latest football news 2026",
    "FIFA 2026 match preview"
  ],
  alternates: { canonical: `${WEBSITE_BASE_URL}/news` },
  openGraph: {
    title: "FIFA World Cup 2026 News & Match Analysis",
    description:
      "Breaking news, deep-dive analysis, player spotlights, and tactical breakdowns for FIFA World Cup 2026.",
    url: `${WEBSITE_BASE_URL}/news`,
    type: "website",
    siteName: "FutbolKick"
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026 News & Match Analysis",
    description:
      "Breaking news, analysis, and tactical breakdowns for FIFA World Cup 2026."
  }
};

const categoryColors: Record<NewsPost["category"], string> = {
  News: "bg-blue-600",
  Analysis: "bg-purple-600",
  Player: "bg-brand-lime text-brand-navy",
  Tactics: "bg-green-700",
  Fan: "bg-brand-red"
};

const ALL_CATEGORIES: NewsPost["category"][] = [
  "News",
  "Analysis",
  "Player",
  "Tactics",
  "Fan"
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ─── Featured hero card ───────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group border-brand-accent hover:border-brand-lime relative block overflow-hidden rounded-2xl border transition-colors"
    >
      {/* Image area */}
      <div className="from-brand-mid to-brand-accent relative flex h-56 items-center justify-center bg-gradient-to-br sm:h-72">
        <span className="text-8xl opacity-20">⚽</span>
        <div className="from-brand-navy/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        <span
          className={`absolute top-4 left-4 rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${categoryColors[post.category]}`}
        >
          {post.category}
        </span>
        <span className="text-brand-lime border-brand-lime/40 absolute top-4 right-4 rounded-full border px-2 py-0.5 text-[10px] font-semibold">
          FEATURED
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h2
          className="text-brand-white group-hover:text-brand-lime mb-2 text-xl leading-snug font-bold transition-colors sm:text-2xl"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {post.title}
        </h2>
        <p className="text-brand-muted mb-4 line-clamp-2 text-sm">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-brand-muted flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Tag size={11} />
              {post.tags[0]}
            </span>
            <span>{post.readTime} min read</span>
          </div>
          <span className="text-brand-lime flex items-center gap-1 text-xs font-semibold group-hover:underline">
            Read more <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Compact list card ────────────────────────────────────────────────────────
function ListCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="border-brand-accent bg-brand-blue hover:border-brand-lime group flex gap-4 rounded-xl border p-4 transition-colors"
    >
      {/* Thumbnail placeholder */}
      <div className="from-brand-mid to-brand-accent flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br sm:h-24 sm:w-24">
        <span className="text-2xl opacity-40">⚽</span>
      </div>
      <div className="min-w-0 flex-1">
        <span
          className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${categoryColors[post.category]}`}
        >
          {post.category}
        </span>
        <h3
          className="text-brand-white group-hover:text-brand-lime mb-1 line-clamp-2 text-sm leading-snug font-semibold transition-colors"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {post.title}
        </h3>
        <div className="text-brand-muted flex items-center gap-2 text-[11px]">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const featured = newsPosts.filter((p) => p.featured);
  const rest = newsPosts.filter((p) => !p.featured);
  const trending = [...newsPosts].sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-brand-lime mb-1 text-xs tracking-widest uppercase">
          FIFA World Cup 2026
        </p>
        <h1
          className="text-brand-white text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          News &amp; Analysis
        </h1>
        <p className="text-brand-muted mt-2 text-sm">
          {newsPosts.length} articles — match previews, player features,
          tactics, and fan guides
        </p>
      </div>

      {/* <AdBanner size="leaderboard" className="mb-8" /> */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* ── Main column ─────────────────────────────────────────────── */}
        <div className="space-y-8">
          {/* Featured posts */}
          {featured.length > 0 && (
            <section>
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-brand-lime" />
                <h2
                  className="text-brand-white text-lg font-bold tracking-wide uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Featured
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {featured.map((post) => (
                  <FeaturedCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* <AdBanner size="inline" /> */}

          {/* All articles */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Filter size={15} className="text-brand-lime" />
              <h2
                className="text-brand-white text-lg font-bold tracking-wide uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                All Articles
              </h2>
            </div>
            <div className="space-y-3">
              {newsPosts.map((post) => (
                <ListCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* <AdBanner size="leaderboard" /> */}
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="space-y-6">
          {/* <AdBanner size="rectangle" /> */}

          {/* Trending */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-brand-lime" />
              <h3
                className="text-brand-lime text-sm font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Trending Today
              </h3>
            </div>
            <div className="space-y-1">
              {newsPosts.slice(0, 5).map((post, i) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="border-brand-accent group flex gap-3 border-b py-2.5 last:border-0"
                >
                  <span
                    className="text-brand-accent w-6 shrink-0 text-2xl leading-none font-bold"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-brand-white group-hover:text-brand-lime text-xs leading-snug font-medium transition-colors">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Categories
            </h3>
            <div className="space-y-2">
              {ALL_CATEGORIES.map((cat) => {
                const count = newsPosts.filter(
                  (p) => p.category === cat
                ).length;
                return (
                  <div
                    key={cat}
                    className="border-brand-accent flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${categoryColors[cat].split(" ")[0]}`}
                      />
                      <span className="text-brand-white text-sm">{cat}</span>
                    </span>
                    <span className="text-brand-muted text-xs">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Most read */}
          <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
            <h3
              className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Most Read
            </h3>
            <div className="space-y-3">
              {[...newsPosts]
                .sort((a, b) => b.readTime - a.readTime)
                .slice(0, 4)
                .map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group flex gap-3"
                  >
                    <div className="bg-brand-mid flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <span className="text-lg opacity-50">⚽</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-brand-white group-hover:text-brand-lime line-clamp-2 text-xs leading-snug font-medium transition-colors">
                        {post.title}
                      </p>
                      <p className="text-brand-muted mt-0.5 text-[11px]">
                        {post.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* <AdBanner size="rectangle" /> */}
        </aside>
      </div>
    </div>
  );
}
