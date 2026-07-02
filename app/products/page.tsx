import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Peptides Catalog | Buy Retatrutide & Tirzepatide Online',
  description: 'Browse our premium selection of research peptides including Retatrutide, Tirzepatide, and Semaglutide. Buy laboratory grade weight loss peptides online with >99% purity guaranteed.',
  keywords: ['Research Peptides', 'Buy Retatrutide', 'Retatrutide for sale', 'Tirzepatide', 'Semaglutide', 'Buy Research Peptides Online', 'Weight Loss Peptides', 'Retatrutide USA'],
  alternates: {
    canonical: '/products',
  }
};

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Research Peptides Catalog",
    "description": "Premium selection of laboratory grade research peptides.",
    "url": "https://buyretat.com/products",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://buyretat.com/products/${product.slug}`
      }))
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Research Peptides</h1>
        <p className="text-text-muted max-w-2xl">Our premium selection of lyophilized research peptides. All products undergo rigorous third-party testing to ensure &gt;99% purity. For laboratory research use only.</p>
      </div>
      
      {/* Filter bar mock */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 sticky top-16 bg-bg-main/95 backdrop-blur z-40 py-4 border-b border-border-soft">
        <button className="bg-text-main text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">All Products</button>
        <button className="bg-bg-secondary text-text-main hover:bg-border-soft px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Retatrutide</button>
        <button className="bg-bg-secondary text-text-main hover:bg-border-soft px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Tirzepatide</button>
        <button className="bg-bg-secondary text-text-main hover:bg-border-soft px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Semaglutide</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.slug} className="bg-white rounded-xl shadow-sm border border-border-soft overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="relative h-64 w-full bg-bg-secondary">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-accent-primary text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {product.badge}
                </span>
              )}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{product.category}</span>
              <h2 className="font-heading font-bold text-xl mt-1 mb-2">{product.name}</h2>
              <div className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded w-fit mb-3">COA Verified &gt;99%</div>
              <p className="text-text-muted text-sm mb-4 line-clamp-3 flex-1">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4 border-t border-border-soft pt-4">
                <span className="font-bold text-lg">From ${product.price.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2 mt-auto">
                <Link href={`/products/${product.slug}`} className="flex-1 text-center bg-bg-secondary text-text-main border border-border-soft px-4 py-2 rounded font-medium hover:bg-border-soft transition-colors text-sm">
                  View Details
                </Link>
                <Link href={`/products/${product.slug}`} className="flex-1 text-center bg-btn-primary text-white px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity text-sm">
                  Order
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Trust bar section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 border-t border-border-soft pt-12">
        <div className="text-center">
          <div className="text-2xl mb-2">🔬</div>
          <div className="font-bold text-sm">Lab Tested</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">🔒</div>
          <div className="font-bold text-sm">Secure Payment</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">📦</div>
          <div className="font-bold text-sm">Discreet Shipping</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">⭐</div>
          <div className="font-bold text-sm">Trusted Supplier</div>
        </div>
      </div>

      {/* Category SEO Content */}
      <div className="mt-20 border-t border-border-soft pt-12 max-w-4xl mx-auto prose prose-lg text-text-muted">
        <h2 className="text-2xl font-heading font-bold text-text-main mb-4">Buy Research Peptides Online: Exploring Our Catalog</h2>
        <p className="mb-4">
          Navigating our extensive catalog of <strong>research peptides</strong> gives laboratories access to the highest-quality compounds on the market. Whether your studies focus on single-receptor agonists like Semaglutide, dual-agonists like Tirzepatide, or the groundbreaking triple-agonist, finding premium <strong>Retatrutide for sale</strong> is essential for cutting-edge metabolic research. 
        </p>
        <p className="mb-4">
          When you elect to <strong>buy Retatrutide online</strong> from our catalog, you are guaranteed a product that has passed stringent third-party testing. We source only the purest raw materials to synthesize our <strong>weight loss peptides</strong> and other research compounds.
        </p>

        <h3 className="text-xl font-heading font-bold text-text-main mt-8 mb-4">Understanding the Peptides in Our Catalog</h3>
        <p className="mb-4">
          <strong>Retatrutide:</strong> A novel triple-hormone receptor agonist (GLP-1, GIP, Glucagon) showing remarkable efficacy in laboratory settings for energy expenditure studies. Our <strong>Retatrutide laboratory grade</strong> compounds are available in multiple vial sizes (e.g., 10mg, 15mg, 20mg) to suit diverse research protocols.
        </p>
        <p className="mb-4">
          <strong>Tirzepatide:</strong> A well-documented dual-agonist that acts on both GLP-1 and GIP receptors. It remains a staple in metabolic research for comparing efficacy against newer compounds.
        </p>
        <p className="mb-6">
          <strong>BPC-157 & TB-500:</strong> Beyond metabolic studies, we also offer recovery and healing peptides. BPC-157 and TB-500 are heavily researched for their potential roles in tissue repair and angiogenesis.
        </p>

        <h3 className="text-xl font-heading font-bold text-text-main mt-8 mb-4">Frequently Asked Questions About Our Catalog</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-text-main">Are these peptides ready for immediate use?</h4>
            <p className="text-sm mt-1">All our peptides are supplied as lyophilized powders to ensure stability during transit. They must be reconstituted with bacteriostatic water in a sterile laboratory environment prior to use.</p>
          </div>
          <div>
            <h4 className="font-bold text-text-main">How do I verify the purity of my order?</h4>
            <p className="text-sm mt-1">Every product page details the purity standards. Furthermore, each vial corresponds to a batch number, which can be cross-referenced with our third-party COAs to confirm &gt;99% purity.</p>
          </div>
          <div>
            <h4 className="font-bold text-text-main">Do you offer bulk or wholesale pricing?</h4>
            <p className="text-sm mt-1">Yes, we provide scalable solutions for large research institutions. Please contact our support team for specialized pricing on bulk <strong>research peptides</strong> orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
