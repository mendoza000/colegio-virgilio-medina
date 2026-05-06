# Plan: Landing Page — Colegio Institucional
> Página estática informativa | Primaria → Bachillerato  
> Stack: Astro + React + Tailwind CSS + Framer Motion

---

## Contexto del proyecto

Landing page **completamente estática** para un colegio que ofrece desde primaria hasta bachillerato. No hay autenticación ni backend. El objetivo es darle una imagen moderna, confiable y profesional a la institución. El sitio debe ser visualmente impactante, con animaciones sofisticadas y una experiencia que transmita confianza a padres de familia.

---

## Identidad visual

**Tono:** Institucional moderno — elegante, sobrio, con carácter heráldico. Transmite prestigio sin ser pomposo.

El escudo del colegio tiene **negro, dorado y verde** como colores institucionales, con detalles en rojo baya. Se adaptan así para web:

### Paleta de colores

Todos los colores se definen en `tailwind.config.mjs` y se usan **exclusivamente como clases de Tailwind** (`bg-bone`, `text-gold`, `border-forest`, etc.). No usar hex sueltos en el JSX/TSX.

| Rol | Nombre Tailwind | Hex | Clase de ejemplo |
|-----|----------------|-----|-----------------|
| **Fondo principal** | `bone` | `#F9F6F0` | `bg-bone` |
| **Fondo oscuro** | `carbon` | `#0F0F0E` | `bg-carbon` |
| **Fondo oscuro suave** | `carbon-soft` | `#1A1A18` | `bg-carbon-soft` |
| **Dorado primario** | `gold` | `#C9920A` | `bg-gold`, `text-gold`, `border-gold` |
| **Dorado suave** | `gold-light` | `#E8B84B` | `text-gold-light`, `hover:bg-gold-light` |
| **Verde institucional** | `forest` | `#2D5016` | `bg-forest`, `text-forest` |
| **Verde suave** | `forest-light` | `#4A7C2F` | `hover:bg-forest-light` |
| **Rojo baya** | `berry` | `#8B1A1A` | `text-berry`, `bg-berry` |
| **Texto principal** | `ink` | `#1C1C1A` | `text-ink` |
| **Texto suave** | `ink-muted` | `#6B6560` | `text-ink-muted` |

**Configuración en `tailwind.config.mjs`:**
```js
theme: {
  extend: {
    colors: {
      bone:   '#F9F6F0',
      carbon: { DEFAULT: '#0F0F0E', soft: '#1A1A18' },
      gold:   { DEFAULT: '#C9920A', light: '#E8B84B' },
      forest: { DEFAULT: '#2D5016', light: '#4A7C2F' },
      berry:  '#8B1A1A',
      ink:    { DEFAULT: '#1C1C1A', muted: '#6B6560' },
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      body:    ['DM Sans', 'sans-serif'],
    },
  }
}
```

> **Nota:** Las variables CSS en `:root` **no son necesarias** si se usan tokens de Tailwind consistentemente. Solo añadir CSS variables para valores que Tailwind no puede expresar directamente, como sombras personalizadas o `rgba` con opacidad variable:
> ```css
> /* En globals.css — solo lo que Tailwind no cubre */
> :root {
>   --shadow-gold: 0 4px 24px rgba(201, 146, 10, 0.12);
>   --border-gold-subtle: rgba(201, 146, 10, 0.3);
> }
> ```

**Lógica de alternancia de secciones:** Claro (`bg-bone`) → Oscuro (`bg-carbon`) → Claro → Oscuro para crear ritmo visual.

### Tipografía
- **Display:** `Cormorant Garamond` — serif elegante con espíritu heráldico
- **Body:** `DM Sans` — sans-serif moderno y legible
- **Citas/Lemas:** `Cormorant Garamond Italic`

### Atmósfera visual
- Ornamentos dorados sutiles: líneas finas, separadores decorativos inspirados en el escudo
- Textura de grain/ruido muy sutil en secciones oscuras
- Sombras doradas en cards: `shadow-[var(--shadow-gold)]` (usar la CSS variable definida en globals)
- Bordes sutiles en cards: `border border-gold/30` (Tailwind opacity modifier)
- El logo tiene fondo negro — úsarlo directamente en secciones `bg-carbon`; en secciones `bg-bone`, envolverlo en un contenedor `bg-carbon` localizado

### Patrón de animaciones (Framer Motion)
```tsx
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
}
// Usar siempre con useInView({ once: true }) para que no se repita
```

