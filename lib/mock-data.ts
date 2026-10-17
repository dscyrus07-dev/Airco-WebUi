// Mock data for the entire dashboard

type EmpViolations = {
  phoneUsage: { detected: boolean; duration: string }
  idleTime: { detected: boolean; duration: string }
  restrictedZone: { detected: boolean; zones: string[] }
}

const clearViolations = (): EmpViolations => ({
  phoneUsage: { detected: false, duration: "0m" },
  idleTime: { detected: false, duration: "0m" },
  restrictedZone: { detected: false, zones: [] },
})

function makeEmployee(e: {
  id: string
  name: string
  department: string
  role: string
  avatarImage: string
  status?: string
  firstEntry?: string
  lastSeen?: string
  location?: string
  activity?: string
  dwellTime?: string
  productivity?: number
  violations?: number
  violationDetails?: EmpViolations
  faceTrained?: boolean
  active?: boolean
  timeline?: { time: string; event: string; camera: string }[]
  movements?: string[]
  snapshots?: number
  cameraDwell?: { camera: string; name: string; dwell: string }[]
}) {
  const emailName = e.name.toLowerCase().replace(/[^a-z]+/g, ".")
  return {
    contact: `${emailName}@airco.com`,
    avatar: e.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    status: "Present",
    firstEntry: "08:45 AM",
    lastSeen: "5 min ago",
    location: "Floor 2 – Zone A",
    activity: "Working",
    dwellTime: "4h 00m",
    productivity: 75,
    violations: 0,
    violationDetails: clearViolations(),
    faceTrained: true,
    active: true,
    timeline: [],
    movements: [],
    snapshots: 0,
    cameraDwell: [],
    ...e,
  }
}

