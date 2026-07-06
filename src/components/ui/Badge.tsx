import type { ReactNode } from "react";

type Variant = "forest" | "green";

interface Props {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide font-body uppercase";

const variants: Record<Variant, string> = {
  forest: "bg-forest/15 text-forest",
  green: "bg-green/15 text-green",
};

export function Badge({ variant = "green", children, className = "" }: Props) {
  return (
    <span className={`${base} ${variants[variant]} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default Badge;
