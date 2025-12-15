'use client'

import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import {
  Home,
  Users,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  DollarSign,
  Clock,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data - replace with actual API calls
const unitDetails = {
  unitNumber: 'A-205',
  tower: 'Tower A',
  floor: '2nd Floor',
  type: '3 BHK',
  area: '1,450 sq.ft',
  status: 'Occupied',
  moveInDate: 'Jan 15, 2023',
}

const residents = [
  {
    name: 'Rajesh Kumar',
    relation: 'Owner',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    age: 45,
    isOwner: true,
  },
  {
    name: 'Priya Kumar',
    relation: 'Spouse',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    age: 42,
    isOwner: false,
  },
  {
    name: 'Aarav Kumar',
    relation: 'Son',
    phone: '+91 98765 43212',
    email: 'aarav@example.com',
    age: 18,
    isOwner: false,
  },
]

const paymentHistory = [
  {
    id: 'INV-2024-001',
    month: 'December 2024',
    amount: 8500,
    dueDate: '2024-12-05',
    paidDate: '2024-12-03',
    status: 'paid',
    type: 'Maintenance',
  },
  {
    id: 'INV-2024-002',
    month: 'November 2024',
    amount: 8500,
    dueDate: '2024-11-05',
    paidDate: '2024-11-02',
    status: 'paid',
    type: 'Maintenance',
  },
  {
    id: 'INV-2024-003',
    month: 'October 2024',
    amount: 8500,
    dueDate: '2024-10-05',
    paidDate: '2024-10-04',
    status: 'paid',
    type: 'Maintenance',
  },
]

const pendingPayments = [
  {
    id: 'INV-2025-001',
    description: 'Monthly Maintenance - January 2025',
    amount: 8500,
    dueDate: '2025-01-05',
    status: 'pending',
  },
]

const vehicles = [
  {
    id: '1',
    number: 'MH 02 AB 1234',
    type: 'Car',
    brand: 'Honda City',
    color: 'White',
    parkingSlot: 'A-205-1',
  },
  {
    id: '2',
    number: 'MH 02 CD 5678',
    type: 'Bike',
    brand: 'Royal Enfield',
    color: 'Black',
    parkingSlot: 'A-205-2',
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

export default function MyUnitPage() {
  const { user } = useAuthStore()

  return (
    <RoleGuard allowedRoles={['resident']}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Unit</h1>
            <p className="text-gray-600 mt-1">
              View your unit details and manage information
            </p>
          </div>
        </div>

        {/* Unit Details Card */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Unit {unitDetails.unitNumber}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {unitDetails.tower} • {unitDetails.floor}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {unitDetails.type} • {unitDetails.area}
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {unitDetails.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Move-in Date: {unitDetails.moveInDate}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pending Payments Alert */}
        {pendingPayments.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="p-4 border-orange-200 bg-orange-50">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Payment Due
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    You have {pendingPayments.length} pending payment(s)
                  </p>
                  <div className="mt-3 space-y-2">
                    {pendingPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due: {payment.dueDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{payment.amount.toLocaleString()}
                          </p>
                          <Button
                            size="sm"
                            className="mt-2 bg-orange-600 hover:bg-orange-700"
                            onClick={() => alert(`Redirecting to payment gateway...\n\nAmount: ₹${payment.amount.toLocaleString()}\nDescription: ${payment.description}`)}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Residents & Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Residents */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Residents
                  </h3>
                  <p className="text-sm text-gray-600">
                    {residents.length} members
                  </p>
                </div>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {residents.map((resident, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {resident.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">
                          {resident.name}
                        </p>
                        {resident.isOwner && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700"
                          >
                            Owner
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {resident.relation} • Age {resident.age}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <a
                          href={`tel:${resident.phone}`}
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          {resident.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => alert('Add Family Member\n\nOpening form to add a new family member to your unit...')}>
                Add Family Member
              </Button>
            </Card>
          </motion.div>

          {/* Registered Vehicles */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Registered Vehicles
                  </h3>
                  <p className="text-sm text-gray-600">
                    {vehicles.length} vehicles
                  </p>
                </div>
                <Home className="h-5 w-5 text-purple-600" />
              </div>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {vehicle.number}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {vehicle.brand} • {vehicle.color}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {vehicle.type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Slot: {vehicle.parkingSlot}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => alert('Register New Vehicle\n\nOpening form to register a new vehicle...')}>
                Register New Vehicle
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Payment History */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment History
                </h3>
                <p className="text-sm text-gray-600">Recent transactions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => alert('Downloading payment history as PDF...')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.id}
                      </TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>{payment.paidDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => alert(`Invoice Details:\n\nID: ${payment.id}\nPeriod: ${payment.month}\nType: ${payment.type}\nAmount: ₹${payment.amount.toLocaleString()}\nDue Date: ${payment.dueDate}\nPaid Date: ${payment.paidDate}\nStatus: ${payment.status}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </RoleGuard>
  )
}
