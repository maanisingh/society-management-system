'use client'

import { usePathname, useRouter } from 'next/navigation'
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
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useAuthStore } from '@/lib/stores/auth-store'

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuthStore()

  // Don't show for admin users (they use sidebar)
  if (user?.role === 'admin') {
    return null
  }

  // Navigation items for residents
  const residentNavItems = [
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
      icon: Calendar,
      label: 'Amenities',
      href: '/dashboard/residents/amenities',
    },
    {
      icon: MessageSquare,
      label: 'Complaints',
      href: '/dashboard/admin/complaints',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
  ]

  // Navigation items for security guards
  const guardNavItems = [
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
      icon: Shield,
      label: 'Vehicles',
      href: '/dashboard/security/vehicles',
    },
    {
      icon: Package,
      label: 'Parcels',
      href: '/dashboard/security/parcels',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
  ]

  const navItems = user?.role === 'guard' ? guardNavItems : residentNavItems

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-20 md:hidden" />

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden shadow-lg">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 transition-colors',
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'text-blue-600')} />
                <span className={cn('text-xs font-medium', isActive && 'text-blue-600')}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
