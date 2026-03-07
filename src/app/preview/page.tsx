'use client';

import { useState } from 'react';
import { Crown, LayoutDashboard, ShoppingCart, Package, Calculator, CreditCard, Settings, ChevronLeft, ChevronRight, Bell, Search, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Users, BarChart3, Activity, Eye, Truck, Clock, CheckCircle, XCircle, ArrowRight, Minus, Rocket, PiggyBank, Tag } from 'lucide-react';

// ============ MOCK DATA ============
const adminKPIs = [
  { label: 'Total Revenue', value: '$47,280', trend: 12.4, icon: <DollarSign className="w-5 h-5" /> },
  { label: 'Active Subscribers', value: '156', trend: 8.2, icon: <Users className="w-5 h-5" /> },
  { label: 'Total Orders', value: '1,247', trend: 15.1, icon: <ShoppingCart className="w-5 h-5" /> },
  { label: 'Churn Rate', value: '3.2%', trend: -1.5, icon: <Activity className="w-5 h-5" /> },
];

const subscriberKPIs = [
  { label: 'My Revenue (30d)', value: '$3,480', trend: 18.5, icon: <DollarSign className="w-5 h-5" /> },
  { label: 'My Orders (30d)', value: '24', trend: 12.0, icon: <ShoppingCart className="w-5 h-5" /> },
  { label: 'Subscription', value: 'Active', icon: <CheckCircle className="w-5 h-5" /> },
  { label: 'Store Status', value: 'Live', icon: <Eye className="w-5 h-5" /> },
];

const revenueData = [
  { day: 'Feb 5', saas: 1200, wholesale: 3400 },
  { day: 'Feb 8', saas: 1350, wholesale: 3600 },
  { day: 'Feb 11', saas: 1100, wholesale: 3100 },
  { day: 'Feb 14', saas: 1600, wholesale: 4200 },
  { day: 'Feb 17', saas: 1450, wholesale: 3800 },
  { day: 'Feb 20', saas: 1700, wholesale: 4600 },
  { day: 'Feb 23', saas: 1550, wholesale: 4100 },
  { day: 'Feb 26', saas: 1800, wholesale: 4900 },
  { day: 'Mar 1', saas: 1650, wholesale: 4400 },
  { day: 'Mar 4', saas: 1900, wholesale: 5200 },
];

const churnAlerts = [
  { name: 'Silk & Slay Beauty', risk: 'critical', daysSinceOrder: 45, score: 92 },
  { name: 'Crown Hair Studio', risk: 'high', daysSinceOrder: 32, score: 78 },
  { name: 'Luxe Locks Co', risk: 'medium', daysSinceOrder: 21, score: 55 },
];

const recentOrders = [
  { id: 'ORD-8F2A', customer: 'Jasmine Williams', store: 'Glow Up Hair', status: 'shipped', amount: 342.50, time: '2 hours ago' },
  { id: 'ORD-3C7D', customer: 'Maya Thompson', store: 'Crown Extensions', status: 'processing', amount: 187.00, time: '4 hours ago' },
  { id: 'ORD-9E1B', customer: 'Tasha Rodriguez', store: 'Silk & Slay', status: 'delivered', amount: 520.75, time: '6 hours ago' },
  { id: 'ORD-5A4F', customer: 'Nicole Davis', store: 'Vibe Hair Co', status: 'pending', amount: 275.00, time: '8 hours ago' },
  { id: 'ORD-2D6E', customer: 'Keisha Brown', store: 'Pure Strand', status: 'confirmed', amount: 410.25, time: '12 hours ago' },
];

const ordersListFull = [
  { id: 'ORD-8F2A', customer: 'Jasmine Williams', items: 3, total: 342.50, status: 'shipped', payment: 'paid', fulfillment: 'shipped', date: 'Mar 4, 2026' },
  { id: 'ORD-3C7D', customer: 'Maya Thompson', items: 2, total: 187.00, status: 'processing', payment: 'paid', fulfillment: 'unfulfilled', date: 'Mar 4, 2026' },
  { id: 'ORD-9E1B', customer: 'Tasha Rodriguez', items: 5, total: 520.75, status: 'delivered', payment: 'paid', fulfillment: 'delivered', date: 'Mar 3, 2026' },
  { id: 'ORD-5A4F', customer: 'Nicole Davis', items: 2, total: 275.00, status: 'pending', payment: 'pending', fulfillment: 'unfulfilled', date: 'Mar 3, 2026' },
  { id: 'ORD-2D6E', customer: 'Keisha Brown', items: 4, total: 410.25, status: 'confirmed', payment: 'paid', fulfillment: 'unfulfilled', date: 'Mar 2, 2026' },
  { id: 'ORD-7B3C', customer: 'Ashley Jones', items: 1, total: 89.99, status: 'delivered', payment: 'paid', fulfillment: 'delivered', date: 'Mar 1, 2026' },
  { id: 'ORD-1F8A', customer: 'Diamond Lee', items: 3, total: 456.00, status: 'shipped', payment: 'paid', fulfillment: 'shipped', date: 'Feb 28, 2026' },
];

