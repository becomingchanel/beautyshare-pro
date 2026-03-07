'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface WholesaleInputs {
  retail_price: number;
  cost_of_goods: number;
  target_wholesale_margin: number;
  minimum_order_qty: number;
  shipping_per_unit: number;
}

interface WholesaleResults {
  suggested_wholesale_price: number;
  wholesale_margin_percent: number;
  retailer_markup: number;
  profit_per_wholesale_unit: number;
  min_order_revenue: number;
  annual_projection: number;
}

export default function WholesaleCalculator() {
  const [inputs, setInputs] = useState<WholesaleInputs>({
    retail_price: 95.0,
    cost_of_goods: 30.0,
    target_wholesale_margin: 50,
    minimum_order_qty: 12,
    shipping_per_unit: 2.0,
  });

  const [results, setResults] = useState<WholesaleResults>({
    suggested_wholesale_price: 0,
    wholesale_margin_percent: 0,
    retailer_markup: 0,
    profit_per_wholesale_unit: 0,
    min_order_revenue: 0,
    annual_projection: 0,
  });

  useEffect(() => {
    const calculateWholesale = () => {
      const {
        retail_price,
        cost_of_goods,
        target_wholesale_margin,
        minimum_order_qty,
        shipping_per_unit,
      } = inputs;

      // Suggested wholesale price: cost + (cost * target_margin / 100)
      // Standard wholesale is 40-50% of retail
      const suggested_wholesale_price =
        cost_of_goods * (1 + target_wholesale_margin / 100);

      // Wholesale margin percentage
      const wholesale_margin_percent = target_wholesale_margin;

      // Retailer markup (what they mark up from wholesale to retail)
      const retailer_markup =
        ((retail_price - suggested_wholesale_price) / suggested_wholesale_price) *
        100;

      // Profit per wholesale unit (wholesale price - cost - shipping)
      const profit_per_wholesale_unit =
        suggested_wholesale_price - cost_of_goods - shipping_per_unit;

      // Minimum order revenue
      const min_order_revenue = suggested_wholesale_price * minimum_order_qty;

      // Annual projection (assuming 4 orders per month of minimum quantity)
      const orders_per_year = 12; // conservative estimate
      const annual_projection =
        profit_per_wholesale_unit * minimum_order_qty * orders_per_year;

      setResults({
        suggested_wholesale_price: Math.round(suggested_wholesale_price * 100) / 100,
        wholesale_margin_percent: Math.round(wholesale_margin_percent),
        retailer_markup: Math.round(retailer_markup * 100) / 100,
        profit_per_wholesale_unit: Math.round(profit_per_wholesale_unit * 100) / 100,
        min_order_revenue: Math.round(min_order_revenue * 100) / 100,
        annual_projection: Math.round(annual_projection * 100) / 100,
      });
    };

    calculateWholesale();
  }, [inputs]);

  useEffect(() => {
    const handleLoadCalculation = (event: any) => {
      if (event.detail?.calculatorType === 'wholesale' && event.detail?.data) {
        setInputs(event.detail.data);
      }
    };

    window.addEventListener('loadCalculation', handleLoadCalculation);
    return () =>
      window.removeEventListener('loadCalculation', handleLoadCalculation);
  }, []);

  const handleInputChange = (field: keyof WholesaleInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CalculatorLayout
      title="Wholesale Pricing Calculator"
      description="Set competitive wholesale prices for your B2B retail partners"
      calculatorType="wholesale"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Product Pricing
          </h3>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Retail Price"
                value={inputs.retail_price}
                onChange={(e) =>
                  handleInputChange('retail_price', parseFloat(e.target.value) || 0)
                }
                placeholder="95.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Your direct-to-consumer price</p>
          </div>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Cost of Goods"
                value={inputs.cost_of_goods}
                onChange={(e) =>
                  handleInputChange('cost_of_goods', parseFloat(e.target.value) || 0)
                }
                placeholder="30.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Manufacturing/acquisition cost</p>
          </div>
          <div>
            <Input
              label="Target Wholesale Margin (%)"
              value={inputs.target_wholesale_margin}
              onChange={(e) =>
                handleInputChange('target_wholesale_margin', parseFloat(e.target.value) || 0)
              }
              placeholder="50"
            />
            <p className="mt-1 text-xs text-gray-500">Markup on cost (typically 40-60%)</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Order Parameters
          </h3>
          <div>
            <Input
              label="Minimum Order Quantity"
              value={inputs.minimum_order_qty}
              onChange={(e) =>
                handleInputChange('minimum_order_qty', parseFloat(e.target.value) || 0)
              }
              placeholder="12"
            />
            <p className="mt-1 text-xs text-gray-500">Units per minimum order</p>
          </div>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Shipping Cost Per Unit"
                value={inputs.shipping_per_unit}
                onChange={(e) =>
                  handleInputChange('shipping_per_unit', parseFloat(e.target.value) || 0)
                }
                placeholder="2.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Your shipping cost per unit</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="Suggested Wholesale Price"
          value={`$${results.suggested_wholesale_price.toFixed(2)}`}
          subtext="Price to offer retailers"
        />
        <MetricCard
          label="Wholesale Margin"
          value={`${results.wholesale_margin_percent}%`}
          subtext="Markup on your cost"
        />
        <MetricCard
          label="Retailer Markup Potential"
          value={`${results.retailer_markup.toFixed(2)}%`}
          subtext="What retailers can mark up"
        />
        <MetricCard
          label="Profit Per Unit"
          value={`$${results.profit_per_wholesale_unit.toFixed(2)}`}
          subtext="After all costs"
        />
        <MetricCard
          label="Min Order Revenue"
          value={`$${results.min_order_revenue.toFixed(2)}`}
          subtext="Revenue per minimum order"
        />
        <MetricCard
          label="Annual Projection"
          value={`$${results.annual_projection.toFixed(2)}`}
          subtext="At 1 order/month minimum"
        />
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Wholesale vs Retail Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-600 mb-2">Retail Channel</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Price:</span>
                <span className="font-semibold text-gray-800">
                  ${inputs.retail_price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Your Profit:</span>
                <span className="font-semibold text-pink-600">
                  ${(inputs.retail_price - inputs.cost_of_goods).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600 mb-2">Wholesale Channel</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Price:</span>
                <span className="font-semibold text-gray-800">
                  ${results.suggested_wholesale_price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Your Profit:</span>
                <span className="font-semibold text-blue-600">
                  ${results.profit_per_wholesale_unit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
            <p className="text-sm text-gray-600 mb-3">
              <strong>Pricing Strategy:</strong> Wholesale price of{' '}
              <strong>${results.suggested_wholesale_price.toFixed(2)}</strong> gives
              retailers a <strong>{results.retailer_markup.toFixed(0)}%</strong> markup
              opportunity to reach your $
              {inputs.retail_price.toFixed(2)} price point. This is
              competitive and attractive to retailers.
            </p>
          </div>
        </div>
      </Card>
    </CalculatorLayout>
  );
}
