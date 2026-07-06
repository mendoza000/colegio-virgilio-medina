-- Every content table is publicly readable (the landing page has no auth)
-- and writable only by the single authenticated admin account.

alter table site_settings enable row level security;
alter table section_headings enable row level security;
alter table about_content enable row level security;
alter table about_values enable row level security;
alter table stats enable row level security;
alter table academic_levels enable row level security;
alter table academic_level_features enable row level security;
alter table subjects enable row level security;
alter table schedule_rows enable row level security;
alter table extracurricular_activities enable row level security;
alter table enrollment_steps enable row level security;
alter table enrollment_settings enable row level security;
alter table gallery_images enable row level security;
alter table testimonials enable row level security;

create policy "site_settings_public_read" on site_settings for select using (true);
create policy "site_settings_admin_write" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "section_headings_public_read" on section_headings for select using (true);
create policy "section_headings_admin_write" on section_headings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "about_content_public_read" on about_content for select using (true);
create policy "about_content_admin_write" on about_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "about_values_public_read" on about_values for select using (true);
create policy "about_values_admin_write" on about_values for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "stats_public_read" on stats for select using (true);
create policy "stats_admin_write" on stats for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "academic_levels_public_read" on academic_levels for select using (true);
create policy "academic_levels_admin_write" on academic_levels for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "academic_level_features_public_read" on academic_level_features for select using (true);
create policy "academic_level_features_admin_write" on academic_level_features for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "subjects_public_read" on subjects for select using (true);
create policy "subjects_admin_write" on subjects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "schedule_rows_public_read" on schedule_rows for select using (true);
create policy "schedule_rows_admin_write" on schedule_rows for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "extracurricular_activities_public_read" on extracurricular_activities for select using (true);
create policy "extracurricular_activities_admin_write" on extracurricular_activities for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "enrollment_steps_public_read" on enrollment_steps for select using (true);
create policy "enrollment_steps_admin_write" on enrollment_steps for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "enrollment_settings_public_read" on enrollment_settings for select using (true);
create policy "enrollment_settings_admin_write" on enrollment_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "gallery_images_public_read" on gallery_images for select using (true);
create policy "gallery_images_admin_write" on gallery_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "testimonials_public_read" on testimonials for select using (true);
create policy "testimonials_admin_write" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
