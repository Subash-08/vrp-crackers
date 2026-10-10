import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {SitePage} from '@/components/vrp/pages';
import {formatUnit,getCategoryBySlug,getCategoryDisplayName,getProductBySlug,getProductDisplayName} from '@/lib/catalog/selectors';
type Props={params:Promise<{path:string[]}>};
const names:Record<string,string>={crackers:'Crackers Catalogue','price-list':'2026 Price List',gallery:'Gallery',about:'About VRP',safety:'Celebrate Responsibly',contact:'Delivery & Contact',enquiry:'Enquiry List',privacy:'Privacy',terms:'Catalogue Terms'};
function valid(path:string[]){if(path[0]==='crackers'){if(path.length===1)return true;if(path.length===2)return Boolean(getCategoryBySlug(path[1]));if(path.length===3){const product=getProductBySlug(path[2]);return Boolean(product&&product.categoryId===path[1]);}return false;}return path.length===1&&Boolean(names[path[0]]);}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {path}=await params;const product=path.length===3?getProductBySlug(path[2]):undefined;const category=path.length===2?getCategoryBySlug(path[1]):undefined;return {title:product?getProductDisplayName(product):category?getCategoryDisplayName(category):names[path[0]]||'Page not found',description:product?`${getProductDisplayName(product)} · ${formatUnit(product.unit)} · VRP Crackers, Mecheri.`:undefined};}
export default async function Page({params}:Props){const {path}=await params;if(!valid(path))notFound();return <SitePage path={path}/>;}

