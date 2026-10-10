'use client';
import {useEffect,useMemo,useState} from 'react';
import {SiteLink as Link} from './site-link';
import {MapPin,Store,Package,ChevronRight,ClipboardList,Search,Info,Camera,FileText,ShieldCheck,MessageCircle,Copy,Trash2,Tag,Percent,Sparkles} from 'lucide-react';
import {categories,catalogMeta,formatPrice,formatUnit,getAllProducts,getCategories,getCategoryBySlug,getCategoryDisplayName,getCategoryProductCount,getHomepageProducts,getProductBySlug,getProductDisplayName,getProductsByCategory,productUrl,searchProducts} from '@/lib/catalog/selectors';
import type {CatalogProduct} from '@/lib/catalog/types';
import {gallery,siteConfig} from '@/data/site';
import {useStore} from './store';
import {SiteHeader,SiteFooter,CategoryCard,ContactButton,PageIntro,SectionHeader,ProductVisual,ProductGrid,AddEnquiry,EmptyState,SafetyStrip,StoreLocation,FAQs,FinalCTA,Breadcrumb,ProductPricing,CategoryIcon,HowToPurchase,getStrikePrice,getDiscount} from './shared';

export function SitePage({path}:{path:string[]}){const page=path[0]||'home';let content;if(page==='home')content=<Home/>;else if(page==='crackers'&&path.length===3){const product=getProductBySlug(path[2]);content=product&&product.categoryId===path[1]?<ProductDetail product={product}/>:<NotFound/>}else if(page==='crackers')content=<Catalogue categorySlug={path[1]}/>;else if(page==='price-list')content=<PriceList/>;else if(page==='enquiry')content=<Enquiry/>;else if(page==='gallery')content=<Gallery/>;else if(page==='about')content=<About/>;else if(page==='safety')content=<Safety/>;else if(page==='contact')content=<Contact/>;else if(page==='privacy'||page==='terms')content=<Policies type={page}/>;else content=<NotFound/>;return <><a href="#main" className="skip-link">Skip to content</a><SiteHeader/><main id="main">{content}</main><SiteFooter/></>}

function Home(){const featured=getHomepageProducts(4);return <><section className="hero"><div className="hero-glow" aria-hidden="true"/><div className="wrap hero-grid"><div className="hero-copy"><div className="hero-location"><MapPin size={16}/> VRP CRACKERS · MECHERI, SALEM</div><h1>A brighter way<br/>to <span>celebrate.</span></h1><div className="hero-stroke" aria-hidden="true"/><p>Explore the official catalogue, shortlist your favourites and enquire for manufacturer-coordinated delivery.</p><div className="actions"><Link href="/crackers" className="btn primary hero-primary">Explore Crackers <ChevronRight size={20}/></Link><ContactButton mode="whatsapp" className="btn white">WhatsApp Us</ContactButton></div><div className="hero-note"><Package size={18}/><span>Availability and delivery details are confirmed on WhatsApp.</span></div></div><div className="hero-visual"><span className="hero-spark spark-one" aria-hidden="true"/><span className="hero-spark spark-two" aria-hidden="true"/><img src="/assets/hero.webp" alt="Illustrative studio arrangement of colourful unbranded fireworks packaging" width="1536" height="1024" fetchPriority="high"/><small className="illustration-note">Illustrative packaging · actual products may vary</small></div></div></section><div className="trust-strip wrap"><div><Package size={25}/><span><strong>Coordinated Delivery</strong><small>Arranged with the manufacturer</small></span></div><div><ClipboardList size={25}/><span><strong>Official Catalogue</strong><small>{getAllProducts().length} listed products</small></span></div><div><FileText size={25}/><span><strong>2026 Price Reference</strong><small>PER and RATE from the sheet</small></span></div><div><MessageCircle size={25}/><span><strong>WhatsApp Enquiries</strong><small>Single or combined products</small></span></div></div><section className="wrap section" id="categories"><SectionHeader eyebrow="THE OFFICIAL 2026 CATALOGUE" title="Browse by category." description="Every category and count is taken from the VRP Crackers price sheet." href="/crackers" linkText="View all crackers"/><div className="category-grid">{getCategories().map(category=><CategoryCard key={category.id} category={category}/>)}</div></section><section className="section featured-section"><div className="wrap"><SectionHeader eyebrow="START EXPLORING" title="From the 2026 catalogue." description="A deterministic sample from the official price-sheet ordering." href="/crackers" linkText="Explore the catalogue"/><ProductGrid items={featured}/><p className="reference-note"><Info size={15}/>{catalogMeta.priceDisclaimer}</p></div></section><HowToPurchase/><section className="wrap section budget-section"><div><p className="eyebrow">BROWSE BY RATE</p><h2>Find a range that suits you.</h2><p>These filters are based only on the current product rates.</p></div><div className="budget-options">{[['Under ₹100','under-100','Everyday picks'],['₹100–₹250','100-250','More to explore'],['₹251–₹500','251-500','Celebration staples'],['₹501+','501-plus','Larger selections']].map(([title,value,description],index)=><Link key={value} href={`/crackers?budget=${value}`}><span className="budget-index">0{index+1}</span><strong>{title}</strong><small>{description}</small></Link>)}</div></section><SafetyStrip/><StoreLocation/><FAQs/><FinalCTA/></>}

