"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchInstallments, fetchInstallmentSummary } from "@/lib/installmentsSlice"
import { InstallmentTable } from "@/components/installment-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, DollarSign, Calendar, CheckCircle, AlertCircle, Download, Filter } from "lucide-react"

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
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your installments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load installments: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Installments</h1>
          <p className="text-gray-600">Track your payment history and upcoming dues</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Total Paid</p>
                  <p className="text-2xl font-bold text-green-900">${summary.totalPaid.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">{summary.paidCount} payments</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 mb-1">Balance Due</p>
                  <p className="text-2xl font-bold text-orange-900">${summary.totalDue.toLocaleString()}</p>
                  <p className="text-sm text-orange-600 mt-1">{summary.dueCount} pending</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Total Balance</p>
                  <p className="text-2xl font-bold text-blue-900">${summary.totalBalance.toLocaleString()}</p>
                  <p className="text-sm text-blue-600 mt-1">Remaining amount</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 mb-1">Overdue</p>
                  <p className="text-2xl font-bold text-red-900">{summary.overdueCount}</p>
                  <p className="text-sm text-red-600 mt-1">
                    {summary.overdueCount > 0 ? "Needs attention" : "All current"}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100">
                  <AlertCircle className="w-6 h-6 text-red-600" />
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
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{summary.paidCount}</p>
                <p className="text-sm text-gray-600">Completed Payments</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">{summary.dueCount}</p>
                <p className="text-sm text-gray-600">Upcoming Payments</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">{summary.overdueCount}</p>
                <p className="text-sm text-gray-600">Overdue Payments</p>
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
