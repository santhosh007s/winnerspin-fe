"use client"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, TrendingUp, Calendar } from "lucide-react"
import type { RootState } from "@/lib/store"

export function RepaymentStats() {
  const { repayments } = useSelector((state: RootState) => state.repayment)
  const { currentSeason } = useSelector((state: RootState) => state.season)

  // Filter repayments by current season
  const seasonRepayments = currentSeason
    ? repayments.filter((repayment) => repayment.seasonId === currentSeason.id)
    : repayments

  // Calculate stats
  const totalRepayments = seasonRepayments.length
  const totalAmount = seasonRepayments.reduce((sum, repayment) => sum + repayment.amount, 0)
  const thisMonthRepayments = seasonRepayments.filter((repayment) => {
    const paymentDate = new Date(repayment.paymentDate)
    const now = new Date()
    return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    {
      title: "Total Repayments",
      value: totalRepayments,
      icon: CreditCard,
      description: currentSeason ? `In ${currentSeason.name}` : "All seasons",
    },
    {
      title: "Total Amount",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: TrendingUp,
      description: "Total collected",
    },
    {
      title: "This Month",
      value: thisMonthRepayments,
      icon: Calendar,
      description: "Repayments received",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
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
