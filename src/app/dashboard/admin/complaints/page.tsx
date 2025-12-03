'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Image as ImageIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const stats = [
  {
    title: 'Open Complaints',
    value: '23',
    change: '+3 from last week',
    icon: AlertCircle,
    color: 'red',
  },
  {
    title: 'In Progress',
    value: '15',
    change: 'Being resolved',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Resolved This Month',
    value: '142',
    change: '+18% from last month',
    icon: CheckCircle2,
    color: 'green',
  },
  {
    title: 'Avg. Resolution Time',
    value: '2.3 days',
    change: '-0.5 days',
    icon: Clock,
    color: 'blue',
  },
]

const complaints = [
  {
    id: 'CMP-2025-001',
    title: 'Water Leakage in Bathroom',
    description: 'Continuous water leakage from the ceiling of bathroom',
    category: 'maintenance',
    priority: 'high',
    status: 'open',
    reportedBy: 'Rajesh Kumar',
    unit: 'A-101',
    createdAt: '2 hours ago',
    assignedTo: null,
    images: 2,
  },
  {
    id: 'CMP-2025-002',
    title: 'Lift Not Working - Block B',
    description: 'Lift in Block B is stuck on 5th floor',
    category: 'maintenance',
    priority: 'urgent',
    status: 'in_progress',
    reportedBy: 'Priya Sharma',
    unit: 'B-205',
    createdAt: '5 hours ago',
    assignedTo: 'Maintenance Team',
    images: 1,
  },
  {
    id: 'CMP-2025-003',
    title: 'Noise Disturbance',
    description: 'Loud music from neighboring unit after 11 PM',
    category: 'noise',
    priority: 'medium',
    status: 'open',
    reportedBy: 'Amit Patel',
    unit: 'C-304',
    createdAt: '1 day ago',
    assignedTo: null,
    images: 0,
  },
  {
    id: 'CMP-2024-345',
    title: 'Garden Maintenance Required',
    description: 'Plants need watering and trimming',
    category: 'cleanliness',
    priority: 'low',
    status: 'resolved',
    reportedBy: 'Neha Gupta',
    unit: 'A-502',
    createdAt: '3 days ago',
    assignedTo: 'Gardening Team',
    images: 3,
  },
  {
    id: 'CMP-2024-344',
    title: 'Security Camera Not Working',
    description: 'Camera near gate 2 is offline',
    category: 'security',
    priority: 'high',
    status: 'in_progress',
    reportedBy: 'Vikram Singh',
    unit: 'D-108',
    createdAt: '4 days ago',
    assignedTo: 'Security Team',
    images: 0,
  },
]

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  const isResident = user?.role === 'resident'

  // For residents, show only their complaints (mock: filter by unit)
  const userComplaints = isResident
    ? complaints.filter((c) => c.unit === user?.unit || c.reportedBy === user?.name)
    : complaints

  const filteredComplaints = userComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter
    const matchesPriority =
      priorityFilter === 'all' || complaint.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Customize stats based on role
  const displayStats = isResident
    ? [
        { ...stats[0], title: 'My Open Complaints', value: '2' },
        { ...stats[1], title: 'In Progress', value: '1' },
        { ...stats[2], title: 'Resolved', value: '8' },
        { ...stats[3], title: 'Avg. Resolution', value: '2.5 days' },
      ]
    : stats

  return (
    <RoleGuard allowedRoles={['admin', 'resident']}>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isAdmin ? 'Complaints Management' : 'My Complaints'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin
              ? 'Track and resolve resident complaints efficiently'
              : 'View and raise complaints or maintenance requests'}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Complaint</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Complaint</DialogTitle>
              <DialogDescription>
                Submit a new complaint or maintenance request
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Complaint Title *</Label>
                <Input placeholder="Brief title of the issue" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="cleanliness">Cleanliness</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="noise">Noise</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Detailed Description *</Label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Attach Images (Optional)</Label>
                <Button variant="outline" className="w-full space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Upload Images</span>
                </Button>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Submit Complaint
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => {
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
                      stat.color === 'red'
                        ? 'bg-red-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === 'red'
                          ? 'text-red-600'
                          : stat.color === 'orange'
                          ? 'text-orange-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : 'text-blue-600'
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
              placeholder="Search complaints..."
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
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Complaints Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complaint ID</TableHead>
              <TableHead>Title</TableHead>
              {isAdmin && <TableHead>Unit</TableHead>}
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && <TableHead>Assigned To</TableHead>}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">{complaint.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{complaint.title}</p>
                    <p className="text-sm text-gray-500">
                      {complaint.createdAt}
                    </p>
                    {complaint.images > 0 && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {complaint.images} images
                      </Badge>
                    )}
                  </div>
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    <div>
                      <p className="font-medium">{complaint.unit}</p>
                      <p className="text-xs text-gray-500">
                        {complaint.reportedBy}
                      </p>
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {complaint.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      complaint.priority === 'urgent'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                      complaint.priority === 'urgent'
                        ? 'bg-red-100 text-red-700'
                        : complaint.priority === 'high'
                        ? 'bg-orange-100 text-orange-700'
                        : complaint.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {complaint.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      complaint.status === 'resolved' ? 'default' : 'secondary'
                    }
                    className={
                      complaint.status === 'resolved'
                        ? 'bg-green-100 text-green-700'
                        : complaint.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {complaint.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    {complaint.assignedTo || (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {isAdmin && complaint.status !== 'resolved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                      >
                        Resolve
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
    </RoleGuard>
  )
}
