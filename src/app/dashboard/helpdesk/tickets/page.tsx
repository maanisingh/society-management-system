'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Ticket,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Image,
  FileText,
  User,
  Calendar,
  ArrowUpRight,
  Star,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'

const tickets = [
  {
    id: 'TKT-001',
    title: 'Water leakage in bathroom',
    description: 'There is continuous water leakage from the ceiling in master bathroom',
    unit: 'A-205',
    resident: 'Rajesh Kumar',
    category: 'Plumbing',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-12-18T10:30:00',
    updatedAt: '2024-12-19T08:00:00',
    assignedTo: 'Maintenance Team',
    hasImages: true,
    messages: 5,
    preferredDate: '2024-12-20',
  },
  {
    id: 'TKT-002',
    title: 'Parking space dispute',
    description: 'Someone is regularly parking in my designated spot B-205-1',
    unit: 'B-205',
    resident: 'Priya Sharma',
    category: 'Parking',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-12-18T14:00:00',
    updatedAt: '2024-12-18T14:00:00',
    assignedTo: 'Unassigned',
    hasImages: true,
    messages: 2,
    preferredDate: null,
  },
  {
    id: 'TKT-003',
    title: 'Lift not working properly',
    description: 'Tower A lift making strange noise and stopping between floors',
    unit: 'Common Area',
    resident: 'Amit Verma',
    category: 'Electrical',
    priority: 'critical',
    status: 'open',
    createdAt: '2024-12-19T07:00:00',
    updatedAt: '2024-12-19T07:00:00',
    assignedTo: 'Unassigned',
    hasImages: false,
    messages: 1,
    preferredDate: null,
  },
  {
    id: 'TKT-004',
    title: 'Garden maintenance request',
    description: 'Plants in common garden area need trimming and watering',
    unit: 'Common Area',
    resident: 'Sunita Devi',
    category: 'Housekeeping',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-12-15T09:00:00',
    updatedAt: '2024-12-17T16:00:00',
    assignedTo: 'Housekeeping Team',
    hasImages: true,
    messages: 8,
    preferredDate: '2024-12-16',
    satisfaction: 5,
  },
  {
    id: 'TKT-005',
    title: 'Intercom not working',
    description: 'Main door intercom system stopped working since yesterday',
    unit: 'C-102',
    resident: 'Mohan Lal',
    category: 'Electrical',
    priority: 'high',
    status: 'closed',
    createdAt: '2024-12-14T11:00:00',
    updatedAt: '2024-12-16T14:00:00',
    assignedTo: 'Electrician - Raju',
    hasImages: false,
    messages: 12,
    preferredDate: '2024-12-15',
    satisfaction: 4,
  },
]

const stats = [
  { label: 'Open', value: '12', color: 'bg-blue-500', percentage: 30 },
  { label: 'In Progress', value: '8', color: 'bg-yellow-500', percentage: 20 },
  { label: 'Resolved', value: '15', color: 'bg-green-500', percentage: 38 },
  { label: 'Closed', value: '5', color: 'bg-gray-500', percentage: 12 },
]

const categories = ['All', 'Plumbing', 'Electrical', 'Housekeeping', 'Parking', 'Security', 'Other']

export default function HelpdeskTicketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            Helpdesk Tickets
          </h1>
          <p className="text-gray-600 mt-1">Manage and resolve resident complaints and requests</p>
        </div>
        <Button className="mt-4 md:mt-0 gap-2">
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Badge className={stat.color}>{stat.value}</Badge>
              </div>
              <Progress value={stat.percentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">{stat.percentage}% of total</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">{ticket.id}</span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{ticket.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{ticket.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" /> {ticket.resident}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" /> {ticket.unit}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        {ticket.hasImages && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <Image className="h-4 w-4" /> Attachments
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> {ticket.messages} messages
                        </span>
                        {ticket.satisfaction && (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <Star className="h-4 w-4 fill-yellow-500" /> {ticket.satisfaction}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </Button>
                  <Button size="sm" className="gap-1">
                    View
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {ticket.assignedTo !== 'Unassigned' && (
                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Assigned to: <strong>{ticket.assignedTo}</strong>
                  </span>
                  {ticket.preferredDate && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Preferred: {new Date(ticket.preferredDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
