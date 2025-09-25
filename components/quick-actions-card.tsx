import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, User, Users, FileText } from "lucide-react"
import Link from "next/link"

export function QuickActionsCard() {
  const actions = [
    {
      title: "View Installments",
      description: "Check payment history and due dates",
      icon: CreditCard,
      href: "/customer/installments",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      title: "Update Profile",
      description: "Manage your personal information",
      icon: User,
      href: "/customer/profile",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
    },
    // {
    //   title: "Contact Promoter",
    //   description: "Get in touch with your promoter",
    //   icon: Users,
    //   href: "/customer/promoter",
    //   color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    // },
    // {
    //   title: "Download Statement",
    //   description: "Get your payment statement",
    //   icon: FileText,
    //   href: "#",
    //   color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
    // },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="ghost"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50 w-full"
                // backdrop-blur-md bg-white/10 border border-white/10 rounded-3xl p-8 hover:bg-white hover:border-white transition-all duration-300 group
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
