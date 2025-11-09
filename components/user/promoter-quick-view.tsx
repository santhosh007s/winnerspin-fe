import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, Mail, Eye, Users } from "lucide-react"
import Link from "next/link"

interface Promoter {
  _id: string
  username: string
  email: string
  mobNo: string
  department?: string
  joinDate?: string
  profileImage?: string
}

interface PromoterQuickViewProps {
  promoter: Promoter | null
}

export function PromoterQuickView({ promoter }: PromoterQuickViewProps) {
  if (!promoter) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Your Promoter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-500">Loading promoter information...</p>
          </div>
        </CardContent>
      </Card>
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
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Your Promoter
          </span>
          <Link href="/user/promoter">
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium">
                {getUserInitials(promoter.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{promoter.username}</p>
              {promoter.department && (
                <p className="text-sm text-gray-600">{promoter.department}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 truncate">{promoter.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{promoter.mobNo}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
