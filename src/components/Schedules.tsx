import { motion } from "framer-motion";
import { Music } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { resolveIcon } from "../lib/icons";
import type { ExtracurricularActivity, ScheduleRow, SectionHeading } from "../lib/content";

type Props = {
  heading: SectionHeading;
  rows: ScheduleRow[];
  activities: ExtracurricularActivity[];
};

export function Schedules({ heading, rows, activities }: Props) {
  return (
    <section id="horarios" className="bg-carbon-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label={heading.label}
          title={heading.title}
          subtitle={heading.subtitle ?? undefined}
          align="center"
          variant="dark"
          className="mb-10"
        />

        <div className="mx-auto max-w-3xl rounded-3xl border border-green/30 bg-carbon p-6 shadow-[var(--shadow-green)] sm:p-10">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-green/15 pb-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.32em] text-green">
                Turno único
              </span>
              <h3 className="font-display text-3xl text-bone sm:text-4xl">
                Primaria y bachillerato
              </h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-green/30 px-3 py-1 text-xs uppercase tracking-wider text-bone/70">
              Lunes a viernes
            </span>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {rows.map(({ id, icon, label, value, aside }, i) => {
              const Icon = resolveIcon(icon);
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col gap-3 rounded-2xl border border-green/15 bg-carbon-soft p-5 transition-colors hover:border-green/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-green/30 bg-carbon">
                      <Icon className="h-4 w-4 text-green" aria-hidden />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-bone/55">
                      {label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-3xl leading-none text-green sm:text-[2.25rem]">
                      {value}
                    </span>
                    {aside ? (
                      <span className="text-xs font-medium text-bone/55">{aside}</span>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-3xl rounded-3xl border border-green/30 bg-carbon p-6 shadow-[var(--shadow-green)] sm:p-10"
        >
          <header className="flex flex-wrap items-center gap-3 border-b border-green/15 pb-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-green/30 bg-carbon-soft">
              <Music className="h-4 w-4 text-green" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.32em] text-green">
                Talleres de la tarde
              </span>
              <h3 className="font-display text-2xl text-bone sm:text-3xl">
                Actividades extracurriculares
              </h3>
            </div>
          </header>

          <div className="mt-6 flex flex-col gap-3">
            {activities.map(({ id, activity, day, time_range }) => (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-green/15 bg-carbon-soft px-5 py-3"
              >
                <span className="font-medium text-bone">{activity}</span>
                <span className="text-sm text-bone/70">
                  {day} · {time_range}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Schedules;
