"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { LayoutDashboard, Users, CreditCard, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RootState } from "@/lib/store"

const navigation = [
  { name: "Dashboard", href: "/promoter/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/promoter/customers", icon: Users },
  { name: "Repayments", href: "/promoter/repayments", icon: CreditCard },
  { name: "Wallet", href: "/promoter/wallet", icon: Wallet, requiresApproval: true },
  { name: "Profile", href: "/promoter/profile", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.auth)

  const isApproved = user?.status === "approved"

  const filteredNavigation = navigation.filter((item) => !item.requiresApproval || isApproved)

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border z-40">
      <nav className="flex justify-around py-2">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors min-w-0",
                isActive ? "text-sidebar-primary" : "text-sidebar-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
