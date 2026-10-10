'use client';
import {useEffect,useState,type ReactNode} from 'react';
import {SiteLink as Link} from './site-link';
import {useStore} from './store';
import {catalogueDiscountPercent,categories,formatPrice,formatUnit,getAllProducts,getCategories,getCategoryDisplayName,getCategoryProductCount,getOriginalPrice,getProductDisplayName,productUrl} from '@/lib/catalog/selectors';
import type {CatalogProduct} from '@/lib/catalog/types';
import {faqs,howToSteps,siteConfig} from '@/data/site';
import {Search,Menu,Phone,MessageCircle,MapPin,ClipboardList,Sparkles,Flame,Orbit,Rocket,Star,PartyPopper,Gift,Zap,Plus,Check,Store,ShieldCheck,Package,Heart,ChevronRight,Clock,Camera,ShoppingCart,Home,FileText,Tag} from 'lucide-react';
import {Sheet,SheetContent,SheetHeader,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Command,CommandInput,CommandList,CommandGroup,CommandItem,CommandEmpty} from '@/components/ui/command';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {Empty,EmptyHeader,EmptyTitle,EmptyDescription,EmptyMedia} from '@/components/ui/empty';
const iconMap={sparkles:Sparkles,flame:Flame,orbit:Orbit,rocket:Rocket,star:Star,party:PartyPopper,gift:Gift,zap:Zap};
export function CategoryIcon({category,size=28}:{category:string;size?:number}){const c=categories.find(item=>item.id===category);const Icon=iconMap[(c?.icon||'sparkles') as keyof typeof iconMap];return <Icon size={size} strokeWidth={1.4}/>}
export function ContactButton({mode,children,className='btn outline',selected}:{mode:'call'|'whatsapp'|'directions';children?:ReactNode;className?:string;selected?:CatalogProduct[]}){const {contact}=useStore();const Icon=mode==='call'?Phone:mode==='whatsapp'?MessageCircle:MapPin;return <button className={className} onClick={()=>contact(mode,selected)}><Icon size={18}/>{children||(mode==='call'?'Call Store':mode==='whatsapp'?'WhatsApp':'Get Directions')}</button>}
const nav=[['Home','/'],['Crackers','/crackers'],['Categories','/#categories'],['Price List','/price-list'],['Gallery','/gallery'],['About','/about'],['Safety','/safety'],['Contact','/contact']];
export function SiteHeader(){const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[query,setQuery]=useState('');const {ids}=useStore();const [path,setPath]=useState('/');useEffect(()=>setPath(window.location.pathname),[]);const selected=(href:string)=>href==='/'?path==='/':href.includes('#')?false:path===href;const openProduct=(p:CatalogProduct)=>{setSearch(false);setQuery('');window.location.assign(productUrl(p));};const matching=query?getAllProducts().filter(p=>getProductDisplayName(p).toLocaleLowerCase().includes(query.toLocaleLowerCase())||p.sourceName.toLocaleLowerCase().includes(query.toLocaleLowerCase())):getAllProducts();return <><div className="topbar"><div className="wrap"><span><MapPin size={13}/>VRP Crackers · Mecheri, Salem</span><span>Manufacturer-coordinated delivery</span><Link href="/contact">How delivery works <ChevronRight size={13}/></Link></div></div><header className="site-header"><div className="wrap header-row"><Link href="/" className="brand" aria-label="VRP Crackers Home"><img src="/assets/vrp-logo.webp" alt="VRP Crackers Mecheri" width="52" height="52"/><span><strong>VRP <b>CRACKERS</b></strong><small>MECHERI · SALEM</small></span></Link><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label,href])=><Link key={label} href={href} className={selected(href)?'active':''}>{label}</Link>)}</nav><div className="header-actions"><button className="icon-btn" aria-label="Search crackers" onClick={()=>setSearch(true)}><Search size={21}/></button><Link className="icon-btn enquiry-header" aria-label={`Enquiry List, ${ids.length} products`} href="/enquiry"><ClipboardList size={21}/>{ids.length>0&&<span className="count">{ids.length}</span>}</Link><ContactButton mode="whatsapp" className="btn primary header-whatsapp">Enquire</ContactButton><button className="icon-btn menu-toggle" aria-label="Open menu" onClick={()=>setMenu(true)}><Menu size={24}/></button></div></div></header><Sheet open={menu} onOpenChange={setMenu}><SheetContent className="mobile-menu"><SheetHeader><SheetTitle>VRP Crackers</SheetTitle><SheetDescription>Mecheri · Salem</SheetDescription></SheetHeader><nav aria-label="Mobile navigation">{nav.map(([label,href])=><Link key={label} href={href} onClick={()=>setMenu(false)}>{label}</Link>)}<Link href="/enquiry" onClick={()=>setMenu(false)}>Enquiry List ({ids.length})</Link></nav></SheetContent></Sheet><Dialog open={search} onOpenChange={setSearch}><DialogContent className="search-dialog"><DialogHeader><DialogTitle>Find your celebration favourites</DialogTitle><DialogDescription>Search the official 2026 catalogue.</DialogDescription></DialogHeader><Command><CommandInput value={query} onValueChange={setQuery} placeholder="Search products" aria-label="Search products"/><CommandList><CommandEmpty><p>No matching crackers found.</p></CommandEmpty>{!query&&<CommandGroup heading="Categories">{getCategories().slice(0,4).map(c=><CommandItem key={c.id} value={getCategoryDisplayName(c)} onSelect={()=>{setSearch(false);window.location.assign('/crackers/'+c.slug)}}><CategoryIcon category={c.id} size={18}/>{getCategoryDisplayName(c)}</CommandItem>)}</CommandGroup>}<CommandGroup heading="Products">{matching.map(p=><CommandItem key={p.id} value={`${getProductDisplayName(p)} ${p.sourceName} ${p.id}`} onSelect={()=>openProduct(p)}><CategoryIcon category={p.categoryId} size={20}/><span>{getProductDisplayName(p)}<small className="command-meta">{formatUnit(p.unit)}</small></span><span className="command-price">{formatPrice(p.rate)}</span></CommandItem>)}</CommandGroup></CommandList></Command></DialogContent></Dialog><nav className="festive-mobile-nav" aria-label="Mobile navigation"><Link className={`festive-nav-item ${path==='/'||path==='/crackers'?'active':''}`} href="/crackers"><Home size={20}/><span>Shop</span></Link><Link className={`festive-nav-item ${path==='/enquiry'?'active':''}`} href="/enquiry"><ShoppingCart size={20}/><span>Cart</span>{ids.length>0&&<span className="festive-nav-badge">{ids.length}</span>}</Link><Link className={`festive-nav-item ${path==='/price-list'?'active':''}`} href="/price-list"><FileText size={20}/><span>Price List</span></Link><ContactButton mode="whatsapp" className="festive-nav-item"><span>WhatsApp</span></ContactButton></nav></>}
export function SiteFooter(){return <footer className="site-footer"><div className="footer-shell wrap"><div className="footer-cta"><div><span className="footer-kicker"><Sparkles size={13}/> ONE ENQUIRY · ALL 137 PRODUCTS</span><h2>Your celebration list,<br/><span>made simple.</span></h2><p>Shortlist individual products or build one combined enquiry. We’ll confirm availability and manufacturer-coordinated delivery on WhatsApp.</p></div><div className="footer-cta-actions"><Link href="/crackers" className="btn footer-light">Browse Products</Link><ContactButton mode="whatsapp" className="btn footer-whatsapp">Start on WhatsApp <ChevronRight size={17}/></ContactButton></div></div><div className="footer-grid"><div className="footer-brand"><Link href="/" className="brand"><img src="/assets/vrp-logo.webp" width="60" height="60" alt="VRP Crackers"/><span><strong>VRP CRACKERS</strong><small>MECHERI · SALEM</small></span></Link><p>Official 2026 catalogue for individual and combined product enquiries.</p><span className="footer-location"><MapPin size={16}/> Mecheri, Salem, Tamil Nadu</span></div><div><h3>Shop</h3><Link href="/crackers">All Crackers</Link><Link href="/#categories">Categories</Link><Link href="/price-list">Price List</Link><Link href="/enquiry">My Enquiry</Link></div><div><h3>Help</h3><Link href="/contact">How to Enquire</Link><Link href="/safety">Safety Guide</Link><Link href="/gallery">Gallery</Link><Link href="/about">About VRP</Link></div><div className="footer-enquiry"><h3>Contact</h3><strong>Need help choosing?</strong><small>Chat with VRP Crackers for product availability and delivery details.</small><ContactButton mode="whatsapp" className="footer-contact">+91 70108 47049</ContactButton></div></div><div className="footer-wordmark" aria-hidden="true">VRP <span>CRACKERS</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VRP Crackers</span><p>Manufacturer-coordinated delivery · Mecheri, Salem</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div></div></footer>}
export function Breadcrumb({items}:{items:{label:string;href?:string}[]}){return <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item,index)=><span key={index}><ChevronRight size={13}/>{item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</span>)}</nav>}
export function PageIntro({eyebrow,title,description,items,children}:{eyebrow?:string;title:string;description?:string;items?:{label:string;href?:string}[];children?:ReactNode}){return <div className="page-intro"><div className="wrap"><Breadcrumb items={items||[{label:title}]}/><div className="page-intro-row"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description&&<p>{description}</p>}</div>{children}</div></div></div>}
export function SectionHeader({eyebrow,title,description,href,linkText='Explore all'}:{eyebrow?:string;title:string;description?:string;href?:string;linkText?:string}){return <div className="section-heading"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description&&<p>{description}</p>}</div>{href&&<Link href={href} className="text-link">{linkText}</Link>}</div>}

