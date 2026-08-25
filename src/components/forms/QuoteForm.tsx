import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Check, Loader2, MessageCircle } from 'lucide-react'
import { families, metals } from '../../content/metals'
import { site } from '../../content/site'
import { useQuotePrefill } from '../../hooks/useQuotePrefill'
import { whatsappUrl } from '../../lib/whatsapp'

interface Fields {
  name: string
  phone: string
  email: string
  material: string
  weight: string
  suburb: string
  method: string
  message: string
}

const EMPTY: Fields = {
  name: '',
  phone: '',
  email: '',
  material: '',
  weight: '',
  suburb: '',
  method: 'drop-off',
  message: '',
}

const METHODS = [
  { v: 'drop-off', l: 'I will bring it in' },
  { v: 'pickup', l: 'Please pick it up' },
  { v: 'bin', l: 'I need a bin on site' },
]

type Errors = Partial<Record<keyof Fields, string>>

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please tell us your name'
  const digits = f.phone.replace(/\D/g, '')
  if (!f.phone.trim()) e.phone = 'We need a number to call you back on'
  else if (digits.length < 8) e.phone = 'That does not look like a full phone number'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Check the email address'
  if (!f.material) e.material = 'Pick the closest match'
  return e
}

/**
 * Request a quote.
 *
 * The live shinemotor.com.au site has no quote form at all — every enquiry has
 * to begin with a phone call. This collects what the yard actually needs to
 * price a load, and offers the same details as a pre-written WhatsApp message
 * for anyone who would rather not wait on a reply.
 *
 * ── THE SUBMIT HANDLER IS NOT WIRED UP ────────────────────────────────────
 * `onSubmit` validates, shows the pending state and then the success state, but
 * does not transmit anything. Replace the marked block with a POST to your
 * backend or a form service and the rest works unchanged. The WhatsApp button
 * beside it *is* live and needs no backend at all.
 */
