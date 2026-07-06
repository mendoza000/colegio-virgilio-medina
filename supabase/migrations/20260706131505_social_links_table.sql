-- Social links move out of site_settings.social_links (jsonb) into a real
-- table so they're editable with the same ListEditor pattern as everything
-- else, instead of a raw JSON textarea.

create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  href text not null,
  order_index int not null default 0
);

alter table social_links enable row level security;

create policy "social_links_public_read" on social_links for select using (true);
create policy "social_links_admin_write" on social_links for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select on social_links to anon, authenticated;
grant insert, update, delete on social_links to authenticated;
grant select, insert, update, delete on social_links to service_role;

insert into social_links (platform, label, href, order_index) values
  ('facebook', 'Facebook', 'https://www.facebook.com/profile.php?id=100086925978400', 0),
  ('tiktok', 'TikTok', 'https://www.tiktok.com/@u.e.colegio.virgi', 1);

alter table site_settings drop column social_links;
