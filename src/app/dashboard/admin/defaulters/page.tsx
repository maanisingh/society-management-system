'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Send,
  Clock,
  Eye,
  History,
  CheckCircle2,
  IndianRupee,
  Phone,
  User,
  Home,
  AlertTriangle,
  Receipt,
  CalendarClock,
  BadgeDollarSign,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Slider } from '@/components/ui/slider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'

// Mock data for defaulters
const defaulters = [
  {
    id: 'DEF-001',
    unit: 'A-101',
    block: 'A',
    ownerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    outstandingAmount: 45000,
    dueSince: '2024-09-01',
    lastPaymentDate: '2024-08-15',
    lastPaymentAmount: 15000,
    status: 'critical',
    dueDays: 140,
    invoices: [
      { id: 'INV-001', month: 'Sep 2024', amount: 15000, dueDate: '2024-09-10' },
      { id: 'INV-002', month: 'Oct 2024', amount: 15000, dueDate: '2024-10-10' },
      { id: 'INV-003', month: 'Nov 2024', amount: 15000, dueDate: '2024-11-10' },
    ],
    reminders: 5,
    lateFees: 4500,
  },
  {
    id: 'DEF-002',
    unit: 'B-205',
    block: 'B',
    ownerName: 'Priya Sharma',
    phone: '+91 98765 43211',
    outstandingAmount: 30000,
    dueSince: '2024-10-01',
    lastPaymentDate: '2024-09-20',
    lastPaymentAmount: 15000,
    status: 'high',
    dueDays: 110,
    invoices: [
      { id: 'INV-004', month: 'Oct 2024', amount: 15000, dueDate: '2024-10-10' },
      { id: 'INV-005', month: 'Nov 2024', amount: 15000, dueDate: '2024-11-10' },
    ],
    reminders: 3,
    lateFees: 3000,
  },
  {
    id: 'DEF-003',
    unit: 'C-304',
    block: 'C',
    ownerName: 'Amit Patel',
    phone: '+91 98765 43212',
    outstandingAmount: 15000,
    dueSince: '2024-11-01',
    lastPaymentDate: '2024-10-25',
    lastPaymentAmount: 15000,
    status: 'medium',
    dueDays: 79,
    invoices: [
      { id: 'INV-006', month: 'Nov 2024', amount: 15000, dueDate: '2024-11-10' },
    ],
    reminders: 2,
    lateFees: 1500,
  },
  {
    id: 'DEF-004',
    unit: 'A-502',
    block: 'A',
    ownerName: 'Neha Gupta',
    phone: '+91 98765 43213',
    outstandingAmount: 60000,
    dueSince: '2024-08-01',
    lastPaymentDate: '2024-07-18',
    lastPaymentAmount: 15000,
    status: 'critical',
    dueDays: 171,
    invoices: [
      { id: 'INV-007', month: 'Aug 2024', amount: 15000, dueDate: '2024-08-10' },
      { id: 'INV-008', month: 'Sep 2024', amount: 15000, dueDate: '2024-09-10' },
      { id: 'INV-009', month: 'Oct 2024', amount: 15000, dueDate: '2024-10-10' },
      { id: 'INV-010', month: 'Nov 2024', amount: 15000, dueDate: '2024-11-10' },
    ],
    reminders: 8,
    lateFees: 6000,
  },
  {
    id: 'DEF-005',
    unit: 'D-108',
    block: 'D',
    ownerName: 'Vikram Singh',
    phone: '+91 98765 43214',
    outstandingAmount: 15000,
    dueSince: '2024-12-01',
    lastPaymentDate: '2024-11-05',
    lastPaymentAmount: 15000,
    status: 'low',
    dueDays: 49,
    invoices: [
      { id: 'INV-011', month: 'Dec 2024', amount: 15000, dueDate: '2024-12-10' },
    ],
    reminders: 1,
    lateFees: 750,
  },
]

// Calculate late fees automatically (10% per month overdue)
const calculateLateFees = (outstandingAmount: number, dueDays: number): number => {
  const monthsOverdue = Math.floor(dueDays / 30)
  const lateFeeRate = 0.10 // 10% per month
  return Math.round(outstandingAmount * lateFeeRate * monthsOverdue)
}

// Apply late fees to all defaulters
const defaultersWithCalculatedFees = defaulters.map(defaulter => ({
  ...defaulter,
  calculatedLateFees: calculateLateFees(defaulter.outstandingAmount, defaulter.dueDays),
}))

const stats = [
  {
    title: 'Total Outstanding',
    value: '₹1,95,000',
    change: '+₹15,000 this month',
    icon: DollarSign,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    pulse: true,
  },
  {
    title: 'Number of Defaulters',
    value: '5',
    change: '+1 from last month',
    icon: Users,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    title: 'Average Due Days',
    value: '110 days',
    change: 'Increased by 5 days',
    icon: Calendar,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: 'down',
  },
  {
    title: 'Late Fees Generated',
    value: '₹15,750',
    change: 'Auto-calculated',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    trend: 'up',
  },
]

