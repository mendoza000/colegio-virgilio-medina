import { createClient } from "@supabase/supabase-js";

// Plain anon-key client for public reads (index.astro frontmatter, no auth/session involved).
const db = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export type GalleryImage = {
  id: string;
  src: string;
  caption: string;
  order_index: number;
};

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await db
    .from("gallery_images")
    .select("id, storage_path, caption, order_index")
    .order("order_index", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    src: db.storage.from("gallery").getPublicUrl(row.storage_path).data.publicUrl,
    caption: row.caption,
    order_index: row.order_index,
  }));
}

export type SiteSettings = {
  logo_url: string;
  phone: string;
  email: string;
  address: string;
  slogan: string;
  office_hours: string;
  map_embed_src: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await db.from("site_settings").select("*").eq("id", 1).single();
  return {
    logo_url: data?.logo_url ?? "",
    phone: data?.phone ?? "",
    email: data?.email ?? "",
    address: data?.address ?? "",
    slogan: data?.slogan ?? "",
    office_hours: data?.office_hours ?? "",
    map_embed_src: data?.map_embed_src ?? "",
  };
}

export type SocialLink = { id: string; platform: string; label: string; href: string };

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data } = await db
    .from("social_links")
    .select("id, platform, label, href")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export type SectionHeading = { label: string; title: string; subtitle: string | null };

export async function getSectionHeadings(): Promise<Record<string, SectionHeading>> {
  const { data } = await db.from("section_headings").select("section_key, label, title, subtitle");
  const map: Record<string, SectionHeading> = {};
  for (const row of data ?? []) {
    map[row.section_key] = { label: row.label, title: row.title, subtitle: row.subtitle };
  }
  return map;
}

export type AboutValue = { id: string; icon: string; title: string; description: string };

export async function getAboutContent() {
  const { data } = await db.from("about_content").select("*").eq("id", 1).single();
  return {
    mission: data?.mission ?? "",
    vision: data?.vision ?? "",
    image_url: data?.image_url ?? "",
  };
}

export async function getAboutValues(): Promise<AboutValue[]> {
  const { data } = await db
    .from("about_values")
    .select("id, icon, title, description")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export type AcademicLevelFeature = { id: string; icon: string; title: string };
export type AcademicLevel = {
  id: string;
  slug: string;
  name: string;
  grades: string;
  description: string;
  image_url: string;
  features: AcademicLevelFeature[];
};

export async function getAcademicLevels(): Promise<AcademicLevel[]> {
  const { data: levels } = await db
    .from("academic_levels")
    .select("id, slug, name, grades, description, image_url")
    .order("order_index", { ascending: true });

  const { data: features } = await db
    .from("academic_level_features")
    .select("id, level_id, icon, title")
    .order("order_index", { ascending: true });

  return (levels ?? []).map((level) => ({
    ...level,
    features: (features ?? [])
      .filter((f) => f.level_id === level.id)
      .map(({ id, icon, title }) => ({ id, icon, title })),
  }));
}

export type Subject = { id: string; name: string };

export async function getSubjectsByLevel(): Promise<Record<string, Subject[]>> {
  const { data: levels } = await db.from("academic_levels").select("id, slug");
  const { data: subjects } = await db
    .from("subjects")
    .select("id, level_id, name")
    .order("order_index", { ascending: true });

  const bySlug: Record<string, Subject[]> = {};
  for (const level of levels ?? []) {
    bySlug[level.slug] = (subjects ?? [])
      .filter((s) => s.level_id === level.id)
      .map(({ id, name }) => ({ id, name }));
  }
  return bySlug;
}

export type ScheduleRow = { id: string; icon: string; label: string; value: string; aside: string | null };

export async function getScheduleRows(): Promise<ScheduleRow[]> {
  const { data } = await db
    .from("schedule_rows")
    .select("id, icon, label, value, aside")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export type ExtracurricularActivity = { id: string; activity: string; day: string; time_range: string };

export async function getExtracurricularActivities(): Promise<ExtracurricularActivity[]> {
  const { data } = await db
    .from("extracurricular_activities")
    .select("id, activity, day, time_range")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export type EnrollmentStep = { id: string; title: string; description: string };

export async function getEnrollmentSteps(): Promise<EnrollmentStep[]> {
  const { data } = await db
    .from("enrollment_steps")
    .select("id, title, description")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export type Stat = { id: string; prefix: string; target: number; label: string };

export async function getStats(): Promise<Stat[]> {
  const { data } = await db
    .from("stats")
    .select("id, prefix, target, label")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export async function getEnrollmentSettings() {
  const { data } = await db.from("enrollment_settings").select("*").eq("id", 1).single();
  return {
    school_year_badge: data?.school_year_badge ?? "",
    form_pdf_url: data?.form_pdf_url ?? null,
  };
}
