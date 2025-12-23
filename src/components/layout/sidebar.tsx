'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Wallet,
  Shield,
  Users,
  Wrench,
  Bell,
  Calendar,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
  Home,
  Package,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Headphones,
  BookOpen,
  ShoppingCart,
  ShoppingBag,
  Truck,
  UserCheck,
  Scale,
  Receipt,
  Building,
  MessageCircle,
  PackageCheck,
  Car,
  CreditCard,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const allMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    badge: null,
    roles: ['super_admin', 'admin', 'resident', 'guard'],
  },
  {
    title: 'Guard Station',
    icon: Shield,
    href: '/dashboard/guard',
    roles: ['guard'],
    submenu: [
      { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/guard/dashboard' },
      { title: 'Check-in Visitors', icon: UserCheck, href: '/dashboard/security/visitors' },
      { title: 'Domestic Helpers', icon: Users, href: '/dashboard/staff/maids' },
      { title: 'Parcels', icon: Package, href: '/dashboard/security/parcels' },
    ],
  },
  {
    title: 'My Unit',
    icon: Home,
    href: '/dashboard/my-unit',
    roles: ['resident'],
  },
  {
    title: 'SOS / Emergency',
    icon: AlertTriangle,
    href: '/dashboard/sos',
    badge: null,
    roles: ['super_admin', 'admin', 'resident', 'guard'],
  },
  {
    title: 'Services',
    icon: Wrench,
    href: '/dashboard/services',
    roles: ['super_admin', 'admin', 'resident'],
  },
  {
    title: 'QR Access',
    icon: Shield,
    href: '/dashboard/qr-access',
    roles: ['super_admin', 'admin', 'resident'],
  },
  {
    title: 'Helpdesk',
    icon: Headphones,
    href: '/dashboard/helpdesk',
    roles: ['super_admin', 'admin', 'resident'],
    submenu: [
      { title: 'Tickets', icon: ClipboardList, href: '/dashboard/helpdesk/tickets' },
      { title: 'Live Chat', icon: MessageCircle, href: '/dashboard/helpdesk/chat' },
    ],
  },
  {
    title: 'Financial',
    icon: Wallet,
    href: '/dashboard/financial',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Billing', icon: FileText, href: '/dashboard/financial/billing' },
      { title: 'Invoices', icon: FileText, href: '/dashboard/financial/invoices' },
      { title: 'Payments', icon: TrendingUp, href: '/dashboard/financial/payments' },
    ],
  },
  {
    title: 'Accounting',
    icon: BookOpen,
    href: '/dashboard/accounting',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Income & Expense', icon: TrendingUp, href: '/dashboard/accounting/income-expense' },
      { title: 'General Ledger', icon: BookOpen, href: '/dashboard/accounting/ledger' },
      { title: 'Trial Balance', icon: Scale, href: '/dashboard/accounting/trial-balance' },
      { title: 'Journal Entries', icon: FileText, href: '/dashboard/accounting/journal' },
      { title: 'Bank Management', icon: Building, href: '/dashboard/accounting/bank' },
      { title: 'Vendor Payments', icon: Receipt, href: '/dashboard/accounting/vendor-payments' },
    ],
  },
  {
    title: 'Purchase',
    icon: ShoppingCart,
    href: '/dashboard/purchase',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Purchase Requests', icon: FileText, href: '/dashboard/purchase/requests' },
      { title: 'Purchase Orders', icon: ShoppingCart, href: '/dashboard/purchase/orders' },
      { title: 'GR/SR', icon: PackageCheck, href: '/dashboard/purchase/receipts' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    href: '/dashboard/security',
    badge: 3,
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Visitors', icon: Users, href: '/dashboard/security/visitors' },
      { title: 'Vehicles', icon: Package, href: '/dashboard/security/vehicles' },
      { title: 'Parcels', icon: Package, href: '/dashboard/security/parcels' },
    ],
  },
  {
    title: 'Parking',
    icon: Car,
    href: '/dashboard/parking',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Slot Management', icon: Car, href: '/dashboard/parking/slots' },
      { title: 'Payments', icon: CreditCard, href: '/dashboard/parking/payments' },
    ],
  },
  {
    title: 'Staff Management',
    icon: Users,
    href: '/dashboard/staff',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Security Guards', icon: Shield, href: '/dashboard/staff/guards' },
      { title: 'Domestic Helpers', icon: Users, href: '/dashboard/staff/maids' },
    ],
  },
  {
    title: 'Move In/Out',
    icon: Truck,
    href: '/dashboard/move-management',
    roles: ['super_admin', 'admin'],
  },
  {
    title: 'Community',
    icon: Users,
    href: '/dashboard/residents',
    roles: ['resident'],
    submenu: [
      { title: 'Forum', icon: MessageSquare, href: '/dashboard/community/forum' },
      { title: 'Amenities', icon: Calendar, href: '/dashboard/residents/amenities' },
      { title: 'Events', icon: Calendar, href: '/dashboard/residents/events' },
      { title: 'Notices', icon: Bell, href: '/dashboard/residents/notices' },
      { title: 'Facility Requests', icon: Building, href: '/dashboard/facilities/requests' },
    ],
  },
  {
    title: 'Marketplace',
    icon: ShoppingBag,
    href: '/dashboard/marketplace',
    roles: ['resident'],
  },
  {
    title: 'Residents',
    icon: Users,
    href: '/dashboard/residents',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Directory', icon: Users, href: '/dashboard/residents/directory' },
      { title: 'Amenities', icon: Calendar, href: '/dashboard/residents/amenities' },
      { title: 'Events', icon: Calendar, href: '/dashboard/residents/events' },
      { title: 'Notices', icon: Bell, href: '/dashboard/residents/notices' },
    ],
  },
  {
    title: 'Administration',
    icon: Wrench,
    href: '/dashboard/admin',
    roles: ['super_admin', 'admin'],
    submenu: [
      { title: 'Tenants', icon: UserCheck, href: '/dashboard/admin/tenants' },
      { title: 'Complaints', icon: ClipboardList, href: '/dashboard/admin/complaints' },
      { title: 'Assets', icon: Package, href: '/dashboard/admin/assets' },
      { title: 'Vendors', icon: Users, href: '/dashboard/admin/vendors' },
      { title: 'Defaulters', icon: AlertTriangle, href: '/dashboard/admin/defaulters' },
      { title: 'Facility Requests', icon: Building, href: '/dashboard/facilities/requests' },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    roles: ['super_admin', 'admin', 'resident', 'guard'],
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter((item) =>
    item.roles?.includes(user?.role || 'resident')
  )

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/login'
  }

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-[#1e3a5f] flex flex-col sticky top-0 shadow-xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#2d4a6f] flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2.5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">ADDA</h2>
                <p className="text-xs text-teal-300">
                  {user?.role === 'admin'
                    ? 'Community Manager'
                    : user?.role === 'guard'
                    ? 'Gatekeeper'
                    : 'Resident App'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-full hover:bg-[#2d4a6f] text-white/70 hover:text-white"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isExpanded = expandedMenus.includes(item.title)
          const hasSubmenu = item.submenu && item.submenu.length > 0

          return (
            <div key={item.title}>
              <Link
                href={hasSubmenu ? '#' : item.href}
                onClick={(e) => {
                  if (hasSubmenu) {
                    e.preventDefault()
                    toggleMenu(item.title)
                  }
                }}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                    : 'text-white/70 hover:bg-[#2d4a6f] hover:text-white'
                )}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Icon
                    className={cn(
                      'h-5 w-5 flex-shrink-0',
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    )}
                  />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm font-medium truncate"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {!isCollapsed && item.badge && (
                  <span className="ml-auto flex-shrink-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}

                {!isCollapsed && hasSubmenu && (
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-transform duration-200 ml-auto text-white/50',
                      isExpanded && 'rotate-90'
                    )}
                  />
                )}
              </Link>

              {/* Submenu */}
              <AnimatePresence>
                {hasSubmenu && isExpanded && !isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.submenu?.map((subItem) => {
                      const SubIcon = subItem.icon
                      const isSubActive = pathname === subItem.href

                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors',
                            isSubActive
                              ? 'bg-teal-500/20 text-teal-300 font-medium'
                              : 'text-white/60 hover:bg-[#2d4a6f] hover:text-white'
                          )}
                        >
                          <SubIcon className="h-4 w-4" />
                          <span>{subItem.title}</span>
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#2d4a6f]">
        <div
          className={cn(
            'flex items-center p-3 rounded-xl bg-[#2d4a6f]/50 hover:bg-[#2d4a6f] transition-colors',
            isCollapsed && 'justify-center'
          )}
        >
          <Avatar className="h-10 w-10 ring-2 ring-teal-400/50">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white font-semibold">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-white/60 truncate">{user?.email}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="ml-2 h-8 w-8 text-white/60 hover:text-red-400 hover:bg-red-500/20"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
