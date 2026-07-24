# Manual de usuario — Panel de administración

Guía para el personal del Colegio Virgilio Medina que va a mantener actualizado el contenido de la página web desde el panel de administración (`/admin`).

No es necesario saber programación para usar este panel. Este manual explica, sección por sección, qué se puede editar y cómo hacerlo.

## Cómo funciona (leer antes de empezar)

- **Los cambios se ven de inmediato.** Apenas guardás un cambio, ya está publicado en la página del colegio — no hace falta "publicar" nada aparte ni esperar. Basta con recargar la página pública para verlo.
- **Eliminar es inmediato y no pide confirmación.** Al hacer clic en el ícono de basura de cualquier lista o foto, el elemento se borra al instante, sin un mensaje de "¿estás seguro?". Prestá atención antes de eliminar.
- **Reordenar** los elementos de una lista se hace con las flechas ↑ y ↓ (solo se puede mover un elemento con el que está justo al lado, no hay arrastrar y soltar).
- Cualquier cuenta con acceso al panel tiene permiso para editar **todo** el contenido — no hay roles ni permisos distintos entre usuarios.
- Si necesitás una cuenta nueva o recuperar una contraseña, esa gestión no se hace desde este panel — hay que pedirlo a la persona encargada de la parte técnica.

## Ingresar al panel

1. Entrá a `/admin/login` (por ejemplo `https://[dominio-del-colegio]/admin/login`).
2. Escribí tu correo electrónico y contraseña, y presioná el botón de ingreso.
3. Si los datos son incorrectos, vas a ver un mensaje de error genérico (no indica si el problema es el correo o la contraseña, por seguridad).
4. Una vez adentro, vas a ver el panel principal con accesos directos a cada sección.
5. Para salir, usá el botón **"Cerrar sesión"**.

## El menú del panel

El menú lateral (o superior, en el celular) tiene estas secciones, en este orden:

1. Galería
2. Datos generales, logo y contacto
3. Nosotros
4. Niveles académicos
5. El colegio en cifras
6. Materias
7. Horarios y extracurriculares
8. Inscripción

> **Importante**: este orden del menú **no es el mismo orden** en que las secciones aparecen en la página pública del colegio. Por ejemplo, "Galería" es la primera opción del menú pero en la página pública aparece casi al final. No te confundas si buscás algo por su posición en la web — buscalo por su nombre en el menú.

## Tipos de formularios que vas a encontrar

Para no repetir la misma explicación en cada sección, hay dos tipos de pantalla que se repiten:

- **Listas editables** (por ejemplo Materias, Horarios, Valores institucionales): una tabla con filas. Cada fila tiene botones para subir ↑, bajar ↓, editar (lápiz) y eliminar (basura). El botón "Agregar…" abre una ventana con un formulario para cargar un elemento nuevo.
- **Formularios simples**: una sola pantalla con campos de texto y un botón **"Guardar cambios"**. Al guardar exitosamente aparece un mensaje "Guardado." en verde; si algo falla, aparece un mensaje de error en rojo.

Casi todas las secciones también tienen, arriba de todo, un formulario simple para el **encabezado de la sección** (Etiqueta, Título y Subtítulo) que se ve en la página pública justo antes del contenido de esa sección.

---

## 1. Galería

**Menú → Galería**

Acá se administran las fotos que aparecen en la sección de galería de la página pública.

- Editá primero el encabezado de la sección (Etiqueta, Título, Subtítulo) si hace falta.
- Para **agregar una foto**: presioná "Subir foto", elegí el archivo de imagen desde tu computadora o celular, escribí una descripción (opcional) y confirmá. La foto se sube automáticamente.
- Para **editar una foto existente**: podés cambiar la descripción, pero **no podés reemplazar la imagen** — si querés cambiar la foto, eliminá esa entrada y subí una nueva.
- Para **reordenar** las fotos, usá las flechas ↑ y ↓ de cada fila.
- Para **eliminar** una foto, presioná el ícono de basura — se borra al instante, sin confirmación.

## 2. Datos generales, logo y contacto

**Menú → Datos generales, logo y contacto**

Acá se edita todo lo relacionado a la identidad del colegio y los datos de contacto:

