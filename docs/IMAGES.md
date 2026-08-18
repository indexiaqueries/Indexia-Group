# Image Guide — Indexia Group Website

This guide lists every place on the site that wants a picture, with a ready-to-use
prompt for each. Slots marked **wired** already render a placeholder with the
prompt on the page — drop an image in and it appears automatically.

---

## How to add an image (3 steps)

1. **Save the file** into `public/images/<slot>/…` — e.g. `public/images/contact/mumbai.jpg`.
   (Use `.jpg` or `.webp`; `.webp` is preferred for smaller page weight.)
2. **Register it** in `src/data/siteImages.ts`: set `src` on the matching entry,
   e.g. `src: "images/contact/mumbai.jpg"`. Leave `src: ""` to keep the placeholder.
3. **Reload** — the placeholder is replaced by your image. If the file path is
   wrong, the placeholder comes back automatically (no broken-image icon).

If a slot is not wired yet, copy the pattern from any existing slot and add the
`<ImageSlot />` where you want it.

---

## Wired image slots (placeholders are live on the site now)

| Slot key | Page / section | Suggested file | Prompt |
|---|---|---|---|
| `contactCorporate` | Contact → Corporate Office card | `public/images/contact/corporate.jpg` | Photograph of the Indexia Group corporate office entrance in Mumbai's Fort district — a classic heritage-era Indian office building facade with warm evening light, deep-blue and teal color grade, landscape 16:9, no readable text. |
| `contactMumbai` | Contact → Mumbai Office card | `public/images/contact/mumbai.jpg` | Modern Indian office interior in Andheri West, Mumbai — branded reception area with employees collaborating at desks, natural daylight, deep blue + teal + yellow accents, landscape 16:9, no readable text. |
| `contactDelhi` | Contact → Delhi Office card | `public/images/contact/delhi.jpg` | Corporate office in Naraina Vihar, New Delhi — glass conference room overlooking the city with a professional team in discussion, cool blue tones, landscape 16:9, no readable text. |
| `contactInternational` | Contact → International (Ecuador) card | `public/images/contact/ecuador.jpg` | Quito, Ecuador cityscape with Andean mountains at golden hour — a modern office building in the foreground, warm golden light, landscape 16:9, no readable text. |
| `careersCulture` | Careers → Our Culture (banner) | `public/images/careers/culture.jpg` | Candid photograph of a diverse Indian office team collaborating in a bright modern workspace — laughter around a whiteboard, laptops and notebooks, natural light, warm and energetic, wide 16:9, no readable text. |
| `newsFeatured` | News → Featured Story (top) | `public/images/news/featured.jpg` | Editorial banking-and-finance hero photo — an Indian banker's hands signing a loan document next to a smartphone showing a banking app, shallow depth of field, deep navy and teal grade, landscape 16:9, no readable text. |
| `researchOTG` | Global Research → OTG report card | `public/images/research/otg.jpg` | Street-level documentary photograph of an Indian market or mandi — traders, produce and cash counters in motion, teal-and-blue grade, landscape 16:9, no readable text. |
| `researchACT` | Global Research → ACT report card | `public/images/research/act.jpg` | Abstract financial-markets image — a rising chart on a monitor with a blurred trading-floor bokeh behind it, deep blue tones, landscape 16:9, no readable text. |
| `researchSpecial` | Global Research → Special Reports card | `public/images/research/special.jpg` | Global skyline montage at dusk — Mumbai, Singapore and New York silhouettes blended into one horizon, deep navy and teal, landscape 16:9, no readable text. |
| `securityFeatures` | Security Tips → What We Do (banner) | `public/images/security/features.jpg` | Clean, modern photo-illustration of online banking security — a person using a laptop with a glowing padlock-and-shield motif, deep blue tones with teal light, landscape 16:9, no readable text. |

---

## Full site audit — everything that already has (or still wants) imagery

