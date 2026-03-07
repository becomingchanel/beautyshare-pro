import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StockAdjustmentForm } from '../components/StockAdjustmentForm';
import { cn, formatCents, formatDate } from '@/lib/utils';
import { ProductWithInventory } from '@/lib/types';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Product Inventory',
  description: 'View and manage product inventory details',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductInventoryPage({ params }: PageProps) {
  const { id } = await params;
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

  // Fetch product with inventory
  const { data: product, error: productError } = await supabase
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
    .eq('id', id)
    .single();

  if (productError || !product) {
    notFound();
  }

  const productWithInventory: ProductWithInventory = {
    ...product,
    inventory: product.inventory?.[0] || null,
  };

  const getCategoryBadgeColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      bundles: 'bg-lavender-100 text-lavender-600',
      closures: 'bg-blue-100 text-blue-800',
      frontals: 'bg-pink-100 text-pink-600',
      wigs: 'bg-pink-100 text-pink-800',
      accessories: 'bg-gray-100 text-gray-800',
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStockStatus = (
    quantity: number,
    threshold: number
  ): {
    color: string;
    label: string;
  } => {
    if (quantity === 0) {
      return { color: 'bg-red-100 text-red-800', label: 'Out of Stock' };
    } else if (quantity <= threshold) {
      return {
        color: 'bg-yellow-100 text-yellow-800',
        label: 'Low Stock',
      };
    } else {
      return {
        color: 'bg-green-100 text-green-800',
        label: 'In Stock',
      };
    }
  };

  const inventory = productWithInventory.inventory;
  const quantity = inventory?.quantity_on_hand ?? 0;
  const threshold = inventory?.low_stock_threshold ?? 10;
  const stockStatus = getStockStatus(quantity, threshold);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <Link href="/dashboard/inventory">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Inventory
          </Button>
        </Link>

        {/* Product Header */}
        <div className="border-b border-border pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {productWithInventory.name}
                </h1>
                <Badge className={getCategoryBadgeColor(productWithInventory.category)}>
                  {productWithInventory.category}
                </Badge>
              </div>
              <p className="text-foreground/70 font-mono text-sm">
                SKU: {productWithInventory.sku}
              </p>
            </div>
            <Badge className={stockStatus.color}>
              {stockStatus.label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                {productWithInventory.description && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-foreground/70">
                      {productWithInventory.description}
                    </p>
                  </div>
                )}

                {/* Pricing */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-medium text-foreground mb-4">
                    Pricing
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Wholesale Price
                      </p>
                      <p className="text-lg font-bold mt-1" style={{ color: '#FA6A27' }}>
                        {formatCents(productWithInventory.wholesale_price_cents)}
                      </p>
                    </div>
                    {productWithInventory.suggested_retail_cents && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Suggested Retail
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {formatCents(
                            productWithInventory.suggested_retail_cents
                          )}
                        </p>
                      </div>
                    )}
                    {productWithInventory.minimum_retail_cents && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Minimum Retail
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {formatCents(productWithInventory.minimum_retail_cents)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Specs */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {productWithInventory.hair_type && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Hair Type
                        </p>
                        <p className="text-foreground mt-1">
                          {productWithInventory.hair_type}
                        </p>
                      </div>
                    )}
                    {productWithInventory.texture && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Texture
                        </p>
                        <p className="text-foreground mt-1">
                          {productWithInventory.texture}
                        </p>
                      </div>
                    )}
                    {productWithInventory.length && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Length
                        </p>
                        <p className="text-foreground mt-1">
                          {productWithInventory.length}
                        </p>
                      </div>
                    )}
                    {productWithInventory.color && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Color
                        </p>
                        <p className="text-foreground mt-1">
                          {productWithInventory.color}
                        </p>
                      </div>
                    )}
                    {productWithInventory.weight_oz && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Weight
                        </p>
                        <p className="text-foreground mt-1">
                          {productWithInventory.weight_oz} oz
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-medium text-foreground mb-4">
                    Metadata
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created</span>
                      <span className="text-gray-900 font-medium">
                        {formatDate(productWithInventory.created_at)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="text-gray-900 font-medium">
                        {formatDate(productWithInventory.updated_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock History Card */}
            {inventory && (
              <Card>
                <CardHeader>
                  <CardTitle>Stock History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Last Restock Date
                      </p>
                      <p className="text-gray-900 mt-1">
                        {inventory.last_restock_date
                          ? formatDate(inventory.last_restock_date)
                          : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Last Restock Quantity
                      </p>
                      <p className="text-gray-900 mt-1">
                        {inventory.last_restock_quantity ?? 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stock Levels Summary */}
            {inventory && (
              <Card>
                <CardHeader>
                  <CardTitle>Stock Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">
                      Available
                    </p>
                    <p className="text-3xl font-bold text-blue-900 mt-1">
                      {inventory.quantity_available}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium">
                      On Hand
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {inventory.quantity_on_hand}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-600 font-medium">
                      Reserved
                    </p>
                    <p className="text-3xl font-bold text-orange-900 mt-1">
                      {inventory.quantity_reserved}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Low Stock Threshold</span>
                        <span className="text-gray-900 font-medium">
                          {inventory.low_stock_threshold}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reorder Point</span>
                        <span className="text-gray-900 font-medium">
                          {inventory.reorder_point}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stock Adjustment Form */}
            {inventory && (
              <StockAdjustmentForm
                productId={productWithInventory.id}
                currentInventory={inventory}
                onSuccess={() => {
                  // Page will be revalidated server-side
                  // For now, we could use a toast notification here
                }}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
