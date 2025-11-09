"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowDownToLine } from "lucide-react"
import { fetchWithdrawals, requestWithdrawal } from "@/lib/promoter/withdrawalSlice"
import { fetchEarnings } from "@/lib/promoter/walletSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchSeasons } from "@/lib/seasonSlice"
import { fetchPromoterProfile } from "@/lib/promoter/authSlice"

export function WithdrawalRequestForm({ hasPendingWithdrawal }: { hasPendingWithdrawal: boolean }) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const { earnings } = useSelector((state: RootState) => state.wallet)
  const { details: paymentDetails } = useSelector((state: RootState) => state.payment)
  const { isLoading, error } = useSelector((state: RootState) => state.withdrawal)
  const { currentSeason } = useSelector((state: RootState) => state.season)

  useEffect(() => {
    if (!currentSeason) {
      dispatch(fetchSeasons())
    }
  }, [dispatch, currentSeason])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentDetails) {
      return
    }

    const withdrawalAmount = Number(amount)
    if (withdrawalAmount > earnings) {
      return
    }

    try {
      if(!currentSeason) return;
      await dispatch(requestWithdrawal({ amount: withdrawalAmount, seasonId: currentSeason._id })).unwrap()
      setAmount("")
      setOpen(false)
      // Refresh earnings
      dispatch(fetchEarnings())
      dispatch(fetchWithdrawals())
      dispatch(fetchPromoterProfile(currentSeason._id))
    } catch (error) {
      // Error handled by Redux
      console.error("Error requesting withdrawal:", error)
    }
  }

  if (!paymentDetails || hasPendingWithdrawal) {
    return (
      <Button disabled={true} className="gap-2">
        <ArrowDownToLine className="h-4 w-4" />
        {hasPendingWithdrawal ? "Pending Request Exists" : "Add Payment Details First"}
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" disabled={hasPendingWithdrawal}>
          <ArrowDownToLine className="h-4 w-4" />
          {hasPendingWithdrawal ? "Pending Request Exists" : "Request Withdrawal"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Withdrawal</DialogTitle>
          <DialogDescription>Withdraw your available earnings to your bank account</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold text-primary">₹{earnings.toLocaleString()}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Withdrawal Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to withdraw"
              max={earnings}
              min="1"
              required
            />
            {Number(amount) > earnings && (
              <p className="text-sm text-destructive">Amount cannot exceed available balance</p>
            )}
          </div>

          <div className="p-4 bg-card border rounded-lg">
            <p className="text-sm font-medium mb-2">Withdrawal will be sent to:</p>
            <p className="text-sm text-muted-foreground">{paymentDetails.accHolderName}</p>
            <p className="text-sm text-muted-foreground">{paymentDetails.bankName}</p>
            <p className="text-sm text-muted-foreground">****{paymentDetails.accNo.slice(-4)}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading || Number(amount) > earnings || !amount}>
              {isLoading ? "Processing..." : "Request Withdrawal"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
