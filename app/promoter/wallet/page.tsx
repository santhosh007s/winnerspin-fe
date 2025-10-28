"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CreditCard, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PaymentDetailsForm } from "@/components/payment-details-form"
import { WithdrawalRequestForm } from "@/components/withdrawal-request-form"
import { fetchEarnings } from "@/lib/promoter/walletSlice"
import { fetchWithdrawals } from "@/lib/promoter/withdrawalSlice"
import { fetchSeasons } from "@/lib/seasonSlice"
import { fetchPromoterProfile } from "@/lib/promoter/authSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export default function WalletPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { earnings, transactions, isLoading } = useSelector((state: RootState) => state.wallet)
  const { details: paymentDetails } = useSelector((state: RootState) => state.payment)
  const { withdrawals, isLoading: isWithdrawalsLoading } = useSelector((state: RootState) => state.withdrawal)
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const hasPendingWithdrawal = withdrawals.some((w) => w.status === "pending")

  useEffect(() => {
    if (!user) {
      dispatch(fetchPromoterProfile(currentSeason?._id))
    }
    if (!currentSeason) {
      dispatch(fetchSeasons())
    }

    if (user?.status === "approved") {
      if (currentSeason?._id) {
        dispatch(fetchEarnings())
      }
      dispatch(fetchWithdrawals())
    }
  }, [dispatch, user, currentSeason])

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
          <WithdrawalRequestForm hasPendingWithdrawal={hasPendingWithdrawal} />
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-card-foreground">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {isLoading ? "Loading..." : `₹${earnings.toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">Earnings in this season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-card-foreground">
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-card-foreground">
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
                <p className="text-lg">{paymentDetails.accHolderName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                <p className="text-lg">{paymentDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                <p className="text-lg font-mono">****{paymentDetails.accNo.slice(-4)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                <p className="text-lg font-mono">{paymentDetails.ifscCode}</p>
              </div>
              {paymentDetails.upiId && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">UPI ID</p>
                  <p className="text-lg font-mono">{paymentDetails.upiId}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Earning History */}
      <Card>
        <CardHeader>
          <CardTitle>Earning History</CardTitle>
          <CardDescription>Your commission history for the current season.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No earnings recorded for this season yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="font-mono text-xs">{transaction.customer}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">+ ₹{transaction.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>All your withdrawal requests and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          {isWithdrawalsLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No withdrawal requests found. Make your first withdrawal request to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested Date</TableHead>
                    <TableHead>Processed Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-semibold text-primary">
                        ₹{withdrawal.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={withdrawal.status === 'approved' ? 'default' : withdrawal.status === 'rejected' ? 'destructive' : 'secondary'}>{withdrawal.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(withdrawal.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{withdrawal.processedAt ? new Date(withdrawal.processedAt).toLocaleDateString() : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
