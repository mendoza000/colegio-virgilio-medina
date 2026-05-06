import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { SOCIAL_LINKS } from "./icons/SocialIcons";

type ContactItem = {
  Icon: LucideIcon;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
};

const ITEMS: ContactItem[] = [
  {
    Icon: MapPin,
    label: "Dirección",
    primary: "Calle 14 entre carreras 8 y 9, N° 8-05",
    secondary: "Barrio Libertador, Santa Ana, Mun. Córdoba, Edo. Táchira",
  },
  {
    Icon: Phone,
    label: "Teléfonos",
    primary: "(0276) 555-3478",
    secondary: "0414 555 8290",
    href: "tel:+582765553478",
  },
  {
    Icon: Mail,
    label: "Correo electrónico",
    primary: "info@colegiovirgiliomedina.edu.ve",
    href: "mailto:info@colegiovirgiliomedina.edu.ve",
  },
  {
    Icon: Clock,
    label: "Atención de secretaría",
    primary: "Lunes a Viernes",
    secondary: "7:00 AM – 4:00 PM",
  },
];

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-72.275%2C7.560%2C-72.260%2C7.575&layer=mapnik&marker=7.5670%2C-72.2670";

export function Contact() {
  return (
    <section id="contacto" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Contacto"
          title="Estamos cerca de ti"
          subtitle="Visítanos, llámanos o escríbenos. Estaremos felices de recibirte en el Colegio Virgilio Medina."
          align="center"
          variant="light"
          className="mb-12"
        />

        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-4">
              {ITEMS.map(({ Icon, label, primary, secondary, href }) => {
                const content = (
                  <>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-bone">
                      <Icon className="h-5 w-5 text-gold" aria-hidden />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                        {label}
                      </span>
                      <span className="font-medium text-ink">{primary}</span>
                      {secondary ? (
                        <span className="text-sm font-medium text-ink/75">
                          {secondary}
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                const baseClass =
                  "flex items-start gap-4 rounded-2xl border border-gold/15 bg-bone p-5 transition-colors hover:border-gold/40";

                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className={baseClass}>
                        {content}
                      </a>
                    ) : (
                      <div className={baseClass}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                Síguenos
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-ink-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border border-gold/30 shadow-[var(--shadow-gold)]"
          >
            <iframe
              src={MAP_SRC}
              title="Mapa de Santa Ana del Táchira"
              loading="lazy"
              className="h-80 w-full lg:h-full lg:min-h-[28rem]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
