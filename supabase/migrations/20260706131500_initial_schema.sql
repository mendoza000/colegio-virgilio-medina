-- Content tables backing the admin panel. Every public-facing section of the
-- landing page reads from one (or more) of these tables instead of hardcoded
-- constants in the React components.

create extension if not exists "pgcrypto";

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- site_settings: singleton. Collapses the phone/email/address/logo/slogan
-- duplication that currently exists across Navbar, Footer, Hero and Contact.
-- ============================================================
create table site_settings (
  id smallint primary key default 1 check (id = 1),
  logo_url text not null default '',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  slogan text not null default '',
  social_links jsonb not null default '[]',
  office_hours text not null default '',
  map_embed_src text not null default '',
  updated_at timestamptz not null default now()
);
insert into site_settings (id) values (1);
create trigger trg_site_settings_updated before update on site_settings
  for each row execute function set_updated_at();

-- ============================================================
-- section_headings: label/title/subtitle per section (SectionTitle props)
-- ============================================================
create table section_headings (
  section_key text primary key,
  label text not null default '',
  title text not null default '',
  subtitle text,
  updated_at timestamptz not null default now()
);
create trigger trg_section_headings_updated before update on section_headings
  for each row execute function set_updated_at();

-- ============================================================
-- about_content: mission/vision paragraphs + hero image (singleton)
-- ============================================================
create table about_content (
  id smallint primary key default 1 check (id = 1),
  mission text not null default '',
  vision text not null default '',
  image_url text not null default '',
  updated_at timestamptz not null default now()
);
insert into about_content (id) values (1);
create trigger trg_about_content_updated before update on about_content
  for each row execute function set_updated_at();

create table about_values (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title text not null check (char_length(title) > 0),
  description text not null check (char_length(description) > 0),
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- stats: numeric stats shown in Stats.tsx; is_hero_highlight marks the one
-- also mirrored in Hero.tsx's floating badge, so both read the same row.
-- ============================================================
create table stats (
  id uuid primary key default gen_random_uuid(),
  prefix text not null default '',
  target int not null check (target >= 0),
  label text not null check (char_length(label) > 0),
  is_hero_highlight boolean not null default false,
  order_index int not null default 0
);

-- ============================================================
-- academic_levels: Primaria / Bachillerato
-- ============================================================
create table academic_levels (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  grades text not null default '',
  description text not null,
  image_url text not null default '',
  order_index int not null default 0
);

create table academic_level_features (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references academic_levels(id) on delete cascade,
  icon text not null,
  title text not null check (char_length(title) > 0),
  order_index int not null default 0
);

-- ============================================================
-- subjects: flat lists keyed by academic level
-- ============================================================
create table subjects (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references academic_levels(id) on delete cascade,
  name text not null check (char_length(name) > 0),
  order_index int not null default 0
);

-- ============================================================
-- schedule_rows: institutional schedule (entrada, recesos, salida, etc.)
-- ============================================================
create table schedule_rows (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  label text not null,
  value text not null,
  aside text,
  order_index int not null default 0
);

-- ============================================================
-- extracurricular_activities: afternoon workshops (music, dance, etc.)
-- ============================================================
create table extracurricular_activities (
  id uuid primary key default gen_random_uuid(),
  activity text not null check (char_length(activity) > 0),
  day text not null,
  time_range text not null,
  order_index int not null default 0
);

-- ============================================================
-- enrollment_steps + enrollment_settings
-- ============================================================
create table enrollment_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) > 0),
  description text not null check (char_length(description) > 0),
  order_index int not null default 0
);

create table enrollment_settings (
  id smallint primary key default 1 check (id = 1),
  school_year_badge text not null default '',
  form_pdf_url text,
  updated_at timestamptz not null default now()
);
insert into enrollment_settings (id) values (1);
create trigger trg_enrollment_settings_updated before update on enrollment_settings
  for each row execute function set_updated_at();

-- ============================================================
-- gallery_images
-- ============================================================
create table gallery_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  caption text not null default '',
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- testimonials: schema ready, no admin UI wired up in the first pass
-- ============================================================
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null check (char_length(quote) > 0),
  name text not null,
  role text not null,
  avatar_url text not null default '',
  order_index int not null default 0
);