// Defaulter detail dialog
function DefaulterDetailDialog({
  defaulter,
  onSendReminder,
  onApplyLateFee,
  onMarkPaid
}: {
  defaulter: typeof defaultersWithCalculatedFees[0]
  onSendReminder?: (id: string) => void
  onApplyLateFee?: (id: string) => void
  onMarkPaid?: (id: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [remarks, setRemarks] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <span className="text-muted-foreground font-normal">{defaulter.id}</span>
              </DialogTitle>
              <h3 className="text-xl font-semibold mt-1">{defaulter.unit} - {defaulter.ownerName}</h3>
            </div>
            <Badge
              className={`${
                defaulter.status === 'critical'
                  ? 'bg-red-100 text-red-700'
                  : defaulter.status === 'high'
                  ? 'bg-orange-100 text-orange-700'
                  : defaulter.status === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {defaulter.status === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {defaulter.status.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <BadgeDollarSign className="h-5 w-5 text-red-600" />
                <p className="text-sm font-medium text-red-900">Outstanding</p>
              </div>
              <p className="text-2xl font-bold text-red-700">₹{defaulter.outstandingAmount.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <CalendarClock className="h-5 w-5 text-orange-600" />
                <p className="text-sm font-medium text-orange-900">Due Days</p>
              </div>
              <p className="text-2xl font-bold text-orange-700">{defaulter.dueDays} days</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-900">Late Fees</p>
              </div>
              <p className="text-2xl font-bold text-yellow-700">₹{defaulter.calculatedLateFees.toLocaleString()}</p>
            </div>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                  {defaulter.ownerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Owner</p>
                <p className="font-medium">{defaulter.ownerName}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {defaulter.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="p-2 rounded-lg bg-blue-100">
                <Home className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unit Details</p>
                <p className="font-medium">{defaulter.unit}</p>
                <p className="text-xs text-muted-foreground">Block {defaulter.block}</p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <History className="h-4 w-4" />
              Last Payment
            </h4>
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-900 font-medium">₹{defaulter.lastPaymentAmount.toLocaleString()}</p>
                  <p className="text-xs text-green-700">{new Date(defaulter.lastPaymentDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Outstanding Invoices */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Outstanding Invoices ({defaulter.invoices.length})
            </h4>
            <div className="space-y-2">
              {defaulter.invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                  <div>
                    <p className="font-medium text-sm">{invoice.id}</p>
                    <p className="text-xs text-muted-foreground">{invoice.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">₹{invoice.amount.toLocaleString()}</p>
                    <p className="text-xs text-red-600">Due: {new Date(invoice.dueDate).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders Sent */}
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Reminders Sent</p>
                  <p className="text-xs text-blue-700">Total notifications sent to the owner</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-700">{defaulter.reminders}</p>
            </div>
          </div>

          {/* Add Remarks */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium">Add Remarks</h4>
            <Textarea
              placeholder="Add any notes or comments about this defaulter..."
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                onSendReminder?.(defaulter.id)
                setIsOpen(false)
              }}
            >
              <Send className="h-4 w-4" />
              Send Reminder
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              onClick={() => {
                onApplyLateFee?.(defaulter.id)
                setIsOpen(false)
              }}
            >
              <AlertCircle className="h-4 w-4" />
              Apply Late Fee
            </Button>
            <Button
              className="gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => {
                onMarkPaid?.(defaulter.id)
                setIsOpen(false)
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark as Paid
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function DefaultersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [blockFilter, setBlockFilter] = useState('all')
  const [dueDaysFilter, setDueDaysFilter] = useState('all')
  const [amountRange, setAmountRange] = useState([0, 100000])
  const [showSuccess, setShowSuccess] = useState<string | null>(null)

  // Show success notification
  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  // Handle actions
  const handleSendReminder = (defaulterId: string) => {
    showNotification(`Reminder sent to ${defaulterId}`)
  }

  const handleApplyLateFee = (defaulterId: string) => {
    const defaulter = defaultersWithCalculatedFees.find(d => d.id === defaulterId)
    if (defaulter) {
      showNotification(`Late fee of ₹${defaulter.calculatedLateFees.toLocaleString()} applied to ${defaulterId}`)
    }
  }

  const handleMarkPaid = (defaulterId: string) => {
    showNotification(`${defaulterId} marked as paid`)
  }

  const handleViewHistory = (defaulterId: string) => {
    showNotification(`Viewing payment history for ${defaulterId}`)
  }

  // Filter defaulters
  const filteredDefaulters = defaultersWithCalculatedFees.filter((defaulter) => {
    const matchesSearch =
      defaulter.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defaulter.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defaulter.phone.includes(searchQuery) ||
      defaulter.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBlock = blockFilter === 'all' || defaulter.block === blockFilter

    const matchesDueDays =
      dueDaysFilter === 'all' ||
      (dueDaysFilter === '30' && defaulter.dueDays <= 30) ||
      (dueDaysFilter === '60' && defaulter.dueDays > 30 && defaulter.dueDays <= 60) ||
      (dueDaysFilter === '90' && defaulter.dueDays > 60 && defaulter.dueDays <= 90) ||
      (dueDaysFilter === '90+' && defaulter.dueDays > 90)

    const matchesAmount =
      defaulter.outstandingAmount >= amountRange[0] &&
      defaulter.outstandingAmount <= amountRange[1]

    return matchesSearch && matchesBlock && matchesDueDays && matchesAmount
  })

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              {showSuccess}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-600">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Defaulter Management
                </h1>
                <p className="text-muted-foreground text-sm">
                  Track and manage payment defaulters with auto-calculated late fees
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white gap-2 shadow-lg shadow-teal-500/25">
              <Send className="h-4 w-4" />
              Send Bulk Reminder
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {stat.value}
                        </h3>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.trend === 'up' && (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          )}
                          <p className="text-sm text-muted-foreground">{stat.change}</p>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor} relative`}>
                        {stat.pulse && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by unit, owner, phone, or ID..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={blockFilter} onValueChange={setBlockFilter}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Blocks</SelectItem>
                      <SelectItem value="A">Block A</SelectItem>
                      <SelectItem value="B">Block B</SelectItem>
                      <SelectItem value="C">Block C</SelectItem>
                      <SelectItem value="D">Block D</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dueDaysFilter} onValueChange={setDueDaysFilter}>
                    <SelectTrigger className="w-[140px]">
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Due Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Days</SelectItem>
                      <SelectItem value="30">0-30 Days</SelectItem>
                      <SelectItem value="60">31-60 Days</SelectItem>
                      <SelectItem value="90">61-90 Days</SelectItem>
                      <SelectItem value="90+">90+ Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Amount Range Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Amount Range</Label>
                  <span className="text-sm text-muted-foreground">
                    ₹{amountRange[0].toLocaleString()} - ₹{amountRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={amountRange}
                  onValueChange={setAmountRange}
                  min={0}
                  max={100000}
                  step={5000}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Defaulters Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center justify-between">
              <span>Defaulters List</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {filteredDefaulters.length} Defaulters
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Unit</TableHead>
                    <TableHead className="font-semibold">Owner Name</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Outstanding Amount</TableHead>
                    <TableHead className="font-semibold">Due Since</TableHead>
                    <TableHead className="font-semibold">Last Payment Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredDefaulters.map((defaulter, index) => (
                      <motion.tr
                        key={defaulter.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-blue-100">
                              <Home className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{defaulter.unit}</p>
                              <p className="text-xs text-muted-foreground">Block {defaulter.block}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-xs">
                                {defaulter.ownerName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{defaulter.ownerName}</p>
                              <p className="text-xs text-muted-foreground">{defaulter.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {defaulter.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-bold text-red-600">
                              ₹{defaulter.outstandingAmount.toLocaleString()}
                            </p>
                            <p className="text-xs text-orange-600">
                              +₹{defaulter.calculatedLateFees.toLocaleString()} late fee
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">
                              {new Date(defaulter.dueSince).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short'
                              })}
                            </p>
                            <p className="text-xs text-red-600 font-medium">
                              {defaulter.dueDays} days ago
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">
                              {new Date(defaulter.lastPaymentDate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ₹{defaulter.lastPaymentAmount.toLocaleString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`font-medium ${
                              defaulter.status === 'critical'
                                ? 'bg-red-100 text-red-700 hover:bg-red-100'
                                : defaulter.status === 'high'
                                ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                                : defaulter.status === 'medium'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            }`}
                          >
                            {defaulter.status === 'critical' && (
                              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                            )}
                            {defaulter.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <DefaulterDetailDialog
                              defaulter={defaulter}
                              onSendReminder={handleSendReminder}
                              onApplyLateFee={handleApplyLateFee}
                              onMarkPaid={handleMarkPaid}
                            />

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <span className="hidden sm:inline">Actions</span>
                                  <Filter className="h-3.5 w-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => handleSendReminder(defaulter.id)}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => handleApplyLateFee(defaulter.id)}
                                >
                                  <AlertCircle className="h-4 w-4 mr-2" />
                                  Apply Late Fee
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => handleViewHistory(defaulter.id)}
                                >
                                  <History className="h-4 w-4 mr-2" />
                                  View Payment History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() => handleMarkPaid(defaulter.id)}
                                  className="text-green-600"
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Mark as Paid
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {filteredDefaulters.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No defaulters found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  )
}
