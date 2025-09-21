"use client"
import { useEffect } from "react"
import { format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchRepayments } from "@/lib/repaymentSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { AddRepaymentForm } from "./add-repayment-form"
import { Alert, AlertDescription } from "./ui/alert"
import { fetchCustomers } from "@/lib/customerSlice"

export function RepaymentTable() {
  const dispatch = useDispatch<AppDispatch>()
  const {customers} = useSelector((state: RootState) => state.customer)
  
  useEffect(() => {
    if (currentSeason && !customers.length) dispatch(fetchCustomers(currentSeason._id))
  }, [])
  const { repayments, isLoading, error } = useSelector((state: RootState) => state.repayment)
  const { currentSeason } = useSelector((state: RootState) => state.season)
  
  useEffect(() => {
    if (currentSeason) {
      dispatch(fetchRepayments(currentSeason._id))
    }
  }, [dispatch, currentSeason])

  const handleRepaymentSuccess = () => {
    if (currentSeason) dispatch(fetchRepayments(currentSeason._id))
  }

  const isLoadingInitial = isLoading && repayments.length === 0

  const getMonthHeaders = () => {
    if (!currentSeason) return []
    const headers = []
    const start = new Date(currentSeason.startDate)
    const end = new Date(currentSeason.endDate)

    let current = start
    while (current <= end) {
      headers.push(new Date(current))
      current.setMonth(current.getMonth() + 1)
    }
    return headers
  }

  const monthHeaders = getMonthHeaders()

  if (isLoadingInitial) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Installment Status</CardTitle>
        <CardDescription>
          An overview of all customer dues and payments for the current season.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {repayments.length === 0 && !isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No customers found for this season.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  {monthHeaders.map((month) => (
                    <TableHead key={month.toISOString()} className="text-center">
                      {format(month, "MMM yyyy")}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {repayments.map((customer) => {
                  const paidInstallmentNumbers = customer.installments.map((inst) => inst.installmentNo)
                  const dueInstallments = customer.dues.map((due) => due.installmentNo)

                  return (
                    <TableRow key={customer.customerId}>
                      <TableCell className="font-medium">
                        <div className="font-bold">{customer.customerName}</div>
                        <div className="text-xs text-muted-foreground">{customer.cardNo}</div>
                      </TableCell>
                      {monthHeaders.map((month, index) => {
                        const installmentNo = index + 1
                        const isPaid = paidInstallmentNumbers.includes(installmentNo)
                        const isDue = dueInstallments.includes(installmentNo)

                        return (
                          <TableCell key={month.toISOString()} className="text-center">
                            {isPaid ? (
                              <Badge variant="default">Paid</Badge>
                            ) : isDue ? (
                              <AddRepaymentForm
                                customerId={customer.customerId}
                                customerName={customer.customerName}
                                onSuccess={handleRepaymentSuccess}
                              />
                            ) : (
                              <Badge variant="outline">-</Badge>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
