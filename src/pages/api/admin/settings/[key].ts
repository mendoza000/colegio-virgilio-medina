import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "../../../../lib/supabase-server";

// Allow-list of singleton (id = 1) settings tables and their writable columns.
const SETTINGS: Record<string, string[]> = {
  site_settings: ["logo_url", "phone", "email", "address", "slogan", "office_hours", "map_embed_src"],
  about_content: ["mission", "vision", "image_url"],
  enrollment_settings: ["school_year_badge", "form_pdf_url"],
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export const PATCH: APIRoute = async ({ params, request }) => {
  const columns = SETTINGS[params.key ?? ""];
  if (!columns) return json({ error: "Configuración no permitida" }, 404);

  const body = await request.json();
  const updates: Record<string, unknown> = {};
  for (const col of columns) {
    if (col in body) updates[col] = body[col];
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from(params.key as string).update(updates).eq("id", 1);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
