'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatDollars, formatPercent } from '@/lib/utils';
import { DollarSign, Target, Lightbulb } from 'lucide-react';

interface PriceInputs {
  wholesalePrice: number;
  shippingCost: number;
  packagingCost: number;
  paymentProcessingPct: number;
  targetMarginPct: number;
}

const productPresets = [
  { label: 'Bundle (18")', wholesale: 65 },
  { label: 'Bundle (20")', wholesale: 75 },
  { label: 'Bundle (22")', wholesale: 85 },
  { label: 'Bundle (24")', wholesale: 95 },
  { label: 'Bundle (26")', wholesale: 110 },
  { label: '5x5 Closure', wholesale: 55 },
  { label: '13x4 Frontal', wholesale: 85 },
  { label: '13x6 Frontal', wholesale: 95 },
  { label: 'Custom Wig', wholesale: 195 },
];

const defaults: PriceInputs = {
  wholesalePrice: 95,
  shippingCost: 8,
  packagingCost: 3,
  paymentProcessingPct: 2.9,
  targetMarginPct: 50,
};

export default function RetailPriceCalculatorPage() {
  const [inputs, setInputs] = useState<PriceInputs>(defaults);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const updateInput = (key: keyof PriceInputs, value: string) => {
    const num = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const selectPreset = (preset: typeof productPresets[0]) => {
    setSelectedPreset(preset.label);
    setInputs((prev) => ({ ...prev, wholesalePrice: preset.wholesale }));
  };

  const results = useMemo(() => {
    const baseCost = inputs.wholesalePrice + inputs.shippingCost + inputs.packagingCost;

    // Calculate retail price needed for target margin
    // margin = (retail - totalCost) / retail
    // retail * margin = retail - totalCost
    // totalCost = retail * (1 - margin)
    // retail = totalCost / (1 - margin)
    // But totalCost includes payment processing which depends on retail
    // totalCost = baseCost + (retail * processingPct / 100)
    // retail * (1 - margin/100) = baseCost + retail * processingPct / 100
    // retail * (1 - margin/100 - processingPct/100) = baseCost
    // retail = baseCost / (1 - margin/100 - processingPct/100)

    const marginFraction = inputs.targetMarginPct / 100;
    const processingFraction = inputs.paymentProcessingPct / 100;
    const denominator = 1 - marginFraction - processingFraction;

    const suggestedRetail = denominator > 0 ? baseCost / denominator : 0;
    const roundedRetail = Math.ceil(suggestedRetail / 5) * 5; // Round up to nearest $5

    const processingFee = roundedRetail * processingFraction;
    const totalCost = baseCost + processingFee;
    const actualProfit = roundedRetail - totalCost;
    const actualMargin = roundedRetail > 0 ? (actualProfit / roundedRetail) * 100 : 0;

    // Pricing tiers for comparison
    const competitivePrice = Math.ceil((baseCost / (1 - 0.35 - processingFraction)) / 5) * 5;
    const premiumPrice = Math.ceil((baseCost / (1 - 0.55 - processingFraction)) / 5) * 5;
    const luxuryPrice = Math.ceil((baseCost / (1 - 0.65 - processingFraction)) / 5) * 5;

    return {
      suggestedRetail,
      roundedRetail,
      processingFee,
      totalCost,
      actualProfit,
      actualMargin,
      competitivePrice,
      premiumPrice,
      luxuryPrice,
      baseCost,
    };
  }, [inputs]);

  return (
    <DashboardLayout
      userName="Member"
      tierLabel="Launch"
      pageTitle="Retail Price Calculator"
      pageDescription="Find the optimal retail price based on your target margins"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-6">
          {/* Product Presets */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-brand-600" />
              <CardTitle>Quick Select Product</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              {productPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => selectPreset(preset)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    selectedPreset === preset.label
                      ? 'bg-brand-600 text-white'
                      : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  {preset.label} — ${preset.wholesale}
                </button>
              ))}
            </div>
          </Card>

          {/* Cost Inputs */}
          <Card>
            <CardTitle>Your Costs</CardTitle>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="Wholesale Price"
                prefix="$"
                type="number"
                value={inputs.wholesalePrice}
                onChange={(e) => updateInput('wholesalePrice', e.target.value)}
                hint="Our dropship price to you"
              />
              <Input
                label="Shipping Cost"
                prefix="$"
                type="number"
                value={inputs.shippingCost}
                onChange={(e) => updateInput('shippingCost', e.target.value)}
                hint="Per-order shipping cost"
              />
              <Input
                label="Packaging Cost"
                prefix="$"
                type="number"
                value={inputs.packagingCost}
                onChange={(e) => updateInput('packagingCost', e.target.value)}
                hint="Boxes, inserts, thank-you cards"
              />
              <Input
                label="Payment Processing"
                suffix="%"
                type="number"
                step={0.1}
                value={inputs.paymentProcessingPct}
                onChange={(e) => updateInput('paymentProcessingPct', e.target.value)}
                hint="Shopify Payments rate"
              />
            </div>
          </Card>

          {/* Target Margin */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-brand-600" />
              <CardTitle>Target Profit Margin</CardTitle>
            </div>
            <Input
              label="Desired Margin"
              suffix="%"
              type="number"
              min={10}
              max={80}
              value={inputs.targetMarginPct}
              onChange={(e) => updateInput('targetMarginPct', e.target.value)}
              hint="We recommend 40-60% for hair products"
            />
            {/* Visual margin slider */}
            <div className="mt-4">
              <input
                type="range"
                min={10}
                max={80}
                value={inputs.targetMarginPct}
                onChange={(e) => updateInput('targetMarginPct', e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #DC2626 0%, #D97706 30%, #16A34A 50%, #16A34A 65%, #D97706 80%, #DC2626 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-brand-400 mt-1">
                <span>10% (Low)</span>
                <span>40-60% (Sweet spot)</span>
                <span>80% (Luxury)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Suggested Price */}
          <Card className="border-brand-300 bg-brand-50/50">
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Suggested Retail Price</CardTitle>
              <Badge variant="brand">
                {formatPercent(results.actualMargin)} margin
              </Badge>
            </div>
            <p className="text-5xl font-bold text-brand-900">
              {formatDollars(results.roundedRetail)}
            </p>
            <p className="mt-2 text-sm text-brand-600">
              You profit <span className="font-bold text-green-700">{formatDollars(results.actualProfit)}</span> per sale
            </p>
          </Card>

          {/* Cost breakdown */}
          <Card>
            <CardTitle>Cost Breakdown</CardTitle>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">Wholesale Price</span>
                <span className="font-medium">{formatDollars(inputs.wholesalePrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">Shipping</span>
                <span className="font-medium">{formatDollars(inputs.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">Packaging</span>
                <span className="font-medium">{formatDollars(inputs.packagingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-500">Payment Processing</span>
                <span className="font-medium">{formatDollars(results.processingFee)}</span>
              </div>
              <div className="border-t border-brand-200 pt-3 flex justify-between">
                <span className="font-semibold text-brand-900">Total Cost</span>
                <span className="font-bold text-brand-900">{formatDollars(results.totalCost)}</span>
              </div>
            </div>
          </Card>

          {/* Pricing Tiers Comparison */}
          <Card>
            <CardTitle>Pricing Strategies</CardTitle>
            <p className="text-xs text-brand-400 mt-1 mb-4">
              Different pricing positions for this product
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-cream-200 p-3">
                <div>
                  <p className="text-sm font-medium text-brand-800">Competitive</p>
                  <p className="text-xs text-brand-400">~35% margin</p>
                </div>
                <span className="text-lg font-bold text-brand-900">
                  {formatDollars(results.competitivePrice)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 border border-green-200">
                <div>
                  <p className="text-sm font-medium text-green-800">Premium (Recommended)</p>
                  <p className="text-xs text-green-600">~55% margin</p>
                </div>
                <span className="text-lg font-bold text-green-900">
                  {formatDollars(results.premiumPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-cream-200 p-3">
                <div>
                  <p className="text-sm font-medium text-brand-800">Luxury</p>
                  <p className="text-xs text-brand-400">~65% margin</p>
                </div>
                <span className="text-lg font-bold text-brand-900">
                  {formatDollars(results.luxuryPrice)}
                </span>
              </div>
            </div>
          </Card>

          {/* Pro Tip */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <CardTitle>Pricing Pro Tips</CardTitle>
            </div>
            <div className="space-y-2 text-sm text-brand-600">
              <p>
                <span className="font-semibold">Bundle pricing:</span> Sell 3-bundle
                deals at a slight discount per bundle — it increases your AOV while
                customers feel they&apos;re getting a deal.
              </p>
              <p>
                <span className="font-semibold">Psychological pricing:</span> $249 feels
                significantly cheaper than $250. Use prices ending in 5 or 9.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
