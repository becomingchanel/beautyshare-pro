'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface DiscountInputs {
  original_price: number;
  discount_percent: number;
  wholesale_cost: number;
  monthly_ad_spend: number;
  conversion_rate: number;
  avg_order_value: number;
}

interface DiscountResults {
  discounted_price: number;
  profit_per_sale: number;
  break_even_sales: number;
  monthly_revenue_needed: number;
  roas: number;
  profit_after_ads: number;
}

export default function DiscountCalculator() {
  const [inputs, setInputs] = useState<DiscountInputs>({
    original_price: 85.0,
    discount_percent: 20,
    wholesale_cost: 35.0,
    monthly_ad_spend: 500,
    conversion_rate: 2.5,
    avg_order_value: 85.0,
  });

  const [results, setResults] = useState<DiscountResults>({
    discounted_price: 0,
    profit_per_sale: 0,
    break_even_sales: 0,
    monthly_revenue_needed: 0,
    roas: 0,
    profit_after_ads: 0,
  });

  useEffect(() => {
    const calculateDiscount = () => {
      const {
        original_price,
        discount_percent,
        wholesale_cost,
        monthly_ad_spend,
        conversion_rate,
        avg_order_value,
      } = inputs;

      // Discounted price
      const discounted_price =
        original_price * (1 - discount_percent / 100);

      // Profit per sale (discounted price - cost)
      const profit_per_sale = discounted_price - wholesale_cost;

      // Break even sales = ad spend / profit per sale
      const break_even_sales =
        profit_per_sale > 0
          ? Math.ceil(monthly_ad_spend / profit_per_sale)
          : 0;

      // Monthly revenue needed to break even
      const monthly_revenue_needed =
        break_even_sales * discounted_price;

      // ROAS calculation
      // Assuming conversion_rate is percentage of ad clicks that convert
      // Estimate: if we spend $500 and get X% conversion, how much revenue?
      // ROAS = Revenue Generated / Ad Spend
      const estimated_visitors = (monthly_ad_spend / 1.5) * 100; // rough estimate: $1.50 per click
      const estimated_sales = (estimated_visitors * conversion_rate) / 100;
      const estimated_revenue = estimated_sales * avg_order_value;
      const roas =
        monthly_ad_spend > 0
          ? (estimated_revenue / monthly_ad_spend) * 100
          : 0;

      // Profit after ads
      const profit_after_ads =
        estimated_sales * profit_per_sale - monthly_ad_spend;

      setResults({
        discounted_price: Math.round(discounted_price * 100) / 100,
        profit_per_sale: Math.round(profit_per_sale * 100) / 100,
        break_even_sales,
        monthly_revenue_needed: Math.round(monthly_revenue_needed * 100) / 100,
        roas: Math.round(roas * 100) / 100,
        profit_after_ads: Math.round(profit_after_ads * 100) / 100,
      });
    };

    calculateDiscount();
  }, [inputs]);

  useEffect(() => {
    const handleLoadCalculation = (event: any) => {
      if (event.detail?.calculatorType === 'discount' && event.detail?.data) {
        setInputs(event.detail.data);
      }
    };

    window.addEventListener('loadCalculation', handleLoadCalculation);
    return () =>
      window.removeEventListener('loadCalculation', handleLoadCalculation);
  }, []);

  const handleInputChange = (field: keyof DiscountInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CalculatorLayout
      title="Discount & Ads ROI Calculator"
      description="Calculate if discounts and advertising spend are profitable for your business"
      calculatorType="discount"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Pricing & Cost
          </h3>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Original Price"
                value={inputs.original_price}
                onChange={(e) =>
                  handleInputChange('original_price', parseFloat(e.target.value) || 0)
                }
                placeholder="85.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Regular selling price</p>
          </div>
          <div>
            <Input
              label="Discount (%)"
              value={inputs.discount_percent}
              onChange={(e) =>
                handleInputChange('discount_percent', parseFloat(e.target.value) || 0)
              }
              placeholder="20"
            />
            <p className="mt-1 text-xs text-gray-500">Percentage off original price</p>
          </div>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Wholesale Cost"
                value={inputs.wholesale_cost}
                onChange={(e) =>
                  handleInputChange('wholesale_cost', parseFloat(e.target.value) || 0)
                }
                placeholder="35.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Cost to produce/buy</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Ad Campaign Metrics
          </h3>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Monthly Ad Spend"
                value={inputs.monthly_ad_spend}
                onChange={(e) =>
                  handleInputChange('monthly_ad_spend', parseFloat(e.target.value) || 0)
                }
                placeholder="500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Total monthly budget</p>
          </div>
          <div>
            <Input
              label="Conversion Rate (%)"
              value={inputs.conversion_rate}
              onChange={(e) =>
                handleInputChange('conversion_rate', parseFloat(e.target.value) || 0)
              }
              placeholder="2.5"
            />
            <p className="mt-1 text-xs text-gray-500">% of visitors who purchase</p>
          </div>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Average Order Value"
                value={inputs.avg_order_value}
                onChange={(e) =>
                  handleInputChange('avg_order_value', parseFloat(e.target.value) || 0)
                }
                placeholder="85.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Typical order size</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="Discounted Price"
          value={`$${results.discounted_price.toFixed(2)}`}
          subtext="Price after discount"
        />
        <MetricCard
          label="Profit Per Sale"
          value={`$${results.profit_per_sale.toFixed(2)}`}
          subtext="After discount & costs"
        />
        <MetricCard
          label="Break Even Sales"
          value={`${results.break_even_sales} units`}
          subtext="To cover ad spend"
        />
        <MetricCard
          label="ROAS"
          value={`${results.roas.toFixed(2)}%`}
          subtext="Return on ad spend"
        />
        <MetricCard
          label="Monthly Profit (After Ads)"
          value={`$${results.profit_after_ads.toFixed(2)}`}
          subtext="Net profit with ads"
        />
        <MetricCard
          label="Monthly Revenue Needed"
          value={`$${results.monthly_revenue_needed.toFixed(2)}`}
          subtext="To break even"
        />
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Campaign Profitability Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Monthly Ad Spend</p>
            <p className="text-2xl font-bold text-gray-800">
              ${inputs.monthly_ad_spend.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Profit Per Sale</p>
            <p className="text-2xl font-bold text-gray-800">
              ${results.profit_per_sale.toFixed(2)}
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-600">Sales Needed to Break Even</p>
            <p className="text-2xl font-bold text-pink-700">
              {results.break_even_sales} units
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600">
              {results.roas >= 100 ? 'Profitable' : 'Not Yet Profitable'}
            </p>
            <p className="text-2xl font-bold text-green-700">
              ROAS {results.roas.toFixed(2)}%
            </p>
          </div>
        </div>
      </Card>
    </CalculatorLayout>
  );
}
