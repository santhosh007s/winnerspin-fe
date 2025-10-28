"use client"

import { useState } from "react"
import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { updatePassword } from "@/lib/customer/customerAuthSlice"
import { cn } from "@/lib/utils"

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isFirstTime: boolean
  onSuccess?: () => void
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  isFirstTime,
  onSuccess,
}: ChangePasswordDialogProps) {
  const dispatch = useAppDispatch()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      await dispatch(
        updatePassword({
          currentPassword: isFirstTime ? undefined : currentPassword,
          newPassword,
        }),
      ).unwrap()

      // Success
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || "Failed to change password.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    // In a real app, you might want to confirm this action
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("customer-theme", "sm:max-w-[425px]")}>
        <DialogHeader>
          <DialogTitle>{isFirstTime ? "Set Your New Password" : "Change Password"}</DialogTitle>
          <DialogDescription>
            {isFirstTime
              ? "For your security, please set a new password for your account."
              : "Enter your current and new password below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePasswordChange} className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isFirstTime && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-password" className="text-right">
                Current
              </Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="col-span-3" required />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-password" className="text-right">
              New
            </Label>
            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-password" className="text-right">
              Confirm
            </Label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="col-span-3" required />
          </div>
          <DialogFooter className="pt-4">
            {isFirstTime && <Button type="button" variant="ghost" onClick={handleSkip}>Skip For Now</Button>}
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}