'use client'

import { motion } from 'framer-motion'
import {
  Home,
  CreditCard,
  AlertCircle,
  Calendar,
  Bell,
  Users,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock data - replace with actual API calls
const residentStats = [
  {
    title: 'Unit Details',
    value: 'A-205',
    subtitle: 'Tower A, 2nd Floor',
    icon: Home,
    color: 'blue',
  },
  {
    title: 'Payment Due',
    value: '₹8,500',
    subtitle: 'Due by Dec 15',
    icon: CreditCard,
    color: 'orange',
    action: 'Pay Now',
  },
  {
    title: 'My Complaints',
    value: '2',
    subtitle: '1 pending, 1 resolved',
    icon: AlertCircle,
    color: 'red',
  },
  {
    title: 'Amenity Bookings',
    value: '1',
    subtitle: 'Clubhouse on Dec 20',
    icon: Calendar,
    color: 'green',
  },
]

const recentNotices = [
  {
    id: 1,
    title: 'Water Supply Interruption',
    description: 'Water supply will be interrupted on Dec 10 from 10 AM to 2 PM',
    date: '2 hours ago',
    type: 'urgent',
  },
  {
    id: 2,
    title: 'Annual General Meeting',
    description: 'AGM scheduled for December 25th at 6 PM in the clubhouse',
    date: '1 day ago',
    type: 'important',
  },
  {
    id: 3,
    title: 'New Gym Equipment',
    description: 'New gym equipment has been installed. Check it out!',
    date: '3 days ago',
    type: 'info',
  },
]

const myVisitors = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    purpose: 'Personal Visit',
    time: '2 hours ago',
    status: 'approved',
  },
  {
    id: 2,
    name: 'Amazon Delivery',
    purpose: 'Package Delivery',
    time: '5 hours ago',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Plumber - Ram Services',
    purpose: 'Maintenance',
    time: 'Yesterday',
    status: 'completed',
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Diwali Celebration',
    date: 'Dec 15, 2024',
    time: '6:00 PM',
    location: 'Community Hall',
  },
  {
    id: 2,
    title: 'Yoga Session',
    date: 'Every Monday',
    time: '7:00 AM',
    location: 'Clubhouse',
  },
  {
    id: 3,
    title: 'Kids Play Day',
    date: 'Dec 22, 2024',
    time: '4:00 PM',
    location: 'Play Area',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export function ResidentDashboard() {
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
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/residents/amenities">
            <Button variant="outline">Book Amenity</Button>
          </Link>
          <Link href="/dashboard/admin/complaints">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Raise Complaint
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {residentStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'red'
                        ? 'bg-red-100'
                        : 'bg-orange-100'
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
                          : 'text-orange-600'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  {stat.action && (
                    <Button
                      className="mt-3 w-full bg-orange-600 hover:bg-orange-700"
                      size="sm"
                    >
                      {stat.action}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Notices
                </h3>
                <p className="text-sm text-gray-600">Important announcements</p>
              </div>
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4">
              {recentNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{notice.title}</h4>
                    <Badge
                      variant={
                        notice.type === 'urgent'
                          ? 'destructive'
                          : notice.type === 'important'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {notice.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notice.description}
                  </p>
                  <p className="text-xs text-gray-400">{notice.date}</p>
                </div>
              ))}
            </div>
            <Link href="/dashboard/residents/notices">
              <Button variant="outline" className="w-full mt-4">
                View All Notices
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* My Recent Visitors */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Visitors
                </h3>
                <p className="text-sm text-gray-600">Visitor history</p>
              </div>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              {myVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      visitor.status === 'approved'
                        ? 'bg-blue-100'
                        : 'bg-green-100'
                    }`}
                  >
                    {visitor.status === 'approved' ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {visitor.name}
                    </p>
                    <p className="text-sm text-gray-600">{visitor.purpose}</p>
                    <p className="text-xs text-gray-400 mt-1">{visitor.time}</p>
                  </div>
                  <Badge
                    variant={
                      visitor.status === 'approved' ? 'default' : 'secondary'
                    }
                  >
                    {visitor.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link href="/dashboard/security/visitors">
              <Button variant="outline" className="w-full mt-4">
                Pre-approve Visitor
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Events
              </h3>
              <p className="text-sm text-gray-600">Community activities</p>
            </div>
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {event.title}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/residents/events">
            <Button variant="outline" className="w-full mt-4">
              View All Events
            </Button>
          </Link>
        </Card>
      </motion.div>
    </motion.div>
  )
}
