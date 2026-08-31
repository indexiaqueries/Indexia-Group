import { Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";

import SealStamp from "../common/SealStamp";
import customerImg from "../../assets/hero-img/PassbookCard.webp";
import { branches, phoneNumbers } from "../../data/contact";
import { colors, monoFont } from "../../lib/theme";

const PassbookCard = () => {
  const { t } = useTranslation();
  const rows = [
    { label: t("passbook.branchOffices"), value: String(branches.length).padStart(2, "0") },
    { label: t("passbook.directLines"), value: String(phoneNumbers.length).padStart(2, "0") },
    { label: t("passbook.avgReplyTime"), value: t("passbook.lessThan24hrs") },
    { label: t("passbook.enquiryStatus"), value: t("passbook.inReview") },
  ];

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="absolute -inset-6 rounded-4xl blur-2xl"
        style={{ background: `linear-gradient(135deg, ${colors.teal}30, ${colors.yellow}20)` }}
      />

      <div
        className="passbook-in relative rotate-[-3deg] rounded-3xl p-5 shadow-2xl ring-1 ring-black/5 transition-transform duration-300 ease-out hover:rotate-0 sm:p-7"
        style={{ backgroundColor: colors.paper }}
      >
        <div className="absolute bottom-8 start-0 top-8 flex -translate-x-1/2 flex-col justify-between rtl:translate-x-1/2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="block h-3 w-3 rounded-full shadow-inner"
              style={{ backgroundColor: colors.navyDeep }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
          <div className="flex items-center gap-2">
            <Landmark size={18} style={{ color: colors.navyMid }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: colors.navyMid }}
            >
              Indexia Group
            </span>
          </div>
          <img
            src={customerImg}
            alt=""
            aria-hidden="true"
            width={40}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-12 w-10 rounded-sm object-cover shadow ring-2 ring-white"
          />
        </div>

        <dl className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 pb-10 pe-10 sm:pe-14">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between text-sm">
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="whitespace-nowrap font-semibold" style={{ ...monoFont, color: colors.inkDeep }}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="seal-stamp-in absolute -bottom-5 -end-5" aria-hidden="true">
          <SealStamp size={88} color={colors.blue} />
        </div>
      </div>
    </div>
  );
};

export default PassbookCard;
