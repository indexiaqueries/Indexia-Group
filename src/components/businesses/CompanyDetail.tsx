import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Apple,
  ArrowLeftRight,
  Banknote,
  BarChart3,
  Briefcase,
  Building2,
  Candy,
  Car,
  CreditCard,
  ClipboardList,
  Clock,
  Crown,
  Dumbbell,
  ExternalLink,
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
import SealStamp from "../common/SealStamp";
import EnquiryForm from "../contact/EnquiryForm";
import { getCompanyImage } from "../../data/companyImages";
import { companies, type Company } from "../../data/companies";
import { accentInk, contrastText, isLightColor } from "../../lib/color";

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
  const index = companies.findIndex((c) => c.name === b.name);
  const entryNo = String(index + 1).padStart(2, "0");

  return (
    <>
      <section
        className="relative flex min-h-[100svh] items-center overflow-hidden"
        style={{ background: "var(--color-paper)", padding: "clamp(48px, 8vw, 88px) 0" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 47px, rgba(18,32,41,0.045) 47px, rgba(18,32,41,0.045) 48px)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#26ae90]/50 to-transparent" aria-hidden="true" />

        <div className="container relative z-10">
          {showBackLink && (
            <Link
              to="/businesses"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#066a9c] transition-colors hover:text-[#0a4a6e]"
            >
              <span aria-hidden="true">←</span> All Companies
            </Link>
          )}

          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative mx-auto max-w-6xl"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 right-0 z-0 select-none font-ledger font-bold leading-[0.75] text-[clamp(9rem,26vw,20rem)]"
              style={{ color: b.color, opacity: isLightColor(b.color) ? 0.15 : 0.09 }}
            >
              {entryNo}
            </span>

            <div className="group relative mb-10 rounded-xl border border-[#122029]/15 bg-white/40 p-2 shadow-[0_18px_50px_rgba(18,32,41,0.12)] backdrop-blur-[2px] sm:p-2.5">
              <div className="relative overflow-hidden rounded-lg border border-[#122029]/10">
                <img
                  src={getCompanyImage(b.name)}
                  alt={b.name}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#122029]/25 via-transparent to-transparent" />
                <span
                  className="absolute left-3 top-3 rounded-[4px] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-lg"
                  style={{ background: b.color, color: contrastText(b.color) }}
                >
                  {b.tag}
                </span>
                <span className="pointer-events-none absolute bottom-4 right-4 z-10 scale-150 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <SealStamp size={56} color={b.color} />
                </span>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="font-ledger mb-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: accentInk(b.color) }}>
                  Register Nº {entryNo} / 08
                </p>

                {b.link ? (
                  <a
                    href={b.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display mb-3 inline-flex items-center gap-2.5 text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.05] tracking-tight text-[#122029] transition-colors duration-200 hover:text-[#066a9c]"
                  >
                    {b.name}
                    <ExternalLink size={22} className="shrink-0" style={{ color: accentInk(b.color) }} />
                  </a>
                ) : (
                  <h3 className="font-display mb-3 text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.05] tracking-tight text-[#122029]">
                    {b.name}
                  </h3>
                )}

                {b.tagline && (
                  <p className="-mt-1 mb-5 text-[15px] font-bold italic" style={{ color: accentInk(b.color) }}>
                    “{b.tagline}”
                  </p>
                )}

                <p className="mb-6 text-[15px] leading-[1.85] text-[#4b5563]">{b.overview}</p>

                <div className="h-[4px] w-14 rounded-sm" style={{ background: b.color }} />
              </div>

              <div>
                <p className="font-ledger mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#122029]/55">
                  Key entries
                </p>
                <ul className="grid gap-2.5">
                  {b.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-[14px] font-medium text-[#374151]">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border text-[11px] font-bold"
                        style={{ color: accentInk(b.color), borderColor: accentInk(b.color) }}
                      >
                        ✓
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-[#122029]/10 bg-gradient-to-r from-[#edf4fa] via-white to-[#edf4fa] px-6 py-7 shadow-[0_10px_30px_rgba(18,32,41,0.06)] sm:px-8 sm:py-8">
              <div className="flex items-end justify-between gap-4">
                <p className="font-ledger text-[12px] font-bold uppercase tracking-[0.24em] text-[#122029]">
                  Services under this entry
                </p>
                <span
                  className="font-ledger text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: accentInk(b.color) }}
                >
                  Entry {entryNo} · {b.services.length} services
                </span>
              </div>
              <div className="mt-3 h-[2px] w-full rounded-full bg-gradient-to-r from-[#122029] via-[#066a9c] to-[#d4a017]" />

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                {b.services.map((service) => {
                  const Icon = serviceIcons[service] ?? Sparkles;
                  return (
                    <div key={service} className="flex flex-col items-center gap-3 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d4a017] bg-white/80 shadow-[0_4px_14px_rgba(212,160,23,0.18)]">
                        <Icon size={26} strokeWidth={1.8} className="text-[#122029]" />
                      </span>
                      <span className="min-h-[2.6em] text-[12px] font-semibold leading-snug text-[#122029]">
                        {service}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="font-ledger mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#122029]/15 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#122029]/45">
              <span>Indexia Group · Register of Companies</span>
              <span>Entry {entryNo} of 08</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="enquiry"
        className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden"
        style={{ background: "#f8fafc", padding: "clamp(48px, 8vw, 88px) 0" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#066a9c]/40 to-transparent" aria-hidden="true" />

        <div className="container">
          <div className="mx-auto mb-8 max-w-[720px] text-center sm:mb-10">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Send Your Enquiry</p>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-[#111827]">
              Enquire About <span style={{ color: accentInk(b.color) }}>{b.name.replace(" Pvt. Ltd.", "")}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6b7280]">
              Your enquiry is routed with {b.name.replace(" Pvt. Ltd.", "")} named at the top, so the right team
              picks it up first.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <EnquiryForm key={b.name} initialCompany={b.name} companyLocked />
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyDetail;
