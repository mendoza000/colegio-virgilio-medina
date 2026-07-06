import { useState } from "react";
import { ICON_MAP } from "../../lib/icons";

type Props = {
  label: string;
  target: string;
  currentUrl: string | null;
  icon?: string;
};

export function DocumentUploadField({ label, target, currentUrl, icon }: Props) {
  const Icon = icon ? ICON_MAP[icon] : undefined;
  const [url, setUrl] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);

    const form = new FormData();
    form.append("file", file);
    form.append("target", target);

    const res = await fetch("/api/admin/branding-upload", { method: "POST", body: form });
    setUploading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "No se pudo subir el archivo");
      return;
    }

    const { url: newUrl } = await res.json();
    setUrl(newUrl);
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-ink/10 px-6 py-4">
        {Icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        <h3 className="font-body text-base font-bold text-ink">{label}</h3>
      </div>

      <div className="flex flex-col gap-2 p-6 text-sm text-ink">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-green underline">
              Ver documento actual
            </a>
          ) : (
            <span className="text-xs text-ink-muted">Sin documento cargado</span>
          )}
          <input
            type="file"
            accept="application/pdf"
            disabled={uploading}
            onChange={(e) => handleChange(e.target.files?.[0])}
            className="text-sm text-ink-muted file:mr-3 file:rounded-full file:border-0 file:bg-green file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wider file:text-carbon"
          />
        </div>
        {uploading ? <p className="text-xs text-ink-muted">Subiendo...</p> : null}
        {error ? <p className="text-sm text-berry">{error}</p> : null}
      </div>
    </div>
  );
}

export default DocumentUploadField;
