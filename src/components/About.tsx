import { motion } from "framer-motion";
import { BookOpen, Heart, Sprout, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type Value = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const VALUES: Value[] = [
  {
    Icon: BookOpen,
    title: "Excelencia académica",
    description: "Rigor, profundidad y curiosidad como base de cada clase.",
  },
  {
    Icon: Heart,
    title: "Formación en valores",
    description: "Respeto, honestidad y empatía como brújula diaria.",
  },
  {
    Icon: Sprout,
    title: "Desarrollo integral",
    description: "Cuidado del cuerpo, la mente y el espíritu en cada etapa.",
  },
  {
    Icon: Users,
    title: "Compromiso comunitario",
    description: "Vínculo cercano entre familias, docentes y estudiantes.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <span
            aria-hidden
            className="absolute -top-3 -left-3 h-16 w-16 border-t-2 border-l-2 border-gold"
          />
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-gold"
          />
          <img
            src="https://picsum.photos/seed/cvm-about/800/900"
            alt="Estudiantes en clase del Colegio Virgilio Medina"
            className="h-[28rem] w-full rounded-2xl object-cover shadow-[var(--shadow-gold)] lg:h-[34rem]"
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionTitle
              label="Nuestra institución"
              title="Una comunidad educativa joven, sólida y con propósito"
              subtitle="Desde 2020, en Santa Ana del Táchira, acompañamos a niñas, niños y jóvenes en su formación académica y humana."
              variant="light"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <div>
              <p className="font-display text-xs uppercase tracking-[0.32em] text-gold">
                Misión
              </p>
              <p className="mt-2 text-base font-medium leading-relaxed text-ink/80">
                Formamos estudiantes íntegros, autónomos y comprometidos con su entorno,
                ofreciendo una educación de calidad desde primaria hasta bachillerato, basada
                en valores y en la búsqueda permanente de la excelencia académica.
              </p>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.32em] text-gold">
                Visión
              </p>
              <p className="mt-2 text-base font-medium leading-relaxed text-ink/80">
                Ser un referente educativo en el estado Táchira, reconocido por la formación
                humana de sus egresados, la solidez de su propuesta académica y el compromiso
                de su comunidad con el desarrollo de Venezuela.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="flex gap-4 rounded-xl border border-gold/20 bg-bone p-5 transition-colors hover:border-gold/50"
              >
                <Icon className="mt-1 h-6 w-6 shrink-0 text-gold" aria-hidden />
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg leading-tight text-ink">{title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-ink/75">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
