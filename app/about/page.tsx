import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | BUY RETATRUTIDE',
  description: 'Learn about our commitment to providing the highest quality research peptides in the US and Canada.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div>
      {/* 1. Hero with large bg text */}
      <div className="bg-bg-secondary py-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
          <span className="text-[12rem] font-heading font-bold whitespace-nowrap">PURITY FIRST</span>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">Advancing Scientific Research</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">Providing laboratories with verified, high-purity peptides to ensure reliable and reproducible experimental outcomes.</p>
        </div>
      </div>

      {/* 2. Stats row */}
      <div className="bg-accent-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold font-heading mb-2">&gt;99%</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Average Purity</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-heading mb-2">10k+</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Orders Fulfilled</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-heading mb-2">24h</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Dispatch Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-heading mb-2">100%</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Tested Batches</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Our Story */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
            <div className="prose text-text-muted">
              <p>Founded by researchers who were frustrated with the inconsistent quality of peptides available online, our mission has always been clear: provide laboratory-grade materials that scientists can trust.</p>
              <p>We partner directly with leading synthesis laboratories and implement a rigorous third-party testing protocol. We never ship a batch until its purity is independently verified via HPLC and MS analysis.</p>
              <p>Today, we supply independent researchers, university labs, and corporate R&D departments across the US, Canada, Europe, and Australia.</p>
            </div>
          </div>
          <div className="bg-bg-main p-8 rounded-2xl border border-border-soft shadow-sm">
            <h3 className="font-heading font-bold text-xl mb-4">The COA Standard</h3>
            <p className="text-text-muted text-sm mb-6">We believe transparency is the foundation of scientific integrity. Every product page features recent Certificates of Analysis.</p>
            <div className="bg-white p-4 rounded-xl border border-border-soft flex items-center gap-4">
              <div className="w-16 h-16 bg-bg-secondary rounded flex items-center justify-center text-2xl">📄</div>
              <div>
                <div className="font-bold">Latest Jan 2025 Batch</div>
                <div className="text-sm text-success font-medium">Verified Purity: 99.4%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Values */}
      <section className="bg-bg-secondary py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Uncompromising Quality", desc: "If a batch tests below 99% purity, we destroy it. We never compromise on quality." },
              { title: "Scientific Transparency", desc: "We provide clear, unedited documentation for all our products." },
              { title: "Reliability", desc: "Research relies on consistency. We ensure steady supply chains and fast delivery." },
              { title: "Safety First", desc: "We strictly enforce our policy that products are for in-vitro laboratory research only." },
              { title: "Customer Support", desc: "Our team understands research needs and provides responsive, knowledgeable support." },
              { title: "Secure Privacy", desc: "We employ end-to-end encryption and discreet packaging to protect researcher privacy." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-text-muted text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
