import { defineMiddleware } from "astro:middleware";
import { createSupabaseServerClient } from "./lib/supabase-server";

const PUBLIC_ADMIN_PAGES = ["/admin/login"];
const PUBLIC_ADMIN_API_ROUTES = ["/api/admin/auth/login"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, url, redirect } = context;
  const isAdminPage = url.pathname.startsWith("/admin");
  const isAdminApiRoute = url.pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApiRoute) {
    return next();
  }

  const supabase = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  context.locals.session = session;

  if (isAdminPage && !PUBLIC_ADMIN_PAGES.includes(url.pathname)) {
    if (!session) return redirect("/admin/login");
  }

  if (isAdminApiRoute && !PUBLIC_ADMIN_API_ROUTES.includes(url.pathname)) {
    if (!session) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  if (session && url.pathname === "/admin/login") {
    return redirect("/admin");
  }

  return next();
});
