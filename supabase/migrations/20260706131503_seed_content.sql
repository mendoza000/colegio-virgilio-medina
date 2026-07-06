-- Seeds every table with the copy currently hardcoded in the React
-- components, so the site isn't blank the first time it reads from Supabase.
-- Icon columns store lucide-react export names (resolved client-side via a
-- name -> component lookup map).

update site_settings set
  logo_url = 'https://placehold.co/120x120/0F0F0E/43A047/png?text=CVM&font=playfair',
  phone = '(0276) 766-8102',
  email = 'colegioprivadovirgiliomedinaramirez@gmail.com',
  address = 'Calle 14 entre carreras 8 y 9, N° 8-05, Barrio Libertador, Santa Ana, Mun. Córdoba, Edo. Táchira',
  slogan = 'Formando líderes con valores para el mundo',
  office_hours = 'Lunes a Viernes · 7:00 AM – 4:00 PM',
  map_embed_src = 'https://www.openstreetmap.org/export/embed.html?bbox=-72.275%2C7.560%2C-72.260%2C7.575&layer=mapnik&marker=7.5670%2C-72.2670'
where id = 1;

insert into section_headings (section_key, label, title, subtitle) values
  ('about', 'Nuestra institución', 'Una comunidad educativa joven, sólida y con propósito', 'Desde 2020, en Santa Ana del Táchira, acompañamos a niñas, niños y jóvenes en su formación académica y humana.'),
  ('stats', 'El Colegio en cifras', '', null),
  ('academic_levels', 'Oferta académica', 'Dos etapas, un mismo propósito', 'Acompañamos a cada estudiante desde la lectoescritura hasta el proyecto de vida que lo prepara para la universidad.'),
  ('schedules', 'Jornada escolar', 'Horarios institucionales', 'Una rutina clara para primaria y bachillerato, con tiempos de descanso y atención a representantes.'),
  ('subjects', 'Plan de estudios', 'Materias por nivel', 'Áreas que componen la formación académica de cada etapa.'),
  ('enrollment', 'Proceso de inscripción', 'Cómo formar parte del Colegio Virgilio Medina', 'Siete pasos para incorporar a tu representado a nuestra comunidad.'),
  ('gallery', 'Galería', 'Espacios que inspiran aprendizaje', 'Recorre los ambientes donde nuestros estudiantes viven la jornada escolar.'),
  ('testimonials', 'Comunidad C.V.M.', 'Lo que dicen nuestras familias', 'Voces de representantes que han confiado en nosotros la formación de sus hijos.'),
  ('contact', 'Contacto', 'Estamos cerca de ti', 'Visítanos, llámanos o escríbenos. Estaremos felices de recibirte en el Colegio Virgilio Medina.');

update about_content set
  mission = 'El Colegio Virgilio Medina Ramírez es una institución educativa privada, de media general que, inspirada en la Pedagogía Ignaciana, busca respetar y partir de los saberes previos de los estudiantes, reconociendo sus experiencias vitales al sentir y experimentar el mundo. Considerado este aspecto el punto de partida del proceso de enseñanza, se convierte en un centro de integración, innovación y atracción, donde el colegio, la familia y la comunidad impulsan con el educador una ética y una pedagogía del amor, reflexiva y con profundo contenido social.

Potenciamos en el estudiante la puesta en práctica de procesos cognitivos que lo lleven a aplicar «la razón, el corazón y las manos» en procura del perfil de egreso: «hombres y mujeres para los demás». Para ello, sumergimos al docente en una permanente capacitación que aplica una nueva metodología educativa transformadora, en armonía con las dimensiones del ser, hacer, conocer y convivir, en coherencia con su entorno social y familiar, en el marco de la idiosincrasia cordobense y santanense.',
  vision = 'El Colegio Virgilio Medina se visualiza como una institución educativa responsable y eficiente, con alto concepto en la calidad de los procesos de enseñanza en el marco del modelo pedagógico que aplica, el cual busca formar estudiantes integrales, con alto conocimiento de sí mismos y manifiestas habilidades cognitivas y procedimentales.

Buscamos colaborar con el papel que como ciudadano debe cumplir cada estudiante, en beneficio propio y del colectivo. De tal forma, nos convertimos en un referente educativo desde un enfoque distinto y propio, que colabora con la ejecución de los planes locales, regionales y nacionales, los cuales tienen como objetivo estratégico el desarrollo de la patria, Venezuela.',
  image_url = 'https://picsum.photos/seed/cvm-about/800/900'
