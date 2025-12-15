'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
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
  Users,
  Car,
  MessageSquare,
  Bell,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Scan,
  UserCheck,
  UserX,
  Shield,
  Eye,
  MoreHorizontal,
  Download,
  Printer,
  RefreshCw,
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
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const stats = [
  {
    title: "Today's Visitors",
    value: '48',
    change: '+12 from yesterday',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: 'up',
  },
  {
    title: 'Currently Inside',
    value: '23',
    change: 'Active now',
    icon: MapPin,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    pulse: true,
  },
  {
    title: 'Pre-approved',
    value: '15',
    change: 'Awaiting arrival',
    icon: CheckCircle,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    title: 'This Month',
    value: '1,240',
    change: '+18% from last month',
    icon: Calendar,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    trend: 'up',
  },
]

const visitors = [
  {
    id: '1',
    name: 'Rahul Verma',
    phone: '+91 98765 43210',
    purpose: 'Delivery',
    company: 'Amazon',
    visitingUnit: 'A-101',
    residentName: 'Rajesh Kumar',
    entryTime: '10:30 AM',
    exitTime: null,
    status: 'checked-in',
    photo: null,
    vehicleNumber: null,
    idType: 'Aadhaar',
    idNumber: 'XXXX-XXXX-4567',
  },
  {
    id: '2',
    name: 'Amit Sharma',
    phone: '+91 98765 43211',
    purpose: 'Guest Visit',
    company: null,
    visitingUnit: 'B-205',
    residentName: 'Priya Sharma',
    entryTime: '11:15 AM',
    exitTime: null,
    status: 'checked-in',
    photo: null,
    vehicleNumber: 'DL 01 AB 1234',
    idType: 'Driving License',
    idNumber: 'DL-1234567890',
  },
  {
    id: '3',
    name: 'Neha Gupta',
    phone: '+91 98765 43212',
    purpose: 'Maintenance',
    company: 'Urban Company',
    visitingUnit: 'C-304',
    residentName: 'Amit Patel',
    entryTime: '09:00 AM',
    exitTime: '11:30 AM',
    status: 'checked-out',
    photo: null,
    vehicleNumber: null,
    idType: 'Company ID',
    idNumber: 'UC-EMP-789',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    phone: '+91 98765 43213',
    purpose: 'Family Visit',
    company: null,
    visitingUnit: 'D-108',
    residentName: 'Vikram Singh Sr.',
    entryTime: null,
    exitTime: null,
    status: 'approved',
    photo: null,
    vehicleNumber: 'MH 02 CD 5678',
    idType: null,
    idNumber: null,
    approvedUntil: 'Today, 8:00 PM',
  },
  {
    id: '5',
    name: 'Ravi Kumar',
    phone: '+91 98765 43214',
    purpose: 'Cab Driver',
    company: 'Uber',
    visitingUnit: 'A-502',
    residentName: 'Neha Gupta',
    entryTime: null,
    exitTime: null,
    status: 'pending',
    photo: null,
    vehicleNumber: 'DL 05 EF 9012',
    idType: null,
    idNumber: null,
  },
  {
    id: '6',
    name: 'Suresh Menon',
    phone: '+91 98765 43215',
    purpose: 'Plumber',
    company: 'Self Employed',
    visitingUnit: 'B-401',
    residentName: 'Ramesh Iyer',
    entryTime: '08:45 AM',
    exitTime: null,
    status: 'checked-in',
    photo: null,
    vehicleNumber: null,
    idType: 'Aadhaar',
    idNumber: 'XXXX-XXXX-1234',
  },
]

const purposeOptions = [
  'Guest Visit',
  'Delivery',
  'Maintenance',
  'Cab/Taxi',
  'Food Delivery',
  'Maid/Cook',
  'Plumber',
  'Electrician',
  'Carpenter',
  'Other',
]

function NotifyResidentButton({ visitor }: { visitor: typeof visitors[0] }) {
  const message = `🔔 Visitor Alert!\n\nDear ${visitor.residentName},\n\nA visitor is waiting at the gate:\n\n👤 Name: ${visitor.name}\n📱 Phone: ${visitor.phone}\n🎯 Purpose: ${visitor.purpose}\n${visitor.vehicleNumber ? `🚗 Vehicle: ${visitor.vehicleNumber}\n` : ''}\nPlease confirm if you are expecting this visitor.\n\n- Security Desk`

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
      onClick={() => window.open(whatsappUrl, '_blank')}
      title="Notify Resident via WhatsApp"
    >
      <MessageSquare className="h-4 w-4" />
    </Button>
  )
}

