import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "../../../../lib/supabase-server";

// Allow-list of tables this generic CRUD route is permitted to touch, and
// which columns a client may write. `scoped: true` tables require a
// `level_id` (query param on GET, body field on POST).
const TABLES: Record<string, { columns: string[]; scoped?: boolean; numberColumns?: string[] }> = {
  subjects: { columns: ["name"], scoped: true },
  schedule_rows: { columns: ["icon", "label", "value", "aside"] },
  extracurricular_activities: { columns: ["activity", "day", "time_range"] },
  enrollment_steps: { columns: ["title", "description"] },
  about_values: { columns: ["icon", "title", "description"] },
  academic_level_features: { columns: ["icon", "title"], scoped: true },
  academic_levels: { columns: ["slug", "name", "grades", "description", "image_url"] },
  social_links: { columns: ["platform", "label", "href"] },
  stats: { columns: ["prefix", "target", "label"], numberColumns: ["target"] },
};

function coerce(config: { numberColumns?: string[] }, col: string, value: unknown) {
  if (config.numberColumns?.includes(col)) return Number(value ?? 0);
  return value ?? "";
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export const GET: APIRoute = async ({ params, url }) => {
  const config = TABLES[params.table ?? ""];
  if (!config) return json({ error: "Tabla no permitida" }, 404);

  const supabase = createSupabaseAdminClient();
  let query = supabase.from(params.table as string).select("*").order("order_index", { ascending: true });

  const levelId = url.searchParams.get("level_id");
  if (config.scoped && levelId) query = query.eq("level_id", levelId);

  const { data, error } = await query;
  if (error) return json({ error: error.message }, 500);
  return json(data);
};

export const POST: APIRoute = async ({ params, request }) => {
  const config = TABLES[params.table ?? ""];
  if (!config) return json({ error: "Tabla no permitida" }, 404);

  const body = await request.json();
  const supabase = createSupabaseAdminClient();

  const payload: Record<string, unknown> = {};
  for (const col of config.columns) payload[col] = coerce(config, col, body[col]);
  if (config.scoped) {
    if (!body.level_id) return json({ error: "level_id requerido" }, 400);
    payload.level_id = body.level_id;
  }

  const { data: existing } = await supabase
    .from(params.table as string)
    .select("order_index")
    .order("order_index", { ascending: false })
    .limit(1);
  payload.order_index = existing?.[0] ? (existing[0].order_index as number) + 1 : 0;

  const { data, error } = await supabase.from(params.table as string).insert(payload).select().single();
  if (error) return json({ error: error.message }, 500);
  return json(data, 201);
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const config = TABLES[params.table ?? ""];
  if (!config) return json({ error: "Tabla no permitida" }, 404);

  const { id, ...fields } = await request.json();
  if (!id) return json({ error: "id requerido" }, 400);

  const updates: Record<string, unknown> = {};
  for (const col of [...config.columns, "order_index"]) {
    if (col in fields) updates[col] = coerce(config, col, fields[col]);
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from(params.table as string).update(updates).eq("id", id);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const config = TABLES[params.table ?? ""];
  if (!config) return json({ error: "Tabla no permitida" }, 404);

  const { id } = await request.json();
  if (!id) return json({ error: "id requerido" }, 400);

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from(params.table as string).delete().eq("id", id);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