Duraciones entre `0.4s` y `0.8s`, ease `easeOut`. Nunca exageradas.

---

## Datos del colegio (ficticios)

```
Nombre:     Institución Educativa San Isidro
Siglas:     I.E.S.I.
Lema:       "Formando líderes con valores para el mundo"
Dirección:  Carrera 15 #42-30, Barrio El Prado
Teléfonos:  (601) 234-5678 | 310 987 6543
Email:      info@iesanisidro.edu.co
Secretaría: Lunes a Viernes, 7:00am – 4:00pm
Fundación:  1985
```

---

## Stack técnico

```
astro@latest
@astrojs/react
react + react-dom
framer-motion
tailwindcss + @astrojs/tailwind
lucide-react
@fontsource/cormorant-garamond
@fontsource/dm-sans
```

---

## Estructura de archivos

```
/
├── public/
│   └── images/
│       └── logo.png           ← copiar el logo provisto por el usuario
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   └── Badge.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Stats.tsx
│   │   ├── AcademicLevels.tsx
│   │   ├── Schedules.tsx
│   │   ├── Subjects.tsx
│   │   ├── Enrollment.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## Reglas generales para Claude Code

- Usar `client:visible` en todos los componentes React dentro de Astro — excepción: `Navbar` usa `client:load`
- Imágenes placeholder: `https://picsum.photos/seed/{seed}/{width}/{height}`
- No hay formularios funcionales — los botones de inscripción son `<a href="#">` decorativos
- Todo el texto debe sonar institucional y profesional en **español colombiano**
- Mobile-first con breakpoints `sm / md / lg / xl` de Tailwind
- Confirmar que el proyecto compila sin errores al final de cada fase antes de continuar

---
---

# FASE 1 — Fundación del proyecto
> **Objetivo:** Proyecto corriendo en local con la base visual definida. Sin contenido real aún.

## Tareas

### 1.1 Inicializar proyecto
```bash
npm create astro@latest colegio-landing -- --template minimal
cd colegio-landing
npx astro add react tailwind
npm install framer-motion lucide-react
npm install @fontsource/cormorant-garamond @fontsource/dm-sans
```

### 1.2 Configurar `tailwind.config.mjs`
Usar exactamente la configuración definida en la sección **Paleta de colores** de este plan:
```js
theme: {
  extend: {
    colors: {
      bone:   '#F9F6F0',
      carbon: { DEFAULT: '#0F0F0E', soft: '#1A1A18' },
      gold:   { DEFAULT: '#C9920A', light: '#E8B84B' },
      forest: { DEFAULT: '#2D5016', light: '#4A7C2F' },
      berry:  '#8B1A1A',
      ink:    { DEFAULT: '#1C1C1A', muted: '#6B6560' },
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      body:    ['DM Sans', 'sans-serif'],
    },
  }
}
```
Esto hace disponibles clases como `bg-bone`, `text-gold`, `bg-carbon-soft`, `font-display`, `text-ink-muted`, etc.

### 1.3 Crear `Layout.astro`
- Importar fuentes de `@fontsource`
- En `globals.css`: solo las dos CSS variables que Tailwind no puede expresar:
  ```css
  :root {
    --shadow-gold: 0 4px 24px rgba(201, 146, 10, 0.12);
    --border-gold-subtle: rgba(201, 146, 10, 0.3);
  }
  ```
- `scroll-behavior: smooth` en `html`
- Meta tags: `title`, `description`, `og:image` con datos del colegio
- Clase base en `<body>`: `bg-bone font-body text-ink`

### 1.4 Crear componentes UI base

**`Button.tsx`** — dos variantes via prop `variant`:
- `primary`: fondo `#C9920A`, texto negro, hover `#E8B84B`
- `outline`: borde `#C9920A`, fondo transparente, texto `#C9920A`, hover fondo dorado suave

**`SectionTitle.tsx`** — props: `label` (chip verde pequeño encima), `title`, `subtitle` (opcional), `variant: 'light' | 'dark'`

**`Badge.tsx`** — chip pequeño, variantes `green` y `gold`

### 1.5 Crear `index.astro` base
Solo `<Layout>` con comentarios `{/* SECCIÓN: Navbar */}`, `{/* SECCIÓN: Hero */}`, etc. para cada sección. Verificar que el proyecto compila.

## ✅ Entregable
Proyecto en `localhost:4321`, fondo `#F9F6F0`, fuentes cargadas, sin errores en consola.

---
---

