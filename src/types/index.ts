// User & Authentication Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'resident' | 'guard' | 'committee' | 'vendor'
  avatar?: string
  phone?: string
  unit?: string
  createdAt: Date
  updatedAt: Date
}

// Dashboard Types
export interface DashboardStats {
  totalResidents: number
  totalDues: number
  pendingComplaints: number
  visitorToday: number
  collectionRate: number
  occupancyRate: number
}

// Financial Types
export interface Invoice {
  id: string
  invoiceNumber: string
  patientId: string
  patientName: string
  amount: number
  dueDate: Date
  status: 'paid' | 'pending' | 'overdue'
  items: InvoiceItem[]
  createdAt: Date
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  method: 'online' | 'cash' | 'cheque' | 'upi'
  transactionId?: string
  date: Date
  status: 'success' | 'pending' | 'failed'
}

// Visitor Management Types
export interface Visitor {
  id: string
  name: string
  phone: string
  purpose: string
  visitingUnit: string
  entryTime: Date
  exitTime?: Date
  photo?: string
  qrCode?: string
  vehicleNumber?: string
  status: 'pending' | 'approved' | 'checked-in' | 'checked-out' | 'rejected'
}

// Amenity Types
export interface Amenity {
  id: string
  name: string
  type: 'hall' | 'gym' | 'pool' | 'court' | 'park'
  capacity: number
  pricePerHour: number
  availableDays: string[]
  timings: { start: string; end: string }
  image?: string
  status: 'available' | 'maintenance' | 'booked'
}

export interface Booking {
  id: string
  amenityId: string
  userId: string
  date: Date
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  amount: number
  paymentStatus: 'paid' | 'pending'
}

// Complaint Types
export interface Complaint {
  id: string
  title: string
  description: string
  category: 'maintenance' | 'security' | 'cleanliness' | 'noise' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  reportedBy: string
  assignedTo?: string
  unit: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

// Notice Types
export interface Notice {
  id: string
  title: string
  content: string
  type: 'announcement' | 'emergency' | 'event' | 'maintenance'
  priority: 'low' | 'medium' | 'high'
  publishedBy: string
  publishedAt: Date
  expiresAt?: Date
  attachments?: string[]
}

// Event Types
export interface Event {
  id: string
  title: string
  description: string
  type: 'festival' | 'meeting' | 'activity' | 'maintenance'
  date: Date
  startTime: string
  endTime: string
  venue: string
  organizer: string
  capacity?: number
  registrations?: number
  image?: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
}

// Asset Types
export interface Asset {
  id: string
  name: string
  category: string
  location: string
  purchaseDate: Date
  purchasePrice: number
  currentValue: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  qrCode: string
  maintenanceSchedule?: Date
  images?: string[]
}

// Vendor Types
export interface Vendor {
  id: string
  name: string
  category: 'plumber' | 'electrician' | 'carpenter' | 'cleaner' | 'security' | 'other'
  contact: string
  email?: string
  rating: number
  status: 'active' | 'inactive'
  servicesProvided: string[]
}
