"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { fetchCustomers } from "@/lib/customerSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchSeasons } from "@/lib/seasonSlice"

export function CustomerTable() {
  const dispatch = useDispatch<AppDispatch>()

  const { customers, isLoading } = useSelector((state: RootState) => state.customer)
  const { currentSeason } = useSelector((state: RootState) => state.season)
  useEffect(() => {
    if (currentSeason) {
      dispatch(fetchCustomers(currentSeason._id))
    } else {
      dispatch(fetchSeasons())
    }
  }, [dispatch, currentSeason])

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
        <CardTitle>All Customers</CardTitle>
        <CardDescription>Manage your customer database</CardDescription>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No customers found. Add your first customer to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Card No</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>First Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell className="font-medium">{customer.username}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.mobile}</TableCell>
                    <TableCell>{customer.cardNo}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>₹{customer.firstPayment.toLocaleString()}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Link href={`/promoter/customers/${customer._id}`}>
                            <Eye className="h-3 w-3" />
                            View
                        </Link>
                      </Button>
                      {/* <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Link href={`/promoter/customers/${customer._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z"/><path d="M8 18h1"/><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z"/></svg>
                            Edit
                        </Link>
                      </Button> */}
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