const products = [
  { name: 'Brazilian Body Wave 18"', sku: 'BBW-18', stock: 145, threshold: 50, price: 89.99, status: 'in_stock', category: 'Bundles' },
  { name: 'Peruvian Straight 20"', sku: 'PS-20', stock: 12, threshold: 30, price: 95.00, status: 'low_stock', category: 'Bundles' },
  { name: 'Malaysian Deep Wave 16"', sku: 'MDW-16', stock: 0, threshold: 25, price: 85.00, status: 'out_of_stock', category: 'Bundles' },
  { name: '13x4 HD Lace Frontal', sku: 'LF-13x4', stock: 67, threshold: 20, price: 120.00, status: 'in_stock', category: 'Closures' },
  { name: '5x5 Lace Closure', sku: 'LC-5x5', stock: 23, threshold: 25, price: 65.00, status: 'low_stock', category: 'Closures' },
  { name: 'Cambodian Curly 22"', sku: 'CC-22', stock: 89, threshold: 30, price: 110.00, status: 'in_stock', category: 'Bundles' },
];

// ============ HELPER COMPONENTS ============
function Badge({ variant, children }: { variant: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    danger: 'bg-red-50 text-red-700 ring-red-600/20',
    info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    neutral: 'bg-muted text-foreground ring-gray-600/20',
    purple: 'bg-lavender-50 text-lavender-700 ring-lavender-600/20',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[variant] || colors.neutral}`}>
      {children}
    </span>
  );
}

function MetricCard({ label, value, trend, icon }: { label: string; value: string; trend?: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="text-[hsl(var(--primary))]">{icon}</div>
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      {trend !== undefined && (
        <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
          {trend > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : trend < 0 ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
          <span>{Math.abs(trend)}%</span>
          <span className="text-gray-400">vs last 30d</span>
        </div>
      )}
    </div>
  );
}

// ============ SIDEBAR ============
function Sidebar({ activeView, setActiveView, role }: { activeView: string; setActiveView: (v: string) => void; role: 'admin' | 'subscriber' }) {
  const adminNav = [
    { id: 'admin', label: 'Command Center', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];
  const subscriberNav = [
    { id: 'subscriber', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];
  const nav = role === 'admin' ? adminNav : subscriberNav;

  return (
    <div className="w-64 min-h-screen bg-foreground text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))] flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm">BeautyShare Pro</h1>
            <Badge variant={role === 'admin' ? 'purple' : 'info'}>{role === 'admin' ? 'Admin' : 'Subscriber'}</Badge>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === item.id ? 'bg-[hsl(var(--primary))] text-white' : 'text-gray-400 hover:text-white hover:bg-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--primary))] flex items-center justify-center text-xs font-bold">
            {role === 'admin' ? 'CA' : 'JW'}
          </div>
          <div>
            <p className="text-sm font-medium">{role === 'admin' ? 'Chanel Admin' : 'Jasmine Williams'}</p>
            <p className="text-xs text-muted-foreground">{role === 'admin' ? 'becomingchanel@gmail.com' : 'jasmine@glowuphair.com'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TOPBAR ============
function TopBar({ title }: { title: string }) {
  return (
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-8">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-muted-foreground"><Search className="w-5 h-5" /></button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-muted-foreground relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
      </div>
    </div>
  );
}

// ============ ADMIN COMMAND CENTER ============
function AdminView() {
  const maxSaas = Math.max(...revenueData.map(d => d.saas));
  const maxWholesale = Math.max(...revenueData.map(d => d.wholesale));
  const maxVal = Math.max(maxSaas, maxWholesale);

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminKPIs.map(kpi => <MetricCard key={kpi.label} {...kpi} />)}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Overview</h3>
        <p className="text-sm text-muted-foreground mb-6">Last 30 days</p>
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]" /><span className="text-sm text-foreground/80">SaaS Revenue</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[hsl(var(--muted))]" /><span className="text-sm text-foreground/80">Wholesale Revenue</span></div>
        </div>
        <div className="h-64 flex items-end gap-2">
          {revenueData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5" style={{ height: '200px', alignItems: 'flex-end' }}>
                <div className="flex-1 rounded-t-sm bg-[hsl(var(--primary))] opacity-80" style={{ height: `${(d.saas / maxVal) * 100}%` }} />
                <div className="flex-1 rounded-t-sm bg-[hsl(var(--muted))] opacity-80" style={{ height: `${(d.wholesale / maxVal) * 100}%` }} />
              </div>
              <span className="text-[10px] text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Alerts */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--primary))]" />
            <h3 className="text-lg font-semibold text-foreground">Churn Alerts</h3>
          </div>
          <div className="space-y-3">
            {churnAlerts.map(alert => (
              <div key={alert.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium text-foreground text-sm">{alert.name}</p>
                  <p className="text-xs text-muted-foreground">{alert.daysSinceOrder} days since last order</p>
                </div>
                <Badge variant={alert.risk === 'critical' ? 'danger' : alert.risk === 'high' ? 'warning' : 'info'}>
                  {alert.risk} ({alert.score}%)
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer} · {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${order.amount.toFixed(2)}</p>
                  <Badge variant={
                    order.status === 'delivered' ? 'success' :
                    order.status === 'shipped' ? 'purple' :
                    order.status === 'processing' ? 'info' :
                    order.status === 'confirmed' ? 'info' : 'warning'
                  }>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SUBSCRIBER DASHBOARD ============
function SubscriberView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subscriberKPIs.map(kpi => <MetricCard key={kpi.label} {...kpi} />)}
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.slice(0, 4).map(order => (
            <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{order.id} · {order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">${order.amount.toFixed(2)}</p>
                <Badge variant={
                  order.status === 'delivered' ? 'success' :
                  order.status === 'shipped' ? 'purple' : 'warning'
                }>{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ ORDERS VIEW ============
function OrdersView() {
  const statusColors: Record<string, string> = {
    shipped: 'purple', processing: 'info', delivered: 'success', pending: 'warning', confirmed: 'info',
  };
  const paymentColors: Record<string, string> = {
    paid: 'success', pending: 'warning', failed: 'danger',
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by ID, customer, or store..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))] outline-none"
          />
        </div>
        <select className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Items</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Payment</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersListFull.map(order => (
              <tr key={order.id} className="border-b border-border hover:bg-muted transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">#{order.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{order.customer}</td>
                <td className="px-4 py-3 text-sm text-foreground">{order.items} {order.items === 1 ? 'item' : 'items'}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground text-right">${order.total.toFixed(2)}</td>
                <td className="px-4 py-3"><Badge variant={statusColors[order.status] || 'neutral'}>{order.status}</Badge></td>
                <td className="px-4 py-3"><Badge variant={paymentColors[order.payment] || 'neutral'}>{order.payment}</Badge></td>
                <td className="px-4 py-3 text-sm text-foreground/80">{order.date}</td>
                <td className="px-4 py-3 text-center">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-foreground hover:bg-muted">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ INVENTORY VIEW ============
function InventoryView() {
  return (
    <div className="space-y-6">
      {/* Low Stock Alert Banner */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-red-800">2 products are low on stock, 1 product is out of stock</p>
          <p className="text-xs text-red-600 mt-0.5">Review inventory levels and restock as needed</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.sku} className="rounded-xl border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
              <Badge variant={
                product.status === 'in_stock' ? 'success' :
                product.status === 'low_stock' ? 'warning' : 'danger'
              }>
                {product.status === 'in_stock' ? 'In Stock' : product.status === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground text-sm">{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">SKU: {product.sku} · {product.category}</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Stock</p>
                <p className={`text-lg font-bold ${product.stock === 0 ? 'text-red-600' : product.stock < product.threshold ? 'text-yellow-600' : 'text-foreground'}`}>
                  {product.stock}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wholesale</p>
                <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
              </div>
            </div>
            {/* Stock bar */}
            <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${product.stock === 0 ? 'bg-red-500' : product.stock < product.threshold ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(100, (product.stock / (product.threshold * 3)) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Threshold: {product.threshold} units</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CALCULATORS HUB ============
function CalculatorsHub() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Launch Cost Calculator', desc: 'Calculate your total startup investment and monthly costs to launch your hair business.', icon: Rocket, color: 'from-[hsl(var(--primary))] to-[hsl(var(--primary))]' },
          { name: 'Profit Calculator', desc: 'See your profit margins, net profit per unit, and ROI on every product you sell.', icon: PiggyBank, color: 'from-[hsl(var(--primary))] to-[hsl(var(--muted))]' },
          { name: 'Retail Price Calculator', desc: 'Find the optimal retail price based on your costs, desired margin, and competitor pricing.', icon: Tag, color: 'from-[hsl(var(--muted))] to-[#E2AD37]' },
        ].map(calc => (
          <div key={calc.name} className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center mb-4`}>
              <calc.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{calc.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{calc.desc}</p>
            <div className="flex items-center text-[hsl(var(--primary))] text-sm font-medium group-hover:gap-2 transition-all">
              Open Calculator <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ LAUNCH CALCULATOR ============
function LaunchCalculator() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-1">Launch Cost Calculator</h3>
          <p className="text-sm text-muted-foreground mb-6">Calculate your total startup investment to launch with BeautyShare Pro</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">BSP Monthly Subscription</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" value="149" readOnly className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-muted text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Setup Fee (One-Time)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" value="99" readOnly className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-muted text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Marketing Budget (Monthly)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" defaultValue="200" className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Starting Inventory Investment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" defaultValue="500" className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Other Monthly Costs</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" defaultValue="50" className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))] outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-muted-foreground">Total Startup Cost</p>
            <p className="mt-1 text-2xl font-bold text-foreground">$848</p>
            <p className="mt-0.5 text-xs text-muted-foreground">One-time investment</p>
          </div>
          <div className="rounded-xl border border-pink-200 bg-pink-50 p-5">
            <p className="text-sm font-medium text-muted-foreground">Monthly Burn</p>
            <p className="mt-1 text-2xl font-bold text-foreground">$399</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Recurring monthly costs</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-muted-foreground">Break Even</p>
            <p className="mt-1 text-2xl font-bold text-foreground">~8 orders</p>
            <p className="mt-0.5 text-xs text-muted-foreground">At $50 avg profit/order</p>
          </div>
        </div>
      </div>

      {/* Saved Calculations Sidebar */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Saved Calculations</h3>
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm text-center">
          <p className="text-muted-foreground text-sm">No saved calculations yet. Save your first calculation to see it here.</p>
        </div>
      </div>
    </div>
  );
}

