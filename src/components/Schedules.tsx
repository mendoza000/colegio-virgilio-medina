import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, LogIn, LogOut, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

type Slot = { value: string; aside?: string };

type Row = {
  Icon: LucideIcon;
  label: string;
  primaria: Slot;
  bachillerato: Slot;
};

const ROWS: Row[] = [
  {
    Icon: LogIn,
    label: "Entrada",
    primaria: { value: "7:00 AM" },
    bachillerato: { value: "6:45 AM" },
  },
  {
    Icon: Coffee,
    label: "Recreo",
    primaria: { value: "9:30 – 10:00 AM" },
    bachillerato: { value: "9:15 – 9:45 AM" },
  },
  {
    Icon: LogOut,
    label: "Salida",
    primaria: { value: "12:30 PM" },
    bachillerato: { value: "2:00 PM" },
  },
  {
    Icon: UserCog,
    label: "Atención del coordinador",
    primaria: { value: "1:00 – 3:00 PM", aside: "Lun a viernes" },
    bachillerato: { value: "2:30 – 4:00 PM", aside: "Lun a viernes" },
  },
];

const TABS = [
  { id: "primaria", label: "Primaria" },
  { id: "bachillerato", label: "Bachillerato" },
] as const;

type LevelKey = "primaria" | "bachillerato";

export function Schedules() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeKey: LevelKey = TABS[activeIndex].id;
  const activeLabel = TABS[activeIndex].label;

  return (
    <section id="horarios" className="bg-carbon-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Jornada escolar"
          title="Horarios institucionales"
          subtitle="Una rutina clara para cada nivel, con tiempos de descanso y atención a representantes."
          align="center"
          variant="dark"
          className="mb-10"
        />

        <div
          role="tablist"
          aria-label="Niveles para horarios"
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
                  isActive ? "text-carbon" : "text-bone/70 hover:text-bone"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="schedules-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-3xl rounded-3xl border border-gold/30 bg-carbon p-6 shadow-[var(--shadow-gold)] sm:p-10"
          >
            <header className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.32em] text-gold">
                  Nivel
                </span>
                <h3 className="font-display text-3xl text-bone sm:text-4xl">
                  {activeLabel}
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-wider text-bone/70">
                Lunes a viernes
              </span>
            </header>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {ROWS.map(({ Icon, label, primaria, bachillerato }) => {
                const slot = activeKey === "primaria" ? primaria : bachillerato;
                return (
                  <div
                    key={label}
                    className="flex flex-col gap-3 rounded-2xl border border-gold/15 bg-carbon-soft p-5 transition-colors hover:border-gold/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-carbon">
                        <Icon className="h-4 w-4 text-gold" aria-hidden />
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-bone/55">
                        {label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-3xl leading-none text-gold sm:text-[2.25rem]">
                        {slot.value}
                      </span>
                      {slot.aside ? (
                        <span className="text-xs font-medium text-bone/55">
                          {slot.aside}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Schedules;
