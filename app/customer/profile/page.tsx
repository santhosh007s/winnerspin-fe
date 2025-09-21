"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCustomerProfile } from "@/lib/customerProfileSlice"
import { ProfileCard } from "@/components/profile-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, User, Calendar, Shield } from "lucide-react"

export default function CustomerProfile() {
  const dispatch = useAppDispatch()
  const { profile, isLoading, error } = useAppSelector((state) => state.customerProfile)

  useEffect(() => {
    dispatch(fetchCustomerProfile())
  }, [dispatch])

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

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No profile data available</p>
      </div>
    )
  }

  const getUserInitials = (name: string) => {
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
            <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
              {getUserInitials(profile.username)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <p className="text-blue-100">Customer Profile</p>
            <div className="flex items-center mt-2">
              <Badge
                variant="secondary"
                className={`${
                  profile.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {profile.status === "active" ? "Active Account" : "Inactive Account"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <ProfileCard profile={profile} />
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
                <span className="text-sm font-medium">{profile._id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Card Number</span>
                <span className="text-sm font-medium font-mono">{profile.cardNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium">
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
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
                  className={`${
                    profile.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {profile.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Account Age</p>
                    <p className="text-lg font-bold text-blue-900">
                      {Math.floor((Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 365))}{" "}
                      years
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Profile Status</p>
                    <p className="text-lg font-bold text-green-900">Complete</p>
                  </div>
                  <User className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

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
