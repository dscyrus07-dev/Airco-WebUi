"use client"

import { useEffect, useState } from "react"

export function useClock() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted || !time) {
    return { time: "--:--:--", date: "---" }
  }

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return { time: timeStr, date: dateStr }
}
