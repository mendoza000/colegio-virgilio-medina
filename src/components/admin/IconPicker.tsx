import { useEffect, useRef, useState } from "react";
import type { ReactNode, SVGProps } from "react";
import { ICON_MAP } from "../../lib/icons";

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactNode;

type Props = {
  value: string;
  onChange: (name: string) => void;
  options?: Record<string, IconComponent>;
  placeholder?: string;
};

export function IconPicker({ value, onChange, options = ICON_MAP, placeholder = "Elegir ícono" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const CurrentIcon = options[value];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-lg border border-ink/15 bg-bone/60 px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
      >
        {CurrentIcon ? <CurrentIcon className="h-4 w-4 shrink-0 text-green" aria-hidden /> : null}
        <span className="truncate">{value || placeholder}</span>
      </button>

      {open ? (
        <div className="absolute z-20 mt-1 grid max-h-56 w-64 grid-cols-6 gap-1 overflow-y-auto rounded-lg border border-ink/10 bg-white p-2 shadow-md">
          {Object.entries(options).map(([name, Icon]) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              title={name}
              className={`flex items-center justify-center rounded-md p-2 transition-colors hover:bg-green/10 ${
                name === value ? "bg-green/20 text-green" : "text-ink-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default IconPicker;
