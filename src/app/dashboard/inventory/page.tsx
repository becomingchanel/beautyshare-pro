import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductGrid } from './components/ProductGrid';
import { LowStockAlerts } from './components/LowStockAlerts';
import { ProductWithInventory } from '@/lib/types';

export const metadata = {
  title: 'Inventory Management',
  description: 'Manage product inventory and stock levels',
};

export default async function InventoryPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch all products with inventory
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      sku,
      name,
      description,
      category,
      hair_type,
      texture,
      length,
      color,
      wholesale_price_cents,
      suggested_retail_cents,
      minimum_retail_cents,
      weight_oz,
      image_urls,
      status,
      created_at,
      updated_at,
      inventory:inventory(*)
    `)
    .eq('status', 'active')
    .order('name', { ascending: true });

  if (productsError) {
    console.error('[Inventory Page] Error fetching products:', productsError);
  }

  const products: ProductWithInventory[] = (productsData || []).map(
    (product: any) => ({
      ...product,
      inventory: product.inventory?.[0] || null,
    })
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage your product inventory across all categories
          </p>
        </div>

        {/* Low Stock Alerts */}
        {products.length > 0 && <LowStockAlerts products={products} />}

        {/* Products Grid */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              All Products ({products.length})
            </h2>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </DashboardLayout>
  );
}
