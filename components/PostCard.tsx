import { NewsPost } from "@/lib/data";
import { Clock, Tag } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<NewsPost["category"], string> = {
  News: "bg-blue-600",
  Analysis: "bg-purple-600",
  Player: "bg-brand-lime text-brand-navy",
  Tactics: "bg-green-700",
  Fan: "bg-brand-red"
};

interface PostCardProps {
  post: NewsPost;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  if (compact) {
    return (
      <Link
        href={`/news/${post.slug}`}
        className="group border-brand-accent flex gap-3 border-b py-2 last:border-0"
      >
        <div className="min-w-0 flex-1">
          <p className="text-brand-white group-hover:text-brand-lime line-clamp-2 text-sm leading-snug font-medium transition-colors">
            {post.title}
          </p>
          <p className="text-brand-muted mt-1 text-[11px]">{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${post.slug}`}
      className="border-brand-accent bg-brand-blue hover:border-brand-lime group block overflow-hidden rounded-xl border transition-colors"
    >
      {/* Image placeholder */}
      <div className="from-brand-mid to-brand-accent relative flex h-40 items-center justify-center bg-gradient-to-br">
        <span className="text-5xl opacity-30">⚽</span>
        <span
          className={`absolute top-3 left-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${categoryColors[post.category] ?? "bg-brand-accent"} text-white`}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3
          className="text-brand-white group-hover:text-brand-lime mb-2 line-clamp-2 leading-snug font-bold transition-colors"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {post.title}
        </h3>
        <p className="text-brand-muted mb-3 line-clamp-2 text-xs leading-relaxed">
          {post.excerpt}
        </p>
        <div className="text-brand-muted flex items-center gap-3 text-[11px]">
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
