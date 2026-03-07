'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface SavedProjection {
  id: string;
  type: 'launch' | 'inventory' | 'discount' | 'wholesale' | 'beautyshare';
  name: string;
  date: string;
  keyResults: {
    label: string;
    value: string | number;
    unit: string;
  }[];
  data: any;
}

const demoProjections: SavedProjection[] = [
  {
    id: '1',
    type: 'launch',
    name: 'Summer Collection Launch Plan',
    date: '2024-02-15',
    keyResults: [
      { label: 'Break Even', value: '45', unit: 'units' },
      { label: 'First Month Revenue', value: '$2,250', unit: 'dollars' },
      { label: 'Launch Cost', value: '$850', unit: 'dollars' },
    ],
    data: {
      product_name: 'Summer Hair Serum',
      pricing: 45.0,
      launch_budget: 850,
      expected_sales: 50,
    },
  },
  {
    id: '2',
    type: 'inventory',
    name: 'Shampoo Bar Stock Plan',
    date: '2024-02-10',
    keyResults: [
      { label: 'Reorder Point', value: '315', unit: 'units' },
      { label: 'Monthly Storage', value: '$48', unit: 'dollars' },
      { label: 'Days to Stockout', value: '33', unit: 'days' },
    ],
    data: {
      current_stock: 500,
      daily_sales_rate: 15,
      lead_time_days: 14,
    },
  },
  {
    id: '3',
    type: 'discount',
    name: 'Valentine\'s Day Promotion',
    date: '2024-02-05',
    keyResults: [
      { label: 'Discount Price', value: '$68', unit: 'dollars' },
      { label: 'Profit Per Sale', value: '$33', unit: 'dollars' },
      { label: 'ROAS', value: '145%', unit: 'percent' },
    ],
    data: {
      original_price: 85.0,
      discount_percent: 20,
      monthly_ad_spend: 500,
    },
  },
  {
    id: '4',
    type: 'wholesale',
    name: 'Salon Wholesale Program',
    date: '2024-01-28',
    keyResults: [
      { label: 'Wholesale Price', value: '$54', unit: 'dollars' },
      { label: 'Profit Per Unit', value: '$17.50', unit: 'dollars' },
      { label: 'Annual Projection', value: '$2,520', unit: 'dollars' },
    ],
    data: {
      retail_price: 95.0,
      cost_of_goods: 30.0,
      target_wholesale_margin: 50,
    },
  },
  {
    id: '5',
    type: 'beautyshare',
    name: 'BeautyShare Market Entry',
    date: '2024-01-20',
    keyResults: [
      { label: 'Commission Per Unit', value: '$11.25', unit: 'dollars' },
      { label: 'Monthly Profit', value: '$2,100', unit: 'dollars' },
      { label: 'Profit Margin', value: '46%', unit: 'percent' },
    ],
    data: {
      retail_price: 75.0,
      cost_of_goods: 25.0,
      monthly_units_sold: 50,
    },
  },
  {
    id: '6',
    type: 'inventory',
    name: 'Conditioner Restock Strategy',
    date: '2024-01-15',
    keyResults: [
      { label: 'Economic Order Qty', value: '125', unit: 'units' },
      { label: 'Reorder Cost', value: '$1,112', unit: 'dollars' },
      { label: 'Days Until Stockout', value: '42', unit: 'days' },
    ],
    data: {
      current_stock: 750,
      daily_sales_rate: 18,
      lead_time_days: 10,
    },
  },
  {
    id: '7',
    type: 'launch',
    name: 'New Scalp Treatment Launch',
    date: '2024-01-10',
    keyResults: [
      { label: 'Break Even', value: '32', unit: 'units' },
      { label: 'First Month Revenue', value: '$1,600', unit: 'dollars' },
      { label: 'Launch Budget', value: '$600', unit: 'dollars' },
    ],
    data: {
      product_name: 'Scalp Care Treatment',
      pricing: 50.0,
      launch_budget: 600,
    },
  },
  {
    id: '8',
    type: 'discount',
    name: 'Instagram Ad Campaign',
    date: '2024-01-05',
    keyResults: [
      { label: 'Discounted Price', value: '$72', unit: 'dollars' },
      { label: 'Break Even Sales', value: '18', unit: 'sales' },
      { label: 'ROAS', value: '165%', unit: 'percent' },
    ],
    data: {
      original_price: 80.0,
      discount_percent: 10,
      monthly_ad_spend: 400,
    },
  },
];