export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  /* Any "Request a quote" button elsewhere on the site drops its grade in here
     and scrolls us into view, so nobody hunts through the dropdown. */
  useQuotePrefill((material) => {
    if (!material) return
    setFields((f) => ({ ...f, material }))
    setErrors((e) => ({ ...e, material: undefined }))
    setStatus('idle')
  })

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  /** Same details, composed as a WhatsApp message. */
  const waHref = whatsappUrl(
    [
      'Hi Shine Motor, I would like a price.',
      fields.material && `Material: ${fields.material}`,
      fields.weight && `Approx amount: ${fields.weight}`,
      fields.suburb && `Suburb: ${fields.suburb}`,
      `Preference: ${METHODS.find((m) => m.v === fields.method)?.l ?? ''}`,
      fields.name && `Name: ${fields.name}`,
      fields.message && `Notes: ${fields.message}`,
    ]
      .filter(Boolean)
      .join('\n'),
  )

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    // ─── TODO(backend): transmit `fields` from here ─────────────────────────
    // await fetch('/api/quote', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(fields),
    // })
    // Until that endpoint exists we simulate the round trip so the states are
    // reviewable. Nothing is sent anywhere.
    await new Promise((r) => setTimeout(r, 700))
    // ────────────────────────────────────────────────────────────────────────
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="glass rounded-3xl p-8 lg:p-10">
        <div className="flex flex-col items-center py-8 text-center">
          <span className="grad-flame flex size-14 items-center justify-center rounded-full">
            <Check aria-hidden className="size-7 text-white" strokeWidth={2.5} />
          </span>
          <h3 className="mt-6 font-display text-d3 text-bright">
            Thanks — we have your details.
          </h3>
          <p className="measure mt-3 text-muted">
            Someone from the yard will be in touch. If it is urgent, call{' '}
            <a className="text-amber underline" href={site.phones[0].href}>
              {site.phones[0].label}
            </a>{' '}
            — we are open from 7am.
          </p>
          <button
            type="button"
            onClick={() => {
              setFields(EMPTY)
              setStatus('idle')
            }}
            className="mt-8 text-[15px] font-semibold text-amber underline underline-offset-4"
          >
            Send another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-3xl p-6 lg:p-9">
      <form onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" required value={fields.name} onChange={set('name')} error={errors.name} autoComplete="name" />
          <Field label="Phone" required type="tel" value={fields.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="04.. ... ..." />
          <Field label="Email" type="email" value={fields.email} onChange={set('email')} error={errors.email} autoComplete="email" className="sm:col-span-2" />

          <div className="sm:col-span-2">
            <Label htmlFor="material" required>What are you selling?</Label>
            <select
              id="material"
              value={fields.material}
              onChange={(e) => set('material')(e.target.value)}
              aria-invalid={Boolean(errors.material)}
              aria-describedby={errors.material ? 'material-error' : undefined}
              className={`mt-2 w-full rounded-xl border bg-void/60 px-4 py-3 text-bright transition-colors focus:border-flame focus:outline-none ${
                errors.material ? 'border-ember' : 'border-hairline'
              }`}
            >
              <option value="">Choose the closest match…</option>
              <option value="Mixed load — not sure">Mixed load — not sure</option>
                {families.map((family) => (
                <optgroup key={family} label={family}>
                  {metals
                    .filter((m) => m.family === family)
                    .map((m) => (
                      <option key={m.slug} value={`${m.grade} (${m.family})`}>
                        {m.grade}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            {errors.material && <ErrorText id="material-error">{errors.material}</ErrorText>}
          </div>

          <Field label="Approximate amount" value={fields.weight} onChange={set('weight')} placeholder="e.g. 200kg, a ute load, 3 bins" />
          <Field label="Suburb" value={fields.suburb} onChange={set('suburb')} autoComplete="address-level2" />

          <fieldset className="sm:col-span-2">
            <legend className="text-[15px] font-semibold text-bright">
              How would you like to do it?
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {METHODS.map((o) => (
                <label
                  key={o.v}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors ${
                    fields.method === o.v
                      ? 'grad-flame border-transparent font-semibold text-white'
                      : 'border-hairline bg-void/60 text-muted hover:border-flame/40 hover:text-bright'
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={o.v}
                    checked={fields.method === o.v}
                    onChange={() => set('method')(o.v)}
                    className="sr-only"
                  />
                  {o.l}
                </label>
              ))}
            </div>
          </fieldset>

          {!compact && (
            <div className="sm:col-span-2">
              <Label htmlFor="message">Anything else?</Label>
              <textarea
                id="message"
                rows={4}
                value={fields.message}
                onChange={(e) => set('message')(e.target.value)}
                placeholder="Condition, access, when it needs to go…"
                className="mt-2 w-full resize-y rounded-xl border border-hairline bg-void/60 px-4 py-3 text-bright transition-colors placeholder:text-muted/50 focus:border-flame focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="mt-7 border-t border-hairline pt-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="grad-flame inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_34px_-10px_rgba(255,122,24,0.65)] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === 'sending' && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {status === 'sending' ? 'Sending…' : 'Send my details'}
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-[15px] font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#0d1b14]"
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
              Send on WhatsApp instead
            </a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            No obligation. We reply the same day during opening hours.
          </p>
        </div>
      </form>
    </div>
  )
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-[15px] font-semibold text-bright">
      {children}
      {required && <span className="ml-1 text-amber" aria-hidden>*</span>}
    </label>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return <p id={id} className="mt-1.5 text-[13px] text-ember">{children}</p>
}

function Field({
  label, value, onChange, error, required, type = 'text', placeholder, autoComplete, className = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  required?: boolean
  type?: string
  placeholder?: string
  autoComplete?: string
  className?: string
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-')
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-xl border bg-void/60 px-4 py-3 text-bright transition-colors placeholder:text-muted/50 focus:border-flame focus:outline-none ${
          error ? 'border-ember' : 'border-hairline'
        }`}
      />
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}
