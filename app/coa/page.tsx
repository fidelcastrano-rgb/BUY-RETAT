import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificates of Analysis (COA) | BUY RETATRUTIDE',
  description: 'View the latest Certificates of Analysis (COA) for our research peptides, ensuring purity and quality.',
  alternates: { canonical: '/coa' },
};

export default function COAPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-heading font-bold mb-8">Certificates of Analysis (COAs)</h1>
      <div className="prose max-w-none text-text-muted">
        <p className="text-sm uppercase tracking-wider font-bold text-text-main mb-8">Latest Testing Results</p>
        
        <h2>Our Commitment to Purity</h2>
        <p>At BUY RETATRUTIDE, we believe transparency is the foundation of scientific integrity. We partner directly with leading synthesis laboratories and implement a rigorous third-party testing protocol using High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS). We never ship a batch until its purity is independently verified to be &gt;99%.</p>

        <div className="bg-white p-6 rounded-xl border border-border-soft shadow-sm my-8">
            <h3 className="font-heading font-bold text-xl mb-4 text-text-main mt-0">Retatrutide Batch Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-main">
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Testing Facility</span>
                    <span>Janoshik Analytics</span>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Batch ID</span>
                    <span>RET-US-2025-01A</span>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Purity Result</span>
                    <span className="text-success font-bold text-lg">99.6%</span>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Net Weight</span>
                    <span>10.2mg (Pass)</span>
                </div>
            </div>
            <p className="mt-4 text-sm text-text-muted italic">Full verifiable PDF report available upon request for active customers.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-soft shadow-sm my-8">
            <h3 className="font-heading font-bold text-xl mb-4 text-text-main mt-0">Tirzepatide Batch Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-main">
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Testing Facility</span>
                    <span>Janoshik Analytics</span>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Batch ID</span>
                    <span>TIR-US-2025-02B</span>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Purity Result</span>
                    <span className="text-success font-bold text-lg">99.4%</span>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                    <span className="block font-bold text-text-muted mb-1">Net Weight</span>
                    <span>10.1mg (Pass)</span>
                </div>
            </div>
            <p className="mt-4 text-sm text-text-muted italic">Full verifiable PDF report available upon request for active customers.</p>
        </div>

        <h2>How to Verify Your Order</h2>
        <p>If you have recently placed an order, your specific batch number will be included on the vial labels. Please email <strong>sales@buyretat.com</strong> with your order number and batch ID to receive the high-resolution PDF scan of the corresponding lab results.</p>
      </div>
    </div>
  );
}
