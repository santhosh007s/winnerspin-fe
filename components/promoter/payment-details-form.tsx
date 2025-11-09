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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Loader2 } from "lucide-react"
import { addPaymentDetails } from "@/lib/promoter/paymentSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export function PaymentDetailsForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    bankName: "",
    accNo: "",
    ifscCode: "",
    accHolderName: "",
    upiId: "",
    branch: "",
    branchAdress: "",
  })

  const dispatch = useDispatch<AppDispatch>()
  const [ifscLoading, setIfscLoading] = useState(false)
  const { isLoading, error, details: paymentDetails } = useSelector((state: RootState) => state.payment)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await dispatch(addPaymentDetails(formData)).unwrap()
      setOpen(false)
    } catch (error) {
      // Error handled by Redux
      console.error("Error adding payment details:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Pre-fill form when editing existing details
  useEffect(() => {
    if (paymentDetails && open) {
      setFormData({
        accHolderName: paymentDetails.accHolderName || "",
        accNo: paymentDetails.accNo || "",
        bankName: paymentDetails.bankName || "",
        ifscCode: paymentDetails.ifscCode || "",
        branch: paymentDetails.branch || "",
        branchAdress: paymentDetails.branchAdress || "",
        upiId: paymentDetails.upiId || "",
      })
    }
  }, [paymentDetails, open]) // Rerun when dialog opens

  // Fetch bank details from IFSC code
  useEffect(() => {
    const fetchBankDetails = async () => {
      if (formData.ifscCode.length === 11) {
        setIfscLoading(true)
        try {
          const response = await fetch(`https://ifsc.razorpay.com/${formData.ifscCode}`)
          const data = await response.json()
          setFormData((prev) => ({ ...prev, bankName: data.BANK, branch: data.BRANCH, branchAdress: data.ADDRESS }))
        } catch (err) {
          console.error("Failed to fetch IFSC details", err)
          // Optionally clear fields or show an error
        } finally {
          setIfscLoading(false)
        }
      }
    }
    fetchBankDetails()
  }, [formData.ifscCode])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={paymentDetails ? "outline" : "default"} className="gap-2">
          <CreditCard className="h-4 w-4" />
          {paymentDetails ? "Update Payment Details" : "Add Payment Details"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>Add or update your bank account details for withdrawals</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input
              id="accountHolderName"
              value={formData.accHolderName}
              onChange={(e) => handleInputChange("accHolderName", e.target.value)}
              placeholder="Enter account holder name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              readOnly
              value={formData.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
              placeholder="Auto-filled from IFSC"
              required
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accNo"
              value={formData.accNo}
              onChange={(e) => handleInputChange("accNo", e.target.value)}
              placeholder="Enter account number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              maxLength={11}
              value={formData.ifscCode}
              onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
              placeholder="Enter IFSC code"
              required
            />
            {ifscLoading && <p className="text-xs text-muted-foreground">Fetching bank details...</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              value={formData.branch}
              readOnly
              onChange={(e) => handleInputChange("branch", e.target.value)}
              placeholder="Auto-filled from IFSC"
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branchAdress">Branch Address</Label>
            <Input
              readOnly
              id="branchAdress"
              value={formData.branchAdress}
              onChange={(e) => handleInputChange("branchAdress", e.target.value)}
              placeholder="Auto-filled from IFSC"
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID (Optional)</Label>
            <Input
              id="upiId"
              value={formData.upiId}
              onChange={(e) => handleInputChange("upiId", e.target.value)}
              placeholder="Enter UPI ID"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Details"}
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
