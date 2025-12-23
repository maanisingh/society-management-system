'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wifi,
  Bug,
  Sparkles,
  Wrench,
  Droplets,
  Camera,
  Lock,
  Paintbrush,
  Zap,
  Phone,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  Calendar,
  MessageSquare,
  IndianRupee,
  Shield,
  Users,
  Building2,
  ThumbsUp,
  MapPin,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const serviceCategories = [
  {
    id: 'internet',
    name: 'High-Speed Internet',
    icon: Wifi,
    description: 'Fiber optic & broadband connections',
    color: 'blue',
    providers: [
      { name: 'Jio Fiber', rating: 4.5, reviews: 128, price: 'Rs. 699/month', image: 'JF' },
      { name: 'Airtel Xstream', rating: 4.3, reviews: 95, price: 'Rs. 799/month', image: 'AX' },
      { name: 'ACT Fibernet', rating: 4.4, reviews: 112, price: 'Rs. 749/month', image: 'AF' },
    ],
  },
  {
    id: 'pest',
    name: 'Pest Control',
    icon: Bug,
    description: 'Cockroaches, Termite, Rat, Bedbugs',
    color: 'green',
    providers: [
      { name: 'PestFree Services', rating: 4.7, reviews: 234, price: 'Rs. 1,500', image: 'PF' },
      { name: 'HygieneFirst', rating: 4.5, reviews: 189, price: 'Rs. 1,200', image: 'HF' },
      { name: 'BugBusters', rating: 4.3, reviews: 156, price: 'Rs. 1,800', image: 'BB' },
    ],
  },
  {
    id: 'cleaning',
    name: 'Cleaning Services',
    icon: Sparkles,
    description: 'Deep cleaning, regular cleaning, sanitization',
    color: 'cyan',
    providers: [
      { name: 'CleanPro', rating: 4.6, reviews: 312, price: 'Rs. 2,000', image: 'CP' },
      { name: 'SparkleHome', rating: 4.4, reviews: 245, price: 'Rs. 1,800', image: 'SH' },
      { name: 'Urban Clap Clean', rating: 4.5, reviews: 423, price: 'Rs. 2,500', image: 'UC' },
    ],
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: Wrench,
    description: 'Furniture repair, assembly, custom work',
    color: 'orange',
    providers: [
      { name: 'WoodMaster', rating: 4.4, reviews: 178, price: 'Rs. 500/hr', image: 'WM' },
      { name: 'FixIt Carpenters', rating: 4.2, reviews: 134, price: 'Rs. 400/hr', image: 'FC' },
      { name: 'HomeWood Services', rating: 4.5, reviews: 201, price: 'Rs. 450/hr', image: 'HW' },
    ],
  },
  {
    id: 'water_pump',
    name: 'Water Pump Controller',
    icon: Zap,
    description: 'Automatic pump controllers & installation',
    color: 'purple',
    providers: [
      { name: 'AquaSmart', rating: 4.6, reviews: 89, price: 'Rs. 3,500', image: 'AS' },
      { name: 'PumpTech', rating: 4.3, reviews: 67, price: 'Rs. 2,800', image: 'PT' },
      { name: 'WaterWise', rating: 4.5, reviews: 112, price: 'Rs. 4,000', image: 'WW' },
    ],
  },
  {
    id: 'tank_cleaning',
    name: 'Water Tank Cleaning',
    icon: Droplets,
    description: 'Tank cleaning & sanitization',
    color: 'teal',
    providers: [
      { name: 'TankClean Pro', rating: 4.7, reviews: 156, price: 'Rs. 2,500', image: 'TC' },
      { name: 'AquaPure', rating: 4.5, reviews: 134, price: 'Rs. 2,000', image: 'AP' },
      { name: 'CleanWater Services', rating: 4.4, reviews: 98, price: 'Rs. 2,200', image: 'CW' },
    ],
  },
  {
    id: 'interior',
    name: 'Interior Design',
    icon: Paintbrush,
    description: 'Home & society interior solutions',
    color: 'pink',
    providers: [
      { name: 'DesignHub', rating: 4.8, reviews: 89, price: 'Consultation Free', image: 'DH' },
      { name: 'HomeMakeover', rating: 4.6, reviews: 67, price: 'Rs. 500/sqft', image: 'HM' },
      { name: 'InteriorFirst', rating: 4.5, reviews: 78, price: 'Rs. 400/sqft', image: 'IF' },
    ],
  },
  {
    id: 'cctv',
    name: 'CCTV Installation',
    icon: Camera,
    description: 'Security cameras & surveillance systems',
    color: 'red',
    providers: [
      { name: 'SecureView', rating: 4.7, reviews: 234, price: 'Rs. 15,000', image: 'SV' },
      { name: 'EyeWatch', rating: 4.5, reviews: 189, price: 'Rs. 12,000', image: 'EW' },
      { name: 'SafeHome CCTV', rating: 4.6, reviews: 156, price: 'Rs. 18,000', image: 'SC' },
    ],
  },
  {
    id: 'smart_locks',
    name: 'Smart Door Locks',
    icon: Lock,
    description: 'IOT enabled smart locks & access control',
    color: 'indigo',
    providers: [
      { name: 'SmartLock Pro', rating: 4.6, reviews: 123, price: 'Rs. 8,000', image: 'SL' },
      { name: 'SecureEntry', rating: 4.4, reviews: 98, price: 'Rs. 6,500', image: 'SE' },
      { name: 'IOT Locks India', rating: 4.5, reviews: 87, price: 'Rs. 9,500', image: 'IL' },
    ],
  },
]

