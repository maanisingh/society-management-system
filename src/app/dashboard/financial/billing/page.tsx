'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const stats = [
  {
    title: 'Total Billed',
    value: '₹12,45,000',
    change: '+12%',
    icon: DollarSign,
    color: 'blue',
  },
  {
    title: 'Collected',
    value: '₹10,85,000',
    change: '+8%',
    icon: TrendingUp,
    color: 'green',
  },
  {
    title: 'Pending',
    value: '₹1,60,000',
    change: '-5%',
    icon: Calendar,
    color: 'orange',
  },
  {
    title: 'Active Members',
    value: '248',
    change: '+3',
    icon: Users,
    color: 'purple',
  },
]

const invoices = [
  {
    id: 'INV-2025-001',
    unit: 'A-101',
    resident: 'Rajesh Kumar',
    amount: 15000,
    dueDate: '2025-01-05',
    status: 'paid',
    paidDate: '2025-01-03',
  },
  {
    id: 'INV-2025-002',
    unit: 'B-205',
    resident: 'Priya Sharma',
    amount: 18500,
    dueDate: '2025-01-05',
    status: 'paid',
    paidDate: '2025-01-04',
  },
  {
    id: 'INV-2025-003',
    unit: 'C-304',
    resident: 'Amit Patel',
    amount: 16200,
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
  },
  {
    id: 'INV-2025-004',
    unit: 'A-502',
    resident: 'Neha Gupta',
    amount: 22000,
    dueDate: '2024-12-20',
    status: 'overdue',
    paidDate: null,
  },
  {
    id: 'INV-2025-005',
    unit: 'D-108',
    resident: 'Vikram Singh',
    amount: 14500,
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
  },
]

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <RoleGuard allowedRoles={['admin']}>

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing Management</h1>
          <p className="text-gray-600 mt-1">
            Manage invoices, track payments, and generate bills
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Generate Bills</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Generate Monthly Bills</DialogTitle>
                <DialogDescription>
                  Create and send invoices to all or selected units
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Billing Month</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan-2025">January 2025</SelectItem>
                      <SelectItem value="dec-2024">December 2024</SelectItem>
                      <SelectItem value="nov-2024">November 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bill Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Units</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Units</SelectItem>
                      <SelectItem value="block-a">Block A</SelectItem>
                      <SelectItem value="block-b">Block B</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Total Units: 248</p>
                    <p className="text-sm text-gray-600">
                      Estimated Amount: ₹37,20,000
                    </p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Generate & Send
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
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === 'blue'
                          ? 'text-blue-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'orange'
                          ? 'text-orange-600'
                          : 'text-purple-600'
                      }`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by unit, resident, or invoice number..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Resident</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.unit}</TableCell>
                <TableCell>{invoice.resident}</TableCell>
                <TableCell className="font-semibold">
                  ₹{invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === 'paid'
                        ? 'default'
                        : invoice.status === 'overdue'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : invoice.status === 'overdue'
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Send Reminder">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
    </RoleGuard>
  )
}
