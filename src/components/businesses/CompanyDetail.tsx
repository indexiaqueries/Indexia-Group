import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Apple,
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  BarChart3,
  Briefcase,
  Building2,
  Candy,
  Car,
  Check,
  CreditCard,
  ClipboardList,
  Clock,
  Crown,
  Dumbbell,
  Factory,
  FlaskConical,
  Globe,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Home,
  Image,
  KeyRound,
  Landmark,
  Layers,
  Leaf,
  Lock,
  MapPin,
  MapPinned,
  Medal,
  PenTool,
  Route,
  SearchCheck,
  ShieldCheck,
  Ship,
  Snowflake,
  Sparkles,
  Sprout,
  Store,
  Swords,
  Ticket,
  TrendingUp,
  Trophy,
  Truck,
  Users,
  Wallet,
  Warehouse,
  Wheat,
} from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import EnquiryForm from "../contact/EnquiryForm";
import HeroBackdrop from "../banners/HeroBackdrop";
import { getCompanyImage } from "../../data/companyImages";
import { companies, type Company } from "../../data/companies";
import { accentInk, contrastText } from "../../lib/color";

const serviceIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  "Investor Services": Users,
  "FDI Advisory & Facilitation": MapPinned,
  "NBFC Operations": Landmark,
  "Banking & Institutional Funding": HandCoins,
  "Cross-Border Capital Solutions": Globe,
  "Wealth & Asset Advisory": TrendingUp,

  "Personal Loan": Wallet,
  "Business Loan": Building2,
  "Home Loan": Home,
  "Loan Against Property": KeyRound,
  "Balance Transfer": ArrowLeftRight,
  "Car Loan": Car,
  "Credit Card": CreditCard,
  "Education Loan": GraduationCap,
  "Project Loan": Briefcase,
  "Commercial Purchase": Store,
  "Lease R Discounting": HandCoins,
  "Working Capital": Banknote,

  "Armed Security Guards": ShieldCheck,
  "Commando Protection Units": Swords,
  "VIP & Dignitary Escorts": Crown,
  "Event & Venue Security": Ticket,
  "Corporate & Site Security": Factory,
  "24×7 Monitoring & Rapid Response": Clock,

  "Sugar Export & Trading": Candy,
  "Edible Oils & Pulses": Leaf,
  "Food Grains & Spices": Wheat,
  "Sourcing & Quality Control": SearchCheck,
  "International Logistics": Ship,
  "14 South American Markets": Globe,

  "Organic Fertilizer Production": Sprout,
  "Bio-Fertilizer Blends": Leaf,
  "Soil Health Solutions": FlaskConical,
  "Yield Improvement Programmes": TrendingUp,
  "Farmer Support & Training": Users,
  "Shamli, UP Facility (Delhi NCR)": MapPin,

  "Warehousing on Lease (MNCs)": Warehouse,
  "Secure & Scalable Storage": Lock,
  "Inventory Management": ClipboardList,
  "Delhi NCR Locations": MapPin,
  "Logistics Integration": Truck,
  "Cold & Dry Storage Options": Snowflake,

  "Highway Hoardings & Billboards": Image,
  "Multiple Site Holdings": Layers,
  "High-Traffic Corridor Placements": Route,
  "Creative & Campaign Support": PenTool,
  "Site Analytics & Reporting": BarChart3,

  "International-Level Training": Dumbbell,
  "Diet & Nutrition Programmes": Apple,
  "Expert Coaching & Mentorship": Users,
  "Competition Funding & Gear": Medal,
  "Sports Medicine & Recovery": HeartPulse,
  "Olympic-Grade Support": Trophy,
};

type CompanyDetailProps = {
  company: Company;
  showBackLink?: boolean;
};

const CompanyDetail = ({ company: b, showBackLink = false }: CompanyDetailProps) => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`pageContent.companies.${b.slug}.${path}`, { defaultValue: fallback });
  const tag = tr("tag", b.tag);
  const tagline = b.tagline ? tr("tagline", b.tagline) : undefined;
  const overview = tr("overview", b.overview);
  const index = companies.findIndex((c) => c.name === b.name);
  const entryNo = String(index + 1).padStart(2, "0");

  return (
    <>

      <HeroBackdrop
        image={getCompanyImage(b.name)}
        radial={`radial-gradient(circle at 85% 15%, ${b.color}40, transparent 45%)`}
        containerClassName="relative mx-auto w-full max-w-7xl px-5 py-24 pt-32 sm:px-6 lg:px-8 lg:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {showBackLink && (
            <Link
              to="/businesses"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-(--color-yellow)"
            >
              <span aria-hidden="true">←</span> {t("companyDetail.backAll")}
            </Link>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Eyebrow color="var(--color-yellow)">{t("companyDetail.register", { no: entryNo })}</Eyebrow>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-md"
              style={{ background: b.color, color: contrastText(b.color) }}
            >
              {tag}
            </span>
          </div>

          <h1 className="font-display mt-4 max-w-3xl text-[clamp(30px,5vw,52px)] font-bold leading-[1.06] text-white">
            {b.name}
          </h1>

          {tagline && (
            <p className="mt-4 text-[17px] font-semibold italic text-(--color-yellow)">“{tagline}”</p>
          )}

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">{overview}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-7 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("companyDetail.eyebrow")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </motion.div>
      </HeroBackdrop>

      <section className="bg-(--color-soft) py-20 lg:py-24">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow>{t("companyDetail.keyEntries")}</Eyebrow>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {b.highlights.map((highlight, i) => (
              <Reveal key={highlight} delay={(i % 3) * 0.08} amount={0.15}>
                <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${b.color}1f`, color: accentInk(b.color) }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <p className="text-[14.5px] font-medium leading-6 text-(--color-ink-soft)">{tr(`highlights.${i}`, highlight)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow>{t("companyDetail.servicesTitle")}</Eyebrow>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.services.map((service, i) => {
              const Icon = serviceIcons[service] ?? Sparkles;
              return (
                <Reveal key={service} delay={(i % 3) * 0.06} amount={0.1}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-(--color-soft) p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${b.color}14`, color: accentInk(b.color) }}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-(--color-ink-deep)">{tr(`services.${i}`, service)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="font-ledger mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <span>{t("companyDetail.registerOf")}</span>
            <span>{t("companyDetail.entryOf", { no: entryNo })}</span>
          </div>
        </div>
      </section>

      <section
        id="enquiry"
        className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden"
        style={{ background: "var(--color-soft)", padding: "clamp(40px, 5vw, 64px) 0" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-blue)/40 to-transparent" aria-hidden="true" />

        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <Eyebrow className="mb-3">{t("companyDetail.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
              {t("companyDetail.enquireTitle", { name: b.name })}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-(--color-muted)">
              {t("companyDetail.enquireSub", { name: b.name })}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-(--color-blue) shadow-[0_4px_14px_rgba(6,106,156,0.18)]">
                <Clock className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--color-muted)">{t("companyDetail.responseTime")}</p>
                <p className="mt-0.5 text-sm font-semibold text-(--color-ink)">{t("companyDetail.responseValue")}</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <EnquiryForm key={b.name} initialCompany={b.name} companyLocked />
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyDetail;
