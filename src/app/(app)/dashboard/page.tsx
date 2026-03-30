import { createClient } from '@/lib/supabase/server'
import { Building2, Users, AlertTriangle, BookOpen } from 'lucide-react'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const calendarDays = [
  { day: 24, otherMonth: true }, { day: 25, otherMonth: true },
  { day: 26, otherMonth: true }, { day: 27, otherMonth: true },
  { day: 28, otherMonth: true }, { day: 1, otherMonth: true }, { day: 2, otherMonth: true },
  { day: 3, hasShifts: true }, { day: 4, hasShifts: true }, { day: 5, hasShifts: true },
  { day: 6, hasShifts: true }, { day: 7, hasShifts: true }, { day: 8 }, { day: 9 },
  { day: 10, hasShifts: true }, { day: 11, hasShifts: true }, { day: 12, hasShifts: true },
  { day: 13, hasShifts: true }, { day: 14, hasShifts: true }, { day: 15 }, { day: 16 },
  { day: 17, hasShifts: true }, { day: 18, hasShifts: true }, { day: 19, hasShifts: true },
  { day: 20, hasShifts: true }, { day: 21, hasShifts: true }, { day: 22 }, { day: 23 },
  { day: 24, hasShifts: true }, { day: 25, hasShifts: true }, { day: 26, hasShifts: true },
  { day: 27, hasShifts: true }, { day: 28, hasShifts: true }, { day: 29 }, { day: 30, today: true },
]

const sites = [
  { name: 'Geelong Ring Road — Stage 3', location: 'Breakwater VIC', ref: 'NC-2024-11', workers: 7, status: 'active', diary: true },
  { name: 'Point Cook Drainage Upgrade', location: 'Point Cook VIC', ref: 'NC-2025-03', workers: 5, status: 'active', diary: false },
  { name: 'Wyndham Vale Subdivision', location: 'Wyndham Vale VIC', ref: 'NC-2025-07', workers: 4, status: 'active', diary: false },
  { name: 'Lara Industrial Access Road', location: 'Lara VIC', ref: 'NC-2025-09', workers: 0, status: 'hold', diary: null },
]

const todayShifts = [
  { time: '07:00–15:30', name: 'D. Mackintosh', role: 'Foreman', site: 'Geelong Ring Rd', status: 'confirmed' },
  { time: '07:00–15:30', name: 'Ryko Earthworks', role: 'Subcontractor', site: 'Point Cook', status: 'scheduled' },
  { time: '07:00–15:30', name: 'J. Patterson', role: 'Labourer', site: 'Wyndham Vale', status: 'confirmed' },
]

export default async function DashboardPage() {
  const supabase = await createClient()

  const [sitesRes, shiftsRes] = await Promise.all([
    supabase.from('sites').select('id, status', { count: 'exact' }),
    supabase.from('shifts').select('id', { count: 'exact' }).eq('shift_date', new Date().toISOString().split('T')[0]),
  ])

  const activeSiteCount = sitesRes.data?.filter(s => s.status === 'active').length ?? 0
  const todayShiftCount = shiftsRes.count ?? 0
  const displaySiteCount = activeSiteCount || 4
  const displayShiftCount = todayShiftCount || 18

  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div>
      <div className="bg-white border-b border-stone-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-sm font-medium text-stone-900">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-500 border border-stone-200 rounded-md px-2.5 py-1.5">{today}</span>
          <button className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors">
            + New Shift
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-4 gap-3">
          <StatCard icon={<Building2 size={14} />} label="Active sites" value={displaySiteCount} sub="1 on hold" color="default" />
          <StatCard icon={<Users size={14} />} label="Workers today" value={displayShiftCount} sub="6 subcontractors" color="default" />
          <StatCard icon={<AlertTriangle size={14} />} label="Open issues" value={3} sub="1 critical" color="amber" />
          <StatCard icon={<BookOpen size={14} />} label="Diary missing" value={2} sub="from yesterday" color="orange" />
        </div>

        <div className="grid grid-cols-[1fr_280px] gap-4">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-sm font-medium text-stone-900">Active sites</h2>
              <button className="text-xs text-orange-600 hover:text-orange-700">View all</button>
            </div>
            <div className="divide-y divide-stone-100">
              {sites.map((site, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${site.status === 'active' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-stone-900 truncate">{site.name}</div>
                    <div className="text-xs text-stone-400">{site.location} · Nexus Civil #{site.ref}</div>
                  </div>
                  {site.workers > 0 && (
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <Users size={11} />{site.workers}
                    </div>
                  )}
                  {site.diary === true && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Diary ✓</span>}
                  {site.diary === false && <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">Diary ✗</span>}
                  {site.diary === null && <span className="text-xs bg-stone-100 text-stone-400 px-2 py-0.5 rounded-full">No diary</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-sm font-medium text-stone-900">Schedule — March</h2>
              <button className="text-xs text-orange-600 hover:text-orange-700">Full view</button>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-7 gap-1 mb-1">
                {DAYS.map((d, i) => (
                  <div key={i} className="text-center text-xs text-stone-400 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((cell, i) => (
                  <div key={i} className={`h-7 flex items-center justify-center text-xs rounded cursor-pointer transition-colors
                    ${cell.today ? 'bg-orange-600 text-white font-medium' : ''}
                    ${cell.hasShifts && !cell.today ? 'bg-orange-50 text-orange-800' : ''}
                    ${cell.otherMonth ? 'text-stone-300' : ''}
                    ${!cell.today && !cell.hasShifts && !cell.otherMonth ? 'text-stone-600 hover:bg-stone-100' : ''}
                  `}>
                    {cell.day}
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="text-xs text-stone-400 pt-1 pb-0.5">Today · {displayShiftCount} workers across 3 sites</div>
                {todayShifts.map((shift, i) => (
                  <div key={i} className="flex items-center gap-2 bg-stone-50 rounded-md p-2">
                    <div className="text-xs text-stone-400 w-[72px] flex-shrink-0">{shift.time}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-stone-900 truncate">{shift.name}</div>
                      <div className="text-xs text-stone-400 truncate">{shift.role} · {shift.site}</div>
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0
                      ${shift.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                      {shift.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode
  label: string
  value: number
  sub: string
  color: 'default' | 'amber' | 'orange'
}) {
  const valueColor = color === 'amber' ? 'text-amber-600' : color === 'orange' ? 'text-orange-600' : 'text-stone-900'
  return (
    <div className="bg-stone-50 rounded-lg p-4">
      <div className="flex items-center gap-1.5 text-stone-400 mb-2">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className={`text-2xl font-medium leading-none mb-1 ${valueColor}`}>{value}</div>
      <div className="text-xs text-stone-400">{sub}</div>
    </div>
  )
}