function Catalogue({categorySlug}:{categorySlug?:string}){
  const allProducts=useMemo(()=>getAllProducts(),[]);
  const allCategories=useMemo(()=>getCategories(),[]);
  const category=categorySlug?getCategoryBySlug(categorySlug):undefined;
  const [query,setQuery]=useState('');
  const [selectedCategory,setSelectedCategory]=useState(category?.id||'all');
  const {ids}=useStore();

  useEffect(()=>{
    if(category?.id) setSelectedCategory(category.id);
  },[category?.id]);

  const matching=useMemo(()=>{
    if(!query.trim()) return null;
    return searchProducts(query);
  },[query,allProducts]);

  return <section className="festive-catalogue-page">
    <div className="wrap">
      {/* Welcome Banner matching reference design */}
      <div className="festive-welcome-banner">
        <div className="festive-welcome-left">
          <div className="festive-welcome-icon">
            <Sparkles size={28}/>
          </div>
          <div className="festive-welcome-text">
            <small>Welcome</small>
            <h1>VRP Crackers</h1>
            <p>Light up your celebrations ✨ · Mecheri, Salem · 2026 Official Catalogue</p>
          </div>
        </div>
        <Link href="/enquiry" className="btn outline" style={{borderRadius:'999px',borderColor:'#ecd8cd',background:'#ffffff',color:'#8b322c'}}>
          <ClipboardList size={18}/> My Enquiry ({ids.length})
        </Link>
      </div>

      {/* Pill Search Bar */}
      <div className="festive-search-wrap">
        <div className="festive-search-bar">
          <Search size={20} style={{color:'#8b322c'}}/>
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder={`Search ${allProducts.length} crackers...`}
            aria-label="Search crackers"
          />
          {query&&<button className="text-link" style={{minHeight:'auto',padding:'4px 8px'}} onClick={()=>setQuery('')}>✕ Clear</button>}
        </div>
      </div>

      {/* Category Chips Row */}
      <div className="festive-chips-row" role="tablist" aria-label="Category filter">
        <button
          type="button"
          className={`festive-chip ${selectedCategory==='all'?'active':''}`}
          onClick={()=>{setSelectedCategory('all');setQuery('');}}
        >
          <Sparkles size={14}/>
          All <span className="festive-chip-count">{allProducts.length}</span>
        </button>
        <button
          type="button"
          className={`festive-chip ${selectedCategory==='offers'?'active':''}`}
          onClick={()=>{setSelectedCategory('offers');setQuery('');}}
        >
          <Tag size={14}/>
          Offers <span className="festive-chip-count">{allProducts.length}</span>
        </button>
        {allCategories.map(cat=>(
          <button
            key={cat.id}
            type="button"
            className={`festive-chip ${selectedCategory===cat.id?'active':''}`}
            onClick={()=>{setSelectedCategory(cat.id);setQuery('');}}
          >
            <Sparkles size={13}/>
            {cat.name.ta||getCategoryDisplayName(cat)} <span className="festive-chip-count">{getCategoryProductCount(cat.id)}</span>
          </button>
        ))}
      </div>

      {/* Product Display */}
      {matching ? (
        <div>
          <div className="festive-category-header">
            <h2 className="festive-category-header-title">
              <Search size={20}/>
              <span>Search results for "{query}"</span>
            </h2>
            <span className="festive-category-count">{matching.length} items</span>
          </div>
          {matching.length>0 ? (
            <ProductGrid items={matching}/>
          ) : (
            <EmptyState title="No crackers found." description="Try searching with a Tamil or English name like 'குண்டு', 'ராக்கெட்', 'Flower', 'Shot'"><button className="btn primary" onClick={()=>setQuery('')}>Clear Search</button></EmptyState>
          )}
        </div>
      ) : selectedCategory!=='all' && selectedCategory!=='offers' ? (
        <div>
          {(()=>{
            const cat=allCategories.find(c=>c.id===selectedCategory)!;
            const catItems=getProductsByCategory(cat.id);
            return <div>
              <div className="festive-category-header">
                <h2 className="festive-category-header-title">
                  <Sparkles size={20}/>
                  <span>{cat.name.ta||getCategoryDisplayName(cat)}</span>
                </h2>
                <span className="festive-category-count">{catItems.length} items</span>
              </div>
              <ProductGrid items={catItems}/>
            </div>
          })()}
        </div>
      ) : (
        /* All categories view: category by category section with header and grid! */
        <div>
          {allCategories.map(cat=>{
            const catItems=getProductsByCategory(cat.id);
            if(!catItems.length) return null;
            return <section key={cat.id} className="festive-category-section" id={`cat-${cat.slug}`}>
              <div className="festive-category-header">
                <h2 className="festive-category-header-title">
                  <Sparkles size={20}/>
                  <span>{cat.name.ta||getCategoryDisplayName(cat)}</span>
                </h2>
                <span className="festive-category-count">{catItems.length} items</span>
              </div>
              <ProductGrid items={catItems}/>
            </section>;
          })}
        </div>
      )}

      <p className="reference-note" style={{marginTop:'40px'}}><Info size={15}/>{catalogMeta.priceDisclaimer}</p>
    </div>
    <HowToPurchase/>
    <FinalCTA/>
  </section>;
}

