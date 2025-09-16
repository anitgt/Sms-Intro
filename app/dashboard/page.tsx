"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  Bell,
  CheckCircle,
  AlertCircle,
  Wallet,
  Building,
  Users,
  Bed,
} from "lucide-react"

// Mock data - in real app would come from API
const mockStudentData = {
  id: "STU2024001",
  name: "John Doe",
  course: "Computer Science Engineering",
  semester: "6th Semester",
  gpa: 8.5,
  attendance: 85,
  feeStatus: "Paid",
  walletBalance: 2500,
  hostelRoom: "Block A - Room 205",
  upcomingEvents: [
    { id: 1, title: "Mid-term Exams", date: "2024-03-15", type: "exam" },
    { id: 2, title: "Tech Fest 2024", date: "2024-03-20", type: "event" },
    { id: 3, title: "Career Fair", date: "2024-03-25", type: "career" },
  ],
  recentAnnouncements: [
    { id: 1, title: "Library Hours Extended", date: "2024-03-10", priority: "info" },
    { id: 2, title: "Fee Payment Deadline", date: "2024-03-08", priority: "urgent" },
    { id: 3, title: "New Course Registration", date: "2024-03-05", priority: "info" },
  ],
  quickStats: {
    totalCredits: 180,
    completedCredits: 120,
    pendingAssignments: 3,
    attendedEvents: 12,
  },
}

const mockHostelData = {
  id: "HST001",
  name: "Sarah Johnson",
  role: "Hostel Warden",
  block: "Block A",
  totalRooms: 50,
  occupiedRooms: 42,
  totalResidents: 84,
  pendingRequests: 5,
  maintenanceIssues: 3,
  recentAnnouncements: [
    { id: 1, title: "Room Inspection Schedule", date: "2024-03-10", priority: "info" },
    { id: 2, title: "Maintenance Work Block B", date: "2024-03-08", priority: "urgent" },
    { id: 3, title: "New Resident Check-in", date: "2024-03-05", priority: "info" },
  ],
  upcomingTasks: [
    { id: 1, title: "Room Inspection - Floor 2", date: "2024-03-15", type: "inspection" },
    { id: 2, title: "Maintenance Check", date: "2024-03-18", type: "maintenance" },
    { id: 3, title: "New Resident Orientation", date: "2024-03-20", type: "orientation" },
  ],
}

export default function Dashboard() {
  const [studentData, setStudentData] = useState(mockStudentData)
  const [userType, setUserType] = useState<"student" | "teacher" | "admin" | "hostel">("student")
  const [hostelData, setHostelData] = useState(mockHostelData)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem("userType") as "student" | "teacher" | "admin" | "hostel"
      if (storedUserType) {
        setUserType(storedUserType)
      }
    }
  }, [])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <GraduationCap className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "career":
        return <CheckCircle className="h-4 w-4" />
      case "inspection":
        return <CheckCircle className="h-4 w-4" />
      case "maintenance":
        return <Building className="h-4 w-4" />
      case "orientation":
        return <Users className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "info":
        return "secondary"
      default:
        return "outline"
    }
  }

  const renderHostelDashboard = () => (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {hostelData.name}</h1>
        <p className="text-muted-foreground mt-1">
          {hostelData.role} • {hostelData.block} • ID: {hostelData.id}
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{hostelData.totalRooms}</div>
            <p className="text-xs text-muted-foreground">In {hostelData.block}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {hostelData.occupiedRooms}/{hostelData.totalRooms}
            </div>
            <Progress value={(hostelData.occupiedRooms / hostelData.totalRooms) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{hostelData.totalResidents}</div>
            <Badge variant="secondary" className="mt-2">
              Active
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{hostelData.pendingRequests}</div>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              View All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Management Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Room Management Overview</CardTitle>
            <CardDescription>Current status and key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Room Occupancy</span>
                  <span>{Math.round((hostelData.occupiedRooms / hostelData.totalRooms) * 100)}%</span>
                </div>
                <Progress value={(hostelData.occupiedRooms / hostelData.totalRooms) * 100} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{hostelData.maintenanceIssues}</div>
                  <div className="text-sm text-muted-foreground">Maintenance Issues</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {hostelData.totalRooms - hostelData.occupiedRooms}
                  </div>
                  <div className="text-sm text-muted-foreground">Vacant Rooms</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Block Information */}
        <Card>
          <CardHeader>
            <CardTitle>Block Information</CardTitle>
            <CardDescription>Your assigned block details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Assigned Block</div>
                <div className="text-sm text-muted-foreground">{hostelData.block}</div>
              </div>
              <div>
                <div className="font-medium">Role</div>
                <div className="text-sm text-muted-foreground">{hostelData.role}</div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                View Block Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Scheduled activities and inspections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hostelData.upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  {getEventIcon(task.type)}
                  <div className="flex-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.date}</div>
                  </div>
                  <Badge variant="outline">{task.type}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest updates and notices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hostelData.recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  {announcement.priority === "urgent" ? (
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  ) : (
                    <Bell className="h-4 w-4 text-muted-foreground mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{announcement.title}</div>
                    <div className="text-sm text-muted-foreground">{announcement.date}</div>
                  </div>
                  <Badge variant={getPriorityColor(announcement.priority) as any}>{announcement.priority}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStudentDashboard = () => (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {studentData.name}</h1>
        <p className="text-muted-foreground mt-1">
          {studentData.course} • {studentData.semester} • ID: {studentData.id}
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studentData.gpa}</div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studentData.attendance}%</div>
            <Progress value={studentData.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studentData.feeStatus}</div>
            <Badge variant="secondary" className="mt-2">
              Current Semester
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{studentData.walletBalance}</div>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              Add Money
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Progress</CardTitle>
            <CardDescription>Your current semester progress and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Credits Completed</span>
                  <span>
                    {studentData.quickStats.completedCredits}/{studentData.quickStats.totalCredits}
                  </span>
                </div>
                <Progress
                  value={(studentData.quickStats.completedCredits / studentData.quickStats.totalCredits) * 100}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{studentData.quickStats.pendingAssignments}</div>
                  <div className="text-sm text-muted-foreground">Pending Assignments</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{studentData.quickStats.attendedEvents}</div>
                  <div className="text-sm text-muted-foreground">Events Attended</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hostel Info */}
        <Card>
          <CardHeader>
            <CardTitle>Hostel Information</CardTitle>
            <CardDescription>Your accommodation details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Room Assignment</div>
                <div className="text-sm text-muted-foreground">{studentData.hostelRoom}</div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                View Hostel Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentData.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  {getEventIcon(event.type)}
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.date}</div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Events
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest updates and notices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentData.recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  {announcement.priority === "urgent" ? (
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  ) : (
                    <Bell className="h-4 w-4 text-muted-foreground mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{announcement.title}</div>
                    <div className="text-sm text-muted-foreground">{announcement.date}</div>
                  </div>
                  <Badge variant={getPriorityColor(announcement.priority) as any}>{announcement.priority}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userType={userType} />
      <main className="flex-1 overflow-y-auto">
        {userType === "hostel" ? renderHostelDashboard() : renderStudentDashboard()}
      </main>
    </div>
  )
}