// 4-point star sparkle matching reference design
export function FestiveStarSpark({size=40,color='#cca299'}:{size?:number;color?:string}){
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 3 C16 11 11 16 3 16 C11 16 16 21 16 29 C16 21 21 16 29 16 C21 16 16 11 16 3 Z"/>
    <circle cx="25" cy="24" r="1.5" fill={color}/>
  </svg>;
}

// ProductVisual: shows real product photo if p.image is set, otherwise category illustration
export function ProductVisual({p,large=false}:{p:CatalogProduct;large?:boolean}){
  const category=categories.find(item=>item.id===p.categoryId)!;
  const name=getProductDisplayName(p);
  const imageCandidates=Array.from(new Set([p.image,`/assets/products/${p.id}.webp`,`/assets/products/${p.id}.jpg`,`/assets/products/${p.id}.jpeg`,`/assets/products/${p.id}.png`].filter((src):src is string=>Boolean(src))));
  const [imageIndex,setImageIndex]=useState(0);
  if(imageIndex<imageCandidates.length){
    return <div className={`product-visual product-visual-photo ${large?'large':''}`} style={{background:category.bg}}>
      <img src={imageCandidates[imageIndex]} alt={name} loading={large?'eager':'lazy'} onError={()=>setImageIndex(index=>index+1)}/>
    </div>
  }
  return <div className={`product-visual ${large?'large':''}`} style={{background:category.bg,color:category.color}}>
    <span className="visual-category">{getCategoryDisplayName(category)}</span>
    <CategoryIcon category={p.categoryId} size={large?72:42}/>
    <span className="visual-size">{name.split(' ').slice(0,3).join(' ')}</span>
    <span className="visual-label">PHOTO COMING SOON</span>
  </div>
}

