-- ============================================================
-- BEAUTYSHARE PRO - Complete Database Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extends Supabase Auth)
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'subscriber', 'free_member');
CREATE TYPE subscription_tier AS ENUM ('launch', 'grow', 'scale');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  business_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'free_member',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. SUBSCRIPTIONS (Stripe-backed billing)
-- ============================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  tier subscription_tier NOT NULL DEFAULT 'launch',
  status subscription_status NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  setup_fee_paid BOOLEAN DEFAULT FALSE,
  monthly_price_cents INTEGER NOT NULL DEFAULT 14900, -- $149.00
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. CONNECTED STORES (Subscriber Shopify stores)
-- ============================================================
CREATE TYPE store_status AS ENUM ('pending_setup', 'connected', 'disconnected', 'suspended');

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  shopify_domain TEXT UNIQUE, -- e.g., "luxelocks.myshopify.com"
  custom_domain TEXT, -- e.g., "luxelocksnyc.com"
  shopify_access_token TEXT, -- encrypted in production
  shopify_store_id TEXT,
  status store_status DEFAULT 'pending_setup',
  store_type TEXT DEFAULT 'semi_custom', -- semi_custom or custom
  website_fee_cents INTEGER, -- $599-$799 one-time
  website_fee_paid BOOLEAN DEFAULT FALSE,
  brand_logo_url TEXT,
  brand_primary_color TEXT DEFAULT '#8B4513',
  brand_secondary_color TEXT DEFAULT '#F5F0EB',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. PRODUCTS (Your hair catalog - managed by admin)
-- ============================================================
CREATE TYPE product_status AS ENUM ('active', 'draft', 'discontinued');

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- bundles, closures, frontals, wigs, accessories
  hair_type TEXT, -- brazilian, peruvian, malaysian, indian, etc.
  texture TEXT, -- straight, body_wave, deep_wave, curly, etc.
  length TEXT, -- 10", 12", 14", etc.
  color TEXT DEFAULT 'natural_black',
  wholesale_price_cents INTEGER NOT NULL, -- what subscribers pay you
  suggested_retail_cents INTEGER, -- suggested retail price
  minimum_retail_cents INTEGER, -- MAP price (minimum advertised price)
  weight_oz DECIMAL(6,2),
  image_urls TEXT[] DEFAULT '{}',
  status product_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. INVENTORY (Your warehouse stock)
-- ============================================================
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity_on_hand INTEGER NOT NULL DEFAULT 0,
  quantity_reserved INTEGER NOT NULL DEFAULT 0, -- allocated to pending orders
  quantity_available INTEGER GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
  low_stock_threshold INTEGER DEFAULT 10,
  reorder_point INTEGER DEFAULT 25,
  last_restock_date TIMESTAMPTZ,
  last_restock_quantity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id)
);

-- ============================================================
-- 6. STORE PRODUCTS (What each subscriber lists + their pricing)
-- ============================================================
CREATE TABLE store_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  retail_price_cents INTEGER NOT NULL, -- subscriber sets their own price
  is_listed BOOLEAN DEFAULT TRUE, -- whether it shows on their store
  shopify_product_id TEXT, -- ID in their Shopify store
  shopify_variant_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, product_id)
);

-- ============================================================
-- 7. ORDERS (From subscriber stores → your fulfillment)
-- ============================================================
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE fulfillment_status AS ENUM ('unfulfilled', 'partial', 'fulfilled');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL, -- BSP-10001 (auto-generated)
  store_id UUID NOT NULL REFERENCES stores(id),
  shopify_order_id TEXT, -- order ID from subscriber's Shopify
  shopify_order_number TEXT, -- human-readable Shopify order number

  -- Customer info (the end consumer)
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,

  -- Shipping address
  shipping_address_line1 TEXT,
  shipping_address_line2 TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_zip TEXT,
  shipping_country TEXT DEFAULT 'US',

  -- Financials
  subtotal_cents INTEGER NOT NULL, -- wholesale total (what subscriber pays you)
  retail_total_cents INTEGER, -- what the end customer paid
  shipping_cost_cents INTEGER DEFAULT 0,
  tax_cents INTEGER DEFAULT 0,

  -- Status
  order_status order_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  fulfillment_status fulfillment_status DEFAULT 'unfulfilled',

  -- Tracking
  tracking_number TEXT,
  tracking_carrier TEXT, -- usps, ups, fedex, dhl
  tracking_url TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Custom packaging
  use_custom_packaging BOOLEAN DEFAULT FALSE,

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate order numbers
CREATE SEQUENCE order_number_seq START 10001;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'BSP-' || nextval('order_number_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- 8. ORDER ITEMS (Line items within each order)
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  wholesale_price_cents INTEGER NOT NULL, -- price at time of order
  retail_price_cents INTEGER, -- what end customer paid
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. CUSTOMERS (End consumers - CRM for subscribers)
-- ============================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  shopify_customer_id TEXT,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent_cents INTEGER DEFAULT 0,
  average_order_cents INTEGER DEFAULT 0,
  first_order_date TIMESTAMPTZ,
  last_order_date TIMESTAMPTZ,
  predicted_next_order TIMESTAMPTZ, -- AI reorder prediction
  tier TEXT DEFAULT 'silver', -- silver, gold, diamond
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, email)
);

