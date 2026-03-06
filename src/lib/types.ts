// ============================================================
// BeautyShare Pro — TypeScript Types (mirrors Supabase schema)
// ============================================================

// --- Enums ---
export type UserRole = 'admin' | 'subscriber' | 'free_member';
export type SubscriptionTier = 'launch' | 'grow' | 'scale';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing';
export type StoreStatus = 'pending_setup' | 'connected' | 'disconnected' | 'suspended';
export type ProductStatus = 'active' | 'draft' | 'discontinued';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type FulfillmentStatus = 'unfulfilled' | 'partial' | 'fulfilled';

// --- Database Row Types ---

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  profile_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
  setup_fee_paid: boolean;
  monthly_price_cents: number;
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: string;
  profile_id: string;
  store_name: string;
  shopify_domain: string | null;
  custom_domain: string | null;
  shopify_access_token: string | null;
  shopify_store_id: string | null;
  status: StoreStatus;
  store_type: string;
  website_fee_cents: number | null;
  website_fee_paid: boolean;
  brand_logo_url: string | null;
  brand_primary_color: string;
  brand_secondary_color: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  hair_type: string | null;
  texture: string | null;
  length: string | null;
  color: string;
  wholesale_price_cents: number;
  suggested_retail_cents: number | null;
  minimum_retail_cents: number | null;
  weight_oz: number | null;
  image_urls: string[];
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  quantity_on_hand: number;
  quantity_reserved: number;
  quantity_available: number;
  low_stock_threshold: number;
  reorder_point: number;
  last_restock_date: string | null;
  last_restock_quantity: number | null;
  created_at: string;
  updated_at: string;
}

export interface StoreProduct {
  id: string;
  store_id: string;
  product_id: string;
  retail_price_cents: number;
  is_listed: boolean;
  shopify_product_id: string | null;
  shopify_variant_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  store_id: string;
  shopify_order_id: string | null;
  shopify_order_number: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string;
  subtotal_cents: number;
  retail_total_cents: number | null;
  shipping_cost_cents: number;
  tax_cents: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  tracking_number: string | null;
  tracking_carrier: string | null;
  tracking_url: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  use_custom_packaging: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations (optional)
  store?: Store;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  wholesale_price_cents: number;
  retail_price_cents: number | null;
  created_at: string;
  // Joined
  product?: Product;
}

export interface Customer {
  id: string;
  store_id: string;
  shopify_customer_id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  total_orders: number;
  total_spent_cents: number;
  average_order_cents: number;
  first_order_date: string | null;
  last_order_date: string | null;
  predicted_next_order: string | null;
  tier: string;
  tags: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminMetricsDaily {
  id: string;
  date: string;
  total_subscribers: number;
  new_subscribers: number;
  churned_subscribers: number;
  total_orders: number;
  total_revenue_cents: number;
  saas_revenue_cents: number;
  wholesale_revenue_cents: number;
  avg_order_value_cents: number;
  created_at: string;
}

export interface SubscriberHealth {
  id: string;
  profile_id: string;
  store_id: string | null;
  last_order_date: string | null;
  orders_last_30_days: number;
  revenue_last_30_days_cents: number;
  days_since_last_order: number | null;
  churn_risk: 'low' | 'medium' | 'high' | 'critical';
  churn_risk_score: number;
  health_notes: string | null;
  updated_at: string;
  // Joined
  profile?: Profile;
  store?: Store;
}

export interface CalculatorResult {
  id: string;
  profile_id: string;
  calculator_type: 'launch' | 'profit' | 'retail_price';
  name: string | null;
  inputs: Record<string, number | string>;
  results: Record<string, number | string>;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  profile_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// --- Composite / View Types ---

export interface ProductWithInventory extends Product {
  inventory: Inventory | null;
}

export interface OrderWithStore extends Order {
  store: Store;
}

export interface OrderDetail extends Order {
  store: Store;
  order_items: (OrderItem & { product: Product })[];
}
