'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  QrCode,
  Download,
  Share2,
  RefreshCw,
  Shield,
  Phone,
  Video,
  Package,
  Users,
  Car,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Smartphone,
  Bell,
  Home,
  Settings,
  History,
  Lock,
  Unlock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuthStore } from '@/lib/stores/auth-store'

const qrCodeFeatures = [
  {
    id: 'emergency',
    title: 'Emergency Contact',
    description: 'Quick access to emergency contacts when QR is scanned',
    icon: Phone,
    enabled: true,
    color: 'red',
  },
  {
    id: 'video_call',
    title: 'Video Call to Resident',
    description: 'Allow visitors to video call you directly',
    icon: Video,
    enabled: true,
    color: 'blue',
  },
  {
    id: 'delivery',
    title: 'Delivery Verification',
    description: 'Verify deliveries and approve entry',
    icon: Package,
    enabled: true,
    color: 'green',
  },
  {
    id: 'visitor',
    title: 'Visitor Pre-approval',
    description: 'Pre-approve expected visitors',
    icon: Users,
    enabled: false,
    color: 'purple',
  },
  {
    id: 'vehicle',
    title: 'Vehicle Entry',
    description: 'Quick vehicle verification at gate',
    icon: Car,
    enabled: true,
    color: 'orange',
  },
]

const scanHistory = [
  {
    id: 1,
    type: 'Delivery',
    name: 'Amazon Delivery',
    time: '10:30 AM',
    date: 'Today',
    status: 'approved',
    location: 'Main Gate',
  },
  {
    id: 2,
    type: 'Visitor',
    name: 'Ramesh Kumar',
    time: '9:15 AM',
    date: 'Today',
    status: 'approved',
    location: 'Main Gate',
  },
  {
    id: 3,
    type: 'Emergency',
    name: 'Emergency Scan',
    time: '8:00 PM',
    date: 'Yesterday',
    status: 'alert_sent',
    location: 'Parking B1',
  },
  {
    id: 4,
    type: 'Delivery',
    name: 'Swiggy Food',
    time: '1:30 PM',
    date: 'Yesterday',
    status: 'approved',
    location: 'Main Gate',
  },
  {
    id: 5,
    type: 'Vehicle',
    name: 'MH-12-AB-1234',
    time: '6:45 PM',
    date: '2 days ago',
    status: 'approved',
    location: 'Parking Entry',
  },
]

const statusColors: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  denied: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  alert_sent: 'bg-orange-100 text-orange-700',
}

export default function QRAccessPage() {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  const [features, setFeatures] = useState(qrCodeFeatures)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [qrEnabled, setQrEnabled] = useState(true)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleToggleFeature = (id: string) => {
    setFeatures(features.map(f =>
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ))
    showNotification('Setting updated successfully!')
  }

  const handleRegenerateQR = () => {
    setIsRegenerateOpen(false)
    showNotification('New QR code generated successfully!')
  }

  const handleDownloadQR = () => {
    showNotification('QR code downloaded!')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://society.app/qr/A101-XYZ123')
    showNotification('Link copied to clipboard!')
  }

  const colorClasses: Record<string, { bg: string; text: string; light: string }> = {
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
  }

  return (
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">QR Access Control</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage your unit's QR code for visitor verification and emergency access
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={qrEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
            {qrEnabled ? 'QR Active' : 'QR Disabled'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code Display */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-teal-600" />
                Your Unit QR Code
              </CardTitle>
              <CardDescription>
                Unit: A-101 | Block A
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* QR Code Placeholder */}
              <div className="relative">
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative">
                    {/* Simulated QR Code Pattern */}
                    <div className="grid grid-cols-8 gap-1 p-4">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-sm ${
                            Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Center Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 bg-white rounded-lg shadow-lg">
                        <Home className="h-6 w-6 text-teal-600" />
                      </div>
                    </div>
                  </div>
                </div>
                {!qrEnabled && (
                  <div className="absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center">
                    <Badge className="bg-red-500 text-white">QR Disabled</Badge>
                  </div>
                )}
              </div>

              {/* QR Code ID */}
              <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">QR Code ID</p>
                  <p className="font-mono text-sm font-medium">A101-XYZ123</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleDownloadQR}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setIsShareOpen(true)}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
                onClick={() => setIsRegenerateOpen(true)}
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate QR Code
              </Button>

              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {qrEnabled ? (
                    <Unlock className="h-4 w-4 text-green-600" />
                  ) : (
                    <Lock className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm font-medium">QR Access</span>
                </div>
                <Switch
                  checked={qrEnabled}
                  onCheckedChange={(checked) => {
                    setQrEnabled(checked)
                    showNotification(checked ? 'QR code enabled' : 'QR code disabled')
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features & History */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="features">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="features" className="gap-2">
                <Settings className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                Scan History
              </TabsTrigger>
            </TabsList>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>QR Code Features</CardTitle>
                  <CardDescription>
                    Configure what happens when your QR code is scanned
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature) => {
                    const Icon = feature.icon
                    const colors = colorClasses[feature.color]
                    return (
                      <div
                        key={feature.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${colors.light}`}>
                            <Icon className={`h-5 w-5 ${colors.text}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{feature.title}</p>
                            <p className="text-sm text-gray-500">{feature.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => handleToggleFeature(feature.id)}
                        />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Emergency Contact Card */}
              <Card className="border-0 shadow-md mt-4 border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Emergency Contact Settings</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        When your QR is scanned in emergency mode, these contacts will be notified immediately.
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                          <span className="text-sm">Primary: +91 98765 43210</span>
                          <Badge variant="outline">Owner</Badge>
                        </div>
                        <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                          <span className="text-sm">Secondary: +91 87654 32109</span>
                          <Badge variant="outline">Family</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Edit Contacts
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-4">
              <Card className="border-0 shadow-md overflow-hidden">
                <CardHeader>
                  <CardTitle>Recent QR Scans</CardTitle>
                  <CardDescription>
                    History of all scans for your unit's QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scanHistory.map((scan) => (
                        <TableRow key={scan.id}>
                          <TableCell>
                            <Badge variant="outline">{scan.type}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{scan.name}</TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{scan.time}</p>
                              <p className="text-xs text-gray-500">{scan.date}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{scan.location}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[scan.status]}>
                              {scan.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Regenerate QR Dialog */}
      <Dialog open={isRegenerateOpen} onOpenChange={setIsRegenerateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Regenerate QR Code
            </DialogTitle>
            <DialogDescription>
              This will create a new QR code and invalidate the old one. All previously shared QR codes will stop working.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Warning:</strong> If you have printed or shared your QR code, you will need to update it everywhere after regeneration.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRegenerateOpen(false)}>Cancel</Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleRegenerateQR}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share QR Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share QR Code</DialogTitle>
            <DialogDescription>
              Share your QR code link with expected visitors
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input
                  value="https://society.app/qr/A101-XYZ123"
                  readOnly
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                <Smartphone className="h-6 w-6 text-green-600" />
                <span className="text-xs">WhatsApp</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                <Bell className="h-6 w-6 text-blue-600" />
                <span className="text-xs">Telegram</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                <Share2 className="h-6 w-6 text-gray-600" />
                <span className="text-xs">More</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
