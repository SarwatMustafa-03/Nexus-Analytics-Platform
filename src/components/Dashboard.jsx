import React from "react";
import { 
  Users, DollarSign as DollarIcon, TrendingUp, TrendingDown, Server, 
  CheckCircle, Clock, XOctagon, FileText,
  LineChart as LineChartIcon, BarChart3, PieChart as PieChartIcon, 
  Zap, Activity as ActivityIcon, Calendar, Menu
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const ACCENT_COLOR = "#094D4E";
const LIGHT_BACKGROUND = "bg-white";

// Dashboard Data
const salesData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 2000, revenue: 9800 },
  { name: 'Thu', sales: 2780, revenue: 3908 },
  { name: 'Fri', sales: 1890, revenue: 4800 },
  { name: 'Sat', sales: 2390, revenue: 3800 },
  { name: 'Sun', sales: 3490, revenue: 4300 },
];

const trafficData = [
  { name: 'Search', value: 4500 },
  { name: 'Social', value: 2800 },
  { name: 'Direct', value: 1200 },
  { name: 'Referral', value: 900 },
];

const subscriptionData = [
  { name: 'Basic', value: 6500 },
  { name: 'Pro', value: 2500 },
  { name: 'Enterprise', value: 1000 },
];

const transactionsData = [
  { id: 'T90210', date: 'Oct 2, 2025', amount: 49.99, status: 'Completed', user: 'Jane Doe', type: 'Subscription', method: 'Card' },
  { id: 'T90211', date: 'Oct 1, 2025', amount: 129.00, status: 'Pending', user: 'John Smith', type: 'Purchase', method: 'Invoice' },
  { id: 'T90212', date: 'Sep 30, 2025', amount: 250.50, status: 'Completed', user: 'Alice Johnson', type: 'Service', method: 'Card' },
  { id: 'T90213', date: 'Sep 29, 2025', amount: 8.99, status: 'Failed', user: 'Bob Williams', type: 'Refund', method: 'Card' },
  { id: 'T90214', date: 'Sep 28, 2025', amount: 75.00, status: 'Completed', user: 'Chris Lee', type: 'Subscription', method: 'PayPal' },
];

const PIE_COLORS = [ACCENT_COLOR, '#38B2AC', '#81E6D9'];