export const employees = [
  makeEmployee({
    id: "EMP001",
    name: "Abhay",
    department: "Engineering",
    role: "Senior Developer",
    avatarImage: "/avatars/abhay.jpg",
    firstEntry: "08:42 AM",
    lastSeen: "2 min ago",
    location: "Floor 3 – Zone A",
    activity: "Working",
    dwellTime: "4h 18m",
    productivity: 87,
    snapshots: 3,
    timeline: [
      { time: "08:42 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:05 AM", event: "Reached Floor 3 – Desk Area", camera: "CAM-08" },
      { time: "10:30 AM", event: "Moved to Conference Room B", camera: "CAM-12" },
      { time: "11:15 AM", event: "Returned to Desk", camera: "CAM-08" },
    ],
    movements: ["Main Gate", "Floor 3 – Zone A", "Conference Room B"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "12m" },
      { camera: "CAM-08", name: "Engineering A", dwell: "3h 15m" },
      { camera: "CAM-12", name: "Conference Room B", dwell: "45m" },
    ],
  }),
  makeEmployee({
    id: "EMP002",
    name: "Aditi",
    department: "HR",
    role: "HR Manager",
    avatarImage: "/avatars/aditi.jpg",
    firstEntry: "09:01 AM",
    lastSeen: "5 min ago",
    location: "Floor 2 – HR Office",
    activity: "Idle",
    dwellTime: "3h 59m",
    productivity: 62,
    snapshots: 2,
    timeline: [
      { time: "09:01 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:20 AM", event: "Floor 2 – HR Office", camera: "CAM-06" },
      { time: "11:00 AM", event: "Meeting Room A", camera: "CAM-11" },
    ],
    movements: ["Main Gate", "Floor 2 – HR Office", "Meeting Room A"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "8m" },
      { camera: "CAM-06", name: "HR Office", dwell: "3h 10m" },
      { camera: "CAM-11", name: "Meeting Room A", dwell: "50m" },
    ],
  }),
  makeEmployee({
    id: "EMP003",
    name: "Aisvarrya",
    department: "Finance",
    role: "Financial Analyst",
    avatarImage: "/avatars/aisvarrya.jpg",
    firstEntry: "08:55 AM",
    lastSeen: "1 min ago",
    location: "Floor 1 – Finance",
    dwellTime: "4h 05m",
    productivity: 91,
    snapshots: 1,
    timeline: [
      { time: "08:55 AM", event: "Entered via Side Gate", camera: "CAM-02" },
      { time: "09:10 AM", event: "Floor 1 – Finance Desk", camera: "CAM-04" },
    ],
    movements: ["Side Gate", "Floor 1 – Finance"],
    cameraDwell: [
      { camera: "CAM-02", name: "Side Gate", dwell: "5m" },
      { camera: "CAM-04", name: "Finance Floor", dwell: "4h 00m" },
    ],
  }),
  makeEmployee({
    id: "EMP004",
    name: "Ayusha",
    department: "Design",
    role: "UI/UX Designer",
    avatarImage: "/avatars/ayusha.jpg",
    firstEntry: "08:50 AM",
    lastSeen: "3 min ago",
    location: "Floor 3 – Studio",
    dwellTime: "4h 10m",
    productivity: 84,
    snapshots: 2,
    timeline: [
      { time: "08:50 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:05 AM", event: "Floor 3 – Design Studio", camera: "CAM-10" },
    ],
    movements: ["Main Gate", "Floor 3 – Studio"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "9m" },
      { camera: "CAM-10", name: "Design Studio", dwell: "4h 01m" },
    ],
  }),
  makeEmployee({
    id: "EMP005",
    name: "Chinoy",
    department: "Operations",
    role: "Ops Coordinator",
    avatarImage: "/avatars/chinoy.jpg",
    firstEntry: "08:30 AM",
    lastSeen: "12 min ago",
    location: "Floor 2 – Ops Room",
    dwellTime: "4h 30m",
    productivity: 58,
    violations: 1,
    violationDetails: {
      phoneUsage: { detected: false, duration: "0m" },
      idleTime: { detected: true, duration: "45m" },
      restrictedZone: { detected: false, zones: [] },
    },
    snapshots: 2,
    timeline: [
      { time: "08:30 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "08:50 AM", event: "Floor 2 – Ops Room", camera: "CAM-07" },
      { time: "11:30 AM", event: "Idle period detected", camera: "CAM-07" },
    ],
    movements: ["Main Gate", "Floor 2 – Ops Room"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "8m" },
      { camera: "CAM-07", name: "Ops Room", dwell: "4h 22m" },
    ],
  }),
  makeEmployee({
    id: "EMP006",
    name: "Meghana",
    department: "Security",
    role: "Security Officer",
    avatarImage: "/avatars/meghana.jpg",
    firstEntry: "07:30 AM",
    lastSeen: "Just now",
    location: "Main Gate – Zone 0",
    activity: "Moving",
    dwellTime: "5h 30m",
    productivity: 78,
    snapshots: 4,
    timeline: [
      { time: "07:30 AM", event: "Started shift at Main Gate", camera: "CAM-01" },
      { time: "09:00 AM", event: "Patrol – Floor 1", camera: "CAM-03" },
      { time: "11:00 AM", event: "Patrol – Floor 2", camera: "CAM-06" },
    ],
    movements: ["Main Gate", "Floor 1", "Floor 2"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "3h 30m" },
      { camera: "CAM-03", name: "Floor 1 Patrol", dwell: "1h 15m" },
      { camera: "CAM-06", name: "Floor 2 Patrol", dwell: "45m" },
    ],
  }),
  makeEmployee({
    id: "EMP007",
    name: "Madhura",
    department: "Marketing",
    role: "Marketing Lead",
    avatarImage: "/avatars/madhura.jpg",
    status: "Absent",
    firstEntry: "—",
    lastSeen: "Yesterday",
    location: "—",
    activity: "—",
    dwellTime: "—",
    productivity: 0,
    active: false,
  }),
  makeEmployee({
    id: "EMP008",
    name: "Neha",
    department: "Engineering",
    role: "DevOps Engineer",
    avatarImage: "/avatars/neha.jpg",
    firstEntry: "09:58 AM",
    lastSeen: "8 min ago",
    location: "Floor 3 – Zone B",
    activity: "Working",
    dwellTime: "3h 02m",
    productivity: 72,
    snapshots: 2,
    timeline: [
      { time: "09:58 AM", event: "Entered via Main Gate (Late)", camera: "CAM-01" },
      { time: "10:10 AM", event: "Floor 3 – Zone B", camera: "CAM-09" },
    ],
    movements: ["Main Gate", "Floor 3 – Zone B"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "6m" },
      { camera: "CAM-09", name: "Engineering B", dwell: "2h 56m" },
    ],
  }),
  makeEmployee({
    id: "EMP009",
    name: "Rahul Awasthy",
    department: "Product",
    role: "Product Manager",
    avatarImage: "/avatars/rahul-a.jpg",
    firstEntry: "08:35 AM",
    lastSeen: "4 min ago",
    location: "Floor 2 – PM Desk",
    dwellTime: "4h 25m",
    productivity: 82,
    snapshots: 2,
    timeline: [
      { time: "08:35 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:00 AM", event: "Standup – Meeting Room A", camera: "CAM-11" },
      { time: "09:30 AM", event: "Floor 2 – PM Desk", camera: "CAM-07" },
    ],
    movements: ["Main Gate", "Meeting Room A", "Floor 2 – PM Desk"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "7m" },
      { camera: "CAM-11", name: "Meeting Room A", dwell: "30m" },
      { camera: "CAM-07", name: "Ops Room", dwell: "3h 48m" },
    ],
  }),
  makeEmployee({
    id: "EMP010",
    name: "Rajath",
    department: "Engineering",
    role: "Backend Developer",
    avatarImage: "/avatars/rajath.jpg",
    firstEntry: "08:48 AM",
    lastSeen: "6 min ago",
    location: "Floor 3 – Zone A",
    dwellTime: "4h 12m",
    productivity: 88,
    snapshots: 2,
    timeline: [
      { time: "08:48 AM", event: "Entered via Side Gate", camera: "CAM-02" },
      { time: "09:00 AM", event: "Floor 3 – Zone A", camera: "CAM-08" },
    ],
    movements: ["Side Gate", "Floor 3 – Zone A"],
    cameraDwell: [
      { camera: "CAM-02", name: "Side Gate", dwell: "5m" },
      { camera: "CAM-08", name: "Engineering A", dwell: "4h 07m" },
    ],
  }),
  makeEmployee({
    id: "EMP011",
    name: "Ritika",
    department: "Finance",
    role: "Accountant",
    avatarImage: "/avatars/ritika.jpg",
    status: "Absent",
    firstEntry: "—",
    lastSeen: "2 days ago",
    location: "—",
    activity: "—",
    dwellTime: "—",
    productivity: 0,
    active: false,
  }),
  makeEmployee({
    id: "EMP012",
    name: "Ritvik",
    department: "Engineering",
    role: "Frontend Developer",
    avatarImage: "/avatars/ritvik.jpg",
    firstEntry: "09:15 AM",
    lastSeen: "8 min ago",
    location: "Floor 3 – Zone B",
    activity: "Phone",
    dwellTime: "3h 45m",
    productivity: 54,
    violations: 2,
    violationDetails: {
      phoneUsage: { detected: true, duration: "18m" },
      idleTime: { detected: false, duration: "0m" },
      restrictedZone: { detected: true, zones: ["Server Room"] },
    },
    snapshots: 5,
    timeline: [
      { time: "09:15 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:30 AM", event: "Floor 3 – Zone B", camera: "CAM-09" },
      { time: "10:45 AM", event: "Phone usage detected", camera: "CAM-09" },
      { time: "12:00 PM", event: "Restricted Zone Entry", camera: "CAM-13" },
    ],
    movements: ["Main Gate", "Floor 3 – Zone B", "Restricted Area"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "10m" },
      { camera: "CAM-09", name: "Engineering B", dwell: "3h 00m" },
      { camera: "CAM-13", name: "Server Room", dwell: "35m" },
    ],
  }),
  makeEmployee({
    id: "EMP013",
    name: "Sameer",
    department: "Engineering",
    role: "QA Engineer",
    avatarImage: "/avatars/sameer.jpg",
    firstEntry: "08:52 AM",
    lastSeen: "7 min ago",
    location: "Floor 3 – Zone A",
    dwellTime: "4h 08m",
    productivity: 80,
    snapshots: 2,
    timeline: [
      { time: "08:52 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:10 AM", event: "Floor 3 – Zone A", camera: "CAM-08" },
    ],
    movements: ["Main Gate", "Floor 3 – Zone A"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "8m" },
      { camera: "CAM-08", name: "Engineering A", dwell: "4h 00m" },
    ],
  }),
  makeEmployee({
    id: "EMP014",
    name: "Shubh",
    department: "Support",
    role: "Support Executive",
    avatarImage: "/avatars/shubh.jpg",
    firstEntry: "10:05 AM",
    lastSeen: "15 min ago",
    location: "Floor 1 – Support Desk",
    activity: "Working",
    dwellTime: "2h 55m",
    productivity: 66,
    faceTrained: false,
    snapshots: 1,
    timeline: [
      { time: "10:05 AM", event: "Entered via Main Gate (Late)", camera: "CAM-01" },
      { time: "10:20 AM", event: "Floor 1 – Support Desk", camera: "CAM-03" },
    ],
    movements: ["Main Gate", "Floor 1 – Support Desk"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "9m" },
      { camera: "CAM-03", name: "Support Desk", dwell: "2h 46m" },
    ],
  }),
  makeEmployee({
    id: "EMP015",
    name: "Simran",
    department: "HR",
    role: "Recruiter",
    avatarImage: "/avatars/simran.jpg",
    firstEntry: "08:58 AM",
    lastSeen: "4 min ago",
    location: "Floor 2 – HR Office",
    dwellTime: "4h 02m",
    productivity: 76,
    snapshots: 2,
    timeline: [
      { time: "08:58 AM", event: "Entered via Main Gate", camera: "CAM-01" },
      { time: "09:15 AM", event: "Floor 2 – HR Office", camera: "CAM-06" },
    ],
    movements: ["Main Gate", "Floor 2 – HR Office"],
    cameraDwell: [
      { camera: "CAM-01", name: "Main Gate", dwell: "7m" },
      { camera: "CAM-06", name: "HR Office", dwell: "3h 55m" },
    ],
  }),
  makeEmployee({
    id: "EMP016",
    name: "Varun",
    department: "Engineering",
    role: "Data Analyst",
    avatarImage: "/avatars/varun.jpg",
    firstEntry: "08:40 AM",
    lastSeen: "10 min ago",
    location: "Floor 1 – Analytics Bay",
    dwellTime: "4h 20m",
    productivity: 85,
    snapshots: 2,
    timeline: [
      { time: "08:40 AM", event: "Entered via Side Gate", camera: "CAM-02" },
      { time: "08:55 AM", event: "Floor 1 – Analytics Bay", camera: "CAM-04" },
    ],
    movements: ["Side Gate", "Floor 1 – Analytics Bay"],
    cameraDwell: [
      { camera: "CAM-02", name: "Side Gate", dwell: "6m" },
      { camera: "CAM-04", name: "Analytics Bay", dwell: "4h 14m" },
    ],
  }),
]


