"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { ReduxProvider } from "@/lib/redux-provider"
import { AuthGuard } from "@/components/auth-guard"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { CustomerNavbar } from "@/components/customer-navbar"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/customer/login"

  return (
    <ReduxProvider>
      {isLoginPage ? (
        <AuthGuard>{children}</AuthGuard>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <CustomerSidebar />
          <div className="lg:pl-64">
            <CustomerNavbar />
            <main className="py-6 px-4 sm:px-6 lg:px-8 lg:pb-0">
              <AuthGuard>{children}</AuthGuard>
            </main>
          </div>
        </div>
      )}
    </ReduxProvider>
  )
}
