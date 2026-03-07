'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah@beautyshare.com',
    phone: '(555) 123-4567',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [businessData, setBusinessData] = useState({
    businessName: 'Sarah\'s Hair Studio',
    businessType: 'Hair Salon',
    website: 'www.sarahshair.com',
    instagram: '@sarahshair',
    tiktok: '@sarahshair',
    facebook: 'Sarah\'s Hair Studio',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    taxId: '12-3456789',
  });

  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    partnerRequests: false,
    weeklyReports: true,
    marketingTips: false,
    newFeatures: true,
    emailFrequency: 'real-time',
  });

  const [integrations] = useState([
    { id: 1, name: 'Stripe', description: 'Payment processing', connected: true },
    { id: 2, name: 'Shopify', description: 'E-commerce platform', connected: false },
    { id: 3, name: 'Instagram', description: 'Social commerce', connected: true },
    { id: 4, name: 'TikTok Shop', description: 'Video commerce', connected: false },
    { id: 5, name: 'QuickBooks', description: 'Accounting software', connected: false },
    { id: 6, name: 'Mailchimp', description: 'Email marketing', connected: true },
  ]);

  const [billingHistory] = useState([
    { date: 'Mar 1, 2025', amount: '$149.00', status: 'Paid', invoice: '#INV-2025-03' },
    { date: 'Feb 1, 2025', amount: '$149.00', status: 'Paid', invoice: '#INV-2025-02' },
    { date: 'Jan 1, 2025', amount: '$149.00', status: 'Paid', invoice: '#INV-2025-01' },
    { date: 'Dec 1, 2024', amount: '$149.00', status: 'Paid', invoice: '#INV-2024-12' },
    { date: 'Nov 1, 2024', amount: '$149.00', status: 'Paid', invoice: '#INV-2024-11' },
    { date: 'Oct 1, 2024', amount: '$99.00 + $149.00', status: 'Paid', invoice: '#INV-2024-10' },
  ]);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleBusinessChange = (field: string, value: string) => {
    setBusinessData({ ...businessData, [field]: value });
  };

  const handleNotificationChange = (field: string, value: string | boolean) => {
    setNotifications({ ...notifications, [field]: value });
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'business', label: 'Business' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Billing' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account, business, and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Avatar Section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-gray-600 text-4xl">
                👤
              </div>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                Upload Photo
              </button>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>
          </Card>

          {/* Password Change */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <Input
                  type="password"
                  value={profileData.password}
                  onChange={(e) => handleProfileChange('password', e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <Input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'business' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <Input
                  type="text"
                  value={businessData.businessName}
                  onChange={(e) => handleBusinessChange('businessName', e.target.value)}
                  placeholder="Your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select
                  value={businessData.businessType}
                  onChange={(e) => handleBusinessChange('businessType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option>Hair Salon</option>
                  <option>Beauty Supply</option>
                  <option>Online Store</option>
                  <option>Wholesaler</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <Input
                  type="url"
                  value={businessData.website}
                  onChange={(e) => handleBusinessChange('website', e.target.value)}
                  placeholder="www.yourbusiness.com"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Handle</label>
                <Input
                  type="text"
                  value={businessData.instagram}
                  onChange={(e) => handleBusinessChange('instagram', e.target.value)}
                  placeholder="@yourusername"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Handle</label>
                <Input
                  type="text"
                  value={businessData.tiktok}
                  onChange={(e) => handleBusinessChange('tiktok', e.target.value)}
                  placeholder="@yourusername"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Page</label>
                <Input
                  type="text"
                  value={businessData.facebook}
                  onChange={(e) => handleBusinessChange('facebook', e.target.value)}
                  placeholder="Your Business Name"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Business Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <Input
                  type="text"
                  value={businessData.address}
                  onChange={(e) => handleBusinessChange('address', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Input
                    type="text"
                    value={businessData.city}
                    onChange={(e) => handleBusinessChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <Input
                    type="text"
                    value={businessData.state}
                    onChange={(e) => handleBusinessChange('state', e.target.value)}
                    placeholder="NY"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                <Input
                  type="text"
                  value={businessData.zipCode}
                  onChange={(e) => handleBusinessChange('zipCode', e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Tax Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / EIN</label>
              <Input
                type="text"
                value={businessData.taxId}
                onChange={(e) => handleBusinessChange('taxId', e.target.value)}
                placeholder="XX-XXXXXXX"
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: 'orderNotifications', label: 'Order Notifications', description: 'Get notified when new orders arrive' },
                { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'Be alerted when inventory runs low' },
                { key: 'partnerRequests', label: 'Partner Requests', description: 'Receive collaboration and partnership requests' },
                { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get your weekly business summary' },
                { key: 'marketingTips', label: 'Marketing Tips', description: 'Receive tips to grow your business' },
                { key: 'newFeatures', label: 'New Feature Announcements', description: 'Learn about new features and updates' },
              ].map((notif) => (
                <div key={notif.key} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{notif.label}</p>
                    <p className="text-sm text-gray-600">{notif.description}</p>
                  </div>
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[notif.key as keyof typeof notifications] as boolean}
                      onChange={(e) => handleNotificationChange(notif.key, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors ${
                      notifications[notif.key as keyof typeof notifications] ? 'bg-pink-500' : 'bg-gray-300'
                    }`} />
                    <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications[notif.key as keyof typeof notifications] ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Frequency</h2>
            <div className="space-y-3">
              {[
                { value: 'real-time', label: 'Real-time', description: 'Get notifications as they happen' },
                { value: 'daily', label: 'Daily Digest', description: 'One email per day with all updates' },
                { value: 'weekly', label: 'Weekly', description: 'One email per week with a summary' },
              ].map((freq) => (
                <label key={freq.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="emailFrequency"
                    value={freq.value}
                    checked={notifications.emailFrequency === freq.value}
                    onChange={(e) => handleNotificationChange('emailFrequency', e.target.value)}
                    className="w-4 h-4 accent-pink-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{freq.label}</p>
                    <p className="text-sm text-gray-600">{freq.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium">
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">BeautyShare Pro</h2>
                <p className="text-gray-600 mt-1">Current Plan</p>
              </div>
              <Badge className="bg-pink-500 text-white">CURRENT PLAN</Badge>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">$149<span className="text-xl text-gray-600">/month</span></div>
            <p className="text-gray-600 mb-6">+ $99 setup fee (one-time)</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Next Billing Date</p>
                <p className="font-semibold text-gray-900">April 1, 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900">Visa ending in 4242</p>
              </div>
            </div>
          </Card>

          {/* Usage Stats */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Orders Processed</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
                <p className="text-xs text-gray-500 mt-1">Unlimited available</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">2.4 GB</p>
                <p className="text-xs text-gray-500 mt-1">50 GB available</p>
              </div>
            </div>
          </Card>

          {/* Billing History */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-0 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-0 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-0 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-0 font-semibold text-gray-700">Invoice</th>
                    <th className="text-right py-3 px-0 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-0 text-gray-900">{row.date}</td>
                      <td className="py-3 px-0 text-gray-900">{row.amount}</td>
                      <td className="py-3 px-0">
                        <Badge className="bg-green-100 text-green-800">{row.status}</Badge>
                      </td>
                      <td className="py-3 px-0 text-gray-600">{row.invoice}</td>
                      <td className="py-3 px-0 text-right">
                        <button className="text-pink-600 hover:text-pink-700 font-medium">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Cancel Subscription */}
          <Card className="p-6 border-red-200 bg-red-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Cancel Subscription</h2>
            <p className="text-gray-600 mb-4">If you cancel, you'll lose access to all Pro features at the end of your billing cycle.</p>
            <button className="px-6 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 transition-colors font-medium">
              Cancel Subscription
            </button>
          </Card>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                  <Badge className={integration.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {integration.connected ? 'Connected' : 'Disconnected'}
                  </Badge>
                  <button className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
                    integration.connected
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}>
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}