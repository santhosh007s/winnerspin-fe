"use client"
import { RepaymentForm } from "@/components/promoter/repayment-form"
import { RepaymentTable } from "@/components/promoter/repayment-table"
import { RepaymentStats } from "@/components/promoter/repayment-stats"

export default function RepaymentsPage() {
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Repayments</h1>
          <p className="text-muted-foreground">Track and manage customer repayments</p>
        </div>
        <RepaymentForm />
      </div>

      <RepaymentStats />
      <RepaymentTable />
    </div>
  )
}
