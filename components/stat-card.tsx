import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  className?: string
  iconColor?: string
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className, iconColor }: StatCardProps) {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                {trendUp ? (
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive mr-1" />
                )}
                <span className={cn("text-xs font-medium", trendUp ? "text-green-600" : "text-destructive")}>{trend}</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full bg-muted/50")}>
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
