import Image from "next/image";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeMap: Record<Size, { px: number; cdn: number }> = {
  xs:   { px: 20,  cdn: 20  },
  sm:   { px: 28,  cdn: 40  },
  md:   { px: 40,  cdn: 40  },
  lg:   { px: 56,  cdn: 80  },
  xl:   { px: 80,  cdn: 80  },
  "2xl":{ px: 112, cdn: 160 },
};

export default function FlagImg({
  code,
  size = "sm",
  className = "",
}: {
  code: string;
  size?: Size;
  className?: string;
}) {
  const { px, cdn } = sizeMap[size];
  return (
    <Image
      src={`https://flagcdn.com/w${cdn}/${code}.png`}
      alt={`${code} flag`}
      width={px}
      height={Math.round(px * 0.75)}
      className={`inline-block rounded-sm object-cover align-middle ${className}`}
    />
  );
}
