import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SECTIONS } from "../../lib/admin-sections";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function AdminDashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SECTIONS.map((section, i) => {
        const Icon = section.icon;

        if (!section.ready) {
          return (
            <div
              key={section.href}
              className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 opacity-40 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink-muted">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-body text-lg font-bold text-ink">{section.label}</h3>
              <p className="text-sm text-ink-muted">{section.description}</p>
            </div>
          );
        }

        return (
          <motion.a
            key={section.href}
            href={section.href}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="group flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-all hover:border-green/40 hover:shadow-md"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green/10 text-green">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-body text-lg font-bold text-ink">{section.label}</h3>
              <p className="text-sm text-ink-muted">{section.description}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-green opacity-0 transition-opacity group-hover:opacity-100">
              Editar
              <ArrowRight className="h-3 w-3" />
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default AdminDashboardGrid;
