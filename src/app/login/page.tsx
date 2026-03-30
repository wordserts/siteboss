'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="white">
              <path d="M1 13L4 3h8l3 10H1z"/>
              <path d="M5 3V1h6v2" fill="none" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold text-stone-900 tracking-tight">SiteBoss</div>
            <div className="text-xs text-stone-500">Nexus Civil</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-8">
          <h1 className="text-lg font-medium text-stone-900 mb-1">Sign in</h1>
          <p className="text-sm text-stone-500 mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@nexuscivil.com.au"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-stone-100">
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 border border-stone-200 rounded-lg py-2.5 px-4 text-sm text-stone-400 cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 21 21" fill="none">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
              <span className="text-xs text-stone-300 ml-1">(coming soon)</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          SiteBoss · Nexus Civil field management
        </p>
      </div>
    </div>
  )
}
