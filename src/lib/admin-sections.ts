import type { ComponentType, SVGProps } from "react";
import {
  BookOpen,
  CalendarClock,
  ClipboardList,
  GraduationCap,
  Image,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type AdminSection = {
  href: string;
  label: string;
  description: string;
  icon: IconComponent;
  ready: boolean;
};

export const SECTIONS: AdminSection[] = [
  {
    href: "/admin/gallery",
    label: "Galería",
    description: "Fotos de las instalaciones y la vida escolar.",
    icon: Image,
    ready: true,
  },
  {
    href: "/admin/site-settings",
    label: "Datos generales, logo y contacto",
    description: "Lema, teléfono, dirección, logo y redes sociales.",
    icon: Settings,
    ready: true,
  },
  {
    href: "/admin/about",
    label: "Nosotros",
    description: "Misión, visión y valores institucionales.",
    icon: Users,
    ready: true,
  },
  {
    href: "/admin/academic-levels",
    label: "Niveles académicos",
    description: "Agregá niveles y editá su descripción y puntos destacados.",
    icon: GraduationCap,
    ready: true,
  },
  {
    href: "/admin/stats",
    label: "El colegio en cifras",
    description: "Cifras destacadas que aparecen debajo de Nosotros.",
    icon: TrendingUp,
    ready: true,
  },
  {
    href: "/admin/subjects",
    label: "Materias",
    description: "Materias dictadas en cada nivel académico.",
    icon: BookOpen,
    ready: true,
  },
  {
    href: "/admin/schedules",
    label: "Horarios y extracurriculares",
    description: "Jornada escolar y actividades de la tarde.",
    icon: CalendarClock,
    ready: true,
  },
  {
    href: "/admin/enrollment",
    label: "Inscripción",
    description: "Pasos del proceso y formulario descargable.",
    icon: ClipboardList,
    ready: true,
  },
];
