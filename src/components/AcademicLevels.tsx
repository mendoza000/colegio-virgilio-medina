import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Compass,
  FlaskConical,
  GraduationCap,
  Smile,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

type Feature = { Icon: LucideIcon; title: string };

type Level = {
  id: string;
  label: string;
  grades: string;
  description: string;
  features: [Feature, Feature, Feature];
  image: string;
};

const LEVELS: Level[] = [
  {
    id: "primaria",
    label: "Primaria",
    grades: "1° a 6° grado",
    description:
      "Formación de las bases con foco en lectoescritura, pensamiento lógico y valores. Acompañamiento cercano en cada paso del aprendizaje.",
    features: [
      { Icon: Users, title: "Grupos pequeños" },
      { Icon: Award, title: "Docentes especializados" },
      { Icon: Smile, title: "Ambientes lúdicos" },
    ],
    image: "https://picsum.photos/seed/cvm-primaria/800/600",
  },
  {
    id: "bachillerato",
    label: "Bachillerato",
    grades: "1° a 5° año",
    description:
      "Profundización académica, formación científica y preparación universitaria. Espacios para laboratorio, lectura, orientación vocacional y proyecto de vida.",
    features: [
      { Icon: FlaskConical, title: "Laboratorios y club de lectura" },
      { Icon: Compass, title: "Orientación vocacional" },
      { Icon: GraduationCap, title: "Preuniversitario y proyecto de grado" },
    ],
    image: "https://picsum.photos/seed/cvm-bachillerato/800/600",
  },
];

export function AcademicLevels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = LEVELS[activeIndex];

  return (
    <section id="niveles" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Oferta académica"
          title="Dos etapas, un mismo propósito"
          subtitle="Acompañamos a cada estudiante desde la lectoescritura hasta el proyecto de vida que lo prepara para la universidad."
          align="center"
          variant="light"
          className="mb-12"
        />

        <div
          role="tablist"
          aria-label="Niveles académicos"
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {LEVELS.map((level, i) => {
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
                <span className="relative">{level.label}</span>
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
              <p className="text-xs uppercase tracking-[0.32em] text-gold">
                {active.label} · {active.grades}
              </p>
              <p className="text-base font-medium leading-relaxed text-ink/80 lg:text-lg">
                {active.description}
              </p>
              <ul className="mt-2 flex flex-col gap-4">
                {active.features.map(({ Icon, title }) => (
                  <li key={title} className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-bone">
                      <Icon className="h-5 w-5 text-gold" aria-hidden />
                    </span>
                    <span className="font-display text-lg text-ink">{title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <img
                src={active.image}
                alt={`Estudiantes de ${active.label} del Colegio Virgilio Medina`}
                className="h-80 w-full rounded-2xl object-cover shadow-[var(--shadow-gold)] lg:h-[28rem]"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default AcademicLevels;
