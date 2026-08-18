import { Link } from "react-router-dom";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import CompanyContact from "./CompanyContact";

type WarehouseContactProps = {
  color: string;
};

const WarehouseContact = ({ color }: WarehouseContactProps) => {
  const { t } = useTranslation();

  return (
    <CompanyContact
      color={color}
      eyebrow={t("warehouseContact.eyebrow")}
      title={t("warehouseContact.title")}
      extra={
        <Link
          to="/warehouse-brochure"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          <Download size={16} strokeWidth={2.5} /> {t("warehouseContact.brochure")}
        </Link>
      }
      rows={[
        {
          icon: Phone,
          label: t("warehouseContact.phones"),
          lines: [
            { text: "86918 86919", href: "tel:+918691886919" },
            { text: "011 4629 1155", href: "tel:+911146291155" },
          ],
        },
        {
          icon: Mail,
          label: t("warehouseContact.emails"),
          lines: [
            { text: "indexia.queries@gmail.com", href: "mailto:indexia.queries@gmail.com" },
            { text: "bijendra.malik@indexiafinance.com", href: "mailto:bijendra.malik@indexiafinance.com" },
            { text: "Vini.Malik5@gmail.com", href: "mailto:Vini.Malik5@gmail.com" },
          ],
        },
        {
          icon: MapPin,
          label: t("warehouseContact.address"),
          lines: [
            {
              text: "213, Second Floor, Imperial Tower, C Block, Commercial Complex, Naraina Vihar, New Delhi, 110028",
              href: "https://maps.google.com/?q=Imperial+Tower,+C+Block+Commercial+Complex,+Naraina+Vihar,+New+Delhi+110028",
            },
          ],
        },
      ]}
    />
  );
};

export default WarehouseContact;
