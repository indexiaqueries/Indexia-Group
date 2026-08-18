import type { ImageSlotData } from "../components/common/ImageSlot";

/**
 * Central registry of every image slot on the site.
 *
 * HOW TO ADD A PICTURE:
 * 1. Drop the file into `public/images/<slot>/…` (e.g. public/images/contact/mumbai.jpg).
 * 2. Set `src` below to the public path (e.g. src: "images/contact/mumbai.jpg").
 * 3. Leave `src: ""` to keep the placeholder with its prompt.
 *
 * Suggested file paths are listed next to each slot in docs/IMAGES.md.
 */
export const siteImages: Record<string, ImageSlotData> = {
  /* ---------- Contact page — office photos ---------- */
  contactCorporate: {
    src: "",
    label: "Corporate office (Fort, Mumbai)",
    prompt:
      "Photograph of the Indexia Group corporate office entrance in Mumbai's Fort district — a classic heritage-era Indian office building facade with warm evening light, deep-blue and teal color grade, landscape 16:9, no readable text.",
  },
  contactMumbai: {
    src: "",
    label: "Mumbai office (Andheri West)",
    prompt:
      "Modern Indian office interior in Andheri West, Mumbai — branded reception area with employees collaborating at desks, natural daylight, deep blue + teal + yellow accents, landscape 16:9, no readable text.",
  },
  contactDelhi: {
    src: "",
    label: "Delhi office (Naraina Vihar)",
    prompt:
      "Corporate office in Naraina Vihar, New Delhi — glass conference room overlooking the city with a professional team in discussion, cool blue tones, landscape 16:9, no readable text.",
  },
  contactInternational: {
    src: "",
    label: "International office (Ecuador)",
    prompt:
      "Quito, Ecuador cityscape with Andean mountains at golden hour — a modern office building in the foreground, warm golden light, landscape 16:9, no readable text.",
  },

  /* ---------- Careers page — culture ---------- */
  careersCulture: {
    src: "",
    label: "Office culture photo",
    prompt:
      "Candid photograph of a diverse Indian office team collaborating in a bright modern workspace — laughter around a whiteboard, laptops and notebooks, natural light, warm and energetic, wide 16:9, no readable text.",
  },

  /* ---------- News page — featured story ---------- */
  newsFeatured: {
    src: "",
    label: "Featured story image",
    prompt:
      "Editorial banking-and-finance hero photo — an Indian banker's hands signing a loan document next to a smartphone showing a banking app, shallow depth of field, deep navy and teal grade, landscape 16:9, no readable text.",
  },

  /* ---------- Global Research — report covers ---------- */
  researchOTG: {
    src: "",
    label: "OTG report cover — On-The-Ground",
    prompt:
      "Street-level documentary photograph of an Indian market or mandi — traders, produce and cash counters in motion, teal-and-blue grade, landscape 16:9, no readable text.",
  },
  researchACT: {
    src: "",
    label: "ACT report cover — Actionable Ideas",
    prompt:
      "Abstract financial-markets image — a rising chart on a monitor with a blurred trading-floor bokeh behind it, deep blue tones, landscape 16:9, no readable text.",
  },
  researchSpecial: {
    src: "",
    label: "Special Reports cover — Global themes",
    prompt:
      "Global skyline montage at dusk — Mumbai, Singapore and New York silhouettes blended into one horizon, deep navy and teal, landscape 16:9, no readable text.",
  },

  /* ---------- Security Tips — features ---------- */
  securityFeatures: {
    src: "",
    label: "Online security illustration",
    prompt:
      "Clean, modern photo-illustration of online banking security — a person using a laptop with a glowing padlock-and-shield motif, deep blue tones with teal light, landscape 16:9, no readable text.",
  },
};
