'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'New' | 'Returning' | 'VIP';
  joinDate: string;
  phone?: string;
  notes?: string;
}

const DEMO_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    orders: 8,
    totalSpent: 642.50,
    lastOrder: '2025-03-01',
    status: 'VIP',
    joinDate: '2024-06-15',
    phone: '(555) 234-5678',
    notes: 'Loyal customer, loves color treatments'
  },
  {
    id: '2',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    orders: 1,
    totalSpent: 125.00,
    lastOrder: '2025-03-05',
    status: 'New',
    joinDate: '2025-03-05',
    phone: '(555) 345-6789'
  },
  {
    id: '3',
    name: 'Jessica Chen',
    email: 'jchen@email.com',
    orders: 5,
    totalSpent: 387.75,
    lastOrder: '2025-02-28',
    status: 'Returning',
    joinDate: '2024-11-20',
    phone: '(555) 456-7890',
    notes: 'Prefers balayage services'
  },
  {
    id: '4',
    name: 'Amanda White',
    email: 'amanda.white@email.com',
    orders: 12,
    totalSpent: 1048.00,
    lastOrder: '2025-03-02',
    status: 'VIP',
    joinDate: '2024-03-10',
    phone: '(555) 567-8901',
    notes: 'Executive client, monthly appointments'
  },
  {
    id: '5',
    name: 'Nicole Rodriguez',
    email: 'n.rodriguez@email.com',
    orders: 2,
    totalSpent: 198.50,
    lastOrder: '2025-03-04',
    status: 'New',
    joinDate: '2025-02-28',
    phone: '(555) 678-9012'
  },
  {
    id: '6',
    name: 'Victoria Lee',
    email: 'vlee@email.com',
    orders: 9,
    totalSpent: 756.25,
    lastOrder: '2025-02-25',
    status: 'Returning',
    joinDate: '2024-08-05',
    phone: '(555) 789-0123',
    notes: 'Wedding event customer'
  },
  {
    id: '7',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    orders: 1,
    totalSpent: 89.99,
    lastOrder: '2025-03-03',
    status: 'New',
    joinDate: '2025-03-03',
    phone: '(555) 890-1234'
  },
  {
    id: '8',
    name: 'Lauren Martinez',
    email: 'laurenmartinez@email.com',
    orders: 6,
    totalSpent: 512.00,
    lastOrder: '2025-02-20',
    status: 'Returning',
    joinDate: '2024-10-12',
    phone: '(555) 901-2345',
    notes: 'Interested in extensions'
  },
  {
    id: '9',
    name: 'Sophia Anderson',
    email: 'sophia.a@email.com',
    orders: 15,
    totalSpent: 1285.50,
    lastOrder: '2025-03-01',
    status: 'VIP',
    joinDate: '2024-02-01',
    phone: '(555) 012-3456',
    notes: 'Premium service tier customer'
  },
  {
    id: '10',
    name: 'Rachel Kim',
    email: 'rkim@email.com',
    orders: 3,
    totalSpent: 245.00,
    lastOrder: '2025-02-18',
    status: 'Returning',
    joinDate: '2024-12-10',
    phone: '(555) 123-4567'
  },
  {
    id: '11',
    name: 'Mia Patel',
    email: 'mia.patel@email.com',
    orders: 1,
    totalSpent: 150.00,
    lastOrder: '2025-03-06',
    status: 'New',
    joinDate: '2025-03-06',
    phone: '(555) 234-5679'
  },
  {
    id: '12',
    name: 'Olivia Davis',
    email: 'olivia.davis@email.com',
    orders: 7,
    totalSpent: 598.75,
    lastOrder: '2025-02-22',
    status: 'Returning',
    joinDate: '2024-09-30',
    phone: '(555) 345-6788',
    notes: 'Referral customer - great ambassador'
  },
  {
    id: '13',
    name: 'Zara Mitchell',
    email: 'zara.m@email.com',
    orders: 11,
    totalSpent: 945.25,
    lastOrder: '2025-02-28',
    status: 'VIP',
    joinDate: '2024-04-22',
    phone: '(555) 456-7889',
    notes: 'Bridal specialist client'
  },
  {
    id: '14',
    name: 'Chloe Patterson',
    email: 'chloe.p@email.com',
    orders: 2,
    totalSpent: 167.50,
    lastOrder: '2025-03-02',
    status: 'New',
    joinDate: '2025-02-20',
    phone: '(555) 567-8902'
  }
];