export const historicalData = [
  {
    date: "2026-04-01",
    label: "Yesterday",
    summary: {
      present: 7,
      absent: 1,
      lateArrivals: 2,
      avgProductivity: 75,
      activeCameras: 8,
      footfall: 42,
      violations: 4,
    },
    insightQuestions: {
      who: { summary: "7 employees", present: ["Abhay", "Aditi", "Aisvarrya", "Meghana", "Ritvik", "Chinoy", "Ayusha"] },
      where: { summary: "6 zones active", zones: ["Floor 3 - Zone A", "Floor 2 - HR", "Floor 1 - Finance", "Main Gate", "Floor 3 - Zone B", "Floor 2 - Ops"] },
      what: { summary: "4 working, 2 idle, 1 phone", working: 4, idle: 2, moving: 0, phone: 1 },
      howLong: { summary: "Avg: 5h 12m", breakdown: { "5+ hours": 3, "4-5 hours": 2, "3-4 hours": 2, "< 3 hours": 0 } },
      violations: { summary: "4 detected", list: [
        { type: "Phone Usage", employee: "Ritvik", time: "09:30 AM", severity: "medium" },
        { type: "Idle Alert", employee: "Aditi", time: "10:15 AM", severity: "low" },
        { type: "Restricted Zone", employee: "Ritvik", time: "11:00 AM", severity: "critical" },
        { type: "Late Return", employee: "Chinoy", time: "02:15 PM", severity: "low" },
      ]},
    },
    employees: [
      { name: "Abhay", firstEntry: "08:30 AM", status: "Present", workTime: "5h 45m", productivity: 89, violations: 0 },
      { name: "Aditi", firstEntry: "08:55 AM", status: "Present", workTime: "4h 30m", productivity: 58, violations: 1 },
      { name: "Aisvarrya", firstEntry: "08:45 AM", status: "Present", workTime: "5h 15m", productivity: 92, violations: 0 },
      { name: "Ayusha", firstEntry: "09:10 AM", status: "Present", workTime: "4h 00m", productivity: 71, violations: 0 },
      { name: "Meghana", firstEntry: "07:00 AM", status: "Present", workTime: "6h 30m", productivity: 82, violations: 0 },
      { name: "Ritvik", firstEntry: "09:20 AM", status: "Present", workTime: "3h 45m", productivity: 48, violations: 2 },
      { name: "Chinoy", firstEntry: "08:25 AM", status: "Present", workTime: "5h 00m", productivity: 78, violations: 1 },
      { name: "Madhura", firstEntry: "—", status: "Absent", workTime: "—", productivity: 0, violations: 0 },
    ],
  },
  {
    date: "2026-03-31",
    label: "Mar 31, 2026",
    summary: {
      present: 6,
      absent: 2,
      lateArrivals: 1,
      avgProductivity: 81,
      activeCameras: 9,
      footfall: 38,
      violations: 2,
    },
    insightQuestions: {
      who: { summary: "6 employees", present: ["Abhay", "Aisvarrya", "Meghana", "Ritvik", "Chinoy", "Madhura"] },
      where: { summary: "5 zones active", zones: ["Floor 3 - Zone A", "Floor 1 - Finance", "Main Gate", "Floor 3 - Zone B", "Marketing"] },
      what: { summary: "5 working, 1 idle", working: 5, idle: 1, moving: 0, phone: 0 },
      howLong: { summary: "Avg: 5h 45m", breakdown: { "5+ hours": 4, "4-5 hours": 1, "3-4 hours": 1, "< 3 hours": 0 } },
      violations: { summary: "2 detected", list: [
        { type: "Idle Alert", employee: "Ritvik", time: "11:30 AM", severity: "low" },
        { type: "Late Arrival", employee: "Ritvik", time: "09:45 AM", severity: "medium" },
      ]},
    },
    employees: [
      { name: "Abhay", firstEntry: "08:15 AM", status: "Present", workTime: "6h 00m", productivity: 91, violations: 0 },
      { name: "Aditi", firstEntry: "—", status: "Absent", workTime: "—", productivity: 0, violations: 0 },
      { name: "Aisvarrya", firstEntry: "08:30 AM", status: "Present", workTime: "5h 50m", productivity: 94, violations: 0 },
      { name: "Ayusha", firstEntry: "—", status: "Absent", workTime: "—", productivity: 0, violations: 0 },
      { name: "Meghana", firstEntry: "07:15 AM", status: "Present", workTime: "7h 00m", productivity: 85, violations: 0 },
      { name: "Ritvik", firstEntry: "09:45 AM", status: "Present", workTime: "3h 30m", productivity: 52, violations: 2 },
      { name: "Chinoy", firstEntry: "08:40 AM", status: "Present", workTime: "5h 30m", productivity: 80, violations: 0 },
      { name: "Madhura", firstEntry: "09:00 AM", status: "Present", workTime: "5h 15m", productivity: 84, violations: 0 },
    ],
  },
]

