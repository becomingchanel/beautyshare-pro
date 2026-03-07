'use client';

import { ProductWithInventory } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, formatCents } from '@/lib/utils';
import Link from 'next/link';

interface ProductGridProps {
  products: ProductWithInventory[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const getStockIndicator = (
    quantity: number,
    threshold: number
  ): {
    color: string;
    label: string;
    bgColor: string;
  } => {
    if (quantity === 0) {
      return {
        color: 'bg-red-100 text-red-800',
        label: 'Out of Stock',
        bgColor: 'bg-red-50',
      };
    } else if (quantity <= threshold) {
      return {
        color: 'bg-yellow-100 text-yellow-800',
        label: 'Low Stock',
        bgColor: 'bg-yellow-50',
      };
    } else {
      return {
        color: 'bg-green-100 text-green-800',
        label: 'In Stock',
        bgColor: 'bg-green-50',
      };
    }
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

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const quantity = product.inventory?.quantity_on_hand ?? 0;
        const threshold = product.inventory?.low_stock_threshold ?? 10;
        const indicator = getStockIndicator(quantity, threshold);

        return (
          <Link
            key={product.id}
            href={`/dashboard/inventory/${product.id}`}
          >
            <Card className={cn(
              'h-full hover:shadow-lg transition-shadow cursor-pointer',
              indicator.bgColor
            )}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header with SKU and Category */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">SKU</p>
                      <p className="font-mono text-sm font-semibold text-gray-700">
                        {product.sku}
                      </p>
                    </div>
                    <Badge className={getCategoryBadgeColor(product.category)}>
                      {product.category}
                    </Badge>
                  </div>

                  {/* Product Name */}
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500 font-medium">
                      Wholesale Price
                    </p>
                    <p className="text-lg font-bold" style={{ color: '#FA6A27' }}>
                      {formatCents(product.wholesale_price_cents)}
                    </p>
                  </div>

                  {/* Stock Level */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500 font-medium">
                        Stock Level
                      </p>
                      <Badge className={indicator.color}>
                        {indicator.label}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {quantity}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Threshold: {threshold}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
