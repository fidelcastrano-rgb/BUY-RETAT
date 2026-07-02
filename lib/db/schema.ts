import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const inventory = sqliteTable('inventory', {
  id: text('id').primaryKey(), // We'll use `${productSlug}-${variantName}`
  stock: integer('stock').notNull().default(100),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerFirstName: text('customer_first_name').notNull(),
  customerLastName: text('customer_last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  country: text('country').notNull(),
  state: text('state').notNull(),
  city: text('city').notNull(),
  streetAddress: text('street_address').notNull(),
  apartment: text('apartment'),
  postalCode: text('postal_code').notNull(),
  
  orderedProducts: text('ordered_products').notNull(), // JSON string
  subtotal: real('subtotal').notNull(),
  shippingMethod: text('shipping_method').notNull(),
  shippingCost: real('shipping_cost').notNull(),
  total: real('total').notNull(),
  
  paymentMethod: text('payment_method').notNull(),
  orderStatus: text('order_status').notNull().default('Pending'),
  paymentStatus: text('payment_status').notNull().default('Awaiting Payment'),
  
  paymentInstructions: text('payment_instructions'),
  adminNotes: text('admin_notes'),
  customerNotes: text('customer_notes'),
  trackingNumber: text('tracking_number'),
  
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});
