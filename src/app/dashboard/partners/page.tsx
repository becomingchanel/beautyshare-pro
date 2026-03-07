'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ChevronDown, Search } from 'lucide-react';

interface Partner {
  id: string;
  businessName: string;
  contact: string;
  email: string;
  type: 'Salon' | 'Boutique' | 'Online';
  status: 'Active' | 'Pending' | 'Inactive';
  totalOrders: number;
  revenue: number;
  lastOrderDate: string;
  address: string;
  commissionRate: number;
  terms: string;
  notes: string;
}

const demoPartners: Partner[] = [
  {
    id: '1',
    businessName: 'Glamour & Glow Salon',
    contact: 'Sarah Martinez',
    email: 'sarah@glamourglowsalon.com',
    type: 'Salon',
    status: 'Active',
    totalOrders: 24,
    revenue: 6200,
    lastOrderDate: '2026-03-05',
    address: '456 Beauty Lane, Los Angeles, CA 90001',
    commissionRate: 15,
    terms: 'Net 30, 10% volume discount',
    notes: 'Top performing partner, consistent orders',
  },
  {
    id: '2',
    businessName: 'Luxe Hair Boutique',
    contact: 'Jessica Chen',
    email: 'jessica@luxehairboutique.com',
    type: 'Boutique',
    status: 'Active',
    totalOrders: 18,
    revenue: 4800,
    lastOrderDate: '2026-03-04',
    address: '789 Retail Street, New York, NY 10001',
    commissionRate: 12,
    terms: 'Net 45, 8% volume discount',
    notes: 'Excellent customer service, growing orders',
  },
  {
    id: '3',
    businessName: 'Hair & More Online',
    contact: 'Marcus Thompson',
    email: 'marcus@hairandmoreonline.com',
    type: 'Online',
    status: 'Active',
    totalOrders: 15,
    revenue: 3800,
    lastOrderDate: '2026-03-01',
    address: '321 Commerce Road, Austin, TX 78701',
    commissionRate: 18,
    terms: 'Net 30, 5% volume discount',
    notes: 'Strong online presence, good social media engagement',
  },
  {
    id: '4',
    businessName: 'Silk & Shine Salon',
    contact: 'Amanda Rodriguez',
    email: 'amanda@silkshineshop.com',
    type: 'Salon',
    status: 'Pending',
    totalOrders: 3,
    revenue: 450,
    lastOrderDate: '2026-02-15',
    address: '654 Beauty Blvd, Miami, FL 33101',
    commissionRate: 0,
    terms: 'Pending approval',
    notes: 'New partner, awaiting full account setup',
  },
  {
    id: '5',
    businessName: 'Curls & Confidence',
    contact: 'Priya Patel',
    email: 'priya@curlsandconfidence.com',
    type: 'Salon',
    status: 'Active',
    totalOrders: 22,
    revenue: 5600,
    lastOrderDate: '2026-03-02',
    address: '987 Style Avenue, Atlanta, GA 30301',
    commissionRate: 15,
    terms: 'Net 30, 10% volume discount',
    notes: 'Consistent monthly orders, professional staff',
  },
  {
    id: '6',
    businessName: 'Beauty Box Express',
    contact: 'David Wong',
    email: 'david@beautyboxexpress.com',
    type: 'Online',
    status: 'Active',
    totalOrders: 19,
    revenue: 4200,
    lastOrderDate: '2026-03-03',
    address: '135 Tech Park, Seattle, WA 98101',
    commissionRate: 18,
    terms: 'Net 30, 5% volume discount',
    notes: 'High order frequency, excellent communication',
  },
  {
    id: '7',
    businessName: 'Golden Locks Boutique',
    contact: 'Emma Stewart',
    email: 'emma@goldenlocksb.com',
    type: 'Boutique',
    status: 'Inactive',
    totalOrders: 8,
    revenue: 1800,
    lastOrderDate: '2025-11-20',
    address: '246 Main Street, Boston, MA 02101',
    commissionRate: 12,
    terms: 'Net 45, inactive',
    notes: 'Last active in November, needs reengagement',
  },
  {
    id: '8',
    businessName: 'Elite Hair Studio',
    contact: 'Nicole Davis',
    email: 'nicole@elitehairstudio.com',
    type: 'Salon',
    status: 'Active',
    totalOrders: 20,
    revenue: 5100,
    lastOrderDate: '2026-03-04',
    address: '579 Professional Plaza, Chicago, IL 60601',
    commissionRate: 15,
    terms: 'Net 30, 10% volume discount',
    notes: 'Growing partnership, requesting bulk discounts',
  },
  {
    id: '9',
    businessName: 'Trend Setters Online',
    contact: 'Kevin Brown',
    email: 'kevin@trendsettersonline.com',
    type: 'Online',
    status: 'Pending',
    totalOrders: 1,
    revenue: 125,
    lastOrderDate: '2026-02-28',
    address: '802 Innovation Drive, Denver, CO 80201',
    commissionRate: 0,
    terms: 'Pending verification',
    notes: 'New applicant, completing KYC requirements',
  },
  {
    id: '10',
    businessName: 'Radiant Beauty Co.',
    contact: 'Lisa Garcia',
    email: 'lisa@radiantbeautyco.com',
    type: 'Boutique',
    status: 'Active',
    totalOrders: 17,
    revenue: 4100,
    lastOrderDate: '2026-03-05',
    address: '913 Boutique Lane, San Diego, CA 92101',
    commissionRate: 12,
    terms: 'Net 45, 8% volume discount',
    notes: 'Seasonal peaks in spring/summer, reliable partner',
  },
];

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Salon' | 'Boutique' | 'Online'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredPartners = demoPartners.filter((partner) => {
    const matchesSearch =
      partner.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || partner.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPartners = demoPartners.length;
  const activeOrders = demoPartners.reduce((sum, p) => sum + (p.status === 'Active' ? p.totalOrders : 0), 0);
  const totalRevenue = demoPartners.reduce((sum, p) => sum + p.revenue, 0);
  const avgOrderValue = Math.round(totalRevenue / activeOrders);

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <Badge variant="success">{status}</Badge>;
    if (status === 'Pending') return <Badge variant="warning">{status}</Badge>;
    return <Badge variant="neutral">{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return <Badge>{type}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Partner Management</h1>
        <p className="text-gray-600 mt-2">Track and manage your wholesale and retail partnerships</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Partners"
          value={totalPartners.toString()}
          subtext="+2 this month"
        />
        <MetricCard
          label="Active Orders"
          value={activeOrders.toString()}
          subtext="+5 this week"
        />
        <MetricCard
          label="Monthly Partner Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtext="+12% vs last month"
        />
        <MetricCard
          label="Avg Partner Order"
          value={`$${avgOrderValue.toLocaleString()}`}
          subtext="+$45 vs last month"
        />
      </div>

      {/* Filters */}
      <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-white">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Filter Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by business name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap items-center">
              {['All', 'Salon', 'Boutique', 'Online'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-pink-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-pink-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Partner List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Business Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <div key={partner.id}>
                  <tr className="border-b border-gray-100 hover:bg-pink-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setExpandedId(expandedId === partner.id ? null : partner.id)}
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedId === partner.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{partner.businessName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{partner.contact}</div>
                      <div className="text-xs text-gray-500">{partner.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{getTypeBadge(partner.type)}</td>
                    <td className="px-6 py-4 text-sm">{getStatusBadge(partner.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{partner.totalOrders}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-pink-600">
                      ${partner.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{partner.lastOrderDate}</td>
                  </tr>

                  {/* Expanded Detail Row */}
                  {expandedId === partner.id && (
                    <tr className="bg-pink-50/50 border-b border-gray-100">
                      <td colSpan={8} className="px-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Address</h4>
                            <p className="text-sm text-gray-600">{partner.address}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Commission Rate</h4>
                            <p className="text-sm text-pink-600 font-medium">
                              {partner.commissionRate > 0 ? `${partner.commissionRate}%` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Terms</h4>
                            <p className="text-sm text-gray-600">{partner.terms}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Notes</h4>
                            <p className="text-sm text-gray-600">{partner.notes}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </div>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPartners.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No partners found matching your filters.
          </div>
        )}
      </Card>
    </div>
  );
}
