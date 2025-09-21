"use client"

import { useAppSelector } from "@/lib/hooks"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CustomerNavbar() {
  const { user } = useAppSelector((state) => state.customerAuth)

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getCurrentTime = () => {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Welcome message */}
          <div className="flex-1">
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome back, {user?.name?.split(" ")[0] || "Customer"}!
              </h2>
              <p className="text-sm text-gray-500">{getCurrentTime()}</p>
            </div>
            <div className="sm:hidden">
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            </div>
          </div>

          {/* Right side - Search and user info */}
          <div className="flex items-center space-x-4">
            {/* Search - hidden on mobile */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User avatar - desktop only */}
            {user && (
              <div className="hidden lg:flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500">Customer</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
