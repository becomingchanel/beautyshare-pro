'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDollars, formatPercent } from '@/lib/utils';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProfitInputs {
  retailPrice: number;
  wholesalePrice: number;
  shippingCost: number;
  shippingCharged: number;
  platformFee: number;
  paymentProcessingPct: number;
  packagingCost: number;
  ordersPerMonth: number;
}

const defaults: ProfitInputs = {
  retailPrice: 250,
  wholesalePrice: 95,
  shippingCost: 8,
  shippingCharged: 10,
  platformFee: 0,
  paymentProcessingPct: 2.9,
  packagingCost: 3,
  ordersPerMonth: 15,
};

export default function ProfitCalculatorPage() {
  const [inputs, setInputs] = useState<ProfitInputs>(defaults);

  const updateInput = (key: keyof ProfitInputs, value: string) => {
    const num = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const paymentFee = inputs.retailPrice * (inputs.paymentProcessingPct / 100);
    const totalCosts = inputs.wholesalePrice + inputs.shippingCost + paymentFee + inputs.packagingCost + inputs.platformFee;
    const shippingProfit = inputs.shippingCharged - inputs.shippingCost;
    const profitPerOrder = inputs.retailPrice + inputs.shippingCharged - totalCosts - inputs.shippingCharged + shippingProfit;
    const actualProfit = inputs.retailPrice - totalCosts + shippingProfit;
    const margin = inputs.retailPrice > 0 ? (actualProfit / inputs.retailPrice) * 100 : 0;
    const monthlyProfit = actualProfit * inputs.ordersPerMonth;
    const monthlyRevenue = inputs.retailPrice * inputs.ordersPerMonth;
    const annualProfit = monthlyProfit * 12;

    return {
      paymentFee,
      totalCosts,
      shippingProfit,
      profitPerOrder: actualProfit,
      margin,
      monthlyProfit,
      monthlyRevenue,
      annualProfit,
    };
  }, [inputs]);

  const marginHealth = results.margin >= 50 ? 'excellent' : results.margin >= 35 ? 'good' : results.margin >= 20 ? 'ok' : 'low';

  return (
    <DashboardLayout
      userName="Member"
      tierLabel="Launch"
      pageTitle="Profit Calculator"
      pageDescription="See your real profit per order after all costs"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <CardTitle>Order Details</CardTitle>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Your Retail Price"
                prefix="$"
                type="number"
                value={inputs.retailPrice}
                onChange={(e) => updateInput('retailPrice', e.target.value)}
                hint="What your customer pays"
              />
              <Input
                label="Wholesale Price (Our Cost)"
                prefix="$"
                type="number"
                value={inputs.wholesalePrice}
                onChange={(e) => updateInput('wholesalePrice', e.target.value)}
                hint="BeautyShare Pro wholesale"
              />
              <Input
                label="Shipping Cost (Actual)"
                prefix="$"
                type="number"
                value={inputs.shippingCost}
                onChange={(e) => updateInput('shippingCost', e.target.value)}
                hint="What shipping actually costs"
              />
              <Input
                label="Shipping Charged to Customer"
                prefix="$"
                type="number"
                value={inputs.shippingCharged}
                onChange={(e) => updateInput('shippingCharged', e.target.value)}
                hint="What you charge for shipping"
              />
              <Input
                label="Payment Processing (%)"
                suffix="%"
                type="number"
                step={0.1}
                value={inputs.paymentProcessingPct}
                onChange={(e) => updateInput('paymentProcessingPct', e.target.value)}
                hint="Shopify Payments / Stripe"
              />
              <Input
                label="Packaging Cost Per Order"
                prefix="$"
                type="number"
                value={inputs.packagingCost}
                onChange={(e) => updateInput('packagingCost', e.target.value)}
                hint="Boxes, tissue, thank-you cards"
              />
            </div>
          </Card>

          <Card>
            <CardTitle>Monthly Volume</CardTitle>
            <div className="mt-4">
              <Input
                label="Estimated Orders Per Month"
                type="number"
                value={inputs.ordersPerMonth}
                onChange={(e) => updateInput('ordersPerMonth', e.target.value)}
                hint="How many orders you expect monthly"
              />
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Per-order breakdown */}
          <Card>
            <CardTitle>Per-Order Breakdown</CardTitle>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">Retail Price</span>
                <span className="font-medium text-brand-900">{formatDollars(inputs.retailPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">- Wholesale Cost</span>
                <span className="font-medium text-red-600">-{formatDollars(inputs.wholesalePrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">- Payment Processing</span>
                <span className="font-medium text-red-600">-{formatDollars(results.paymentFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">- Packaging</span>
                <span className="font-medium text-red-600">-{formatDollars(inputs.packagingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">+ Shipping Profit</span>
                <span className="font-medium text-green-600">+{formatDollars(results.shippingProfit)}</span>
              </div>
              <div className="border-t border-brand-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-brand-900">Your Profit Per Order</span>
                  <span className="text-xl font-bold text-green-700">
                    {formatDollars(results.profitPerOrder)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Margin Health */}
          <Card className={
            marginHealth === 'excellent' ? 'border-green-200 bg-green-50/30' :
            marginHealth === 'good' ? 'border-green-200' :
            marginHealth === 'ok' ? 'border-amber-200 bg-amber-50/30' :
            'border-red-200 bg-red-50/30'
          }>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Profit Margin</CardTitle>
              <Badge variant={
                marginHealth === 'excellent' || marginHealth === 'good' ? 'success' :
                marginHealth === 'ok' ? 'warning' : 'danger'
              }>
                {marginHealth === 'excellent' ? 'Excellent' :
                 marginHealth === 'good' ? 'Healthy' :
                 marginHealth === 'ok' ? 'Needs Work' : 'Too Low'}
              </Badge>
            </div>
            <p className="text-4xl font-bold text-brand-900">
              {formatPercent(results.margin)}
            </p>
            {results.margin < 35 && (
              <div className="mt-3 flex items-start gap-2 text-sm text-amber-700">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Aim for at least 40-60% margins. Consider raising your retail price
                  or reducing packaging costs.
                </span>
              </div>
            )}
            {results.margin >= 50 && (
              <div className="mt-3 flex items-start gap-2 text-sm text-green-700">
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Strong margin. You have room for promotions and discounts without
                  hurting profitability.
                </span>
              </div>
            )}
          </Card>

          {/* Monthly/Annual Projections */}
          <Card>
            <CardTitle>Revenue Projections</CardTitle>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg bg-cream-200 p-4">
                <p className="text-sm font-medium text-brand-600">Monthly Profit</p>
                <p className="text-2xl font-bold text-brand-900 mt-1">
                  {formatDollars(results.monthlyProfit)}
                </p>
                <p className="text-xs text-brand-400 mt-1">
                  from {formatDollars(results.monthlyRevenue)} in revenue
                </p>
              </div>
              <div className="rounded-lg bg-brand-900 p-4">
                <p className="text-sm font-medium text-brand-300">Annual Profit (Projected)</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatDollars(results.annualProfit)}
                </p>
                <p className="text-xs text-brand-400 mt-1">
                  at {inputs.ordersPerMonth} orders/month
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
