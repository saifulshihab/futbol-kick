import ArticleContent from "@/components/ArticleContent";
import JsonLd from "@/components/JsonLd";
import { getPostBySlug, newsPosts, type NewsPost } from "@/lib/data";
import { ArrowLeft, ArrowRight, ChevronRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
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
      type: "article"
    }
  };
}

const categoryColors: Record<NewsPost["category"], string> = {
  News: "bg-blue-600",
  Analysis: "bg-purple-600",
  Player: "bg-brand-lime text-brand-navy",
  Tactics: "bg-green-700",
  Fan: "bg-brand-red"
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default async function ArticlePage({
  params
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
        (p.category === post.category ||
          p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  // Prev / Next navigation
  const sortedPosts = [...newsPosts].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  const currentIdx = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = sortedPosts[currentIdx + 1] ?? null;
  const nextPost = sortedPosts[currentIdx - 1] ?? null;

  // Split content into sections for ad injection (after every ~3 paragraphs)
  const contentBlocks = post.content.split(/\n\n+/).filter(Boolean);
  const midpoint = Math.floor(contentBlocks.length / 2);
  const firstHalf = contentBlocks.slice(0, midpoint).join("\n\n");
  const secondHalf = contentBlocks.slice(midpoint).join("\n\n");

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
      url: "https://futbolkick.com"
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    url: `https://futbolkick.com/news/${post.slug}`
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-brand-muted mb-6 flex items-center gap-1 text-xs">
          <Link
            href="/news"
            className="hover:text-brand-lime transition-colors"
          >
            News
          </Link>
          <ChevronRight size={12} />
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${categoryColors[post.category]}`}
          >
            {post.category}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* ── Article ─────────────────────────────────────────────────── */}
          <article>
            {/* Hero image */}
            <div className="from-brand-mid to-brand-accent relative mb-6 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br sm:h-80">
              <span className="text-9xl opacity-10">⚽</span>
              <div className="from-brand-navy/60 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>

            {/* Meta */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${categoryColors[post.category]}`}
              >
                {post.category}
              </span>
              <span className="text-brand-muted flex items-center gap-1 text-xs">
                <Clock size={11} /> {formatDate(post.date)}
              </span>
              <span className="text-brand-muted text-xs">
                {post.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-brand-white mb-4 text-2xl leading-tight font-bold sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-brand-muted border-brand-lime mb-8 border-l-4 pl-4 text-base leading-relaxed italic">
              {post.excerpt}
            </p>

            {/* First half of content */}
            <ArticleContent content={firstHalf} />

            {/* Mid-article ad */}
            {/* <AdBanner size="leaderboard" className="my-8" /> */}

            {/* Second half of content */}
            <ArticleContent content={secondHalf} />

            {/* Tags */}
            <div className="border-brand-accent mt-8 flex flex-wrap items-center gap-2 border-t pt-6">
              <Tag size={13} className="text-brand-muted" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-brand-accent text-brand-muted hover:border-brand-lime hover:text-brand-lime rounded-full border px-2.5 py-1 text-xs transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Ad after article */}
            {/* <AdBanner size="leaderboard" className="mt-8" /> */}

            {/* Prev / Next navigation */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/news/${prevPost.slug}`}
                  className="border-brand-accent hover:border-brand-lime group flex items-start gap-3 rounded-xl border p-4 transition-colors"
                >
                  <ArrowLeft
                    size={16}
                    className="text-brand-muted group-hover:text-brand-lime mt-0.5 shrink-0 transition-colors"
                  />
                  <div className="min-w-0">
                    <p className="text-brand-muted mb-1 text-[10px] tracking-wide uppercase">
                      Previous
                    </p>
                    <p className="text-brand-white group-hover:text-brand-lime line-clamp-2 text-xs leading-snug font-medium transition-colors">
                      {prevPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/news/${nextPost.slug}`}
                  className="border-brand-accent hover:border-brand-lime group col-start-2 flex items-start gap-3 rounded-xl border p-4 text-right transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-brand-muted mb-1 text-[10px] tracking-wide uppercase">
                      Next
                    </p>
                    <p className="text-brand-white group-hover:text-brand-lime line-clamp-2 text-xs leading-snug font-medium transition-colors">
                      {nextPost.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-brand-muted group-hover:text-brand-lime mt-0.5 shrink-0 transition-colors"
                  />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* <AdBanner size="rectangle" /> */}

            {/* Related articles */}
            {related.length > 0 && (
              <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
                <h3
                  className="text-brand-lime mb-4 text-sm font-bold tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {related.map((rp) => (
                    <Link
                      key={rp.id}
                      href={`/news/${rp.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="bg-brand-mid flex h-14 w-14 shrink-0 items-center justify-center rounded-lg">
                        <span className="text-xl opacity-40">⚽</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`mb-1 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white ${categoryColors[rp.category]}`}
                        >
                          {rp.category}
                        </span>
                        <p className="text-brand-white group-hover:text-brand-lime line-clamp-2 text-xs leading-snug font-medium transition-colors">
                          {rp.title}
                        </p>
                        <p className="text-brand-muted mt-1 text-[11px]">
                          {rp.readTime} min read
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All posts link */}
            <div className="border-brand-accent bg-brand-blue rounded-xl border p-4">
              <h3
                className="text-brand-lime mb-3 text-sm font-bold tracking-widest uppercase"
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
                      className="border-brand-accent group flex items-start gap-2 border-b py-2 last:border-0"
                    >
                      <span className="text-brand-lime mt-0.5 shrink-0 text-xs">
                        ▸
                      </span>
                      <p className="text-brand-muted group-hover:text-brand-white line-clamp-2 text-xs leading-snug transition-colors">
                        {p.title}
                      </p>
                    </Link>
                  ))}
                <Link
                  href="/news"
                  className="text-brand-lime flex items-center gap-1 pt-1 text-xs font-semibold hover:underline"
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
