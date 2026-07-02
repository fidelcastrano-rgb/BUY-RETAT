import type {Metadata} from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css'; // Global styles
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://buyretat.com'),
  title: {
    default: 'BUY RETATRUTIDE | Premium Research Peptides for Sale',
    template: '%s | BUY RETATRUTIDE'
  },
  description: "US, Canada, Europe and Australia's Most Trusted Research Peptide Wholesaler and Retailer. Buy Retatrutide online. High purity laboratory grade peptides.",
  keywords: ['Buy Retatrutide', 'Retatrutide for sale', 'Research Peptides', 'Buy Retatrutide online', 'Retatrutide USA', 'Retatrutide UK', 'Weight Loss Peptides', 'Retatrutide Laboratory Grade'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BUY RETATRUTIDE | Premium Research Peptides',
    description: "US, Canada, Europe and Australia's Most Trusted Research Peptide Wholesaler and Retailer.",
    url: 'https://buyretat.com',
    siteName: 'BUY RETATRUTIDE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Buy Retatrutide - Premium Research Peptides'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUY RETATRUTIDE | Premium Research Peptides',
    description: "US, Canada, Europe and Australia's Most Trusted Research Peptide Wholesaler and Retailer. Buy Retatrutide online.",
    images: ['/og-image.jpg'],
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-body bg-bg-main text-text-main antialiased`} suppressHydrationWarning>
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
