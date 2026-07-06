import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type Stat = {
  prefix?: string;
  target: number;
  label: string;
};

const STATS: Stat[] = [
  { prefix: "+", target: 6, label: "Años formando estudiantes" },
  { prefix: "+", target: 850, label: "Estudiantes activos" },
  { prefix: "+", target: 60, label: "Docentes titulados" },
  { target: 12, label: "Proyectos extracurriculares" },
];

function StatNumber({ target, prefix = "" }: { target: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) =>
      setDisplay(Math.floor(latest)),
    );
    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration: 1.8,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, motionValue, target]);

  return (
    <span
      ref={ref}
      className="font-display text-5xl leading-none text-green lg:text-6xl"
    >
      {prefix}
      {display}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative bg-carbon py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center">
          <span className="block h-px w-24 bg-green/40" aria-hidden />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.32em] text-green">
            El Colegio en cifras
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-green/20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="flex flex-col items-center px-6 py-6 text-center"
            >
              <StatNumber target={stat.target} prefix={stat.prefix} />
              <p className="mt-3 text-xs uppercase tracking-wider text-bone/70 lg:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
