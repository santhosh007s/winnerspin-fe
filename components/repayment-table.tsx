"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchRepayments } from "@/lib/repaymentSlice"
import type { AppDispatch, RootState } from "@/lib/store"

export function RepaymentTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { repayments, isLoading } = useSelector((state: RootState) => state.repayment)
  const { currentSeason } = useSelector((state: RootState) => state.season)

  useEffect(() => {
    dispatch(fetchRepayments())
  }, [dispatch])

  // Filter repayments by current season if available
  const filteredRepayments = currentSeason
    ? repayments.filter((repayment) => repayment.seasonId === currentSeason._id)
    : repayments

  if (isLoading) {
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
        <CardTitle>Repayments</CardTitle>
        <CardDescription>
          {currentSeason ? `Repayments for ${currentSeason.season}` : "All repayments across seasons"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {filteredRepayments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No repayments found. Add your first repayment to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Card Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Season</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRepayments.map((repayment) => (
                  <TableRow key={repayment.id}>
                    <TableCell className="font-medium">{repayment.customerName || "Unknown"}</TableCell>
                    <TableCell className="font-mono">{repayment.cardNo}</TableCell>
                    <TableCell className="font-semibold text-primary">₹{repayment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(repayment.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{repayment.seasonId}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Completed</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
