"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"
import { useState } from "react"

interface CustomerProfile {
  id: string
  _id: string
  cardNo: string
  name: string
  username: string
  email: string
  phone: string
  mobile: string
  address: string
  city: string
  state: string
  createdAt: string
  status: "active" | "inactive"
}

interface ProfileCardProps {
  profile: CustomerProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.username,
    email: profile.email,
    phone: profile.mobile,
    address: profile.address,
  })

  const handleSave = () => {
    // In a real app, this would dispatch an update action
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: profile.username,
      email: profile.email,
      phone: profile.mobile,
      address: profile.address,
    })
    setIsEditing(false)
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} disabled>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{profile.username}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{profile.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{profile.mobile}</span>
              </div>
            )}
          </div>

          {/* Card Number (Read-only) */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Card Number</Label>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-mono">{profile.cardNo}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-gray-700">
            Address
          </Label>
          {isEditing ? (
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full"
              rows={3}
            />
          ) : (
            <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <span className="text-gray-900">
                {profile.address}, {profile.city}, {profile.state}
              </span>
            </div>
          )}
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Profile editing is currently disabled. Please contact your promoter to update your
            information.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
