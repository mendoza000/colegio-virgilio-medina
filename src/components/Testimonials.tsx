import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarSeed: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Excelente institución, mis hijos han crecido mucho en valores y académicamente.",
    name: "María González",
    role: "Madre · Estudiante de 1° año",
    avatarSeed: "maria-gonzalez",
  },
  {
    quote:
      "Los docentes son muy comprometidos y el ambiente es muy sano para los niños.",
    name: "Carlos Herrera",
    role: "Padre · Estudiante de 3° grado",
    avatarSeed: "carlos-herrera",
  },
  {
    quote:
      "El proceso de inscripción fue muy fácil y la atención del personal es inmejorable.",
    name: "Luisa Martínez",
    role: "Madre · Estudiante de 4° año",
    avatarSeed: "luisa-martinez",
  },
  {
    quote:
      "Mi hija entró en primer grado y ya está en cuarto año. Nunca la cambiaríamos de colegio.",
    name: "Andrés Ospina",
    role: "Padre de familia",
    avatarSeed: "andres-ospina",
  },
  {
    quote:
      "La formación en valores que reciben aquí no la encuentras en ningún otro lado.",
    name: "Patricia Ruiz",
    role: "Madre de gemelos · 5° grado",
    avatarSeed: "patricia-ruiz",
  },
];

const AUTOPLAY_MS = 5000;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const next = () => goTo((activeIndex + 1) % TESTIMONIALS.length);
  const prev = () =>
    goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="bg-carbon-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Comunidad C.V.M."
          title="Lo que dicen nuestras familias"
          subtitle="Voces de representantes que han confiado en nosotros la formación de sus hijos."
          align="center"
          variant="dark"
          className="mb-12"
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote
            className="absolute -top-2 left-2 h-16 w-16 text-gold/15"
            aria-hidden
          />

          <div className="relative min-h-[18rem] sm:min-h-[16rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center gap-8 px-2 text-center sm:px-6"
              >
                <blockquote className="font-display text-2xl italic leading-snug text-bone sm:text-3xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col items-center gap-3">
                  <img
                    src={`https://picsum.photos/seed/${active.avatarSeed}/120/120`}
                    alt={`Foto de ${active.name}`}
                    className="h-16 w-16 rounded-full border-2 border-gold/40 object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-lg text-gold">
                      {active.name}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-bone/60">
                      {active.role}
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimonio anterior"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold/30 text-bone transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist">
              {TESTIMONIALS.map((t, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={t.avatarSeed}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ver testimonio de ${t.name}`}
                    onClick={() => goTo(i)}
                    className={`h-2 cursor-pointer rounded-full transition-all ${
                      isActive ? "w-8 bg-gold" : "w-2 bg-bone/30 hover:bg-bone/50"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Testimonio siguiente"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold/30 text-bone transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