function ProductDetail({product}:{product:CatalogProduct}){
  const category=categories.find(item=>item.id===product.categoryId)!;
  const displayName=product.name.ta||getProductDisplayName(product);
  const categoryName=category.name.ta||getCategoryDisplayName(category);
  return <><section className="wrap product-detail"><Breadcrumb items={[{label:'Crackers',href:'/crackers'},{label:categoryName,href:`/crackers/${category.slug}`},{label:displayName}]}/><div className="product-detail-grid"><ProductVisual p={product} large/><div className="detail-copy"><p className="eyebrow">{categoryName}</p><h1>{displayName}</h1>{product.name.ta&&product.sourceName!==product.name.ta&&<p style={{fontSize:'1.1rem',color:'#6b7280',marginTop:'-10px',marginBottom:'15px'}}>{product.sourceName}</p>}<ProductPricing p={product} detail/><dl className="product-facts"><div><dt>PER</dt><dd>{formatUnit(product.unit)}</dd></div><div><dt>Category</dt><dd><Link href={`/crackers/${category.slug}`}>{categoryName}</Link></dd></div><div><dt>Source</dt><dd>VRP Estimation · 2026 Official Sheet</dd></div></dl><AddEnquiry p={product} className="btn primary detail-add"/><ContactButton mode="whatsapp" selected={[product]} className="btn outline detail-whatsapp">WhatsApp About This Product</ContactButton><p className="detail-caution">{catalogMeta.priceDisclaimer}</p></div></div></section><section className="wrap section"><SectionHeader title="More in this category." href={`/crackers/${category.slug}`} linkText="View category"/><ProductGrid items={getProductsByCategory(category.id).filter(item=>item.id!==product.id).slice(0,4)}/></section><FinalCTA/></>}

