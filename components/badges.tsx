"use client"

import { cn } from "@/lib/utils"

type ActivityType = "Working" | "Idle" | "Moving" | "Phone" | "—"

const activityConfig: Record<ActivityType, { label: string; className: string }> = {
  Working: { label: "Working", className: "bg-[var(--live-bg)] text-[var(--live)]" },
  Idle: { label: "Idle", className: "bg-[var(--warning-bg)] text-[var(--warning)]" },
  Moving: { label: "Moving", className: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },
  Phone: { label: "Phone", className: "bg-[var(--danger-bg)] text-[var(--danger)]" },
  "—": { label: "—", className: "bg-muted text-muted-foreground" },
}

export function ActivityBadge({ activity }: { activity: string }) {
  const config = activityConfig[activity as ActivityType] ?? activityConfig["—"]
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.className)}>
      {config.label}
    </span>
  )
}

const statusStyles: Record<string, { pill: string; dot: string }> = {
  Present: { pill: "bg-[var(--live-bg)] text-[var(--live)]", dot: "bg-[var(--live)]" },
  "On Time": { pill: "bg-[var(--live-bg)] text-[var(--live)]", dot: "bg-[var(--live)]" },
  Late: { pill: "bg-[var(--warning-bg)] text-[var(--warning)]", dot: "bg-[var(--warning)]" },
}

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? { pill: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" }
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", style.pill)}>
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {status}
    </span>
  )
}
