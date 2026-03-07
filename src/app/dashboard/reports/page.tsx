'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Download, FileText, BarChart3, Users, Package, TrendingUp, User, Calendar, Clock, Mail } from 'lucide-react';

const QUICK_REPORTS = [
  { id: 1, title: 'Revenue Summary', description: 'Total revenue, growth rate, and payment methods', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500', lastGenerated: '2024-02-28 10:30 AM' },
  { id: 2, title: 'Order Analytics', description: 'Order volume, average value, and trends', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500', lastGenerated: '2024-02-27 3:15 PM' },
  { id: 3, title: 'Customer Insights', description: 'Customer demographics and behavior patterns', icon: Users, gradient: 'from-pink-500 to-rose-500', lastGenerated: '2024-02-26 9:45 AM' },
  { id: 4, title: 'Inventory Report', description: 'Stock levels, SKU performance, and reorder needs', icon: Package, gradient: 'from-amber-500 to-orange-500', lastGenerated: '2024-02-25 2:20 PM' },
  { id: 5, title: 'Marketing ROI', description: 'Campaign performance and spending analysis', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500', lastGenerated: '2024-02-24 11:00 AM' },
  { id: 6, title: 'Partner Performance', description: 'Sales by partner and affiliate metrics', icon: User, gradient: 'from-indigo-500 to-purple-500', lastGenerated: '2024-02-23 4:30 PM' },
];

const RECENT_REPORTS = [
  { id: 1, name: 'Revenue Summary', type: 'PDF', dateGenerated: '2024-02-28 10:30 AM', size: '2.4MB', status: 'Ready' },
  { id: 2, name: 'Order Analytics', type: 'Excel', dateGenerated: '2024-02-27 3:15 PM', size: '1.8MB', status: 'Ready' },
  { id: 3, name: 'Customer Insights', type: 'PDF', dateGenerated: '2024-02-26 9:45 AM', size: '3.1MB', status: 'Ready' },
  { id: 4, name: 'Q1 Business Review', type: 'PDF', dateGenerated: '2024-02-25 2:20 PM', size: '5.2MB', status: 'Ready' },
  { id: 5, name: 'Marketing Campaign Report', type: 'Excel', dateGenerated: '2024-02-24 11:00 AM', size: '2.7MB', status: 'Ready' },
  { id: 6, name: 'Partner Performance', type: 'PDF', dateGenerated: '2024-02-23 4:30 PM', size: '1.5MB', status: 'Ready' },
  { id: 7, name: 'Monthly Financial Report', type: 'Excel', dateGenerated: '2024-02-22 1:45 PM', size: '4.3MB', status: 'Ready' },
  { id: 8, name: 'Customer Satisfaction Survey', type: 'PDF', dateGenerated: '2024-02-21 10:15 AM', size: '2.9MB', status: 'Ready' },
];

const SCHEDULED_REPORTS = [
  { id: 1, name: 'Weekly Sales Report', frequency: 'Weekly', nextRun: '2024-03-04 9:00 AM', recipients: ['sarah@beautyshare.com', 'team@beautyshare.com'], enabled: true },
  { id: 2, name: 'Monthly Financial Summary', frequency: 'Monthly', nextRun: '2024-03-01 8:00 AM', recipients: ['finance@beautyshare.com'], enabled: true },
  { id: 3, name: 'Quarterly Business Review', frequency: 'Monthly', nextRun: '2024-03-15 10:00 AM', recipients: ['ceo@beautyshare.com', 'board@beautyshare.com'], enabled: false },
];

export default function ReportsPage() {
  const [scheduledReports, setScheduledReports] = useState(SCHEDULED_REPORTS);

  const toggleScheduledReport = (id: number) => {
    setScheduledReports(
      scheduledReports.map((report) =>
        report.id === id ? { ...report, enabled: !report.enabled } : report
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate, view, and schedule business reports for your BeautyShare Pro business</p>
      </div>

      {/* KPI MetricCards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Reports Generated" value="23" />
        <MetricCard label="Exports This Month" value="8" />
        <MetricCard label="Most Viewed Report" value="Revenue Summary" />
        <MetricCard label="Data Freshness" value="2 hrs ago" />
      </div>

      {/* Quick Reports Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reports</h2>
        <div className="grid grid-cols-3 gap-6">
          {QUICK_REPORTS.map((report) => {
            const IconComponent = report.icon;
            return (
              <Card key={report.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className={`bg-gradient-to-br ${report.gradient} px-6 py-8 text-white flex items-center justify-center`}>
                  <IconComponent className="h-12 w-12 opacity-80" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  </div>

                  <div className="text-xs text-gray-500">
                    Last generated: {report.lastGenerated}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors">
                      Generate
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                      View Last
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Reports Table */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Report Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {RECENT_REPORTS.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{report.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <Badge>{report.type}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.dateGenerated}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.size}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="success">{report.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Scheduled Reports Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Scheduled Reports</h2>
        <div className="space-y-3">
          {scheduledReports.map((report) => (
            <Card key={report.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {report.frequency}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Next: {report.nextRun}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {report.recipients.length} recipient{report.recipients.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleScheduledReport(report.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    report.enabled
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {report.enabled ? 'Active' : 'Inactive'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Report Builder */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Build Custom Report</h3>
            <p className="text-gray-600 mt-2">Create a tailored report with your chosen metrics, date ranges, and format</p>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <label className="block font-medium mb-1">Date Range</label>
                <div className="flex gap-2">
                  <Input placeholder="Start Date" className="flex-1" />
                  <Input placeholder="End Date" className="flex-1" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Metrics</label>
                <div className="flex gap-3 flex-wrap">
                  {['Revenue', 'Orders', 'Customers', 'Products', 'Partners'].map((metric) => (
                    <label key={metric} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>{metric}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Format</label>
                <div className="flex gap-3">
                  {['PDF', 'Excel', 'CSV'].map((format) => (
                    <label key={format} className="flex items-center gap-2">
                      <input type="radio" name="format" value={format} defaultChecked={format === 'PDF'} />
                      <span>{format}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap">
            <FileText className="h-5 w-5" />
            Generate Report
          </button>
        </div>
      </Card>
    </div>
  );
}
