import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { SOCIAL_LINKS } from "./icons/SocialIcons";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#niveles", label: "Niveles" },
  { href: "#horarios", label: "Horarios" },
  { href: "#inscripcion", label: "Inscripción" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

const LOGO_PLACEHOLDER =
  "https://placehold.co/120x120/0F0F0E/C9920A/png?text=CVM&font=playfair";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerSurface = scrolled
    ? "bg-carbon/95 backdrop-blur-md border-b border-[var(--border-gold-subtle)] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerSurface}`}
      >
        <div
          className={`hidden border-b border-bone/10 transition-all duration-300 md:block ${
            scrolled ? "max-h-0 overflow-hidden border-transparent" : "max-h-12"
          }`}
        >
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-6 text-xs text-bone/70">
              <a
                href="mailto:colegioprivadovirgiliomedinaramirez@gmail.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                colegioprivadovirgiliomedinaramirez@gmail.com
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Santa Ana, Edo. Táchira · Venezuela
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3 text-bone/70">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs text-gold transition-colors hover:bg-gold hover:text-carbon"
              >
                <Phone className="h-3 w-3" aria-hidden />
                Contáctanos
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
            <span className="inline-flex items-center justify-center overflow-hidden rounded-md bg-carbon">
              <img
                src={LOGO_PLACEHOLDER}
                alt="Escudo del Colegio Virgilio Medina"
                className="h-11 w-11"
              />
            </span>
            <span className="font-display text-xl tracking-wide text-bone">
              <span className="hidden md:inline">Colegio Virgilio Medina</span>
              <span className="md:hidden">C.V.M.</span>
            </span>
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-bone/85 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#inscripcion"
              className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-carbon transition-colors hover:bg-gold-light md:inline-flex"
            >
              Inscríbete
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-bone transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-carbon/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-y-0 right-0 flex w-80 max-w-full flex-col gap-8 bg-carbon p-8 shadow-[var(--shadow-gold)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl tracking-wide text-bone">C.V.M.</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-bone transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-5" aria-label="Navegación móvil">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl tracking-wide text-bone transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#inscripcion"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-medium uppercase tracking-wider text-carbon transition-colors hover:bg-gold-light"
              >
                Inscríbete
              </a>

              <div className="mt-auto flex items-center justify-between border-t border-bone/10 pt-6 text-xs text-bone/60">
                <a
                  href="mailto:colegioprivadovirgiliomedinaramirez@gmail.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  Escríbenos
                </a>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-gold"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
