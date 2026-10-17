"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { LiveFeedPage } from "@/components/pages/live-feed-page"
import { ReportsPage } from "@/components/pages/reports-page"
import { AIInsightsPage } from "@/components/pages/ai-insights-page"
import { TicketsPage } from "@/components/pages/tickets-page"
import { EmployeesPage } from "@/components/pages/employees-page"
import { SettingsPage } from "@/components/pages/settings-page"

const pageTitles: Record<string, string> = {
  "dashboard": "Dashboard",
  "live-feed": "Live Feed",
  "reports": "Reports",
  "ai-insights": "AI Insights",
  "tickets": "Tickets",
  "employees": "Employees",
  "settings": "Settings",
}

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />
      case "live-feed": return <LiveFeedPage />
      case "reports": return <ReportsPage />
      case "ai-insights": return <AIInsightsPage />
      case "tickets": return <TicketsPage />
      case "employees": return <EmployeesPage />
      case "settings": return <SettingsPage darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      default: return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopHeader
          title={pageTitles[activePage] ?? "Dashboard"}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(!darkMode)}
        />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
