"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { LayoutDashboard, Users, CreditCard, Wallet, ArrowDownToLine, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/authSlice"
import type { RootState, AppDispatch } from "@/lib/store"

const navigation = [
  { name: "Dashboard", href: "/promoter/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/promoter/customers", icon: Users },
  { name: "Repayments", href: "/promoter/repayments", icon: CreditCard },
  { name: "Wallet", href: "/promoter/wallet", icon: Wallet, requiresApproval: true },
  { name: "Profile", href: "/promoter/profile", icon: User },
]

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const isApproved = user?.status === "approved"

  const handleLogout = () => {
    dispatch(logout())
  }

  const filteredNavigation = navigation.filter((item) => !item.requiresApproval || isApproved)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-primary">Promoter Dashboard</h1>
            {user && <p className="text-sm text-sidebar-foreground mt-1">Welcome, {user.username}</p>}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button className="bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20 hover:text-destructive transition-colors w-full justify-center" onClick={handleLogout}>
              <LogOut /> Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
