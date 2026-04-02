"use client"

import { useState } from "react"
import { employees, cameras } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Footprints,
  Smartphone,
  Eye,
  BarChart2,
  Scan,
  Lock,
  UserCheck,
  Camera,
  Plus,
  X,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const aiModels = [
  { id: "footfall", label: "Footfall Counter", icon: Footprints, status: "active", desc: "Counts unique individuals entering/exiting zones in real time.", accuracy: 99 },
  { id: "activity", label: "Activity Detection", icon: BarChart2, status: "active", desc: "Classifies employee activity: Working, Idle, Moving.", accuracy: 94 },
  { id: "phone", label: "Phone Usage Detection", icon: Smartphone, status: "active", desc: "Detects unauthorized phone usage during work hours.", accuracy: 91 },
  { id: "human", label: "Human Detection & Tracking", icon: Eye, status: "active", desc: "Multi-person detection and zone tracking via camera feeds.", accuracy: 97 },
  { id: "demographics", label: "Demographics Detection", icon: Users, status: "inactive", desc: "Age and gender estimation for analytics purposes.", accuracy: 88 },
  { id: "face", label: "Face Recognition", icon: Scan, status: "active", desc: "Identifies registered employees using facial biometrics.", accuracy: 98 },
]

const cameraZones = [
  { id: "CAM-01", name: "Main Gate", type: "entrance" },
  { id: "CAM-02", name: "Side Gate", type: "entrance" },
  { id: "CAM-03", name: "Lobby A", type: "common" },
  { id: "CAM-04", name: "Finance Floor", type: "restricted" },
  { id: "CAM-05", name: "Cafeteria", type: "common" },
  { id: "CAM-06", name: "HR Office", type: "office" },
  { id: "CAM-07", name: "Ops Room", type: "office" },
  { id: "CAM-08", name: "Engineering A", type: "office" },
  { id: "CAM-09", name: "Engineering B", type: "office" },
  { id: "CAM-13", name: "Server Room", type: "restricted" },
  { id: "CAM-11", name: "Conference Room A", type: "common" },
  { id: "CAM-12", name: "Conference Room B", type: "common" },
]

type Restriction = {
  id: string
  employeeId: string
  employeeName: string
  zoneId: string
  zoneName: string
  createdAt: string
}

export function AIInsightsPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedZone, setSelectedZone] = useState("")
  const [restrictions, setRestrictions] = useState<Restriction[]>([
    {
      id: "res-1",
      employeeId: "EMP006",
      employeeName: "Nina Patel",
      zoneId: "CAM-13",
      zoneName: "Server Room",
      createdAt: "2024-03-15 10:30 AM"
    },
    {
      id: "res-2", 
      employeeId: "EMP002",
      employeeName: "Priya Sharma",
      zoneId: "CAM-04",
      zoneName: "Finance Floor",
      createdAt: "2024-03-15 09:15 AM"
    }
  ])

  const addRestriction = () => {
    if (!selectedEmployee || !selectedZone) return
    
    const employee = employees.find(e => e.id === selectedEmployee)
    const zone = cameraZones.find(z => z.id === selectedZone)
    
    if (!employee || !zone) return
    
    // Check if restriction already exists
    const existingRestriction = restrictions.find(
      r => r.employeeId === selectedEmployee && r.zoneId === selectedZone
    )
    
    if (existingRestriction) return
    
    const newRestriction: Restriction = {
      id: `res-${Date.now()}`,
      employeeId: selectedEmployee,
      employeeName: employee.name,
      zoneId: selectedZone,
      zoneName: zone.name,
      createdAt: new Date().toLocaleString()
    }
    
    setRestrictions(prev => [...prev, newRestriction])
    setSelectedEmployee("")
    setSelectedZone("")
  }

  const removeRestriction = (restrictionId: string) => {
    setRestrictions(prev => prev.filter(r => r.id !== restrictionId))
  }

  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case "restricted": return "bg-[var(--danger-bg)] text-[var(--danger)] border-[var(--danger)]/30"
      case "entrance": return "bg-[var(--live-bg)] text-[var(--live)] border-[var(--live)]/30"
      case "office": return "bg-primary/10 text-primary border-primary/30"
      default: return "bg-muted text-muted-foreground border-border"
    }
  }
  return (
    <div className="p-4 space-y-6">
      {/* AI Models */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">AI Models</h2>
          <p className="text-xs text-muted-foreground">Deployed computer vision and ML models</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {aiModels.map((model) => {
            const Icon = model.icon
            return (
              <Card key={model.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                        model.status === "active"
                          ? "bg-[var(--live-bg)] text-[var(--live)]"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {model.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{model.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{model.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-muted-foreground">Accuracy</span>
                    <span className="text-[10px] font-semibold text-[var(--live)]">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-1" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Access Control */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-primary" />
          <div>
            <h2 className="text-base font-semibold text-foreground">Access Control</h2>
            <p className="text-xs text-muted-foreground">Manage zone restrictions per employee</p>
          </div>
        </div>

        {/* Add Restriction Form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Restriction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Employee Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <UserCheck className="size-3" />
                  Select Employee
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full h-8 rounded-md border border-border bg-background text-sm px-3 text-foreground"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>

              {/* Zone Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <Camera className="size-3" />
                  Select Camera Zone
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full h-8 rounded-md border border-border bg-background text-sm px-3 text-foreground"
                >
                  <option value="">-- Choose Zone --</option>
                  {cameraZones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={addRestriction}
              disabled={!selectedEmployee || !selectedZone}
              className="gap-1.5"
              size="sm"
            >
              <Plus className="size-3" />
              Add Restriction
            </Button>
          </CardContent>
        </Card>

        {/* Blacklist Status */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="size-4 text-[var(--danger)]" />
                Blacklist Status
              </CardTitle>
              <span className="text-xs bg-[var(--danger-bg)] text-[var(--danger)] px-2 py-0.5 rounded-full font-medium">
                {restrictions.length} Restricted
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {restrictions.length > 0 ? (
              <div className="space-y-2">
                {restrictions.map((restriction) => (
                  <div key={restriction.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-xs font-bold flex items-center justify-center">
                        {restriction.employeeName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{restriction.employeeName}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Lock className="size-2.5" />
                          Restricted from {restriction.zoneName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">{restriction.createdAt}</p>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded mt-1 inline-block",
                          getZoneTypeColor(cameraZones.find(z => z.id === restriction.zoneId)?.type || "common")
                        )}>
                          {restriction.zoneId}
                        </span>
                      </div>
                      <button
                        onClick={() => removeRestriction(restriction.id)}
                        className="size-6 rounded-full bg-muted hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] flex items-center justify-center transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No restrictions currently active</p>
                <p className="text-[10px] text-muted-foreground mt-1">Add restrictions above to blacklist employees from specific zones</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      </div>
  )
}
