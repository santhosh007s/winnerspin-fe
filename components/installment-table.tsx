import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, AlertCircle, Eye } from "lucide-react"

interface Installment {
  id: string
  amount: number
  dueDate: string
  paidDate: string | null
  status: "paid" | "due" | "overdue"
  installmentNumber: number
  description: string
}

interface InstallmentTableProps {
  installments: Installment[]
}

export function InstallmentTable({ installments }: InstallmentTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "due":
        return <Clock className="w-4 h-4 text-orange-600" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "due":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Due</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (!installments || installments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No installments found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Installment</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Paid Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installments.map((installment) => (
            <TableRow key={installment.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">#{installment.installmentNumber}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(installment.status)}
                  <span>{installment.description}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">${installment.amount.toLocaleString()}</TableCell>
              <TableCell>{formatDate(installment.dueDate)}</TableCell>
              <TableCell>
                {installment.paidDate ? (
                  <span className="text-green-600">{formatDate(installment.paidDate)}</span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(installment.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
