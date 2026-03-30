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
    <div className="min-h-screen flex">

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-900 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#171717">
              <path d="M8 1L2 5v9h4v-5h4v5h4V5L8 1z"/>
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">SiteBoss</span>
        </div>

        <div>
          <div className="w-12 h-1 bg-yellow-400 mb-6" />
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Field management<br />built for civil.
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed max-w-sm">
            Scheduling, site diaries, and subcontractor management — all in one place for Nexus Civil.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://images.squarespace-cdn.com/content/v1/65c4380ff30a2644dc9007f6/24c395e9-b919-4027-a440-3feb342527a9/Logo.png?format=300w"
            alt="Nexus Civil"
            className="h-8 brightness-0 invert opacity-60"
          />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 bg-neutral-50 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#171717">
                <path d="M8 1L2 5v9h4v-5h4v5h4V5L8 1z"/>
              </svg>
            </div>
            <div>
              <div className="text-base font-semibold text-neutral-900">SiteBoss</div>
              <div className="text-xs text-neutral-400">Nexus Civil</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back</h2>
          <p className="text-sm text-neutral-500 mb-8">Sign in to your SiteBoss account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@nexuscivil.com.au"
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-200 text-neutral-900 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-neutral-200">
            <button
              disabled
              className="w-full flex items-center justify-center gap-2.5 border border-neutral-200 rounded-lg py-2.5 px-4 text-sm text-neutral-400 bg-white cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 21 21" fill="none">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
              <span className="text-xs text-neutral-300">(coming soon)</span>
            </button>
          </div>

          <p className="text-center text-xs text-neutral-400 mt-8">
            SiteBoss · Nexus Civil · Victoria, Australia
          </p>
        </div>
      </div>
    </div>
  )
}
