"use client"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MapPin, CreditCard, Calendar } from "lucide-react"
import { fetchCustomerDetails, clearSelectedCustomer } from "@/lib/customerSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export default function CustomerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedCustomer, isLoading } = useSelector((state: RootState) => state.customer)

  const customerId = params.id as string

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCustomerDetails(customerId))
    }

    return () => {
      dispatch(clearSelectedCustomer())
    }
  }, [customerId, dispatch])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!selectedCustomer) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Customer not found</p>
        <Button variant="outline" onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">{selectedCustomer.username}</h1>
          <p className="text-muted-foreground">Customer Details</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{selectedCustomer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mobile</p>
              <p className="text-lg">{selectedCustomer.mobile}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Card Number</p>
              <p className="text-lg font-mono">{selectedCustomer.cardNo}</p>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-lg">{selectedCustomer.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">City</p>
                <p className="text-lg">{selectedCustomer.city}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">State</p>
                <p className="text-lg">{selectedCustomer.state}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pincode</p>
              <p className="text-lg">{selectedCustomer.pincode}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">First Payment</p>
              <p className="text-2xl font-bold text-primary">₹{selectedCustomer.firstPayment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Date</p>
              <p className="text-lg">{new Date(selectedCustomer.paymentDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Season Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Season Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Season ID</p>
              <p className="text-lg">{selectedCustomer.seasonId}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