# FASE 2 — Estructura y navegación
> **Objetivo:** Navbar funcional y Hero completo con animaciones. La primera impresión del sitio.

## Tareas

### 2.1 `Navbar.tsx` — `client:load`
- Logo (`/images/logo.png`, 40px alto) + nombre en `Cormorant Garamond` a la izquierda
- Links de navegación: Inicio · Nosotros · Niveles · Horarios · Inscripción · Galería · Contacto
- Al hacer scroll: añadir fondo `#0F0F0E` + `backdrop-blur-md` + borde inferior dorado sutil
- Menú hamburguesa en mobile con animación de apertura (`x` transform)
- **Animación de entrada:** `y: -80 → 0` + `opacity: 0 → 1` al montar (duración 0.5s)

### 2.2 `Hero.tsx` — `client:load`
Fondo: `#0F0F0E`. Layout dos columnas en desktop, apilado en mobile.

**Columna izquierda (texto):**
- Badge dorado: "Desde 1985 · Educación con propósito"
- Título en `Cormorant Garamond` (~5rem desktop): *"Educación con propósito, valores con carácter"*
- Subtítulo en `DM Sans`: breve descripción del colegio
- Lema en cursiva dorada: *"Formando líderes con valores para el mundo"*
- CTA primary: "Conocer el colegio" + CTA outline: "Proceso de inscripción"

**Columna derecha (imagen):**
- Imagen `picsum.photos/seed/school/800/600` con borde dorado y sombra dorada
- Badge flotante superpuesto: "+850 estudiantes"

**Animaciones (stagger secuencial al montar):**
1. Badge → `fadeUp` delay 0s
2. Título → `fadeUp` delay 0.1s
3. Subtítulo → `fadeUp` delay 0.2s
4. Lema → `fadeUp` delay 0.3s
5. CTAs → `fadeUp` delay 0.4s
6. Imagen → `x: 60 → 0` + `opacity` delay 0.2s
7. Badge flotante → `scale: 0.8 → 1` + `opacity` delay 0.5s

### 2.3 Integrar en `index.astro`
Reemplazar comentarios de Navbar y Hero con los componentes reales.

## ✅ Entregable
Navbar sticky con comportamiento scroll + Hero animado. Primera impresión del sitio completa.

---
---

# FASE 3 — Secciones institucionales
> **Objetivo:** Nosotros, Stats y Niveles Académicos. La identidad y propuesta de valor del colegio.

## Tareas

### 3.1 `About.tsx` — `client:visible` — fondo claro `#F9F6F0`
Dos columnas:
- **Izquierda:** imagen placeholder con ornamento dorado decorativo (línea o marco)
- **Derecha:**
  - `SectionTitle` con label "Nuestra institución"
  - Párrafo de misión
  - Párrafo de visión
  - Grid 2×2 de valores con ícono `lucide-react` + nombre + descripción corta:
    - `BookOpen` — Excelencia académica
    - `Heart` — Formación en valores
    - `Sprout` — Desarrollo integral
    - `Users` — Compromiso comunitario

**Animaciones:** imagen slide desde izquierda, texto slide desde derecha, valores stagger `fadeUp`.

### 3.2 `Stats.tsx` — `client:visible` — fondo oscuro `#0F0F0E`
Cuatro stats en fila, separados por líneas doradas verticales:
- **+39** Años de experiencia
- **+850** Estudiantes activos
- **+60** Docentes titulados
- **12** Proyectos extracurriculares

Números en dorado `#C9920A`, etiqueta en blanco semitransparente. Cada número anima contando de 0 al valor real al entrar al viewport (`useMotionValue` + `animate`).

### 3.3 `AcademicLevels.tsx` — `client:visible` — fondo claro
Tres tabs con indicador activo dorado:

**Primaria (1° a 5°)**
- Enfoque en lectoescritura, pensamiento lógico y valores
- Actividades: arte, música, deportes, lectura
- 3 características: Grupos pequeños · Docentes especializados · Ambientes lúdicos

**Secundaria Básica (6° a 9°)**
- Profundización académica y habilidades sociales
- Actividades: ciencias, teatro, robótica, deporte
- 3 características: Laboratorios · Club de lectura · Orientación vocacional

**Bachillerato (10° y 11°)**
- Preparación universitaria y proyecto de vida
- Actividades: emprendimiento, ICFES, servicio social
- 3 características: Preuniversitario · Énfasis en ciencias · Proyecto de grado

Cada tab: descripción, 3 características con íconos, imagen representativa placeholder.
**Animación:** `fade + y` al cambiar de tab.