function VisitorDetailDialog({ visitor }: { visitor: typeof visitors[0] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Visitor Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Visitor Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={visitor.photo || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                {visitor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{visitor.name}</h3>
              <p className="text-sm text-muted-foreground">{visitor.phone}</p>
              <Badge
                className={`mt-2 ${
                  visitor.status === 'checked-in'
                    ? 'bg-green-100 text-green-700'
                    : visitor.status === 'checked-out'
                    ? 'bg-gray-100 text-gray-700'
                    : visitor.status === 'approved'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {visitor.status === 'checked-in' && <span className="mr-1 h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" />}
                {visitor.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Visit Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Purpose</p>
              <p className="font-medium">{visitor.purpose}</p>
              {visitor.company && (
                <p className="text-sm text-muted-foreground">{visitor.company}</p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Visiting</p>
              <p className="font-medium">{visitor.visitingUnit}</p>
              <p className="text-sm text-muted-foreground">{visitor.residentName}</p>
            </div>
          </div>

          {/* Time Info */}
          <div className="flex items-center gap-4">
            <div className="flex-1 p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center gap-2 text-green-700">
                <ArrowDownLeft className="h-4 w-4" />
                <span className="text-xs">Entry Time</span>
              </div>
              <p className="font-semibold text-green-800 mt-1">
                {visitor.entryTime || 'Not yet'}
              </p>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-2 text-red-700">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-xs">Exit Time</span>
              </div>
              <p className="font-semibold text-red-800 mt-1">
                {visitor.exitTime || 'Still inside'}
              </p>
            </div>
          </div>

          {/* Vehicle & ID */}
          {(visitor.vehicleNumber || visitor.idType) && (
            <div className="space-y-3">
              {visitor.vehicleNumber && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Vehicle Number</p>
                    <p className="font-medium">{visitor.vehicleNumber}</p>
                  </div>
                </div>
              )}
              {visitor.idType && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{visitor.idType}</p>
                    <p className="font-medium">{visitor.idNumber}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            {visitor.status === 'checked-in' && (
              <Button className="flex-1 bg-red-600 hover:bg-red-700">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Check Out
              </Button>
            )}
            {visitor.status === 'approved' && (
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Check In
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print Pass
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function VisitorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  const isGuard = user?.role === 'guard'

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.visitingUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.phone.includes(searchQuery) ||
      visitor.purpose.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === 'all' || visitor.status === activeTab

    return matchesSearch && matchesTab
  })

  const getStatusCounts = () => {
    return {
      all: visitors.length,
      'checked-in': visitors.filter(v => v.status === 'checked-in').length,
      'checked-out': visitors.filter(v => v.status === 'checked-out').length,
      approved: visitors.filter(v => v.status === 'approved').length,
      pending: visitors.filter(v => v.status === 'pending').length,
    }
  }

  const counts = getStatusCounts()

  return (
    <RoleGuard allowedRoles={['admin', 'guard']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {isAdmin ? 'Visitor Management' : 'Visitor Check-In/Out'}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isAdmin
                    ? 'Track and manage visitor entries and exits'
                    : 'Register and manage visitors at the gate'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Scan className="h-4 w-4" />
              <span>Scan QR</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2 shadow-lg shadow-blue-500/25">
                  <Plus className="h-4 w-4" />
                  <span>Add Visitor</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    Register New Visitor
                  </DialogTitle>
                  <DialogDescription>
                    Enter visitor details for check-in. A QR pass will be generated.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Photo Capture Area */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                        <Camera className="h-10 w-10 text-gray-400" />
                      </div>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
                      >
                        <Camera className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A-101">A-101 - Rajesh Kumar</SelectItem>
                          <SelectItem value="A-102">A-102 - Priya Sharma</SelectItem>
                          <SelectItem value="B-205">B-205 - Amit Patel</SelectItem>
                          <SelectItem value="C-304">C-304 - Neha Gupta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Purpose of Visit *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {purposeOptions.map((purpose) => (
                            <SelectItem key={purpose} value={purpose.toLowerCase()}>
                              {purpose}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company/Organization</Label>
                      <Input placeholder="e.g., Amazon, Swiggy" />
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Number</Label>
                      <Input placeholder="e.g., DL 01 AB 1234" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ID Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                          <SelectItem value="dl">Driving License</SelectItem>
                          <SelectItem value="voter">Voter ID</SelectItem>
                          <SelectItem value="company">Company ID</SelectItem>
                          <SelectItem value="pan">PAN Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>ID Number</Label>
                      <Input placeholder="Enter ID number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Any additional information..." rows={2} />
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Notify Resident</p>
                      <p className="text-xs text-blue-700">Send WhatsApp notification to the flat owner</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="outline" className="gap-2">
                      <QrCode className="h-4 w-4" />
                      Pre-approve & Generate Pass
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2">
                      <ArrowDownLeft className="h-4 w-4" />
                      Check In Now
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
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

        {/* Filters & Search */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, unit, phone, or purpose..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="today">
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-blocks">
                  <SelectTrigger className="w-[140px]">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-blocks">All Blocks</SelectItem>
                    <SelectItem value="A">Block A</SelectItem>
                    <SelectItem value="B">Block B</SelectItem>
                    <SelectItem value="C">Block C</SelectItem>
                    <SelectItem value="D">Block D</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs & Table */}
        <Card className="border-0 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader className="border-b pb-0">
              <TabsList className="bg-transparent h-auto p-0 space-x-6">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none px-0 pb-3"
                >
                  All <Badge variant="secondary" className="ml-2">{counts.all}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="checked-in"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-green-600 rounded-none px-0 pb-3"
                >
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2" />
                  Inside <Badge className="ml-2 bg-green-100 text-green-700">{counts['checked-in']}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-orange-600 rounded-none px-0 pb-3"
                >
                  Pending <Badge className="ml-2 bg-orange-100 text-orange-700">{counts.pending}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-purple-600 rounded-none px-0 pb-3"
                >
                  Pre-approved <Badge className="ml-2 bg-purple-100 text-purple-700">{counts.approved}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="checked-out"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-gray-600 rounded-none px-0 pb-3"
                >
                  Exited <Badge variant="secondary" className="ml-2">{counts['checked-out']}</Badge>
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Visitor</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Visiting</TableHead>
                    <TableHead className="font-semibold">Purpose</TableHead>
                    <TableHead className="font-semibold">Time</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredVisitors.map((visitor, index) => (
                      <motion.tr
                        key={visitor.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="border-2 border-white shadow">
                              <AvatarImage src={visitor.photo || undefined} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                                {visitor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{visitor.name}</p>
                              {visitor.vehicleNumber && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Car className="h-3 w-3" />
                                  {visitor.vehicleNumber}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{visitor.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{visitor.visitingUnit}</p>
                            <p className="text-xs text-muted-foreground">{visitor.residentName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{visitor.purpose}</p>
                            {visitor.company && (
                              <p className="text-xs text-muted-foreground">{visitor.company}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {visitor.entryTime && (
                              <div className="flex items-center gap-1.5 text-sm text-green-600">
                                <ArrowDownLeft className="h-3.5 w-3.5" />
                                {visitor.entryTime}
                              </div>
                            )}
                            {visitor.exitTime && (
                              <div className="flex items-center gap-1.5 text-sm text-red-600">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                                {visitor.exitTime}
                              </div>
                            )}
                            {!visitor.entryTime && !visitor.exitTime && (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`font-medium ${
                              visitor.status === 'checked-in'
                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                : visitor.status === 'checked-out'
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                                : visitor.status === 'approved'
                                ? 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                                : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                            }`}
                          >
                            {visitor.status === 'checked-in' && (
                              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                            )}
                            {visitor.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <VisitorDetailDialog visitor={visitor} />
                            <NotifyResidentButton visitor={visitor} />

                            {visitor.status === 'checked-in' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
                              >
                                <ArrowUpRight className="h-3.5 w-3.5" />
                                Check Out
                              </Button>
                            )}
                            {visitor.status === 'pending' && (
                              <>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {visitor.status === 'approved' && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 gap-1"
                              >
                                <ArrowDownLeft className="h-3.5 w-3.5" />
                                Check In
                              </Button>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  alert(`QR Pass generated for ${visitor.name}!\nPass ID: VIS-${visitor.id}-${Date.now()}`)
                                }}>
                                  <QrCode className="h-4 w-4 mr-2" />
                                  Generate QR Pass
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  window.print()
                                  alert(`Printing visitor pass for ${visitor.name}...`)
                                }}>
                                  <Printer className="h-4 w-4 mr-2" />
                                  Print Pass
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = `tel:${visitor.phone.replace(/[^0-9]/g, '')}`
                                }}>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call Visitor
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => {
                                  if (confirm(`Are you sure you want to blacklist ${visitor.name}?`)) {
                                    alert(`${visitor.name} has been blacklisted.`)
                                  }
                                }}>
                                  <UserX className="h-4 w-4 mr-2" />
                                  Blacklist Visitor
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

              {filteredVisitors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No visitors found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </RoleGuard>
  )
}
