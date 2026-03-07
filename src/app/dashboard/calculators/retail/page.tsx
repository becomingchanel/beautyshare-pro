'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface RetailInputs {
  wholesale_cost: number;
  target_margin: number;
  competitor_low: number;
  competitor_high: number;
}

interface RetailResults {
  suggested_retail: number;
  markup_pct: number;
  profit_per_unit: number;
  position: 'below' | 'within' | 'above';
  position_pct: number;
}

export default function RetailPriceCalculatorPage() {
  const [inputs, setInputs] = useState<RetailInputs>({
    wholesale_cost: 80,
    target_margin: 55,
    competitor_low: 150,
    competitor_high: 250,
  });

  const [results, setResults] = useState<RetailResults>({
    suggested_retail: 0,
    markup_pct: 0,
    profit_per_unit: 0,
    position: 'within',
    position_pct: 0,
  });

  // Calculate results in real-time
  useEffect(() => {
    const suggestedRetail = inputs.wholesale_cost / (1 - inputs.target_margin / 100);
    const markupPct = ((suggestedRetail - inputs.wholesale_cost) / inputs.wholesale_cost) * 100;
    const profitPerUnit = suggestedRetail - inputs.wholesale_cost;

    let position: 'below' | 'within' | 'above' = 'within';
    if (suggestedRetail < inputs.competitor_low) {
      position = 'below';
    } else if (suggestedRetail > inputs.competitor_high) {
      position = 'above';
    }

    const competitorRange = inputs.competitor_high - inputs.competitor_low;
    const positionInRange = suggestedRetail - inputs.competitor_low;
    const positionPct = competitorRange > 0 ? (positionInRange / competitorRange) * 100 : 50;

    setResults({
      suggested_retail: Math.round(suggestedRetail * 100) / 100,
      markup_pct: Math.round(markupPct * 100) / 100,
      profit_per_unit: Math.round(profitPerUnit * 100) / 100,
      position,
      position_pct: Math.max(0, Math.min(100, positionPct)),
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

  const handleInputChange = (field: keyof RetailInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getPositionColor = () => {
    switch (results.position) {
      case 'below':
        return 'text-green-600';
      case 'within':
        return 'text-blue-600';
      case 'above':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPositionBg = () => {
    switch (results.position) {
      case 'below':
        return 'bg-green-50 border-green-200';
      case 'within':
        return 'bg-blue-50 border-blue-200';
      case 'above':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <CalculatorLayout
      title="Retail Price Calculator"
      description="Determine optimal retail pricing based on your wholesale cost, target margins, and competitor analysis"
      calculatorType="retail"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Inputs</h2>
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
                Target Profit Margin (%)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={inputs.target_margin}
                  onChange={(e) =>
                    handleInputChange('target_margin', Number(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-gray-600">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Typical beauty products: 50-60%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Competitor Low Price
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.competitor_low}
                  onChange={(e) =>
                    handleInputChange('competitor_low', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Competitor High Price
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <Input
                  type="number"
                  value={inputs.competitor_high}
                  onChange={(e) =>
                    handleInputChange('competitor_high', Number(e.target.value))
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Recommendation</h2>

          {/* Main Suggestion Card */}
          <Card className="bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-200 p-8 mb-8">
            <p className="text-gray-700 font-medium mb-2">Suggested Retail Price</p>
            <p className="text-5xl font-bold text-pink-600 mb-4">
              ${results.suggested_retail.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Based on ${inputs.wholesale_cost} wholesale cost and {inputs.target_margin}% target margin
            </p>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <MetricCard
              label="Profit per Unit"
              value={`$${results.profit_per_unit.toFixed(2)}`}
              subtext={`${inputs.target_margin}% margin`}
              bgColor="bg-green-50"
              borderColor="border-green-200"
            />
            <MetricCard
              label="Markup from Wholesale"
              value={`${results.markup_pct.toLocaleString()}%`}
              subtext={`${results.markup_pct.toFixed(1)}x markup`}
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            />
          </div>

          {/* Competitor Positioning */}
          <Card className={`border p-6 mb-8 ${getPositionBg()}`}>
            <h3 className="font-semibold text-gray-900 mb-4">Market Position</h3>
            <p className={`text-lg font-semibold ${getPositionColor()} mb-4`}>
              {results.position === 'below'
                ? '✓ Below Competitor Range - Good for market penetration'
                : results.position === 'within'
                ? '✓ Within Competitor Range - Competitive pricing'
                : '⚠ Above Competitor Range - Premium positioning'}
            </p>

            {/* Pricing Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Low: ${inputs.competitor_low}</span>
                <span>Your Price: ${results.suggested_retail.toFixed(2)}</span>
                <span>High: ${inputs.competitor_high}</span>
              </div>
              <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 transition-all"
                  style={{ width: `${results.position_pct}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-700">
              {results.position === 'below'
                ? `Your price is $${(inputs.competitor_low - results.suggested_retail).toFixed(2)} below the market low. This positions you as the budget-friendly option.`
                : results.position === 'within'
                ? `Your price is ${((results.suggested_retail - inputs.competitor_low) / (inputs.competitor_high - inputs.competitor_low) * 100).toFixed(0)}% through the competitor range. This is a competitive position.`
                : `Your price is $${(results.suggested_retail - inputs.competitor_high).toFixed(2)} above the market high. This works if you can justify premium positioning.`}
            </p>
          </Card>

          {/* Detailed Analysis */}
          <Card className="p-6 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">Pricing Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Wholesale Cost</span>
                <span className="font-semibold">${inputs.wholesale_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Profit per Unit</span>
                <span className="font-semibold text-green-600">+${results.profit_per_unit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-900 font-semibold">Retail Price</span>
                <span className="text-lg font-bold text-pink-600">${results.suggested_retail.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Margin Info */}
          <Card className="mt-8 p-6 border-l-4 border-pink-500 bg-pink-50">
            <h4 className="font-semibold text-gray-900 mb-2">About Profit Margins</h4>
            <p className="text-gray-700 text-sm mb-3">
              Your profit margin is the percentage of each sale that&apos;s profit after covering wholesale costs.
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                <span><strong>50-55%:</strong> Standard for beauty products</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                <span><strong>55-65%:</strong> Healthy margin with room for marketing</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                <span><strong>65%+:</strong> Premium positioning, must justify with quality/brand</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
}
