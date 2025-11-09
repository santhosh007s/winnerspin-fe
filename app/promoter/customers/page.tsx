"use client"
import { CustomerForm } from "@/components/user/customer-form"
import { CustomerTable } from "@/components/user/customer-table"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <CustomerForm />
      </div>

      <CustomerTable />
    </div>
  )
}
