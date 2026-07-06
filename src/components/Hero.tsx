import { motion } from "framer-motion";
import Button from "./ui/Button";
import type { SiteSettings } from "../lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type Props = {
  slogan: SiteSettings["slogan"];
};

export function Hero({ slogan }: Props) {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-carbon pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <img
        src="/header-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/85 to-carbon/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-carbon to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex max-w-3xl flex-col gap-7">
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.32em] text-green"
          >
            <span className="h-px w-10 bg-green" aria-hidden />
            Colegio Virgilio Medina · Desde 2020
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-display text-5xl leading-[1.02] tracking-tight text-bone md:text-6xl lg:text-7xl"
          >
            Educación con propósito,
            <br />
            <span className="text-green">valores con carácter</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-bone/75 md:text-lg"
          >
            Formamos estudiantes desde primaria hasta bachillerato en Santa Ana del Táchira.
            Una comunidad académica joven donde la disciplina, el rigor y los valores se viven
            a diario.
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="font-display text-xl italic text-green md:text-2xl"
          >
            “{slogan}”
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button href="#nosotros" variant="primary">
              Conocer el colegio
            </Button>
            <Button href="#inscripcion" variant="outline">
              Proceso de inscripción
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.aside
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        className="absolute right-6 bottom-10 z-10 hidden items-center gap-4 rounded-2xl border border-green/40 bg-carbon-soft/90 px-5 py-4 shadow-[var(--shadow-green)] backdrop-blur lg:flex"
        aria-label="Comunidad estudiantil"
      >
        <span className="font-display text-4xl text-green">+850</span>
        <span className="text-xs uppercase tracking-wider text-bone/70">
          Estudiantes
          <br />
          activos
        </span>
      </motion.aside>
    </section>
  );
}

export default Hero;