where id = 1;

insert into about_values (icon, title, description, order_index) values
  ('BookOpen', 'Excelencia académica', 'Rigor, profundidad y curiosidad como base de cada clase.', 0),
  ('Heart', 'Formación en valores', 'Respeto, honestidad y empatía como brújula diaria.', 1),
  ('Sprout', 'Desarrollo integral', 'Cuidado del cuerpo, la mente y el espíritu en cada etapa.', 2),
  ('Users', 'Compromiso comunitario', 'Vínculo cercano entre familias, docentes y estudiantes.', 3);

insert into stats (prefix, target, label, is_hero_highlight, order_index) values
  ('+', 6, 'Años formando estudiantes', false, 0),
  ('+', 850, 'Estudiantes activos', true, 1),
  ('+', 60, 'Docentes titulados', false, 2),
  ('', 12, 'Proyectos extracurriculares', false, 3);

insert into academic_levels (id, slug, name, grades, description, image_url, order_index) values
  ('11111111-1111-1111-1111-111111111111', 'primaria', 'Primaria', '1° a 6° grado',
   'Formación de las bases con foco en lectoescritura, pensamiento lógico y valores. Acompañamiento cercano en cada paso del aprendizaje.',
   'https://picsum.photos/seed/cvm-primaria/800/600', 0),
  ('22222222-2222-2222-2222-222222222222', 'bachillerato', 'Bachillerato', '1° a 5° año',
   'Profundización académica, formación científica y preparación universitaria. Espacios para laboratorio, lectura, orientación vocacional y proyecto de vida.',
   'https://picsum.photos/seed/cvm-bachillerato/800/600', 1);

insert into academic_level_features (level_id, icon, title, order_index) values
  ('11111111-1111-1111-1111-111111111111', 'Users', 'Grupos pequeños', 0),
  ('11111111-1111-1111-1111-111111111111', 'Award', 'Docentes especializados', 1),
  ('11111111-1111-1111-1111-111111111111', 'Smile', 'Ambientes lúdicos', 2),
  ('22222222-2222-2222-2222-222222222222', 'FlaskConical', 'Laboratorios y club de lectura', 0),
  ('22222222-2222-2222-2222-222222222222', 'Compass', 'Orientación vocacional', 1),
  ('22222222-2222-2222-2222-222222222222', 'GraduationCap', 'Preuniversitario y proyecto de grado', 2);

insert into subjects (level_id, name, order_index) values
  ('11111111-1111-1111-1111-111111111111', 'Matemática', 0),
  ('11111111-1111-1111-1111-111111111111', 'Castellano', 1),
  ('11111111-1111-1111-1111-111111111111', 'Ciencias Naturales', 2),
  ('11111111-1111-1111-1111-111111111111', 'Geografía, Historia y Ciudadanía', 3),
  ('11111111-1111-1111-1111-111111111111', 'Inglés', 4),
  ('11111111-1111-1111-1111-111111111111', 'Educación Física', 5),
  ('11111111-1111-1111-1111-111111111111', 'Arte y Patrimonio', 6),
  ('11111111-1111-1111-1111-111111111111', 'Orientación', 7),
  ('11111111-1111-1111-1111-111111111111', 'Grupo de Creación, Recreación y Producción (G.C.R.P.)', 8),
  ('22222222-2222-2222-2222-222222222222', 'Matemática', 0),
  ('22222222-2222-2222-2222-222222222222', 'Castellano', 1),
  ('22222222-2222-2222-2222-222222222222', 'Inglés', 2),
  ('22222222-2222-2222-2222-222222222222', 'Biología', 3),
  ('22222222-2222-2222-2222-222222222222', 'Química', 4),
  ('22222222-2222-2222-2222-222222222222', 'Física', 5),
  ('22222222-2222-2222-2222-222222222222', 'Geografía, Historia y Ciudadanía', 6),
  ('22222222-2222-2222-2222-222222222222', 'Educación Física', 7),
  ('22222222-2222-2222-2222-222222222222', 'Orientación', 8),
  ('22222222-2222-2222-2222-222222222222', 'Grupo de Creación, Recreación y Producción (G.C.R.P.)', 9),
  ('22222222-2222-2222-2222-222222222222', 'Formación para la Soberanía Nacional (F.S.N.)', 10);

