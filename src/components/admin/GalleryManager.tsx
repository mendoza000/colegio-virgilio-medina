import { useState } from "react";
import type { FormEvent } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, Upload } from "lucide-react";
import type { GalleryImage } from "../../lib/content";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

type Props = {
  initialImages: GalleryImage[];
};

type ModalState = { mode: "create" } | { mode: "edit"; image: GalleryImage } | null;

export function GalleryManager({ initialImages }: Props) {
  const [images, setImages] = useState(initialImages);
  const [modal, setModal] = useState<ModalState>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setFile(null);
    setCaption("");
    setError(null);
    setModal({ mode: "create" });
  }

  function openEdit(image: GalleryImage) {
    setCaption(image.caption);
    setError(null);
    setModal({ mode: "edit", image });
  }

  function closeModal() {
    setModal(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!modal) return;
    setError(null);

    if (modal.mode === "create") {
      if (!file) return;
      setSaving(true);
      const form = new FormData();
      form.append("file", file);
      form.append("caption", caption);

      const res = await fetch("/api/admin/gallery", { method: "POST", body: form });
      setSaving(false);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "No se pudo subir la imagen");
        return;
      }

      const created: GalleryImage = await res.json();
      setImages((prev) => [...prev, created]);
    } else {
      setSaving(true);
      const id = modal.image.id;
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, caption }),
      });
      setSaving(false);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "No se pudo guardar");
        return;
      }

      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, caption } : img)));
    }

    setModal(null);
  }

  async function handleDelete(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;

    const reordered = [...images];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setImages(reordered);

    await Promise.all([
      fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reordered[index].id, order_index: index }),
      }),
      fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reordered[target].id, order_index: target }),
      }),
    ]);
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
            <Upload className="h-4 w-4" />
          </span>
          <h3 className="font-body text-lg font-bold text-ink">Fotos</h3>
        </div>
        <Button type="button" onClick={openCreate} className="shrink-0">
          <Plus className="h-4 w-4" />
          Subir foto
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-muted">
              <th className="w-20 px-4 py-3"></th>
              <th className="px-3 py-3 font-medium">Descripción</th>
              <th className="w-28 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-ink-muted">
                  Todavía no hay fotos.
                </td>
              </tr>
            ) : (
              images.map((image, i) => (
                <tr key={image.id} className="border-b border-ink/5 last:border-0 hover:bg-bone/40">
                  <td className="px-4 py-3">
                    <img src={image.src} alt={image.caption} className="h-12 w-16 rounded-md object-cover" />
                  </td>
                  <td className="max-w-sm px-3 py-3 text-ink">
                    <span className="block truncate">{image.caption}</span>
                  </td>
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
                        disabled={i === images.length - 1}
                        className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-green/10 hover:text-green disabled:opacity-30 disabled:hover:bg-transparent"
                        aria-label="Mover después"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(image)}
                        className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-green/10 hover:text-green"
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(image.id)}
                        className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-berry/10 hover:text-berry"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modal !== null} onClose={closeModal} title={modal?.mode === "edit" ? "Editar foto" : "Subir foto"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {modal?.mode === "edit" ? (
            <img src={modal.image.src} alt={modal.image.caption} className="h-32 w-full rounded-lg object-cover" />
          ) : (
            <label className="flex flex-col gap-2 text-sm text-ink">
              Imagen
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="text-sm text-ink-muted file:mr-3 file:rounded-full file:border-0 file:bg-green file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wider file:text-carbon"
              />
            </label>
          )}

          <label className="flex flex-col gap-2 text-sm text-ink">
            Descripción
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ej. Fachada principal"
              className="w-full rounded-lg border border-ink/15 bg-bone/60 px-4 py-2.5 text-ink outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-green"
            />
          </label>

          {error ? <p className="text-sm text-berry">{error}</p> : null}

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Cancelar
            </button>
            <Button type="submit" disabled={saving || (modal?.mode === "create" && !file)}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default GalleryManager;
