'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Users,
  Car,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Phone,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock data - replace with actual API calls
const securityStats = [
  {
    title: "Today's Visitors",
    value: '48',
    subtitle: '12 currently inside',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Pending Approvals',
    value: '5',
    subtitle: 'Vehicles awaiting entry',
    icon: Car,
    color: 'orange',
    action: 'Review',
  },
  {
    title: 'Parcels Received',
    value: '23',
    subtitle: '8 pending pickup',
    icon: Package,
    color: 'green',
  },
  {
    title: 'Active Alerts',
    value: '1',
    subtitle: 'Emergency protocol active',
    icon: AlertTriangle,
    color: 'red',
  },
]

const recentVisitors = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    unit: 'A-205',
    purpose: 'Personal Visit',
    time: '10:30 AM',
    status: 'inside',
    phone: '+91 98765 43210',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    unit: 'B-101',
    purpose: 'Delivery',
    time: '10:15 AM',
    status: 'exited',
    phone: '+91 98765 43211',
  },
  {
    id: 3,
    name: 'Amit Verma',
    unit: 'C-305',
    purpose: 'Maintenance Work',
    time: '09:45 AM',
    status: 'inside',
    phone: '+91 98765 43212',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    unit: 'A-102',
    purpose: 'Guest',
    time: '09:20 AM',
    status: 'exited',
    phone: '+91 98765 43213',
  },
]

const pendingVehicles = [
  {
    id: 1,
    vehicle: 'MH 02 AB 1234',
    unit: 'A-205',
    resident: 'Rajesh Kumar',
    type: 'Guest Vehicle',
    time: '5 mins ago',
  },
  {
    id: 2,
    vehicle: 'MH 04 CD 5678',
    unit: 'B-301',
    resident: 'Amit Sharma',
    type: 'Delivery Van',
    time: '12 mins ago',
  },
  {
    id: 3,
    vehicle: 'MH 12 EF 9012',
    unit: 'C-105',
    resident: 'Priya Desai',
    type: 'Guest Vehicle',
    time: '18 mins ago',
  },
]

const emergencyContacts = [
  { name: 'Police Station', number: '100', icon: Shield },
  { name: 'Fire Brigade', number: '101', icon: AlertTriangle },
  { name: 'Ambulance', number: '102', icon: Phone },
  { name: 'Society Admin', number: '+91 98765 00000', icon: Phone },
]

const recentAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Unauthorized vehicle detected at Gate 2',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'info',
    message: 'Fire drill scheduled for tomorrow at 3 PM',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'success',
    message: 'All gates security check completed successfully',
    time: '1 day ago',
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

export function SecurityDashboard() {
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
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage society security.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/security/visitors">
            <Button variant="outline">Check-in Visitor</Button>
          </Link>
          <Link href="/dashboard/security/vehicles">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Register Vehicle
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {securityStats.map((stat, index) => {
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
        {/* Recent Visitors */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Visitors
                </h3>
                <p className="text-sm text-gray-600">Today's visitor log</p>
              </div>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {recentVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {visitor.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Unit: {visitor.unit} • {visitor.purpose}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {visitor.phone}
                      </p>
                    </div>
                    <Badge
                      variant={
                        visitor.status === 'inside' ? 'default' : 'secondary'
                      }
                      className={
                        visitor.status === 'inside'
                          ? 'bg-green-100 text-green-700'
                          : ''
                      }
                    >
                      {visitor.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {visitor.time}
                    </div>
                    {visitor.status === 'inside' && (
                      <Button size="sm" variant="outline">
                        Check Out
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/security/visitors">
              <Button variant="outline" className="w-full mt-4">
                View All Visitors
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Pending Vehicle Approvals */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Pending Vehicle Approvals
                </h3>
                <p className="text-sm text-gray-600">Vehicles awaiting entry</p>
              </div>
              <Car className="h-5 w-5 text-orange-600" />
            </div>
            <div className="space-y-4">
              {pendingVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-4 rounded-lg border border-orange-100 bg-orange-50/30 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {vehicle.vehicle}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Unit: {vehicle.unit} • {vehicle.resident}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {vehicle.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {vehicle.time}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/security/vehicles">
              <Button variant="outline" className="w-full mt-4">
                View All Vehicles
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>

      {/* Emergency Contacts & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm bg-gradient-to-br from-red-50 to-orange-50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Emergency Contacts
                </h3>
                <p className="text-sm text-gray-600">Quick access numbers</p>
              </div>
              <Phone className="h-5 w-5 text-red-600" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Icon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </p>
                        <a
                          href={`tel:${contact.number}`}
                          className="text-lg font-bold text-blue-600 hover:text-blue-700"
                        >
                          {contact.number}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Alerts
                </h3>
                <p className="text-sm text-gray-600">System notifications</p>
              </div>
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        alert.type === 'warning'
                          ? 'bg-orange-100'
                          : alert.type === 'success'
                          ? 'bg-green-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {alert.type === 'warning' ? (
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      ) : alert.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Bell className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
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
