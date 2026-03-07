'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface BeautyShareInputs {
  retail_price: number;
  cost_of_goods: number;
  beautyshare_commission_percent: number;
  shipping_cost: number;
  packaging_cost: number;
  monthly_units_sold: number;
}

interface BeautyShareResults {
  commission_amount: number;
  net_revenue_per_unit: number;
  profit_per_unit: number;
  monthly_profit: number;
  margin_percent: number;
  annual_revenue: number;
}

export default function BeautyShareCalculator() {
  const [inputs, setInputs] = useState<BeautyShareInputs>({
    retail_price: 75.0,
    cost_of_goods: 25.0,
    beautyshare_commission_percent: 15,
    shipping_cost: 3.5,
    packaging_cost: 1.5,
    monthly_units_sold: 50,
  });

  const [results, setResults] = useState<BeautyShareResults>({
    commission_amount: 0,
    net_revenue_per_unit: 0,
    profit_per_unit: 0,
    monthly_profit: 0,
    margin_percent: 0,
    annual_revenue: 0,
  });

  useEffect(() => {
    const calculateBeautyShare = () => {
      const {
        retail_price,
        cost_of_goods,
        beautyshare_commission_percent,
        shipping_cost,
        packaging_cost,
        monthly_units_sold,
      } = inputs;

      // Commission amount
      const commission_amount =
        (retail_price * beautyshare_commission_percent) / 100;

      // Net revenue per unit (after commission)
      const net_revenue_per_unit = retail_price - commission_amount;

      // Profit per unit (net revenue - all costs)
      const profit_per_unit =
        net_revenue_per_unit - cost_of_goods - shipping_cost - packaging_cost;

      // Monthly profit
      const monthly_profit = profit_per_unit * monthly_units_sold;

      // Margin percent
      const margin_percent =
        net_revenue_per_unit > 0
          ? (profit_per_unit / net_revenue_per_unit) * 100
          : 0;

      // Annual revenue (net revenue after commission)
      const annual_revenue = net_revenue_per_unit * monthly_units_sold * 12;

      setResults({
        commission_amount: Math.round(commission_amount * 100) / 100,
        net_revenue_per_unit: Math.round(net_revenue_per_unit * 100) / 100,
        profit_per_unit: Math.round(profit_per_unit * 100) / 100,
        monthly_profit: Math.round(monthly_profit * 100) / 100,
        margin_percent: Math.round(margin_percent * 100) / 100,
        annual_revenue: Math.round(annual_revenue * 100) / 100,
      });
    };

    calculateBeautyShare();
  }, [inputs]);

  useEffect(() => {
    const handleLoadCalculation = (event: any) => {
      if (event.detail?.calculatorType === 'beautyshare' && event.detail?.data) {
        setInputs(event.detail.data);
      }
    };

    window.addEventListener('loadCalculation', handleLoadCalculation);
    return () =>
      window.removeEventListener('loadCalculation', handleLoadCalculation);
  }, []);

  const handleInputChange = (field: keyof BeautyShareInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CalculatorLayout
      title="BeautyShare Pricing Calculator"
      description="Calculate your profit margins when selling through the BeautyShare marketplace"
      calculatorType="beautyshare"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Product Information
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
                placeholder="75.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Price listed on BeautyShare</p>
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
                placeholder="25.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Manufacturing/acquisition cost</p>
          </div>
          <div>
            <Input
              label="BeautyShare Commission (%)"
              value={inputs.beautyshare_commission_percent}
              onChange={(e) =>
                handleInputChange(
                  'beautyshare_commission_percent',
                  parseFloat(e.target.value) || 0
                )
              }
              placeholder="15"
            />
            <p className="mt-1 text-xs text-gray-500">Platform fee (default 15%)</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Additional Costs
          </h3>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Shipping Cost"
                value={inputs.shipping_cost}
                onChange={(e) =>
                  handleInputChange('shipping_cost', parseFloat(e.target.value) || 0)
                }
                placeholder="3.50"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Per unit shipping cost</p>
          </div>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Packaging Cost"
                value={inputs.packaging_cost}
                onChange={(e) =>
                  handleInputChange('packaging_cost', parseFloat(e.target.value) || 0)
                }
                placeholder="1.50"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Per unit packaging</p>
          </div>
          <div>
            <Input
              label="Monthly Units Sold"
              value={inputs.monthly_units_sold}
              onChange={(e) =>
                handleInputChange('monthly_units_sold', parseFloat(e.target.value) || 0)
              }
              placeholder="50"
            />
            <p className="mt-1 text-xs text-gray-500">Projected monthly sales</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="BeautyShare Commission"
          value={`$${results.commission_amount.toFixed(2)}`}
          subtext="Per unit to platform"
        />
        <MetricCard
          label="Net Revenue Per Unit"
          value={`$${results.net_revenue_per_unit.toFixed(2)}`}
          subtext="After commission"
        />
        <MetricCard
          label="Profit Per Unit"
          value={`$${results.profit_per_unit.toFixed(2)}`}
          subtext="After all costs"
        />
        <MetricCard
          label="Monthly Profit"
          value={`$${results.monthly_profit.toFixed(2)}`}
          subtext="At current sales volume"
        />
        <MetricCard
          label="Profit Margin"
          value={`${results.margin_percent.toFixed(2)}%`}
          subtext="% of net revenue"
        />
        <MetricCard
          label="Annual Revenue (Net)"
          value={`$${results.annual_revenue.toFixed(2)}`}
          subtext="After commission"
        />
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          BeautyShare Economics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Price Per Unit</p>
            <p className="text-2xl font-bold text-gray-800">
              ${inputs.retail_price.toFixed(2)}
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-600">Platform Commission</p>
            <p className="text-2xl font-bold text-pink-700">
              ${results.commission_amount.toFixed(2)} ({inputs.beautyshare_commission_percent}%)
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600">Total Cost Per Unit</p>
            <p className="text-2xl font-bold text-blue-700">
              ${(inputs.cost_of_goods + inputs.shipping_cost + inputs.packaging_cost).toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600">Your Net Profit Per Unit</p>
            <p className="text-2xl font-bold text-green-700">
              ${results.profit_per_unit.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Monthly Projection:</strong>
            </p>
            <div className="flex justify-between">
              <span className="text-gray-700">
                {inputs.monthly_units_sold} units × $
                {results.profit_per_unit.toFixed(2)} profit
              </span>
              <span className="font-bold text-gray-800">
                = ${results.monthly_profit.toFixed(2)}/month
              </span>
            </div>
          </div>
        </div>
      </Card>
    </CalculatorLayout>
  );
}