export function AddEnquiry({p,className='add-enquiry'}:{p:CatalogProduct;className?:string}){const {ids,add,remove}=useStore();const added=ids.includes(p.id);return <button className={`${className} ${added?'added':''}`} onClick={()=>added?remove(p.id):add(p.id)} aria-label={`${added?'Remove from enquiry:':'Add to enquiry:'} ${getProductDisplayName(p)}`} aria-pressed={added}>{added?<Check size={17}/>:<Plus size={17}/>} {added?'Remove from Enquiry':'Add to Enquiry'}</button>}

// Pricing: shows strikeout MRP (rate * 1.20 rounded), actual rate, and discount %
export function getStrikePrice(rate:number){return getOriginalPrice(rate)}
export function getDiscount(_rate?:number){return catalogueDiscountPercent}
export function ProductPricing({p,detail=false,compact=false}:{p:CatalogProduct;detail?:boolean;compact?:boolean}){
  const mrp=getStrikePrice(p.rate);
  const disc=getDiscount(p.rate);
  if(compact){
    return <div className="product-price price-compact">
      <strong>{formatPrice(p.rate)}</strong>
      <span className="compare-price"><s>{formatPrice(mrp)}</s></span>
      <span className="discount-label">-{disc}%</span>
    </div>
  }
  if(detail){
    return <div className="price-detail">
      <strong>{formatPrice(p.rate)}</strong>
      <span className="compare-price"><s>{formatPrice(mrp)}</s></span>
      <span className="discount-label">Save {disc}%</span>
      <small className="price-reference">{formatUnit(p.unit)} · 2026 reference price</small>
    </div>
  }
  return <div className="product-price">
    <strong>{formatPrice(p.rate)}</strong>
    <span className="compare-price"><s>{formatPrice(mrp)}</s></span>
    <span className="discount-label">-{disc}%</span>
    <small className="price-reference">2026 ref</small>
  </div>
}

