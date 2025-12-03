'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  QrCode,
  CheckCircle,
  Clock,
  XCircle,
  Camera,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const stats = [
  {
    title: 'Today\'s Visitors',
    value: '48',
    change: '+12 from yesterday',
    icon: Clock,
    color: 'blue',
  },
  {
    title: 'Currently Inside',
    value: '23',
    change: 'Active visitors',
    icon: MapPin,
    color: 'green',
  },
  {
    title: 'Pre-approved',
    value: '15',
    change: 'Pending arrival',
    icon: CheckCircle,
    color: 'purple',
  },
  {
    title: 'This Month',
    value: '1,240',
    change: '+18% from last month',
    icon: Calendar,
    color: 'orange',
  },
]

const visitors = [
  {
    id: '1',
    name: 'Rahul Verma',
    phone: '+91 98765 43210',
    purpose: 'Delivery',
    visitingUnit: 'A-101',
    residentName: 'Rajesh Kumar',
    entryTime: '10:30 AM',
    exitTime: null,
    status: 'checked-in',
    photo: null,
    vehicleNumber: null,
  },
  {
    id: '2',
    name: 'Amit Sharma',
    phone: '+91 98765 43211',
    purpose: 'Guest Visit',
    visitingUnit: 'B-205',
    residentName: 'Priya Sharma',
    entryTime: '11:15 AM',
    exitTime: null,
    status: 'checked-in',
    photo: null,
    vehicleNumber: 'DL 01 AB 1234',
  },
  {
    id: '3',
    name: 'Neha Gupta',
    phone: '+91 98765 43212',
    purpose: 'Maintenance',
    visitingUnit: 'C-304',
    residentName: 'Amit Patel',
    entryTime: '09:00 AM',
    exitTime: '11:30 AM',
    status: 'checked-out',
    photo: null,
    vehicleNumber: null,
  },
  {
    id: '4',
    name: 'Vikram Singh',
    phone: '+91 98765 43213',
    purpose: 'Pre-approved Guest',
    visitingUnit: 'D-108',
    residentName: 'Vikram Singh Sr.',
    entryTime: null,
    exitTime: null,
    status: 'approved',
    photo: null,
    vehicleNumber: 'MH 02 CD 5678',
  },
  {
    id: '5',
    name: 'Ravi Kumar',
    phone: '+91 98765 43214',
    purpose: 'Cab Driver',
    visitingUnit: 'A-502',
    residentName: 'Neha Gupta',
    entryTime: null,
    exitTime: null,
    status: 'pending',
    photo: null,
    vehicleNumber: 'DL 05 EF 9012',
  },
]

export default function VisitorsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVisitors = visitors.filter((visitor) => {
    return (
      visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.visitingUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.phone.includes(searchQuery)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visitor Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage visitor entries and exits
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <QrCode className="h-4 w-4" />
            <span>Scan QR</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Visitor</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register New Visitor</DialogTitle>
                <DialogDescription>
                  Enter visitor details for check-in
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Visitor Name *</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Visiting Unit *</Label>
                    <Input placeholder="e.g., A-101" />
                  </div>
                  <div className="space-y-2">
                    <Label>Purpose of Visit *</Label>
                    <Input placeholder="e.g., Guest Visit" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Number (Optional)</Label>
                  <Input placeholder="e.g., DL 01 AB 1234" />
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Any additional information..." rows={3} />
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="flex-1 space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Capture Photo</span>
                  </Button>
                  <Button variant="outline" className="flex-1 space-x-2">
                    <QrCode className="h-4 w-4" />
                    <span>Generate QR Pass</span>
                  </Button>
                </div>
                <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Check In Visitor
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'purple'
                        ? 'bg-purple-100'
                        : 'bg-orange-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === 'blue'
                          ? 'text-blue-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-orange-600'
                      }`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name, unit, or phone number..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Visitors Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Visiting Unit</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Entry Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.map((visitor) => (
              <TableRow key={visitor.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={visitor.photo || undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {visitor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{visitor.name}</p>
                      {visitor.vehicleNumber && (
                        <p className="text-xs text-gray-500">
                          {visitor.vehicleNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{visitor.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{visitor.visitingUnit}</p>
                    <p className="text-xs text-gray-500">{visitor.residentName}</p>
                  </div>
                </TableCell>
                <TableCell>{visitor.purpose}</TableCell>
                <TableCell>
                  {visitor.entryTime || (
                    <span className="text-gray-400">Not yet</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      visitor.status === 'checked-in'
                        ? 'default'
                        : visitor.status === 'checked-out'
                        ? 'secondary'
                        : visitor.status === 'approved'
                        ? 'default'
                        : 'secondary'
                    }
                    className={
                      visitor.status === 'checked-in'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : visitor.status === 'checked-out'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        : visitor.status === 'approved'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {visitor.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {visitor.status === 'checked-in' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Check Out
                      </Button>
                    )}
                    {visitor.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {visitor.status === 'approved' && (
                      <Button variant="outline" size="sm" className="text-blue-600">
                        Check In
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
