import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";

const PRIMARIA: string[] = [
  "Matemática",
  "Lengua y Literatura",
  "Ciencias Naturales",
  "Ciencias Sociales",
  "Inglés",
  "Educación Física",
  "Educación Artística",
  "Educación en Valores",
  "Computación",
  "Religión",
];

const BACHILLERATO: string[] = [
  "Matemática",
  "Castellano y Literatura",
  "Inglés",
  "Biología",
  "Química",
  "Física",
  "Geografía",
  "Historia de Venezuela",
  "Historia Universal",
  "Educación Física",
  "Educación Artística",
  "Premilitar (4°–5°)",
  "Computación",
  "Formación para el Trabajo",
];

const TABS = [
  { id: "primaria", label: "Primaria", subjects: PRIMARIA },
  { id: "bachillerato", label: "Bachillerato", subjects: BACHILLERATO },
] as const;

export function Subjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TABS[activeIndex];

  return (
    <section className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Plan de estudios"
          title="Materias por nivel"
          subtitle="Áreas que componen la formación académica de cada etapa."
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
                key={subject}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.04, duration: 0.45, ease: "easeOut" },
                }}
                className="flex items-center gap-3 rounded-xl border border-gold/20 bg-bone p-4 transition-colors hover:border-gold/50"
              >
                <span className="font-display text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-ink">{subject}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Subjects;
