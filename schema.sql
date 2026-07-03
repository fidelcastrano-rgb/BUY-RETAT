-- schema.sql
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customerFirstName TEXT NOT NULL,
  customerLastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  streetAddress TEXT NOT NULL,
  apartment TEXT,
  zipCode TEXT NOT NULL,
  orderedProducts TEXT NOT NULL, -- JSON string of products
  shippingMethod TEXT NOT NULL,
  shippingCost REAL NOT NULL,
  orderSubtotal REAL NOT NULL,
  orderTotal REAL NOT NULL,
  paymentMethod TEXT NOT NULL,
  orderStatus TEXT NOT NULL DEFAULT 'Pending',
  paymentStatus TEXT NOT NULL DEFAULT 'Awaiting Payment',
  paymentInstructions TEXT,
  adminNotes TEXT,
  customerNotes TEXT,
  trackingNumber TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store (
  id TEXT PRIMARY KEY,
  storeName TEXT NOT NULL
);