// ============================================================
// PRICE LIST — full redesign: all products, no pagination,
// card-based layout per category, strikeout MRP + discount
// ============================================================
function PriceList(){
  const [search,setSearch]=useState('');
  const allCategories=getCategories();
  const filtered=useMemo(()=>{
    if(!search.trim())return null;
    const q=search.toLowerCase().trim();
    return getAllProducts().filter(p=>(p.name.ta&&p.name.ta.toLowerCase().includes(q))||getProductDisplayName(p).toLowerCase().includes(q)||p.sourceName.toLowerCase().includes(q));
  },[search]);

  return <>
    <div className="pl-hero">
      <div className="wrap pl-hero-inner">
        <div>
          <p className="eyebrow">VRP CRACKERS · MECHERI · 2026</p>
          <h1>Full Price List</h1>
          <p className="pl-hero-sub">All {getAllProducts().length} products · Official 2026 rates · Strikeout shows MRP savings</p>
        </div>
        <div className="pl-search-wrap">
          <div className="pl-search">
            <Search size={18}/>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search any product…"
              aria-label="Search price list"
            />
            {search&&<button className="pl-search-clear" onClick={()=>setSearch('')}>✕</button>}
          </div>
          <Link href="/enquiry" className="btn primary"><ClipboardList size={18}/>My Enquiry List</Link>
        </div>
      </div>
      <div className="pl-legend wrap">
        <span><Tag size={13}/> Sale Price (our rate)</span>
        <span><s>₹MRP</s> Original price</span>
        <span><Percent size={13}/> Your savings</span>
      </div>
    </div>

    {filtered?
      <section className="wrap section pl-search-results">
        <div className="pl-results-meta">
          <strong>{filtered.length} result{filtered.length!==1?'s':''}</strong> for "{search}"
          <button className="text-link" onClick={()=>setSearch('')}>Clear</button>
        </div>
        {filtered.length>0?
          <div className="pl-all-table">
            <div className="pl-thead">
              <span>Product</span><span>PER</span><span>Our Rate</span><span>MRP</span><span>Save</span><span></span>
            </div>
            {filtered.map(product=><PriceRow key={product.id} product={product}/>)}
          </div>
        :<EmptyState title="No products found." description="Try a different search term."><button className="btn primary" onClick={()=>setSearch('')}>Clear search</button></EmptyState>}
        <p className="reference-note"><Info size={15}/>{catalogMeta.priceDisclaimer}</p>
      </section>
    :
      <section className="wrap pl-categories-section">
        {allCategories.map(category=>{
          const items=getProductsByCategory(category.id);
          const cat=categories.find(c=>c.id===category.id)!;
          return <div className="pl-category-block" key={category.id} id={`cat-${category.slug}`}>
            <div className="pl-cat-header" style={{borderLeftColor:cat.color}}>
              <div className="pl-cat-icon" style={{background:cat.bg,color:cat.color}}>
                <CategoryIcon category={category.id} size={22}/>
              </div>
              <div>
                <h2>{cat.name.ta||getCategoryDisplayName(category)}</h2>
                <span>{items.length} products</span>
              </div>
              <Link href={`/crackers/${category.slug}`} className="btn outline pl-cat-link">Browse &rarr;</Link>
            </div>
            <div className="pl-table">
              <div className="pl-thead">
                <span>Product</span><span>PER</span><span>Our Rate</span><span>MRP</span><span>Save</span><span></span>
              </div>
              {items.map(product=><PriceRow key={product.id} product={product}/>)}
            </div>
          </div>;
        })}
        <p className="reference-note wrap-inner"><Info size={15}/>{catalogMeta.priceDisclaimer}</p>
      </section>
    }
    <HowToPurchase/>
    <FinalCTA/>
  </>;
}

