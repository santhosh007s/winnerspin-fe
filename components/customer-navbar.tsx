"use client"

import { useAppSelector } from "@/lib/hooks"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function CustomerNavbar() {
  const { user } = useAppSelector((state) => state.customerAuth)

  const getUserInitials = (name: string) => {
    if (!name) return "" // Guard against undefined name
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
    <header className="bg-card shadow-sm border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Welcome message */}
          <div className="flex-1">
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-foreground">
                Welcome back, {user ? user.name?.split(" ")[0] : "Customer"}!
              </h2>
              <p className="text-sm text-muted-foreground">{getCurrentTime()}</p>
            </div>
            <div className="sm:hidden">
              <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
            </div>
          </div>

          {/* Right side - Search and user info */}
          <div className="flex items-center space-x-8">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>

            {/* User avatar - desktop only */}
            {user && (
              <div className="hidden lg:flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-muted-foreground">Customer</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
