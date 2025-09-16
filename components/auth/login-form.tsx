"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users, UserCheck, Building } from "lucide-react"

export function LoginForm() {
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app would authenticate with backend
    console.log("[v0] Login attempt:", { studentId, userType })

    if (typeof window !== "undefined") {
      localStorage.setItem("userType", userType)
      localStorage.setItem("userId", studentId)
    }

    // Redirect to dashboard based on user type
    window.location.href = "/dashboard"
  }

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "student":
        return <GraduationCap className="h-4 w-4" />
      case "teacher":
        return <UserCheck className="h-4 w-4" />
      case "admin":
        return <Users className="h-4 w-4" />
      case "hostel":
        return <Building className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Student Management System</CardTitle>
          <CardDescription>Sign in to access your institutional portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Teacher
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Administrator
                    </div>
                  </SelectItem>
                  <SelectItem value="hostel">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Hostel Staff
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">{userType === "student" ? "Student ID" : "Employee ID"}</Label>
              <Input
                id="studentId"
                type="text"
                placeholder={userType === "student" ? "Enter your student ID" : "Enter your employee ID"}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={!userType}>
              {getUserTypeIcon(userType)}
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Forgot your password? Contact your administrator</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
