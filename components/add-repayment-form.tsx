"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { addRepayment, fetchRepayments } from "@/lib/repaymentSlice"
import type { AppDispatch, RootState } from "@/lib/store"

interface AddRepaymentFormProps {
  customerId: string
  customerName: string
  onSuccess: () => void
}

export function AddRepaymentForm({ customerId, customerName, onSuccess }: AddRepaymentFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const { isLoading } = useSelector((state: RootState) => state.repayment)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSeason) return

    try {
      await dispatch(
        addRepayment({
          customerId,
          seasonId: currentSeason._id,
          amount: Number(currentSeason.amount),
        }),
      ).unwrap()

      // On success
      onSuccess() // This will trigger a refetch in the parent component
    } catch (err) {
      // Error is handled by the slice
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" disabled={isLoading}>
          {isLoading ? "Paying..." : "Pay Due"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
          <AlertDialogDescription>
            Record a payment of{" "}
            <span className="font-bold">₹{Number(currentSeason?.amount).toLocaleString()}</span> for {customerName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm Payment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}