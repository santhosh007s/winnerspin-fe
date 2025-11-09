"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCustomerProfile } from "@/lib/user/customerProfileSlice"
import { fetchInstallmentSummary } from "@/lib/user/installmentsSlice"
import { StatCard } from "@/components/user/stat-card"
import { QuickActionsCard } from "@/components/user/quick-actions-card"
import { NewPosterPopup } from "@/components/promoter/new-poster-popup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, DollarSign, Calendar, CheckCircle, TrendingUp } from "lucide-react"

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
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Calculate payment progress
  const totalInstallments = summary ? summary.paidCount + summary.dueCount + summary.overdueCount : 0
  const paymentProgress = totalInstallments > 0 ? ((summary?.paidCount || 0) / totalInstallments) * 100 : 0

  return (
    <div className="space-y-6">
      <NewPosterPopup audience="customer" />

      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl p-6 text-primary-foreground bg-gradient-to-br from-primary to-primary/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.username?.split(" ")[0]}!</h1>
            <p className="text-primary-foreground/80">Here&apos;s an overview of your account status</p>
          </div>
          <div className="hidden sm:block">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <p className="text-sm text-primary-foreground/80">Account Status</p>
              <p className="text-lg font-semibold">{profile?.status === "approved" ? "Active" : "Inactive"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Dues"
          value={`₹${summary?.totalDue?.toLocaleString() || "0"}`}
          icon={Calendar}
          trend={summary?.overdueCount ? `${summary.overdueCount} overdue` : "On track"}
          trendUp={!summary?.overdueCount}
          className="bg-card"
          iconColor="text-orange-500"
        />
        <StatCard
          title="Total Paid"
          value={`₹${summary?.totalPaid?.toLocaleString() || "0"}`}
          icon={DollarSign}
          trend="+12%"
          trendUp={true}
          className="bg-card"
          iconColor="text-green-500"
        />
        <StatCard
          title="Paid Installments"
          value={summary?.paidCount?.toString() || "0"}
          icon={CheckCircle}
          trend={`${summary?.dueCount || 0} remaining`}
          trendUp={true}
          className="bg-card"
          iconColor="text-primary"
        />
        <StatCard
          title="Payment Progress"
          value={`${Math.round(paymentProgress)}%`}
          icon={TrendingUp}
          trend="Overall progress"
          trendUp={paymentProgress > 50}
          className="bg-card"
          iconColor="text-purple-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Progress Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Payment Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{Math.round(paymentProgress)}% Complete</span>
                </div>
                <Progress value={paymentProgress} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-500">{summary?.paidCount || 0}</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-500">{summary?.dueCount || 0}</p>
                    <p className="text-sm text-orange-600">Due</p>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-500">{summary?.overdueCount || 0}</p>
                    <p className="text-sm text-red-600">Overdue</p>
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