// Festive product card matching user reference images
export function ProductCard({p}:{p:CatalogProduct}){
  const {ids,add,remove}=useStore();
  const added=ids.includes(p.id);
  const category=categories.find(item=>item.id===p.categoryId)!;
  const mrp=getStrikePrice(p.rate);
  const disc=getDiscount(p.rate);
  const displayName=p.name.ta||getProductDisplayName(p);
  const englishName=p.name.en;
  const subCategory=category.name.ta||getCategoryDisplayName(category);
  const imageCandidates=Array.from(new Set([p.image,`/assets/products/${p.id}.webp`,`/assets/products/${p.id}.jpg`,`/assets/products/${p.id}.jpeg`,`/assets/products/${p.id}.png`].filter((src):src is string=>Boolean(src))));
  const [imageIndex,setImageIndex]=useState(0);

  return <article className="festive-card">
    <div className="festive-card-visual">
      <span className="festive-badge">{disc}% OFF</span>
      <Link href={productUrl(p)} className="festive-image-link" aria-label={`View ${displayName}`}>
        {imageIndex<imageCandidates.length ? (
          <img src={imageCandidates[imageIndex]} alt={displayName} loading="lazy" onError={()=>setImageIndex(index=>index+1)}/>
        ) : (
          <div className="festive-spark-placeholder">
            <FestiveStarSpark size={44} color="#cca299"/>
          </div>
        )}
      </Link>
    </div>
    <div className="festive-card-content">
      <Link href={productUrl(p)} className="festive-card-title" title={`${displayName} (${p.sourceName})`}>
        {displayName}
      </Link>
      {englishName&&englishName!==displayName&&<div className="festive-card-english" title={englishName}>{englishName}</div>}
      <div className="festive-card-sub">
        <span>{subCategory}</span>
        <span className="festive-card-unit"> · {formatUnit(p.unit)}</span>
      </div>
      <div className="festive-card-bottom">
        <div className="festive-card-pricing">
          <strong className="festive-card-rate">{formatPrice(p.rate)}</strong>
          <s className="festive-card-mrp">{formatPrice(mrp)}</s>
        </div>
        <button
          type="button"
          className={`festive-cart-btn ${added?'added':''}`}
          onClick={(e)=>{e.preventDefault(); added?remove(p.id):add(p.id);}}
          aria-label={added?`Remove from enquiry: ${displayName}`:`Add to enquiry: ${displayName}`}
          title={added?'Remove from Enquiry':'Add to Enquiry'}
        >
          {added ? <Check size={18} strokeWidth={2.4}/> : <ShoppingCart size={18} strokeWidth={2}/>}
        </button>
      </div>
    </div>
  </article>;
}

