"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/promoter/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Promoter Dashboard</h1>
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  )
}
