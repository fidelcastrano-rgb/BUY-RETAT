import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdminOrderManager from '@/components/AdminOrderManager';

export default async function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const orderArray = await db.select().from(orders).where(eq(orders.id, resolvedParams.id));
  
  if (!orderArray.length) {
    notFound();
  }

  const order = orderArray[0];
  const items = JSON.parse(order.orderedProducts);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/admin" className="text-accent-primary font-bold hover:underline mb-8 inline-block">&larr; Back to Orders</Link>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Order {order.id}</h1>
          <p className="text-text-muted mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
          <div className="text-sm font-bold text-text-muted mt-1">{order.paymentMethod}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-border-soft">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Products</h2>
            <div className="space-y-4">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-text-muted">{item.variantName} x {item.quantity}</div>
                  </div>
                  <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Shipping ({order.shippingMethod})</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {order.customerNotes && (
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h2 className="font-bold mb-2">Customer Notes</h2>
              <p className="text-sm">{order.customerNotes}</p>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white p-6 rounded-xl border border-border-soft">
            <h2 className="font-bold mb-4 border-b pb-2">Customer Details</h2>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-bold text-text-muted text-xs uppercase mb-1">Contact</div>
                <div>{order.customerFirstName} {order.customerLastName}</div>
                <div>{order.email}</div>
                <div>{order.phone}</div>
              </div>
              <div>
                <div className="font-bold text-text-muted text-xs uppercase mb-1">Shipping Address</div>
                <div>{order.streetAddress} {order.apartment ? `, ${order.apartment}` : ''}</div>
                <div>{order.city}, {order.state} {order.postalCode}</div>
                <div>{order.country}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminOrderManager order={order} />
    </div>
  );
}