type SortOption = 'recent' | 'orders' | 'spend';
type StatusFilter = 'All' | 'New' | 'Returning' | 'VIP';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);

  // Calculate metrics
  const totalCustomers = DEMO_CUSTOMERS.length;
  const newThisMonth = DEMO_CUSTOMERS.filter(c => {
    const joinDate = new Date(c.joinDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;
  const repeatRate = ((DEMO_CUSTOMERS.filter(c => c.orders > 1).length / totalCustomers) * 100).toFixed(0);
  const avgOrderValue = (DEMO_CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0) / DEMO_CUSTOMERS.reduce((sum, c) => sum + c.orders, 0)).toFixed(2);

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = DEMO_CUSTOMERS.filter(customer => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime());
    } else if (sortBy === 'orders') {
      filtered.sort((a, b) => b.orders - a.orders);
    } else if (sortBy === 'spend') {
      filtered.sort((a, b) => b.totalSpent - a.totalSpent);
    }

    return filtered;
  }, [searchQuery, statusFilter, sortBy]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'success';
      case 'Returning':
        return 'neutral';
      case 'New':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage and track your customer relationships</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Customers"
          value={totalCustomers.toString()}
          subtext="+2.4%"
        />
        <MetricCard
          label="New This Month"
          value={newThisMonth.toString()}
          subtext="+40%"
        />
        <MetricCard
          label="Repeat Rate"
          value={`${repeatRate}%`}
          subtext="+5.2%"
        />
        <MetricCard
          label="Average Order Value"
          value={`$${avgOrderValue}`}
          subtext="+3.8%"
        />
      </div>

      {/* Search and Filter Bar */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <Input
              placeholder="Search by customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['All', 'New', 'Returning', 'VIP'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="orders">Most Orders</option>
                <option value="spend">Highest Spend</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedCustomers.length} of {totalCustomers} customers
          </div>
        </div>
      </Card>

      {/* Customer Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  Orders
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Last Order
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCustomers.map((customer, index) => (
                <tbody key={customer.id}>
                  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(customer.lastOrder)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={getStatusBadgeVariant(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          setExpandedCustomerId(
                            expandedCustomerId === customer.id ? null : customer.id
                          )
                        }
                        className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                      >
                        {expandedCustomerId === customer.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Customer Details */}
                  {expandedCustomerId === customer.id && (
                    <tr className={index % 2 === 0 ? 'bg-pink-50' : 'bg-pink-50'}>
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Contact Info */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Contact Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Email:</span>
                                <p className="text-gray-900 font-medium">{customer.email}</p>
                              </div>
                              {customer.phone && (
                                <div>
                                  <span className="text-gray-600">Phone:</span>
                                  <p className="text-gray-900 font-medium">{customer.phone}</p>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-600">Member Since:</span>
                                <p className="text-gray-900 font-medium">
                                  {formatDate(customer.joinDate)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Purchase History */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Purchase History
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Total Orders:</span>
                                <p className="text-gray-900 font-medium">{customer.orders}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Total Spent:</span>
                                <p className="text-gray-900 font-medium">
                                  {formatCurrency(customer.totalSpent)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Average Order:</span>
                                <p className="text-gray-900 font-medium">
                                  {formatCurrency(customer.totalSpent / customer.orders)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          {customer.notes && (
                            <div className="md:col-span-2">
                              <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                              <p className="text-sm text-gray-700">{customer.notes}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredAndSortedCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No customers found</p>
              <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
