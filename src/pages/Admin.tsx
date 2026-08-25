import { useState } from 'react'
import { Loader2, Save, LogOut } from 'lucide-react'
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
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-[400px] px-6 py-24 sm:py-32 lg:px-8">
        <div className="glass rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-bold text-bright">Admin Login</h1>
          <p className="mt-2 text-[14px] text-muted">Enter password to update prices</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-hairline bg-surface/50 px-4 py-3 text-bright outline-none focus:border-flame focus:bg-surface focus:ring-1 focus:ring-flame"
              placeholder="Password"
            />
            {error && <p className="text-[13px] text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="grad-flame flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-bright sm:text-4xl">Materials & pricing</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Update rates as the market moves. Changes apply to the live site immediately after saving.
          </p>
        </div>
        <button 
          onClick={() => setAuthenticated(false)}
          className="flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-[14px] font-medium text-muted hover:text-bright"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-500">
          Prices saved successfully! The live site is now updating (takes ~30s).
        </div>
      )}

      <div className="space-y-8">
        {families.map((family) => {
          const familyPrices = prices.filter(p => p.family === family)
          
          if (familyPrices.length === 0) return null

          return (
            <div key={family} className="glass overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between border-b border-hairline bg-surface/50 px-6 py-4">
                <h3 className="font-semibold uppercase tracking-wider text-muted text-[13px]">{family}</h3>
                <span className="text-[13px] text-muted">{familyPrices.length}</span>
              </div>
              
              <div className="divide-y divide-hairline">
                {familyPrices.map((price) => (
                  <div key={price.slug} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
                    <div className="flex-1">
                      <p className="font-medium text-bright">{price.grade}</p>
                      <p className="text-[13px] text-muted">PER {price.unit.toUpperCase()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={price.low === null ? '' : price.low}
                          onChange={(e) => handlePriceChange(price.slug, 'low', e.target.value)}
                          className="w-24 rounded-lg border border-hairline bg-surface/50 py-2 pl-7 pr-3 text-right text-bright outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                          placeholder="Call"
                        />
                      </div>
                      <span className="text-muted">—</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={price.high === null ? '' : price.high}
                          onChange={(e) => handlePriceChange(price.slug, 'high', e.target.value)}
                          className="w-24 rounded-lg border border-hairline bg-surface/50 py-2 pl-7 pr-3 text-right text-bright outline-none focus:border-amber focus:ring-1 focus:ring-amber"
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

      <div className="sticky bottom-6 mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="grad-flame flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-[0_10px_34px_-10px_rgba(255,122,24,0.65)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
          {saving ? 'Saving...' : 'Save all prices'}
        </button>
      </div>
    </div>
  )
}
