"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCustomerDetails,
  clearSelectedCustomer,
  updateCustomerDetails,
} from "@/lib/customer/customerSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Edit, User, Mail, Phone, MapPin } from "lucide-react"

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const [isEditing, setIsEditing] = useState(false)
  const customerId = params.id as string

  const { selectedCustomer, isLoading, error } = useSelector((state: RootState) => state.customer)

  useEffect(() => {
    console.log("selectedCustomer", selectedCustomer);
    console.log("isLoading", isLoading);
    console.log("error", error);
  }, [selectedCustomer, isLoading, error])
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCustomerDetails(customerId))
    }

    return () => {
      dispatch(clearSelectedCustomer())
    }
  }, [dispatch, customerId])

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        username: selectedCustomer.username,
        email: selectedCustomer.email,
        mobile: selectedCustomer.mobile,
        address: selectedCustomer.address,
        city: selectedCustomer.city,
        state: selectedCustomer.state,
        pincode: selectedCustomer.pincode.toString(),
      })
    }
  }, [selectedCustomer])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(updateCustomerDetails({ customerId, updateData: formData })).unwrap()
      // Optionally show a success toast/message
      router.push("/promoter/customers")
    } catch (err) {
      // Error is handled by the slice
    }
  }

  if (isLoading && !selectedCustomer) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-1/4 bg-muted animate-pulse rounded" />
        <Card>
          <CardHeader>
            <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!selectedCustomer) {
    return <div>No customer data found.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {isEditing ? "Edit Customer" : "Customer Details"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update details for" : "Viewing details for"} {selectedCustomer.username}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            {isEditing
              ? "Make changes to the customer's profile below."
              : "Review the customer's information."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div className="space-y-1">
                  <Label>Username</Label>
                  <p className="text-lg">{selectedCustomer.username}</p>
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <p className="text-lg">{selectedCustomer.email}</p>
                </div>
                <div className="space-y-1">
                  <Label>Mobile</Label>
                  <p className="text-lg">{selectedCustomer.mobile}</p>
                </div>
                <div className="space-y-1">
                  <Label>Card Number</Label>
                  <p className="text-lg font-mono">{selectedCustomer.cardNo}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <Label>Address</Label>
                  <p className="text-lg">{selectedCustomer.address}</p>
                </div>
                <div className="space-y-1">
                  <Label>City</Label>
                  <p className="text-lg">{selectedCustomer.city}</p>
                </div>
                <div className="space-y-1">
                  <Label>State</Label>
                  <p className="text-lg">{selectedCustomer.state}</p>
                </div>
                <div className="space-y-1">
                  <Label>Pincode</Label>
                  <p className="text-lg">{selectedCustomer.pincode}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Back to List
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}