"use client"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, Wallet } from "lucide-react"
import type { RootState } from "@/lib/store"

export function StatsCards() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { repayments } = useSelector((state: RootState) => state.repayment)
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const isApproved = user?.status === "approved"

  const seasonRepayments = currentSeason
    ? repayments.filter((repayment) => repayment.seasonId === currentSeason._id)
    : repayments

  const stats = [
    {
      title: "Total Customers",
      value: user?.customers?.length || 0,
      icon: Users,
      description: "Active customers",
    },
    {
      title: "Repayments",
      value: seasonRepayments.length,
      icon: CreditCard,
      description: currentSeason ? `In ${currentSeason.season}` : "All seasons",
    },
  ]

  if (isApproved) {
    stats.push({
      title: "Balance",
      value: `₹${user?.balance?.toLocaleString() || 0}`,
      icon: Wallet,
      description: "Available earnings",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
