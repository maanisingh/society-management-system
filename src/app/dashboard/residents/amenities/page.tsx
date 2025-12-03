'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Plus,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const amenities = [
  {
    id: '1',
    name: 'Clubhouse',
    type: 'hall',
    capacity: 100,
    pricePerHour: 500,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timings: { start: '09:00', end: '22:00' },
    image: null,
    status: 'available',
    description: 'Perfect for parties, meetings, and social gatherings',
  },
  {
    id: '2',
    name: 'Swimming Pool',
    type: 'pool',
    capacity: 50,
    pricePerHour: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timings: { start: '06:00', end: '20:00' },
    image: null,
    status: 'available',
    description: 'Olympic size swimming pool with separate kids area',
  },
  {
    id: '3',
    name: 'Gym',
    type: 'gym',
    capacity: 30,
    pricePerHour: 0,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timings: { start: '05:00', end: '23:00' },
    image: null,
    status: 'available',
    description: 'Fully equipped modern gym with trainer available',
  },
  {
    id: '4',
    name: 'Badminton Court',
    type: 'court',
    capacity: 4,
    pricePerHour: 200,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timings: { start: '06:00', end: '22:00' },
    image: null,
    status: 'available',
    description: 'Indoor court with professional flooring',
  },
  {
    id: '5',
    name: 'Tennis Court',
    type: 'court',
    capacity: 4,
    pricePerHour: 300,
    availableDays: ['Saturday', 'Sunday'],
    timings: { start: '07:00', end: '19:00' },
    image: null,
    status: 'maintenance',
    description: 'Outdoor tennis court with lighting',
  },
  {
    id: '6',
    name: 'Party Hall',
    type: 'hall',
    capacity: 150,
    pricePerHour: 800,
    availableDays: ['Friday', 'Saturday', 'Sunday'],
    timings: { start: '18:00', end: '01:00' },
    image: null,
    status: 'available',
    description: 'Grand hall with AC, sound system, and catering facility',
  },
]

const upcomingBookings = [
  {
    id: '1',
    amenity: 'Clubhouse',
    date: '2025-01-15',
    startTime: '18:00',
    endTime: '22:00',
    status: 'confirmed',
    amount: 2000,
  },
  {
    id: '2',
    amenity: 'Badminton Court',
    date: '2025-01-10',
    startTime: '17:00',
    endTime: '18:00',
    status: 'confirmed',
    amount: 200,
  },
]

export default function AmenitiesPage() {
  const [selectedAmenity, setSelectedAmenity] = useState<any>(null)
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  return (
    <RoleGuard allowedRoles={['admin', 'resident']}>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isAdmin ? 'Amenities Management' : 'Amenities Booking'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin
              ? 'Manage and monitor amenity bookings'
              : 'Book facilities and amenities for your events'}
          </p>
        </div>
        {isAdmin && (
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Amenity
          </Button>
        )}
      </div>

      {/* My Bookings */}
      {upcomingBookings.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            My Upcoming Bookings
          </h3>
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{booking.amenity}</p>
                    <p className="text-sm text-gray-600">
                      {booking.date} • {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{booking.amount}
                    </p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {booking.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Available Amenities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Available Amenities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <div className="text-center">
                    {amenity.type === 'hall' && <Users className="h-16 w-16 mx-auto mb-2" />}
                    {amenity.type === 'pool' && <MapPin className="h-16 w-16 mx-auto mb-2" />}
                    {amenity.type === 'gym' && <Users className="h-16 w-16 mx-auto mb-2" />}
                    {amenity.type === 'court' && <MapPin className="h-16 w-16 mx-auto mb-2" />}
                    <h4 className="text-xl font-bold">{amenity.name}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={amenity.status === 'available' ? 'default' : 'secondary'}
                      className={
                        amenity.status === 'available'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                      }
                    >
                      {amenity.status}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      {amenity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {amenity.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Capacity
                      </span>
                      <span className="font-medium">{amenity.capacity} people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Timing
                      </span>
                      <span className="font-medium">
                        {amenity.timings.start} - {amenity.timings.end}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Price
                      </span>
                      <span className="font-medium">
                        {amenity.pricePerHour === 0
                          ? 'Free'
                          : `₹${amenity.pricePerHour}/hr`}
                      </span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        disabled={amenity.status !== 'available'}
                        onClick={() => setSelectedAmenity(amenity)}
                      >
                        {amenity.status === 'available' ? 'Book Now' : 'Under Maintenance'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book {selectedAmenity?.name}</DialogTitle>
                        <DialogDescription>
                          Select date and time for your booking
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Input type="time" />
                          </div>
                          <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input type="time" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Purpose</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="party">Birthday Party</SelectItem>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="sports">Sports Activity</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Duration</span>
                            <span className="font-medium">2 hours</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Rate</span>
                            <span className="font-medium">
                              ₹{selectedAmenity?.pricePerHour}/hr
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="font-semibold">Total Amount</span>
                            <span className="text-lg font-bold text-blue-600">
                              ₹{(selectedAmenity?.pricePerHour || 0) * 2}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end space-x-3">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Confirm Booking
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </RoleGuard>
  )
}
