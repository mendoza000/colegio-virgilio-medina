import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "../../../lib/supabase-server";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("file");
  const caption = String(form.get("caption") ?? "");

  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: "Archivo requerido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createSupabaseAdminClient();
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return new Response(JSON.stringify({ error: uploadError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: existing } = await supabase
    .from("gallery_images")
    .select("order_index")
    .order("order_index", { ascending: false })
    .limit(1);

  const nextOrder = existing?.[0] ? existing[0].order_index + 1 : 0;

  const { data: inserted, error: insertError } = await supabase
    .from("gallery_images")
    .insert({ storage_path: path, caption, order_index: nextOrder })
    .select("id, storage_path, caption, order_index")
    .single();

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const publicUrl = supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;

  return new Response(
    JSON.stringify({ id: inserted.id, src: publicUrl, caption: inserted.caption, order_index: inserted.order_index }),
    { status: 201, headers: { "Content-Type": "application/json" } },
  );
};

export const PATCH: APIRoute = async ({ request }) => {
  const { id, caption, order_index } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "id requerido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createSupabaseAdminClient();
  const updates: Record<string, unknown> = {};
  if (typeof caption === "string") updates.caption = caption;
  if (typeof order_index === "number") updates.order_index = order_index;

  const { error } = await supabase.from("gallery_images").update(updates).eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "id requerido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createSupabaseAdminClient();
  const { data: row } = await supabase
    .from("gallery_images")
    .select("storage_path")
    .eq("id", id)
    .single();

  if (row) {
    await supabase.storage.from("gallery").remove([row.storage_path]);
  }

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
