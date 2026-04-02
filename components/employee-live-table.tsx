"use client"

import { useState } from "react"
import { ActivityBadge, StatusBadge } from "@/components/badges"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  ChevronDown,
  Clock,
  AlertTriangle,
  Camera,
  Smartphone,
  Coffee,
  ShieldAlert,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type CameraDwell = {
  camera: string
  name: string
  dwell: string
}

type ViolationDetails = {
  phoneUsage: { detected: boolean; duration: string }
  idleTime: { detected: boolean; duration: string }
  restrictedZone: { detected: boolean; zones: string[] }
}

type Employee = {
  id: string
  name: string
  department: string
  role: string
  avatar: string
  status: string
  firstEntry: string
  lastSeen: string
  location: string
  activity: string
  dwellTime: string
  productivity: number
  violations: number
  timeline: { time: string; event: string; camera: string }[]
  movements: string[]
  snapshots: number
  cameraDwell: CameraDwell[]
  violationDetails: ViolationDetails
}

type Filter = "all" | "present" | "idle" | "violations" | "high-productivity" | "low-productivity"

const filterOptions: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "present", label: "Present" },
  { value: "idle", label: "Idle" },
  { value: "violations", label: "Violations" },
  { value: "high-productivity", label: "High Productivity" },
  { value: "low-productivity", label: "Low Productivity" },
]

function EmployeeRow({ emp }: { emp: Employee }) {
  const [open, setOpen] = useState(false)

  const hasViolations = emp.violationDetails.phoneUsage.detected || 
                        emp.violationDetails.idleTime.detected || 
                        emp.violationDetails.restrictedZone.detected

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
        {/* Employee */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
              {emp.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{emp.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{emp.department}</p>
            </div>
          </div>
        </td>

        {/* Status */}
        <td className="px-4 py-3">
          <StatusBadge status={emp.status} />
        </td>

        {/* First Entry */}
        <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{emp.firstEntry}</td>

        {/* Last Seen */}
        <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{emp.lastSeen}</td>

        {/* Location */}
        <td className="px-4 py-3">
          <span className="text-sm text-foreground">{emp.location}</span>
        </td>

        {/* Activity */}
        <td className="px-4 py-3">
          <ActivityBadge activity={emp.activity} />
        </td>

        {/* Dwell Time */}
        <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{emp.dwellTime}</td>

        {/* Productivity */}
        <td className="px-4 py-3 min-w-[120px]">
          {emp.productivity > 0 ? (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-foreground">{emp.productivity}%</span>
              </div>
              <Progress
                value={emp.productivity}
                className="h-1.5"
              />
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </td>

        {/* Violations */}
        <td className="px-4 py-3">
          {emp.violations > 0 ? (
            <span className="inline-flex items-center gap-1 bg-[var(--danger-bg)] text-[var(--danger)] text-xs font-semibold rounded-full px-2 py-0.5">
              <AlertTriangle className="size-3" />
              {emp.violations}
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
            {/* Employee Info Bar - Single Line */}
            <div className="flex flex-wrap items-center gap-4 p-3 mb-4 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                  {emp.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.role} • {emp.id}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Department: </span>
                  <span className="font-medium text-foreground">{emp.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Dwell Time: </span>
                  <span className="font-medium text-foreground">{emp.dwellTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Productivity: </span>
                  <span className="font-medium text-foreground">{emp.productivity > 0 ? `${emp.productivity}%` : "—"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Violations: </span>
                  <span className={cn("font-medium", emp.violations > 0 ? "text-[var(--danger)]" : "text-foreground")}>
                    {emp.violations > 0 ? emp.violations : "None"}
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
                {emp.timeline.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {emp.timeline.map((entry, i) => (
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
                ) : (
                  <p className="text-sm text-muted-foreground">No activity recorded today</p>
                )}
              </div>

              {/* Dwell Analysis Section */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Dwell Analysis</p>
                </div>
                {emp.cameraDwell.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {emp.cameraDwell.map((cam, i) => (
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
                ) : (
                  <p className="text-sm text-muted-foreground">No camera dwell data available</p>
                )}
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
                    emp.violationDetails.phoneUsage.detected 
                      ? "bg-[var(--danger-bg)] border-[var(--danger)]/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center",
                        emp.violationDetails.phoneUsage.detected 
                          ? "bg-[var(--danger)]/20" 
                          : "bg-muted"
                      )}>
                        <Smartphone className={cn(
                          "size-4",
                          emp.violationDetails.phoneUsage.detected ? "text-[var(--danger)]" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone Usage {">"} 10 min</p>
                        <p className="text-xs text-muted-foreground">Personal phone detected during work</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {emp.violationDetails.phoneUsage.detected ? (
                        <>
                          <span className="text-xs font-bold text-[var(--danger)]">{emp.violationDetails.phoneUsage.duration}</span>
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
                    emp.violationDetails.idleTime.detected 
                      ? "bg-[var(--warning-bg)] border-[var(--warning)]/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center",
                        emp.violationDetails.idleTime.detected 
                          ? "bg-[var(--warning)]/20" 
                          : "bg-muted"
                      )}>
                        <Coffee className={cn(
                          "size-4",
                          emp.violationDetails.idleTime.detected ? "text-[var(--warning)]" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Idle {">"} 10 min</p>
                        <p className="text-xs text-muted-foreground">Extended idle period detected</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {emp.violationDetails.idleTime.detected ? (
                        <>
                          <span className="text-xs font-bold text-[var(--warning)]">{emp.violationDetails.idleTime.duration}</span>
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
                    emp.violationDetails.restrictedZone.detected 
                      ? "bg-[var(--danger-bg)] border-[var(--danger)]/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center",
                        emp.violationDetails.restrictedZone.detected 
                          ? "bg-[var(--danger)]/20" 
                          : "bg-muted"
                      )}>
                        <ShieldAlert className={cn(
                          "size-4",
                          emp.violationDetails.restrictedZone.detected ? "text-[var(--danger)]" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Restricted Zone Entry</p>
                        <p className="text-xs text-muted-foreground">Unauthorized area access</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {emp.violationDetails.restrictedZone.detected ? (
                        <>
                          <span className="text-xs font-bold text-[var(--danger)]">
                            {emp.violationDetails.restrictedZone.zones.join(", ")}
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

export function EmployeeLiveTable({ employees }: { employees: Employee[] }) {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<Filter>("all")

  const filtered = employees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.location.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      activeFilter === "all" ? true :
      activeFilter === "present" ? emp.status === "Present" :
      activeFilter === "idle" ? emp.activity === "Idle" :
      activeFilter === "violations" ? emp.violations > 0 :
      activeFilter === "high-productivity" ? emp.productivity >= 80 :
      activeFilter === "low-productivity" ? emp.productivity < 60 && emp.productivity > 0 :
      true

    return matchSearch && matchFilter
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Employee Live Table</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time tracking — click a row to expand details
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search employee, zone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-sm w-56"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Employee</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">First Entry</th>
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
              {filtered.length > 0 ? (
                filtered.map((emp) => <EmployeeRow key={emp.id} emp={emp} />)
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No employees match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {employees.length} employees
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
