"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CustomerForm } from "@/components/user/customer-form"
import { CustomerTable } from "@/components/promoter/customer-table"

export default function CustomersPage() {
  const searchParams = useSearchParams()
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get("action") === "add") {
      setIsFormOpen(true)
    }
  }, [searchParams])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <CustomerForm open={isFormOpen} onOpenChange={setIsFormOpen} />
      </div>

      <CustomerTable />
    </div>
  )
}
