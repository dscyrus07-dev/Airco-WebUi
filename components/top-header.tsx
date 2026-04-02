"use client"

import { Bell, Moon, Sun } from "lucide-react"
import { useClock } from "@/hooks/use-clock"
import { LiveBadge } from "@/components/live-badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TopHeaderProps {
  title: string
  darkMode: boolean
  onToggleDark: () => void
}

export function TopHeader({ title, darkMode, onToggleDark }: TopHeaderProps) {
  const { time, date } = useClock()
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-10">
      <h1 className="text-base font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Date/Time */}
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="text-sm font-mono font-medium text-foreground" suppressHydrationWarning>{time}</span>
          <span className="text-[11px] text-muted-foreground" suppressHydrationWarning>{date}</span>
        </div>

        {/* System Status */}
        <LiveBadge status="live" />

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell className="size-4" />
            <span className="absolute top-1 right-1 size-2 bg-destructive rounded-full" />
          </Button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold">Notifications</p>
              </div>
              {[
                { text: "Nina Patel entered restricted zone", time: "2 min ago", type: "critical" },
                { text: "Phone usage detected – CAM-09", time: "10 min ago", type: "warning" },
                { text: "Priya Sharma idle for 45min", time: "15 min ago", type: "low" },
              ].map((n, i) => (
                <div key={i} className="px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <p className="text-xs font-medium text-foreground">{n.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <Button variant="ghost" size="icon" onClick={onToggleDark}>
          {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>
    </header>
  )
}
