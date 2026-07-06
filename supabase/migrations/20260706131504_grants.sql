-- RLS policies only filter rows; PostgreSQL still requires schema-level
-- GRANTs before 'anon'/'authenticated' can touch a table at all. Without
-- this, every request fails with "permission denied" regardless of RLS.

grant usage on schema public to anon, authenticated, service_role;

grant select on
  site_settings, section_headings, about_content, about_values, stats,
  academic_levels, academic_level_features, subjects, schedule_rows,
  extracurricular_activities, enrollment_steps, enrollment_settings,
  gallery_images, testimonials
to anon, authenticated;

grant insert, update, delete on
  site_settings, section_headings, about_content, about_values, stats,
  academic_levels, academic_level_features, subjects, schedule_rows,
  extracurricular_activities, enrollment_steps, enrollment_settings,
  gallery_images, testimonials
to authenticated;

-- service_role bypasses RLS but PostgreSQL still requires the base GRANT
-- before it can touch a table at all (used by src/lib/supabase-server.ts's
-- admin client inside /api/admin/* for privileged Storage-linked writes).
grant select, insert, update, delete on
  site_settings, section_headings, about_content, about_values, stats,
  academic_levels, academic_level_features, subjects, schedule_rows,
  extracurricular_activities, enrollment_steps, enrollment_settings,
  gallery_images, testimonials
to service_role;
