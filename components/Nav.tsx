"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg-main/80 border-b border-border-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight text-accent-primary">
          BUY RETATRUTIDE
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-text-muted hover:text-accent-primary transition-colors">Shop</Link>
          <Link href="/about" className="text-text-muted hover:text-accent-primary transition-colors">About</Link>
          <Link href="/blog" className="text-text-muted hover:text-accent-primary transition-colors">Research</Link>
          <Link href="/faq" className="text-text-muted hover:text-accent-primary transition-colors">FAQs</Link>
          <Link href="/contact" className="text-text-muted hover:text-accent-primary transition-colors">Contact</Link>
          <Link href="/products" className="bg-btn-primary text-white px-4 py-2 rounded hover:opacity-90 transition-opacity">
            Order Now
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-text-muted"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border-soft bg-bg-main p-4 flex flex-col gap-4 absolute w-full shadow-lg">
          <Link href="/products" onClick={() => setIsOpen(false)} className="text-text-main font-medium hover:text-accent-primary transition-colors">Shop</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-text-main font-medium hover:text-accent-primary transition-colors">About</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="text-text-main font-medium hover:text-accent-primary transition-colors">Research</Link>
          <Link href="/faq" onClick={() => setIsOpen(false)} className="text-text-main font-medium hover:text-accent-primary transition-colors">FAQs</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-text-main font-medium hover:text-accent-primary transition-colors">Contact</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="bg-btn-primary text-white px-4 py-3 rounded text-center font-medium hover:opacity-90 transition-opacity mt-2">
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
