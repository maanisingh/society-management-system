'use client'

import { useState } from 'react'
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
  Building2,
  Car,
  Package,
  Wrench,
  Calendar,
  MessageSquare,
  Bell,
  FileText,
  Send,
  Phone,
  Mail,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
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
  Legend,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const revenueData = [
  { month: 'Jan', revenue: 245000, collected: 220000, pending: 25000 },
  { month: 'Feb', revenue: 252000, collected: 235000, pending: 17000 },
  { month: 'Mar', revenue: 248000, collected: 240000, pending: 8000 },
  { month: 'Apr', revenue: 261000, collected: 250000, pending: 11000 },
  { month: 'May', revenue: 255000, collected: 248000, pending: 7000 },
  { month: 'Jun', revenue: 267000, collected: 260000, pending: 7000 },
]

const unitStatusData = [
  { name: 'Occupied', value: 145, color: '#22c55e' },
  { name: 'Vacant', value: 23, color: '#ef4444' },
  { name: 'Under Maintenance', value: 8, color: '#f59e0b' },
  { name: 'Reserved/Sold', value: 4, color: '#3b82f6' },
]

const complaintData = [
  { category: 'Plumbing', count: 12, color: '#3b82f6' },
  { category: 'Electrical', count: 8, color: '#f59e0b' },
  { category: 'Cleaning', count: 15, color: '#22c55e' },
  { category: 'Security', count: 6, color: '#ef4444' },
  { category: 'Other', count: 9, color: '#8b5cf6' },
]

const stats = [
  {
    title: 'Total Units',
    value: '180',
    subtitle: '145 Occupied • 23 Vacant',
    change: '+4 this month',
    trend: 'up',
    icon: Building2,
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    title: 'Monthly Collection',
    value: '₹2,60,000',
    subtitle: '₹7,000 Pending',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-100',
  },
  {
    title: 'Open Complaints',
    value: '23',
    subtitle: '8 High Priority',
    change: '-15% resolved',
    trend: 'down',
    icon: AlertCircle,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-100',
  },
  {
    title: "Today's Visitors",
    value: '48',
    subtitle: '12 Currently Inside',
    change: '+5 from yesterday',
    trend: 'up',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-100',
  },
]

const quickActions = [
  { icon: FileText, label: 'Generate Bills', color: 'bg-blue-500', href: '/dashboard/financial/billing' },
  { icon: Send, label: 'Send Notices', color: 'bg-purple-500', href: '/dashboard/residents/notices' },
  { icon: Users, label: 'Add Visitor', color: 'bg-green-500', href: '/dashboard/security/visitors' },
  { icon: Wrench, label: 'Maintenance', color: 'bg-orange-500', href: '/dashboard/admin/complaints' },
]

const recentActivities = [
  {
    id: 1,
    type: 'payment',
    user: 'Rajesh Kumar',
    unit: 'A-205',
    action: 'Paid maintenance of ₹15,000',
    time: '5 min ago',
    status: 'success',
    avatar: 'RK',
  },
  {
    id: 2,
    type: 'visitor',
    user: 'Security',
    unit: 'B-102',
    action: 'Visitor checked in - Delivery (Amazon)',
    time: '12 min ago',
    status: 'info',
    avatar: 'SC',
  },
  {
    id: 3,
    type: 'complaint',
    user: 'Priya Sharma',
    unit: 'C-304',
    action: 'Reported water leakage - High Priority',
    time: '1 hour ago',
    status: 'warning',
    avatar: 'PS',
  },
  {
    id: 4,
    type: 'booking',
    user: 'Amit Patel',
    unit: 'D-501',
    action: 'Booked Clubhouse for Birthday Party',
    time: '2 hours ago',
    status: 'success',
    avatar: 'AP',
  },
  {
    id: 5,
    type: 'payment',
    user: 'Neha Gupta',
    unit: 'A-108',
    action: 'Payment overdue - ₹22,000 pending',
    time: '3 hours ago',
    status: 'error',
    avatar: 'NG',
  },
]

const upcomingEvents = [
  { name: 'Society AGM', date: 'Jan 15', time: '6:00 PM', attendees: 45 },
  { name: 'Makar Sankranti', date: 'Jan 14', time: '4:00 PM', attendees: 120 },
  { name: 'Yoga Workshop', date: 'Jan 20', time: '7:00 AM', attendees: 25 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export function AdminDashboard() {
  const totalUnits = unitStatusData.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-1"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Society Dashboard
            </h1>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-gray-500">
            Welcome back! Here's what's happening in your society today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Calendar className="h-4 w-4 mr-2" />
            Jan 2025
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="group hover:border-gray-300"
            asChild
          >
            <a href={action.href}>
              <div className={`h-6 w-6 rounded-md ${action.color} flex items-center justify-center mr-2 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-3.5 w-3.5 text-white" />
              </div>
              {action.label}
            </a>
          </Button>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.trend === 'up'

          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
                <CardContent className="p-5 relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-xs text-gray-500 mb-2">{stat.subtitle}</p>
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant="secondary"
                          className={`text-xs px-2 py-0.5 ${
                            isPositive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-0.5" />
                          )}
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Revenue & Collection</CardTitle>
                  <CardDescription>Monthly billing overview</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `₹${v/1000}K`} />
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" name="Billed" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="collected" name="Collected" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorCollected)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Unit Status */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Unit Status</CardTitle>
                  <CardDescription>Total: {totalUnits} units</CardDescription>
                </div>
                <Home className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={unitStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {unitStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} units`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {unitStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-semibold ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints Chart */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Complaints</CardTitle>
                  <CardDescription>By category this month</CardDescription>
                </div>
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={complaintData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" stroke="#6b7280" fontSize={12} />
                  <YAxis type="category" dataKey="category" stroke="#6b7280" fontSize={12} width={70} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {complaintData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Activities</CardTitle>
                  <CardDescription>Latest updates from your society</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`text-xs font-semibold ${
                        activity.status === 'success' ? 'bg-green-100 text-green-700' :
                        activity.status === 'warning' ? 'bg-orange-100 text-orange-700' :
                        activity.status === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{activity.unit}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Society events and activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-white">{event.date}</Badge>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{event.name}</h4>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
