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
    roles: ['admin', 'resident', 'guard'], // Available to all
  },
  {
    title: 'Financial',
    icon: Wallet,
    href: '/dashboard/financial',
    roles: ['admin'], // Admin only
    submenu: [
      { title: 'Billing', icon: FileText, href: '/dashboard/financial/billing' },
      { title: 'Invoices', icon: FileText, href: '/dashboard/financial/invoices' },
      { title: 'Payments', icon: TrendingUp, href: '/dashboard/financial/payments' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    href: '/dashboard/security',
    badge: 3,
    roles: ['admin', 'guard'], // Admin and Guard
    submenu: [
      { title: 'Visitors', icon: Users, href: '/dashboard/security/visitors' },
      { title: 'Vehicles', icon: Package, href: '/dashboard/security/vehicles' },
      { title: 'Parcels', icon: Package, href: '/dashboard/security/parcels' },
    ],
  },
  {
    title: 'Residents',
    icon: Users,
    href: '/dashboard/residents',
    roles: ['admin', 'resident'], // Admin and Residents
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
    roles: ['admin'], // Admin only
    submenu: [
      { title: 'Complaints', icon: ClipboardList, href: '/dashboard/admin/complaints' },
      { title: 'Assets', icon: Package, href: '/dashboard/admin/assets' },
      { title: 'Vendors', icon: Users, href: '/dashboard/admin/vendors' },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    roles: ['admin', 'resident', 'guard'], // Available to all
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
      className="h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 shadow-sm"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Society Hub</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-full hover:bg-gray-100"
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
                  'flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Icon
                    className={cn(
                      'h-5 w-5 flex-shrink-0',
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
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
                  <span className="ml-auto flex-shrink-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}

                {!isCollapsed && hasSubmenu && (
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-transform duration-200 ml-auto',
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
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
      <div className="p-4 border-t border-gray-200">
        <div
          className={cn(
            'flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors',
            isCollapsed && 'justify-center'
          )}
        >
          <Avatar className="h-10 w-10 ring-2 ring-blue-100">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
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
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="ml-2 h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
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
