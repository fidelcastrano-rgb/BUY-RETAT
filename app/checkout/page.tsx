'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/lib/store/cart';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  shippingMethod: z.enum(['Same Day Shipping', 'Normal Shipping']),
  paymentMethod: z.enum(['Apple Cash', 'Zelle', 'Chime', 'Cryptocurrency']),
  customerNotes: z.string().optional()
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'Normal Shipping',
      paymentMethod: 'Cryptocurrency'
    }
  });

  const subtotal = mounted ? getSubtotal() : 0;
  const shippingMethod = watch('shippingMethod');
  const paymentMethod = watch('paymentMethod');
  const shippingCost = shippingMethod === 'Same Day Shipping' ? 60 : 18;
  const total = subtotal + shippingCost;
  
  const meetsMinimumForFiat = subtotal >= 150;

  useEffect(() => {
    if (mounted && !meetsMinimumForFiat && paymentMethod !== 'Cryptocurrency') {
      setValue('paymentMethod', 'Cryptocurrency');
    }
  }, [mounted, meetsMinimumForFiat, paymentMethod, setValue]);

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit order');
      }
      setSuccessOrderId(result.orderId);
      clearCart();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return <div className="p-12 text-center">Loading...</div>;

  if (successOrderId) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-2xl">
        <h1 className="text-4xl font-heading font-bold text-success mb-4">Thank you for your order!</h1>
        <p className="text-xl mb-4">Your order <strong>{successOrderId}</strong> has been received successfully.</p>
        <div className="bg-bg-secondary p-6 rounded-xl text-left border-l-4 border-accent-primary">
          <p className="font-bold mb-2">Important regarding payment:</p>
          <p>Our billing team will personally email your payment instructions for your selected payment method shortly. Please do not send payment until you receive that email.</p>
        </div>
        <button onClick={() => router.push('/')} className="mt-8 bg-btn-primary text-white px-8 py-3 rounded-lg font-bold">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push('/products')} className="bg-btn-primary text-white px-8 py-3 rounded-lg font-bold">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold mb-8 text-center">Secure Checkout</h1>
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 max-w-4xl mx-auto">{error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading border-b pb-2">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">First Name *</label>
                  <input {...register('firstName')} className="w-full border rounded-lg p-3" />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Last Name *</label>
                  <input {...register('lastName')} className="w-full border rounded-lg p-3" />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Email *</label>
                  <input {...register('email')} type="email" className="w-full border rounded-lg p-3" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Phone *</label>
                  <input {...register('phone')} className="w-full border rounded-lg p-3" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading border-b pb-2">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Country *</label>
                  <input {...register('country')} className="w-full border rounded-lg p-3" />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">State / Province *</label>
                  <input {...register('state')} className="w-full border rounded-lg p-3" />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Street Address *</label>
                <input {...register('streetAddress')} className="w-full border rounded-lg p-3" />
                {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress.message}</p>}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">City *</label>
                  <input {...register('city')} className="w-full border rounded-lg p-3" />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">ZIP / Postal *</label>
                  <input {...register('postalCode')} className="w-full border rounded-lg p-3" />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Apartment, suite, etc. (optional)</label>
                <input {...register('apartment')} className="w-full border rounded-lg p-3" />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading border-b pb-2">Shipping Method</h2>
              <div className="space-y-3">
                <label className={`block border p-4 rounded-xl cursor-pointer ${shippingMethod === 'Normal Shipping' ? 'border-accent-primary bg-bg-secondary' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" value="Normal Shipping" {...register('shippingMethod')} className="w-5 h-5 accent-accent-primary" />
                      <span className="font-bold">Normal Shipping</span>
                    </div>
                    <span className="font-bold">$18.00</span>
                  </div>
                </label>
                <label className={`block border p-4 rounded-xl cursor-pointer ${shippingMethod === 'Same Day Shipping' ? 'border-accent-primary bg-bg-secondary' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" value="Same Day Shipping" {...register('shippingMethod')} className="w-5 h-5 accent-accent-primary" />
                      <span className="font-bold">Same Day Shipping</span>
                    </div>
                    <span className="font-bold">$60.00</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading border-b pb-2">Payment</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm mb-4">
                <strong>Minimum order notice:</strong> Orders below $150 USD can only be paid using Cryptocurrency. Orders of $150 USD or more may use Apple Cash, Zelle, Chime, or Cryptocurrency.
              </div>

              <div className="space-y-3">
                <label className={`block border p-4 rounded-xl ${!meetsMinimumForFiat ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${paymentMethod === 'Apple Cash' ? 'border-accent-primary bg-bg-secondary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" value="Apple Cash" disabled={!meetsMinimumForFiat} {...register('paymentMethod')} className="w-5 h-5 accent-accent-primary" />
                    <span className="font-bold">Apple Cash</span>
                  </div>
                </label>
                <label className={`block border p-4 rounded-xl ${!meetsMinimumForFiat ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${paymentMethod === 'Zelle' ? 'border-accent-primary bg-bg-secondary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" value="Zelle" disabled={!meetsMinimumForFiat} {...register('paymentMethod')} className="w-5 h-5 accent-accent-primary" />
                    <span className="font-bold">Zelle</span>
                  </div>
                </label>
                <label className={`block border p-4 rounded-xl ${!meetsMinimumForFiat ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${paymentMethod === 'Chime' ? 'border-accent-primary bg-bg-secondary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" value="Chime" disabled={!meetsMinimumForFiat} {...register('paymentMethod')} className="w-5 h-5 accent-accent-primary" />
                    <span className="font-bold">Chime</span>
                  </div>
                </label>
                <label className={`block border p-4 rounded-xl cursor-pointer ${paymentMethod === 'Cryptocurrency' ? 'border-accent-primary bg-bg-secondary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" value="Cryptocurrency" {...register('paymentMethod')} className="w-5 h-5 accent-accent-primary" />
                    <span className="font-bold">Cryptocurrency (BTC, ETH, USDT, etc)</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
               <label className="block text-sm font-bold mb-1">Order Notes (Optional)</label>
               <textarea {...register('customerNotes')} rows={3} className="w-full border rounded-lg p-3"></textarea>
            </div>
            
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-bg-secondary p-6 rounded-2xl sticky top-8">
            <h2 className="text-xl font-bold font-heading mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 relative bg-white rounded border overflow-hidden shrink-0">
                     <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-text-muted mt-1">{item.variantName}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 text-sm">-</button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-sm">+</button>
                      </div>
                      <div className="font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} className="text-text-muted hover:text-red-500 self-start">✕</button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-bold">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full bg-btn-primary text-white font-bold py-4 rounded-xl mt-8 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