### 3.4 Integrar en `index.astro`
Montar en orden: `About` → `Stats` → `AcademicLevels`.

## ✅ Entregable
Tres secciones completas. El ritmo claro/oscuro/claro ya se percibe correctamente.

---
---

# FASE 4 — Información académica
> **Objetivo:** Horarios, Materias y Requisitos de Inscripción. El contenido más consultado por los padres.

## Tareas

### 4.1 `Schedules.tsx` — `client:visible` — fondo oscuro `#1A1A18`
Selector de nivel (Primaria / Secundaria / Bachillerato) en botones tipo tab.

| Nivel | Entrada | Salida | Recreo |
|-------|---------|--------|--------|
| Primaria | 7:00am | 12:30pm | 9:30am – 10:00am |
| Secundaria | 6:45am | 1:15pm | 9:15am – 9:45am |
| Bachillerato | 6:45am | 2:00pm | 9:15am – 9:45am |

Mostrar también horario de atención de director de grupo.
**Animación:** tabla con `fade` al cambiar nivel.

### 4.2 `Subjects.tsx` — `client:visible` — fondo claro `#F9F6F0`
Selector de nivel que muestra grid de materias agrupadas por grado.

**Primaria (1°–5°):** Matemáticas, Lengua Castellana, Ciencias Naturales, Ciencias Sociales, Inglés, Educación Física, Educación Artística, Ética y Valores, Tecnología e Informática, Religión

**Secundaria (6°–9°):** Matemáticas, Español, Ciencias Naturales, Química (8°–9°), Física (9°), Ciencias Sociales, Inglés, Ed. Física, Artística, Ética, Tecnología, Religión, Informática

**Bachillerato (10°–11°):** Matemáticas, Español, Filosofía, Química, Física, Biología, Ciencias Sociales, Inglés, Ed. Física, Cátedra de Paz, Emprendimiento, Estadística, Tecnología

Cada grado: card con lista de materias. **Animación:** cards con stagger `fadeUp`.

### 4.3 `Enrollment.tsx` — `client:visible` — fondo oscuro `#0F0F0E`
Stepper vertical con los 7 pasos del proceso:

1. **Consulta de cupos** — Comunicarse con secretaría para verificar disponibilidad
2. **Documentos del estudiante** — Registro civil (< 7 años) o tarjeta de identidad, certificado de notas, paz y salvo del colegio anterior
3. **Documentos del acudiente** — Cédula de ciudadanía, comprobante de domicilio
4. **Fotos** — 2 fotos recientes 3×4 fondo blanco
5. **Formulario de inscripción** — Diligenciar el formulario oficial de la institución
6. **Entrevista** — Reunión con coordinación académica (cita previa)
7. **Matrícula** — Pago y firma del contrato de matrícula

Período de inscripciones: **15 de noviembre – 28 de febrero**
CTA: botón "Descargar formulario" (`<a href="#">` decorativo, estilo `primary`)
**Animación:** pasos entran en stagger desde abajo.

### 4.4 Integrar en `index.astro`
Montar: `Schedules` → `Subjects` → `Enrollment`.

## ✅ Entregable
Las tres secciones más consultadas por padres, completas y con datos coherentes.

---
---

# FASE 5 — Galería, Testimonios y Contacto
> **Objetivo:** Completar el sitio con la sección visual, social y de cierre.

## Tareas

### 5.1 `Gallery.tsx` — `client:visible` — fondo claro `#F9F6F0`
Grid 3 columnas desktop / 2 tablet / 1 mobile. 9 imágenes placeholder:

```
https://picsum.photos/seed/classroom/600/400   → "Aulas de clase"
https://picsum.photos/seed/library1/600/400    → "Biblioteca"
https://picsum.photos/seed/sports1/600/400     → "Deportes"
https://picsum.photos/seed/science1/600/400    → "Laboratorio de ciencias"
https://picsum.photos/seed/art1/600/400        → "Taller de arte"
https://picsum.photos/seed/garden1/600/400     → "Zonas verdes"
https://picsum.photos/seed/theater1/600/400    → "Sala de teatro"
https://picsum.photos/seed/computers/600/400   → "Sala de informática"
https://picsum.photos/seed/playground/600/400  → "Patio de recreo"
```

Hover: overlay dorado semitransparente + etiqueta descriptiva centrada.
**Animación:** stagger `scale: 0.95 → 1` + `opacity`.

