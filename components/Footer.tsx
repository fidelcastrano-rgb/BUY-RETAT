import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-soft pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Brand</h3>
            <p className="text-sm text-text-muted mb-4">
              US, Canada, Europe and Australia's Most Trusted Research Peptide Wholesaler and Retailer. Premium medical research peptides.
            </p>
            <p className="text-sm text-text-muted">
              sales@buyretat.com
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/products/retatrutide-10mg" className="hover:text-accent-primary">Retatrutide 10mg</Link></li>
              <li><Link href="/products/retatrutide-20mg" className="hover:text-accent-primary">Retatrutide 20mg</Link></li>
              <li><Link href="/products/tirzepatide-10mg" className="hover:text-accent-primary">Tirzepatide 10mg</Link></li>
              <li><Link href="/products" className="hover:text-accent-primary">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Research</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/blog" className="hover:text-accent-primary">Blog & Articles</Link></li>
              <li><Link href="/blog/where-to-buy-retatrutide-us" className="hover:text-accent-primary">Buying Guide</Link></li>
              <li><Link href="/faq" className="hover:text-accent-primary">FAQs</Link></li>
              <li><Link href="/about" className="hover:text-accent-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/contact" className="hover:text-accent-primary">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-accent-primary">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-primary">Privacy Policy</Link></li>
              <li><Link href="/coa" className="hover:text-accent-primary">COAs</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-soft pt-8 text-center text-xs text-text-muted">
          <p className="mb-2">Disclaimer: Products are sold for strictly research purposes only. Not for human consumption.</p>
          <p>&copy; {new Date().getFullYear()} BUY RETATRUTIDE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
