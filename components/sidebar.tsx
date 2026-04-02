"use client"

import { cn } from "@/lib/utils"
import { getAssetPath } from "@/lib/assets"
import {
  LayoutDashboard,
  Video,
  BarChart3,
  Brain,
  Ticket,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "live-feed", label: "Live Feed", icon: Video },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "ai-insights", label: "AI Insights", icon: Brain },
  { id: "tickets", label: "Tickets", icon: Ticket },
  { id: "employees", label: "Employees", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ activePage, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 border-b border-sidebar-border px-4 gap-3", collapsed && "justify-center px-0")}>
        <img
          src={getAssetPath("/logo.png")}
          alt="Air Co Secure"
          width={36}
          height={36}
          className="rounded-lg flex-shrink-0"
        />
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-sidebar-foreground tracking-wide">Air Co Secure</p>
            <p className="text-[10px] text-sidebar-foreground/50 leading-none">Workplace AI Surveillance</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="size-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.id === "tickets" && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none">
                      3
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <button
          onClick={() => onNavigate("settings")}
          className={cn(
            "w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="size-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent/40">
            <div className="size-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">admin@airco.com</p>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-3 rounded-md px-3 py-2 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <><ChevronLeft className="size-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}
