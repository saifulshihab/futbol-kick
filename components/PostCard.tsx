import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import { NewsPost } from "@/lib/data";

const categoryColors: Record<NewsPost["category"], string> = {
  News:     "bg-blue-600",
  Analysis: "bg-purple-600",
  Player:   "bg-brand-yellow text-brand-navy",
  Tactics:  "bg-green-700",
  Fan:      "bg-brand-red",
};

interface PostCardProps {
  post: NewsPost;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

  if (compact) {
    return (
      <Link
        href={`/news/${post.slug}`}
        className="flex gap-3 group py-2 border-b border-brand-accent last:border-0"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-brand-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug">
            {post.title}
          </p>
          <p className="text-[11px] text-brand-muted mt-1">{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${post.slug}`}
      className="block rounded-xl border border-brand-accent bg-brand-blue hover:border-brand-yellow transition-colors group overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-brand-mid to-brand-accent flex items-center justify-center relative">
        <span className="text-5xl opacity-30">⚽</span>
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? "bg-brand-accent"} text-white`}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3
          className="font-bold text-brand-white group-hover:text-brand-yellow transition-colors leading-snug line-clamp-2 mb-2"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {post.title}
        </h3>
        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-brand-muted">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Tag size={11} />
            {post.tags[0]}
          </span>
        </div>
      </div>
    </Link>
  );
}
