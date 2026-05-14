type AdSize = "leaderboard" | "rectangle" | "inline";

interface AdBannerProps {
  size?: AdSize;
  className?: string;
  label?: string;
}

const sizeClasses: Record<AdSize, string> = {
  leaderboard: "w-full h-24",
  rectangle:   "w-full h-64",
  inline:      "w-full h-20",
};

export default function AdBanner({
  size = "leaderboard",
  className = "",
  label = "Advertisement",
}: AdBannerProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded border border-dashed border-brand-accent bg-brand-blue/50`}
      role="complementary"
      aria-label={label}
    >
      <span className="text-xs text-brand-muted tracking-widest uppercase select-none">
        {label}
      </span>
    </div>
  );
}
