"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SeasonSwitcher } from "@/components/season-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsCards } from "@/components/stats-cards"
import { NewPosterPopup } from "@/components/new-poster-popup"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

export default function PromoterDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { currentSeason } = useSelector((state: RootState) => state.season)

  return (
    <div className="space-y-6">
      <NewPosterPopup audience="promoter" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <SeasonSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Current Season Info */}
      {currentSeason && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Season</CardTitle>
            <CardDescription>Active season information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Season</p>
                <p className="text-lg font-semibold text-primary">{currentSeason.season}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <p className="text-lg font-semibold text-primary">₹{currentSeason.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold text-primary">{currentSeason.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-primary mb-2">Add New Customer</h3>
              <p className="text-sm text-muted-foreground">Register a new customer for the current season</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-primary mb-2">Record Repayment</h3>
              <p className="text-sm text-muted-foreground">Add a repayment for existing customers</p>
            </div>
            {user?.status === "approved" && (
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h3 className="font-medium text-primary mb-2">Request Withdrawal</h3>
                <p className="text-sm text-muted-foreground">Withdraw your available earnings</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
