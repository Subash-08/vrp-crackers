import type {CatalogCategory,CatalogProduct,ProductUnitType} from './types';

const units: ProductUnitType[]=['Box','Pkt','Piece','Pcs'];
function duplicates(values:string[]){return values.filter((value,index)=>values.indexOf(value)!==index);}

export function validateCatalog(categories:CatalogCategory[],products:CatalogProduct[]){
  const errors:string[]=[];
  const categoryIds=new Set(categories.map(c=>c.id));
  for(const duplicate of duplicates(categories.map(c=>c.id)))errors.push(`Duplicate category id: ${duplicate}`);
  for(const duplicate of duplicates(categories.map(c=>c.slug)))errors.push(`Duplicate category slug: ${duplicate}`);
  for(const duplicate of duplicates(products.map(p=>p.id)))errors.push(`Duplicate product id: ${duplicate}`);
  for(const duplicate of duplicates(products.map(p=>p.slug)))errors.push(`Duplicate product slug: ${duplicate}`);
  for(const product of products){
    if(!categoryIds.has(product.categoryId))errors.push(`${product.id}: invalid categoryId ${product.categoryId}`);
    if(!product.sourceName.trim()&&!product.name.ta&&!product.name.en)errors.push(`${product.id}: missing product name`);
    if(!Number.isFinite(product.rate)||product.rate<0)errors.push(`${product.id}: invalid rate`);
    if(!Number.isInteger(product.unit.quantity)||product.unit.quantity<1||!units.includes(product.unit.type))errors.push(`${product.id}: invalid unit`);
  }
  for(const category of categories)if(!products.some(product=>product.categoryId===category.id))errors.push(`${category.id}: category has no products`);
  if(errors.length)throw new Error(`Catalog validation failed:\n${errors.join('\n')}`);
}
