import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react"

export function RecentActivityCard() {
  // Mock data - in real app this would come from Redux store
  const activities = [
    {
      id: 1,
      type: "payment",
      title: "Payment Received",
      description: "Installment #12 - $500.00",
      date: "2 days ago",
      status: "completed",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "reminder",
      title: "Payment Reminder",
      description: "Installment #13 due in 5 days",
      date: "1 week ago",
      status: "pending",
      icon: Clock,
    },
    {
      id: 3,
      type: "profile",
      title: "Profile Updated",
      description: "Contact information updated",
      date: "2 weeks ago",
      status: "completed",
      icon: CheckCircle,
    },
    {
      id: 4,
      type: "alert",
      title: "Payment Due",
      description: "Installment #11 was due",
      date: "3 weeks ago",
      status: "overdue",
      icon: AlertCircle,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIconColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "overdue":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className={`p-1 rounded-full ${getIconColor(activity.status)}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <Badge variant="secondary" className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
