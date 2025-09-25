"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCustomerProfile } from "@/lib/customerProfileSlice"
import { fetchInstallmentSummary } from "@/lib/installmentsSlice"
import { StatCard } from "@/components/stat-card"
import { QuickActionsCard } from "@/components/quick-actions-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, DollarSign, Calendar, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"

export default function CustomerDashboard() {
  const dispatch = useAppDispatch()
  const { profile, isLoading: profileLoading } = useAppSelector((state) => state.customerProfile)
  const { summary, isLoading: summaryLoading } = useAppSelector((state) => state.installments)

  useEffect(() => {
    // Fetch all dashboard data
    dispatch(fetchCustomerProfile())
    dispatch(fetchInstallmentSummary())
  }, [dispatch])

  const isLoading = profileLoading || summaryLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Calculate payment progress
  const totalInstallments = summary ? summary.paidCount + summary.dueCount + summary.overdueCount : 0
  const paymentProgress = totalInstallments > 0 ? ((summary?.paidCount || 0) / totalInstallments) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.name?.split(" ")[0]}!</h1>
            <p className="text-blue-100">Here's an overview of your account status</p>
          </div>
          <div className="hidden sm:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100">Account Status</p>
              <p className="text-lg font-semibold">{profile?.status === "active" ? "Active" : "Inactive"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Paid"
          value={`$${summary?.totalPaid?.toLocaleString() || "0"}`}
          icon={DollarSign}
          trend="+12%"
          trendUp={true}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
          iconColor="text-green-600"
        />
        <StatCard
          title="Balance Due"
          value={`$${summary?.totalDue?.toLocaleString() || "0"}`}
          icon={Calendar}
          trend={summary?.overdueCount ? `${summary.overdueCount} overdue` : "On track"}
          trendUp={!summary?.overdueCount}
          className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Paid Installments"
          value={summary?.paidCount?.toString() || "0"}
          icon={CheckCircle}
          trend={`${summary?.dueCount || 0} remaining`}
          trendUp={true}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Payment Progress"
          value={`${Math.round(paymentProgress)}%`}
          icon={TrendingUp}
          trend="Overall progress"
          trendUp={paymentProgress > 50}
          className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200"
          iconColor="text-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Progress Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Payment Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-medium">{Math.round(paymentProgress)}% Complete</span>
                </div>
                <Progress value={paymentProgress} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-600">{summary?.paidCount || 0}</p>
                    <p className="text-sm text-green-700">Paid</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-600">{summary?.dueCount || 0}</p>
                    <p className="text-sm text-orange-700">Due</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-600">{summary?.overdueCount || 0}</p>
                    <p className="text-sm text-red-700">Overdue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <QuickActionsCard />
      </div>
    </div>
  )
}
