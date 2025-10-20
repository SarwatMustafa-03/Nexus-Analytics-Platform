import React from "react";
import { 
  Users, DollarSign as DollarIcon, TrendingUp, TrendingDown, Server, 
  LineChart as LineChartIcon, BarChart3, PieChart as PieChartIcon, 
  Calendar, Menu
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

const PIE_COLORS = [ACCENT_COLOR, '#38B2AC', '#81E6D9'];

// Shared Components
const StatCard = ({ icon: Icon, label, value, trend = null }) => {
  const isPositive = trend && (trend.startsWith('+') || trend.endsWith('s') || trend.endsWith('pts'));
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`
      rounded-xl p-6 shadow-md border border-gray-100 flex flex-col items-start transition-all 
      ${LIGHT_BACKGROUND} text-gray-900 hover:shadow-lg
    `}>
      <div className="text-3xl p-3 rounded-full mb-4 text-white" style={{ backgroundColor: ACCENT_COLOR }}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{label}</h3>
      <p className="text-2xl font-bold mb-2">{value}</p>
      {trend && (
        <div className="flex items-center text-sm">
          <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
          <span className={`font-semibold ${trendColor}`}>{trend}</span>
          <span className="text-gray-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
};

const ChartCard = ({ title, icon: Icon, children, className = "" }) => {
  return (
    <div className={`
      rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col 
      ${LIGHT_BACKGROUND} text-gray-900 transition-shadow hover:shadow-xl ${className}
    `}>
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Icon className="mr-2 w-5 h-5" style={{ color: ACCENT_COLOR }} /> 
        {title}
      </h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

// Dashboard Main Component
const Dashboard = ({ toggleSidebar }) => {
  const stats = [
    { icon: Users, label: "Total Users", value: "10.2K", trend: "+3.1%" },
    { icon: DollarIcon, label: "Revenue", value: "$34.8K", trend: "+4.5%" },
    { icon: TrendingUp, label: "Growth Rate", value: "+24.5%", trend: null },
    { icon: Server, label: "Uptime", value: "99.99%", trend: null },
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
          <h1 className="text-3xl font-bold text-gray-900 hidden sm:block">
            Dashboard Overview
          </h1>
        </div>
        
        <p className="text-sm text-gray-500 flex items-center">
          <Calendar className="inline w-4 h-4 mr-2" />
          Q4 2025
        </p>
      </header>

      {/* Dashboard Content */}
      <div className="p-4 lg:p-8 space-y-8">
        {/* Stats Cards - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} icon={stat.icon} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="space-y-8">
          {/* Main Revenue Chart - Full Width */}
          <ChartCard title="Weekly Performance" icon={LineChartIcon} className="min-h-[400px]">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke={ACCENT_COLOR} 
                  strokeWidth={3} 
                  dot={{ fill: ACCENT_COLOR, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }} 
                  name="Units Sold" 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#38B2AC" 
                  strokeWidth={3}
                  dot={{ fill: '#38B2AC', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Revenue ($)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Secondary Charts - Two Equal Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Chart */}
            <ChartCard title="Traffic Sources" icon={BarChart3}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trafficData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" stroke="#4A5568" />
                  <YAxis stroke="#4A5568" />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} visits`, 'Traffic']}
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill={ACCENT_COLOR} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Subscription Chart */}
            <ChartCard title="Subscription Distribution" icon={PieChartIcon}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} users`, 'Subscribers']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;