import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import { resolveIcon } from "../lib/icons";
import type { AcademicLevel, SectionHeading } from "../lib/content";

type Props = {
  heading: SectionHeading;
  levels: AcademicLevel[];
};

export function AcademicLevels({ heading, levels }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = levels[activeIndex];

  if (!active) return null;

  return (
    <section id="niveles" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label={heading.label}
          title={heading.title}
          subtitle={heading.subtitle ?? undefined}
          align="center"
          variant="light"
          className="mb-12"
        />

        <div
          role="tablist"
          aria-label="Niveles académicos"
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {levels.map((level, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={level.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className={`relative cursor-pointer rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-bone" : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="academic-level-pill"
                    className="absolute inset-0 rounded-full bg-carbon"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{level.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <div className="flex flex-col gap-6">
              <p className="text-xs uppercase tracking-[0.32em] text-green">
                {active.name} · {active.grades}
              </p>
              <p className="text-base font-medium leading-relaxed text-ink/80 lg:text-lg">
                {active.description}
              </p>
              <ul className="mt-2 flex flex-col gap-4">
                {active.features.map(({ id, icon, title }) => {
                  const Icon = resolveIcon(icon);
                  return (
                    <li key={id} className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-green/30 bg-bone">
                        <Icon className="h-5 w-5 text-green" aria-hidden />
                      </span>
                      <span className="font-display text-lg text-ink">{title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative">
              <img
                src={active.image_url}
                alt={`Estudiantes de ${active.name} del Colegio Virgilio Medina`}
                className="h-80 w-full rounded-2xl object-cover shadow-[var(--shadow-green)] lg:h-[28rem]"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default AcademicLevels;
