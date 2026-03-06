'use client';

import { ProductWithInventory } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface LowStockAlertsProps {
  products: ProductWithInventory[];
}

export function LowStockAlerts({ products }: LowStockAlertsProps) {
  // Filter products below their low stock threshold
  const lowStockProducts = products.filter(
    (product) =>
      product.inventory &&
      product.inventory.quantity_on_hand <=
        product.inventory.low_stock_threshold &&
      product.inventory.quantity_on_hand > 0
  );

  const outOfStockProducts = products.filter(
    (product) =>
      product.inventory && product.inventory.quantity_on_hand === 0
  );

  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <CardTitle className="text-yellow-900">
            Inventory Alerts ({outOfStockProducts.length + lowStockProducts.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Out of Stock */}
          {outOfStockProducts.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                Out of Stock ({outOfStockProducts.length})
              </h4>
              <div className="space-y-2">
                {outOfStockProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/dashboard/inventory/${product.id}`}
                    className="block"
                  >
                    <div className="bg-white p-3 rounded border border-red-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 font-mono mt-1">
                            {product.sku}
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          Out of Stock
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Low Stock */}
          {lowStockProducts.length > 0 && (
            <div>
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                Low Stock ({lowStockProducts.length})
              </h4>
              <div className="space-y-2">
                {lowStockProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/dashboard/inventory/${product.id}`}
                    className="block"
                  >
                    <div className="bg-white p-3 rounded border border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 font-mono mt-1">
                            {product.sku}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-yellow-700">
                            {product.inventory?.quantity_on_hand}
                          </p>
                          <p className="text-xs text-gray-500">
                            Threshold: {product.inventory?.low_stock_threshold}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
