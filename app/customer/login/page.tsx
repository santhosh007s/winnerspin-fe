"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, Lock } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loginCustomer, clearError } from "@/lib/customerAuthSlice"

export default function CustomerLogin() {
  const [cardNumber, setCardNumber] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.customerAuth)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/customer/dashboard")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardNumber.trim() || !password.trim()) {
      return
    }

    try {
      await dispatch(loginCustomer({ cardNumber: cardNumber.trim(), password })).unwrap()
    } catch (error) {
      // Error is handled by the slice
      console.error("Login failed:", error)
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value.toUpperCase())
  }

  return (
    <div className="customer-theme min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Portal</h1>
          <p className="text-muted-foreground">Access your account with your card details</p>
        </div>

        <Card className="shadow-xl border-border bg-card">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your card number and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-sm font-medium">
                  Card Number
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="E.g., WS11002"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="pl-10 h-12 text-lg tracking-wider bg-background"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-background"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isLoading || !cardNumber.trim() || !password.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help accessing your account?{" "}
                <button className="text-primary hover:underline font-medium">
                  Contact Support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">Your information is protected with bank-level security</p>
        </div>
      </div>
    </div>
  )
}
