import { motion } from "framer-motion";
import { Calendar, Download } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type Step = { title: string; description: string };

const STEPS: Step[] = [
  {
    title: "Consulta de cupos",
    description:
      "Comunicarse con secretaría para verificar disponibilidad en el grado deseado.",
  },
  {
    title: "Documentos del estudiante",
    description:
      "Partida de nacimiento, cédula de identidad (a partir de los 9 años), boletín de notas y constancia de promoción del año anterior.",
  },
  {
    title: "Documentos del representante",
    description:
      "Cédula de identidad del representante legal y comprobante de domicilio.",
  },
  {
    title: "Fotografías",
    description: "Dos fotos recientes tipo carnet, fondo blanco.",
  },
  {
    title: "Formulario de inscripción",
    description: "Diligenciar el formulario oficial entregado por secretaría.",
  },
  {
    title: "Entrevista",
    description:
      "Reunión del estudiante y su representante con la coordinación académica (con cita previa).",
  },
  {
    title: "Matrícula",
    description: "Pago de la matrícula anual y firma del contrato.",
  },
];

export function Enrollment() {
  return (
    <section id="inscripcion" className="bg-carbon py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Proceso de inscripción"
          title="Cómo formar parte del Colegio Virgilio Medina"
          subtitle="Siete pasos para incorporar a tu representado a nuestra comunidad."
          align="center"
          variant="dark"
        />

        <div className="mt-6 flex justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-carbon-soft px-5 py-2.5"
          >
            <Calendar className="h-4 w-4 text-gold" aria-hidden />
            <span className="text-sm text-bone/85">
              Inscripciones abiertas · 1 de abril – 30 de agosto
            </span>
          </motion.span>
        </div>

        <ol className="relative mx-auto mt-14 flex max-w-3xl flex-col gap-8">
          <span
            aria-hidden
            className="absolute left-6 top-6 bottom-6 w-px bg-gold/20"
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="flex items-start gap-6"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-carbon font-display text-lg text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5 pt-1">
                <h3 className="font-display text-xl text-bone">{step.title}</h3>
                <p className="text-base font-medium leading-relaxed text-bone/75">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Button href="#" variant="primary">
            <Download className="h-4 w-4" aria-hidden />
            Descargar formulario
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Enrollment;
