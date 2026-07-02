import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | BUY RETATRUTIDE',
  description: 'Answers to common questions regarding research peptides, ordering, shipping, and quality assurance.',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">Find answers to common questions about our products, ordering process, and shipping.</p>
        
        {/* Search Bar Mock */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            className="w-full bg-white border border-border-soft rounded-xl px-4 py-3 pl-12 shadow-sm focus:outline-none focus:border-accent-primary transition-colors"
          />
          <span className="absolute left-4 top-3.5 text-text-muted text-lg">🔍</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sticky Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 bg-white border border-border-soft rounded-xl p-4">
            <h3 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-4 px-2">Categories</h3>
            <nav className="space-y-1">
              <a href="#ordering" className="block px-2 py-2 text-sm font-medium text-accent-primary bg-bg-secondary rounded">Buying & Ordering</a>
              <a href="#products" className="block px-2 py-2 text-sm font-medium text-text-main hover:bg-bg-secondary rounded transition-colors">Products & Quality</a>
              <a href="#delivery" className="block px-2 py-2 text-sm font-medium text-text-main hover:bg-bg-secondary rounded transition-colors">Delivery & Shipping</a>
              <a href="#legal" className="block px-2 py-2 text-sm font-medium text-text-main hover:bg-bg-secondary rounded transition-colors">Legal & Usage</a>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-12">
          
          {/* Section 1 */}
          <section id="ordering">
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <span className="text-accent-primary">01.</span> Buying & Ordering
            </h2>
            <div className="space-y-4">
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">How do I place an order?</h3>
                <p className="text-text-muted">The fastest and most secure way to order is via WhatsApp. Message us the products you need, and we will confirm stock and provide payment instructions. Alternatively, you can email us.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
                <p className="text-text-muted">Due to banking restrictions on peptide sales, we accept secure Bank Transfers and Cryptocurrency (Bitcoin, Ethereum, USDT) to ensure discrete and uninterrupted service.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Do you offer wholesale discounts?</h3>
                <p className="text-text-muted">Yes, we provide significant discounts for bulk orders. Please view the variant options on product pages or email us for custom wholesale quotes over 50 vials.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="products">
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <span className="text-accent-primary">02.</span> Products & Quality
            </h2>
            <div className="space-y-4">
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Are your peptides tested?</h3>
                <p className="text-text-muted">Yes, every single batch is third-party tested using High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) to guarantee &gt;99% purity.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">How should I store the lyophilized powder?</h3>
                <p className="text-text-muted">Unreconstituted lyophilized powder should be stored in the freezer at -20°C for long-term storage (up to 36 months). Short term, it can be kept in the refrigerator.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Do you provide bacteriostatic water?</h3>
                <p className="text-text-muted">No, we only supply the lyophilized peptide powder. You will need to source your own bacteriostatic water or sterile saline for reconstitution.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="delivery">
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <span className="text-accent-primary">03.</span> Delivery & Shipping
            </h2>
            <div className="space-y-4">
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Where do you ship from?</h3>
                <p className="text-text-muted">We maintain dispatch hubs in the US and Canada to ensure rapid delivery to our core markets without customs delays.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Will the package be discreet?</h3>
                <p className="text-text-muted">Absolutely. All orders are packed in plain, unmarked boxes or bubble mailers. There is no indication of the contents on the outside of the package.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Do you guarantee delivery?</h3>
                <p className="text-text-muted">Yes, we offer a 100% delivery guarantee. If your tracked package is lost in transit or seized, we will reship it once free of charge.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="legal">
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <span className="text-accent-primary">04.</span> Legal & Usage
            </h2>
            <div className="space-y-4">
              <div className="border border-border-soft rounded-xl p-6 bg-white border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-2">Can I use these for human consumption?</h3>
                <p className="text-text-muted font-medium text-red-700">NO. Under no circumstances are our products to be used for human consumption or veterinary purposes. They are strictly for laboratory research use only.</p>
              </div>
              <div className="border border-border-soft rounded-xl p-6 bg-white">
                <h3 className="font-bold text-lg mb-2">Is it legal to buy Retatrutide?</h3>
                <p className="text-text-muted">Yes, purchasing these peptides is completely legal in the US, Canada, and most of the EU provided they are explicitly bought and used for research purposes.</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      <div className="mt-16 text-center bg-bg-secondary rounded-2xl p-8 border border-border-soft">
        <h2 className="text-2xl font-heading font-bold mb-4">Still have questions?</h2>
        <p className="text-text-muted mb-6">Our support team is available 24/7 to help you with your research needs.</p>
        <a href="/contact" className="inline-block bg-btn-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">Contact Support</a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are your peptides tested?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, every single batch is third-party tested using High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) to guarantee >99% purity."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use these for human consumption?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "NO. Under no circumstances are our products to be used for human consumption or veterinary purposes. They are strictly for laboratory research use only."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