export const cameras = [
  { id: "CAM-01", name: "Main Gate", location: "Ground Floor", status: "live", zone: "Entrance", video: "/videos/cam1.mp4" },
  { id: "CAM-02", name: "Side Gate", location: "Ground Floor", status: "live", zone: "Entrance", video: "/videos/cam2.mp4" },
  { id: "CAM-03", name: "Lobby A", location: "Ground Floor", status: "live", zone: "Common", video: "/videos/cam3.mp4" },
  { id: "CAM-04", name: "Finance Floor", location: "Floor 1", status: "live", zone: "Restricted", video: "/videos/cam4.mp4" },
  { id: "CAM-05", name: "Cafeteria", location: "Floor 1", status: "offline", zone: "Common", video: "" },
  { id: "CAM-06", name: "HR Office", location: "Floor 2", status: "live", zone: "Office", video: "/videos/cam5.mp4" },
  { id: "CAM-07", name: "Ops Room", location: "Floor 2", status: "live", zone: "Office", video: "/videos/cam6.mp4" },
  { id: "CAM-08", name: "Engineering A", location: "Floor 3", status: "live", zone: "Office", video: "/videos/cam7.mp4" },
  { id: "CAM-09", name: "Engineering B", location: "Floor 3", status: "live", zone: "Office", video: "/videos/cam8.mp4" },
]

