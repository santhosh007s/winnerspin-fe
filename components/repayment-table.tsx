"use client"
import { useEffect } from "react"
import { format } from "date-fns"
import jsPDF, { type jsPDF as jsPDFType } from "jspdf"
import autoTable from "jspdf-autotable"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchRepayments } from "@/lib/repaymentSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { AddRepaymentForm } from "./add-repayment-form"
import { Alert, AlertDescription } from "./ui/alert"
import { fetchCustomers } from "@/lib/customerSlice"
import { Download } from "lucide-react"

export function RepaymentTable() {
  const dispatch = useDispatch<AppDispatch>()
  const {customers} = useSelector((state: RootState) => state.customer)
  
  useEffect(() => {
    if (currentSeason && !customers.length) dispatch(fetchCustomers(currentSeason._id))
  }, [])
  const { repayments, isLoading, error } = useSelector((state: RootState) => state.repayment)
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const { user: promoter } = useSelector((state: RootState) => state.auth)
  
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

  const handleDownloadPdf = () => {
    if (!repayments.length || !currentSeason) return

    const primaryColor = [10, 163, 163] // Teal

    const doc = new jsPDF({ orientation: "landscape" })
    const tableColumns = ["Customer", ...monthHeaders.map((month) => format(month, "MMM yyyy"))]
    const tableRows: string[][] = []

    repayments.forEach((customer) => {
      const paidInstallmentNumbers = customer.installments.map((inst) => inst.installmentNo)
      const dueInstallments = customer.dues.map((due) => due.installmentNo)

      const row = [`${customer.customerName} (${customer.cardNo})`]
      monthHeaders.forEach((_, index) => {
        const installmentNo = index + 1
        const isPaid = paidInstallmentNumbers.includes(installmentNo)
        const isDue = dueInstallments.includes(installmentNo)
        row.push(isPaid ? "Paid" : isDue ? "Due" : "-")
      })
      tableRows.push(row)
    })

    doc.setFontSize(18)
    doc.text(`Installment Report - ${currentSeason.season}`, 14, 22)
    doc.setFontSize(11)
    doc.setTextColor(100)
    const pageWidth = doc.internal.pageSize.getWidth()
    doc.text(`Generated on: ${format(new Date(), "PPP")}`, pageWidth - 14, 22, { align: 'right' })

    let startY = 30
    if (promoter) {
      doc.text(`Promoter: ${promoter.username} (ID: ${promoter.userid})`, 14, startY)
      startY += 7
    }

    autoTable(doc, {
      startY: startY + 5,
      head: [tableColumns],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: primaryColor },
      didDrawPage: (data: any) => {
        doc.text(`Page ${data.pageNumber}`, data.settings.margin.left, doc.internal.pageSize.height - 10)
      },
    })

    doc.save(`repayment_status_${currentSeason.season}_${new Date().toISOString().split("T")[0]}.pdf`)
  }

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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Installment Status</CardTitle>
          <CardDescription>
            An overview of all customer dues and payments for the current season.
          </CardDescription>
        </div>
        <Button onClick={handleDownloadPdf} variant="outline" size="sm" className="gap-2" disabled={repayments.length === 0}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
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
                  const paidInstallmentNumbers = customer.installments
                    .filter((inst) => inst.isVerified)
                    .map((inst) => inst.installmentNo)
                  const pendingInstallmentNumbers = customer.installments
                    .filter((inst) => !inst.isVerified)
                    .map((inst) => inst.installmentNo)
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
                        const isPending = pendingInstallmentNumbers.includes(installmentNo)
                        const isDue = dueInstallments.includes(installmentNo)

                        return (
                          <TableCell key={month.toISOString()} className="text-center">
                            {isPending ? (
                              <Badge variant="secondary">Pending</Badge>
                            ) : isPaid ? (
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
