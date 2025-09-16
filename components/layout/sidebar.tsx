"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  GraduationCap,
  Calendar,
  Building,
  CreditCard,
  Wallet,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  userType: "student" | "teacher" | "admin" | "hostel"
}

export function Sidebar({ userType }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getMenuItems = () => {
    const baseItems = [
      { icon: GraduationCap, label: "Dashboard", href: "/dashboard" },
      { icon: Bell, label: "Announcements", href: "/announcements" },
    ]

    switch (userType) {
      case "student":
        return [
          ...baseItems,
          { icon: BookOpen, label: "Academics", href: "/academics" },
          { icon: Calendar, label: "Events", href: "/events" },
          { icon: Building, label: "Hostel", href: "/hostel" },
          { icon: CreditCard, label: "Fees", href: "/fees" },
          { icon: Wallet, label: "Digital Wallet", href: "/wallet" },
        ]
      case "teacher":
        return [
          ...baseItems,
          { icon: BookOpen, label: "Classes", href: "/classes" },
          { icon: Calendar, label: "Events", href: "/events" },
          { icon: GraduationCap, label: "Students", href: "/students" },
        ]
      case "admin":
        return [
          ...baseItems,
          { icon: GraduationCap, label: "Students", href: "/students" },
          { icon: BookOpen, label: "Academics", href: "/academics" },
          { icon: Calendar, label: "Events", href: "/events" },
          { icon: Building, label: "Hostel", href: "/hostel" },
          { icon: CreditCard, label: "Fees", href: "/fees" },
          { icon: Settings, label: "System", href: "/system" },
        ]
      case "hostel":
        return [
          ...baseItems,
          { icon: Building, label: "Room Management", href: "/rooms" },
          { icon: GraduationCap, label: "Residents", href: "/residents" },
        ]
      default:
        return baseItems
    }
  }

  const menuItems = getMenuItems()

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-foreground">SMS Portal</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "px-2",
              )}
              asChild
            >
              <a href={item.href}>
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </a>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed && "px-2",
          )}
          onClick={() => (window.location.href = "/")}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
