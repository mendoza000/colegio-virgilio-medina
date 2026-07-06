import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "outline";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bone cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-green text-carbon hover:bg-green-light",
  outline:
    "border border-green text-green bg-transparent hover:bg-green hover:text-carbon",
};

export function Button(props: Props) {
  const { variant = "primary", children, className = "" } = props;
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, children: _c, className: _cn, ...rest } = props;
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, children: _c, className: _cn, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export default Button;
