'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Package,
  Wrench,
  AlertCircle,
  CheckCircle,
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
    title: 'Total Assets',
    value: '156',
    change: '+12',
    icon: Package,
    color: 'blue',
  },
  {
    title: 'Working',
    value: '142',
    change: '+8',
    icon: CheckCircle,
    color: 'green',
  },
  {
    title: 'Under Maintenance',
    value: '8',
    change: '+2',
    icon: Wrench,
    color: 'orange',
  },
  {
    title: 'Damaged',
    value: '6',
    change: '-3',
    icon: AlertCircle,
    color: 'red',
  },
]

const assets = [
  {
    id: 'AST-001',
    name: 'Swimming Pool',
    category: 'Amenity',
    location: 'Block A - Ground Floor',
    purchaseDate: '2020-01-15',
    value: 5000000,
    condition: 'working',
    lastMaintenance: '2024-12-01',
    nextMaintenance: '2025-03-01',
    status: 'active',
  },
  {
    id: 'AST-002',
    name: 'Gymnasium Equipment',
    category: 'Fitness',
    location: 'Club House',
    purchaseDate: '2021-06-10',
    value: 850000,
    condition: 'working',
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2025-02-15',
    status: 'active',
  },
  {
    id: 'AST-003',
    name: 'Fire Fighting System',
    category: 'Safety',
    location: 'All Blocks',
    purchaseDate: '2019-03-20',
    value: 2500000,
    condition: 'working',
    lastMaintenance: '2024-12-20',
    nextMaintenance: '2025-06-20',
    status: 'active',
  },
  {
    id: 'AST-004',
    name: 'Elevator - Block A',
    category: 'Equipment',
    location: 'Block A',
    purchaseDate: '2019-01-01',
    value: 1800000,
    condition: 'maintenance',
    lastMaintenance: '2024-12-28',
    nextMaintenance: '2025-01-10',
    status: 'maintenance',
  },
  {
    id: 'AST-005',
    name: 'CCTV System',
    category: 'Security',
    location: 'All Areas',
    purchaseDate: '2020-08-15',
    value: 450000,
    condition: 'working',
    lastMaintenance: '2024-11-01',
    nextMaintenance: '2025-05-01',
    status: 'active',
  },
]

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [conditionFilter, setConditionFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter
    const matchesCondition = conditionFilter === 'all' || asset.condition === conditionFilter

    return matchesSearch && matchesCategory && matchesCondition
  })

  return (
    <RoleGuard allowedRoles={['admin']}>

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all society assets and equipment
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
                <span>Add Asset</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Register a new asset to the society inventory
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Asset Name</Label>
                    <Input placeholder="Swimming Pool" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amenity">Amenity</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Block A - Ground Floor" />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Asset Value (₹)</Label>
                    <Input type="number" placeholder="500000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="working">Working</SelectItem>
                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Asset details..." rows={3} />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Asset
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
                    <p className={`text-sm mt-1 ${stat.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : 'bg-red-100'
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
                          : 'text-red-600'
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
              placeholder="Search by name, category, or location..."
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
              <SelectItem value="Amenity">Amenity</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
            </SelectContent>
          </Select>
          <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="working">Working</SelectItem>
              <SelectItem value="maintenance">Under Maintenance</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Assets Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.id}</TableCell>
                <TableCell className="font-semibold">{asset.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{asset.category}</Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{asset.location}</TableCell>
                <TableCell className="font-semibold">
                  ₹{(asset.value / 100000).toFixed(2)}L
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      asset.condition === 'working'
                        ? 'default'
                        : asset.condition === 'damaged'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                      asset.condition === 'working'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : asset.condition === 'damaged'
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {asset.condition === 'working' && (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {asset.condition === 'damaged' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {asset.condition === 'maintenance' && <Wrench className="h-3 w-3 mr-1" />}
                    {asset.condition}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{asset.lastMaintenance}</TableCell>
                <TableCell className="text-sm">{asset.nextMaintenance}</TableCell>
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
    </RoleGuard>
  )
}
