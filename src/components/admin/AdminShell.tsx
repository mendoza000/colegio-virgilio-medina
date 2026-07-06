import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { SECTIONS } from "../../lib/admin-sections";

type Props = {
  active?: string;
  children: ReactNode;
};

export function AdminShell({ active, children }: Props) {
  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-bone lg:flex">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-ink/10 lg:bg-white lg:px-4 lg:py-6">
        <a href="/admin" className="mb-8 px-3 font-body text-lg font-bold text-ink">
          Admin · C.V.M.
        </a>

        <nav className="flex flex-col gap-1">
          {SECTIONS.map((section) => {
            const isActive = section.href === active;
            const Icon = section.icon;
            if (!section.ready) {
              return (
                <span
                  key={section.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted/40"
                  title="Próximamente"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.label}
                </span>
              );
            }
            return (
              <a
                key={section.href}
                href={section.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-green/10 text-green" : "text-ink-muted hover:bg-bone hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {section.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-berry/10 hover:text-berry"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Cerrar sesión
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3 lg:hidden">
          <a href="/admin" className="font-body text-base font-bold text-ink">
            Admin · C.V.M.
          </a>
          <nav className="flex items-center gap-1 overflow-x-auto">
            {SECTIONS.map((section) => {
              const isActive = section.href === active;
              const Icon = section.icon;
              if (!section.ready) {
                return (
                  <span key={section.href} className="rounded-lg p-2 text-ink-muted/40" title="Próximamente">
                    <Icon className="h-4 w-4" />
                  </span>
                );
              }
              return (
                <a
                  key={section.href}
                  href={section.href}
                  title={section.label}
                  aria-label={section.label}
                  className={`rounded-lg p-2 transition-colors ${
                    isActive ? "bg-green/10 text-green" : "text-ink-muted hover:bg-bone hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-berry/10 hover:text-berry"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </nav>
        </div>

        <main className="flex-1 bg-bone p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

export default AdminShell;