// ============ BILLING VIEW ============
function BillingView() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-1">Subscription</h3>
        <p className="text-sm text-muted-foreground mb-6">Manage your BeautyShare Pro subscription</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">Plan</span>
            <span className="text-sm font-semibold text-foreground">BeautyShare Pro · $149/mo</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">Next Billing Date</span>
            <span className="text-sm font-medium text-foreground">April 6, 2026</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <span className="text-sm font-medium text-foreground">Visa ending in 4242</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Member Since</span>
            <span className="text-sm font-medium text-foreground">January 15, 2026</span>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2.5 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:bg-[#B00E53] transition-colors">
            Manage Subscription
          </button>
          <button className="px-4 py-2.5 rounded-lg border border-gray-300 text-foreground text-sm font-medium hover:bg-muted transition-colors">
            View Invoices
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN PREVIEW PAGE ============
const viewTitles: Record<string, string> = {
  admin: 'Command Center',
  subscriber: 'Dashboard',
  orders: 'Order Management',
  inventory: 'Inventory',
  calculators: 'Pricing Calculators',
  'launch-calc': 'Launch Cost Calculator',
  billing: 'Billing Settings',
};

export default function PreviewPage() {
  const [role, setRole] = useState<'admin' | 'subscriber'>('admin');
  const [activeView, setActiveView] = useState('admin');

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="flex min-h-screen bg-muted" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar activeView={activeView} setActiveView={handleViewChange} role={role} />
      <div className="flex-1 flex flex-col">
        <TopBar title={viewTitles[activeView] || 'Dashboard'} />
        <div className="flex-1 p-8 overflow-auto">
          {/* Role switcher */}
          <div className="mb-6 flex items-center gap-3 p-3 bg-white rounded-xl border border-border shadow-sm">
            <span className="text-sm font-medium text-muted-foreground mr-2">Preview as:</span>
            <button
              onClick={() => { setRole('admin'); setActiveView('admin'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'admin' ? 'bg-[hsl(var(--primary))] text-white' : 'bg-gray-100 text-foreground/80 hover:bg-gray-200'}`}
            >
              Admin
            </button>
            <button
              onClick={() => { setRole('subscriber'); setActiveView('subscriber'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'subscriber' ? 'bg-[hsl(var(--primary))] text-white' : 'bg-gray-100 text-foreground/80 hover:bg-gray-200'}`}
            >
              Subscriber
            </button>
            {activeView === 'calculators' && (
              <>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setActiveView('launch-calc')}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-foreground/80 hover:bg-gray-200"
                >
                  Open Launch Calculator
                </button>
              </>
            )}
            {activeView === 'launch-calc' && (
              <>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setActiveView('calculators')}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-foreground/80 hover:bg-gray-200"
                >
                  ← Back to Calculators
                </button>
              </>
            )}
          </div>

          {activeView === 'admin' && <AdminView />}
          {activeView === 'subscriber' && <SubscriberView />}
          {activeView === 'orders' && <OrdersView />}
          {activeView === 'inventory' && <InventoryView />}
          {activeView === 'calculators' && <CalculatorsHub />}
          {activeView === 'launch-calc' && <LaunchCalculator />}
          {activeView === 'billing' && <BillingView />}
        </div>
      </div>
    </div>
  );
}