### 1. Home (`/`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero carousel (9 slides) | ✅ Yes — per-company photos | Already image-rich. Optional upgrade: replace the two placeholder-looking slides (Group, Finserve interior) with sharper hero photography — "cinematic wide shot, deep blue/teal grade, clear focal subject, space for a headline on the left". |
| Group companies cards (8) | ✅ Yes | Good as-is. Optional: unique photography per company rather than shared looks. |
| Above the footer CTA band | ❌ No | Optional single banner slot: "aerial view of the Mumbai skyline at dusk with the harbor, deep navy and teal grade, wide 21:9". |

### 2. Businesses (`/businesses`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes | Good as-is. |
| Company cards (8) | ✅ Yes | Good as-is. |

### 3. Company pages (`/businesses/:slug`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero + overview split | ✅ Yes | Good as-is. Optional: add a second distinct photo per company (operations, team, product) so hero and overview differ. |
| Warehouse / Advertising pricing + contact | ❌ Mostly text | Optional: "site photograph of the Shamli land parcel / a live unipole hoarding on NH-709B at golden hour, landscape 16:9". |

### 4. Contact (`/contact`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes | Good as-is. |
| Office location cards | 🔲 **Wired slots** | Use the office prompts above. Real photos of the actual offices are best. |
| Enquiry section | ❌ No | Optional side image: "customer-care representative at a desk smiling while taking a call, warm office light, teal accents, portrait 4:5". |

### 5. Careers (`/careers`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes | Good as-is. |
| Our Culture | 🔲 **Wired slot** | Use the culture prompt above. |
| Open roles | ❌ No | Optional: "team meeting around a table with laptops and coffee, candid, natural window light". |

### 6. News (`/news`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes (shared footer image) | Optional: dedicated editorial hero. |
| TV ad video | ✅ Yes (YouTube embed) | Good as-is. |
| Featured story | 🔲 **Wired slot** | Use the featured-story prompt above. |
| News grid cards | ❌ No | Optional small thumbnails per story: "banking news thumbnail — currency notes, NEFT/UPlI symbols, minimal, teal/navy". |

### 7. Global Research (`/global-research`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes (shared footer image) | Optional: dedicated "charts + terminal" hero. |
| Research areas (7 cards) | ❌ No | Optional icon-topped gradient cards instead of photos (keeps it clean). |
| Report covers | 🔲 **Wired slots** | Use the report prompts above. |

### 8. Security Tips (`/security-tips`)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes (shared BusinessesHero image) | Optional: dedicated "secure banking" hero. |
| What We Do | 🔲 **Wired slot** | Use the security illustration prompt above. |
| Practices / Contacts | ❌ No | Optional small illustrations per tip (lock, shield, phone icons already suffice). |

### 9. Legal pages (Privacy / Terms / Terms of Use)
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Hero | ✅ Yes (shared footer image) | Optional: subtle "documents + fountain pen" still-life. Body should stay text-first. |

### 10. Shared
| Area | Has image? | Recommendation / prompt |
|---|---|---|
| Footer background | ✅ Yes | Good as-is. |
| Brochure pages (`/warehouse-brochure`, `/advertising-brochure`) | ✅ Yes (band imagery) | Optional: real project-site photos for authenticity. |

---

## Art direction notes (applies to every prompt)

- **Brand palette:** deep navy `#0c3652`, teal `#26ae90`, blue `#066a9c`, yellow `#f2f231`. Grade photos toward navy/teal for a cohesive look.
- **No readable text/logos** in generated imagery — on-screen text will look broken.
- **Aspect ratios:** 16:9 landscape for banners/cards; 4:5 portrait for side images; 21:9 for full-width bands.
- **Mood:** professional, warm, trustworthy, human. Avoid dark/depressing tones.
- **File weight:** aim ≤ 300 KB per image; prefer `.webp`; keep the existing 1536×1024 source size for cards.
- **Real photography beats generated** for offices, people, and project sites — use prompts mainly for conceptual/missing shots.
