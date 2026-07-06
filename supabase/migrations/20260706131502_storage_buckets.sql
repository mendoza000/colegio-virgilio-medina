-- Storage buckets: 'gallery' holds gallery photos, 'branding' holds the
-- school logo and (later) the enrollment form PDF. Both public-read.

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('branding', 'branding', true)
on conflict (id) do nothing;

create policy "gallery_public_read" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "gallery_admin_insert" on storage.objects
  for insert with check (bucket_id = 'gallery' and auth.role() = 'authenticated');
create policy "gallery_admin_update" on storage.objects
  for update using (bucket_id = 'gallery' and auth.role() = 'authenticated');
create policy "gallery_admin_delete" on storage.objects
  for delete using (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "branding_public_read" on storage.objects
  for select using (bucket_id = 'branding');
create policy "branding_admin_insert" on storage.objects
  for insert with check (bucket_id = 'branding' and auth.role() = 'authenticated');
create policy "branding_admin_update" on storage.objects
  for update using (bucket_id = 'branding' and auth.role() = 'authenticated');
create policy "branding_admin_delete" on storage.objects
  for delete using (bucket_id = 'branding' and auth.role() = 'authenticated');
