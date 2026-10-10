# VRP Crackers — Phase 1

Customer-facing catalogue for a physical store in Mecheri, Salem. No online checkout, payment processing, reservations, delivery, accounts, stock management, APIs or admin panel.

## Pages
Home; /crackers; 10 category routes; 137 product detail routes; /price-list; /brands; /gallery; /about; /safety; /contact; /enquiry; /privacy; /terms; loading, error and 404 states.

## Reusable components
SiteHeader, SiteFooter, mobile navigation/action bar, search overlay, PageIntro, Breadcrumb, SectionHeader, CategoryCard, ProductVisual, ProductCard, ProductGrid, AddEnquiry, ContactButton, EmptyState, SafetyStrip, StoreLocation, FAQs, FinalCTA. Shared enquiry context lives in components/vrp/store.tsx.

## Data
Central source: data/catalogue.ts. Contains products, categories, brand labels, site configuration, gallery references, FAQs and an empty verified-review collection. All product availability is unknown. Prices and English product-name transliterations were manually transcribed from the supplied 2026 price sheet and require business verification. No fabricated discounts, ratings, licence details or trading history.

## Interactions
Catalogue search, category/brand/budget/type/availability filters, sorting, URL filter state, load more, mobile filter sheet, keyboard search, product image/reference switcher, information tabs, local persistent Enquiry List add/remove, copied enquiry message, prepared WhatsApp enquiry, reference-sheet lightbox, gallery filters/lightbox, FAQ accordion, optional Mecheri locality map. Phone, WhatsApp and exact map links activate when configuration is provided. No message is sent automatically. Browser WebMCP tools stage/read/remove the same local enquiry state when supported.

## Needed before customer launch
Verified phone and WhatsApp number; full address, landmark and exact Google Maps store pin; opening hours; actual product/shop photos; verified complete brand names/logos; current prices and pack details; confirmed in-store payment methods; genuine customer reviews, if available; social profile URLs. Hero is illustrative, product imagery is explicitly pending, and store-gallery collections use honest empty states.

## Suggested Phase 2
Store-managed product/category/brand content, price/availability updates, real asset uploads, store settings and a simple secured admin. Retain enquiry-only catalogue behaviour unless the owner explicitly changes scope. PDF price-list generation is currently a labelled future capability.

## Verification
TypeScript check and production build. Browser-based responsive and WebMCP validation are unavailable in this environment because the required browser-control capability is not installed. Responsive layouts cover 375, 430, 768, 1024 and 1440px with compact navigation, mobile filters, two-column mobile product grids and safe-area bottom actions.

## Open and edit the exported code

Install Node.js 24, enable Corepack (`corepack enable`), then run `pnpm install` and `pnpm dev` in the extracted project. Open the local URL printed by the development server. This uses the Next.js App Router component structure with Vinext/Vite for Sites-compatible hosting. It is not a standard unmodified `next dev` project.

- Pages and catalogue filters: components/vrp/pages.tsx
- Shared cards, navigation and verified price presentation: components/vrp/shared.tsx
- Local Enquiry List and contact actions: components/vrp/store.tsx
- Styling and fonts: app/globals.css and app/layout.tsx
- Products, genuine comparison prices and store details: data/catalogue.ts

Navigation uses native anchors and normal browser navigation. WhatsApp fallback routes to the Enquiry List; missing Call/Directions information routes to the Contact page. Confirm phone, WhatsApp and exact map URL in siteConfig to enable real contact actions.

Crossed-out prices require both a genuine originalPrice and originalPriceVerified=true. They render only if the verified originalPrice exceeds displayPrice. No inflated baseline prices are included.
