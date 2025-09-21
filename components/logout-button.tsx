"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logoutCustomer } from "@/lib/customerAuthSlice"

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
  className?: string
}

export function LogoutButton({
  variant = "ghost",
  size = "default",
  showIcon = true,
  className = "",
}: LogoutButtonProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.customerAuth)

  const handleLogout = async () => {
    try {
      await dispatch(logoutCustomer()).unwrap()
      router.push("/customer/login")
    } catch (error) {
      console.error("Logout failed:", error)
      // Force redirect even if logout API fails
      router.push("/customer/login")
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} disabled={isLoading} className={className}>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {showIcon && <LogOut className="w-4 h-4 mr-2" />}
          Sign Out
        </>
      )}
    </Button>
  )
}