insert into schedule_rows (icon, label, value, aside, order_index) values
  ('LogIn', 'Entrada', '7:00 AM', null, 0),
  ('Coffee', 'Primer receso', '8:20 – 8:30 AM', null, 1),
  ('Coffee', 'Segundo receso', '11:10 – 11:20 AM', null, 2),
  ('LogOut', 'Salida', '12:40 PM', null, 3),
  ('UserCog', 'Atención de coordinación académica', '1:00 – 4:00 PM', 'Lun a viernes', 4);

insert into extracurricular_activities (activity, day, time_range, order_index) values
  ('Coro', 'Martes', '2:30 – 3:30 PM', 0),
  ('Cuatro y guitarra', 'Martes', '3:30 – 4:40 PM', 1),
  ('Piano', 'Miércoles', '2:30 – 3:30 PM', 2),
  ('Instrumento de viento', 'Miércoles', '2:30 – 4:40 PM', 3),
  ('Banda Show', 'Jueves', '2:30 – 4:40 PM', 4),
  ('Danza', 'Por confirmar', 'Consultar disponibilidad en secretaría', 5);

insert into enrollment_steps (title, description, order_index) values
  ('Consulta de cupos', 'Comunicarse con secretaría para verificar disponibilidad en el grado deseado.', 0),
  ('Material de oficina', 'Carpeta tamaño oficio marrón con gancho y 3 fundas tipo oficio.', 1),
  ('Documentos del estudiante', 'Copia de la cédula de identidad ampliada (centrada en la hoja), partida de nacimiento, 2 fotos tipo carnet y documentos probatorios de 6to grado. El estudiante debe asistir al momento de la inscripción.', 2),
  ('Notas para 2° a 5° año', 'Quienes ingresan a estos grados deben anexar las notas certificadas del año anterior junto a la constancia, certificado e histórico SIGE.', 3),
  ('Documentos del representante', 'Copia de la cédula de identidad ampliada de madre y padre, 2 fotos tipo carnet y número de celular con WhatsApp.', 4),
  ('Casos especiales', 'Estudios en el extranjero requieren notas certificadas y apostilladas. Si el representante no es padre o madre, presentar original de la «Autorización de Representación Escolar» (LOPNA).', 5),
  ('Inscripción y matrícula', 'Diligenciar el formulario oficial, entrevista con coordinación académica (con cita previa) y firma del contrato anual.', 6);

update enrollment_settings set
  school_year_badge = 'Año Escolar 2026 – 2027 · Inscripciones abiertas',
  form_pdf_url = null
where id = 1;

-- storage_path values assume matching files get uploaded to the 'gallery'
-- bucket (they currently live under /public/images/gallery/*.jpg as local
-- static assets, not yet in Supabase Storage) — re-upload via the admin
-- panel in Phase 3 to make these resolve.
insert into gallery_images (storage_path, caption, order_index) values
  ('fachada.jpg', 'Fachada principal', 0),
  ('aulas.jpg', 'Aulas de clase', 1),
  ('deportes.jpg', 'Cancha deportiva', 2),
  ('laboratorio.jpg', 'Laboratorio de ciencias', 3),
  ('informatica.jpg', 'Sala de informática', 4),
  ('cantina.jpg', 'Cantina escolar', 5),
  ('direccion.jpg', 'Dirección', 6),
  ('institucional.jpg', 'Espacio institucional', 7);

insert into testimonials (quote, name, role, avatar_url, order_index) values
  ('Excelente institución, mis hijos han crecido mucho en valores y académicamente.', 'María González', 'Madre · Estudiante de 1° año', 'https://picsum.photos/seed/maria-gonzalez/120/120', 0),
  ('Los docentes son muy comprometidos y el ambiente es muy sano para los niños.', 'Carlos Herrera', 'Padre · Estudiante de 3° grado', 'https://picsum.photos/seed/carlos-herrera/120/120', 1),
  ('El proceso de inscripción fue muy fácil y la atención del personal es inmejorable.', 'Luisa Martínez', 'Madre · Estudiante de 4° año', 'https://picsum.photos/seed/luisa-martinez/120/120', 2),
  ('Mi hija entró en primer grado y ya está en cuarto año. Nunca la cambiaríamos de colegio.', 'Andrés Ospina', 'Padre de familia', 'https://picsum.photos/seed/andres-ospina/120/120', 3),
  ('La formación en valores que reciben aquí no la encuentras en ningún otro lado.', 'Patricia Ruiz', 'Madre de gemelos · 5° grado', 'https://picsum.photos/seed/patricia-ruiz/120/120', 4);
