import { useState } from 'react'
import { Loader2, Save, LogOut, CheckCircle2, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { families } from '../content/metals'
import priceData from '../content/prices.json'

export function Admin() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  // Local state for prices while editing
  const [prices, setPrices] = useState(priceData.rows)

  const handlePriceChange = (slug: string, field: 'low' | 'high', value: string) => {
    const numValue = value === '' ? null : Number(value)
    setPrices(prev => prev.map(p => 
      p.slug === slug ? { ...p, [field]: numValue } : p
    ))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      })
      
      if (!res.ok) {
        throw new Error('Invalid password')
      }
      
      setAuthenticated(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)
    
    try {
      const response = await fetch('/api/update-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ rows: prices })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save')
      }
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6">
        <Link 
          to="/" 
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-hairline bg-surface/50 px-4 py-2 text-[14px] font-medium text-muted hover:text-bright"
        >
          <ChevronLeft className="size-4" />
          Back to site
        </Link>
        <div className="w-full max-w-[400px]">
          <div className="mb-8 text-center">
            {/* Logo placeholder */}
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-amber/10">
              <span className="font-display text-3xl font-bold text-amber">S</span>
            </div>
            <h1 className="font-display text-2xl text-bright">Shine Admin</h1>
            <p className="mt-2 text-[14px] text-muted">Secure pricing dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-hairline bg-surface/50 px-5 py-4 text-[16px] text-bright outline-none focus:border-amber focus:bg-surface focus:ring-1 focus:ring-amber"
              placeholder="Enter password..."
            />
            {error && <p className="text-center text-[14px] text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="grad-flame flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-5 animate-spin" /> : 'Sign in'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-[12px] text-muted">
            End-to-end encrypted • Edge network sync
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void pb-32">
      {/* Admin Header */}
      <div className="sticky top-0 z-10 border-b border-hairline bg-void/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-lg text-bright">Materials & pricing</h1>
            <p className="text-[13px] text-muted">Live sync to website</p>
          </div>
          <button 
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] font-medium text-muted hover:text-bright"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {families.map((family) => {
            const familyPrices = prices.filter(p => p.family === family)
            if (familyPrices.length === 0) return null

            return (
              <div key={family} className="rounded-3xl border border-hairline bg-surface/30">
                <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                  <h3 className="font-semibold uppercase tracking-wider text-muted text-[13px]">{family}</h3>
                  <span className="text-[13px] text-muted">{familyPrices.length} items</span>
                </div>
                
                <div className="divide-y divide-hairline">
                  {familyPrices.map((price) => (
                    <div key={price.slug} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-bright">{price.grade}</p>
                        <p className="text-[12px] uppercase tracking-wider text-muted">per {price.unit}</p>
                      </div>
                      
                      {/* Mobile-optimized inputs: side-by-side on all screens */}
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1 sm:w-28">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={price.low === null ? '' : price.low}
                            onChange={(e) => handlePriceChange(price.slug, 'low', e.target.value)}
                            className="w-full rounded-xl border border-hairline bg-surface/80 py-2.5 pl-7 pr-3 text-right text-[16px] text-bright outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                            placeholder="Call"
                          />
                        </div>
                        <span className="text-muted">–</span>
                        <div className="relative flex-1 sm:w-28">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={price.high === null ? '' : price.high}
                            onChange={(e) => handlePriceChange(price.slug, 'high', e.target.value)}
                            className="w-full rounded-xl border border-hairline bg-surface/80 py-2.5 pl-7 pr-3 text-right text-[16px] text-bright outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                            placeholder="Call"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-hairline bg-void/80 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="hidden sm:block">
            {success ? (
              <span className="flex items-center gap-2 text-[14px] text-emerald-400">
                <CheckCircle2 className="size-4" /> Live on website
              </span>
            ) : (
              <span className="text-[13px] text-muted">Unsaved changes will be lost</span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="grad-flame flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,122,24,0.5)] transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-8"
          >
            {saving ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
            {saving ? 'Syncing...' : 'Publish to website'}
          </button>
        </div>
      </div>
    </div>
  )
}
