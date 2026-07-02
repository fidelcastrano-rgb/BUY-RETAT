import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    
    const orderArray = await db.select().from(orders).where(eq(orders.id, resolvedParams.id));
    if (!orderArray.length) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    const order = orderArray[0];

    if (body.type === 'payment') {
      await resend.emails.send({
        from: 'orders@buyretat.com',
        to: order.email,
        subject: `Payment Instructions for Order #${order.id}`,
        html: `
          <h2>Payment Instructions</h2>
          <p>Dear ${order.customerFirstName},</p>
          <p>Thank you for your order <strong>#${order.id}</strong>.</p>
          <p>Your total due is <strong>$${order.total.toFixed(2)}</strong> via <strong>${order.paymentMethod}</strong>.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${body.instructions.replace(/\n/g, '<br/>')}
          </div>
          <p>Please complete your payment as soon as possible to ensure prompt shipping.</p>
          <p>Thank you,<br/>Billing Department</p>
        `
      });
      
      // Save instructions to DB
      await db.update(orders).set({ paymentInstructions: body.instructions }).where(eq(orders.id, order.id));
    } else if (body.type === 'status') {
      await resend.emails.send({
        from: 'orders@buyretat.com',
        to: order.email,
        subject: `Order Update - #${order.id} - ${body.status}`,
        html: `
          <h2>Order Update</h2>
          <p>Dear ${order.customerFirstName},</p>
          <p>The status of your order <strong>#${order.id}</strong> has been updated to: <strong>${body.status}</strong></p>
          ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
          <p>If you have any questions, please reply to this email.</p>
          <p>Thank you,<br/>Support Team</p>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
