'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDollars } from '@/lib/utils';
import { Rocket, Info, CheckCircle } from 'lucide-react';

interface LaunchInputs {
  subscriptionFee: number;
  setupFee: number;
  websiteFee: number;
  domainCost: number;
  logoCost: number;
  packagingCost: number;
  marketingBudget: number;
  photoShootCost: number;
  businessLicenseCost: number;
  otherCosts: number;
}

const defaultInputs: LaunchInputs = {
  subscriptionFee: 149,
  setupFee: 99,
  websiteFee: 599,
  domainCost: 15,
  logoCost: 150,
  packagingCost: 200,
  marketingBudget: 300,
  photoShootCost: 0,
  businessLicenseCost: 75,
  otherCosts: 0,
};

export default function LaunchCalculatorPage() {
  const [inputs, setInputs] = useState<LaunchInputs>(defaultInputs);
  const [calculated, setCalculated] = useState(false);

  const updateInput = (key: keyof LaunchInputs, value: string) => {
    const num = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
    setCalculated(false);
  };

  // Calculations
  const oneTimeCosts =
    inputs.setupFee +
    inputs.websiteFee +
    inputs.domainCost +
    inputs.logoCost +
    inputs.packagingCost +
    inputs.photoShootCost +
    inputs.businessLicenseCost +
    inputs.otherCosts;

  const monthlyRecurring = inputs.subscriptionFee + inputs.marketingBudget;
  const totalFirstMonth = oneTimeCosts + monthlyRecurring;
  const totalFirstQuarter = oneTimeCosts + monthlyRecurring * 3;
  const breakEvenOrders = Math.ceil(totalFirstMonth / 80); // Assuming ~$80 avg profit per order

  return (
    <DashboardLayout
      userName="Member"
      tierLabel="Launch"
      pageTitle="Launch Calculator"
      pageDescription="Calculate your total startup costs to launch your hair brand"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input Form — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {/* One-Time Costs */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-5 w-5 text-amber-600" />
              <CardTitle>One-Time Startup Costs</CardTitle>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="BeautyShare Pro Setup Fee"
                prefix="$"
                type="number"
                value={inputs.setupFee}
                onChange={(e) => updateInput('setupFee', e.target.value)}
                hint="One-time platform setup"
              />
              <Input
                label="Shopify Website Setup"
                prefix="$"
                type="number"
                value={inputs.websiteFee}
                onChange={(e) => updateInput('websiteFee', e.target.value)}
                hint="Semi-custom store design"
              />
              <Input
                label="Domain Name"
                prefix="$"
                type="number"
                value={inputs.domainCost}
                onChange={(e) => updateInput('domainCost', e.target.value)}
                hint="e.g. yourbrand.com"
              />
              <Input
                label="Logo Design"
                prefix="$"
                type="number"
                value={inputs.logoCost}
                onChange={(e) => updateInput('logoCost', e.target.value)}
                hint="Professional logo"
              />
              <Input
                label="Custom Packaging"
                prefix="$"
                type="number"
                value={inputs.packagingCost}
                onChange={(e) => updateInput('packagingCost', e.target.value)}
                hint="Boxes, bags, tags, inserts"
              />
              <Input
                label="Product Photography"
                prefix="$"
                type="number"
                value={inputs.photoShootCost}
                onChange={(e) => updateInput('photoShootCost', e.target.value)}
                hint="Optional brand shoot"
              />
              <Input
                label="Business License"
                prefix="$"
                type="number"
                value={inputs.businessLicenseCost}
                onChange={(e) => updateInput('businessLicenseCost', e.target.value)}
                hint="LLC or DBA registration"
              />
              <Input
                label="Other One-Time Costs"
                prefix="$"
                type="number"
                value={inputs.otherCosts}
                onChange={(e) => updateInput('otherCosts', e.target.value)}
              />
            </div>
          </Card>

          {/* Monthly Costs */}
          <Card>
            <CardTitle>Monthly Recurring Costs</CardTitle>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="BeautyShare Pro Subscription"
                prefix="$"
                type="number"
                value={inputs.subscriptionFee}
                onChange={(e) => updateInput('subscriptionFee', e.target.value)}
                hint="Monthly platform fee"
              />
              <Input
                label="Marketing Budget"
                prefix="$"
                type="number"
                value={inputs.marketingBudget}
                onChange={(e) => updateInput('marketingBudget', e.target.value)}
                hint="Ads, social media, etc."
              />
            </div>
          </Card>

          <Button size="lg" className="w-full sm:w-auto" onClick={() => setCalculated(true)}>
            Calculate My Launch Costs
          </Button>
        </div>

        {/* Results — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={calculated ? 'ring-2 ring-brand-500 ring-offset-2' : ''}>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Your Launch Costs</CardTitle>
              {calculated && <Badge variant="success">Calculated</Badge>}
            </div>

            <div className="space-y-4">
              {/* One-time */}
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">One-Time Investment</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">
                  {formatDollars(oneTimeCosts)}
                </p>
              </div>

              {/* Monthly */}
              <div className="rounded-lg bg-brand-50 p-4">
                <p className="text-sm font-medium text-brand-700">Monthly Recurring</p>
                <p className="text-2xl font-bold text-brand-900 mt-1">
                  {formatDollars(monthlyRecurring)}
                  <span className="text-sm font-normal text-brand-500">/mo</span>
                </p>
              </div>

              {/* Total first month */}
              <div className="rounded-lg bg-brand-900 p-4">
                <p className="text-sm font-medium text-brand-300">Total First Month</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatDollars(totalFirstMonth)}
                </p>
              </div>

              {/* Total first quarter */}
              <div className="rounded-lg bg-cream-200 p-4">
                <p className="text-sm font-medium text-brand-600">First 3 Months Total</p>
                <p className="text-2xl font-bold text-brand-900 mt-1">
                  {formatDollars(totalFirstQuarter)}
                </p>
              </div>
            </div>
          </Card>

          {/* Break-even insight */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-brand-500" />
              <CardTitle>Break-Even Estimate</CardTitle>
            </div>
            <p className="text-sm text-brand-600 leading-relaxed">
              At an average profit of ~$80 per order, you&apos;ll need approximately{' '}
              <span className="font-bold text-brand-900">{breakEvenOrders} orders</span>{' '}
              to cover your first month&apos;s investment.
            </p>
            <p className="mt-3 text-sm text-brand-500">
              That&apos;s roughly {Math.ceil(breakEvenOrders / 4)} orders per week —
              very achievable with consistent marketing.
            </p>
          </Card>

          {/* Tips */}
          <Card>
            <CardTitle>Launch Tips</CardTitle>
            <div className="mt-3 space-y-2">
              {[
                'Start with organic social media before paid ads',
                'Focus on 3-5 hero products, not your full catalog',
                'Build an email list before you officially launch',
                'Get 5-10 customers before investing in packaging',
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                  <span className="text-sm text-brand-600">{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
