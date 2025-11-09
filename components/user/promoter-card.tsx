import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Building, Calendar, Star } from "lucide-react"

interface Promoter {
  id: string
  name: string
  email: string
  phone: string
  department: string
  joinDate: string
  profileImage?: string
}

interface PromoterCardProps {
  promoter: Promoter
}

export function PromoterCard({ promoter }: PromoterCardProps) {
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getYearsOfService = (joinDate: string) => {
    const years = Math.floor((Date.now() - new Date(joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
    return years
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Promoter Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Promoter Profile Section */}
        <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold">
              {getUserInitials(promoter.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{promoter.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {promoter.department}
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {getYearsOfService(promoter.joinDate)}+ Years Experience
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Dedicated promoter with extensive experience in customer service and account management. Committed to
              providing excellent support and guidance for all your account needs.
            </p>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Email Address</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-900 break-all">{promoter.email}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Mail className="w-4 h-4 mr-1" />
              Send Email
            </Button>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Phone Number</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-900 font-mono">{promoter.phone}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Phone className="w-4 h-4 mr-1" />
              Call Now
            </Button>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Department</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-900">{promoter.department}</p>
            </div>
          </div>

          {/* Join Date */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>With Company Since</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-900">
                {new Date(promoter.joinDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Areas of Expertise</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Account Management
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Payment Processing
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Customer Support
            </Badge>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              Financial Planning
            </Badge>
            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
              Problem Resolution
            </Badge>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-medium text-green-900 mb-3">Performance Highlights</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-700">98%</p>
              <p className="text-xs text-green-600">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">24h</p>
              <p className="text-xs text-green-600">Avg Response Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">500+</p>
              <p className="text-xs text-green-600">Customers Served</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
