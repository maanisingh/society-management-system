'use client'

import { useAuthStore } from '@/lib/stores/auth-store'
import { AdminDashboard } from '@/components/dashboard/admin-dashboard'
import { ResidentDashboard } from '@/components/dashboard/resident-dashboard'
import { SecurityDashboard } from '@/components/dashboard/security-dashboard'

export default function DashboardPage() {
  const { user } = useAuthStore()

  // Render role-specific dashboard
  if (user?.role === 'admin') {
    return <AdminDashboard />
  }

  if (user?.role === 'resident') {
    return <ResidentDashboard />
  }

  if (user?.role === 'guard') {
    return <SecurityDashboard />
  }

  // Default to resident dashboard if role is not set
  return <ResidentDashboard />
}
