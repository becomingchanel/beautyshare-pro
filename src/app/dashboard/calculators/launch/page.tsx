'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface LaunchInputs {
  initial_inventory_budget: number;
  website_fee: number;
  custom_packaging: number;
  marketing_budget: number;
  monthly_subscription: number;
  setup_fee: number;
}

interface LaunchResults {
  total_startup_cost: number;
  monthly_costs: number;
  break_even_orders: number;
  break_even_months: number;
}

export default function LaunchCostCalculatorPage() {
  const [inputs, setInputs] = useState<LaunchInputs>({
    initial_inventory_budget: 2000,
    website_fee: 699,
    custom_packaging: 199,
    marketing_budget: 500,
    monthly_subscription: 149,
    setup_fee: 99,
  });

  const [results, setResults] = useState<LaunchResults>({
    total_startup_cost: 0,
    monthly_costs: 0,
    break_even_orders: 0,
    break_even_months: 0,
  });

  // Calculate results in real-time
  useEffect(() => {
    const oneTimeCosts = 
      inputs.initial_inventory_budget +
      inputs.website_fee +
      inputs.custom_packaging +
      inputs.setup_fee;

    const monthlyCosts = inputs.monthly_subscription + (inputs.marketing_budget / 12);

    const avgProfitPerOrder = 30;
    const breakEvenOrders = Math.ceil(oneTimeCosts / avgProfitPerOrder);

    const monthlyRevenueEstimate = breakEvenOrders * avgProfitPerOrder;
    const breakEvenMonths = monthlyRevenueEstimate > monthlyCosts 
      ? Math.ceil(oneTimeCosts / (monthlyRevenueEstimate - monthlyCosts))
      : 0;

    setResults({
      total_startup_cost: oneTimeCosts,
      monthly_costs: Math.round(monthlyCosts),
      break_even_orders: breakEvenOrders,
      break_even_months: breakEvenMonths,
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

  const handleInputChange = (field: keyof LaunchInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CalculatorLayout
      title="Launch Cost Calculator"
      description="Calculate your total startup costs and break-even point for launching your beauty business"
      calculatorType="launch"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Startup Costs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Inventory Budget
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.initial_inventory_budget}
                  onChange={(e) =>
                    handleInputChange('initial_inventory_budget', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Wholesale costs for initial stock</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website & Setup Fee
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.website_fee}
                  onChange={(e) =>
                    handleInputChange('website_fee', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">One-time setup cost</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Packaging Design
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.custom_packaging}
                  onChange={(e) =>
                    handleInputChange('custom_packaging', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Branding and design</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Marketing Budget
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.marketing_budget}
                  onChange={(e) =>
                    handleInputChange('marketing_budget', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">First year promotional spend</p>
            </div>
          </div>
        </div>

        {/* Fixed Costs Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">BeautyShare Pro Costs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Subscription
              </label>
              <p className="text-3xl font-bold text-pink-600">${inputs.monthly_subscription}</p>
              <p className="text-xs text-gray-600 mt-2">Fixed monthly cost</p>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setup Fee
              </label>
              <p className="text-3xl font-bold text-pink-600">${inputs.setup_fee}</p>
              <p className="text-xs text-gray-600 mt-2">One-time setup charge</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Projections</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <MetricCard
              label="Total Startup Cost"
              value={`$${results.total_startup_cost.toLocaleString()}`}
              subtext="One-time investment required"
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            />
            <MetricCard
              label="Monthly Operating Costs"
              value={`$${results.monthly_costs.toLocaleString()}`}
              subtext="Subscription + marketing (annualized)"
              bgColor="bg-green-50"
              borderColor="border-green-200"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 p-6">
              <p className="text-gray-700 font-medium mb-2">Orders to Break Even</p>
              <p className="text-4xl font-bold text-pink-600">{results.break_even_orders}</p>
              <p className="text-sm text-gray-600 mt-3">
                Assuming $30 average profit per order
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 p-6">
              <p className="text-gray-700 font-medium mb-2">Months to Break Even</p>
              <p className="text-4xl font-bold text-pink-600">
                {results.break_even_months === 0 ? '< 1' : results.break_even_months}
              </p>
              <p className="text-sm text-gray-600 mt-3">
                Estimated time to recover startup costs
              </p>
            </Card>
          </div>

          {/* Breakdown */}
          <Card className="mt-8 p-6 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Inventory</span>
                <span className="font-semibold">${inputs.initial_inventory_budget}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Website & Setup</span>
                <span className="font-semibold">${inputs.website_fee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Custom Packaging</span>
                <span className="font-semibold">${inputs.custom_packaging}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Marketing Budget</span>
                <span className="font-semibold">${inputs.marketing_budget}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Setup Fee</span>
                <span className="font-semibold">${inputs.setup_fee}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-lg font-bold text-pink-600">
                  ${results.total_startup_cost}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
}
