import metaJson from '@/data/catalog/catalog-meta.json';
import categoriesJson from '@/data/catalog/categories.json';
import productsJson from '@/data/catalog/products.json';
import {validateCatalog} from './validate-catalog';
import type {CatalogCategory,CatalogMeta,CatalogProduct} from './types';

export const catalogMeta=metaJson as CatalogMeta;
export const categories=categoriesJson as CatalogCategory[];
export const products=productsJson as CatalogProduct[];
validateCatalog(categories,products);
