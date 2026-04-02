"use client"

import { cn } from "@/lib/utils"

interface LiveBadgeProps {
  status?: "live" | "offline"
  className?: string
}

export function LiveBadge({ status = "live", className }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "live"
          ? "bg-[var(--live-bg)] text-[var(--live)]"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "live" ? "bg-[var(--live)] animate-pulse" : "bg-muted-foreground"
        )}
      />
      {status === "live" ? "LIVE" : "OFFLINE"}
    </span>
  )
}