export const tickets = [
  {
    id: "TKT-001",
    employee: "Ritvik",
    employeeId: "EMP012",
    avatar: "RV",
    department: "Engineering",
    type: "Phone Usage",
    severity: "medium",
    time: "10:45 AM",
    camera: "CAM-09 – Engineering B",
    status: "open",
    description: "Employee detected using personal phone for extended period (>5 min) during work hours.",
  },
  {
    id: "TKT-002",
    employee: "Ritvik",
    employeeId: "EMP012",
    avatar: "RV",
    department: "Engineering",
    type: "Restricted Zone",
    severity: "critical",
    time: "12:00 PM",
    camera: "CAM-13 – Server Room",
    status: "open",
    description: "Unauthorized entry into restricted server room zone detected.",
  },
  {
    id: "TKT-003",
    employee: "Aditi",
    employeeId: "EMP002",
    avatar: "AD",
    department: "HR",
    type: "Idle Alert",
    severity: "low",
    time: "11:30 AM",
    camera: "CAM-06 – HR Office",
    status: "open",
    description: "Employee idle for more than 45 minutes with no detectable activity.",
  },
  {
    id: "TKT-004",
    employee: "Abhay",
    employeeId: "EMP001",
    avatar: "AB",
    department: "Engineering",
    type: "Late Return",
    severity: "low",
    time: "01:45 PM",
    camera: "CAM-08 – Engineering A",
    status: "resolved",
    description: "Employee returned from lunch break 15 minutes late.",
  },
  {
    id: "TKT-005",
    employee: "Aisvarrya",
    employeeId: "EMP003",
    avatar: "AI",
    department: "Finance",
    type: "Tailgating",
    severity: "medium",
    time: "09:05 AM",
    camera: "CAM-02 – Side Gate",
    status: "resolved",
    description: "Two people detected passing through access control simultaneously.",
  },
]

