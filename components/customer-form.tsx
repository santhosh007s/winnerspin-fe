"use client"
import { useState } from "react"
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
import { Plus } from "lucide-react"
import { createCustomer, fetchCustomers } from "@/lib/customerSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export function CustomerForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    cardNo: "",
    mobile: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    firstPayment: "",
    paymentDate: ""
  })
  
  const dispatch = useDispatch<AppDispatch>()
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const { isLoading, error } = useSelector((state: RootState) => state.customer)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating Customer ...", formData);
    console.log("currentSeason", currentSeason);
    if (!currentSeason) {
      return
    }
    try {
      await dispatch(
        createCustomer({
          ...formData,
          firstPayment: Number(formData.firstPayment),
          seasonId: currentSeason._id,
        }),
      ).unwrap()

      // Reset form and close dialog
      setFormData({
        username: "",
        password: "",
        email: "",
        cardNo: "",
        mobile: "",
        state: "",
        city: "",
        address: "",
        pincode: "",
        firstPayment: "",
        paymentDate: "",
      })
      setOpen(false)

      // Refresh customers list
      if (currentSeason) dispatch(fetchCustomers(currentSeason._id))
    } catch (error) {
      // Error handled by Redux
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>Create a new customer for the current season: {currentSeason?.season}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Card Number</Label>
              <Input
                id="cardNo"
                type="cardNo"
                value={formData.cardNo}
                onChange={(e) => handleInputChange("cardNo", e.target.value)}
                placeholder="WS0001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="Enter state"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                placeholder="Enter pincode"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstPayment">First Payment</Label>
              <Input
                id="firstPayment"
                type="number"
                value={formData.firstPayment}
                onChange={(e) => handleInputChange("firstPayment", e.target.value)}
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
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Customer"}
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
