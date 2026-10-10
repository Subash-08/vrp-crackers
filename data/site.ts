export const siteConfig={businessName:'VRP Crackers',location:'Mecheri, Salem, Tamil Nadu',phone:null as string|null,whatsapp:'917010847049',address:null as string|null,landmark:null as string|null,openingHours:null as string|null,instagram:null as string|null,mapsUrl:null as string|null,paymentMethods:['Cash','UPI','GPay','PhonePe'],referenceYear:'2026'};
// Gallery: add cracker photos by placing images in /public/assets/gallery/ and adding entries with isCracker:true
export const gallery:Array<{id:string;title:string;group:string;src:string;alt:string;isCracker?:boolean}>=[
  {id:'reference',title:'2026 Official Price Sheet',group:'Reference',src:'/assets/price-list-2026.jpg',alt:'VRP Crackers Mecheri 2026 estimation price sheet — official reference'},
  // Add cracker photos here, e.g.:
  // {id:'sparklers-1',title:'Premium Sparklers',group:'Crackers',src:'/assets/gallery/sparklers-1.jpg',alt:'VRP Crackers premium sparklers',isCracker:true},
];
export const faqs=[['How does delivery work?','Send your product enquiry on WhatsApp. VRP Crackers will confirm availability and coordinate delivery with the manufacturer.'],['Can I enquire about one product?','Yes. Open any product and choose WhatsApp About This Product to send an individual enquiry.'],['Can I enquire about several products together?','Yes. Add products to your Enquiry List and send the combined shortlist through WhatsApp.'],['Are these prices current?','The listed prices are from the supplied 2026 estimation sheet. Please confirm current price, availability, delivery timing and any applicable charges on WhatsApp.']];
export const howToSteps=[
  {step:'01',title:'Browse the Catalogue',desc:'Explore all crackers by category or use the search bar. Each product shows the official 2026 reference price per packet.',icon:'browse'},
  {step:'02',title:'Build Your Shortlist',desc:'Tap "Add to Enquiry" on any product. You can shortlist as many items as you like — all saved on your device.',icon:'list'},
  {step:'03',title:'Send on WhatsApp',desc:'Open your Enquiry List and tap "Send on WhatsApp". Your full shortlist is auto-formatted and sent in one tap.',icon:'whatsapp'},
  {step:'04',title:'Confirm Availability',desc:'VRP Crackers confirms availability, current pricing and delivery. Payment options: Cash, UPI, GPay, PhonePe.',icon:'confirm'},
];

