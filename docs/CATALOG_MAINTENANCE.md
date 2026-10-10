# Catalogue maintenance

The only product source is `data/catalog/products.json`. Categories are in `data/catalog/categories.json`. All pages, search, price list and enquiry messages read those files through `lib/catalog/selectors.ts`.

## Change a price

1. Find the record by its stable `id` or `slug` in `products.json`.
2. Change only its `rate`.
3. Keep `currency` as `INR`.
4. Run the project checks and publish.

## Add a product

1. Add one record to `products.json` with a new stable sequential `id` and slug.
2. Use an existing `categoryId` from `categories.json`.
3. Preserve the printed source text in `sourceName`; use `name.ta` and/or `name.en` only when known.
4. Add the exact `unit` and `rate` from the price sheet.
5. Set `image` to `null` until a genuine product image is available.
6. Give it the next `displayOrder` and source reference.

## Rename, translate, move or remove

- Correct a Tamil name in `name.ta` and an English name in `name.en` without changing the stable id or slug.
- Move a product by changing its `categoryId`.
- Remove a product by removing its one JSON record; its cards, price-list row and search entry disappear automatically.
- Add a category only when it is present in an official source, then use its id from products.

## Product images and language

Product images are automatic. Export the genuine product photograph and name it with the product's stable id. WebP is preferred; JPG, JPEG and PNG are also detected automatically:

- `product-001.webp`
- `product-002.webp`
- …
- `product-137.webp`

Place the files in `public/assets/products/`. A matching image replaces the fallback automatically on the catalogue card, enquiry list and product page—no JSON edit is required. Use a square image (recommended: 900 × 900 px), keep the product centred, and aim for less than 180 KB per file. Do not add images for products that are not in the official price sheet.

The optional `image` field may still point to a different local path when a product needs a non-standard filename. The display helper supports Tamil, English, or both through the catalog language setting; it never requires a translation field to be populated.

## Gallery photos

Place genuine cracker photos in `public/assets/gallery/` as WebP files (recommended: 1400 × 1050 px and less than 300 KB). Then add a gallery entry in `data/site.ts` with `isCracker: true`. The VRP logo is intentionally not used as a gallery item.

## Pricing display

Every final selling price is the official `rate` from the supplied 2026 sheet. The crossed-out comparison price is derived by applying a consistent 13% catalogue discount; it is not another value read from the sheet.

## Validation

`lib/catalog/validate-catalog.ts` checks ids, slugs, category references, units and rates whenever the catalogue module is loaded during a build. Run the existing project checks before publishing.