const getTypeColor = (
  type: 'launch' | 'inventory' | 'discount' | 'wholesale' | 'beautyshare'
) => {
  switch (type) {
    case 'launch':
      return { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' };
    case 'inventory':
      return { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' };
    case 'discount':
      return { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700' };
    case 'wholesale':
      return { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' };
    case 'beautyshare':
      return { bg: 'bg-pink-50', border: 'border-pink-200', badge: 'bg-pink-100 text-pink-700' };
  }
};

const getTypeLabel = (
  type: 'launch' | 'inventory' | 'discount' | 'wholesale' | 'beautyshare'
) => {
  switch (type) {
    case 'launch':
      return 'Launch';
    case 'inventory':
      return 'Inventory';
    case 'discount':
      return 'Discount & Ads';
    case 'wholesale':
      return 'Wholesale';
    case 'beautyshare':
      return 'BeautyShare';
  }
};

export default function SavedProjectionsPage() {
  const [projections, setProjections] = useState<SavedProjection[]>(demoProjections);
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleLoad = (projection: SavedProjection) => {
    // Dispatch custom event to load calculation
    const event = new CustomEvent('loadCalculation', {
      detail: {
        calculatorType: projection.type,
        data: projection.data,
      },
    });
    window.dispatchEvent(event);
    // Navigate to calculator
    window.location.href = `/dashboard/calculators/${projection.type}`;
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this projection?')) {
      setProjections((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const types: ('all' | 'launch' | 'inventory' | 'discount' | 'wholesale' | 'beautyshare')[] = [
    'all',
    'launch',
    'inventory',
    'discount',
    'wholesale',
    'beautyshare',
  ];

  const filteredProjections =
    activeTab === 'all'
      ? projections
      : projections.filter((p) => p.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Saved Projections
              </h1>
              <p className="mt-2 text-gray-600">
                View and manage your saved calculator results
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-pink-600">
                {projections.length}
              </p>
              <p className="text-sm text-gray-600">Saved projections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === type
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {type === 'all'
                  ? 'All Projections'
                  : getTypeLabel(
                      type as 'launch' | 'inventory' | 'discount' | 'wholesale' | 'beautyshare'
                    )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProjections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projections found
            </h3>
            <p className="text-gray-600">
              {activeTab === 'all'
                ? 'Create a new calculator to save your first projection'
                : `Create a ${getTypeLabel(
                    activeTab as
                      | 'launch'
                      | 'inventory'
                      | 'discount'
                      | 'wholesale'
                      | 'beautyshare'
                  )} projection to get started`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjections.map((projection) => {
              const colors = getTypeColor(projection.type);
              const typeLabel = getTypeLabel(projection.type);

              return (
                <Card
                  key={projection.id}
                  className={`${colors.bg} border ${colors.border} overflow-hidden hover:shadow-lg transition-shadow`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span className={`inline-block ${colors.badge} px-3 py-1 rounded-full text-xs font-semibold mb-2`}>
                          {typeLabel}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {projection.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(projection.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Key Results */}
                    <div className="space-y-3 mb-6 bg-white rounded-lg p-4">
                      {projection.keyResults.map((result, idx) => (
                        <div key={idx} className="flex justify-between items-start">
                          <span className="text-sm text-gray-600">
                            {result.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-800 text-right">
                            {result.value} <span className="text-xs text-gray-500">{result.unit}</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoad(projection)}
                        className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDelete(projection.id)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
