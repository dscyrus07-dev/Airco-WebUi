"use client"

import { useState } from "react"
import { dailyReport, yesterdaySummary, aiInsightsData, performanceLeaderboard, timeBehavior, employees, historicalData } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/badges"
import { cn } from "@/lib/utils"
import {
  Search,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Trophy,
  Medal,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Sunrise,
  Timer,
  Flame,
  Star,
  Camera,
  Activity,
  UserX,
  Calendar,
  ChevronDown,
  History,
  Smartphone,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const productivityData = [
  { day: "Mon", productivity: 74, attendance: 7 },
  { day: "Tue", productivity: 80, attendance: 8 },
  { day: "Wed", productivity: 68, attendance: 6 },
  { day: "Thu", productivity: 85, attendance: 8 },
  { day: "Fri", productivity: 79, attendance: 7 },
  { day: "Sat", productivity: 60, attendance: 4 },
]

const violationsData = [
  { week: "Wk 1", phone: 3, idle: 5, restricted: 1 },
  { week: "Wk 2", phone: 2, idle: 3, restricted: 2 },
  { week: "Wk 3", phone: 4, idle: 4, restricted: 0 },
  { week: "Wk 4", phone: 1, idle: 2, restricted: 3 },
]

// Same as dashboard
const todaySummaryCards = [
  { label: "Present Today", value: "6", sub: "+1 since yesterday", icon: Users, color: "text-[var(--live)]", bg: "bg-[var(--live-bg)]", trend: "up" },
  { label: "Absent Today", value: "2", sub: "Sara, Laura", icon: UserX, color: "text-muted-foreground", bg: "bg-muted", trend: "neutral" },
  { label: "Late Arrivals", value: "1", sub: "Nina Patel - 09:15", icon: Clock, color: "text-[var(--warning)]", bg: "bg-[var(--warning-bg)]", trend: "down" },
  { label: "Avg Productivity", value: "79%", sub: "+4% from yesterday", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", trend: "up" },
  { label: "Active Cameras", value: "8/9", sub: "CAM-05 offline", icon: Camera, color: "text-[var(--live)]", bg: "bg-[var(--live-bg)]", trend: "neutral" },
  { label: "Footfall Today", value: "34", sub: "Unique entries", icon: Activity, color: "text-primary", bg: "bg-primary/10", trend: "up" },
]

const getBadgeIcon = (badge: string | null) => {
  switch (badge) {
    case "gold": return <Trophy className="size-4 text-yellow-500" />
    case "silver": return <Medal className="size-4 text-gray-400" />
    case "bronze": return <Medal className="size-4 text-amber-600" />
    default: return null
  }
}

type ViewMode = "today" | "yesterday" | "historical"

export function ReportsPage() {
  const [search, setSearch] = useState("")
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [selectedHistoricalDate, setSelectedHistoricalDate] = useState(historicalData[1].date)

  const filtered = dailyReport.filter(
    (r) =>
      r.employee.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase())
  )

  const selectedHistorical = historicalData.find(h => h.date === selectedHistoricalDate) || historicalData[1]

  return (
    <div className="p-4 space-y-6">
      {/* Section Headers */}
      <div className="space-y-6">
        {/* Today's Report Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Today's Report</h1>
              <span className="text-xs bg-[var(--live-bg)] text-[var(--live)] px-2 py-1 rounded-full">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="size-4" />
                Export Today's Report
              </Button>
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg p-2 z-10 min-w-40">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                    <FileText className="size-4" />
                    Export as PDF
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                    <FileSpreadsheet className="size-4" />
                    Export as Excel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Today's Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
            {todaySummaryCards.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.label} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`size-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                        <Icon className={`size-4 ${card.color}`} />
                      </div>
                      {card.trend === "up" && <TrendingUp className="size-3 text-[var(--live)]" />}
                    </div>
                    <p className="text-xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs font-medium text-foreground mt-0.5">{card.label}</p>
                    <p className="text-[10px] text-muted-foreground">{card.sub}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Today's Specific Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Who was late */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="size-4 text-[var(--warning)]" />
                  Who was Late Today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dailyReport.filter(r => r.status === "Late").map((employee, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md bg-[var(--warning-bg)]/30">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-[var(--warning)]/20 text-[var(--warning)] text-xs font-bold flex items-center justify-center">
                          {employee.employee.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{employee.employee}</p>
                          <p className="text-[10px] text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-[var(--warning)]">{employee.firstEntry}</span>
                    </div>
                  ))}
                  {dailyReport.filter(r => r.status === "Late").length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No late arrivals today!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Who was on time */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="size-4 text-[var(--live)]" />
                  Who was On Time Today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {dailyReport.filter(r => r.status === "On Time").map((employee, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md bg-[var(--live-bg)]/30">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-[var(--live)]/20 text-[var(--live)] text-xs font-bold flex items-center justify-center">
                          {employee.employee.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{employee.employee}</p>
                          <p className="text-[10px] text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-[var(--live)]">{employee.firstEntry}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Phone Usage */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Smartphone className="size-4 text-[var(--danger)]" />
                  Phone Usage Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employees.filter(e => e.violations && e.violations > 0).map((employee, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md bg-[var(--danger-bg)]/30">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-xs font-bold flex items-center justify-center">
                          {employee.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{employee.name}</p>
                          <p className="text-[10px] text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--danger-bg)] text-[var(--danger)]">
                        {employee.violations} violations
                      </span>
                    </div>
                  ))}
                  {employees.filter(e => e.violations && e.violations > 0).length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No phone violations today!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Violations */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="size-4 text-[var(--danger)]" />
                  Today's Violations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employees.filter(e => e.violations && e.violations > 0).map((employee, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md bg-[var(--danger-bg)]/30">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-xs font-bold flex items-center justify-center">
                          {employee.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{employee.name}</p>
                          <p className="text-[10px] text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--danger-bg)] text-[var(--danger)]">
                        {employee.violations} total
                      </span>
                    </div>
                  ))}
                  {employees.filter(e => e.violations && e.violations > 0).length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No violations today!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Attendance Table */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-sm">Today's Complete Attendance Log</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 h-8 text-sm w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {["Employee", "Department", "First Entry", "Last Seen", "Total Work Time", "Status", "Violations", "Productivity"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, i) => {
                      const emp = employees.find(e => e.name === row.employee)
                      return (
                        <tr key={i} className="border-b border-border hover:bg-muted/20 transition-colors">
                          <td className="px-3 py-2.5 font-medium text-foreground whitespace-nowrap">{row.employee}</td>
                          <td className="px-3 py-2.5 text-muted-foreground text-xs">{row.department}</td>
                          <td className="px-3 py-2.5 text-foreground font-mono text-xs">{row.firstEntry}</td>
                          <td className="px-3 py-2.5 text-muted-foreground text-xs">{emp?.lastSeen || "-"}</td>
                          <td className="px-3 py-2.5 text-foreground text-xs">{row.workTime}</td>
                          <td className="px-3 py-2.5"><StatusBadge status={row.status} /></td>
                          <td className="px-3 py-2.5">
                            {emp?.violations && emp.violations > 0 ? (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--danger-bg)] text-[var(--danger)]">
                                {emp.violations}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">0</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            {emp?.productivity && emp.productivity > 0 ? (
                              <div className="flex items-center gap-2">
                                <Progress value={emp.productivity} className="h-1.5 w-12" />
                                <span className="text-[10px] font-medium text-foreground">{emp.productivity}%</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Historical Insights Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="size-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Historical Insights</h1>
            </div>
            <div className="relative">
              <select
                value={selectedHistoricalDate}
                onChange={(e) => setSelectedHistoricalDate(e.target.value)}
                className="h-8 rounded-md border border-border bg-background text-sm px-3 pr-8 text-foreground appearance-none cursor-pointer"
              >
                {historicalData.map((h) => (
                  <option key={h.date} value={h.date}>{h.label} ({h.date})</option>
                ))}
              </select>
              <ChevronDown className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Historical Summary */}
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <History className="size-4 text-primary" />
                <CardTitle className="text-sm">Historical Data: {selectedHistorical.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-foreground">{selectedHistorical.summary.present}</p>
                  <p className="text-[10px] text-muted-foreground">Present</p>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-foreground">{selectedHistorical.summary.absent}</p>
                  <p className="text-[10px] text-muted-foreground">Absent</p>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-[var(--warning)]">{selectedHistorical.summary.lateArrivals}</p>
                  <p className="text-[10px] text-muted-foreground">Late</p>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-primary">{selectedHistorical.summary.avgProductivity}%</p>
                  <p className="text-[10px] text-muted-foreground">Productivity</p>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-[var(--live)]">{selectedHistorical.summary.activeCameras}</p>
                  <p className="text-[10px] text-muted-foreground">Cameras</p>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-foreground">{selectedHistorical.summary.footfall}</p>
                  <p className="text-[10px] text-muted-foreground">Footfall</p>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xl font-bold text-[var(--danger)]">{selectedHistorical.summary.violations}</p>
                  <p className="text-[10px] text-muted-foreground">Violations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yesterday's EOD Employee Live Table */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Yesterday's EOD Employee Live Table - {selectedHistorical.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {["Employee", "First Entry", "Status", "Work Time", "Productivity", "Violations"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHistorical.employees.map((row, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="px-3 py-2.5 font-medium text-foreground">{row.name}</td>
                        <td className="px-3 py-2.5 font-mono text-xs text-foreground">{row.firstEntry}</td>
                        <td className="px-3 py-2.5"><StatusBadge status={row.status} /></td>
                        <td className="px-3 py-2.5 text-xs text-foreground">{row.workTime}</td>
                        <td className="px-3 py-2.5">
                          {row.productivity > 0 ? (
                            <div className="flex items-center gap-2">
                              <Progress value={row.productivity} className="h-1.5 w-12" />
                              <span className="text-[10px] font-medium text-foreground">{row.productivity}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          {row.violations > 0 ? (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--danger-bg)] text-[var(--danger)]">
                              {row.violations}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">0</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Timeline */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                Monthly Timeline - Day Wise EOD Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {historicalData.map((day, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{day.label}</p>
                        <p className="text-[10px] text-muted-foreground">{day.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[var(--live)]">{day.summary.present} present</span>
                      <span className="text-[var(--warning)]">{day.summary.lateArrivals} late</span>
                      <span className="text-[var(--danger)]">{day.summary.violations} violations</span>
                      <span className="text-primary">{day.summary.avgProductivity}% productivity</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Per Employee Analysis */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Per Employee Analysis - Attendance & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {employees.map((employee, i) => {
                  const employeeHistoricalData = historicalData.map(day => 
                    day.employees.find(e => e.name === employee.name)
                  ).filter(Boolean)
                  
                  const avgProductivity = employeeHistoricalData.reduce((acc, e) => acc + (e?.productivity || 0), 0) / employeeHistoricalData.length
                  const lateCount = employeeHistoricalData.filter(e => e?.status === "Late").length
                  const avgWorkHours = employeeHistoricalData.reduce((acc, e) => {
                    const hours = parseFloat(e?.workTime.split('h')[0] || '0')
                    return acc + hours
                  }, 0) / employeeHistoricalData.length
                  
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                          {employee.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{employee.name}</p>
                          <p className="text-[10px] text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-[var(--live)]">{Math.round(avgProductivity)}% avg</span>
                        <span className="text-[var(--warning)]">{lateCount} late</span>
                        <span className="text-primary">{avgWorkHours.toFixed(1)}h avg</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top 5 Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Top 5 Performer */}
            <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Trophy className="size-4 text-yellow-500" />
                  Top 5 Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {performanceLeaderboard.slice(0, 5).map((row, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-bold text-xs",
                          i === 0 && "text-yellow-500",
                          i === 1 && "text-gray-400", 
                          i === 2 && "text-amber-600",
                          i > 2 && "text-foreground"
                        )}>
                          #{row.rank}
                        </span>
                        <span className="text-xs font-medium text-foreground">{row.name}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">{row.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top 5 Best Attendance */}
            <Card className="border-[var(--live)]/30 bg-gradient-to-br from-[var(--live-bg)] to-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="size-4 text-[var(--live)]" />
                  Top 5 Best Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {performanceLeaderboard.sort((a, b) => b.attendance - a.attendance).slice(0, 5).map((row, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--live)]">#{i + 1}</span>
                        <span className="text-xs font-medium text-foreground">{row.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[var(--live)]">{row.attendance}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top 5 Late Behavior */}
            <Card className="border-[var(--warning)]/30 bg-gradient-to-br from-[var(--warning-bg)] to-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="size-4 text-[var(--warning)]" />
                  Top 5 Late Behavior
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employees.map(employee => {
                    const lateCount = historicalData.reduce((count, day) => {
                      const empData = day.employees.find(e => e.name === employee.name)
                      return count + (empData?.status === "Late" ? 1 : 0)
                    }, 0)
                    return { name: employee.name, lateCount }
                  }).sort((a, b) => b.lateCount - a.lateCount).slice(0, 5).map((row, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--warning)]">#{i + 1}</span>
                        <span className="text-xs font-medium text-foreground">{row.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[var(--warning)]">{row.lateCount} times</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top 5 Low Work Hours */}
            <Card className="border-[var(--danger)]/30 bg-gradient-to-br from-[var(--danger-bg)] to-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="size-4 text-[var(--danger)]" />
                  Top 5 Low Work Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employees.map(employee => {
                    const avgHours = historicalData.reduce((total, day) => {
                      const empData = day.employees.find(e => e.name === employee.name)
                      const hours = parseFloat(empData?.workTime.split('h')[0] || '0')
                      return total + hours
                    }, 0) / historicalData.length
                    return { name: employee.name, avgHours }
                  }).sort((a, b) => a.avgHours - b.avgHours).slice(0, 5).map((row, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--danger)]">#{i + 1}</span>
                        <span className="text-xs font-medium text-foreground">{row.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[var(--danger)]">{row.avgHours.toFixed(1)}h</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