- **Logo**: subí el archivo de imagen del logo. Al subir uno nuevo, reemplaza automáticamente al anterior (no queda guardada una versión anterior).
- **Lema institucional**: la frase que aparece en la portada (Hero) de la página principal.
- **Teléfono**, **Correo electrónico**, **Dirección**, **Horario de atención**: datos de contacto que aparecen en la sección de Contacto.
- **URL del mapa**: el enlace de inserción (embed) de OpenStreetMap que muestra el mapa de ubicación del colegio en la sección de Contacto.
- **Redes sociales**: lista editable de enlaces (Facebook, Instagram, etc.). Para cada uno elegís un ícono de la plataforma, escribís una etiqueta y pegás el enlace.
- **Encabezado de la sección Contacto**: Etiqueta, Título y Subtítulo de esa sección.

## 3. Nosotros

**Menú → Nosotros**

- **Encabezado de la sección**.
- **Misión** y **Visión**: texto libre.
- **Imagen**: la foto que acompaña esta sección en la página pública.
- **Valores institucionales**: lista editable. Cada valor tiene un ícono (elegido con el selector visual de íconos), un título y una descripción.

## 4. Niveles académicos

**Menú → Niveles académicos**

- **Encabezado de la sección**.
- **Lista de niveles académicos** (por ejemplo Educación Inicial, Primaria, Bachillerato): podés agregar, reordenar y eliminar niveles completos. Cada nivel tiene un identificador único (slug), un nombre, los grados que incluye y una descripción.
- Para cada nivel académico, además, podés editar:
  - Su **imagen** propia.
  - Sus **puntos destacados**: una lista con ícono y título (por ejemplo, características especiales de ese nivel).

## 5. El colegio en cifras

**Menú → El colegio en cifras**

Lista editable de las cifras que se muestran como contador en la página pública (por ejemplo cantidad de estudiantes, años de trayectoria). Para cada cifra se define:

- Un prefijo opcional (por ejemplo "+").
- El número (cifra).
- Una descripción corta debajo del número.

> Esta es la única sección que **no tiene** un formulario de encabezado editable (Etiqueta/Título/Subtítulo) — solo la lista de cifras.

## 6. Materias

**Menú → Materias**

- **Encabezado de la sección**.
- Debajo vas a ver una lista de materias **separada por cada nivel académico**. Agregá, editá, reordená o eliminá materias dentro de la lista del nivel correspondiente.

## 7. Horarios y extracurriculares

**Menú → Horarios y extracurriculares**

- **Encabezado de la sección**.
- **Jornada escolar**: lista editable con ícono, etiqueta, horario y una nota opcional (por ejemplo, para aclarar algo puntual de ese horario).
- **Actividades extracurriculares**: lista editable con el nombre de la actividad, el día y el horario.

## 8. Inscripción

**Menú → Inscripción**

- **Encabezado de la sección**.
- **Año escolar**: el texto que aparece como distintivo (por ejemplo "Inscripciones 2026-2027").
- **Formulario de inscripción (PDF)**: subí el archivo PDF que los interesados van a poder descargar desde la página pública. Si ya hay uno cargado, vas a ver un enlace "Ver documento actual" para revisarlo antes de reemplazarlo. Al subir uno nuevo, reemplaza automáticamente al anterior.
- **Pasos del proceso**: lista editable con título y descripción de cada paso de inscripción.

---

## El selector de íconos

En varios formularios (Valores institucionales, Jornada escolar, Puntos destacados de niveles, Redes sociales) vas a ver un botón que muestra el ícono elegido. Al hacer clic, se despliega una grilla con todos los íconos disponibles — hacé clic en el que quieras usar y la grilla se cierra sola. Pasando el mouse sobre cada ícono aparece su nombre.

## Contenido que NO se edita desde el panel

- **Testimonios**: los testimonios que aparecen en la página pública son fijos y no tienen pantalla de edición en este panel. Cambiarlos requiere modificar el código del sitio.
- **Portada (Hero)**: solo el "Lema institucional" (editable en Datos generales) se refleja ahí; el resto del contenido de la portada es fijo.

## Precauciones al subir archivos

- Para imágenes se aceptan los formatos habituales (JPG, PNG, WEBP, etc.); para el formulario de inscripción solo se acepta PDF.
- El sistema no avisa si un archivo es demasiado pesado antes de subirlo — si la subida falla o tarda mucho, probá con un archivo más liviano.
- Reemplazar una imagen o un PDF sobreescribe el archivo anterior: no queda un historial de versiones anteriores. Si no estás seguro, guardá una copia del archivo original en tu computadora antes de reemplazarlo.
