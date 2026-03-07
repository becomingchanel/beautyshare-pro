'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Check, X } from 'lucide-react';

interface Reseller {
  id: string;
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold';
  salesThisMonth: number;
  commissionEarned: number;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

interface Application {
  id: string;
  name: string;
  socialMedia: string;
  followers: number;
  requestedTier: 'Bronze' | 'Silver' | 'Gold';
}

interface TierInfo {
  name: 'Bronze' | 'Silver' | 'Gold';
  monthlyRevenue: string;
  monthlyOrders: string;
  commissionRate: string;
  benefits: string[];
  color: string;
  bgColor: string;
  textColor: string;
}

const demoResellers: Reseller[] = [
  {
    id: '1',
    name: 'Crystal Williams',
    tier: 'Gold',
    salesThisMonth: 12500,
    commissionEarned: 2250,
    status: 'Active',
    joinDate: '2024-06-15',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    tier: 'Silver',
    salesThisMonth: 6800,
    commissionEarned: 1020,
    status: 'Active',
    joinDate: '2024-09-22',
  },
  {
    id: '3',
    name: 'Angela Davis',
    tier: 'Gold',
    salesThisMonth: 14200,
    commissionEarned: 2556,
    status: 'Active',
    joinDate: '2024-05-10',
  },
  {
    id: '4',
    name: 'Thomas Chen',
    tier: 'Bronze',
    salesThisMonth: 3200,
    commissionEarned: 384,
    status: 'Active',
    joinDate: '2025-01-08',
  },
  {
    id: '5',
    name: 'Sophia Rodriguez',
    tier: 'Silver',
    salesThisMonth: 7600,
    commissionEarned: 1140,
    status: 'Active',
    joinDate: '2024-08-05',
  },
  {
    id: '6',
    name: 'James Mitchell',
    tier: 'Bronze',
    salesThisMonth: 2100,
    commissionEarned: 252,
    status: 'Inactive',
    joinDate: '2025-02-01',
  },
];

const pendingApplications: Application[] = [
  {
    id: '1',
    name: 'Amelia Thompson',
    socialMedia: '@ameliahaircare',
    followers: 18500,
    requestedTier: 'Silver',
  },
  {
    id: '2',
    name: 'Rebecca Martinez',
    socialMedia: '@beautyby_becs',
    followers: 45200,
    requestedTier: 'Gold',
  },
  {
    id: '3',
    name: 'Lauren Jackson',
    socialMedia: '@hairgoals_lauren',
    followers: 8900,
    requestedTier: 'Bronze',
  },
];

const tierInfo: TierInfo[] = [
  {
    name: 'Bronze',
    monthlyRevenue: '$0 - $5K',
    monthlyOrders: '0 - 20',
    commissionRate: '12%',
    benefits: ['Basic marketing assets', 'Monthly newsletter', 'Standard support', 'Product catalog access'],
    color: 'border-amber-700',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  {
    name: 'Silver',
    monthlyRevenue: '$5K - $15K',
    monthlyOrders: '20 - 60',
    commissionRate: '15%',
    benefits: [
      'Premium marketing assets',
      'Dedicated support',
      'Bi-weekly training calls',
      'Co-marketing opportunities',
      'Bulk discounts',
    ],
    color: 'border-gray-400',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
  },
  {
    name: 'Gold',
    monthlyRevenue: '$15K+',
    monthlyOrders: '60+',
    commissionRate: '18%',
    benefits: [
      'VIP marketing assets',
      'Dedicated account manager',
      'Weekly strategy calls',
      'Co-branding opportunities',
      'Volume discounts',
      'Priority product access',
      'Revenue sharing bonuses',
    ],
    color: 'border-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
  },
];

export default function ResellersPage() {
  const [approvedApplications, setApprovedApplications] = useState<Set<string>>(new Set());
  const [rejectedApplications, setRejectedApplications] = useState<Set<string>>(new Set());

  const activeResellers = demoResellers.filter((r) => r.status === 'Active').length;
  const totalResellersRevenue = demoResellers.reduce((sum, r) => sum + r.salesThisMonth, 0);
  const avgCommissionRate =
    demoResellers.reduce((sum, r) => {
      const tier = tierInfo.find((t) => t.name === r.tier);
      return sum + parseInt(tier?.commissionRate || '0');
    }, 0) / demoResellers.length;

  const handleApprove = (id: string) => {
    setApprovedApplications((prev) => new Set([...prev, id]));
  };

  const handleReject = (id: string) => {
    setRejectedApplications((prev) => new Set([...prev, id]));
  };

  const getTierBadge = (tier: string) => {
    const tierData = tierInfo.find((t) => t.name === tier);
    if (!tierData) return null;
    return <Badge className={tierData.textColor}>{tier}</Badge>;
  };

  const getTierStyles = (tierName: string) => {
    const tier = tierInfo.find((t) => t.name === tierName);
    if (!tier) return {};
    return {
      borderClass: tier.color,
      bgClass: tier.bgColor,
      textClass: tier.textColor,
    };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reseller Program</h1>
        <p className="text-gray-600 mt-2">Manage resellers and track program performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Resellers"
          value={activeResellers.toString()}
          subtext="+1 this month"
        />
        <MetricCard
          label="Pending Applications"
          value={pendingApplications.length.toString()}
          subtext="Review needed"
        />
        <MetricCard
          label="Monthly Reseller Revenue"
          value={`$${totalResellersRevenue.toLocaleString()}`}
          subtext="+22% vs last month"
        />
        <MetricCard
          label="Avg Commission Rate"
          value={`${avgCommissionRate.toFixed(1)}%`}
          subtext="Tiered structure"
        />
      </div>

      {/* Reseller Tiers */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reseller Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tierInfo.map((tier) => {
            const styles = getTierStyles(tier.name);
            return (
              <Card key={tier.name} className={`border-2 ${styles.borderClass} ${styles.bgClass}`}>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className={`text-xl font-bold ${styles.textClass}`}>{tier.name} Tier</h3>
                    <p className="text-sm text-gray-600 mt-1">Premium reseller program</p>
                  </div>

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Monthly Revenue</p>
                      <p className="text-lg font-semibold text-gray-900">{tier.monthlyRevenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Monthly Orders</p>
                      <p className="text-lg font-semibold text-gray-900">{tier.monthlyOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Commission Rate</p>
                      <p className={`text-2xl font-bold ${styles.textClass}`}>{tier.commissionRate}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
                      Benefits
                    </p>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${styles.textClass}`}>
                            <span className="block w-full h-full bg-current"></span>
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reseller Table */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Active Resellers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sales This Month</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Commission Earned</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {demoResellers.map((reseller) => (
                <tr key={reseller.id} className="border-b border-gray-100 hover:bg-pink-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{reseller.name}</td>
                  <td className="px-6 py-4 text-sm">{getTierBadge(reseller.tier)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${reseller.salesThisMonth.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-pink-600">
                    ${reseller.commissionEarned.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={reseller.status === 'Active' ? 'success' : 'neutral'}>
                      {reseller.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reseller.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pending Applications */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Pending Applications ({pendingApplications.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingApplications.map((app) => {
            const isApproved = approvedApplications.has(app.id);
            const isRejected = rejectedApplications.has(app.id);

            if (isApproved || isRejected) {
              return (
                <div key={app.id} className="p-6 bg-gray-50 opacity-75">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {isApproved ? '✓ Approved' : '✗ Rejected'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={app.id} className="p-6 hover:bg-pink-50/30 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{app.socialMedia}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Followers</p>
                    <p className="font-semibold text-gray-900">{app.followers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Requested Tier</p>
                    <p className="mt-1">{getTierBadge(app.requestedTier)}</p>
                  </div>
                  <div className="flex gap-2 justify-start md:justify-end">
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
