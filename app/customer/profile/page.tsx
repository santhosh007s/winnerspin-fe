"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCustomerProfile } from "@/lib/customerProfileSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Loader2, User, Mail, Phone, MapPin, UserSquare, Calendar, Shield, Clock, TrendingUp } from "lucide-react"

export default function CustomerProfilePage() {
  const dispatch = useAppDispatch<AppDispatch>()
  const { profile: user, isLoading, error } = useAppSelector((state: RootState) => state.customerProfile)
  const promoter = user?.promoter

  useEffect(() => {
    dispatch(fetchCustomerProfile())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Failed to load profile: {error}</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No profile data available</p>
      </div>
    )
  }

  const getUserInitials = (name: string) => {
    if (!name) return "" // Prevent error if name is undefined
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getSeasonStatus = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now < start) return "upcoming"
    if (now > end) return "completed"
    return "live"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600"
      case "live":
        return "bg-green-500/10 text-green-600"
      case "upcoming":
        return "bg-blue-500/10 text-blue-600"
      default: // completed
        return "bg-muted text-muted-foreground"
    }
  }

  const calculateSeasonProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    if (now < start) return { currentMonth: 0, totalMonths: 0, progress: 0 }

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1

    let currentMonth = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1

    if (now > end) {
      currentMonth = totalMonths
    }

    const progress = totalMonths > 0 ? (currentMonth / totalMonths) * 100 : 0

    return { currentMonth, totalMonths, progress: Math.min(100, progress) }
  }
  console.log(user.status)
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className=" bg-gradient-to-br from-primary to-primary/20 rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-4 border-white/20">
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl font-bold">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-primary-foreground/80">Customer Profile</p>
            <div className="flex items-center mt-2">
              <Badge
                variant="secondary"
                className={`${user.status === "active" ? "bg-green-400/20 text-white" : "bg-muted text-muted-foreground"}`}
              > 
                {user.status === "active" ? "Active Account" : "Pending Approval"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Grid */}
      <div className="lg:grid space-y-6 lg:space-y-0 lg:grid-cols-2 lg:gap-6">
        {/* Profile Details Card */}
        <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-sm font-medium w-32">Full Name</span>
                  <span className="text-sm text-muted-foreground">{user.username}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-sm font-medium w-32">Email</span>
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-sm font-medium w-32">Mobile</span>
                  <span className="text-sm text-muted-foreground">{user.mobile}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-sm font-medium w-32">Address</span>
                  <span className="text-sm text-muted-foreground">
                    {user.address || 'N/A'}, {user.city || 'N/A'}, {user.state || 'N/A'} - {user.pincode || 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
        </Card>

        {/* Account Details Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account ID</span>
                <span className="text-sm font-medium truncate">{user._id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Card Number</span>
                <span className="text-sm font-medium font-mono">{user.cardNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge 
                  variant="secondary"
                  className={`${user.status === "active" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {promoter && (
            <Card>
              <CardHeader>
                <CardTitle>Your Promoter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <UserSquare className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-sm font-medium w-32">Promoter ID</span>
                    <span className="text-sm text-muted-foreground">{promoter.userid}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-sm font-medium w-32">Name</span>
                    <span className="text-sm text-muted-foreground">{promoter.username}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-sm font-medium w-32">Email</span>
                    <span className="text-sm text-muted-foreground">{promoter.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-sm font-medium w-32">Phone</span>
                    <span className="text-sm text-muted-foreground">{promoter.mobNo}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Season Timeline */}
        {user.seasons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Season Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {user.seasons.map((season: any) => {
                const { currentMonth, totalMonths, progress } = calculateSeasonProgress(season.startDate, season.endDate)
                const status = getSeasonStatus(season.startDate, season.endDate)
                return (
                  <div key={season._id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{season.season}</span>
                      <Badge variant="secondary" className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {new Date(season.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                      <span className="font-medium">
                        Month {Math.min(currentMonth, totalMonths)} of {totalMonths}
                      </span>
                      <span>{new Date(season.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                )
              })}
              {user.seasons.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">Not enrolled in any seasons.</p>
              )}
            </CardContent>
          </Card>
        )}
        {/* Security Notice Card - spans both columns */}
        <div className="col-span-2 justify-center flex items-center">

        <Card className=" shadow-sm border-yellow-500/20 bg-yellow-500/10">
          <CardContent className="px-4 md:px-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Security Notice</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                  Your profile information is currently read-only. Contact your promoter to make changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