export const unknownPersons = [
  {
    id: "UNK-001",
    snapshot: "/placeholder.svg",
    status: "Unknown",
    firstSeen: "10:23 AM",
    lastSeen: "10:47 AM",
    location: "Floor 2 – Corridor",
    activity: "Moving",
    dwellTime: "24 min",
    camera: "CAM-06",
    riskLevel: "Medium",
  },
  {
    id: "UNK-002",
    snapshot: "/placeholder.svg",
    status: "Unknown",
    firstSeen: "11:05 AM",
    lastSeen: "11:08 AM",
    location: "Main Gate",
    activity: "Idle",
    dwellTime: "3 min",
    camera: "CAM-01",
    riskLevel: "Low",
  },
  {
    id: "UNK-003",
    snapshot: "/placeholder.svg",
    status: "Unknown",
    firstSeen: "12:30 PM",
    lastSeen: "12:45 PM",
    location: "Server Room",
    activity: "Suspicious",
    dwellTime: "15 min",
    camera: "CAM-13",
    riskLevel: "High",
  },
]

export const cameraDwellAnalysis = [
  { camera: "CAM-01", name: "Main Gate", totalDwell: "12h 45m", mostActive: "Meghana", entries: 34 },
  { camera: "CAM-08", name: "Engineering A", totalDwell: "8h 20m", mostActive: "Abhay", entries: 12 },
  { camera: "CAM-06", name: "HR Office", totalDwell: "6h 15m", mostActive: "Aditi", entries: 8 },
  { camera: "CAM-09", name: "Engineering B", totalDwell: "5h 30m", mostActive: "Ritvik", entries: 9 },
  { camera: "CAM-07", name: "Ops Room", totalDwell: "4h 45m", mostActive: "Chinoy", entries: 7 },
  { camera: "CAM-04", name: "Finance Floor", totalDwell: "4h 10m", mostActive: "Aisvarrya", entries: 6 },
]

