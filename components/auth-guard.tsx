"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { verifyToken } from "@/lib/customerAuthSlice"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.customerAuth)
  const [isVerifying, setIsVerifying] = useState(true)

  const isPublicPage = pathname === "/customer/login"

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          await dispatch(verifyToken()).unwrap()
        } catch (error) {
          if (!isPublicPage) {
            router.push("/customer/login")
          }
        } finally {
          setIsVerifying(false)
        }
      } else {
        setIsVerifying(false)
      }
    }
    checkAuth()
  }, [dispatch, isAuthenticated, router, isPublicPage])

  // Show loading spinner while checking authentication
  if (isVerifying && !isPublicPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying your session...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on a public page, don't render children (redirect will happen)
  if (!isAuthenticated && !isPublicPage) {
    return null
  }

  return <>{children}</>
}
