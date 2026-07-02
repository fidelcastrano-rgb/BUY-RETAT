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
    if (!content.includes('alternates:')) {
      content = content.replace(
        /export const metadata: Metadata = \{([^}]+)\};/,
        `export const metadata: Metadata = {$1, alternates: { canonical: '${page.url}' }};`
      );
      fs.writeFileSync(page.path, content);
      console.log(`Updated ${page.path}`);
    }
  }
}
