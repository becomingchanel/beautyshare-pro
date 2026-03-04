// ============================================
// BeautyShare Pro - Core Type Definitions
// ============================================

// --- Enums matching database schema ---

export type UserRole = 'admin' | 'subscriber' | 'free_member';
export type SubscriptionTier = 'launch' | 'grow' | 'scale';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing' | 'paused';
export type StoreStatus = 'pending_setup' | 'active' | 'suspended' | 'disconnected';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type FulfillmentStatus = 'unfulfilled' | 'partially_fulfilled' | 'fulfilled' | 'returned';
export type CustomerTier = 'new' | 'silver' | 'gold' | 'diamond';
export type HairType = 'bundle' | 'closure' | 'frontal' | 'wig' | 'ponytail' | 'clip_in' | 'tape_in' | 'accessory';
export type HairTexture = 'straight' | 'body_wave' | 'loose_wave' | 'deep_wave' | 'curly' | 'kinky_curly' | 'natural' | 'other';

// --- Database Row Types ---

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_role: UserRole;
  is_active: boolean;
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
  cancel_at_period_end: boolean;
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
  shopify_access_token: string | null;
  shopify_store_id: string | null;
  custom_domain: string | null;
  store_status: StoreStatus;
  brand_primary_color: string | null;
  brand_secondary_color: string | null;
  logo_url: string | null;
  website_setup_fee_cents: number | null;
  website_setup_paid: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  hair_type: HairType;
  texture: HairTexture | null;
  length_inches: number | null;
  origin: string | null;
  wholesale_price_cents: number;
  suggested_retail_price_cents: number | null;
  map_price_cents: number | null;
  weight_oz: number | null;
  image_urls: string[];
  is_active: boolean;
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
  warehouse_location: string | null;
  last_restocked_at: string | null;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  store_id: string;
  customer_id: string | null;
  shopify_order_id: string | null;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  wholesale_total_cents: number;
  profit_cents: number;
  shipping_name: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string | null;
  tracking_number: string | null;
  tracking_carrier: string | null;
  tracking_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  retail_price_cents: number;
  wholesale_price_cents: number;
  created_at: string;
}

export interface Customer {
  id: string;
  store_id: string;
  shopify_customer_id: string | null;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  total_orders: number;
  total_spent_cents: number;
  average_order_value_cents: number;
  first_order_at: string | null;
  last_order_at: string | null;
  predicted_next_order: string | null;
  customer_tier: CustomerTier;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalculatorResult {
  id: string;
  profile_id: string;
  calculator_type: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  created_at: string;
}

export interface SubscriberHealth {
  id: string;
  profile_id: string;
  store_id: string;
  orders_last_30_days: number;
  revenue_last_30_days_cents: number;
  customers_last_30_days: number;
  churn_risk_score: number;
  last_order_date: string | null;
  computed_at: string;
}

// --- UI / Component Types ---

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
  requiredRole?: UserRole;
  requiredTier?: SubscriptionTier[];
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
}

export interface CalculatorInput {
  label: string;
  key: string;
  type: 'number' | 'currency' | 'percentage' | 'select';
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string | number }[];
  tooltip?: string;
}
