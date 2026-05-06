import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { SOCIAL_LINKS } from "./icons/SocialIcons";

const QUICK_LINKS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#niveles", label: "Niveles" },
  { href: "#horarios", label: "Horarios" },
  { href: "#inscripcion", label: "Inscripción" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-carbon">
      <div
        aria-hidden
        className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
              <span className="inline-flex items-center justify-center overflow-hidden rounded-md bg-carbon">
                <img
                  src="https://placehold.co/120x120/0F0F0E/C9920A/png?text=CVM&font=playfair"
                  alt="Escudo del Colegio Virgilio Medina"
                  className="h-11 w-11"
                />
              </span>
              <span className="font-display text-xl tracking-wide text-bone">
                Colegio Virgilio Medina
              </span>
            </a>
            <p className="max-w-md text-sm font-medium leading-relaxed text-bone/70">
              Desde 2020 formamos estudiantes desde primaria hasta bachillerato en
              Santa Ana del Táchira, Venezuela. Una comunidad académica joven con
              valores firmes.
            </p>
            <p className="font-display text-base italic text-gold">
              &ldquo;Formando líderes con valores para el mundo&rdquo;
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.32em] text-gold">
              Navegación
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-1 lg:grid-cols-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-medium text-bone/75 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.32em] text-gold">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3 text-bone/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span className="font-medium">
                  Avenida Bolívar, Sector Centro,
                  <br />
                  Santa Ana del Táchira, Edo. Táchira
                </span>
              </li>
              <li>
                <a
                  href="tel:+582765553478"
                  className="flex items-center gap-3 font-medium text-bone/75 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  (0276) 555-3478 · 0414 555 8290
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@colegiovirgiliomedina.edu.ve"
                  className="flex items-center gap-3 font-medium text-bone/75 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  info@colegiovirgiliomedina.edu.ve
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-gold/15 pt-8 sm:flex-row">
          <p className="text-xs text-bone/55">
            © 2026 Colegio Virgilio Medina. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-bone/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <a
            href="#inicio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-bone/60 transition-colors hover:text-gold"
          >
            Volver arriba
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
