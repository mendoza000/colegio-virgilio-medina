-- Adds "Educación Inicial" (Maternal + Preescolar) as a third academic level,
-- ahead of Primaria and Bachillerato. Content is a reasonable institutional
-- draft — fully editable afterwards from /admin/academic-levels.

update academic_levels set order_index = 1 where slug = 'primaria';
update academic_levels set order_index = 2 where slug = 'bachillerato';

insert into academic_levels (id, slug, name, grades, description, image_url, order_index) values
  ('33333333-3333-3333-3333-333333333333', 'inicial', 'Educación Inicial', 'Maternal y Preescolar (2 a 6 años)',
   'Primer encuentro con la vida escolar: estimulación temprana, aprendizaje a través del juego y desarrollo socioemocional en un ambiente cálido y seguro. Sembramos las bases de la autonomía, el lenguaje y la convivencia que acompañarán a cada niña y niño en las siguientes etapas.',
   'https://picsum.photos/seed/cvm-inicial/800/600', 0);

insert into academic_level_features (level_id, icon, title, order_index) values
  ('33333333-3333-3333-3333-333333333333', 'Sprout', 'Estimulación temprana', 0),
  ('33333333-3333-3333-3333-333333333333', 'Smile', 'Aprendizaje a través del juego', 1),
  ('33333333-3333-3333-3333-333333333333', 'Heart', 'Docentes especializadas en primera infancia', 2);

insert into subjects (level_id, name, order_index) values
  ('33333333-3333-3333-3333-333333333333', 'Lenguaje y Comunicación', 0),
  ('33333333-3333-3333-3333-333333333333', 'Psicomotricidad', 1),
  ('33333333-3333-3333-3333-333333333333', 'Matemática Inicial', 2),
  ('33333333-3333-3333-3333-333333333333', 'Expresión Artística', 3),
  ('33333333-3333-3333-3333-333333333333', 'Valores y Convivencia', 4);
