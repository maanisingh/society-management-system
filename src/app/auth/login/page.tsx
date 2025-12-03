'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/lib/stores/auth-store'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const demoAccounts = [
    { role: 'Admin', email: 'admin@society.com', password: 'admin123', icon: '👨‍💼' },
    { role: 'Resident', email: 'resident@society.com', password: 'resident123', icon: '🏠' },
    { role: 'Guard', email: 'guard@society.com', password: 'guard123', icon: '🛡️' },
  ]

  const handleDemoLogin = (email: string, password: string) => {
    setValue('email', email)
    setValue('password', password)
    toast.success('Demo credentials filled! Click Sign In to proceed.')
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Determine role based on email
      let role: 'admin' | 'resident' | 'guard' = 'admin'
      let name = 'User'

      if (data.email.includes('admin')) {
        role = 'admin'
        name = 'Admin User'
      } else if (data.email.includes('resident')) {
        role = 'resident'
        name = 'Resident User'
      } else if (data.email.includes('guard') || data.email.includes('security')) {
        role = 'guard'
        name = 'Security Guard'
      }

      // Mock login - in production, call your API
      login({
        id: '1',
        email: data.email,
        name,
        role,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      toast.success(`Welcome back, ${name}! 👋`)
      router.push('/dashboard')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-12 text-white flex-col justify-between relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Society Hub</h2>
              <p className="text-blue-100 text-sm">Smart Community Management</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Welcome to the
                <br />
                Future of Living
              </h1>
              <p className="text-blue-100 text-lg">
                Experience seamless society management with our all-in-one platform
              </p>
            </div>

            <div className="space-y-4 mt-12">
              {[
                'Real-time visitor management & security',
                'Automated billing & payment tracking',
                'Amenity booking & community events',
                'Complaint tracking & resolution',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span className="text-blue-50">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-100 text-sm">
            Trusted by 500+ residential communities across India
          </p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-xl border-0">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to access your society dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@society.com"
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              {/* Demo Credentials Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-amber-900 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-amber-600" />
                    Quick Demo Login
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.role}
                      type="button"
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      className="flex flex-col items-center justify-center p-3 bg-white border-2 border-amber-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all group"
                    >
                      <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                        {account.icon}
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {account.role}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-amber-700 mt-2 text-center">
                  Click any role to auto-fill credentials
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/auth/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact{' '}
              <a
                href="mailto:support@societyhub.com"
                className="text-blue-600 hover:underline font-medium"
              >
                support@societyhub.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
