"use client"
import { useState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus } from "lucide-react"
import { addRepayment, fetchRepayments } from "@/lib/repaymentSlice"
import { fetchCustomers } from "@/lib/customerSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export function RepaymentForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    cardNo: "",
    customerId: "",
    paymentDate: "",
  })

  const dispatch = useDispatch<AppDispatch>()
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const { customers } = useSelector((state: RootState) => state.customer)
  const { isLoading, error } = useSelector((state: RootState) => state.repayment)

  useEffect(() => {
    if (open) {
      dispatch(fetchCustomers())
    }
  }, [open, dispatch])

  useEffect(() => {
    if (currentSeason) {
      setFormData((prev) => ({ ...prev, amount: currentSeason.amount.toString() }))
    }
  }, [currentSeason])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSeason) {
      return
    }

    try {
      await dispatch(
        addRepayment({
          amount: Number(formData.amount),
          cardNo: formData.cardNo,
          customerId: formData.customerId,
          seasonId: currentSeason.id,
          paymentDate: formData.paymentDate,
        }),
      ).unwrap()

      // Reset form and close dialog
      setFormData({
        amount: currentSeason.amount.toString(),
        cardNo: "",
        customerId: "",
        paymentDate: "",
      })
      setOpen(false)

      // Refresh repayments list
      dispatch(fetchRepayments())
    } catch (error) {
      // Error handled by Redux
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedCustomer = customers.find((c) => c.id === formData.customerId)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Repayment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Repayment</DialogTitle>
          <DialogDescription>Record a new repayment for the current season: {currentSeason?.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select value={formData.customerId} onValueChange={(value) => handleInputChange("customerId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.username} - {customer.cardNo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNo">Card Number</Label>
            <Input
              id="cardNo"
              value={formData.cardNo}
              onChange={(e) => handleInputChange("cardNo", e.target.value)}
              placeholder={selectedCustomer ? selectedCustomer.cardNo : "Enter card number"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder={`Default: ₹${currentSeason?.amount || 0}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleInputChange("paymentDate", e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Repayment"}
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
