'use client';

import { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  Sparkles,
  Info,
} from 'lucide-react';

/* ── Industry Benchmarks ─────────────────────────────────────── */
const benchmarks = [
  { metric: 'CPC (Meta)', average: '$1.20 - $2.50', top10: '$0.60 - $1.00' },
  { metric: 'CTR (Meta Feed)', average: '1.0% - 2.5%', top10: '3.0%+' },
  { metric: 'Conversion Rate', average: '1.5% - 3.5%', top10: '4.0%+' },
  { metric: 'ROAS', average: '2.5x - 5x', top10: '6x - 12x' },
  { metric: 'CPA', average: '$25 - $75', top10: 'Under $20' },
  { metric: 'CPM', average: '$8 - $20', top10: '$5 - $10' },
];

export default function BudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState(1500);
  const [aov, setAov] = useState(251);
  const [profitPerOrder, setProfitPerOrder] = useState(150);
  const [conversionRate, setConversionRate] = useState(2.0);
  const [cpc, setCpc] = useState(1.50);
  const [ctr, setCtr] = useState(1.5);

  /* calculations */
  const totalClicks = Math.round(monthlyBudget / cpc);
  const totalConversions = Math.round(totalClicks * (conversionRate / 100));
  const revenue = totalConversions * aov;
  const profit = totalConversions * profitPerOrder;
  const roas = monthlyBudget > 0 ? (revenue / monthlyBudget).toFixed(1) : '0';
  const profitRoas = monthlyBudget > 0 ? (profit / monthlyBudget).toFixed(1) : '0';
  const cpa = totalConversions > 0 ? (monthlyBudget / totalConversions).toFixed(2) : '—';
  const breakEvenOrders = profitPerOrder > 0 ? Math.ceil(monthlyBudget / profitPerOrder) : 0;

  /* scenario calculations */
  const scenarios = [
    { label: 'Conservative', rate: 1.0 },
    { label: 'Moderate', rate: 2.0 },
    { label: 'Aggressive', rate: 3.5 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-extrabold text-gray-900">Budget &amp; ROAS Calculator</h1>
          <Calculator className="h-5 w-5 text-gold" />
        </div>
        <p className="text-sm text-gray-500">
          Plan your ad spend and forecast returns with hair industry benchmarks.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ═══ INPUT SECTION ═══ */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
            {/* Monthly Budget */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Monthly Ad Budget</label>
                <span className="text-lg font-extrabold text-orange">${monthlyBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full accent-orange"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$100</span>
                <span>$10,000</span>
              </div>
            </div>

            {/* AOV */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Average Order Value</label>
                <span className="text-sm font-bold text-gray-900">${aov}</span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={5}
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full accent-orange"
              />
            </div>

            {/* Profit Per Order */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Avg Profit per Order</label>
                <span className="text-sm font-bold text-gray-900">${profitPerOrder}</span>
              </div>
              <input
                type="range"
                min={20}
                max={300}
                step={5}
                value={profitPerOrder}
                onChange={(e) => setProfitPerOrder(Number(e.target.value))}
                className="w-full accent-orange"
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Expected Conversion Rate</label>
                <span className="text-sm font-bold text-gray-900">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-orange"
              />
            </div>

            {/* CPC */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Expected CPC</label>
                <span className="text-sm font-bold text-gray-900">${cpc.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="w-full accent-orange"
              />
            </div>

            {/* CTR */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Expected CTR</label>
                <span className="text-sm font-bold text-gray-900">{ctr}%</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={ctr}
                onChange={(e) => setCtr(Number(e.target.value))}
                className="w-full accent-orange"
              />
            </div>
          </div>
        </div>

        {/* ═══ OUTPUT SECTION ═══ */}
        <div className="space-y-6">
          {/* Projected Results */}
          <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Projected Monthly Results
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Clicks</span>
                <span className="font-bold text-gray-900 text-lg">{totalClicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Conversions</span>
                <span className="font-bold text-gray-900 text-lg">{totalConversions}</span>
              </div>
              <div className="h-px bg-green-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Revenue Generated</span>
                <span className="font-extrabold text-green-600 text-xl">${revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Profit Generated</span>
                <span className="font-extrabold text-green-600 text-lg">${profit.toLocaleString()}</span>
              </div>
              <div className="h-px bg-green-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-500">ROAS</span>
                <span className="font-extrabold text-green-600 text-2xl">{roas}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Profit ROAS</span>
                <span className="font-bold text-green-600">{profitRoas}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Cost per Acquisition</span>
                <span className="font-bold text-gray-900">${cpa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Break-even Orders</span>
                <span className="font-bold text-gray-900">{breakEvenOrders}</span>
              </div>
            </div>
          </div>

          {/* Scenario Comparison */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Scenario Comparison</h3>
            <div className="grid grid-cols-3 gap-3">
              {scenarios.map((s) => {
                const clicks = Math.round(monthlyBudget / cpc);
                const conv = Math.round(clicks * (s.rate / 100));
                const rev = conv * aov;
                const sRoas = monthlyBudget > 0 ? (rev / monthlyBudget).toFixed(1) : '0';
                const isModerate = s.label === 'Moderate';
                return (
                  <div
                    key={s.label}
                    className={`rounded-xl p-4 text-center ${
                      isModerate
                        ? 'border-2 border-orange bg-orange-50/30'
                        : 'border border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {s.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mb-3">{s.rate}% conv.</p>
                    <p className="text-xs text-gray-500 mb-1">Revenue</p>
                    <p className="text-sm font-bold text-gray-900 mb-2">${rev.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mb-1">ROAS</p>
                    <p className={`text-lg font-extrabold ${
                      parseFloat(sRoas) >= 3 ? 'text-green-600' : parseFloat(sRoas) >= 2 ? 'text-yellow-600' : 'text-red-500'
                    }`}>
                      {sRoas}x
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Orders: {conv}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="rounded-2xl border border-lavender-200 bg-gradient-to-br from-lavender-50 to-white p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-lavender-500" />
              <h3 className="text-sm font-bold text-gray-900">AI Recommendation</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              At your current AOV of <span className="font-bold">${aov}</span> and{' '}
              <span className="font-bold">{Math.round((profitPerOrder / aov) * 100)}% margins</span>,
              you should aim for a <span className="font-bold text-orange">2x ROAS minimum</span> to
              be profitable. Your projected{' '}
              <span className="font-bold text-green-600">{roas}x ROAS</span> looks strong.
              Consider starting with <span className="font-bold">${Math.round(monthlyBudget / 30)}/day</span> on
              Meta and scaling up after validating performance for 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Hair &amp; Beauty Industry Benchmarks (2026)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 pr-4 font-semibold text-gray-500">Metric</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-500">Industry Average</th>
                <th className="text-right py-3 pl-4 font-semibold text-gray-500">Top 10%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {benchmarks.map((b) => (
                <tr key={b.metric}>
                  <td className="py-3 pr-4 font-medium text-gray-900">{b.metric}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{b.average}</td>
                  <td className="py-3 pl-4 text-right font-semibold text-green-600">{b.top10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
