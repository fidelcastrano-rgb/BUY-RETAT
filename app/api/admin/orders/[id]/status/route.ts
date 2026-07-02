import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    
    await db.update(orders).set({
      orderStatus: body.orderStatus,
      paymentStatus: body.paymentStatus,
      trackingNumber: body.trackingNumber,
      adminNotes: body.adminNotes,
      updatedAt: new Date()
    }).where(eq(orders.id, resolvedParams.id));

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
