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
    title: "Material de oficina",
    description:
      "Carpeta tamaño oficio marrón con gancho y 3 fundas tipo oficio.",
  },
  {
    title: "Documentos del estudiante",
    description:
      "Copia de la cédula de identidad ampliada (centrada en la hoja), partida de nacimiento, 2 fotos tipo carnet y documentos probatorios de 6to grado. El estudiante debe asistir al momento de la inscripción.",
  },
  {
    title: "Notas para 2° a 5° año",
    description:
      "Quienes ingresan a estos grados deben anexar las notas certificadas del año anterior junto a la constancia, certificado e histórico SIGE.",
  },
  {
    title: "Documentos del representante",
    description:
      "Copia de la cédula de identidad ampliada de madre y padre, 2 fotos tipo carnet y número de celular con WhatsApp.",
  },
  {
    title: "Casos especiales",
    description:
      "Estudios en el extranjero requieren notas certificadas y apostilladas. Si el representante no es padre o madre, presentar original de la «Autorización de Representación Escolar» (LOPNA).",
  },
  {
    title: "Inscripción y matrícula",
    description:
      "Diligenciar el formulario oficial, entrevista con coordinación académica (con cita previa) y firma del contrato anual.",
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
              Año Escolar 2026 – 2027 · Inscripciones abiertas
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
