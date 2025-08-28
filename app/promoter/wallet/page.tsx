"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CreditCard, TrendingUp } from "lucide-react"
import { PaymentDetailsForm } from "@/components/payment-details-form"
import { WithdrawalRequestForm } from "@/components/withdrawal-request-form"
import { fetchEarnings } from "@/lib/walletSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export default function WalletPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { earnings, paymentDetails, isLoading } = useSelector((state: RootState) => state.wallet)

  useEffect(() => {
    if (user?.status === "approved") {
      dispatch(fetchEarnings())
    }
  }, [dispatch, user])

  if (user?.status !== "approved") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Wallet</h1>
          <p className="text-muted-foreground">Manage your earnings and withdrawals</p>
        </div>

        <Alert>
          <AlertDescription>
            Your account is not approved for the current season. Wallet features are only available for approved
            promoters.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Wallet</h1>
          <p className="text-muted-foreground">Manage your earnings and withdrawals</p>
        </div>
        <div className="flex gap-2">
          <PaymentDetailsForm />
          <WithdrawalRequestForm />
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {isLoading ? "Loading..." : `₹${earnings.toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Payment Status</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{paymentDetails ? "Setup" : "Pending"}</div>
            <p className="text-xs text-muted-foreground">
              {paymentDetails ? "Bank details added" : "Add bank details"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Account Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Approved</div>
            <p className="text-xs text-muted-foreground">Eligible for withdrawals</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details */}
      {paymentDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Your registered bank account for withdrawals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Holder</p>
                <p className="text-lg">{paymentDetails.accountHolderName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                <p className="text-lg">{paymentDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                <p className="text-lg font-mono">****{paymentDetails.accountNumber.slice(-4)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                <p className="text-lg font-mono">{paymentDetails.ifscCode}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
