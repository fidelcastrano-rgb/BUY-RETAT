import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders, inventory } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key'); // We'll assume RESEND_API_KEY is configured

const checkoutSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  streetAddress: z.string().min(1),
  apartment: z.string().optional(),
  postalCode: z.string().min(1),
  items: z.array(z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    variantName: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    image: z.string()
  })),
  shippingMethod: z.enum(['Same Day Shipping', 'Normal Shipping']),
  paymentMethod: z.enum(['Apple Cash', 'Zelle', 'Chime', 'Cryptocurrency']),
  customerNotes: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = checkoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    // Check inventory
    for (const item of data.items) {
      const invId = `${item.slug}-${item.variantName}`;
      const inv = await db.select().from(inventory).where(eq(inventory.id, invId));
      const currentStock = inv.length > 0 ? inv[0].stock : 100; // Assume 100 default
      if (currentStock < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for ${item.name} - ${item.variantName}` }, { status: 400 });
      }
    }

    // Recalculate totals
    const subtotal = data.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingCost = data.shippingMethod === 'Same Day Shipping' ? 60 : 18;
    const total = subtotal + shippingCost;

    // Validate payment method rule
    if (subtotal < 150 && data.paymentMethod !== 'Cryptocurrency') {
      return NextResponse.json({ error: 'Orders below $150 USD can only be paid using Cryptocurrency.' }, { status: 400 });
    }

    const orderId = `ORD-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(10000 + Math.random() * 90000)}`;

    // Insert into DB
    await db.insert(orders).values({
      id: orderId,
      customerFirstName: data.firstName,
      customerLastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      state: data.state,
      city: data.city,
      streetAddress: data.streetAddress,
      apartment: data.apartment || null,
      postalCode: data.postalCode,
      orderedProducts: JSON.stringify(data.items),
      subtotal,
      shippingMethod: data.shippingMethod,
      shippingCost,
      total,
      paymentMethod: data.paymentMethod,
      customerNotes: data.customerNotes || null,
    });

    // Reduce stock
    for (const item of data.items) {
      const invId = `${item.slug}-${item.variantName}`;
      const inv = await db.select().from(inventory).where(eq(inventory.id, invId));
      if (inv.length > 0) {
        await db.update(inventory).set({ stock: inv[0].stock - item.quantity }).where(eq(inventory.id, invId));
      } else {
        await db.insert(inventory).values({ id: invId, stock: 100 - item.quantity });
      }
    }

    // Send customer confirmation email
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'orders@buyretat.com', // Should be a verified domain
          to: data.email,
          subject: 'Order Received - Thank You',
          html: `
            <h2>Thank You For Your Order!</h2>
            <p><strong>Order Number:</strong> ${orderId}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Shipping Method:</strong> ${data.shippingMethod} ($${shippingCost.toFixed(2)})</p>
            <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
            <h3>Products Ordered:</h3>
            <ul>
              ${data.items.map(item => `<li>${item.quantity}x ${item.name} (${item.variantName}) - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <br/>
            <div style="background-color: #fef08a; padding: 15px; border-radius: 8px;">
              <p><strong>IMPORTANT: Payment instructions are NOT included in this email. Our billing department will personally send your payment instructions shortly. Please do not send payment until you receive that email.</strong></p>
            </div>
          `
        });

        // Send admin notification
        await resend.emails.send({
          from: 'orders@buyretat.com',
          to: 'admin@buyretat.com', // Would ideally be an env variable
          subject: `New Order Received - ${orderId}`,
          html: `
            <h2>New Order: ${orderId}</h2>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <h3>Customer Details</h3>
            <p>${data.firstName} ${data.lastName}<br/>${data.email}<br/>${data.phone}</p>
            <h3>Shipping Address</h3>
            <p>${data.streetAddress} ${data.apartment ? data.apartment : ''}<br/>
            ${data.city}, ${data.state} ${data.postalCode}<br/>
            ${data.country}</p>
            <h3>Products</h3>
            <ul>
              ${data.items.map(item => `<li>${item.quantity}x ${item.name} (${item.variantName}) - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Shipping:</strong> ${data.shippingMethod} ($${shippingCost.toFixed(2)})</p>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Customer Notes:</strong> ${data.customerNotes || 'None'}</p>
            <p>Please log in to the admin dashboard to send payment instructions.</p>
          `
        });
      } catch (e) {
        console.error('Email failed to send', e);
      }
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Checkout error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
