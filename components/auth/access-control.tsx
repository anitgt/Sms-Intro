"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

interface AccessControlProps {
  userType: "student" | "teacher" | "admin" | "hostel"
  allowedRoles: ("student" | "teacher" | "admin" | "hostel")[]
  children: React.ReactNode
  redirectTo?: string
}

export function AccessControl({ userType, allowedRoles, children, redirectTo = "/dashboard" }: AccessControlProps) {
  const router = useRouter()

  useEffect(() => {
    if (!allowedRoles.includes(userType)) {
      // Auto-redirect after 3 seconds
      const timer = setTimeout(() => {
        router.push(redirectTo)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [userType, allowedRoles, redirectTo, router])

  if (!allowedRoles.includes(userType)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">Access Restricted</CardTitle>
            <CardDescription>
              You don't have permission to access this page. This area is restricted to{" "}
              {allowedRoles.length === 1
                ? `${allowedRoles[0]} users only`
                : `${allowedRoles.slice(0, -1).join(", ")} and ${allowedRoles.slice(-1)} users only`}
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Your current role: <span className="font-medium capitalize">{userType}</span>
            </div>
            <div className="text-sm text-muted-foreground text-center">Redirecting to dashboard in 3 seconds...</div>
            <Button onClick={() => router.push(redirectTo)} className="w-full" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
