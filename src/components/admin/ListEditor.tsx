import { useState } from "react";
import type { FormEvent, ReactNode, SVGProps } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import IconPicker from "./IconPicker";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { ICON_MAP } from "../../lib/icons";

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "icon";
  iconOptions?: Record<string, (props: SVGProps<SVGSVGElement>) => ReactNode>;
};
type Item = { id: string; order_index?: number; [key: string]: unknown };

type Props = {
  endpoint: string;
  fields: FieldConfig[];
  items: Item[];
  extraPayload?: Record<string, string>;
  addLabel?: string;
  title: string;
  description?: string;
  icon?: string;
};

function truncate(value: string, max = 60) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function ListEditor({
  endpoint,
  fields,
  items: initialItems,
  extraPayload,
  addLabel = "Agregar",
  title,
  description,
  icon,
}: Props) {
  const Icon = icon ? ICON_MAP[icon] : undefined;
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState<{ mode: "create" | "edit"; item?: Item } | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iconField = fields.find((f) => f.type === "icon");
  const previewFields = fields.filter((f) => f !== iconField);

  function openCreate() {
    setValues({});
    setError(null);
    setModal({ mode: "create" });
  }

  function openEdit(item: Item) {
    const initial: Record<string, string> = {};
    for (const field of fields) initial[field.key] = (item[field.key] as string) ?? "";
    setValues(initial);
    setError(null);
    setModal({ mode: "edit", item });
  }

  function closeModal() {
    setModal(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!modal) return;
    setSaving(true);
    setError(null);

    if (modal.mode === "create") {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...extraPayload }),
      });
      setSaving(false);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "No se pudo agregar");
        return;
      }

      const created: Item = await res.json();
      setItems((prev) => [...prev, created]);
    } else {
      const id = modal.item!.id;
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...values }),
      });
      setSaving(false);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "No se pudo guardar");
        return;
      }

      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...values } : item)));
    }

    setModal(null);
  }

  async function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setItems(reordered);

    await Promise.all([
      fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reordered[index].id, order_index: index }),
      }),
      fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reordered[target].id, order_index: target }),
      }),
    ]);
  }

  function renderFormField(field: FieldConfig) {
    const value = values[field.key] ?? "";
    const onChange = (v: string) => setValues((prev) => ({ ...prev, [field.key]: v }));

    if (field.type === "icon") {
      return <IconPicker value={value} onChange={onChange} options={field.iconOptions} />;
    }
    if (field.type === "textarea") {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-ink/15 bg-bone/60 px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
        />
      );
    }
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink/15 bg-bone/60 px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
      />
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-4">
        <div className="flex items-center gap-3">
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
        <Button type="button" onClick={openCreate} className="shrink-0">
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-muted">
              <th className="w-10 px-4 py-3"></th>
              {previewFields.map((field) => (
                <th key={field.key} className="px-3 py-3 font-medium">
                  {field.label}
                </th>
              ))}
              <th className="w-28 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={previewFields.length + 2} className="px-4 py-6 text-center text-ink-muted">
                  Todavía no hay elementos.
                </td>
              </tr>
            ) : (
              items.map((item, i) => {
                const SwatchIcon = iconField
                  ? iconField.iconOptions?.[item[iconField.key] as string]
                  : undefined;

                return (
                  <tr key={item.id} className="border-b border-ink/5 last:border-0 hover:bg-bone/40">
                    <td className="px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/10 text-xs font-medium text-green">
                        {SwatchIcon ? <SwatchIcon className="h-4 w-4" /> : i + 1}
                      </span>
                    </td>
                    {previewFields.map((field) => (
                      <td key={field.key} className="max-w-xs px-3 py-3 text-ink">
                        <span className="block truncate">
                          {truncate((item[field.key] as string) ?? "")}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleMove(i, -1)}
                          disabled={i === 0}
                          className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-green/10 hover:text-green disabled:opacity-30 disabled:hover:bg-transparent"
                          aria-label="Mover antes"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(i, 1)}
                          disabled={i === items.length - 1}
                          className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-green/10 hover:text-green disabled:opacity-30 disabled:hover:bg-transparent"
                          aria-label="Mover después"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-green/10 hover:text-green"
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-berry/10 hover:text-berry"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modal !== null}
        onClose={closeModal}
        title={modal?.mode === "edit" ? `Editar — ${title}` : `Agregar — ${title}`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-2 text-sm text-ink">
              {field.label}
              {renderFormField(field)}
            </label>
          ))}

          {error ? <p className="text-sm text-berry">{error}</p> : null}

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Cancelar
            </button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ListEditor;