function PriceRow({product}:{product:CatalogProduct}){
  const mrp=getStrikePrice(product.rate);
  const disc=getDiscount(product.rate);
  const taName=product.name.ta;
  const enName=product.sourceName;
  return <div className="pl-row">
    <Link href={productUrl(product)} className="pl-name">
      <div><strong>{taName||enName}</strong></div>
      {taName&&enName!==taName&&<small style={{display:'block',color:'#6b7280',fontSize:'0.75rem',fontWeight:400}}>{enName}</small>}
    </Link>
    <span className="pl-per">{formatUnit(product.unit)}</span>
    <strong className="pl-rate">{formatPrice(product.rate)}</strong>
    <span className="pl-mrp"><s>{formatPrice(mrp)}</s></span>
    <span className="pl-disc">-{disc}%</span>
    <AddEnquiry p={product}/>
  </div>;
}

// ============================================================
// GALLERY — no logo, support cracker photos, add-photos CTA
// ============================================================
function Gallery(){
  const crackerPhotos=gallery.filter(g=>g.isCracker);
  const referenceItems=gallery.filter(g=>!g.isCracker);
  return <>
    <PageIntro
      eyebrow="PHOTOS & REFERENCE MATERIAL"
      title="VRP Crackers gallery."
      description="Product photos and the official 2026 price reference."
    />
    <section className="wrap section gallery-page">

      {/* Cracker photos */}
      <div className="gallery-section-header">
        <p className="eyebrow">CRACKER PHOTOS</p>
        <h2>Our products in action.</h2>
      </div>
      {crackerPhotos.length>0?
        <div className="gallery-cracker-grid">
          {crackerPhotos.map(item=>(
            <article className="gallery-cracker-card" key={item.id}>
              <div className="gallery-cracker-img">
                <img src={item.src} alt={item.alt} loading="lazy"/>
              </div>
              <span>{item.title}</span>
            </article>
          ))}
        </div>
      :
        <div className="gallery-photos-pending">
          <div className="gallery-pending-icon"><Camera size={38}/></div>
          <h3>Cracker photos coming soon</h3>
          <p>We're adding product photos. Check back soon or browse the full catalogue.</p>
          <div className="gallery-pending-hint">
            <strong>Adding photos?</strong> Place image files in <code>/public/assets/gallery/</code> and add entries to <code>data/site.ts</code> with <code>isCracker: true</code>.
          </div>
          <Link href="/crackers" className="btn primary">Browse Catalogue</Link>
        </div>
      }

      {/* Reference material */}
      {referenceItems.length>0&&<>
        <div className="gallery-section-header" style={{marginTop:'60px'}}>
          <p className="eyebrow">OFFICIAL REFERENCE</p>
          <h2>2026 price sheet.</h2>
        </div>
        <div className="gallery-ref-grid">
          {referenceItems.map(item=>(
            <article className="gallery-ref-card" key={item.id}>
              <div className="gallery-ref-img">
                <img src={item.src} alt={item.alt} loading="lazy"/>
              </div>
              <div className="gallery-ref-footer">
                <span>{item.title}</span>
                <Link href="/price-list" className="text-link">View full price list</Link>
              </div>
            </article>
          ))}
        </div>
      </>}

    </section>
    <HowToPurchase/>
    <FinalCTA/>
  </>
}

