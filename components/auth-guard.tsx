"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { verifyToken, passwordUpdateSuccess } from "@/lib/customerAuthSlice"
import { Loader2 } from "lucide-react"
import { ChangePasswordDialog } from "./change-password-dialog"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.customerAuth)
  const [isVerifying, setIsVerifying] = useState(true)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  const isPublicPage = pathname === "/customer/login"

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          // verifyToken will fetch user data, including the `mustChangePassword` flag
          await dispatch(verifyToken()).unwrap()
        } catch (error) {
          // The slice will set isAuthenticated to false, which the next effect will handle
        }
      }
      setIsVerifying(false)
    }
    checkAuth()
  }, [dispatch]) // Run only once on mount

  useEffect(() => {
    if (!isLoading && !isVerifying) {
      if (!isAuthenticated && !isPublicPage) {
        router.push("/customer/login")
      } else if (isAuthenticated && user?.mustChangePassword) {
      setShowPasswordDialog(true)
      }
    }
  }, [isAuthenticated, user, isPublicPage, router, isLoading, isVerifying])

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

  return (
    <>
      {children}
      <ChangePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        isFirstTime={true}
        onSuccess={() => dispatch(passwordUpdateSuccess())}
      />
    </>
  )
}
