export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function AdminDashboard() {
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Admin Dashboard - Orders</h1>
      
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-border-soft">
        <table className="w-full text-left">
          <thead className="bg-bg-secondary text-text-muted text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b">Order ID</th>
              <th className="p-4 border-b">Date</th>
              <th className="p-4 border-b">Customer</th>
              <th className="p-4 border-b">Total</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Payment</th>
              <th className="p-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {allOrders.map((order) => (
              <tr key={order.id} className="hover:bg-bg-secondary transition-colors">
                <td className="p-4 font-bold"><Link href={`/admin/orders/${order.id}`} className="hover:text-accent-primary">{order.id}</Link></td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div>{order.customerFirstName} {order.customerLastName}</div>
                  <div className="text-xs text-text-muted">{order.email}</div>
                </td>
                <td className="p-4">${order.total.toFixed(2)}</td>
                <td className="p-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded">{order.orderStatus}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm">{order.paymentMethod}</div>
                  <div className="text-xs text-text-muted">{order.paymentStatus}</div>
                </td>
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`} className="text-accent-primary font-medium hover:underline">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
            {allOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-text-muted">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