### 5.2 `Testimonials.tsx` — `client:visible` — fondo oscuro `#1A1A18`
Carousel de 5 testimonios. Auto-play cada 5s con pausa en hover. Dots de navegación.

```
1. "Excelente institución, mis hijos han crecido mucho en valores y académicamente."
   — María González, madre · Estudiante de 7°

2. "Los docentes son muy comprometidos y el ambiente es muy sano para los niños."
   — Carlos Herrera, padre · Estudiante de 3°

3. "El proceso de inscripción fue muy fácil y la atención del personal es inmejorable."
   — Luisa Martínez, madre · Estudiante de 10°

4. "Mi hija entró en primero y ya está en noveno. Nunca la cambiaría de colegio."
   — Andrés Ospina, padre de familia

5. "La formación en valores que reciben aquí no la encuentras en ningún otro lado."
   — Patricia Ruiz, madre de gemelos · 5°
```

Avatares circulares placeholder: `https://picsum.photos/seed/{nombre}/80/80`
**Animación:** slide con `x` al cambiar + fade en texto.

### 5.3 `Contact.tsx` — `client:visible` — fondo claro `#F9F6F0`
Dos columnas:

**Izquierda — Info de contacto:**
- `MapPin` — Carrera 15 #42-30, Barrio El Prado
- `Phone` — (601) 234-5678 | 310 987 6543
- `Mail` — info@iesanisidro.edu.co
- `Clock` — Lunes a Viernes, 7:00am – 4:00pm
- Íconos de redes: Facebook, Instagram, YouTube (links `#`)

**Derecha — Mapa:**
- Imagen placeholder `picsum.photos/seed/map/600/400` con pin SVG superpuesto, o iframe de Google Maps con coordenadas ficticias

**Animación:** info desde izquierda, mapa desde derecha.

### 5.4 `Footer.tsx` — fondo `#0F0F0E`
- Separador dorado ornamental en la parte superior
- Logo pequeño + nombre del colegio en `Cormorant Garamond`
- Links rápidos a todas las secciones (scroll suave con `href="#id"`)
- Íconos de redes sociales
- Copyright: `© 2025 Institución Educativa San Isidro. Todos los derechos reservados.`

### 5.5 Integrar en `index.astro`
Montar: `Gallery` → `Testimonials` → `Contact` → `Footer`. El sitio ya está completo.

## ✅ Entregable
Sitio con todas las secciones montadas de principio a fin.

---
---

# FASE 6 — Pulido final
> **Objetivo:** Revisión integral de calidad. Sin features nuevas, solo refinamiento.

## Tareas

### 6.1 Responsive
Revisar cada sección en tres breakpoints:
- **Mobile:** 375px (iPhone SE)
- **Tablet:** 768px (iPad)
- **Desktop:** 1280px+

Puntos críticos: Hero apilado en mobile, Navbar hamburguesa, grids colapsando correctamente, tablas de horarios con scroll horizontal si es necesario.

### 6.2 Animaciones
- Confirmar `useInView({ once: true })` en todos los componentes (que no se repitan al hacer scroll)
- Verificar que el Navbar cambia de estilo al hacer scroll
- Confirmar que el carousel auto-play no es agresivo
- Revisar que ninguna animación bloquea el layout o produce CLS (Cumulative Layout Shift)

### 6.3 Tipografía y espaciado
- Jerarquía clara: display → h1 → h2 → h3 → body
- Espaciado entre secciones consistente: `py-20` o `py-24`
- `letter-spacing` y `line-height` correctos en `Cormorant Garamond` (suele necesitar `tracking-wide` y `leading-tight` en títulos grandes)

### 6.4 Detalles visuales finales
- Separadores ornamentales dorados (`<hr>` estilizado o línea SVG) entre secciones donde aplique
- Hover states en todos los links y botones
- `cursor-pointer` en todos los elementos interactivos
- Focus visible con outline dorado para accesibilidad de teclado

### 6.5 SEO y accesibilidad
- `alt` descriptivo en todas las imágenes
- `aria-label` en botones icono y navegación
- Estructura de headings: `h1` solo en Hero, `h2` por sección, `h3` para subsecciones
- `lang="es"` en `<html>`
- Meta tags completos en `Layout.astro`: `title`, `description`, `og:title`, `og:description`, `og:image`

### 6.6 Build de producción
```bash
npm run build
npm run preview
```
Verificar que el build estático termina sin errores ni warnings críticos. El output en `/dist` debe ser completamente estático.

## ✅ Entregable final
Sitio listo para entregar: pulido, responsive, accesible, animado y sin errores de build.
