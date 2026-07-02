import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import ProductOrderModule from '@/components/ProductOrderModule';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `Buy ${product.name} | Premium Research Peptides`,
    description: `Purchase high-purity ${product.name} online. ${product.description.substring(0, 100)}... Guaranteed >99% purity for laboratory research.`,
    keywords: [product.name, `Buy ${product.name}`, `${product.name} for sale`, 'Research Peptides', 'Laboratory Grade Peptides'],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `Buy ${product.name} | Premium Research Peptides`,
      description: `Purchase high-purity ${product.name} online. Guaranteed >99% purity for laboratory research.`,
      images: [{ url: product.image, alt: product.name }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Buy ${product.name}`,
      description: `Purchase high-purity ${product.name} online.`,
      images: [product.image],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.slug,
    "brand": {
      "@type": "Brand",
      "name": "BUY RETATRUTIDE"
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://buyretat.com/products/${product.slug}`,
      "priceCurrency": "USD",
      "lowPrice": product.price,
      "highPrice": product.variants?.[product.variants.length - 1]?.price || product.price,
      "offerCount": product.variants?.length || 1,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://buyretat.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://buyretat.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://buyretat.com/products/${product.slug}`
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {/* Breadcrumb */}
      <div className="text-sm text-text-muted mb-8 flex gap-2">
        <Link href="/" className="hover:text-accent-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-accent-primary">Products</Link>
        <span>/</span>
        <span className="text-text-main font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden bg-bg-secondary border border-border-soft">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative h-24 rounded-lg overflow-hidden border-2 border-accent-primary">
               <Image src={product.image} alt="Thumbnail 1" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden border border-border-soft opacity-70 hover:opacity-100 cursor-pointer">
               <Image src={product.image} alt="Thumbnail 2" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden border border-border-soft opacity-70 hover:opacity-100 cursor-pointer">
               <Image src={product.image} alt="Thumbnail 3" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{product.category}</span>
          <h1 className="text-4xl font-heading font-bold mt-2 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">From ${product.price.toFixed(2)}</span>
            <span className="bg-success/10 text-success text-sm font-bold px-2 py-1 rounded">In Stock</span>
          </div>

          <p className="text-text-muted mb-8 text-lg">{product.description}</p>

          <ProductOrderModule product={product} />
          
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
              <h4 className="font-bold text-red-700 mb-1">Safety Protocol</h4>
              <p className="text-sm text-red-600">Strictly for in-vitro laboratory research only. Not for human or animal consumption. Buyers must be qualified researchers.</p>
            </div>
          </div>
          
          <Link href="/coa" className="mt-6 text-accent-primary font-medium hover:underline flex items-center gap-1">
            📄 View Certificate of Analysis (COA)
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-soft mb-8">
        <div className="flex gap-8">
          <button className="border-b-2 border-accent-primary pb-4 font-bold text-accent-primary">Package Contents</button>
          <button className="border-b-2 border-transparent pb-4 font-medium text-text-muted hover:text-text-main">Storage</button>
          <button className="border-b-2 border-transparent pb-4 font-medium text-text-muted hover:text-text-main">Supply Chain</button>
        </div>
      </div>
      <div className="prose max-w-none text-text-muted mb-20">
        <p>Each vial contains highly purified lyophilized peptide powder. Vials are sealed with crimp caps and stoppers to maintain sterility and vacuum.</p>
        <ul>
          <li>Requires reconstitution with bacteriostatic water (not included)</li>
          <li>For research protocols only</li>
          <li>Ships with ice packs during summer months</li>
        </ul>
      </div>

      {/* Related Products */}
      <h2 className="text-2xl font-heading font-bold mb-8">Related Research Peptides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.filter(p => p.slug !== product.slug).slice(0, 4).map((p) => (
          <Link href={`/products/${p.slug}`} key={p.slug} className="group border border-border-soft rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-bg-secondary">
               <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold group-hover:text-accent-primary transition-colors">{p.name}</h3>
              <p className="text-sm text-text-muted mt-1">From ${p.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO Expanded Product Information & FAQ */}
      <div className="mt-20 border-t border-border-soft pt-12 max-w-4xl mx-auto prose prose-lg text-text-muted">
        <h2 className="text-2xl font-heading font-bold text-text-main mb-4">Investigating {product.name} in the Laboratory</h2>
        <p className="mb-4">
          When incorporating <strong>{product.name}</strong> into your laboratory protocols, precision and purity are critical. As a highly purified <strong>research peptide</strong>, this compound allows investigators to map receptor bindings, cellular signaling pathways, and metabolic responses with high reproducibility. 
        </p>
        <p className="mb-6">
          Sourcing your materials online from our specialized catalog ensures that you receive a <strong>laboratory grade</strong> product. Every vial is synthesized under strict conditions and subjected to rigorous third-party testing to guarantee &gt;99% purity. Whether you are conducting initial in-vitro assays or extensive comparative studies, <strong>buying {product.name} online</strong> from us provides the reliability your research demands.
        </p>

        <h3 className="text-xl font-heading font-bold text-text-main mt-8 mb-4">Storage and Handling Protocols for {product.name}</h3>
        <p className="mb-6">
          To maintain the structural integrity of the peptide bonds, <strong>{product.name}</strong> is shipped as a lyophilized powder. Prior to reconstitution, vials should be stored at -20°C for long-term preservation. Once reconstituted with bacteriostatic water, the solution must be kept refrigerated between 2°C and 8°C and utilized within the standard stability window to prevent degradation.
        </p>

        <h3 className="text-xl font-heading font-bold text-text-main mt-8 mb-4">Frequently Asked Questions (FAQ)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-text-main">What is the purity of this product?</h4>
            <p className="text-sm mt-1">This product is guaranteed to be &gt;99% pure, verified by independent third-party HPLC and MS testing.</p>
          </div>
          <div>
            <h4 className="font-bold text-text-main">Can I buy {product.name} for human use?</h4>
            <p className="text-sm mt-1">No. All peptides sold in our catalog, including {product.name}, are strictly for in-vitro laboratory research and are explicitly not for human consumption.</p>
          </div>
          <div>
            <h4 className="font-bold text-text-main">How is it shipped to ensure stability?</h4>
            <p className="text-sm mt-1">We utilize temperature-controlled packaging techniques to ensure the lyophilized powder remains perfectly stable during transit, protecting your research investment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
