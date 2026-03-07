'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProfitInputs {
  wholesale_cost: number;
  retail_price: number;
  monthly_orders: number;
  shipping_cost: number;
  ad_spend_monthly: number;
}

interface ProfitResults {
  gross_margin_per_unit: number;
  gross_margin_pct: number;
  monthly_revenue: number;
  monthly_cogs: number;
  monthly_profit: number;
  roi: number;
  margin_health: 'healthy' | 'warning' | 'critical';
}

export default function ProfitCalculatorPage() {
  const [inputs, setInputs] = useState<ProfitInputs>({
    wholesale_cost: 80,
    retail_price: 180,
    monthly_orders: 20,
    shipping_cost: 8,
    ad_spend_monthly: 200,
  });

  const [results, setResults] = useState<ProfitResults>({
    gross_margin_per_unit: 0,
    gross_margin_pct: 0,
    monthly_revenue: 0,
    monthly_cogs: 0,
    monthly_profit: 0,
    roi: 0,
    margin_health: 'healthy',
  });

  // Calculate results in real-time
  useEffect(() => {
    const grossMarginPerUnit = inputs.retail_price - inputs.wholesale_cost - inputs.shipping_cost;
    const grossMarginPct = (grossMarginPerUnit / inputs.retail_price) * 100;
    const monthlyRevenue = inputs.retail_price * inputs.monthly_orders;
    const monthlyCogs = (inputs.wholesale_cost + inputs.shipping_cost) * inputs.monthly_orders;
    const monthlyProfit = monthlyRevenue - monthlyCogs - inputs.ad_spend_monthly - 149; // 149 = subscription
    const roi = inputs.ad_spend_monthly + 149 > 0 
      ? (monthlyProfit / (inputs.ad_spend_monthly + 149)) * 100
      : 0;

    let marginHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (grossMarginPct < 30) {
      marginHealth = 'critical';
    } else if (grossMarginPct < 50) {
      marginHealth = 'warning';
    }

    setResults({
      gross_margin_per_unit: Math.round(grossMarginPerUnit * 100) / 100,
      gross_margin_pct: Math.round(grossMarginPct * 100) / 100,
      monthly_revenue: monthlyRevenue,
      monthly_cogs: monthlyCogs,
      monthly_profit: Math.round(monthlyProfit),
      roi: Math.round(roi),
      margin_health: marginHealth,
    });
  }, [inputs]);

  // Load saved calculation
  useEffect(() => {
    const handleLoadCalculation = (event: any) => {
      setInputs(event.detail.inputs);
    };

    window.addEventListener('loadCalculation', handleLoadCalculation);
    return () => {
      window.removeEventListener('loadCalculation', handleLoadCalculation);
    };
  }, []);

  const handleInputChange = (field: keyof ProfitInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getMarginColor = () => {
    switch (results.margin_health) {
      case 'healthy':
        return 'from-green-500 to-emerald-500';
      case 'warning':
        return 'from-yellow-500 to-amber-500';
      case 'critical':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getMarginBg = () => {
    switch (results.margin_health) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <CalculatorLayout
      title="Profit Calculator"
      description="Analyze your profit margins, revenue, and return on investment"
      calculatorType="profit"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product & Sales Inputs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wholesale Cost per Unit
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.wholesale_cost}
                  onChange={(e) =>
                    handleInputChange('wholesale_cost', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retail Price per Unit
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.retail_price}
                  onChange={(e) =>
                    handleInputChange('retail_price', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Cost per Unit
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.shipping_cost}
                  onChange={(e) =>
                    handleInputChange('shipping_cost', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Orders
              </label>
              <Input
                type="number"
                value={inputs.monthly_orders}
                onChange={(e) =>
                  handleInputChange('monthly_orders', Number(e.target.value))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Ad Spend
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.ad_spend_monthly}
                  onChange={(e) =>
                    handleInputChange('ad_spend_monthly', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profitability Analysis</h2>

          {/* Margin Health Indicator */}
          <Card className={`border p-6 mb-8 ${getMarginBg()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium mb-2">Margin Health</p>
                <p className="text-lg font-semibold text-gray-900">
                  {results.margin_health === 'healthy'
                    ? 'Excellent'
                    : results.margin_health === 'warning'
                    ? 'Fair'
                    : 'Poor'}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${getMarginColor()} rounded-lg p-4`}>
                {results.margin_health === 'healthy' ? (
                  <TrendingUp className="w-8 h-8 text-white" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-white" />
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {results.margin_health === 'healthy'
                ? 'Your margins are strong. You have room for growth and marketing investment.'
                : results.margin_health === 'warning'
                ? 'Your margins are adequate but have limited room for error. Consider optimizing costs.'
                : 'Your margins are tight. Review your costs or increase pricing.'}
            </p>
          </Card>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <MetricCard
              label="Gross Margin per Unit"
              value={`$${results.gross_margin_per_unit.toFixed(2)}`}
              subtext={`${results.gross_margin_pct.toFixed(1)}% of retail price`}
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            />
            <MetricCard
              label="Monthly Revenue"
              value={`$${results.monthly_revenue.toLocaleString()}`}
              subtext={`${inputs.monthly_orders} orders × $${inputs.retail_price}`}
              bgColor="bg-green-50"
              borderColor="border-green-200"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <MetricCard
              label="Monthly COGS"
              value={`$${results.monthly_cogs.toLocaleString()}`}
              subtext="Wholesale + Shipping costs"
              bgColor="bg-pink-50"
              borderColor="border-pink-200"
            />
            <MetricCard
              label="Monthly Profit"
              value={`$${results.monthly_profit.toLocaleString()}`}
              subtext="After all costs including subscription"
              bgColor={results.monthly_profit > 0 ? 'bg-emerald-50' : 'bg-red-50'}
              borderColor={results.monthly_profit > 0 ? 'border-emerald-200' : 'border-red-200'}
            />
          </div>

          <MetricCard
            label="Return on Ad Spend (ROI)"
            value={`${results.roi.toLocaleString()}%`}
            subtext="Profit relative to marketing + subscription"
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
          />

          {/* Detailed Breakdown */}
          <Card className="mt-8 p-6 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">Financial Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Monthly Revenue</span>
                <span className="font-semibold text-green-600">+${results.monthly_revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">COGS (Wholesale + Shipping)</span>
                <span className="font-semibold text-red-600">-${results.monthly_cogs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Ad Spend</span>
                <span className="font-semibold text-red-600">-${inputs.ad_spend_monthly}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subscription Fee</span>
                <span className="font-semibold text-red-600">-$149</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-gray-900 font-semibold">Net Profit</span>
                <span className={`text-lg font-bold ${results.monthly_profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.monthly_profit > 0 ? '+' : ''}${results.monthly_profit}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
}
