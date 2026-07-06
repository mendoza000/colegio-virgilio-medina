import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import type { GalleryImage, SectionHeading } from "../lib/content";

type Props = {
  heading: SectionHeading;
  photos: GalleryImage[];
};

export function Gallery({ heading, photos }: Props) {
  return (
    <section id="galeria" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label={heading.label}
          title={heading.title}
          subtitle={heading.subtitle ?? undefined}
          align="center"
          variant="light"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {photos.map((photo, i) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-green/20 shadow-[var(--shadow-green)]"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-green/0 transition-colors duration-300 group-hover:bg-green/45"
              />
              <figcaption className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-display text-2xl text-carbon">
                  {photo.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
