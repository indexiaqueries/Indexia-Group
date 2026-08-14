# Module Conventions

How code is organized in `src/`. Follow these rules when adding or restructuring files so new modules match the existing shape (`banners/hero/`, `common/header/`, `contact/enquiry/`, `pages/news/`, `pages/careers/`).

## Directory map

```
src/
  components/
    banners/          full-bleed hero banners
      hero/           HomeHero internals (slides, motion, background, content)
    businesses/       company detail + shared business pieces (serviceIcons)
    cards/            reusable cards (BusinessCard, CompanyLinkCard, …)
    common/           site chrome shared everywhere
      header/         Header internals (dropdowns, menus, scroll hook)
    contact/          contact page pieces
      enquiry/        EnquiryForm internals (fields, validation, Field)
    ui/               low-level shadcn/ui primitives (button, input, …)
  data/               static content modules (companies, news, careers, legal, …)
  hooks/              shared hooks
  i18n/               i18next setup + per-language locale JSON
  layout/             page layout shell
  lib/                theme tokens, motion helpers, utilities
  pages/              route-level pages (one folder per page with sections)
    news/             NewsPage section components + newsData
    careers/          CareersPage section components + careersData
  routes/             router definitions
```

## When a file gets its own folder

A component passes ~150 lines or mixes several concerns; or a feature needs 2+ sibling pieces that only it uses. Move those pieces into a lowercase, feature-named folder next to the file that owns them:

- `src/components/common/Header.tsx` owns `src/components/common/header/` (the folder is the lowercase form of the owner).
- `src/components/banners/HomeHero.tsx` owns `src/components/banners/hero/`.
- `src/pages/NewsPage.tsx` owns `src/pages/news/`.

Anything inside a feature folder must not be imported outside that folder's page/component — if two features share it, it belongs in `components/`, `lib/`, or `data/`.

## Naming

| Thing | Style | Example |
|---|---|---|
| React component file | `PascalCase.tsx` | `HeroSlideContent.tsx` |
| Hook | `usePascalCase.ts` | `useHeaderScroll.ts` |
| Data/content resolver | `kebabCase.ts` or `PascalCase.ts` | `newsData.ts` |
| Pure helpers / constants | `camelCase.ts` | `heroMotion.ts`, `navPill.ts` |
| Types | exported from the module that owns them | `MorphRect` from `HeroBackground.tsx`, `ArticleItem` from `newsData.ts` |

Names say what the module is, not where it lives (`heroData.ts`, never `stuff.ts` or `utils2.ts`).

## Composition pattern

The owner keeps **state, wiring, and orchestration**; section components are **prop-driven and dumb**.

- `HomeHero.tsx` owns slide state, autoplay, morph geometry — `HeroBackground`/`HeroSlideContent` just render props.
- `Header.tsx` owns open/close state for the three menus and the outside-click handler — `CompaniesMenu`/`LanguageMenu`/`MobileMenu` are controlled components (`open`, `onToggle`, `onClose`).
- `NewsPage.tsx` / `CareersPage.tsx` are ~50-line compositions of section components.
- `EnquiryForm.tsx` owns form state and submit; `Field`, `validation.ts`, `fields.ts` are pure.

Rule of thumb: if a piece takes more than ~3 props of wiring, it belongs in the orchestrator, not the child.

## Content & data resolution

Content that is translated (or otherwise computed from `data/`) resolves through a per-page module:

- `src/pages/news/newsData.ts` exports `useNewsContent()`, `companyColor`, `newsJsonLd`, and the `ArticleItem`/`InsightItem` types used by section props.
- `src/pages/careers/careersData.ts` exports `useCareersContent()` and the role/value/step types.

The resolver returns fully-shaped data; sections never call `useTranslation` for content they didn't build. English stays authoritative in `src/data/*.ts`; translated `pageContent` blocks live in `src/i18n/locales/*.json` and resolve with `t(key, { defaultValue })` so a missing key never breaks the page.

## i18n conventions

- Keys are passed **as data** (`labelKey: "form.name"`, `titleKey: "footer.company"`) or via templates (`t(\`legal.${docId}Title\`)`) — plain literal `t("key")` calls are the exception, not the rule.
- When a key becomes unused, delete it from **all six locale files** (`en es fr de it pt`) in the same change.
- Locales are lazy per-language chunks (`src/i18n/index.ts` `loadLocale`); adding a language is one case there plus one entry in `SUPPORTED_LANGS` (`src/i18n/languages.ts`).

## Code hygiene

- **No comments.** This is a deliberate, enforced convention (the codebase was stripped of all comments). If code needs explaining, the name or structure is wrong.
- **No dead exports.** A type used only to shape its own file's data is not exported (`NewsArticle`, `JobRole`, `BusinessCardItem`, … are module-local). Export only what another file imports.
- **No dead CSS.** Custom classes in `src/index.css` must be applied somewhere; remove the rule when the last usage goes.
- Shared visual state lives in one place: `lib/theme.ts` tokens, CSS classes like `.header-scrim` for the glass bar, `header/navPill.ts` for the pill styling — never re-declared per component.
- The same motion/variant constants are imported, not copied (`heroMotion.ts`, `lib/motion.ts`).

## Performance guardrails

- Route pages are lazy-loaded (`React.lazy` in `src/routes/AppRoutes.tsx`) — new pages must be too.
- Images: WebP, sized to display (hero ≤ 1920w), no multi-MB assets. A 2 MB+ image is a bug.
- Below-fold images use `loading="lazy"`; above-fold heroes use `fetchPriority="high"` + explicit `width`/`height`.

## Checklist for a new page or feature module

1. Owner file keeps state/wiring; extract sections into a `lowercase/` folder beside it.
2. Sections are prop-driven; shared content resolution lives in one `XData.ts` module.
3. New i18n keys are added to all six locales (or removed from all six if dead).
4. New exports are actually imported somewhere; no comments; meaningful names.
5. Verify with `npm run lint`, `npx tsc -b --noEmit`, `npm run build`.
