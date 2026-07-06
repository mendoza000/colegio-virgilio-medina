import { useState } from "react";
import type { FormEvent } from "react";
import { ICON_MAP } from "../../lib/icons";
import Button from "../ui/Button";

type FieldConfig = { key: string; label: string; type?: "text" | "textarea"; wide?: boolean };

type Props = {
  endpoint: string;
  fields: FieldConfig[];
  initialValues: Record<string, string>;
  extraPayload?: Record<string, string>;
  title: string;
  description?: string;
  icon?: string;
};

export function SingletonForm({
  endpoint,
  fields,
  initialValues,
  extraPayload,
  title,
  description,
  icon,
}: Props) {
  const Icon = icon ? ICON_MAP[icon] : undefined;
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, ...extraPayload }),
    });
    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "No se pudo guardar");
      return;
    }

    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-ink/10 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-ink/10 px-6 py-4">
        {Icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        <div className="flex flex-col">
          <h3 className="font-body text-lg font-bold text-ink">{title}</h3>
          {description ? <p className="text-xs text-ink-muted">{description}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label
              key={field.key}
              className={`flex flex-col gap-2 text-sm text-ink ${
                field.type === "textarea" || field.wide ? "sm:col-span-2" : ""
              }`}
            >
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-ink/15 bg-bone/60 px-4 py-2.5 text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full rounded-lg border border-ink/15 bg-bone/60 px-4 py-2.5 text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
                />
              )}
            </label>
          ))}
        </div>

        {error ? <p className="text-sm text-berry">{error}</p> : null}
        {saved ? <p className="text-sm text-forest">Guardado.</p> : null}

        <Button type="submit" disabled={saving} className="self-start">
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}

export default SingletonForm;
