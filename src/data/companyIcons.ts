import {
  BadgeDollarSign,
  Boxes,
  Building,
  Building2,
  Globe2,
  HeartHandshake,
  Megaphone,
  ShieldCheck,
  Sprout,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { companies } from "./companies";

export const companyIcons: Record<string, LucideIcon> = {
  "Indexia Finance": BadgeDollarSign,
  "Indexia Finserve Pvt. Ltd.": Building2,
  "Indexia Securities": ShieldCheck,
  "Indexia Overseas Pvt. Ltd.": Globe2,
  "Indexia Agro Bio Fertilizers Pvt. Ltd.": Sprout,
  "Indexia Warehouse": Warehouse,
  "Indexia Advertising": Megaphone,
  "Indexia Foundation": HeartHandshake,
};

export const getCompanyIcon = (name: string): LucideIcon => companyIcons[name] ?? Building;

// Slug-keyed icon lookup for hero slides and other contexts without a company name.
export const companyIconsBySlug: Record<string, LucideIcon> = Object.fromEntries(
  companies.map((c) => [c.slug, companyIcons[c.name] ?? Building]),
);

// Icon for the group-wide home hero slide.
export const groupIcon: LucideIcon = Boxes;
