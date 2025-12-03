'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Download,
  Users,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Eye,
  Edit,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Textarea } from '@/components/ui/textarea'

const stats = [
  {
    title: 'Total Vendors',
    value: '32',
    change: '+5',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Active',
    value: '28',
    change: '+3',
    icon: CheckCircle,
    color: 'green',
  },
  {
    title: 'Inactive',
    value: '4',
    change: '-1',
    icon: XCircle,
    color: 'orange',
  },
  {
    title: 'This Month',
    value: '5',
    change: '+2',
    icon: Users,
    color: 'purple',
  },
]

const vendors = [
  {
    id: 'VND-001',
    name: 'ABC Electricals',
    category: 'Electrical',
    contactPerson: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh@abcelectricals.com',
    address: '123 Main Street, Delhi',
    rating: 4.5,
    status: 'active',
    joinDate: '2022-01-15',
    totalJobs: 45,
  },
  {
    id: 'VND-002',
    name: 'Green Clean Services',
    category: 'Cleaning',
    contactPerson: 'Priya Sharma',
    phone: '+91 98765 43211',
    email: 'priya@greenclean.com',
    address: '456 Park Avenue, Delhi',
    rating: 4.8,
    status: 'active',
    joinDate: '2022-03-20',
    totalJobs: 120,
  },
  {
    id: 'VND-003',
    name: 'PlumbPro Solutions',
    category: 'Plumbing',
    contactPerson: 'Amit Patel',
    phone: '+91 98765 43212',
    email: 'amit@plumbpro.com',
    address: '789 Central Road, Delhi',
    rating: 4.3,
    status: 'active',
    joinDate: '2022-06-10',
    totalJobs: 68,
  },
  {
    id: 'VND-004',
    name: 'Security Systems Inc',
    category: 'Security',
    contactPerson: 'Rajesh Singh',
    phone: '+91 98765 43213',
    email: 'rajesh@securitysystems.com',
    address: '321 Market Street, Delhi',
    rating: 4.6,
    status: 'inactive',
    joinDate: '2021-11-05',
    totalJobs: 32,
  },
  {
    id: 'VND-005',
    name: 'Garden Masters',
    category: 'Landscaping',
    contactPerson: 'Neha Gupta',
    phone: '+91 98765 43214',
    email: 'neha@gardenmasters.com',
    address: '654 Green Lane, Delhi',
    rating: 4.7,
    status: 'active',
    joinDate: '2022-08-22',
    totalJobs: 56,
  },
]

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.phone.includes(searchQuery)

    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-600 mt-1">
            Manage all society vendors and service providers
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Vendor</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>
                  Register a new vendor or service provider
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input placeholder="ABC Services" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="landscaping">Landscaping</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contact Person</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input type="tel" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="contact@vendor.com" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea placeholder="Complete address..." rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Services Offered</Label>
                  <Textarea placeholder="List of services..." rows={3} />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Vendor
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
              placeholder="Search by name, contact person, or phone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
              <SelectItem value="Cleaning">Cleaning</SelectItem>
              <SelectItem value="Plumbing">Plumbing</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Landscaping">Landscaping</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Vendors Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Total Jobs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        {vendor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{vendor.name}</p>
                      <p className="text-sm text-gray-500">{vendor.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{vendor.category}</Badge>
                </TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">{vendor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">{vendor.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{vendor.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {vendor.totalJobs}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={vendor.status === 'active' ? 'default' : 'secondary'}
                    className={
                      vendor.status === 'active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    {vendor.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {vendor.status === 'inactive' && <XCircle className="h-3 w-3 mr-1" />}
                    {vendor.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
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
