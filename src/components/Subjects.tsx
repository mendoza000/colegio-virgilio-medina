import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import type { AcademicLevel, SectionHeading, Subject } from "../lib/content";

type Props = {
  heading: SectionHeading;
  levels: AcademicLevel[];
  subjectsByLevel: Record<string, Subject[]>;
};

export function Subjects({ heading, levels, subjectsByLevel }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const TABS = levels.map((level) => ({
    id: level.slug,
    label: level.name,
    subjects: subjectsByLevel[level.slug] ?? [],
  }));
  const active = TABS[activeIndex];

  if (!active) return null;

  return (
    <section className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label={heading.label}
          title={heading.title}
          subtitle={heading.subtitle ?? undefined}
          align="center"
          variant="light"
          className="mb-10"
        />

        <div
          role="tablist"
          aria-label="Niveles para materias"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {TABS.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={tab.id}
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
                    layoutId="subjects-pill"
                    className="absolute inset-0 rounded-full bg-carbon"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
          >
            {active.subjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.04, duration: 0.45, ease: "easeOut" },
                }}
                className="flex items-center gap-3 rounded-xl border border-green/20 bg-bone p-4 transition-colors hover:border-green/50"
              >
                <span className="font-display text-sm text-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-ink">{subject.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Subjects;
