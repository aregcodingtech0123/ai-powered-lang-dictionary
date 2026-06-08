import Image from "next/image";

type BrandMarkProps = {
  /** Navbar uses `sm`; hero uses `lg` */
  size?: "sm" | "lg";
  className?: string;
};

export function BrandIcon({ size = "sm", className = "" }: BrandMarkProps) {
  const dimension = size === "lg" ? 48 : 36;

  return (
    <Image
      src="/vocabeacon_icon.svg"
      alt=""
      width={dimension}
      height={dimension}
      priority={size === "sm"}
      className={`shrink-0 ${className}`}
      aria-hidden
    />
  );
}

export function BrandWordmark({ size = "sm", className = "" }: BrandMarkProps) {
  const textClass =
    size === "lg"
      ? "text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.75rem]"
      : "text-sm sm:text-base";

  return (
    <span className={`inline-flex items-baseline font-sans tracking-tight ${textClass} ${className}`}>
      <span className="font-normal text-brand-text">Voca</span>
      <span className="font-bold text-brand-accent">Beacon</span>
    </span>
  );
}

export function BrandMark({ size = "sm", className = "" }: BrandMarkProps) {
  const gap = size === "lg" ? "gap-3 sm:gap-4" : "gap-2.5";

  return (
    <span className={`inline-flex min-w-0 items-center ${gap} ${className}`}>
      <BrandIcon size={size} />
      <BrandWordmark size={size} />
    </span>
  );
}
