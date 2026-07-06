import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../ui/Button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "No se pudo iniciar sesión");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-body text-2xl font-bold text-ink">Panel administrativo</h1>
        <p className="text-sm text-ink-muted">Colegio Virgilio Medina</p>
      </div>

      <label className="flex flex-col gap-2 text-sm text-ink">
        Correo electrónico
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-bone/60 px-4 py-2.5 text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink">
        Contraseña
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-bone/60 px-4 py-2.5 text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
        />
      </label>

      {error ? <p className="text-sm text-berry">{error}</p> : null}

      <Button type="submit" disabled={loading} className="mt-2 w-full">
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}

export default LoginForm;
