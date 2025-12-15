'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Home,
  Calendar,
  Bell,
  Settings,
  Users,
  Package,
  Shield,
  MessageSquare,
  MoreHorizontal,
  X,
  Wallet,
  FileText,
  Megaphone,
  Car,
  Building,
  LogOut,
  User,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useAuthStore } from '@/lib/stores/auth-store'

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  // Don't show for admin users (they use sidebar)
  if (user?.role === 'admin') {
    return null
  }

  // Primary navigation items for residents (shown in bottom bar)
  const residentPrimaryNav = [
    {
      icon: LayoutDashboard,
      label: 'Home',
      href: '/dashboard',
    },
    {
      icon: Home,
      label: 'My Unit',
      href: '/dashboard/my-unit',
    },
    {
      icon: Wallet,
      label: 'Billing',
      href: '/dashboard/financial/billing',
    },
    {
      icon: MessageSquare,
      label: 'Complaints',
      href: '/dashboard/admin/complaints',
    },
  ]

  // More menu items for residents
  const residentMoreNav = [
    {
      icon: Calendar,
      label: 'Amenities',
      href: '/dashboard/residents/amenities',
    },
    {
      icon: Bell,
      label: 'Events',
      href: '/dashboard/residents/events',
    },
    {
      icon: Megaphone,
      label: 'Notices',
      href: '/dashboard/residents/notices',
    },
    {
      icon: Users,
      label: 'Directory',
      href: '/dashboard/residents/directory',
    },
    {
      icon: FileText,
      label: 'Invoices',
      href: '/dashboard/financial/invoices',
    },
    {
      icon: User,
      label: 'Profile',
      href: '/dashboard/profile',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
    {
      icon: HelpCircle,
      label: 'Help',
      href: '/dashboard/help',
    },
  ]

  // Primary navigation items for security guards
  const guardPrimaryNav = [
    {
      icon: LayoutDashboard,
      label: 'Home',
      href: '/dashboard',
    },
    {
      icon: Users,
      label: 'Visitors',
      href: '/dashboard/security/visitors',
    },
    {
      icon: Car,
      label: 'Vehicles',
      href: '/dashboard/security/vehicles',
    },
    {
      icon: Package,
      label: 'Parcels',
      href: '/dashboard/security/parcels',
    },
  ]

  // More menu items for guards
  const guardMoreNav = [
    {
      icon: Shield,
      label: 'Security Log',
      href: '/dashboard/security/log',
    },
    {
      icon: Bell,
      label: 'Alerts',
      href: '/dashboard/security/alerts',
    },
    {
      icon: User,
      label: 'Profile',
      href: '/dashboard/profile',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
    {
      icon: HelpCircle,
      label: 'Help',
      href: '/dashboard/help',
    },
  ]

  const isGuard = user?.role === 'guard'
  const primaryNav = isGuard ? guardPrimaryNav : residentPrimaryNav
  const moreNav = isGuard ? guardMoreNav : residentMoreNav

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMoreOpen(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
    setIsMoreOpen(false)
  }

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* More Menu Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl md:hidden"
            >
              {/* Handle Bar */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">More Options</h3>
                <button
                  onClick={() => setIsMoreOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Menu Grid */}
              <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-4 gap-4">
                  {moreNav.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          'flex flex-col items-center justify-center p-3 rounded-xl transition-all',
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        )}
                      >
                        <div
                          className={cn(
                            'p-2 rounded-xl mb-1',
                            isActive ? 'bg-blue-100' : 'bg-gray-100'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Logout Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full gap-2 py-3 px-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden shadow-lg safe-area-bottom">
        <div className="grid grid-cols-5 h-16">
          {primaryNav.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  'flex flex-col items-center justify-center space-y-0.5 transition-colors relative',
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900 active:bg-gray-50'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-b-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={cn('h-5 w-5', isActive && 'text-blue-600')} />
                <span className={cn('text-[10px] font-medium', isActive && 'text-blue-600')}>
                  {item.label}
                </span>
              </button>
            )
          })}

          {/* More Button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={cn(
              'flex flex-col items-center justify-center space-y-0.5 transition-colors relative',
              isMoreOpen
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-900 active:bg-gray-50'
            )}
          >
            {isMoreOpen && (
              <motion.div
                layoutId="activeTab"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-b-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <MoreHorizontal className={cn('h-5 w-5', isMoreOpen && 'text-blue-600')} />
            <span className={cn('text-[10px] font-medium', isMoreOpen && 'text-blue-600')}>
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