// Shared Components
const StatCard = ({ icon: Icon, label, value, trend = null }) => {
  const isPositive = trend && (trend.startsWith('+') || trend.endsWith('s') || trend.endsWith('pts'));
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`
      rounded-xl p-6 shadow-md border border-gray-100 flex flex-col items-start transition-all 
      ${LIGHT_BACKGROUND} text-gray-900 hover:shadow-lg transform hover:scale-[1.01]
    `}>
      <div className="text-3xl p-3 rounded-full mb-3 text-white" style={{ backgroundColor: ACCENT_COLOR }}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {trend && (
        <div className="flex items-center text-sm mt-2">
          <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
          <span className={`font-semibold ${trendColor}`}>{trend}</span>
          <span className="text-gray-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
};

const ChartCard = ({ title, icon: Icon, children }) => {
  return (
    <div className={`
      rounded-xl p-6 shadow-lg border border-gray-100 min-h-[300px] flex flex-col 
      ${LIGHT_BACKGROUND} text-gray-900 transition-shadow hover:shadow-xl
    `}>
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Icon className="mr-2 w-5 h-5" style={{ color: ACCENT_COLOR }} /> {title}
      </h3>
      <div className="flex-grow min-h-[250px] w-full">
        {children}
      </div>
    </div>
  );
};

const StatusPill = ({ status }) => {
  let colorClasses = "";
  switch (status) {
    case 'Active':
    case 'Completed':
      colorClasses = "bg-green-100 text-green-800";
      break;
    case 'Inactive':
    case 'Pending':
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case 'Suspended':
    case 'Failed':
      colorClasses = "bg-red-100 text-red-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
      {status}
    </span>
  );
};

// Dashboard Main Component
const Dashboard = ({ toggleSidebar }) => {
  const stats = [
    { icon: Users, label: "Total Users", value: "10,200", trend: "+3.1%" },
    { icon: DollarIcon, label: "Monthly Revenue", value: "$34.8K", trend: "+4.5%" },
    { icon: TrendingUp, label: "Growth Rate", value: "+24.5%", trend: null },
    { icon: Server, label: "Uptime (24h)", value: "99.99%", trend: null },
  ];

  const activityItems = [
    { icon: CheckCircle, text: "Task completed successfully", color: "text-green-600" },
    { icon: Clock, text: "Pending approval from admin", color: "text-yellow-600" },
    { icon: XOctagon, text: "Server downtime reported", color: "text-red-600" },
    { icon: CheckCircle, text: "Database backup completed at 02:00 AM", color: "text-green-600" },
    { icon: Clock, text: "New user registration pending verification", color: "text-yellow-600" },
  ];

  return (
    <div className="flex-1 min-w-0 bg-gray-50">
      {/* Header */}
      <header className={`
        p-4 lg:px-8 lg:py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm
        ${LIGHT_BACKGROUND} border-b border-gray-200
      `}>
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 mr-3 lg:hidden text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-extrabold text-gray-900 hidden sm:block">
            Nexus Analytics Platform
          </h1>
        </div>
        
        <p className="text-sm text-gray-500 flex items-center">
          <Calendar className="inline w-4 h-4 mr-2" />
          Q4 2025 Overview
        </p>
      </header>

      {/* Dashboard Content */}
      <div className="p-4 grid grid-cols-1 gap-6 lg:p-8 lg:pt-6"> 
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} icon={stat.icon} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <ChartCard title="Weekly Sales & Revenue" icon={LineChartIcon}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#4A5568" />
                  <YAxis stroke="#4A5568" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                    formatter={(value, name) => [
                      name === "revenue" ? `$${value.toLocaleString()}` : value.toLocaleString(), 
                      name === "revenue" ? "Revenue" : "Units Sold"
                    ]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="sales" stroke={ACCENT_COLOR} strokeWidth={2} activeDot={{ r: 8 }} name="Units Sold" />
                  <Line type="monotone" dataKey="revenue" stroke="#38B2AC" strokeWidth={2} name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Traffic Chart */}
            <ChartCard title="Traffic by Source" icon={BarChart3}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" stroke="#4A5568" />
                  <YAxis stroke="#4A5568" />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} visits`, 'Traffic']}
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="value" fill={ACCENT_COLOR} name="Visitors" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Subscription Chart */}
            <ChartCard title="Subscription Tiers" icon={PieChartIcon}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={subscriptionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    labelLine={false}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Feature Adoption Chart */}
            <ChartCard title="Feature Adoption Rate" icon={Zap}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[
                    { feature: 'Reporting', users: 7500 }, 
                    { feature: 'API Access', users: 4200 }, 
                    { feature: 'Custom Fields', users: 3100 }, 
                    { feature: 'Multi-User', users: 9500 }
                  ]} 
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                  <XAxis type="number" stroke="#4A5568" />
                  <YAxis dataKey="feature" type="category" stroke="#4A5568" />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} users`, 'Adoption']}
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="users" fill={ACCENT_COLOR} radius={[0, 4, 4, 0]} name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          
          {/* Activity Sidebar */}
          <div>
            <div className={`
              rounded-xl p-6 shadow-lg border border-gray-100 h-full
              ${LIGHT_BACKGROUND} text-gray-900
            `}>
              <h2 className="text-xl font-bold mb-5 flex items-center border-b pb-3 border-gray-200">
                <ActivityIcon className="mr-2 w-5 h-5" style={{ color: ACCENT_COLOR }} /> Recent Activity
              </h2>
              <ul className="space-y-4">
                {activityItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                    <div className={`flex-shrink-0 pt-0.5 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="lg:col-span-3">
          <div className={`
            rounded-xl p-6 shadow-lg border border-gray-100 
            ${LIGHT_BACKGROUND} text-gray-900
          `}>
            <h2 className="text-xl font-bold mb-5 flex items-center border-b pb-3 border-gray-200">
              <FileText className="mr-2 w-5 h-5" style={{ color: ACCENT_COLOR }} /> Recent Transactions
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionsData.slice(0, 5).map((tx, i) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{tx.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-green-600">
                        ${tx.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <StatusPill status={tx.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;