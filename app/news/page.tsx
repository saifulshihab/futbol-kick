import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag, TrendingUp, Filter } from "lucide-react";
import { newsPosts, type NewsPost } from "@/lib/data";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "News & Analysis",
  description:
    "Latest FIFA World Cup 2026 news, match analysis, player profiles, tactics breakdowns, and fan guides.",
};

const categoryColors: Record<NewsPost["category"], string> = {
  News:     "bg-blue-600",
  Analysis: "bg-purple-600",
  Player:   "bg-brand-yellow text-brand-navy",
  Tactics:  "bg-green-700",
  Fan:      "bg-brand-red",
};

const ALL_CATEGORIES: NewsPost["category"][] = ["News", "Analysis", "Player", "Tactics", "Fan"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// ─── Featured hero card ───────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group relative rounded-2xl overflow-hidden border border-brand-accent hover:border-brand-yellow transition-colors block"
    >
      {/* Image area */}
      <div className="h-56 sm:h-72 bg-gradient-to-br from-brand-mid to-brand-accent flex items-center justify-center relative">
        <span className="text-8xl opacity-20">⚽</span>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
        <span className={`absolute top-4 left-4 text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${categoryColors[post.category]}`}>
          {post.category}
        </span>
        <span className="absolute top-4 right-4 text-[10px] font-semibold text-brand-yellow border border-brand-yellow/40 px-2 py-0.5 rounded-full">
          FEATURED
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h2
          className="text-xl sm:text-2xl font-bold text-brand-white group-hover:text-brand-yellow transition-colors leading-snug mb-2"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {post.title}
        </h2>
        <p className="text-sm text-brand-muted line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-brand-muted">
            <span className="flex items-center gap-1"><Clock size={11} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Tag size={11} />{post.tags[0]}</span>
            <span>{post.readTime} min read</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-yellow group-hover:underline">
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
      className="flex gap-4 p-4 rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group"
    >
      {/* Thumbnail placeholder */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-brand-mid to-brand-accent flex items-center justify-center shrink-0">
        <span className="text-2xl opacity-40">⚽</span>
      </div>
      <div className="flex-1 min-w-0">
        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 text-white ${categoryColors[post.category]}`}>
          {post.category}
        </span>
        <h3
          className="text-sm font-semibold text-brand-white group-hover:text-brand-yellow transition-colors leading-snug line-clamp-2 mb-1"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-brand-muted">
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
  const rest     = newsPosts.filter((p) => !p.featured);
  const trending = [...newsPosts].sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs text-brand-yellow uppercase tracking-widest mb-1">FIFA World Cup 2026</p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-brand-white"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          News &amp; Analysis
        </h1>
        <p className="text-brand-muted text-sm mt-2">
          {newsPosts.length} articles — match previews, player features, tactics, and fan guides
        </p>
      </div>

      <AdBanner size="leaderboard" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* ── Main column ─────────────────────────────────────────────── */}
        <div className="space-y-8">

          {/* Featured posts */}
          {featured.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-brand-yellow" />
                <h2
                  className="text-lg font-bold text-brand-white uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Featured
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {featured.map((post) => (
                  <FeaturedCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          <AdBanner size="inline" />

          {/* All articles */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Filter size={15} className="text-brand-yellow" />
              <h2
                className="text-lg font-bold text-brand-white uppercase tracking-wide"
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

          <AdBanner size="leaderboard" />
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="space-y-6">
          <AdBanner size="rectangle" />

          {/* Trending */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-brand-yellow" />
              <h3
                className="text-sm font-bold text-brand-yellow uppercase tracking-widest"
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
                  className="flex gap-3 py-2.5 border-b border-brand-accent last:border-0 group"
                >
                  <span
                    className="text-2xl font-bold text-brand-accent leading-none shrink-0 w-6"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-xs font-medium text-brand-white group-hover:text-brand-yellow transition-colors leading-snug">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Categories
            </h3>
            <div className="space-y-2">
              {ALL_CATEGORIES.map((cat) => {
                const count = newsPosts.filter((p) => p.category === cat).length;
                return (
                  <div
                    key={cat}
                    className="flex items-center justify-between py-2 border-b border-brand-accent last:border-0"
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${categoryColors[cat].split(" ")[0]}`} />
                      <span className="text-sm text-brand-white">{cat}</span>
                    </span>
                    <span className="text-xs text-brand-muted">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Most read */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
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
                    className="flex gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-mid flex items-center justify-center shrink-0">
                      <span className="text-lg opacity-50">⚽</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-brand-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </p>
                      <p className="text-[11px] text-brand-muted mt-0.5">{post.readTime} min read</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          <AdBanner size="rectangle" />
        </aside>
      </div>
    </div>
  );
}
