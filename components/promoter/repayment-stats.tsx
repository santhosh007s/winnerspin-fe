"use client"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, TrendingUp, Calendar } from "lucide-react"
import type { RootState } from "@/lib/store"

export function RepaymentStats() {
  const { repayments } = useSelector((state: RootState) => state.repayment)
  const { currentSeason } = useSelector((state: RootState) => state.season)
  
  // Calculate stats from the new structure
  const allInstallments = repayments.flatMap((customer) => customer.installments)

  const totalRepayments = allInstallments.length
  const totalAmount = allInstallments.reduce((sum, inst) => sum + Number(inst.amount), 0)
  const thisMonthRepayments = allInstallments.filter((inst) => {
    const paymentDate = new Date(inst.paymentDate)
    const now = new Date()
    return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    {
      title: "Total Repayments",
      value: totalRepayments,
      icon: CreditCard,
      description: currentSeason ? `In ${currentSeason.season}` : "All seasons",
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
