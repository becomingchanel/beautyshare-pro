'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Target,
  Tag,
  Download,
  Save,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

/* ── Tab Types ─────────────────────────────────────────────────── */
type TabKey = 'margin' | 'markup' | 'breakeven' | 'target';

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'margin', label: 'Margin', icon: <Percent className="h-4 w-4" /> },
  { key: 'markup', label: 'Markup', icon: <TrendingUp className="h-4 w-4" /> },
  { key: 'breakeven', label: 'Break-even', icon: <Target className="h-4 w-4" /> },
  { key: 'target', label: 'Target Pricing', icon: <Tag className="h-4 w-4" /> },
];

/* ── Inputs ────────────────────────────────────────────────────── */
interface ProfitInputs {
  wholesale_cost: number;
  retail_price: number;
  monthly_orders: number;
  shipping_cost: number;
  ad_spend_monthly: number;
  target_margin: number;
  monthly_fixed_costs: number;
}

export default function ProfitCalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('margin');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [calculationName, setCalculationName] = useState('');

  const [inputs, setInputs] = useState<ProfitInputs>({
    wholesale_cost: 80,
    retail_price: 180,
    monthly_orders: 20,
    shipping_cost: 8,
    ad_spend_monthly: 200,
    target_margin: 60,
    monthly_fixed_costs: 349,
  });

  const handleInputChange = (field: keyof ProfitInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Load saved calculation
  useEffect(() => {
    const handleLoadCalculation = (event: any) => {
      setInputs((prev) => ({ ...prev, ...event.detail.inputs }));
    };
    window.addEventListener('loadCalculation', handleLoadCalculation);
    return () => window.removeEventListener('loadCalculation', handleLoadCalculation);
  }, []);

  /* ── Calculations ──────────────────────────────────────────── */
  const costPerUnit = inputs.wholesale_cost + inputs.shipping_cost;
  const grossMarginPerUnit = inputs.retail_price - costPerUnit;
  const grossMarginPct = inputs.retail_price > 0 ? (grossMarginPerUnit / inputs.retail_price) * 100 : 0;

  // Markup
  const markupDollar = inputs.retail_price - inputs.wholesale_cost;
  const markupPct = inputs.wholesale_cost > 0 ? (markupDollar / inputs.wholesale_cost) * 100 : 0;

  // Monthly
  const monthlyRevenue = inputs.retail_price * inputs.monthly_orders;
  const monthlyCogs = costPerUnit * inputs.monthly_orders;
  const grossProfit = monthlyRevenue - monthlyCogs;
  const netProfit = grossProfit - inputs.ad_spend_monthly - inputs.monthly_fixed_costs;
  const roi = (inputs.ad_spend_monthly + inputs.monthly_fixed_costs) > 0
    ? (netProfit / (inputs.ad_spend_monthly + inputs.monthly_fixed_costs)) * 100
    : 0;

  // Break-even
  const contributionMarginPerUnit = grossMarginPerUnit;
  const breakEvenUnits = contributionMarginPerUnit > 0
    ? Math.ceil((inputs.monthly_fixed_costs + inputs.ad_spend_monthly) / contributionMarginPerUnit)
    : 0;
  const breakEvenRevenue = breakEvenUnits * inputs.retail_price;
  const daysToBreakEven = inputs.monthly_orders > 0
    ? Math.ceil(breakEvenUnits / (inputs.monthly_orders / 30))
    : 0;

  // Target pricing
  const targetRetailPrice = inputs.target_margin > 0 && inputs.target_margin < 100
    ? costPerUnit / (1 - inputs.target_margin / 100)
    : 0;
  const targetMarkup = costPerUnit > 0
    ? ((targetRetailPrice - costPerUnit) / costPerUnit) * 100
    : 0;
  const targetMonthlyRevenue = targetRetailPrice * inputs.monthly_orders;
  const targetNetProfit = (targetRetailPrice - costPerUnit) * inputs.monthly_orders - inputs.ad_spend_monthly - inputs.monthly_fixed_costs;

  // Health
  const marginHealth = grossMarginPct >= 50 ? 'healthy' : grossMarginPct >= 30 ? 'warning' : 'critical';

  /* ── Save Handler ──────────────────────────────────────────── */
  const handleSave = async () => {
    if (!calculationName.trim()) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/calculators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'profit',
          name: calculationName,
          inputs,
          results: { grossMarginPct, markupPct, netProfit, breakEvenUnits, targetRetailPrice },
        }),
      });
      if (response.ok) {
        alert('Calculation saved successfully!');
        setCalculationName('');
        setShowSaveModal(false);
        window.dispatchEvent(new CustomEvent('calculationSaved'));
      } else {
        alert('Failed to save calculation');
      }
    } catch {
      alert('Failed to save calculation');
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Export PDF (stub) ─────────────────────────────────────── */
  const handleExportPDF = () => {
    alert('PDF export coming soon! Your projection details will be downloadable as a professional PDF report.');
  };

  /* ── Shared Input Field ────────────────────────────────────── */
  const InputField = ({
    label,
    value,
    field,
    prefix = '$',
    suffix,
    min = 0,
    max,
    step = 1,
  }: {
    label: string;
    value: number;
    field: keyof ProfitInputs;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => handleInputChange(field, Number(e.target.value))}
          className={`w-full rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${prefix ? 'pl-8' : 'pl-4'} ${suffix ? 'pr-10' : 'pr-4'}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );

  /* ── Result Item ───────────────────────────────────────────── */
  const ResultRow = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-foreground/70">{label}</span>
      <span className={`text-sm font-bold ${color || 'text-foreground'}`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/dashboard/calculators" className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Calculators
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Profit Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Analyze margins, markup, break-even, and target pricing for your products</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportPDF}
            variant="outline"
            className="flex items-center gap-2 text-sm"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            onClick={() => setShowSaveModal(true)}
            className="flex items-center gap-2 text-sm bg-gradient-to-r from-primary to-accent text-white"
          >
            <Save className="h-4 w-4" />
            Save Projection
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all flex-1 justify-center ${
              activeTab === tab.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content — Two Columns */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* ═══ Left — Inputs (3 cols) ═══ */}
        <div className="lg:col-span-3 space-y-6">
          {/* Core Inputs Card */}
          <Card className="p-6">
            <h3 className="text-base font-semibold text-foreground mb-5">Product & Sales Inputs</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField label="Wholesale Cost per Unit" value={inputs.wholesale_cost} field="wholesale_cost" />
              <InputField label="Retail Price per Unit" value={inputs.retail_price} field="retail_price" />
              <InputField label="Shipping Cost per Unit" value={inputs.shipping_cost} field="shipping_cost" />
              <InputField label="Monthly Orders" value={inputs.monthly_orders} field="monthly_orders" prefix="" />
            </div>
          </Card>

          {/* Expense Inputs */}
          <Card className="p-6">
            <h3 className="text-base font-semibold text-foreground mb-5">Monthly Expenses</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField label="Monthly Ad Spend" value={inputs.ad_spend_monthly} field="ad_spend_monthly" />
              <InputField label="Monthly Fixed Costs" value={inputs.monthly_fixed_costs} field="monthly_fixed_costs" />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Fixed costs include subscription fee ($149/mo), tools, software, etc.
            </p>
          </Card>

          {/* Target Pricing Input — only show on target tab */}
          {activeTab === 'target' && (
            <Card className="p-6 border-primary/20">
              <h3 className="text-base font-semibold text-foreground mb-5">Target Pricing</h3>
              <InputField
                label="Target Profit Margin"
                value={inputs.target_margin}
                field="target_margin"
                prefix=""
                suffix="%"
                min={1}
                max={99}
              />
              <p className="text-xs text-muted-foreground mt-3">
                Set your desired profit margin and we'll calculate the retail price you need.
              </p>
            </Card>
          )}

          {/* Financial Breakdown — show on margin/markup tabs */}
          {(activeTab === 'margin' || activeTab === 'markup') && (
            <Card className="p-6 bg-muted/30">
              <h3 className="text-base font-semibold text-foreground mb-4">Monthly Financial Breakdown</h3>
              <div className="divide-y divide-border">
                <ResultRow label="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} color="text-green-600" />
                <ResultRow label="COGS (Wholesale + Shipping)" value={`-$${monthlyCogs.toLocaleString()}`} color="text-red-500" />
                <ResultRow label="Gross Profit" value={`$${grossProfit.toLocaleString()}`} />
                <ResultRow label="Ad Spend" value={`-$${inputs.ad_spend_monthly.toLocaleString()}`} color="text-red-500" />
                <ResultRow label="Fixed Costs" value={`-$${inputs.monthly_fixed_costs.toLocaleString()}`} color="text-red-500" />
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-semibold text-foreground">Net Profit</span>
                  <span className={`text-lg font-extrabold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netProfit >= 0 ? '+' : ''}${netProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* ═══ Right — Results (2 cols) ═══ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Margin Health */}
          <Card className={`p-5 border ${
            marginHealth === 'healthy' ? 'border-green-200 bg-green-50/50' :
            marginHealth === 'warning' ? 'border-yellow-200 bg-yellow-50/50' :
            'border-red-200 bg-red-50/50'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {marginHealth === 'healthy' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : marginHealth === 'warning' ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-sm font-bold ${
                marginHealth === 'healthy' ? 'text-green-700' :
                marginHealth === 'warning' ? 'text-yellow-700' :
                'text-red-600'
              }`}>
                {marginHealth === 'healthy' ? 'Healthy Margins' :
                 marginHealth === 'warning' ? 'Margins Need Attention' :
                 'Critical — Low Margins'}
              </span>
            </div>
            <p className="text-xs text-foreground/60">
              {marginHealth === 'healthy'
                ? 'Your margins are strong. Room for growth and marketing investment.'
                : marginHealth === 'warning'
                ? 'Adequate margins but limited flexibility. Consider optimizing costs.'
                : 'Margins are too tight. Review costs or increase retail pricing.'}
            </p>
          </Card>

          {/* ── Margin Tab Results ── */}
          {activeTab === 'margin' && (
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Percent className="h-4 w-4 text-primary" />
                Margin Analysis
              </h3>
              <div className="space-y-1 divide-y divide-border">
                <ResultRow label="Gross Margin / Unit" value={`$${grossMarginPerUnit.toFixed(2)}`} />
                <ResultRow label="Gross Margin %" value={`${grossMarginPct.toFixed(1)}%`} color={grossMarginPct >= 50 ? 'text-green-600' : grossMarginPct >= 30 ? 'text-yellow-600' : 'text-red-500'} />
                <ResultRow label="Cost per Unit" value={`$${costPerUnit.toFixed(2)}`} />
                <ResultRow label="Net Profit / Month" value={`$${netProfit.toLocaleString()}`} color={netProfit >= 0 ? 'text-green-600' : 'text-red-500'} />
                <ResultRow label="ROI" value={`${roi.toFixed(0)}%`} color={roi >= 100 ? 'text-green-600' : roi >= 0 ? 'text-yellow-600' : 'text-red-500'} />
              </div>
            </Card>
          )}

          {/* ── Markup Tab Results ── */}
          {activeTab === 'markup' && (
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Markup Analysis
              </h3>
              <div className="space-y-1 divide-y divide-border">
                <ResultRow label="Markup (Dollar)" value={`$${markupDollar.toFixed(2)}`} />
                <ResultRow label="Markup %" value={`${markupPct.toFixed(1)}%`} color={markupPct >= 100 ? 'text-green-600' : markupPct >= 50 ? 'text-yellow-600' : 'text-red-500'} />
                <ResultRow label="Wholesale Cost" value={`$${inputs.wholesale_cost.toFixed(2)}`} />
                <ResultRow label="Retail Price" value={`$${inputs.retail_price.toFixed(2)}`} />
                <ResultRow label="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} color="text-green-600" />
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Hair industry standard markup is 100-200%. A {markupPct.toFixed(0)}% markup means you&#39;re charging {(markupPct / 100).toFixed(1)}x your wholesale cost.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* ── Break-even Tab Results ── */}
          {activeTab === 'breakeven' && (
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Break-even Analysis
              </h3>
              <div className="space-y-1 divide-y divide-border">
                <ResultRow label="Break-even Units" value={`${breakEvenUnits} units`} color="text-primary" />
                <ResultRow label="Break-even Revenue" value={`$${breakEvenRevenue.toLocaleString()}`} />
                <ResultRow label="Days to Break-even" value={`${daysToBreakEven} days`} color={daysToBreakEven <= 30 ? 'text-green-600' : 'text-yellow-600'} />
                <ResultRow label="Contribution Margin / Unit" value={`$${contributionMarginPerUnit.toFixed(2)}`} />
                <ResultRow label="Monthly Fixed + Ad Costs" value={`$${(inputs.monthly_fixed_costs + inputs.ad_spend_monthly).toLocaleString()}`} />
              </div>
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-foreground/70">
                  You need to sell <span className="font-bold text-primary">{breakEvenUnits} units</span> per month to cover all costs.
                  {inputs.monthly_orders >= breakEvenUnits
                    ? ` At ${inputs.monthly_orders} orders/mo, you're ${inputs.monthly_orders - breakEvenUnits} units above break-even.`
                    : ` At ${inputs.monthly_orders} orders/mo, you need ${breakEvenUnits - inputs.monthly_orders} more to break even.`
                  }
                </p>
              </div>
            </Card>
          )}

          {/* ── Target Pricing Tab Results ── */}
          {activeTab === 'target' && (
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Target Pricing Results
              </h3>
              <div className="space-y-1 divide-y divide-border">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-foreground/70">Suggested Retail Price</span>
                  <span className="text-xl font-extrabold text-primary">${targetRetailPrice.toFixed(2)}</span>
                </div>
                <ResultRow label="Target Margin" value={`${inputs.target_margin}%`} />
                <ResultRow label="Required Markup" value={`${targetMarkup.toFixed(1)}%`} />
                <ResultRow label="Projected Revenue / Mo" value={`$${targetMonthlyRevenue.toLocaleString()}`} />
                <ResultRow label="Projected Net Profit / Mo" value={`$${targetNetProfit.toLocaleString()}`} color={targetNetProfit >= 0 ? 'text-green-600' : 'text-red-500'} />
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    {targetRetailPrice > inputs.retail_price
                      ? `To hit ${inputs.target_margin}% margin, you'd need to increase your price by $${(targetRetailPrice - inputs.retail_price).toFixed(2)} from your current $${inputs.retail_price}.`
                      : `Your current price of $${inputs.retail_price} already exceeds the target of $${targetRetailPrice.toFixed(2)}. You're in great shape!`
                    }
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats — always visible */}
          <Card className="p-5 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-primary">{grossMarginPct.toFixed(0)}%</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Gross Margin</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-accent">{markupPct.toFixed(0)}%</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Markup</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-extrabold ${netProfit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  ${Math.abs(netProfit).toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Net Profit / Mo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-foreground">{breakEvenUnits}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Break-even Units</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Save Projection</h2>
              <input
                type="text"
                placeholder="e.g. 'Q1 Body Wave Projection'"
                value={calculationName}
                onChange={(e) => setCalculationName(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-6 text-sm"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowSaveModal(false); setCalculationName(''); }}
                  className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !calculationName.trim()}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-medium hover:opacity-90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Projection'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
