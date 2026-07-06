import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { SOCIAL_ICON_MAP, FacebookIcon } from "./icons/SocialIcons";
import type { SiteSettings, SectionHeading, SocialLink } from "../lib/content";

type ContactItem = {
  Icon: LucideIcon;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
};

type Props = {
  settings: SiteSettings;
  heading: SectionHeading;
  socialLinks: SocialLink[];
};

export function Contact({ settings, heading, socialLinks }: Props) {
  const [officeHoursDays, officeHoursTime] = settings.office_hours.split("·").map((s) => s.trim());

  const ITEMS: ContactItem[] = [
    {
      Icon: MapPin,
      label: "Dirección",
      primary: settings.address,
    },
    {
      Icon: Phone,
      label: "Teléfono",
      primary: settings.phone,
      href: `tel:+58${settings.phone.replace(/\D/g, "").replace(/^0/, "")}`,
    },
    {
      Icon: Mail,
      label: "Correo electrónico",
      primary: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      Icon: Clock,
      label: "Atención de secretaría",
      primary: officeHoursDays ?? settings.office_hours,
      secondary: officeHoursTime,
    },
  ];

  return (
    <section id="contacto" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label={heading.label}
          title={heading.title}
          subtitle={heading.subtitle ?? undefined}
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
            className="flex min-w-0 flex-col gap-6"
          >
            <ul className="flex flex-col gap-4">
              {ITEMS.map(({ Icon, label, primary, secondary, href }) => {
                const content = (
                  <>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-green/30 bg-bone">
                      <Icon className="h-5 w-5 text-green" aria-hidden />
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                        {label}
                      </span>
                      <span className="font-medium break-words text-ink">{primary}</span>
                      {secondary ? (
                        <span className="text-sm font-medium break-words text-ink/75">
                          {secondary}
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                const baseClass =
                  "flex items-start gap-4 rounded-2xl border border-green/15 bg-bone p-5 transition-colors hover:border-green/40";

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
                {socialLinks.map(({ href, label, platform }) => {
                  const Icon = SOCIAL_ICON_MAP[platform] ?? FacebookIcon;
                  return (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-green/25 text-ink-muted transition-colors hover:border-green hover:text-green"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-w-0 overflow-hidden rounded-2xl border border-green/30 shadow-[var(--shadow-green)]"
          >
            <iframe
              src={settings.map_embed_src}
              title="Mapa de Santa Ana del Táchira"
              loading="lazy"
              className="block h-80 w-full max-w-full lg:h-full lg:min-h-[28rem]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
