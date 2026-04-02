"use client"

import { useState } from "react"
import { employees, unknownPersons } from "@/lib/mock-data"
import { EmployeeLiveTable } from "@/components/employee-live-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Users,
  UserX,
  Clock,
  Activity,
  Camera,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Timer,
  ChevronDown,
  ChevronUp,
  Eye,
  UserCheck,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  Play,
  Pause,
  Smartphone,
  CheckCircle,
  Coffee,
} from "lucide-react"

const summaryCards = [
  { label: "Present Today", value: "6", sub: "vs yesterday", icon: Users, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200", trendColor: "text-green-500", trend: "up", trendValue: "+4%" },
  { label: "Absent Today", value: "2", sub: "vs yesterday", icon: UserX, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200", trendColor: "text-red-500", trend: "down", trendValue: "-2%" },
  { label: "Late Arrivals", value: "1", sub: "live tracking", icon: Clock, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", trendColor: "text-orange-500", trend: "neutral", trendValue: "" },
  { label: "Avg Productivity", value: "79%", sub: "vs yesterday", icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200", trendColor: "text-blue-500", trend: "up", trendValue: "+4%" },
  { label: "Active Cameras", value: "8/9", sub: "system active", icon: Camera, color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200", trendColor: "text-cyan-500", trend: "neutral", trendValue: "" },
  { label: "Footfall Today", value: "34", sub: "vs yesterday", icon: Activity, color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200", trendColor: "text-purple-500", trend: "up", trendValue: "+12%" },
]

// Define types for different insight details
type WhoDetails = { name: string; status: string; location: string; time: string }
type WhereDetails = { zone: string; count: number; activity: string }
type WhatDetails = { activity: string; count: number; percentage: number; color: string }
type HowLongDetails = { range: string; count: number; employees: string[] }
type ViolationsDetails = { type: string; employee: string; time: string; severity: string }

type InsightQuestion = 
  | {
      id: "who"
      question: string
      icon: any
      color: string
      bgColor: string
      summary: string
      details: WhoDetails[]
    }
  | {
      id: "where"
      question: string
      icon: any
      color: string
      bgColor: string
      summary: string
      details: WhereDetails[]
    }
  | {
      id: "what"
      question: string
      icon: any
      color: string
      bgColor: string
      summary: string
      details: WhatDetails[]
    }
  | {
      id: "how-long"
      question: string
      icon: any
      color: string
      bgColor: string
      summary: string
      details: HowLongDetails[]
    }
  | {
      id: "violations"
      question: string
      icon: any
      color: string
      bgColor: string
      summary: string
      details: ViolationsDetails[]
    }

const insightQuestions: InsightQuestion[] = [
  {
    id: "who",
    question: "Who is present?",
    icon: UserCheck,
    color: "text-[var(--live)]",
    bgColor: "bg-[var(--live-bg)]",
    summary: "6 employees",
    details: [
      { name: "Alex Carter", status: "Working", location: "Floor 3 - Zone A", time: "4h 18m" },
      { name: "Priya Sharma", status: "Idle", location: "Floor 2 - HR", time: "3h 59m" },
      { name: "James Liu", status: "Working", location: "Floor 1 - Finance", time: "4h 05m" },
      { name: "Mohammed Al-Rashid", status: "Moving", location: "Main Gate", time: "5h 30m" },
      { name: "Nina Patel", status: "Phone", location: "Floor 3 - Zone B", time: "3h 45m" },
      { name: "David Kim", status: "Working", location: "Floor 2 - Ops", time: "4h 30m" },
    ],
  },
  {
    id: "where",
    question: "Where are they?",
    icon: MapPin,
    color: "text-primary",
    bgColor: "bg-primary/10",
    summary: "5 zones active",
    details: [
      { zone: "Floor 3 - Zone A", count: 2, activity: "High" },
      { zone: "Floor 3 - Zone B", count: 1, activity: "Medium" },
      { zone: "Floor 2 - HR Office", count: 1, activity: "Low" },
      { zone: "Floor 2 - Ops Room", count: 1, activity: "Medium" },
      { zone: "Floor 1 - Finance", count: 1, activity: "High" },
      { zone: "Main Gate", count: 1, activity: "High" },
    ],
  },
  {
    id: "what",
    question: "What are they doing?",
    icon: Activity,
    color: "text-[var(--warning)]",
    bgColor: "bg-[var(--warning-bg)]",
    summary: "5 working, 1 idle",
    details: [
      { activity: "Working", count: 4, percentage: 67, color: "var(--live)" },
      { activity: "Idle", count: 1, percentage: 17, color: "var(--warning)" },
      { activity: "Moving", count: 1, percentage: 8, color: "var(--color-primary)" },
      { activity: "On Phone", count: 1, percentage: 8, color: "var(--danger)" },
    ],
  },
  {
    id: "how-long",
    question: "How long did they stay?",
    icon: Timer,
    color: "text-foreground",
    bgColor: "bg-muted",
    summary: "Avg: 4h 21m",
    details: [
      { range: "5+ hours", count: 1, employees: ["Mohammed Al-Rashid"] },
      { range: "4-5 hours", count: 3, employees: ["Alex Carter", "James Liu", "David Kim"] },
      { range: "3-4 hours", count: 2, employees: ["Priya Sharma", "Nina Patel"] },
      { range: "< 3 hours", count: 0, employees: [] },
    ],
  },
  {
    id: "violations",
    question: "Any violations?",
    icon: AlertTriangle,
    color: "text-[var(--danger)]",
    bgColor: "bg-[var(--danger-bg)]",
    summary: "3 detected",
    details: [
      { type: "Phone Usage", employee: "Nina Patel", time: "10:45 AM", severity: "medium" },
      { type: "Restricted Zone", employee: "Nina Patel", time: "12:00 PM", severity: "critical" },
      { type: "Idle Alert", employee: "Priya Sharma", time: "11:30 AM", severity: "low" },
    ],
  },
]

function InsightDropdown({ insight }: { insight: InsightQuestion }) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = insight.icon

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-3 text-left transition-colors",
          isOpen ? "bg-muted/50" : "hover:bg-muted/30"
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn("size-8 rounded-lg flex items-center justify-center", insight.bgColor)}>
            <Icon className={cn("size-4", insight.color)} />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{insight.question}</p>
            <p className="text-[11px] text-muted-foreground">{insight.summary}</p>
          </div>
        </div>
        <div className={cn(
          "size-6 rounded-full flex items-center justify-center transition-colors",
          isOpen ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3 border-t border-border bg-card animate-in slide-in-from-top-2 duration-200">
          {insight.id === "who" && (
            <div className="space-y-1.5">
              {(insight.details as WhoDetails[]).map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {d.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{d.name}</p>
                      <p className="text-[10px] text-muted-foreground">{d.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                      d.status === "Working" && "bg-[var(--live-bg)] text-[var(--live)]",
                      d.status === "Idle" && "bg-[var(--warning-bg)] text-[var(--warning)]",
                      d.status === "Moving" && "bg-primary/10 text-primary",
                      d.status === "Phone" && "bg-[var(--danger-bg)] text-[var(--danger)]",
                    )}>
                      {d.status}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{d.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {insight.id === "where" && (
            <div className="space-y-1.5">
              {(insight.details as WhereDetails[]).map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "size-2 rounded-full",
                      d.activity === "High" && "bg-[var(--live)]",
                      d.activity === "Medium" && "bg-[var(--warning)]",
                      d.activity === "Low" && "bg-muted-foreground"
                    )} />
                    <span className="text-xs text-foreground">{d.zone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{d.activity}</span>
                    <span className="text-xs font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">{d.count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {insight.id === "what" && (
            <div className="space-y-2">
              {(insight.details as WhatDetails[]).map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{d.activity}</span>
                    <span className="font-bold text-foreground">{d.count} ({d.percentage}%)</span>
                  </div>
                  <Progress value={d.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          )}

          {insight.id === "how-long" && (
            <div className="space-y-1.5">
              {(insight.details as HowLongDetails[]).map((d, i) => (
                <div key={i} className="p-2 rounded-md bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{d.range}</span>
                    <span className="text-xs font-bold text-primary">{d.count}</span>
                  </div>
                  {d.employees.length > 0 && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">{d.employees.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {insight.id === "violations" && (
            <div className="space-y-1.5">
              {(insight.details as ViolationsDetails[]).map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <AlertCircle className={cn(
                      "size-3",
                      d.severity === "critical" && "text-[var(--danger)]",
                      d.severity === "medium" && "text-[var(--warning)]",
                      d.severity === "low" && "text-muted-foreground"
                    )} />
                    <div>
                      <p className="text-xs font-medium text-foreground">{d.type}</p>
                      <p className="text-[10px] text-muted-foreground">{d.employee}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase",
                      d.severity === "critical" && "bg-[var(--danger-bg)] text-[var(--danger)]",
                      d.severity === "medium" && "bg-[var(--warning-bg)] text-[var(--warning)]",
                      d.severity === "low" && "bg-muted text-muted-foreground"
                    )}>
                      {d.severity}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{d.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function UnknownPersonRow({ person }: { person: any }) {
  const [open, setOpen] = useState(false)

  // Mock data for timeline, dwell, and violations to match employee structure
  const mockTimeline = [
    { time: "09:15", event: "First detected at Main Entrance", camera: "CAM-01" },
    { time: "10:30", event: "Moving through Floor 2 Corridor", camera: "CAM-05" },
    { time: "11:45", event: "Loitering near Restricted Zone", camera: "CAM-08" },
  ]

  const mockCameraDwell = [
    { camera: "CAM-01", name: "Main Entrance", dwell: "12 min" },
    { camera: "CAM-05", name: "Floor 2 Corridor", dwell: "45 min" },
    { camera: "CAM-08", name: "Restricted Zone", dwell: "28 min" },
  ]

  const mockViolations = {
    phoneUsage: { detected: false, duration: "0 min" },
    idleTime: { detected: true, duration: "15 min" },
    restrictedZone: { detected: true, zones: ["Server Room", "Executive Office"] },
  }

  const hasViolations = mockViolations.phoneUsage.detected || 
                        mockViolations.idleTime.detected || 
                        mockViolations.restrictedZone.detected

  return (
    <>
      {/* Main Row */}
      <tr
        className={cn(
          "border-b border-border cursor-pointer group transition-all duration-200",
          open ? "bg-primary/5 shadow-sm" : "hover:bg-muted/40 hover:shadow-sm"
        )}
        onClick={() => setOpen(!open)}
      >
        {/* Employee/Person */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-xs font-semibold flex items-center justify-center flex-shrink-0">
              <Eye className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Unknown Person</p>
              <p className="text-[11px] text-muted-foreground truncate">Unidentified</p>
            </div>
          </div>
        </td>

        {/* Status */}
        <td className="px-4 py-3">
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--warning-bg)] text-[var(--warning)]">
            {person.status}
          </span>
        </td>

        {/* First Entry */}
        <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{person.firstSeen}</td>

        {/* Last Seen */}
        <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{person.lastSeen}</td>

        {/* Location */}
        <td className="px-4 py-3">
          <span className="text-sm text-foreground">{person.location}</span>
        </td>

        {/* Activity */}
        <td className="px-4 py-3">
          <span className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
            person.activity === "Suspicious" && "bg-[var(--danger-bg)] text-[var(--danger)]",
            person.activity === "Moving" && "bg-primary/10 text-primary",
            person.activity === "Idle" && "bg-muted text-muted-foreground"
          )}>
            {person.activity}
          </span>
        </td>

        {/* Dwell Time */}
        <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{person.dwellTime}</td>

        {/* Productivity */}
        <td className="px-4 py-3 min-w-[120px]">
          <span className="text-sm text-muted-foreground">—</span>
        </td>

        {/* Violations */}
        <td className="px-4 py-3">
          {hasViolations ? (
            <span className="inline-flex items-center gap-1 bg-[var(--danger-bg)] text-[var(--danger)] text-xs font-semibold rounded-full px-2 py-0.5">
              <AlertTriangle className="size-3" />
              2
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          )}
        </td>

        {/* Expand */}
        <td className="px-4 py-3">
          <button className={cn(
            "size-7 rounded-full flex items-center justify-center transition-all duration-200",
            open 
              ? "bg-primary text-primary-foreground rotate-180" 
              : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
          )}>
            <ChevronDown className="size-4" />
          </button>
        </td>
      </tr>

      {/* Expanded Detail Row */}
      {open && (
        <tr className="bg-gradient-to-r from-primary/5 via-muted/30 to-transparent border-b border-border animate-in slide-in-from-top-1 duration-200">
          <td colSpan={10} className="px-4 py-4">
            {/* Person Info Bar - Single Line */}
            <div className="flex flex-wrap items-center gap-4 p-3 mb-4 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-sm font-bold flex items-center justify-center">
                  <Eye className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Unknown Person #{person.id}</p>
                  <p className="text-xs text-muted-foreground">Unidentified • Risk Level: {person.riskLevel}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Dwell Time: </span>
                  <span className="font-medium text-foreground">{person.dwellTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Activity: </span>
                  <span className="font-medium text-foreground">{person.activity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Violations: </span>
                  <span className={cn("font-medium", hasViolations ? "text-[var(--danger)]" : "text-foreground")}>
                    {hasViolations ? "2" : "None"}
                  </span>
                </div>
              </div>
            </div>

            {/* All Sections Displayed at Once - 3 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Today's Timeline Section */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Today's Timeline</p>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {mockTimeline.map((entry, i) => (
                    <div key={i} className="flex gap-3 text-xs p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                      <span className="text-muted-foreground whitespace-nowrap font-mono w-16 flex-shrink-0">{entry.time}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground">{entry.event}</p>
                        <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Camera className="size-2.5" />
                          {entry.camera}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dwell Analysis Section */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Dwell Analysis</p>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {mockCameraDwell.map((cam, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-8 rounded-lg flex items-center justify-center text-xs font-bold",
                          i === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{cam.name}</p>
                          <p className="text-xs text-muted-foreground">{cam.camera}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{cam.dwell}</p>
                        <p className="text-[10px] text-muted-foreground">dwell time</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Violation Details Section */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className={cn("size-4", hasViolations ? "text-[var(--danger)]" : "text-muted-foreground")} />
                  <p className="text-sm font-semibold text-foreground">Violation Details</p>
                  {hasViolations && <span className="size-2 rounded-full bg-[var(--danger)]" />}
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {/* Phone Usage */}
                  <div className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                    mockViolations.phoneUsage.detected 
                      ? "bg-[var(--danger-bg)] border-[var(--danger)]/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center",
                        mockViolations.phoneUsage.detected 
                          ? "bg-[var(--danger)]/20" 
                          : "bg-muted"
                      )}>
                        <Smartphone className={cn(
                          "size-4",
                          mockViolations.phoneUsage.detected ? "text-[var(--danger)]" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone Usage {">"} 10 min</p>
                        <p className="text-xs text-muted-foreground">Personal phone detected during work</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {mockViolations.phoneUsage.detected ? (
                        <>
                          <span className="text-xs font-bold text-[var(--danger)]">{mockViolations.phoneUsage.duration}</span>
                          <p className="text-[10px] text-[var(--danger)]">DETECTED</p>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[var(--live)]">
                          <CheckCircle className="size-4" />
                          <span className="text-xs font-medium">Clear</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Idle Time */}
                  <div className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                    mockViolations.idleTime.detected 
                      ? "bg-[var(--warning-bg)] border-[var(--warning)]/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center",
                        mockViolations.idleTime.detected 
                          ? "bg-[var(--warning)]/20" 
                          : "bg-muted"
                      )}>
                        <Coffee className={cn(
                          "size-4",
                          mockViolations.idleTime.detected ? "text-[var(--warning)]" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Idle {">"} 10 min</p>
                        <p className="text-xs text-muted-foreground">Extended idle period detected</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {mockViolations.idleTime.detected ? (
                        <>
                          <span className="text-xs font-bold text-[var(--warning)]">{mockViolations.idleTime.duration}</span>
                          <p className="text-[10px] text-[var(--warning)]">DETECTED</p>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[var(--live)]">
                          <CheckCircle className="size-4" />
                          <span className="text-xs font-medium">Clear</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Restricted Zone */}
                  <div className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                    mockViolations.restrictedZone.detected 
                      ? "bg-[var(--danger-bg)] border-[var(--danger)]/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center",
                        mockViolations.restrictedZone.detected 
                          ? "bg-[var(--danger)]/20" 
                          : "bg-muted"
                      )}>
                        <ShieldAlert className={cn(
                          "size-4",
                          mockViolations.restrictedZone.detected ? "text-[var(--danger)]" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Restricted Zone Entry</p>
                        <p className="text-xs text-muted-foreground">Unauthorized area access</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {mockViolations.restrictedZone.detected ? (
                        <>
                          <span className="text-xs font-bold text-[var(--danger)]">
                            {mockViolations.restrictedZone.zones.join(", ")}
                          </span>
                          <p className="text-[10px] text-[var(--danger)]">DETECTED</p>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[var(--live)]">
                          <CheckCircle className="size-4" />
                          <span className="text-xs font-medium">Clear</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function UnknownPersonTable() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "bg-[var(--danger-bg)] text-[var(--danger)]"
      case "Medium": return "bg-[var(--warning-bg)] text-[var(--warning)]"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-4 text-[var(--danger)]" />
              <CardTitle className="text-base">Unknown Person Activity</CardTitle>
              <span className="text-xs bg-[var(--danger-bg)] text-[var(--danger)] px-2 py-0.5 rounded-full font-medium">
                {unknownPersons.length} Unidentified
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time tracking — click a row to expand details
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Person</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">First Seen</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Last Seen</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Location</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Activity</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Dwell Time</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Productivity</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Violations</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground w-10"></th>
              </tr>
            </thead>
            <tbody>
              {unknownPersons.map((person) => <UnknownPersonRow key={person.id} person={person} />)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {unknownPersons.length} unknown persons
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true)

  return (
    <div className="space-y-4 p-4">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Real-time workplace monitoring and insights</p>
        </div>
        <Button
          variant={aiInsightsEnabled ? "default" : "outline"}
          size="sm"
          className="gap-1.5 h-8 text-xs"
          onClick={() => setAiInsightsEnabled(!aiInsightsEnabled)}
        >
          {aiInsightsEnabled ? (
            <>
              <Pause className="size-3" />
              Stop AI
            </>
          ) : (
            <>
              <Play className="size-3" />
              Start AI
            </>
          )}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Card 
              key={card.label} 
              className={cn(
                "hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border",
                card.borderColor,
                card.bgColor
              )}
            >
              <CardContent className="p-4 h-full">
                {/* Top Row - Icon and Trend */}
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("size-10 rounded-full flex items-center justify-center", card.bgColor)}>
                    <Icon className={cn("size-5", card.color)} />
                  </div>
                  {card.trendValue && (
                    <div className={cn(
                      "flex items-center gap-0.5 text-xs font-semibold",
                      card.trendColor
                    )}>
                      {card.trend === "up" && <TrendingUp className="size-3" />}
                      {card.trend === "down" && <TrendingUp className="size-3 rotate-180" />}
                      {card.trendValue}
                    </div>
                  )}
                </div>
                
                {/* Main Value */}
                <div className="mb-2">
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                </div>
                
                {/* Label */}
                <div className="mb-1">
                  <p className="text-sm font-medium text-foreground">{card.label}</p>
                </div>
                
                {/* Subtext */}
                <p className="text-xs text-muted-foreground">{card.sub}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Smart Insights - Interactive Dropdowns */}
      <Card className={cn(
        "border-primary/20 transition-all",
        aiInsightsEnabled ? "bg-gradient-to-br from-primary/5 to-transparent" : "opacity-60"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Smart Insights</CardTitle>
              <p className="text-[10px] text-muted-foreground">Click to expand for detailed answers</p>
            </div>
          </div>
        </CardHeader>
        {aiInsightsEnabled && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {insightQuestions.map((insight) => (
                <InsightDropdown key={insight.id} insight={insight} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Employee Live Table */}
      <EmployeeLiveTable employees={employees} />

      {/* Unknown Person Activity - Below Employee Table */}
      <UnknownPersonTable />
    </div>
  )
}
