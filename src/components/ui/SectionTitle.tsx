import Badge from "./Badge";

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  label,
  title,
  subtitle,
  variant = "light",
  align = "left",
  className = "",
}: Props) {
  const titleColor = variant === "light" ? "text-ink" : "text-bone";
  const subtitleColor =
    variant === "light" ? "text-ink-muted" : "text-bone/70";
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`.trim()}>
      <Badge variant={variant === "dark" ? "gold" : "green"}>{label}</Badge>
      <h2
        className={`font-display text-4xl md:text-5xl leading-tight tracking-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`max-w-2xl text-base md:text-lg leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default SectionTitle;
