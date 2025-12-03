'use client'

import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  AlertCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Home,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 31000 },
  { month: 'Apr', revenue: 61000, expenses: 38000 },
  { month: 'May', revenue: 55000, expenses: 36000 },
  { month: 'Jun', revenue: 67000, expenses: 42000 },
]

const occupancyData = [
  { name: 'Occupied', value: 145, color: '#3b82f6' },
  { name: 'Vacant', value: 23, color: '#e5e7eb' },
  { name: 'Under Maintenance', value: 8, color: '#f59e0b' },
]

const complaintData = [
  { category: 'Maintenance', count: 12 },
  { category: 'Security', count: 8 },
  { category: 'Cleaning', count: 15 },
  { category: 'Noise', count: 6 },
  { category: 'Other', count: 9 },
]

const stats = [
  {
    title: 'Total Residents',
    value: '1,248',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Monthly Revenue',
    value: '₹67,000',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Pending Complaints',
    value: '23',
    change: '-15%',
    trend: 'down',
    icon: AlertCircle,
    color: 'red',
  },
  {
    title: "Today's Visitors",
    value: '48',
    change: '+5%',
    trend: 'up',
    icon: Eye,
    color: 'purple',
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'payment',
    user: 'Rajesh Kumar',
    action: 'Made payment of ₹15,000',
    time: '5 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'visitor',
    user: 'Security Guard',
    action: 'New visitor checked in - Unit A-205',
    time: '12 minutes ago',
    status: 'info',
  },
  {
    id: 3,
    type: 'complaint',
    user: 'Priya Sharma',
    action: 'Reported water leakage issue',
    time: '1 hour ago',
    status: 'warning',
  },
  {
    id: 4,
    type: 'booking',
    user: 'Amit Patel',
    action: 'Booked clubhouse for 15th Dec',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: 5,
    type: 'maintenance',
    user: 'Maintenance Team',
    action: 'Completed lift repair in Block B',
    time: '3 hours ago',
    status: 'success',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function AdminDashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.trend === 'up'

          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={isPositive ? 'default' : 'secondary'}
                        className={`${
                          isPositive
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        } flex items-center space-x-1`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        <span>{stat.change}</span>
                      </Badge>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'red'
                        ? 'bg-red-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === 'blue'
                          ? 'text-blue-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'red'
                          ? 'text-red-600'
                          : 'text-purple-600'
                      }`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Revenue & Expenses
                </h3>
                <p className="text-sm text-gray-600">Monthly overview</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Occupancy Chart */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Unit Occupancy
                </h3>
                <p className="text-sm text-gray-600">Current status</p>
              </div>
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) =>
                    `${entry.name}: ${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Complaints Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaints by Category */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Complaints by Category
                </h3>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complaintData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activities
                </h3>
                <p className="text-sm text-gray-600">Latest updates</p>
              </div>
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'success'
                        ? 'bg-green-100'
                        : activity.status === 'warning'
                        ? 'bg-orange-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 ${
                        activity.status === 'success'
                          ? 'text-green-600'
                          : activity.status === 'warning'
                          ? 'text-orange-600'
                          : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
