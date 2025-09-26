"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchPromoterDetails } from "@/lib/promoterSlice"
import { PromoterCard } from "@/components/promoter-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2, Users, Phone, Mail, MessageCircle, Calendar, MapPin } from "lucide-react"

export default function CustomerPromoter() {
  const dispatch = useAppDispatch()
  const { promoter, isLoading, error } = useAppSelector((state) => state.promoter)

  useEffect(() => {
    dispatch(fetchPromoterDetails())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading promoter details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Failed to load promoter details: {error}</p>
      </div>
    )
  }

  if (!promoter) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No promoter information available</p>
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

  const getYearsOfService = (joinDate: string) => {
    const years = Math.floor((Date.now() - new Date(joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
    return years
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-4 border-white/20">
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl font-bold">
              {getUserInitials(promoter.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{promoter.name}</h1>
            <p className="text-primary-foreground/80">Your Promoter</p>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {promoter.department}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Promoter Details Card */}
        <div className="lg:col-span-2">
          <PromoterCard promoter={promoter} />
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Quick Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-green-500 hover:bg-green-600 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call {promoter.name.split(" ")[0]}
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Promoter Stats */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Promoter Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Department</span>
                <Badge variant="secondary">{promoter.department}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Years of Service</span>
                <span className="text-sm font-medium">{getYearsOfService(promoter.joinDate)} years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Join Date</span>
                <span className="text-sm font-medium">
                  {new Date(promoter.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Promoter ID</span>
                <span className="text-sm font-medium font-mono">{promoter.id}</span>
              </div>
            </CardContent>
          </Card>

          {/* Office Hours */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monday - Friday</span>
                  <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Saturday</span>
                  <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sunday</span>
                  <span className="text-sm font-medium text-destructive">Closed</span>
                </div>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Currently Available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Office Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">Main Office</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    123 Business Center Drive
                    <br />
                    Suite 456, Floor 12
                    <br />
                    Business District, City 12345
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <MapPin className="w-4 h-4 mr-1" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support Information */}
      <Card className="shadow-sm border-primary/20 bg-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary/90 mb-2">Need Additional Support?</h3>
              <p className="text-sm text-primary/80 mb-4">
                Your promoter is your primary point of contact for all account-related questions, payment issues, and
                general support. Feel free to reach out during office hours for immediate assistance.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary/90">
                  Account Questions
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary/90">
                  Payment Support
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary/90">
                  Profile Updates
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary/90">
                  General Inquiries
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
