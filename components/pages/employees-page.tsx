"use client"

import { useState } from "react"
import { employees } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/badges"
import { UserPlus, Camera, CheckCircle, XCircle, Upload, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmployeesPage() {
  const [form, setForm] = useState({ name: "", id: "", department: "", contact: "", role: "" })
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedCamera, setSelectedCamera] = useState("")
  const [isTraining, setIsTraining] = useState(false)
  const [trainingStatus, setTrainingStatus] = useState("No training in progress. Select an employee and click Start Training to begin.")

  const startTraining = () => {
    if (!selectedEmployee || !selectedCamera) {
      setTrainingStatus("Please select both an employee and camera before starting training.")
      return
    }
    
    setIsTraining(true)
    setTrainingStatus(`Training started for ${employees.find(e => e.id === selectedEmployee)?.name} using ${selectedCamera}...`)
    
    // Simulate training process
    setTimeout(() => {
      setTrainingStatus("Training in progress... Capturing facial features and training model...")
    }, 2000)
    
    setTimeout(() => {
      setTrainingStatus("Training in progress... Processing images and generating recognition patterns...")
    }, 4000)
    
    setTimeout(() => {
      setTrainingStatus("Training in progress... Finalizing model and updating database...")
    }, 6000)
    
    setTimeout(() => {
      setIsTraining(false)
      setTrainingStatus(`Training completed successfully for ${employees.find(e => e.id === selectedEmployee)?.name}! Face recognition model is now active.`)
    }, 8000)
  }

  return (
    <div className="p-6 space-y-8">
      {/* Section A: Add Employee */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <UserPlus className="size-4 text-primary" />
          <div>
            <h2 className="text-base font-semibold text-foreground">Add Employee</h2>
            <p className="text-xs text-muted-foreground">Register a new employee to the system</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Full Name", key: "name", placeholder: "e.g. Alex Carter" },
                { label: "Employee ID", key: "id", placeholder: "e.g. EMP009" },
                { label: "Department", key: "department", placeholder: "e.g. Engineering" },
                { label: "Contact Email", key: "contact", placeholder: "e.g. alex@airco.com" },
                { label: "Role", key: "role", placeholder: "e.g. Senior Developer" },
              ].map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">{field.label}</label>
                  <Input
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="h-9 text-sm"
                  />
                </div>
              ))}

              {/* Upload Face */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Face Images</label>
                <div className="h-9 rounded-md border border-dashed border-border flex items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors text-sm text-muted-foreground">
                  <Upload className="size-3.5" />
                  Upload images
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Button size="sm" className="gap-2">
                <UserPlus className="size-3.5" />
                Add Employee
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section B: Employee Database */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Employee Database</h2>
          <p className="text-xs text-muted-foreground">{employees.length} registered employees</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["Employee", "ID", "Department", "Role", "System Status", "Face Trained"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="size-7 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {emp.avatar}
                          </div>
                          <span className="font-medium text-foreground">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{emp.id}</td>
                      <td className="px-4 py-3 text-foreground">{emp.department}</td>
                      <td className="px-4 py-3 text-muted-foreground">{emp.role}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={emp.active ? "Present" : "Absent"} />
                      </td>
                      <td className="px-4 py-3">
                        {emp.faceTrained ? (
                          <span className="flex items-center gap-1 text-xs text-[var(--live)]">
                            <CheckCircle className="size-3.5" />
                            Trained
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <XCircle className="size-3.5" />
                            Not Trained
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section C: Face Training */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="size-4 text-primary" />
          <div>
            <h2 className="text-base font-semibold text-foreground">Face Training</h2>
            <p className="text-xs text-muted-foreground">Train facial recognition models for employees</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Select Employee</label>
                <select 
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-background text-sm px-3 text-foreground"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.filter((e) => !e.faceTrained).map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.name} – {emp.id}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Select Camera</label>
                <select 
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-background text-sm px-3 text-foreground"
                >
                  <option value="">-- Choose Camera --</option>
                  <option value="CAM-01">CAM-01 – Main Gate</option>
                  <option value="CAM-03">CAM-03 – Lobby A</option>
                </select>
              </div>
            </div>

            {/* Training Status */}
            <div className={cn(
              "rounded-lg p-4 text-sm",
              isTraining 
                ? "bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)]" 
                : trainingStatus.includes("completed successfully")
                ? "bg-[var(--live-bg)] border border-[var(--live)]/30 text-[var(--live)]"
                : trainingStatus.includes("Please select") || trainingStatus.includes("No training")
                ? "bg-muted/40 border border-border text-muted-foreground"
                : "bg-muted/40 border border-border text-foreground"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {isTraining && <div className="size-2 rounded-full bg-[var(--primary)] animate-pulse" />}
                {trainingStatus.includes("completed successfully") && <CheckCircle className="size-4" />}
                {trainingStatus.includes("Please select") && <XCircle className="size-4" />}
                <p className="font-medium">Training Status</p>
              </div>
              <p className="text-xs leading-relaxed">{trainingStatus}</p>
              {isTraining && (
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-[var(--primary)] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs mt-1 text-center">Processing...</p>
                </div>
              )}
            </div>

            {/* Start Training Button */}
            <div className="flex justify-start">
              <Button 
                size="sm" 
                className="gap-1.5"
                onClick={startTraining}
                disabled={isTraining || !selectedEmployee || !selectedCamera}
              >
                <Cpu className="size-3.5" />
                {isTraining ? "Training in Progress..." : "Start Training"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
