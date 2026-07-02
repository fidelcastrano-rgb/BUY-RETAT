import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '@/lib/blog-data';
import { products } from '@/lib/data';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Research Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/blog" className="text-sm font-medium text-text-muted hover:text-accent-primary mb-8 inline-flex items-center gap-2">
        &larr; Back to Research
      </Link>
      
      <div className="mb-8">
        <span className="text-xs font-bold text-accent-primary uppercase tracking-wider bg-accent-primary/10 px-2 py-1 rounded inline-block mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span className="font-medium text-text-main">{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 bg-bg-secondary">
        <Image src={post.image} alt={post.title} fill className="object-cover" referrerPolicy="no-referrer" />
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <article className="prose prose-lg max-w-none text-text-muted flex-1 prose-headings:font-heading prose-headings:text-text-main prose-a:text-accent-primary">
          <p className="lead text-xl text-text-main font-medium mb-8">
            {post.excerpt}
          </p>
          
          <h2>Introduction to the Topic</h2>
          <p>
            The landscape of research peptides is rapidly evolving, with compounds like Retatrutide showing unprecedented potential in pre-clinical studies. This article explores the core aspects of sourcing, utilizing, and understanding these complex molecules within the US regulatory framework.
          </p>

          <div className="border-l-4 border-btn-primary bg-bg-secondary p-6 rounded-r-xl my-8 not-prose">
            <h4 className="font-bold mb-2 flex items-center gap-2">💡 Research Tip</h4>
            <p className="text-sm">Always reconstitute lyophilized peptides with bacteriostatic water and store them at 2-8°C away from direct light to maintain structural integrity.</p>
          </div>

          <h3>Sourcing High-Quality Peptides</h3>
          <p>
            When looking for where to buy {post.title.includes('Retatrutide') ? 'Retatrutide' : 'peptides'} in the US, researchers must prioritize suppliers who provide verifiable Certificates of Analysis (COAs). The prevalence of under-dosed or impure products poses a significant risk to data reproducibility.
          </p>

          <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl my-8 not-prose">
            <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">⚠️ Warning</h4>
            <p className="text-sm text-red-700">Beware of unusually cheap suppliers. Synthesizing high-purity complex peptides like Retatrutide is an expensive process. Prices that seem too good to be true generally indicate low purity or counterfeit materials.</p>
          </div>

          <h3>Comparative Analysis</h3>
          <p>
            In comparison to earlier generation compounds, the triple-agonist action (GLP-1, GIP, GCGR) presents a unique pharmacokinetic profile. Refer to our <Link href="/products/retatrutide-10mg">Retatrutide 10mg</Link> specification sheet for detailed molecular weight and sequence data.
          </p>

          <table className="min-w-full my-8 text-sm">
            <thead>
              <tr className="bg-bg-secondary">
                <th className="p-3 text-left">Compound</th>
                <th className="p-3 text-left">Receptors Targeted</th>
                <th className="p-3 text-left">Typical Research Vial Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">Semaglutide</td>
                <td className="p-3">GLP-1</td>
                <td className="p-3">5mg</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Tirzepatide</td>
                <td className="p-3">GLP-1, GIP</td>
                <td className="p-3">10mg</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Retatrutide</td>
                <td className="p-3">GLP-1, GIP, GCGR</td>
                <td className="p-3">10mg / 15mg</td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm italic opacity-80 mt-12">
            Disclaimer: The information provided is strictly for educational purposes. All products mentioned are for laboratory research use only and are not intended for human consumption or veterinary use.
          </p>
        </article>

        {/* Sidebar */}
        <div className="w-full md:w-72 space-y-8">
          <div className="bg-bg-main border border-border-soft rounded-xl p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Start Your Research</h3>
            <p className="text-sm text-text-muted mb-6">Source verified, 99%+ purity peptides from our US facility.</p>
            <div className="space-y-3">
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="block w-full bg-[#25D366] text-white text-center px-4 py-3 rounded font-bold text-sm hover:opacity-90 transition-opacity">
                💬 Message on WhatsApp
              </a>
              <Link href="/products" className="block w-full bg-btn-primary text-white text-center px-4 py-3 rounded font-bold text-sm hover:opacity-90 transition-opacity">
                View All Products
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Related Articles</h3>
            <div className="space-y-4">
              {posts.filter(p => p.slug !== post.slug).slice(0, 3).map((p) => (
                <Link href={`/blog/${p.slug}`} key={p.slug} className="group block">
                  <h4 className="font-medium text-sm text-text-main group-hover:text-accent-primary transition-colors">{p.title}</h4>
                  <span className="text-xs text-text-muted mt-1 block">{new Date(p.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "image": [post.image],
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": post.author
            }
          })
        }}
      />
    </div>
  );
}
