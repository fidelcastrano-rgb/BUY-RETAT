import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | BUY RETATRUTIDE',
  description: 'Contact our team for research peptide orders, wholesale inquiries, and support.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Contact & Ordering</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">Our specialized team is ready to assist with your research supply needs. For the fastest response and secure ordering, we recommend WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="bg-white border-2 border-success rounded-2xl p-8 relative shadow-sm">
            <span className="absolute -top-3 left-8 bg-success text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-2xl shrink-0">💬</div>
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2">WhatsApp Order Line</h2>
                <p className="text-text-muted text-sm">Secure, encrypted, and instant. Message us your required items and we will reply with stock confirmation and payment details.</p>
              </div>
            </div>
            
            <table className="w-full text-sm mb-6 border border-border-soft rounded-lg overflow-hidden">
              <tbody className="divide-y divide-border-soft">
                <tr>
                  <td className="bg-bg-secondary p-3 font-medium text-text-muted w-1/2">Response Time</td>
                  <td className="p-3 font-bold text-text-main">Under 15 minutes</td>
                </tr>
                <tr>
                  <td className="bg-bg-secondary p-3 font-medium text-text-muted">Hours</td>
                  <td className="p-3 font-bold text-text-main">24/7 Support</td>
                </tr>
              </tbody>
            </table>

            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="block w-full bg-[#25D366] text-white text-center px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
              Message +44 123 456 7890
            </a>
          </div>

          <div className="bg-bg-main border border-border-soft rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center text-2xl shrink-0">✉️</div>
              <div>
                <h2 className="text-xl font-heading font-bold mb-2">Email Inquiries</h2>
                <p className="text-text-muted text-sm mb-4">For bulk/wholesale orders, COA requests, or general inquiries.</p>
                <a href="mailto:sales@buyretat.com" className="text-lg font-bold text-accent-primary hover:underline">sales@buyretat.com</a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border-soft rounded-2xl p-8">
             <h3 className="font-heading font-bold text-lg mb-4">4-Step Secure Order Flow</h3>
             <ol className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-soft before:to-transparent">
                <li className="relative flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow">1</div>
                  <div><span className="font-bold">Message</span> us your requested products</div>
                </li>
                <li className="relative flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow">2</div>
                  <div>We confirm stock & send <span className="font-bold">Secure Payment Link</span> (Crypto/Bank Transfer)</div>
                </li>
                <li className="relative flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow">3</div>
                  <div>Send payment and provide <span className="font-bold">Shipping Details</span></div>
                </li>
                <li className="relative flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow">4</div>
                  <div>Receive tracking number within <span className="font-bold">24 Hours</span></div>
                </li>
             </ol>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">🚫 Online Only - No Physical Store</h3>
            <p className="text-sm">To maintain security and low overhead costs, we operate entirely online. We do not have a physical storefront for pickups. All orders are dispatched from our secure warehouses.</p>
          </div>

          <div className="bg-white border border-border-soft rounded-2xl p-6">
             <h3 className="font-heading font-bold text-lg mb-4">Research Safety Rules</h3>
             <ul className="space-y-3 text-sm text-text-muted">
               <li className="flex items-start gap-2">
                 <span className="text-accent-primary mt-0.5">•</span>
                 <span>All products are strictly for in-vitro laboratory research.</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-accent-primary mt-0.5">•</span>
                 <span>Not for human consumption or veterinary use.</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-accent-primary mt-0.5">•</span>
                 <span>We reserve the right to cancel orders if we suspect misuse.</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-accent-primary mt-0.5">•</span>
                 <span>Buyers must be familiar with peptide handling protocols.</span>
               </li>
             </ul>
          </div>

          <div className="bg-bg-main border border-border-soft rounded-2xl p-6 overflow-hidden">
             <h3 className="font-heading font-bold text-lg mb-4">Shipping Information</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-sm">
                 <thead>
                   <tr className="border-b border-border-soft">
                     <th className="text-left py-3 font-medium text-text-muted">Region</th>
                     <th className="text-left py-3 font-medium text-text-muted">Method</th>
                     <th className="text-left py-3 font-medium text-text-muted">Time</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border-soft">
                   <tr>
                     <td className="py-3 font-medium">United Kingdom</td>
                     <td className="py-3">Royal Mail Special Delivery</td>
                     <td className="py-3">Next Day (Before 1PM)</td>
                   </tr>
                   <tr>
                     <td className="py-3 font-medium">United States</td>
                     <td className="py-3">USPS Priority / FedEx</td>
                     <td className="py-3">3-5 Business Days</td>
                   </tr>
                   <tr>
                     <td className="py-3 font-medium">Europe (EU)</td>
                     <td className="py-3">DPD / DHL Express</td>
                     <td className="py-3">2-4 Business Days</td>
                   </tr>
                   <tr>
                     <td className="py-3 font-medium">Australia</td>
                     <td className="py-3">AusPost Express</td>
                     <td className="py-3">5-7 Business Days</td>
                   </tr>
                 </tbody>
               </table>
             </div>
             <p className="text-xs text-text-muted mt-4 mt-2">All shipments are discreetly packaged without branding on the exterior to ensure privacy and customs clearance.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-border-soft rounded-xl p-4 text-center">
              <div className="text-xl mb-1">🇬🇧</div>
              <div className="font-bold text-sm">New York, US</div>
              <div className="text-xs text-text-muted">Primary Dispatch Hub</div>
            </div>
            <div className="bg-white border border-border-soft rounded-xl p-4 text-center">
              <div className="text-xl mb-1">🇺🇸</div>
              <div className="font-bold text-sm">New York, US</div>
              <div className="text-xs text-text-muted">US Distribution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
