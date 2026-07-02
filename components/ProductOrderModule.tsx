'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/data';

export default function ProductOrderModule({ product }: { product: Product }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    const variant = product.variants[selectedVariantIndex];
    addItem({
      id: `${product.slug}-${selectedVariantIndex}`,
      slug: product.slug,
      name: product.name,
      variantName: variant.name,
      price: variant.price,
      quantity: 1,
      image: product.image,
    });
    router.push('/checkout');
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="font-bold mb-3">Select Variant:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.variants.map((v, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedVariantIndex(i)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${selectedVariantIndex === i ? 'border-accent-primary bg-bg-secondary' : 'border-border-soft hover:border-text-muted'}`}
            >
              <div className="font-bold">{v.name}</div>
              <div className="flex justify-between mt-1 text-sm">
                <span>${v.price.toFixed(2)}</span>
                {v.savings && <span className="text-success font-medium">{v.savings}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-btn-primary text-white text-center px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Checkout Now
        </button>
      </div>

      <div className="space-y-4">
        <div className="border-l-4 border-btn-primary bg-bg-secondary p-4 rounded-r-lg">
          <h4 className="font-bold mb-1">How Ordering Works</h4>
          <p className="text-sm text-text-muted">Select your desired variant and proceed to checkout. You will receive an email with secure payment details for your chosen method.</p>
        </div>
      </div>
    </>
  );
}
