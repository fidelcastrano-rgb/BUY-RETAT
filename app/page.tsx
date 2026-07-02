import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://buyretat.com/#organization",
        "name": "BUY RETATRUTIDE",
        "url": "https://buyretat.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://buyretat.com/logo.png"
        },
        "description": "US, Canada, Europe and Australia's Most Trusted Research Peptide Wholesaler and Retailer."
      },
      {
        "@type": "WebSite",
        "@id": "https://buyretat.com/#website",
        "url": "https://buyretat.com",
        "name": "BUY RETATRUTIDE",
        "publisher": {
          "@id": "https://buyretat.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Retatrutide legal to buy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Retatrutide is completely legal to purchase and possess when bought strictly for in-vitro laboratory research purposes. It is not for human consumption."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide COAs (Certificates of Analysis)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We provide up-to-date, verifiable third-party COAs for every batch of peptides we sell, ensuring >99% purity."
            }
          },
          {
            "@type": "Question",
            "name": "How long does shipping take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "US domestic shipping typically takes 1-2 business days. Canada, Europe, and Australia shipping takes 3-5 business days via tracked expedited services."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Notice/announcement bar */}
      <div className="bg-accent-primary text-white text-sm py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <span className="mx-4">🔥 All orders shipped within 24 hours</span>
          <span className="mx-4">✅ Third-party COA tested</span>
          <span className="mx-4">🇬🇧 US, Canada, Europe and Australia Fast Delivery</span>
          <span className="mx-4">⭐ 5-Star Rated Research Supplier</span>
        </div>
      </div>

      {/* 3. Hero section */}
      <section className="container mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-text-main leading-tight mb-6">
            Premium Grade <span className="text-accent-primary">Retatrutide</span> for Research
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-lg">
            US, Canada, Europe and Australia's most trusted supplier of high-purity, verified research peptides. Guaranteed &gt;99% purity with rigorous third-party testing.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/products" className="bg-btn-primary text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Shop Peptides
            </Link>
            <Link href="/coa" className="bg-transparent border border-border-soft text-text-main px-8 py-3 rounded-lg font-medium hover:bg-bg-secondary transition-colors">
              View COAs
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-success">✓</span> &gt;99% Purity
            </div>
            <div className="flex items-center gap-2">
              <span className="text-success">✓</span> Fast Shipping
            </div>
            <div className="flex items-center gap-2">
              <span className="text-success">✓</span> Secure Checkout
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px] w-full">
          <div className="relative rounded-2xl overflow-hidden bg-[#EEF2F7] shadow-sm border border-border-soft col-span-2 row-span-2 md:col-span-1 md:row-span-2">
            <Image 
              src="https://peptidelabuk.co.uk/wp-content/uploads/2026/04/68c153351d1a646053b66e98_Retatrutide-5MG-With-Pen-1-scaled.jpg" 
              alt="Premium Research Peptides" 
              fill 
              className="object-cover mix-blend-multiply"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-[#EEF2F7] shadow-sm border border-border-soft hidden md:block">
            <Image 
              src="https://peptidelabuk.co.uk/wp-content/uploads/2026/02/Alluvi-Tirzepatide-40mg.png" 
              alt="Tirzepatide Pen" 
              fill 
              className="object-cover mix-blend-multiply p-4"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-[#EEF2F7] shadow-sm border border-border-soft hidden md:block">
            <Image 
              src="https://growthguys.is/wp-content/uploads/Tirz-10-Red-1024x930.jpg" 
              alt="Research Vials" 
              fill 
              className="object-cover mix-blend-multiply p-4"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. Products grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured Research Peptides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product) => (
            <div key={product.slug} className="bg-white rounded-xl shadow-sm border border-border-soft overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-64 w-full bg-bg-secondary">
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-accent-primary text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {product.badge}
                  </span>
                )}
                <Image 
                  src={product.image} 
                  alt={`${product.name} - Premium Research Peptide`}
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{product.category}</span>
                <h3 className="font-heading font-bold text-xl mt-1 mb-2">{product.name}</h3>
                <p className="text-text-muted text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">From ${product.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/products/${product.slug}`} className="flex-1 text-center bg-bg-secondary text-text-main border border-border-soft px-4 py-2 rounded font-medium hover:bg-border-soft transition-colors text-sm">
                    View Details
                  </Link>
                  <button className="flex-1 bg-btn-primary text-white px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity text-sm">
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational SEO Content Block 1 */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg text-text-muted">
          <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Buy Retatrutide Online: The Premier Research Compound</h2>
          <p className="mb-4">
            If you are looking to <strong>buy Retatrutide online</strong>, you have found the most reliable and premium source. Retatrutide is a highly advanced, next-generation research peptide that is currently the subject of extensive scientific investigation. Known as a triple-hormone receptor agonist, this <strong>Retatrutide laboratory grade</strong> compound targets the GLP-1, GIP, and Glucagon receptors simultaneously.
          </p>
          <p className="mb-6">
            Researchers studying metabolic processes and cellular responses require the highest purity materials. That is why our <strong>premium Retatrutide</strong> is synthesized under rigorous quality controls, ensuring exact peptide sequences and optimal stability for your in-vitro studies.
          </p>

          <h3 className="text-2xl font-heading font-bold text-text-main mt-8 mb-4">What is Retatrutide and How Does It Work?</h3>
          <p className="mb-4">
            The <strong>Retatrutide peptide</strong> (LY3437943) is an experimental unimolecular tri-agonist. Unlike previous generations of dual-agonists, Retatrutide uniquely activates the glucagon receptor alongside GLP-1 and GIP. This synergistic activation in laboratory models has shown profound effects on energy expenditure and lipid metabolism.
          </p>
          <p className="mb-6">
            When you <strong>buy research peptides online</strong> from us, you receive a compound designed to yield consistent, reproducible data. The complex structural engineering of Retatrutide provides a unique opportunity for scientific exploration into metabolic pathways, making it a highly sought-after <strong>weight loss peptide</strong> for research applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white p-6 rounded-xl border border-border-soft shadow-sm">
              <h4 className="font-bold text-text-main text-xl mb-2">Retatrutide USA & Global Distribution</h4>
              <p className="text-sm">We provide secure, fast shipping of <strong>Retatrutide USA</strong>-wide, as well as to Canada, Europe, and Australia. Our localized dispatch hubs ensure your research materials arrive quickly and safely without customs delays.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-soft shadow-sm">
              <h4 className="font-bold text-text-main text-xl mb-2">Retatrutide UK Availability</h4>
              <p className="text-sm">Researchers looking for <strong>Retatrutide UK</strong> supply can rely on our consistent inventory and dedicated logistics network, ensuring high-purity peptides are delivered seamlessly to your laboratory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Cards/features bento grid */}
      <section className="bg-white py-20 border-y border-border-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-16">Why Choose Us for Your Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-bg-main border border-border-soft">
              <div className="w-12 h-12 bg-accent-primary/10 text-accent-primary rounded-lg flex items-center justify-center mb-6 text-2xl">🧪</div>
              <h3 className="font-heading font-bold text-xl mb-3">Verified &gt;99% Purity</h3>
              <p className="text-text-muted">Every batch is rigorously tested by independent third-party laboratories to ensure maximum purity and precise dosing for your research.</p>
            </div>
            <div className="p-8 rounded-2xl bg-bg-main border border-border-soft">
              <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center mb-6 text-2xl">📦</div>
              <h3 className="font-heading font-bold text-xl mb-3">Temperature Controlled</h3>
              <p className="text-text-muted">Lyophilized peptides are stored and shipped under strict temperature controls to maintain stability and prevent degradation.</p>
            </div>
            <div className="p-8 rounded-2xl bg-bg-main border border-border-soft">
              <div className="w-12 h-12 bg-btn-primary/10 text-btn-primary rounded-lg flex items-center justify-center mb-6 text-2xl">🛡️</div>
              <h3 className="font-heading font-bold text-xl mb-3">Discreet & Secure</h3>
              <p className="text-text-muted">Fast, secure shipping across the US, Canada, Europe, and Australia with discreet packaging. Guaranteed delivery or your money back.</p>
            </div>
          </div>

          {/* Educational SEO Content Block 2 */}
          <div className="max-w-4xl mx-auto prose prose-lg text-text-muted mt-12">
            <h3 className="text-2xl font-heading font-bold text-text-main mb-4">Laboratory Quality Standards and Testing</h3>
            <p className="mb-4">
              When investigating <strong>Retatrutide for sale</strong>, the paramount concern of any serious researcher must be purity. Impurities in a <strong>Retatrutide research compound</strong> can drastically skew data, leading to invalid conclusions. We guarantee that our products undergo stringent High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) testing. We openly publish our Certificates of Analysis (COAs) so you can verify the integrity of the compounds before you <strong>buy Retatrutide</strong>.
            </p>

            <h3 className="text-2xl font-heading font-bold text-text-main mt-8 mb-4">Researching Retatrutide Benefits and Dosage Information</h3>
            <p className="mb-4">
              In scientific literature, the documented <strong>Retatrutide benefits</strong> center around its unprecedented multi-receptor engagement. By comparing it to dual-agonists like Tirzepatide, researchers are mapping out new pathways in cellular energy management. Establishing proper <strong>Retatrutide dosage information</strong> in laboratory models is critical for observing dose-dependent responses without causing receptor desensitization. Our precise vial measurements allow for accurate reconstitution and dosing.
            </p>
            
            <h3 className="text-2xl font-heading font-bold text-text-main mt-8 mb-4">Secure Shipping & Dedicated Customer Support</h3>
            <p className="mb-6">
              Our global logistics network is specifically designed for delicate research materials. We utilize temperature-controlled packaging techniques to ensure the lyophilized peptides remain perfectly stable during transit. Whether you are ordering a single vial or making a bulk wholesale purchase, our dedicated customer support team is available to assist you with order tracking, COA verification, and any questions regarding our <strong>research peptides</strong> inventory.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FAQ accordion (simplified for home) */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is Retatrutide legal to buy?", a: "Yes, Retatrutide is completely legal to purchase and possess when bought strictly for in-vitro laboratory research purposes. It is not for human consumption." },
            { q: "Do you provide COAs (Certificates of Analysis)?", a: "Absolutely. We provide up-to-date, verifiable third-party COAs for every batch of peptides we sell, ensuring >99% purity." },
            { q: "How long does shipping take?", a: "US domestic shipping typically takes 1-2 business days. Canada, Europe, and Australia shipping takes 3-5 business days via tracked expedited services." }
          ].map((faq, i) => (
            <div key={i} className="border border-border-soft rounded-lg p-6 bg-white">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p className="text-text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-accent-primary font-medium hover:underline">View all FAQs &rarr;</Link>
        </div>
      </section>

      {/* 7. Floating WhatsApp button */}
      <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform z-50">
        <span className="text-xl">💬</span>
        <span className="font-medium hidden md:inline">Chat with us</span>
      </a>
    </div>
  );
}