export const yesterdaySummary = {
  totalEmployees: 16,
  avgWorkHours: "6h 42m",
  violations: 4,
  attendance: 88,
}

export const aiInsightsData = {
  topPerformer: { name: "Aisvarrya", score: 91, streak: 5 },
  bestAttendance: { name: "Meghana", days: 30, percentage: 100 },
  lateBehavior: { name: "Ritvik", times: 3, trend: "increasing" },
  lowWorkHours: { name: "Ayusha", avgHours: "4h 12m", status: "warning" },
}

export const performanceLeaderboard = [
  { rank: 1, name: "Aisvarrya", department: "Finance", attendance: 100, hours: "6h 45m", score: 95, badge: "gold" },
  { rank: 2, name: "Abhay", department: "Engineering", attendance: 97, hours: "6h 30m", score: 91, badge: "silver" },
  { rank: 3, name: "Meghana", department: "Security", attendance: 100, hours: "7h 15m", score: 89, badge: "bronze" },
  { rank: 4, name: "Chinoy", department: "Operations", attendance: 94, hours: "6h 00m", score: 85, badge: null },
  { rank: 5, name: "Aditi", department: "HR", attendance: 91, hours: "5h 45m", score: 78, badge: null },
]

export const timeBehavior = {
  earlyBirds: 1,
  onTime: 12,
  lateComers: 2,
  overtime: 1,
}

const entryMinutes = (t: string) => {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/)
  if (!m) return -1
  return ((+m[1] % 12) + (m[3] === "PM" ? 12 : 0)) * 60 + +m[2]
}

const LATE_AFTER_MINUTES = 9 * 60 + 30 // late if first entry after 09:30 AM

export const dailyReport = employees.map((e, i) => {
  const mins = entryMinutes(e.firstEntry)
  return {
    employee: e.name,
    firstEntry: e.firstEntry,
    date: "Today",
    status: e.status === "Absent" ? "Absent" : mins > LATE_AFTER_MINUTES ? "Late" : "On Time",
    workTime: e.dwellTime,
    entries: e.snapshots > 0 ? e.snapshots + 5 + (i % 6) : 0,
    confidence: e.status === "Absent" ? 0 : 90 + (i % 10),
    department: e.department,
  }
})
