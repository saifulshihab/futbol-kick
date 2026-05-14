import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { newsPosts, getPostBySlug, type NewsPost } from "@/lib/data";
import AdBanner from "@/components/AdBanner";
import ArticleContent from "@/components/ArticleContent";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

const categoryColors: Record<NewsPost["category"], string> = {
  News:     "bg-blue-600",
  Analysis: "bg-purple-600",
  Player:   "bg-brand-yellow text-brand-navy",
  Tactics:  "bg-green-700",
  Fan:      "bg-brand-red",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Related posts: same category or overlapping tag, excluding current
  const related = newsPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.tags.some((t) => post.tags.includes(t))),
    )
    .slice(0, 3);

  // Prev / Next navigation
  const sortedPosts = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date));
  const currentIdx  = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost    = sortedPosts[currentIdx + 1] ?? null;
  const nextPost    = sortedPosts[currentIdx - 1] ?? null;

  // Split content into sections for ad injection (after every ~3 paragraphs)
  const contentBlocks = post.content.split(/\n\n+/).filter(Boolean);
  const midpoint      = Math.floor(contentBlocks.length / 2);
  const firstHalf     = contentBlocks.slice(0, midpoint).join("\n\n");
  const secondHalf    = contentBlocks.slice(midpoint).join("\n\n");

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "FutbolKick" },
    publisher: {
      "@type": "Organization",
      name: "FutbolKick",
      url: "https://futbolkick.com",
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    url: `https://futbolkick.com/news/${post.slug}`,
  };

  return (
    <>
    <JsonLd data={articleLd} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-brand-muted mb-6">
        <Link href="/news" className="hover:text-brand-yellow transition-colors">News</Link>
        <ChevronRight size={12} />
        <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${categoryColors[post.category]}`}>
          {post.category}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* ── Article ─────────────────────────────────────────────────── */}
        <article>
          {/* Hero image */}
          <div className="h-56 sm:h-80 rounded-2xl bg-gradient-to-br from-brand-mid to-brand-accent flex items-center justify-center relative overflow-hidden mb-6">
            <span className="text-9xl opacity-10">⚽</span>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${categoryColors[post.category]}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-brand-muted">
              <Clock size={11} /> {formatDate(post.date)}
            </span>
            <span className="text-xs text-brand-muted">{post.readTime} min read</span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-4xl font-bold text-brand-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base text-brand-muted leading-relaxed border-l-4 border-brand-yellow pl-4 mb-8 italic">
            {post.excerpt}
          </p>

          {/* First half of content */}
          <ArticleContent content={firstHalf} />

          {/* Mid-article ad */}
          {/* <AdBanner size="leaderboard" className="my-8" /> */}

          {/* Second half of content */}
          <ArticleContent content={secondHalf} />

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-brand-accent">
            <Tag size={13} className="text-brand-muted" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-brand-accent text-brand-muted hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Ad after article */}
          {/* <AdBanner size="leaderboard" className="mt-8" /> */}

          {/* Prev / Next navigation */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {prevPost ? (
              <Link
                href={`/news/${prevPost.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl border border-brand-accent hover:border-brand-yellow transition-colors group"
              >
                <ArrowLeft size={16} className="text-brand-muted group-hover:text-brand-yellow transition-colors mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-brand-muted uppercase tracking-wide mb-1">Previous</p>
                  <p className="text-xs font-medium text-brand-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug">
                    {prevPost.title}
                  </p>
                </div>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                href={`/news/${nextPost.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl border border-brand-accent hover:border-brand-yellow transition-colors group text-right col-start-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-brand-muted uppercase tracking-wide mb-1">Next</p>
                  <p className="text-xs font-medium text-brand-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug">
                    {nextPost.title}
                  </p>
                </div>
                <ArrowRight size={16} className="text-brand-muted group-hover:text-brand-yellow transition-colors mt-0.5 shrink-0" />
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="space-y-6">
          {/* <AdBanner size="rectangle" /> */}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
              <h3
                className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Related Articles
              </h3>
              <div className="space-y-4">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/news/${rp.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-brand-mid flex items-center justify-center shrink-0">
                      <span className="text-xl opacity-40">⚽</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white inline-block mb-1 ${categoryColors[rp.category]}`}>
                        {rp.category}
                      </span>
                      <p className="text-xs font-medium text-brand-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug">
                        {rp.title}
                      </p>
                      <p className="text-[11px] text-brand-muted mt-1">{rp.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All posts link */}
          <div className="rounded-xl border border-brand-accent bg-brand-blue p-4">
            <h3
              className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Browse All News
            </h3>
            <div className="space-y-2">
              {newsPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 5)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/news/${p.slug}`}
                    className="flex items-start gap-2 py-2 border-b border-brand-accent last:border-0 group"
                  >
                    <span className="text-brand-yellow mt-0.5 shrink-0 text-xs">▸</span>
                    <p className="text-xs text-brand-muted group-hover:text-brand-white transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </p>
                  </Link>
                ))}
              <Link
                href="/news"
                className="flex items-center gap-1 text-xs font-semibold text-brand-yellow hover:underline pt-1"
              >
                View all articles <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* <AdBanner size="rectangle" /> */}
        </aside>
      </div>
    </div>
    </>
  );
}
