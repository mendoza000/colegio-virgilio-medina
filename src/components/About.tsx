import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import { resolveIcon } from "../lib/icons";
import type { AboutValue, SectionHeading } from "../lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type Props = {
  heading: SectionHeading;
  mission: string;
  vision: string;
  imageUrl: string;
  values: AboutValue[];
};

export function About({ heading, mission, vision, imageUrl, values }: Props) {
  return (
    <section id="nosotros" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <span
            aria-hidden
            className="absolute -top-3 -left-3 h-16 w-16 border-t-2 border-l-2 border-green"
          />
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-green"
          />
          <img
            src={imageUrl}
            alt="Estudiantes en clase del Colegio Virgilio Medina"
            className="h-[28rem] w-full rounded-2xl object-cover shadow-[var(--shadow-green)] lg:h-[34rem]"
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
              label={heading.label}
              title={heading.title}
              subtitle={heading.subtitle ?? undefined}
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
            <div className="flex flex-col gap-3">
              <p className="font-display text-xs uppercase tracking-[0.32em] text-green">
                Misión
              </p>
              {mission.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-base font-medium leading-relaxed text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-display text-xs uppercase tracking-[0.32em] text-green">
                Visión
              </p>
              {vision.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-base font-medium leading-relaxed text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map(({ icon, title, description }, i) => {
              const Icon = resolveIcon(icon);
              return (
                <motion.div
                  key={title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="flex gap-4 rounded-xl border border-green/20 bg-bone p-5 transition-colors hover:border-green/50"
                >
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-green" aria-hidden />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-lg leading-tight text-ink">{title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-ink/75">{description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
