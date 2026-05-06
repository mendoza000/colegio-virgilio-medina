import type { ReactNode } from "react";

type Variant = "green" | "gold";

interface Props {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide font-body uppercase";

const variants: Record<Variant, string> = {
  green: "bg-forest/15 text-forest",
  gold: "bg-gold/15 text-gold",
};

export function Badge({ variant = "gold", children, className = "" }: Props) {
  return (
    <span className={`${base} ${variants[variant]} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default Badge;
