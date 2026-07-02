const fs = require('fs');

const pages = [
  { path: 'app/about/page.tsx', url: '/about' },
  { path: 'app/contact/page.tsx', url: '/contact' },
  { path: 'app/faq/page.tsx', url: '/faq' },
  { path: 'app/blog/page.tsx', url: '/blog' },
  { path: 'app/privacy/page.tsx', url: '/privacy' },
  { path: 'app/terms/page.tsx', url: '/terms' },
  { path: 'app/coa/page.tsx', url: '/coa' }
];

for (const page of pages) {
  if (fs.existsSync(page.path)) {
    let content = fs.readFileSync(page.path, 'utf8');
    content = content.replace(/,\s*alternates:\s*\{\s*canonical:\s*'[^']+'\s*\}/g, '');
    
    // Now add it correctly
    content = content.replace(
      /export const metadata: Metadata = \{([\s\S]*?)\};/,
      "export const metadata: Metadata = {$1  alternates: { canonical: '$2' },\n};"
    ).replace('$2', page.url);
    
    fs.writeFileSync(page.path, content);
    console.log(`Fixed ${page.path}`);
  }
}
