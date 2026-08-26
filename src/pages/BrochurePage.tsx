import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import SEO from "../components/common/SEO";
import logo from "../assets/logo/IndexiaGroup_Logo.webp";
import { companies } from "../data/companies";
import { accentInk } from "../lib/color";

type BrochurePageProps = {
  slug: "warehouse" | "advertising";
  backTo: string;
  pdfPath: string;
  pdfName: string;
  band: string;
};

const BrochurePage = ({ slug, backTo, pdfPath, pdfName, band }: BrochurePageProps) => {
  const { t } = useTranslation();

  const b = companies.find((c) => c.slug === slug)!;
  const tr = (path: string, fallback: string) => t(`pageContent.companies.${slug}.${path}`, { defaultValue: fallback });
  const name = tr("name", b.name);
  const tag = tr("tag", b.tag);
  const desc = tr("desc", b.desc);
  const overview = tr("overview", b.overview);

  const canonicalPath = slug === "warehouse" ? "/warehouse-brochure" : "/advertising-brochure";
  const title = `${name} Brochure - ${tag}`;

  const price = t(`${slug === "warehouse" ? "warehousePricing" : "unipolePricing"}.standardRate`);

  const brochureJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description: `${desc} Download the ${name} brochure from Indexia Group.`,
        url: `https://www.indexiagroup.com${canonicalPath}`,
        isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: "Group Companies", item: "https://www.indexiagroup.com/about" },
          { "@type": "ListItem", position: 3, name: `${name} Brochure`, item: `https://www.indexiagroup.com${canonicalPath}` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-(--color-soft) py-10">
      <SEO
        title={title}
        description={`${desc} Download the ${name} brochure from Indexia Group.`}
        keywords={`${name} brochure, ${tag}, Indexia Group brochure, ${slug === "warehouse" ? "warehouse land Shamli" : "unipole advertising Shamli"}`}
        canonicalPath={canonicalPath}
        jsonLd={brochureJsonLd}
      />
      <div className="brochure-wrap mx-auto max-w-4xl px-4 sm:px-6">
        {/* Action bar, hidden when printing */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-(--color-ink-soft) transition-colors hover:text-(--color-teal)"
          >
            <ArrowLeft size={16} /> {t(slug === "warehouse" ? "brochure.backWarehouse" : "brochure.backAdvertising")}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={pdfPath}
              download={pdfName}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              <Download size={16} strokeWidth={2.5} /> {t("brochure.download")}
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              title={t("brochure.print")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-(--color-ink-soft) transition-all duration-300 hover:-translate-y-0.5 hover:text-(--color-teal)"
            >
              <Printer size={17} strokeWidth={2} />
              <span className="sr-only">{t("brochure.print")}</span>
            </button>
          </div>
        </div>

        {/* Brochure sheet */}
        <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          {/* Header band, title / subtitle / location, matching the PDF */}
          <header className="px-5 py-8 text-white sm:px-8 sm:py-10" style={{ background: band }}>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={t("common.logoAlt")}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-contain"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
              />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/80">Indexia Group</p>
            </div>
            <h1 className="mt-6 text-[clamp(28px,4vw,40px)] font-extrabold leading-tight">{name}</h1>
            <p className="mt-1.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white/90">{tag}</p>
            <p className="mt-1 text-[15px] font-medium text-white/80">
              {slug === "warehouse" ? t("brochure.locationWarehouse") : t("brochure.locationAdvertising")}
            </p>
          </header>

          {/* Headline + desc below the band, matching the PDF */}
          <section className="px-5 pt-6 sm:px-8 sm:pt-8">
            <h2 className="font-display max-w-xl text-[clamp(22px,3.2vw,30px)] font-bold leading-[1.15] text-(--color-ink)">
              {slug === "advertising" ? t("brochure.advertisingHeadline") : t("brochure.headline")}
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-7 text-(--color-muted)">{desc}</p>
          </section>

          {/* Overview */}
          <section className="px-5 py-6 sm:px-8 sm:py-8">
            <h2 className="font-display text-[22px] font-bold text-(--color-ink)">{t("brochure.about")}</h2>
            <p className="mt-3 text-[14px] leading-7 text-(--color-muted)">{overview}</p>
          </section>

          {/* Pricing section, company-specific */}
          {slug === "warehouse" ? (
            <section className="px-5 pb-6 sm:px-8 sm:pb-8">
              <h2 className="font-display text-[22px] font-bold text-(--color-ink)">{t("warehousePricing.title")}</h2>
              <p className="mt-1 text-[13px] text-(--color-muted)">{t("warehousePricing.subtitle")}</p>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 bg-(--color-soft) px-4 py-2.5 sm:px-6 sm:py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  <span>{t("warehousePricing.portfolioCol")}</span>
                  <span className="text-end">{t("warehousePricing.valueCol")}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-2 sm:gap-4 border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
                  <span className="text-[13px] sm:text-[14px] font-semibold text-(--color-ink-deep)">
                    {t("warehousePricing.locations")}
                  </span>
                  <span className="text-end text-[14px] sm:text-[16px] font-bold" style={{ color: accentInk(b.color) }}>
                    {t("warehousePricing.locationsValue")}
                  </span>
                </div>
                <div className="grid grid-cols-2 items-center gap-2 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4">
                  <span className="text-[13px] sm:text-[14px] font-semibold text-(--color-ink-deep)">{t("warehousePricing.total")}</span>
                  <span className="text-end text-[14px] sm:text-[16px] font-bold" style={{ color: accentInk(b.color) }}>
                    {t("warehousePricing.totalValue")}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                {t("warehousePricing.plotCol")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {["plot1", "plot2", "plot2_5", "plot5", "plot8"].map((key) => (
                  <li
                    key={key}
                    className="rounded-full px-4 py-1.5 text-[13px] font-bold"
                    style={{ background: `${b.color}1a`, color: accentInk(b.color) }}
                  >
                    {t(`warehousePricing.${key}`)}
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 rounded-xl px-5 py-4 text-center"
                style={{ background: "#f2f2311a", border: "1px solid #f2f2314d" }}
              >
                <p className="text-[14px] font-bold text-(--color-ink)">{price}</p>
                <p className="mt-1 text-[12px] text-(--color-muted)">{t("warehousePricing.note")}</p>
              </div>
            </section>
          ) : (
            <section className="px-5 pb-6 sm:px-8 sm:pb-8">
              <h2 className="font-display text-[22px] font-bold text-(--color-ink)">{t("unipolePricing.title")}</h2>
              <p className="mt-1 text-[13px] text-(--color-muted)">{t("unipolePricing.subtitle")}</p>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
                <div className="grid grid-cols-3 gap-4 bg-(--color-soft) px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  <span>{t("unipolePricing.sizeCol")}</span>
                  <span>{t("unipolePricing.areaCol")}</span>
                  <span className="text-end">{t("unipolePricing.rateCol")}</span>
                </div>
                {[
                  ["sizeSmall", "areaSmall", "rateSmall"],
                  ["sizeLarge", "areaLarge", "rateLarge"],
                ].map(([sizeKey, areaKey, rateKey], i) => (
                  <div
                    key={sizeKey}
                    className={`grid grid-cols-3 items-center gap-4 px-6 py-4 ${i === 0 ? "border-b border-slate-100" : ""}`}
                  >
                    <span className="text-[14px] font-semibold text-(--color-ink-deep)">{t(`unipolePricing.${sizeKey}`)}</span>
                    <span className="text-[13px] font-medium text-(--color-muted)">{t(`unipolePricing.${areaKey}`)}</span>
                    <span className="text-end text-[16px] font-bold" style={{ color: accentInk(b.color) }}>
                      {t(`unipolePricing.${rateKey}`)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-xl px-5 py-4 text-center"
                style={{ background: "#f2f2311a", border: "1px solid #f2f2314d" }}
              >
                <p className="text-[14px] font-bold text-(--color-ink)">{price}</p>
                <p className="mt-1 text-[12px] text-(--color-muted)">{t("unipolePricing.note")}</p>
              </div>
            </section>
          )}

          {/* Highlights */}
          <section className="px-5 pb-6 sm:px-8 sm:pb-8">
            <h2 className="font-display text-[22px] font-bold text-(--color-ink)">{t("companyDetail.keyEntries")}</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {b.highlights.map((h, i) => (
                <li key={h} className="flex items-start gap-2.5 text-[13.5px] font-medium leading-6 text-(--color-ink-soft)">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: b.color }}
                  >
                    ✓
                  </span>
                  {tr(`highlights.${i}`, h)}
                </li>
              ))}
            </ul>
          </section>

          {/* Footer note */}
          <section className="border-t border-slate-100 px-5 py-5 sm:px-8 sm:py-6">
            <p className="text-[11px] text-slate-400">
              {slug === "advertising" ? t("brochure.advertisingFooter") : t("brochure.footer")}
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default BrochurePage;
