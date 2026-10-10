export interface LocalizedText { ta: string | null; en: string | null; }
export type CatalogLanguage = 'ta' | 'en' | 'both';
export type ProductUnitType = 'Box' | 'Pkt' | 'Piece' | 'Pcs';
export interface ProductUnit { quantity: number; type: ProductUnitType; }
export interface CatalogCategory {
  id: string; slug: string; name: LocalizedText; sourceName: string;
  icon: string; color: string; bg: string; displayOrder: number;
}
export interface CatalogProduct {
  id: string; slug: string; categoryId: string; name: LocalizedText;
  sourceName: string; sourceTextVerified: boolean; unit: ProductUnit;
  rate: number; currency: 'INR'; image: string | null; featured: boolean;
  searchAliases: string[]; displayOrder: number; sourceReference: string;
}
export interface CatalogMeta {
  business: string; location: string; catalogueYear: number; currency: 'INR';
  source: string; languageMode: CatalogLanguage; priceDisclaimer: string;
}
