import ImageUploadField from "./ImageUploadField";
import SingletonForm from "./SingletonForm";
import ListEditor from "./ListEditor";
import { SOCIAL_ICON_MAP } from "../icons/SocialIcons";
import type { SiteSettings, SocialLink } from "../../lib/content";

type Props = {
  settings: SiteSettings;
  socialLinks: SocialLink[];
};

export function SiteSettingsForm({ settings, socialLinks }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <ImageUploadField label="Logo del colegio" target="logo" currentUrl={settings.logo_url} icon="Image" />

      <SingletonForm
        title="Datos de contacto"
        description="Estos datos se muestran en el encabezado, el pie de página y el inicio del sitio."
        icon="Phone"
        endpoint="/api/admin/settings/site_settings"
        fields={[
          { key: "slogan", label: "Lema institucional", wide: true },
          { key: "phone", label: "Teléfono" },
          { key: "email", label: "Correo electrónico" },
          { key: "address", label: "Dirección", wide: true },
          { key: "office_hours", label: "Horario de atención" },
          { key: "map_embed_src", label: "URL del mapa (embed de OpenStreetMap)", wide: true },
        ]}
        initialValues={{
          slogan: settings.slogan,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          office_hours: settings.office_hours,
          map_embed_src: settings.map_embed_src,
        }}
      />

      <ListEditor
        title="Redes sociales"
        icon="Share2"
        endpoint="/api/admin/lists/social_links"
        fields={[
          { key: "platform", label: "Plataforma", type: "icon", iconOptions: SOCIAL_ICON_MAP },
          { key: "label", label: "Etiqueta" },
          { key: "href", label: "Enlace" },
        ]}
        items={socialLinks}
        addLabel="Agregar red social"
      />
    </div>
  );
}

export default SiteSettingsForm;
