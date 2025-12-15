'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  MessageSquare,
  Settings,
  X,
  Send,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const messages = [
  {
    id: 1,
    sender: 'Rajesh Kumar',
    unit: 'A-101',
    message: 'Hi, can you share the maintenance bill?',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    sender: 'Priya Sharma',
    unit: 'B-205',
    message: 'Thanks for resolving the water issue!',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    sender: 'Security Desk',
    unit: 'Gate 1',
    message: 'Visitor arrived for A-502',
    time: '3 hours ago',
    unread: false,
  },
]

export function Header() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notificationCount] = useState(5)
  const [messageOpen, setMessageOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  return (
    <header className="h-16 border-b border-gray-200 bg-white sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-1">
          {/* Logo/Title on mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Menu className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Society</h2>
          </div>

          {/* Search - Hidden on small mobile, visible on tablet+ */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* Search icon only on mobile */}
          <Button variant="ghost" size="icon" className="sm:hidden rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Theme Toggle - Hidden on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full hidden md:flex"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Messages - Hidden on mobile */}
          <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative hidden md:flex">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Messages
                </DialogTitle>
                <DialogDescription>
                  Your recent conversations
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      msg.unread ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => alert(`Opening conversation with ${msg.sender}`)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                        {msg.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{msg.sender}</p>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">{msg.unit}</p>
                      <p className="text-sm text-gray-600 truncate mt-1">{msg.message}</p>
                    </div>
                    {msg.unread && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[60px]"
                />
                <Button
                  size="icon"
                  className="h-[60px] w-[60px] bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => {
                    if (newMessage.trim()) {
                      alert('Message sent: ' + newMessage)
                      setNewMessage('')
                    }
                  }}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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

          {/* Settings - Hidden on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hidden md:flex"
            onClick={() => router.push('/dashboard/settings')}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
