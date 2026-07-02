import Link from 'next/link';
import { posts } from '@/lib/blog-data';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Blog | BUY RETATRUTIDE',
  description: 'Articles, guides, and updates on research peptides including Retatrutide and Tirzepatide.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-4">Research & Insights</h1>
        <p className="text-text-muted text-lg">Stay updated with the latest scientific literature, pricing guides, and handling protocols for research peptides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white border border-border-soft rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <Link href={`/blog/${post.slug}`} className="block relative h-56 bg-bg-secondary">
               <Image src={post.image} alt={post.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </Link>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-accent-primary uppercase tracking-wider bg-accent-primary/10 px-2 py-1 rounded">{post.category}</span>
                <span className="text-xs text-text-muted">{new Date(post.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h2 className="font-heading font-bold text-xl mb-3 hover:text-accent-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-text-muted text-sm mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-text-main hover:text-accent-primary mt-auto">
                Read Article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