-- ============================================================
-- 10. ADMIN METRICS (Chanel's churn + business tracking)
-- ============================================================
CREATE TABLE admin_metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  total_subscribers INTEGER DEFAULT 0,
  new_subscribers INTEGER DEFAULT 0,
  churned_subscribers INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  total_revenue_cents BIGINT DEFAULT 0, -- SaaS + wholesale combined
  saas_revenue_cents BIGINT DEFAULT 0,
  wholesale_revenue_cents BIGINT DEFAULT 0,
  avg_order_value_cents INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriber health tracking (for churn prediction)
CREATE TABLE subscriber_health (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id),
  last_order_date TIMESTAMPTZ,
  orders_last_30_days INTEGER DEFAULT 0,
  revenue_last_30_days_cents BIGINT DEFAULT 0,
  days_since_last_order INTEGER,
  churn_risk TEXT DEFAULT 'low', -- low, medium, high, critical
  churn_risk_score DECIMAL(3,2) DEFAULT 0.00, -- 0.00 to 1.00
  health_notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- ============================================================
-- 11. CALCULATOR SAVED RESULTS
-- ============================================================
CREATE TABLE calculator_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  calculator_type TEXT NOT NULL, -- launch, profit, retail_price
  name TEXT, -- user-given name for this calculation
  inputs JSONB NOT NULL, -- the input values
  results JSONB NOT NULL, -- the calculated results
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. ACTIVITY LOG (Audit trail)
-- ============================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL, -- order_created, tracking_uploaded, subscriber_signed_up, etc.
  entity_type TEXT, -- order, store, product, subscription
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriber_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Helper function: check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- PROFILES: Users can read/update own profile, admin can read all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid() OR is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admin can insert profiles" ON profiles FOR INSERT WITH CHECK (TRUE);

-- SUBSCRIPTIONS: Users see own, admin sees all
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "Admin can manage subscriptions" ON subscriptions FOR ALL USING (is_admin());

-- STORES: Users see own, admin sees all
CREATE POLICY "Users can view own store" ON stores FOR SELECT USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "Users can update own store" ON stores FOR UPDATE USING (profile_id = auth.uid());
CREATE POLICY "Admin can manage stores" ON stores FOR ALL USING (is_admin());

-- PRODUCTS: Everyone can read (it's the catalog), admin can manage
CREATE POLICY "Everyone can view products" ON products FOR SELECT USING (TRUE);
CREATE POLICY "Admin can manage products" ON products FOR ALL USING (is_admin());

-- INVENTORY: Admin only
CREATE POLICY "Admin can manage inventory" ON inventory FOR ALL USING (is_admin());
CREATE POLICY "Subscribers can view inventory" ON inventory FOR SELECT USING (TRUE);

-- STORE PRODUCTS: Users see own store's products, admin sees all
CREATE POLICY "Users can view own store products" ON store_products FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()) OR is_admin());
CREATE POLICY "Users can manage own store products" ON store_products FOR ALL
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()) OR is_admin());

-- ORDERS: Users see orders for their store, admin sees all
CREATE POLICY "Users can view own store orders" ON orders FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()) OR is_admin());
CREATE POLICY "Admin can manage orders" ON orders FOR ALL USING (is_admin());

-- ORDER ITEMS: Same as orders
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT
  USING (order_id IN (
    SELECT o.id FROM orders o
    JOIN stores s ON o.store_id = s.id
    WHERE s.profile_id = auth.uid()
  ) OR is_admin());
CREATE POLICY "Admin can manage order items" ON order_items FOR ALL USING (is_admin());

-- CUSTOMERS: Users see their store's customers, admin sees all
CREATE POLICY "Users can view own customers" ON customers FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()) OR is_admin());
CREATE POLICY "Users can manage own customers" ON customers FOR ALL
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()) OR is_admin());

-- ADMIN METRICS: Admin only
CREATE POLICY "Admin can view metrics" ON admin_metrics_daily FOR ALL USING (is_admin());

-- SUBSCRIBER HEALTH: Admin sees all, users see own
CREATE POLICY "Users can view own health" ON subscriber_health FOR SELECT
  USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "Admin can manage health" ON subscriber_health FOR ALL USING (is_admin());

-- CALCULATOR RESULTS: Users see own, admin sees all
CREATE POLICY "Users can manage own calculations" ON calculator_results FOR ALL
  USING (profile_id = auth.uid() OR is_admin());

-- ACTIVITY LOG: Users see own, admin sees all
CREATE POLICY "Users can view own activity" ON activity_log FOR SELECT
  USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "System can insert activity" ON activity_log FOR INSERT WITH CHECK (TRUE);

-- ============================================================
-- INDEXES (Performance)
-- ============================================================
CREATE INDEX idx_orders_store_id ON orders(store_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_customers_store_id ON customers(store_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_last_order ON customers(last_order_date);
CREATE INDEX idx_store_products_store ON store_products(store_id);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_subscriptions_profile ON subscriptions(profile_id);
CREATE INDEX idx_stores_profile ON stores(profile_id);
CREATE INDEX idx_activity_log_profile ON activity_log(profile_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);
CREATE INDEX idx_calculator_results_profile ON calculator_results(profile_id);

-- ============================================================
-- UPDATED_AT TRIGGER (Auto-update timestamps)
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_store_products_updated_at BEFORE UPDATE ON store_products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_subscriber_health_updated_at BEFORE UPDATE ON subscriber_health FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_calculator_results_updated_at BEFORE UPDATE ON calculator_results FOR EACH ROW EXECUTE FUNCTION update_updated_at();
