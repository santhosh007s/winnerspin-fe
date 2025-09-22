"use client"

import { useAppSelector } from "@/lib/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, User, Mail, Phone, MapPin, UserSquare, Calendar, Shield } from "lucide-react"

export default function CustomerProfilePage() {
  const { user, promoter, isLoading, error } = useAppSelector((state) => state.customerAuth)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load profile: {error}</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No profile data available</p>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-4 border-white/20">
            <AvatarFallback className="bg-white/20 text-white text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100">Customer Profile</p>
            <div className="flex items-center mt-2">
              <Badge
                variant="secondary"
                className={`${
                  user.status === "approved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.status === "approved" ? "Active Account" : "Pending Approval"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-sm font-medium w-32">Full Name</span>
                  <span className="text-sm text-muted-foreground">{user.name}</span>
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
        </div>

        {/* Account Information */}
        <div className="space-y-6">
          {/* Account Details */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account ID</span>
                <span className="text-sm font-medium truncate">{user._id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Card Number</span>
                <span className="text-sm font-medium font-mono">{user.cardNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge
                  variant="secondary"
                  className={`${user.status === "approved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {user.status === "approved" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Promoter Details */}
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

          {/* Security Notice */}
          <Card className="shadow-sm border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Security Notice</p>
                  <p className="text-xs text-amber-700 mt-1">
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
