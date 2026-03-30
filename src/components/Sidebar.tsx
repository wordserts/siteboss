'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Calendar, Clock, BookOpen,
  Building2, Users, Settings, BarChart2, LogOut
} from 'lucide-react'

const navItems = [
  { label: 'MAIN', type: 'section' },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Schedule', href: '/schedule', icon: Calendar, badge: 3 },
  { label: 'Timesheets', href: '/timesheets', icon: Clock },
  { label: 'FIELD', type: 'section' },
  { label: 'Site Diary', href: '/diary', icon: BookOpen, badge: 2 },
  { label: 'Sites', href: '/sites', icon: Building2 },
  { label: 'Workers', href: '/workers', icon: Users },
  { label: 'ADMIN', type: 'section' },
  { label: 'Xero Export', href: '/xero', icon: BarChart2 },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const initials = userEmail
    ? userEmail.split('@')[0].slice(0, 2).toUpperCase()
    : 'SB'

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-52 flex-shrink-0 bg-neutral-900 flex flex-col h-screen sticky top-0">

      {/* Logo */}
      <div className="px-4 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-yellow-400 rounded flex items-center justify-center flex-shrink-0">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="#171717">
              <path d="M8 1L2 5v9h4v-5h4v5h4V5L8 1z"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-tight">SiteBoss</div>
            <div className="text-xs text-neutral-500 leading-tight">Nexus Civil</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {navItems.map((item, i) => {
          if (item.type === 'section') {
            return (
              <div key={i} className="px-2 pt-4 pb-1 text-xs font-medium text-neutral-600 tracking-wider">
                {item.label}
              </div>
            )
          }
          const Icon = item.icon!
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-2.5 px-2 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                isActive
                  ? 'bg-yellow-400 text-neutral-900 font-medium'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Icon size={14} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  isActive ? 'bg-neutral-900 text-yellow-400' : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-neutral-900 flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">
              {userEmail?.split('@')[0] ?? 'Admin'}
            </div>
            <div className="text-xs text-neutral-500">Super Admin</div>
          </div>
          <button
            onClick={handleSignOut}
            className="text-neutral-600 hover:text-neutral-300 transition-colors"
            title="Sign out"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  )
}
