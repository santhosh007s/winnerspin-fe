"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import type { RootState, AppDispatch } from "@/lib/store"
import { fetchPromoterProfile } from "@/lib/authSlice"

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const { token, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!token && pathname !== "/promoter/login") {
      router.push("/promoter/login")
      return
    }

    if (token && !user && pathname !== "/promoter/login") {
      dispatch(fetchPromoterProfile())
    }

    if (token && pathname === "/promoter/login") {
      router.push("/promoter/dashboard")
    }
  }, [token, user, pathname, router, dispatch])

  if (!token && pathname !== "/promoter/login") {
    return null
  }

  if (pathname === "/promoter/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 pb-16 lg:pb-0">
        <main className="p-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}
