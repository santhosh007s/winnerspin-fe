"use client"
import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus } from "lucide-react"
import { addRepayment, fetchRepayments } from "@/lib/repaymentSlice"
import { fetchCustomers } from "@/lib/customerSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { cn } from "@/lib/utils"

export function RepaymentForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    cardNo: "",
    customerId: "",
    paymentDate: new Date().toISOString().split("T")[0],
  })
  const [popoverOpen, setPopoverOpen] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { currentSeason } = useSelector((state: RootState) => state.season)
  const { customers } = useSelector((state: RootState) => state.customer)
  const { isLoading, error } = useSelector((state: RootState) => state.repayment)

  useEffect(() => {
    if (open) {
      if ((!customers.length || !currentSeason) && currentSeason?._id) {
        dispatch(fetchCustomers(currentSeason._id))
      }
    }
  }, [open, dispatch, customers.length, currentSeason])

  useEffect(() => {
    if (currentSeason) {
      setFormData((prev) => ({ ...prev, amount: currentSeason.amount.toString() }))
    }
  }, [currentSeason])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSeason) {
      return
    }

    try {
      await dispatch(
        addRepayment({
          customerId: formData.customerId,
          seasonId: currentSeason._id,
          amount: formData.amount.length > 0 ? Number(formData.amount) : currentSeason.amount,
        }),
      ).unwrap()

      // Reset form and close dialog
      setFormData({
        amount: currentSeason.amount.toString(),
        cardNo: "",
        customerId: "",
        paymentDate: "",
      })
      setOpen(false)

      // Refresh repayments list
      if (currentSeason) dispatch(fetchRepayments(currentSeason._id))
    } catch (error) {
      // Error handled by Redux
    }
  }

  const handleInputChange = (field: string, value: string) => {
    console.log("handleInputChange", field, value)
    console.log("formData", formData)
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedCustomer = customers.find((c) => c._id === formData.customerId)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Repayment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Repayment</DialogTitle>
          <DialogDescription>Record a new repayment for the current season: {currentSeason?.season}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Customer</Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={popoverOpen} className="w-full justify-between">
                  {selectedCustomer ? `${selectedCustomer.username} - ${selectedCustomer.cardNo}` : "Select customer..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search customer by name or card..." />
                  <CommandEmpty>No customer found.</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        key={customer._id}
                        value={`${customer.username} ${customer.cardNo}`}
                        onSelect={() => {
                          handleInputChange("customerId", customer._id)
                          handleInputChange("cardNo", customer.cardNo)
                          setPopoverOpen(false)
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", formData.customerId === customer._id ? "opacity-100" : "opacity-0")}
                        />
                        {customer.username} - {customer.cardNo}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleInputChange("paymentDate", e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Repayment"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
