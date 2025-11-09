"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchInstallments, fetchInstallmentSummary } from "@/lib/user/installmentsSlice"
import { InstallmentTable } from "@/components/user/installment-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, DollarSign, Calendar, CheckCircle, AlertCircle } from "lucide-react"
export default function CustomerInstallments() {
  const dispatch = useAppDispatch()
  const { installments, summary, isLoading, error } = useAppSelector((state) => state.installments)

  useEffect(() => {
    dispatch(fetchInstallments())
    dispatch(fetchInstallmentSummary())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your installments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Failed to load installments: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Installments</h1>
          <p className="text-muted-foreground">Track your payment history and upcoming dues</p>
        </div>
        {/* <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div> */}
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm bg-green-500/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Total Paid</p>
                  <p className="text-2xl font-bold text-green-700">₹{summary.totalPaid.toLocaleString()}</p>
                  <p className="text-sm text-green-500 mt-1">{summary.paidCount} payments</p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Total Dues</p>
                  <p className="text-2xl font-bold text-orange-700">₹{summary.totalDue.toLocaleString()}</p>
                  <p className="text-sm text-orange-500 mt-1">{summary.dueCount} pending</p>
                </div>
                <div className="p-3 rounded-full bg-orange-500/20">
                  <Calendar className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground/80 mb-1">Total Balance</p>
                  <p className="text-2xl font-bold text-muted-foreground/80">₹{summary.totalBalance.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground/80 mt-1">Remaining amount</p>
                </div>
                <div className="p-3 rounded-full bg-primary/20">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-destructive/10 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive/80 mb-1">Overdue</p>
                  <p className="text-2xl font-bold text-destructive">{summary.overdueCount}</p>
                  <p className="text-sm text-destructive/70 mt-1">
                    {summary.overdueCount > 0 ? "Needs attention" : "All current"}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-destructive/20">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Status Overview */}
      {summary && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payment Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">{summary.paidCount}</p>
                <p className="text-sm text-muted-foreground">Completed Payments</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-orange-600">{summary.dueCount}</p>
                <p className="text-sm text-muted-foreground">Upcoming Payments</p>
              </div>
              <div className="text-center">
                <div className="bg-red-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-red-600">{summary.overdueCount}</p>
                <p className="text-sm text-muted-foreground">Overdue Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Installments Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <InstallmentTable installments={installments} />
        </CardContent>
      </Card>
    </div>
  )
}
