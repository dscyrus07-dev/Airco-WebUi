"use client"

import { useState } from "react"
import { tickets } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Ticket, CheckCircle, Clock, Camera, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "active" | "resolved"

const severityConfig = {
  critical: { label: "Critical", className: "bg-[var(--danger-bg)] text-[var(--danger)]" },
  medium: { label: "Medium", className: "bg-[var(--warning-bg)] text-[var(--warning)]" },
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
}

export function TicketsPage() {
  const [tab, setTab] = useState<Tab>("active")

  const activeTickets = tickets.filter((t) => t.status === "open")
  const resolvedTickets = tickets.filter((t) => t.status === "resolved")

  const displayed = tab === "active" ? activeTickets : resolvedTickets

  const summaryCards = [
    { label: "Total Open", value: activeTickets.length, icon: Ticket, color: "text-primary", bg: "bg-primary/10" },
    { label: "Critical Alerts", value: activeTickets.filter((t) => t.severity === "critical").length, icon: AlertTriangle, color: "text-[var(--danger)]", bg: "bg-[var(--danger-bg)]" },
    { label: "Resolved Today", value: resolvedTickets.length, icon: CheckCircle, color: "text-[var(--live)]", bg: "bg-[var(--live-bg)]" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map((c) => {
          const Icon = c.icon
          return (
            <Card key={c.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`size-10 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`size-5 ${c.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{c.value}</p>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {(["active", "resolved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors",
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "active" ? "Active Alerts" : "Resolved Alerts"}
            <span className={cn(
              "ml-2 text-xs rounded-full px-1.5 py-0.5",
              tab === t ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {t === "active" ? activeTickets.length : resolvedTickets.length}
            </span>
          </button>
        ))}
      </div>

      {/* Ticket Cards */}
      <div className="space-y-3">
        {displayed.map((ticket) => {
          const sev = severityConfig[ticket.severity as keyof typeof severityConfig]
          return (
            <Card key={ticket.id} className={cn(
              "hover:shadow-md transition-shadow",
              ticket.severity === "critical" && ticket.status === "open" && "border-[var(--danger)]/30"
            )}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="size-9 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {ticket.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{ticket.employee}</span>
                        <span className="text-xs text-muted-foreground">{ticket.department}</span>
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", sev.className)}>
                          {sev.label}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {ticket.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{ticket.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {ticket.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Camera className="size-3" />
                          {ticket.camera}
                        </span>
                        <span className="text-muted-foreground/50">{ticket.id}</span>
                      </div>
                    </div>
                  </div>

                  {ticket.status === "open" ? (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" className="h-8 text-xs gap-1 text-[var(--live)] border-[var(--live)]/30 hover:bg-[var(--live-bg)]">
                        <CheckCircle className="size-3.5" />
                        Resolve
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
                        Ignore
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs font-medium bg-[var(--live-bg)] text-[var(--live)] px-2.5 py-1 rounded-full flex-shrink-0">
                      Resolved
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
        {displayed.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No {tab} tickets.
          </div>
        )}
      </div>
    </div>
  )
}
