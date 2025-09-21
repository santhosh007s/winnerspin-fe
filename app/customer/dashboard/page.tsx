"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCustomerProfile } from "@/lib/customerProfileSlice"
import { fetchInstallmentSummary } from "@/lib/installmentsSlice"
import { fetchPromoterDetails } from "@/lib/promoterSlice"
import { StatCard } from "@/components/stat-card"
import { QuickActionsCard } from "@/components/quick-actions-card"
import { RecentActivityCard } from "@/components/recent-activity-card"
import { PromoterQuickView } from "@/components/promoter-quick-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Loader2, DollarSign, Calendar, CheckCircle, AlertCircle, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  const dispatch = useAppDispatch()
  const { profile, isLoading: profileLoading } = useAppSelector((state) => state.customerProfile)
  const { summary, isLoading: summaryLoading } = useAppSelector((state) => state.installments)
  const { promoter, isLoading: promoterLoading } = useAppSelector((state) => state.promoter)

  useEffect(() => {
    // Fetch all dashboard data
    dispatch(fetchCustomerProfile())
    dispatch(fetchInstallmentSummary())
    dispatch(fetchPromoterDetails())
  }, [dispatch])

  const isLoading = profileLoading || summaryLoading || promoterLoading

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
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

          {/* Recent Activity */}
          <RecentActivityCard />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Profile Summary</span>
                <Link href="/customer/profile">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Card Number</span>
                <span className="text-sm font-medium">{profile?.cardNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm font-medium truncate">{profile?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium">
                  {profile?.dateJoined ? new Date(profile.dateJoined).getFullYear() : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    profile?.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {profile?.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Promoter Quick View */}
          <PromoterQuickView promoter={promoter} />

          {/* Account Alerts */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Account Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary?.overdueCount && summary.overdueCount > 0 ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800">
                      {summary.overdueCount} overdue payment{summary.overdueCount > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-red-600 mt-1">Please contact your promoter to resolve</p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">All payments up to date</p>
                    <p className="text-xs text-green-600 mt-1">Great job staying current!</p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800">Next payment reminder</p>
                  <p className="text-xs text-blue-600 mt-1">We'll notify you 3 days before due date</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