export function ProductGrid({items}:{items:CatalogProduct[]}){
  return <div className="festive-grid">{items.map(p=><ProductCard key={p.id} p={p}/>)}</div>;
}
export function CategoryCard({category}:{category:typeof categories[number]}){return <Link className="category-card" href={`/crackers/${category.slug}`}><div className="category-art" style={{background:category.bg,color:category.color}}><img src={`/assets/categories/${category.slug}.webp`} alt={`${getCategoryDisplayName(category)} category illustration`} loading="lazy"/><span>{category.name.ta||getCategoryDisplayName(category)}</span></div><div className="category-info"><h3>{getCategoryDisplayName(category)}</h3><span>{getCategoryProductCount(category.id)} products</span><span className="category-explore">Explore</span></div></Link>}
export function EmptyState({title,description,children}:{title:string;description:string;children?:ReactNode}){return <Empty className="empty-state"><EmptyHeader><EmptyMedia variant="icon"><ClipboardList/></EmptyMedia><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{description}</EmptyDescription></EmptyHeader>{children}</Empty>}
export function SafetyStrip(){const tips=[{icon:Store,title:'Use outdoors',text:'Choose an open space.'},{icon:Heart,title:'Adult supervision',text:'Keep children supervised.'},{icon:ShieldCheck,title:'Follow the label',text:'Read product instructions.'},{icon:Package,title:'Store responsibly',text:'Keep dry, away from heat.'}];return <section className="safety-band"><div className="wrap"><SectionHeader eyebrow="A LITTLE CARE GOES A LONG WAY" title="Celebrate responsibly." href="/safety" linkText="Read the Safety Guide"/><div className="safety-grid">{tips.map(t=><div key={t.title}><t.icon size={26} strokeWidth={1.4}/><h3>{t.title}</h3><p>{t.text}</p></div>)}</div></div></section>}
export function StoreLocation({compact=false}:{compact?:boolean}){return <section id="delivery" className={`store-section ${compact?'compact':''}`}><div className="wrap store-grid"><div className="store-location-copy"><p className="eyebrow">DELIVERY, COORDINATED FOR YOU</p><h2>Choose your crackers.<br/><span>We'll coordinate delivery.</span></h2><p>Send VRP Crackers your shortlist on WhatsApp. We will check availability and coordinate fulfilment with the manufacturer.</p><div className="store-details"><div><ClipboardList/><span><strong>Build your enquiry</strong><small>Select one product or create a combined shortlist</small></span></div><div><MessageCircle/><span><strong>Confirm on WhatsApp</strong><small>Current availability, timing and charges are confirmed directly</small></span></div><div><Package/><span><strong>Manufacturer-coordinated delivery</strong><small>Delivery arrangements are made after your enquiry is reviewed</small></span></div></div><div className="actions"><ContactButton mode="whatsapp" className="btn primary">Enquire on WhatsApp</ContactButton><Link href="/enquiry" className="btn outline">Open Enquiry List</Link></div></div><div className="location-panel"><img src="/assets/vrp-logo.webp" alt="VRP Crackers Mecheri" width="108" height="108"/><span className="location-overline">WHATSAPP ENQUIRIES</span><h3>+91 70108 47049</h3><p>Individual products or a combined shortlist—send either in one tap.</p><ContactButton mode="whatsapp" className="btn outline">Start a WhatsApp enquiry</ContactButton><small>MECHERI · SALEM · TAMIL NADU</small></div></div></section>}
export function FAQs(){return <section className="wrap section faq-section"><div><p className="eyebrow">GOOD TO KNOW</p><h2>A few questions,<br/>answered.</h2><p>Need help choosing?<br/>Start with an availability enquiry.</p><ContactButton mode="whatsapp" className="btn outline">Ask on WhatsApp</ContactButton></div><Accordion type="single" collapsible>{faqs.map(([q,a],index)=><AccordionItem key={q} value={String(index)}><AccordionTrigger className="faq-question">{q}</AccordionTrigger><AccordionContent className="faq-answer">{a}</AccordionContent></AccordionItem>)}</Accordion></section>}
export function FinalCTA(){return <section className="final-cta wrap"><div><p className="eyebrow">MAKE YOUR SHORTLIST</p><h2>Planning your celebration?</h2><p>Find your favourites, enquire on WhatsApp and confirm manufacturer-coordinated delivery.</p></div><div className="actions"><Link className="btn primary" href="/crackers">Explore Crackers</Link><ContactButton mode="whatsapp" className="btn outline">Enquire with us</ContactButton></div></section>}

// How to Purchase / Enquiry Steps section
const stepIconMap:{[k:string]:ReactNode}={
  browse:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  list:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  whatsapp:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  confirm:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
};
export function HowToPurchase(){
  return <section className="how-to-section">
    <div className="wrap">
      <div className="how-to-header">
        <p className="eyebrow">HOW TO ORDER</p>
        <h2>4 simple steps to get your crackers.</h2>
        <p>No online checkout. No registration. Just browse, shortlist and send your enquiry on WhatsApp.</p>
      </div>
      <div className="how-to-steps">
        {howToSteps.map((s,i)=>(
          <div className="how-step" key={s.step}>
            <div className="how-step-icon">{stepIconMap[s.icon]}</div>
            <div className="how-step-num">{s.step}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            {i<howToSteps.length-1&&<div className="how-step-arrow" aria-hidden="true"><ChevronRight size={22}/></div>}
          </div>
        ))}
      </div>
      <div className="how-to-contact">
        <div className="how-contact-card">
          <div className="how-contact-icon"><MessageCircle size={26}/></div>
          <div>
            <strong>WhatsApp Enquiry</strong>
            <span>+91 70108 47049</span>
          </div>
          <ContactButton mode="whatsapp" className="btn primary">Open WhatsApp</ContactButton>
        </div>
        <div className="how-contact-card">
          <div className="how-contact-icon"><ClipboardList size={26}/></div>
          <div>
            <strong>Combined Enquiry</strong>
            <span>Save several products and send one shortlist</span>
          </div>
          <Link href="/enquiry" className="btn outline">Open Shortlist</Link>
        </div>
        <div className="how-contact-card">
          <div className="how-contact-icon"><Package size={26}/></div>
          <div>
            <strong>Coordinated Delivery</strong>
            <span>Timing and charges confirmed after availability</span>
          </div>
          <Link href="/contact" className="btn outline">How It Works</Link>
        </div>
      </div>
    </div>
  </section>
}
