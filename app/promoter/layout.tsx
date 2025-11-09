"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { Sidebar } from "@/components/promoter/sidebar"
import { MobileNav } from "@/components/promoter/mobile-nav"
import type { RootState, AppDispatch } from "@/lib/store"
import { fetchPromoterProfile } from "@/lib/promoter/authSlice"
import { fetchSeasons } from "@/lib/seasonSlice"
import { ThemeProvider } from "@/components/theme-provider"

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const { token, user } = useSelector((state: RootState) => state.auth)
  const { currentSeason } = useSelector((state: RootState) => state.season)

  useEffect(() => {
    if (!token && pathname !== "/promoter/login") {
      router.push("/promoter/login")
      return
    }

    if (token && pathname !== "/promoter/login") {
      if (!currentSeason) {
        dispatch(fetchSeasons())
      } else if (!user) {
        dispatch(fetchPromoterProfile(currentSeason._id))
      }
    }

    if (token && pathname === "/promoter/login") {
      router.push("/promoter/dashboard")
    }
  }, [token, user, pathname, router, dispatch, currentSeason])

  if (!token && pathname !== "/promoter/login") {
    return null
  }

  // Show a loading screen for the entire layout until the season is determined
  if (token && !currentSeason && pathname !== "/promoter/login") {
    return <div className="flex h-screen items-center justify-center">Loading season data...</div>
  }

  if (pathname === "/promoter/login") {
    return <>{children}</>
  }

  return (
    <ThemeProvider>
      <div className="overflow-y-auto overscroll-none  min-h-screen bg-background">
        <Sidebar />
        <div className=" lg:pl-64 pb-16 lg:pb-0">
          <main className="p-6">{children}</main>
        </div>
        <MobileNav />
      </div>
    </ThemeProvider>
  )
}
