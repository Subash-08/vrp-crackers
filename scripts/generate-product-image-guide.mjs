import {readFile,writeFile} from 'node:fs/promises';

const products=JSON.parse(await readFile(new URL('../data/catalog/products.json',import.meta.url),'utf8'));
const categories=JSON.parse(await readFile(new URL('../data/catalog/categories.json',import.meta.url),'utf8'));
const money=value=>`₹${Number(value).toLocaleString('en-IN')}`;
const lines=[
  '# VRP Crackers — Product Image Checklist',
  '',
  `This checklist covers all **${products.length} official-sheet products** in **${categories.length} categories**.`,
  '',
  'Place each genuine, square product photograph in `public/assets/products/`. Use the exact stable ID as the filename. The site tries `.webp`, `.jpg`, `.jpeg`, then `.png` automatically. WebP is preferred.',
  '',
  'Recommended: 900 × 900 px, product centred, neutral background, under 180 KB.',
  '',
];

for(const category of categories.sort((a,b)=>a.displayOrder-b.displayOrder)){
  const items=products.filter(product=>product.categoryId===category.id).sort((a,b)=>a.displayOrder-b.displayOrder);
  lines.push(`## ${category.name.ta} — ${category.name.en} (${items.length})`,'','| File name | Tamil name | English name | Unit | Final rate |','|---|---|---|---|---:|');
  for(const product of items){
    lines.push(`| \`${product.id}.webp\` | ${product.name.ta||'—'} | ${product.name.en||'—'} | ${product.unit.quantity} ${product.unit.type} | ${money(product.rate)} |`);
  }
  lines.push('');
}

await writeFile(new URL('../docs/product_image_guide.md',import.meta.url),`${lines.join('\n')}\n`);
console.log(`Wrote ${products.length} product rows to docs/product_image_guide.md`);
