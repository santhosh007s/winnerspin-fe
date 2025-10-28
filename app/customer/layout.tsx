"use client"

import React, { Suspense } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"

import { ReduxProvider } from "@/lib/redux-provider"
import { useAppSelector } from "@/lib/hooks"
import { selectIsGlobalLoading } from "@/lib/customer/globalLoadingSlice"
import { AuthGuard } from "@/components/auth-guard"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { CustomerNavbar } from "@/components/customer-navbar"
import Loader from "@/components/customer/Loader"

function CustomerLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/customer/login"
  const isGlobalLoading = useAppSelector(selectIsGlobalLoading)

  const pageIsLoading = isGlobalLoading && !isLoginPage

  return (
    <ThemeProvider>
      <ReduxProvider>
        {isLoginPage ? (
          <AuthGuard>{children}</AuthGuard>
        ) : (
          <div className="customer-theme min-h-screen bg-background pb-10">
            <CustomerSidebar />
            <div className="lg:pl-64">
              <CustomerNavbar />
              <main className="relative py-6 px-4 sm:px-6 lg:px-8 lg:pb-0">
                {pageIsLoading && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <Loader />
                  </div>
                )}
                <AuthGuard>{children}</AuthGuard>
              </main>
            </div>
          </div>
        )}
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Suspense>
        <CustomerLayoutContent>{children}</CustomerLayoutContent>
      </Suspense>
    </ReduxProvider>
  )
}
