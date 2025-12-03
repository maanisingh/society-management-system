'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  MessageSquare,
  Settings,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [notificationCount] = useState(5)

  return (
    <header className="h-16 border-b border-gray-200 bg-white sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search residents, complaints, invoices..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[400px] overflow-y-auto">
                {[
                  {
                    title: 'New Visitor Entry',
                    description: 'John Doe checked in to Unit A-101',
                    time: '2 min ago',
                    unread: true,
                  },
                  {
                    title: 'Payment Received',
                    description: 'Rs. 15,000 received from Unit B-205',
                    time: '1 hour ago',
                    unread: true,
                  },
                  {
                    title: 'Complaint Resolved',
                    description: 'Water leakage in Block C resolved',
                    time: '3 hours ago',
                    unread: false,
                  },
                  {
                    title: 'New Amenity Booking',
                    description: 'Clubhouse booked for tomorrow',
                    time: '5 hours ago',
                    unread: false,
                  },
                ].map((notification, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-start space-x-3 p-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
