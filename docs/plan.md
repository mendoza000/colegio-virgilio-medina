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
Nombre:     Colegio Virgilio Medina (razón social: Colegio Virgilio Medina Ramírez)
Siglas:     C.V.M.
Lema:       "Formando líderes con valores para el mundo"
Dirección:  Calle 14 entre carreras 8 y 9, N° 8-05,
            Barrio Libertador, Santa Ana,
            Municipio Córdoba, Estado Táchira
Teléfonos:  (0276) 555-3478 | 0414 555 8290
Email:      info@colegiovirgiliomedina.edu.ve
TikTok:     https://www.tiktok.com/@u.e.colegio.virgi
Secretaría: Lunes a Viernes, 7:00am – 4:00pm
Fundación:  2020
País:       Venezuela
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
- Todo el texto debe sonar institucional y profesional en **español venezolano**
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

Header de **dos pisos** con identidad institucional al estilo de un sitio universitario.

**Piso superior — barra utilitaria** (`hidden md:block`, oculta en mobile):
- Fondo translúcido sobre `bg-carbon`, `text-xs text-bone/70`, alto `h-10`.
- Izquierda: ícono `Mail` + email enlazado · ícono `MapPin` + "Santa Ana del Táchira, Venezuela".
- Derecha: íconos sociales (`Facebook`, `Instagram`, `Youtube` de `lucide-react`) + pill outline dorada con ícono `Phone` y texto "Contáctanos".
- Al hacer scroll (`scrollY > 24`): la barra colapsa con transición de `max-h` (sin saltos visuales).

**Piso inferior — barra principal** (siempre visible, `h-20`):
- **Brand (izq):** logo cuadrado dentro de un wrapper `bg-carbon` + nombre completo "Colegio Virgilio Medina" en `Cormorant Garamond`. En mobile (`<md`) el nombre se contrae a "C.V.M.".
  - Mientras no exista `/images/logo.png` se usa un placeholder externo: `https://placehold.co/120x120/0F0F0E/C9920A/png?text=CVM&font=playfair` (carbon + dorado, monograma "CVM").
- **Nav central (lg+):** links absolutamente centrados (`absolute left-1/2 -translate-x-1/2`) — Inicio · Nosotros · Niveles · Horarios · Inscripción · Galería · Contacto. Color `text-bone/85 hover:text-gold`.
- **Acción derecha:** botón pill dorado "Inscríbete" (`bg-gold text-carbon`, uppercase, tracking ancho) visible desde `md:`. En mobile, hamburguesa `Menu` (toggle del panel lateral).

**Comportamiento de scroll:**
- `scrolled === false`: header transparente, barra utilitaria visible.
- `scrolled === true`: `bg-carbon/95 + backdrop-blur-md + border-b dorado sutil + sombra`. Barra utilitaria colapsa.

**Menú mobile (`AnimatePresence`):**
- Overlay `bg-carbon/70 + backdrop-blur-sm` + panel deslizante desde la derecha (`x: 100% → 0`, `duration: 0.3`).
- Panel `w-80 bg-carbon` con: header (logo C.V.M. + botón cerrar `X`), nav vertical en `font-display text-2xl`, CTA "Inscríbete" pill dorada, footer con email + redes sociales.
- Bloqueo de scroll del body mientras el menú esté abierto.

**Animación de entrada:** `motion.header` con `y: -80 → 0` + `opacity: 0 → 1`, `duration: 0.5s`, `ease: easeOut`.

### 2.2 `Hero.tsx` — `client:load`

**Hero a pantalla completa estilo "campus inmersivo":** una sola sección con foto institucional de fondo, gradiente oscuro y contenido alineado a la izquierda.

**Estructura:**
- `<section>` con `min-h-[92vh]`, `bg-carbon`, `pt-32 pb-24 lg:pt-40 lg:pb-32`, `overflow-hidden`, `isolate`.
- **Capa 1 — imagen de fondo:** `<img src="https://picsum.photos/seed/colegio-campus/1920/1200" alt="" aria-hidden />` `absolute inset-0 -z-10 h-full w-full object-cover opacity-55`.
- **Capa 2 — gradiente lateral:** `bg-gradient-to-r from-carbon via-carbon/85 to-carbon/40` (lectura segura del texto sobre la izquierda).
- **Capa 3 — gradiente inferior:** banda inferior `bg-gradient-to-t from-carbon to-transparent` para fundir con la sección siguiente.
- **Contenido (max-w-3xl):**
  1. Kicker dorado en mayúsculas `tracking-[0.32em]` precedido de una raya dorada de 40px: "Colegio Virgilio Medina · Desde 2020".
  2. `<h1>` `font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-bone`: *"Educación con propósito, / **valores con carácter**"* (segunda línea en `text-gold`).
  3. Párrafo descriptivo `max-w-xl text-bone/75`.
  4. Lema en `font-display italic text-gold text-xl md:text-2xl`.
  5. Dos CTAs: `Button` primary "Conocer el colegio" + `Button` outline "Proceso de inscripción".

**Stat flotante (lg+ solamente):**
- Card absoluta en `right-6 bottom-10`, `bg-carbon-soft/90 + backdrop-blur + border border-gold/40`, con número `+850` en `font-display text-4xl text-gold` y etiqueta "Estudiantes activos".