const myRequests = [
  {
    id: 'SR-001',
    service: 'Pest Control',
    provider: 'PestFree Services',
    date: '2024-12-20',
    time: '10:00 AM',
    status: 'confirmed',
    price: 'Rs. 1,500',
  },
  {
    id: 'SR-002',
    service: 'Cleaning Services',
    provider: 'CleanPro',
    date: '2024-12-18',
    time: '9:00 AM',
    status: 'completed',
    price: 'Rs. 2,000',
  },
  {
    id: 'SR-003',
    service: 'High-Speed Internet',
    provider: 'Jio Fiber',
    date: '2024-12-15',
    time: '2:00 PM',
    status: 'pending',
    price: 'Rs. 699/month',
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof serviceCategories[0] | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<typeof serviceCategories[0]['providers'][0] | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('browse')

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleBookService = () => {
    setIsBookingOpen(false)
    showNotification('Service booking confirmed! You will receive a confirmation shortly.')
  }

  const handleRequestCallback = () => {
    setIsCallbackOpen(false)
    showNotification('Callback request submitted! The provider will contact you within 24 hours.')
  }

  const colorClasses: Record<string, { bg: string; text: string; light: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' },
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Services & Bookings</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Book trusted service providers for your home
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="browse" className="gap-2">
            <Building2 className="h-4 w-4" />
            Browse Services
          </TabsTrigger>
          <TabsTrigger value="my-requests" className="gap-2">
            <Calendar className="h-4 w-4" />
            My Requests
          </TabsTrigger>
        </TabsList>

        {/* Browse Services Tab */}
        <TabsContent value="browse" className="mt-6">
          {!selectedCategory ? (
            /* Service Categories Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceCategories.map((category) => {
                const Icon = category.icon
                const colors = colorClasses[category.color]
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl ${colors.light}`}>
                            <Icon className={`h-6 w-6 ${colors.text}`} />
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-4">{category.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {category.providers.length} providers
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {category.providers[0].rating}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            /* Provider List for Selected Category */
            <div>
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => setSelectedCategory(null)}
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Services
              </Button>

              <Card className="border-0 shadow-md mb-6">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${colorClasses[selectedCategory.color].light}`}>
                      <selectedCategory.icon className={`h-8 w-8 ${colorClasses[selectedCategory.color].text}`} />
                    </div>
                    <div>
                      <CardTitle>{selectedCategory.name}</CardTitle>
                      <CardDescription>{selectedCategory.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {selectedCategory.providers.map((provider, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14">
                            <AvatarFallback className={`${colorClasses[selectedCategory.color].bg} text-white text-lg font-bold`}>
                              {provider.image}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-medium">{provider.rating}</span>
                                <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-green-600 font-semibold">
                              <IndianRupee className="h-4 w-4" />
                              {provider.price.replace('Rs. ', '')}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedProvider(provider)
                              setIsCallbackOpen(true)
                            }}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Request Callback
                          </Button>
                          <Button
                            className="bg-gradient-to-r from-teal-500 to-cyan-500"
                            onClick={() => {
                              setSelectedProvider(provider)
                              setIsBookingOpen(true)
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="outline" className="gap-1">
                          <Shield className="h-3 w-3" />
                          Verified
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" />
                          Same Day Service
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          Society Recommended
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* My Requests Tab */}
        <TabsContent value="my-requests" className="mt-6">
          <div className="space-y-4">
            {myRequests.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No service requests yet</h3>
                  <p className="text-gray-500 mt-1">Browse services and book your first service</p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-500"
                    onClick={() => setActiveTab('browse')}
                  >
                    Browse Services
                  </Button>
                </CardContent>
              </Card>
            ) : (
              myRequests.map((request) => (
                <Card key={request.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-gray-900">{request.service}</h3>
                          <Badge className={statusColors[request.status]}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1">{request.provider}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {request.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {request.time}
                          </span>
                          <span className="font-medium text-green-600">{request.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                            Cancel
                          </Button>
                        )}
                        {request.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            Rate Service
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              Schedule an appointment with {selectedProvider?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-teal-500 text-white font-bold">
                  {selectedProvider?.image}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{selectedProvider?.name}</p>
                <p className="text-sm text-gray-600">{selectedCategory?.name}</p>
                <p className="text-sm font-medium text-green-600">{selectedProvider?.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9am">9:00 AM</SelectItem>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                    <SelectItem value="11am">11:00 AM</SelectItem>
                    <SelectItem value="12pm">12:00 PM</SelectItem>
                    <SelectItem value="2pm">2:00 PM</SelectItem>
                    <SelectItem value="3pm">3:00 PM</SelectItem>
                    <SelectItem value="4pm">4:00 PM</SelectItem>
                    <SelectItem value="5pm">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your Unit *</Label>
              <Input placeholder="e.g., A-101" />
            </div>

            <div className="space-y-2">
              <Label>Contact Number *</Label>
              <Input type="tel" placeholder="+91 98765 43210" />
            </div>

            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea placeholder="Any specific requirements or instructions..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-teal-500 to-cyan-500"
              onClick={handleBookService}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Callback Request Dialog */}
      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Callback</DialogTitle>
            <DialogDescription>
              {selectedProvider?.name} will call you within 24 hours
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Your Name *</Label>
              <Input placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input type="tel" placeholder="+91 98765 43210" />
            </div>

            <div className="space-y-2">
              <Label>Preferred Time to Call</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Any time</SelectItem>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <Textarea placeholder="Briefly describe your requirement..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCallbackOpen(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-teal-500 to-cyan-500"
              onClick={handleRequestCallback}
            >
              <Send className="h-4 w-4 mr-2" />
              Request Callback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
