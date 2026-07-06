import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "../../../lib/supabase-server";

const TARGETS: Record<string, { path: string; table: string; column: string }> = {
  logo: { path: "logo", table: "site_settings", column: "logo_url" },
  enrollment_form: { path: "formulario-inscripcion", table: "enrollment_settings", column: "form_pdf_url" },
};

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("file");
  const targetKey = String(form.get("target") ?? "");
  const target = TARGETS[targetKey];

  if (!(file instanceof File) || !target) {
    return new Response(JSON.stringify({ error: "Archivo o destino inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createSupabaseAdminClient();
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${target.path}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("branding")
    .upload(path, file, { contentType: file.type, upsert: true });

  if (uploadError) {
    return new Response(JSON.stringify({ error: uploadError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const publicUrl = supabase.storage.from("branding").getPublicUrl(path).data.publicUrl;

  const { error: updateError } = await supabase
    .from(target.table)
    .update({ [target.column]: publicUrl })
    .eq("id", 1);

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ url: publicUrl }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
