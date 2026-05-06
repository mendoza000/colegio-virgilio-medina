import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";

type Photo = { src: string; caption: string };

const PHOTOS: Photo[] = [
  { src: "https://picsum.photos/seed/classroom/600/400", caption: "Aulas de clase" },
  { src: "https://picsum.photos/seed/library1/600/400", caption: "Biblioteca" },
  { src: "https://picsum.photos/seed/sports1/600/400", caption: "Deportes" },
  { src: "https://picsum.photos/seed/science1/600/400", caption: "Laboratorio de ciencias" },
  { src: "https://picsum.photos/seed/art1/600/400", caption: "Taller de arte" },
  { src: "https://picsum.photos/seed/garden1/600/400", caption: "Zonas verdes" },
  { src: "https://picsum.photos/seed/theater1/600/400", caption: "Sala de teatro" },
  { src: "https://picsum.photos/seed/computers/600/400", caption: "Sala de informática" },
  { src: "https://picsum.photos/seed/playground/600/400", caption: "Patio de recreo" },
];

export function Gallery() {
  return (
    <section id="galeria" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          label="Galería"
          title="Espacios que inspiran aprendizaje"
          subtitle="Recorre los ambientes donde nuestros estudiantes viven la jornada escolar."
          align="center"
          variant="light"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PHOTOS.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/20 shadow-[var(--shadow-gold)]"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gold/0 transition-colors duration-300 group-hover:bg-gold/45"
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
