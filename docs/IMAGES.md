# Image Guide - Indexia Group Website

Reusable imagery lives in `src/assets` and is registered in `src/data/siteImages.ts`.

## Folder Map

| Folder | Use |
|---|---|
| `src/assets/company-img` | Company hero/card images |
| `src/assets/contact-img` | Contact office cards and customer-care form image |
| `src/assets/careers-img` | Careers culture and roles imagery |
| `src/assets/footer-img` | Shared footer / editorial background |
| `src/assets/hero-img` | Businesses, contact, and passbook hero imagery |
| `src/assets/logo` | Brand logo assets |
| `src/assets/news&knowledge-img` | News and knowledge feature imagery |
| `src/assets/pages-img` | Shared page-section images |
| `src/assets/security-img` | Security tips feature imagery |

## Wired Slots

| Slot key | Page / section | Current source |
|---|---|---|
| `contactCorporate` | Contact office card | `src/assets/contact-img/corporateoffice.webp` |
| `contactMumbai` | Contact office card | `src/assets/contact-img/mumbaioffice.webp` |
| `contactDelhi` | Contact office card | `src/assets/contact-img/delhioffice.webp` |
| `contactInternational` | Contact office card | `src/assets/contact-img/internationaloffice.webp` |
| `contactEnquiry` | Contact form top image | `src/assets/contact-img/customercare.webp` |
| `companyImpact` | Company pages impact band | `src/assets/pages-img/company-impact.webp` |
| `companyStory` | Company pages story split | `src/assets/pages-img/company-story.webp` |
| `companyEnquiry` | Company pages enquiry section | `src/assets/pages-img/company-enquiry-support.webp` |
| `careersCulture` | Careers culture section | `src/assets/careers-img/office-culture.webp` |
| `careersOpenRoles` | Careers open roles section | `src/assets/careers-img/team-collaboration.webp` |
| `newsFeatured` | News featured story | `src/assets/news&knowledge-img/featured-story.webp` |
| `researchOTG` | Global Research OTG report | Placeholder |
| `researchACT` | Global Research ACT report | Placeholder |
| `researchSpecial` | Global Research special reports | Placeholder |
| `securityFeatures` | Security tips feature image | `src/assets/security-img/online-security.webp` |

## Adding Images

1. Add the optimized file to the matching `src/assets/<folder>`.
2. Import it in `src/data/siteImages.ts`.
3. Assign the imported asset to the slot's `src`.
4. Keep `src: ""` only for slots that should show a simple placeholder.