function Enquiry(){const {ids,remove,message}=useStore();const items=getAllProducts().filter(product=>ids.includes(product.id));const [copied,setCopied]=useState(false);const copy=async()=>{await navigator.clipboard.writeText(message(items));setCopied(true)};return <><PageIntro eyebrow="YOUR WHATSAPP ENQUIRY" title="Your shortlist." description="These products are stored on this device. Prices are always read from the current catalogue."/>
<section className="wrap section">{items.length?<div className="enquiry-grid"><div><div className="enquiry-heading"><h2>{items.length} saved products</h2><button className="text-link" onClick={()=>items.forEach(item=>remove(item.id))}>Clear list</button></div>{items.map(product=><article className="enquiry-item" key={product.id}><Link href={productUrl(product)}><ProductVisual p={product}/></Link><div><h3>{getProductDisplayName(product)}</h3><p>{formatUnit(product.unit)}</p><strong>{formatPrice(product.rate)}</strong></div><button className="remove-item" aria-label={`Remove ${getProductDisplayName(product)}`} onClick={()=>remove(product.id)}><Trash2 size={18}/></button></article>)}</div><aside className="enquiry-summary"><h2>Send combined enquiry</h2><p>Review your shortlist, then send all selected products to VRP Crackers on WhatsApp.</p><textarea className="message-preview" readOnly value={message(items)}/><ContactButton mode="whatsapp" selected={items} className="btn primary">Send on WhatsApp</ContactButton><button className="btn outline" onClick={copy}>{copied?<Info size={18}/>:<Copy size={18}/>} {copied?'Message copied':'Copy enquiry message'}</button></aside></div>:<EmptyState title="Your celebration starts with a shortlist." description="Browse the catalogue and add products to your Enquiry List."><Link className="btn primary" href="/crackers">Explore Crackers</Link></EmptyState>}</section><StoreLocation compact/></>}

function About(){return <><PageIntro eyebrow="MECHERI · SALEM · TAMIL NADU" title="A simpler way to enquire." description="Browse the official catalogue and send your shortlist directly to VRP Crackers."/><section className="wrap section about-grid"><div className="about-logo"><img src="/assets/vrp-logo.png" alt="VRP Crackers Mecheri badge" width="1254" height="1254"/></div><div><p className="eyebrow">HELLO FROM VRP</p><h2>A catalogue to explore.<br/>Delivery coordinated for you.</h2><p>This site is a product enquiry catalogue, not an online checkout. Product details, PER and RATE come from the supplied 2026 price sheet; availability and manufacturer-coordinated delivery are confirmed on WhatsApp.</p><Link className="btn primary" href="/crackers">Explore the collection</Link></div></section><StoreLocation/><FinalCTA/></>}

function Safety(){return <><PageIntro eyebrow="CELEBRATE RESPONSIBLY" title="Safety first." description="Please read the instructions on every actual product before use."/><SafetyStrip/><section className="wrap section safety-cards"><article><ShieldCheck/><h3>Use outdoors</h3><p>Choose an open outdoor area and keep a safe distance.</p></article><article><Store/><h3>Confirm product details</h3><p>Check availability and manufacturer-coordinated delivery directly with VRP Crackers.</p></article></section><FinalCTA/></>}

function Contact(){return <><PageIntro eyebrow="PRODUCT & DELIVERY ENQUIRIES" title="Let's plan your celebration." description="Send one product or your complete shortlist to VRP Crackers on WhatsApp."/><HowToPurchase/><StoreLocation/><section className="wrap section contact-extras"><div><h2>Ready to enquire?</h2><p>Add products to your Enquiry List, then send them together for availability and delivery confirmation.</p><Link href="/enquiry" className="btn primary"><ClipboardList size={18}/> Open Enquiry List</Link></div><div id="contact-details" className="contact-info-card"><h3>WhatsApp contact</h3><dl><div><dt>Business</dt><dd>VRP Crackers, Mecheri</dd></div><div><dt>WhatsApp</dt><dd>+91 70108 47049</dd></div><div><dt>Delivery</dt><dd>Coordinated with the manufacturer after confirmation</dd></div></dl></div></section><FAQs/></>}

function Policies({type}:{type:string}){return <><PageIntro title={type==='privacy'?'Privacy.':'Catalogue terms.'}/><section className="wrap section policy-page"><h2>{type==='privacy'?'Your shortlist stays on this device.':'A reference catalogue for product enquiries.'}</h2><p>{type==='privacy'?'The Enquiry List is stored in your browser\'s local storage. This site has no customer accounts or checkout.':`${catalogMeta.priceDisclaimer} Availability, delivery timing and applicable charges are confirmed through WhatsApp before manufacturer-coordinated fulfilment.`}</p></section></>}

function NotFound(){return <section className="wrap section"><EmptyState title="Page not found." description="The requested category or product is not part of the current official catalogue."><Link href="/crackers" className="btn primary">Browse catalogue</Link></EmptyState></section>}
