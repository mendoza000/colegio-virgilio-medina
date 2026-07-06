import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "../../../../lib/supabase-server";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export const PATCH: APIRoute = async ({ params, request }) => {
  const { label, title, subtitle } = await request.json();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("section_headings")
    .update({ label, title, subtitle })
    .eq("section_key", params.section);

  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
