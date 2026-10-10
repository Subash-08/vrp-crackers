import {catalogMeta,categories,products} from './catalog';
import type {CatalogCategory,CatalogLanguage,CatalogProduct,LocalizedText,ProductUnit} from './types';

export {catalogMeta,categories,products};
export const catalogLanguageMode:CatalogLanguage=catalogMeta.languageMode;
export const formatPrice=(rate:number)=>`₹${rate.toLocaleString('en-IN')}`;
export const formatUnit=(unit:ProductUnit)=>`${unit.quantity} ${unit.type}`;
export const catalogueDiscountPercent=13;
export const getOriginalPrice=(rate:number)=>Math.round(rate/(1-catalogueDiscountPercent/100));
export function getLocalizedText(value:LocalizedText,language:CatalogLanguage=catalogLanguageMode){
  if(language==='ta')return value.ta||value.en||'';
  if(language==='en')return value.en||value.ta||'';
  return value.ta&&value.en&&value.ta!==value.en?`${value.ta}\n${value.en}`:value.ta||value.en||'';
}
export const getProductDisplayName=(product:CatalogProduct,language:CatalogLanguage=catalogLanguageMode)=>getLocalizedText(product.name,language)||product.sourceName;
export const getCategoryDisplayName=(category:CatalogCategory,language:CatalogLanguage=catalogLanguageMode)=>getLocalizedText(category.name,language)||category.sourceName;
export const getAllProducts=()=>[...products].sort((a,b)=>a.displayOrder-b.displayOrder);
export const getCategories=()=>[...categories].sort((a,b)=>a.displayOrder-b.displayOrder);
export const getCategoryBySlug=(slug:string)=>categories.find(category=>category.slug===slug);
export const getProductBySlug=(slug:string)=>products.find(product=>product.slug===slug);
export const getProductsByCategory=(categoryId:string)=>getAllProducts().filter(product=>product.categoryId===categoryId);
export const getCategoryProductCount=(categoryId:string)=>getProductsByCategory(categoryId).length;
export const getHomepageProducts=(limit=4)=>getAllProducts().slice(0,limit);
export const getProductsByPriceRange=(min:number,max?:number)=>getAllProducts().filter(product=>product.rate>=min&&(max===undefined||product.rate<=max));
export function searchProducts(query:string){const normalized=query.trim().toLocaleLowerCase();if(!normalized)return getAllProducts();return getAllProducts().filter(product=>[product.sourceName,product.name.ta,product.name.en,...product.searchAliases].filter((value):value is string=>Boolean(value)).some(value=>value.toLocaleLowerCase().includes(normalized)));}
export const productUrl=(product:CatalogProduct)=>`/crackers/${product.categoryId}/${product.slug}`;
