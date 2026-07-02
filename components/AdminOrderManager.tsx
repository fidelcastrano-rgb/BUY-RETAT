'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminOrderManager({ order }: { order: any }) {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [adminNotes, setAdminNotes] = useState(order.adminNotes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const [paymentInstructions, setPaymentInstructions] = useState('');
  const [isSendingPayment, setIsSendingPayment] = useState(false);

  const [statusEmailType, setStatusEmailType] = useState('Processing');
  const [isSendingStatus, setIsSendingStatus] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus, paymentStatus, trackingNumber, adminNotes })
      });
      if (res.ok) {
        alert('Order updated successfully');
        router.refresh();
      } else {
        alert('Failed to update order');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendPaymentInstructions = async () => {
    if (!paymentInstructions) return alert('Please enter payment instructions');
    setIsSendingPayment(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'payment', instructions: paymentInstructions })
      });
      if (res.ok) {
        alert('Payment instructions sent!');
      } else {
        alert('Failed to send payment instructions');
      }
    } finally {
      setIsSendingPayment(false);
    }
  };

  const handleSendStatusEmail = async () => {
    setIsSendingStatus(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'status', status: statusEmailType })
      });
      if (res.ok) {
        alert(`${statusEmailType} email sent!`);
      } else {
        alert('Failed to send status email');
      }
    } finally {
      setIsSendingStatus(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="space-y-6">
        <div className="bg-bg-secondary p-6 rounded-xl border border-border-soft">
          <h3 className="font-bold text-lg mb-4">Manage Order</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Order Status</label>
              <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className="w-full border rounded p-2">
                <option>Pending</option>
                <option>Awaiting Payment</option>
                <option>Paid</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Payment Status</label>
              <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="w-full border rounded p-2">
                <option>Awaiting Payment</option>
                <option>Paid</option>
                <option>Failed</option>
                <option>Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Tracking Number</label>
              <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Admin Notes (Internal)</label>
              <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} className="w-full border rounded p-2" rows={3}></textarea>
            </div>
            <button onClick={handleUpdate} disabled={isUpdating} className="bg-text-main text-white px-4 py-2 rounded font-bold hover:bg-black w-full">
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="font-bold text-lg mb-4 text-blue-900">Send Status Update Email</h3>
          <p className="text-sm text-blue-800 mb-4">Trigger an automatic email to the customer based on the order status.</p>
          <div className="flex gap-2">
            <select value={statusEmailType} onChange={(e) => setStatusEmailType(e.target.value)} className="border rounded p-2 flex-1">
              <option>Awaiting Payment</option>
              <option>Payment Received</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <button onClick={handleSendStatusEmail} disabled={isSendingStatus} className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 whitespace-nowrap">
              {isSendingStatus ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="font-bold text-lg mb-2 text-yellow-900">Send Payment Instructions</h3>
          <p className="text-sm text-yellow-800 mb-4">Manually type the payment instructions for <strong>{order.paymentMethod}</strong>. This will be sent directly to the customer's email.</p>
          <textarea 
            value={paymentInstructions} 
            onChange={(e) => setPaymentInstructions(e.target.value)} 
            placeholder="e.g. Please send payment via Zelle to payment@buyretat.com"
            className="w-full border rounded p-3 mb-4 min-h-[150px]"
          ></textarea>
          <button onClick={handleSendPaymentInstructions} disabled={isSendingPayment} className="bg-yellow-600 text-white px-4 py-2 rounded font-bold hover:bg-yellow-700 w-full">
            {isSendingPayment ? 'Sending...' : 'Send Payment Instructions'}
          </button>
        </div>
      </div>
    </div>
  );
}
