"use client"

import { useRef, useState } from "react"
import { cameras } from "@/lib/mock-data"
import { getAssetPath } from "@/lib/assets"
import { LiveBadge } from "@/components/live-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Play, Square, Grid2x2, LayoutGrid, Grid3x3, Expand } from "lucide-react"
import { cn } from "@/lib/utils"

type GridSize = 4 | 6 | 9

const ZONE_COLORS: Record<string, string> = {
  Entrance: "bg-sky-500",
  Common: "bg-emerald-500",
  Restricted: "bg-rose-500",
  Office: "bg-amber-500",
}

export function LiveFeedPage() {
  const [gridSize, setGridSize] = useState<GridSize>(9)
  const [zoneFilter, setZoneFilter] = useState("All")
  const wallRef = useRef<HTMLDivElement>(null)
  const tileRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(
    Object.fromEntries(cameras.map((c) => [c.id, c.status === "live"]))
  )

  const toggleCamera = (id: string) => {
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const startAll = () => setActiveStates(Object.fromEntries(cameras.map((c) => [c.id, true])))
  const stopAll = () => setActiveStates(Object.fromEntries(cameras.map((c) => [c.id, false])))

  const zones = ["All", ...new Set(cameras.map((c) => c.zone))]
  const liveCount = cameras.filter((c) => activeStates[c.id]).length

  const filtered = zoneFilter === "All" ? cameras : cameras.filter((c) => c.zone === zoneFilter)
  const displayed = filtered.slice(0, gridSize)

  const gridClass =
    gridSize === 4 ? "grid-cols-2" :
    "grid-cols-2 md:grid-cols-3"

  return (
    <div className="p-6 space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={startAll} className="gap-1.5 text-[var(--live)] border-[var(--live)]/30 hover:bg-[var(--live-bg)]">
            <Play className="size-3.5 fill-current" />
            Start All
          </Button>
          <Button size="sm" variant="outline" onClick={stopAll} className="gap-1.5 text-muted-foreground">
            <Square className="size-3.5" />
            Stop All
          </Button>
          <span className="ml-2 text-xs font-medium text-muted-foreground">
            <span className="text-[var(--live)]">{liveCount} live</span> / {cameras.length} cameras
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => wallRef.current?.requestFullscreen()} className="gap-1.5">
            <Expand className="size-3.5" />
            Fullscreen Wall
          </Button>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {([4, 6, 9] as GridSize[]).map((size) => {
              const Icon = size === 4 ? Grid2x2 : size === 6 ? LayoutGrid : Grid3x3
              return (
                <button
                  key={size}
                  onClick={() => setGridSize(size)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors",
                    gridSize === size ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5" />
                  {size === 9 ? "All" : size}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Zone filter + distribution */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {zones.map((z) => {
            const inZone = z === "All" ? cameras : cameras.filter((c) => c.zone === z)
            const live = inZone.filter((c) => activeStates[c.id]).length
            return (
              <button
                key={z}
                onClick={() => setZoneFilter(z)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5",
                  zoneFilter === z
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                )}
              >
                {z !== "All" && <span className={cn("size-1.5 rounded-full", ZONE_COLORS[z] ?? "bg-gray-400")} />}
                {z}
                <span className={cn("tabular-nums", zoneFilter === z ? "opacity-70" : "opacity-50")}>{live}/{inZone.length}</span>
              </button>
            )
          })}
        </div>
        {/* Zone distribution bar */}
        <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-muted">
          {zones.slice(1).map((z) => {
            const inZone = cameras.filter((c) => c.zone === z)
            return (
              <button
                key={z}
                title={`${z}: ${inZone.filter((c) => activeStates[c.id]).length}/${inZone.length} live`}
                onClick={() => setZoneFilter(z === zoneFilter ? "All" : z)}
                className={cn("h-full transition-opacity hover:opacity-80", ZONE_COLORS[z] ?? "bg-gray-400", zoneFilter !== "All" && zoneFilter !== z && "opacity-30")}
                style={{ width: `${(inZone.length / cameras.length) * 100}%` }}
              />
            )
          })}
        </div>
      </div>

      {/* Camera Grid */}
      <div ref={wallRef} className={cn("grid gap-4 bg-background", gridClass)}>
        {displayed.map((cam) => {
          const isLive = activeStates[cam.id]
          return (
            <Card key={cam.id} className="overflow-hidden group">
              {/* Camera Preview */}
              <div
                ref={(el) => { tileRefs.current[cam.id] = el }}
                className="relative aspect-video bg-gray-900 flex items-center justify-center fullscreen:aspect-auto fullscreen:h-full"
              >
                {isLive ? (
                  <>
                    {cam.video ? (
                      <video
                        src={getAssetPath(cam.video)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
                        <div className="relative z-10 flex flex-col items-center gap-2 text-gray-500">
                          <div className="size-8 rounded-full border-2 border-gray-600 flex items-center justify-center">
                            <Play className="size-4 text-gray-500" />
                          </div>
                          <p className="text-xs text-gray-500">Live Preview</p>
                        </div>
                      </>
                    )}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                      <LiveBadge status="live" />
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => tileRefs.current[cam.id]?.requestFullscreen()}
                        className="p-1.5 bg-black/60 rounded-md text-white hover:bg-black/80 transition-colors"
                      >
                        <Maximize2 className="size-3.5" />
                      </button>
                    </div>
                    {/* Zone tag */}
                    <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-medium text-white">
                      <span className={cn("size-1.5 rounded-full", ZONE_COLORS[cam.zone] ?? "bg-gray-400")} />
                      {cam.zone}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
                      <Square className="size-4 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Feed Stopped</p>
                  </div>
                )}
              </div>

              {/* Camera Info */}
              <CardContent className="p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{cam.name}</p>
                  <p className="text-[11px] text-muted-foreground">{cam.location} &middot; {cam.zone}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    variant={isLive ? "destructive" : "outline"}
                    className="h-7 px-2.5 text-xs gap-1"
                    onClick={() => toggleCamera(cam.id)}
                  >
                    {isLive ? <><Square className="size-3" /> Stop</> : <><Play className="size-3" /> Start</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
