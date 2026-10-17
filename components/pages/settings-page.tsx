"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Bell, Shield, Database, Camera, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsPageProps {
  darkMode: boolean
  onToggleDark: () => void
}

export function SettingsPage({ darkMode, onToggleDark }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    phoneUsage: true,
    idleWarning: false,
    dailyReport: true,
  })

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="size-4 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: "Admin User" },
                { label: "Email", value: "admin@airco.com" },
                { label: "Role", value: "System Administrator" },
                { label: "Organization", value: "AIRCO Corp" },
              ].map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">{field.label}</label>
                  <Input defaultValue={field.value} className="h-9 text-sm" />
                </div>
              ))}
            </div>
            <Button size="sm" className="gap-2">
              <Save className="size-3.5" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Theme</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark mode</p>
              </div>
              <button
                onClick={onToggleDark}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  darkMode ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "inline-block size-4 rounded-full bg-white shadow-sm transition-transform",
                    darkMode ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => darkMode && onToggleDark()}
                className={cn(
                  "flex-1 p-3 rounded-lg border-2 text-xs font-medium transition-colors flex items-center gap-2 justify-center",
                  !darkMode ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                <Sun className="size-4" />
                Light Mode
              </button>
              <button
                onClick={() => !darkMode && onToggleDark()}
                className={cn(
                  "flex-1 p-3 rounded-lg border-2 text-xs font-medium transition-colors flex items-center gap-2 justify-center",
                  darkMode ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                <Moon className="size-4" />
                Dark Mode
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bell className="size-4 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(notifications).map(([key, val]) => {
              const labels: Record<string, { title: string; desc: string }> = {
                criticalAlerts: { title: "Critical Alerts", desc: "Restricted zone violations, tailgating" },
                phoneUsage: { title: "Phone Usage Alerts", desc: "Employee phone detected during work hours" },
                idleWarning: { title: "Idle Warnings", desc: "Employee idle for more than 30 minutes" },
                dailyReport: { title: "Daily Report", desc: "Automatic end-of-day summary email" },
              }
              const info = labels[key]
              return (
                <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{info.title}</p>
                    <p className="text-xs text-muted-foreground">{info.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [key]: !val }))}
                    className={cn(
                      "relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0",
                      val ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span className={cn("inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform", val ? "translate-x-4" : "translate-x-0.5")} />
                  </button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* System */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="size-4 text-primary" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Data Retention (days)", value: "90" },
              { label: "Max Cameras Allowed", value: "16" },
              { label: "Snapshot Interval (sec)", value: "30" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4">
                <label className="text-sm text-foreground">{s.label}</label>
                <Input defaultValue={s.value} className="h-8 text-sm w-24 text-right" />
              </div>
            ))}
            <Button size="sm" className="mt-2 gap-2">
              <Save className="size-3.5" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