**Animaciones (al montar — sin `useInView`, ya está sobre el viewport):**
1. Kicker → `fadeUp` delay 0s
2. h1 → `fadeUp` delay 0.1s
3. Subtítulo → `fadeUp` delay 0.2s
4. Lema → `fadeUp` delay 0.3s
5. CTAs (un único `motion.div`) → `fadeUp` delay 0.4s
6. Stat flotante → `scale: 0.85 → 1` + `y: 20 → 0` + opacity, delay 0.7s

### 2.3 Integrar en `index.astro`
Reemplazar comentarios de Navbar y Hero con los componentes reales (`<Navbar client:load />` y `<Hero client:load />`).

## ✅ Entregable
Navbar de dos pisos con barra utilitaria + main bar y comportamiento scroll. Hero a pantalla completa con foto + overlay + texto sobrepuesto y stat flotante. Primera impresión del sitio completa, en línea con la referencia institucional moderna.

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
- **+6** Años formando estudiantes
- **+850** Estudiantes activos
- **+60** Docentes titulados
- **12** Proyectos extracurriculares

Números en dorado `#C9920A`, etiqueta en blanco semitransparente. Cada número anima contando de 0 al valor real al entrar al viewport (`useMotionValue` + `animate`).

### 3.3 `AcademicLevels.tsx` — `client:visible` — fondo claro
Dos tabs con indicador activo dorado (estructura del sistema educativo venezolano):

**Primaria (1° a 6° grado)**
- Enfoque en lectoescritura, pensamiento lógico y valores
- Actividades: arte, música, deportes, lectura
- 3 características: Grupos pequeños · Docentes especializados · Ambientes lúdicos

**Bachillerato (1° a 5° año)**
- Profundización académica, formación científica y preparación universitaria
- Actividades: laboratorios, club de lectura, orientación vocacional, emprendimiento
- 3 características: Laboratorios y club de lectura · Orientación vocacional · Preuniversitario y proyecto de grado

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
Selector de nivel (Primaria / Bachillerato) en botones tipo tab.

| Nivel | Entrada | Salida | Recreo |
|-------|---------|--------|--------|
| Primaria | 7:00am | 12:30pm | 9:30am – 10:00am |
| Bachillerato | 6:45am | 2:00pm | 9:15am – 9:45am |

Mostrar también horario de atención de director de grupo.
**Animación:** tabla con `fade` al cambiar nivel.

### 4.2 `Subjects.tsx` — `client:visible` — fondo claro `#F9F6F0`
Selector de nivel que muestra grid de materias agrupadas por grado.

**Primaria (1°–6° grado):** Matemática, Lengua y Literatura, Ciencias Naturales, Ciencias Sociales, Inglés, Educación Física, Educación Artística, Educación en Valores, Computación, Religión

**Bachillerato (1°–5° año):** Matemática, Castellano y Literatura, Inglés, Biología, Química, Física, Geografía, Historia de Venezuela, Historia Universal, Educación Física, Educación Artística, Premilitar (4°–5°), Computación, Formación para el Trabajo

Cada grado: card con lista de materias. **Animación:** cards con stagger `fadeUp`.

### 4.3 `Enrollment.tsx` — `client:visible` — fondo oscuro `#0F0F0E`
Stepper vertical con los 7 pasos del proceso (requisitos reales del colegio, año escolar 2026-2027):

1. **Consulta de cupos** — Comunicarse con secretaría para verificar disponibilidad en el grado deseado
2. **Material de oficina** — Carpeta tamaño oficio marrón con gancho y 3 fundas tipo oficio
3. **Documentos del estudiante** — Copia de la cédula de identidad ampliada (centrada en la hoja), partida de nacimiento, 2 fotos tipo carnet y documentos probatorios de 6to grado. El estudiante debe asistir al momento de la inscripción
4. **Notas para 2° a 5° año** — Notas certificadas del año anterior junto a la constancia, certificado e histórico SIGE
5. **Documentos del representante** — Copia de la cédula de identidad ampliada de madre y padre, 2 fotos tipo carnet y número de celular con WhatsApp
6. **Casos especiales** — Estudios en el extranjero requieren notas certificadas y apostilladas. Si el representante no es padre o madre, presentar original de la "Autorización de Representación Escolar" (LOPNA)
7. **Inscripción y matrícula** — Diligenciar el formulario oficial, entrevista con coordinación académica (cita previa) y firma del contrato anual

Banner de período: **Año Escolar 2026 – 2027 · Inscripciones abiertas**
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
- `MapPin` — Calle 14 entre carreras 8 y 9, N° 8-05, Barrio Libertador, Santa Ana, Mun. Córdoba, Edo. Táchira
- `Phone` — (0276) 555-3478 | 0414 555 8290
- `Mail` — info@colegiovirgiliomedina.edu.ve
- `Clock` — Lunes a Viernes, 7:00am – 4:00pm
- Íconos de redes: TikTok (`https://www.tiktok.com/@u.e.colegio.virgi`)

**Derecha — Mapa:**
- Imagen placeholder `picsum.photos/seed/map/600/400` con pin SVG superpuesto, o iframe de Google Maps con coordenadas ficticias

**Animación:** info desde izquierda, mapa desde derecha.

### 5.4 `Footer.tsx` — fondo `#0F0F0E`
- Separador dorado ornamental en la parte superior
- Logo pequeño + nombre del colegio en `Cormorant Garamond`
- Links rápidos a todas las secciones (scroll suave con `href="#id"`)
- Íconos de redes sociales
- Copyright: `© 2026 Colegio Virgilio Medina. Todos los derechos reservados.`

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
