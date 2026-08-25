import { useState } from 'react'
import { ChevronDown, MessageCircle, MessageSquare, Phone } from 'lucide-react'
import { families, metals, metalsByFamily } from '../../content/metals'
import type { Family } from '../../content/metals'
import { site } from '../../content/site'
import { waForMaterial } from '../../lib/whatsapp'
import { useRequestQuote } from '../../hooks/useQuotePrefill'

const AMOUNTS = ['Under 100kg', '100kg – 1 tonne', '1 – 5 tonnes', 'Over 5 tonnes'] as const

/**
 * The direct-approach panel.
 *
 * Everything else on a scrap yard site is preamble to one question: what will
 * you pay me for this? So the first thing on the page is a two-field selector
 * that composes a WhatsApp message naming the exact grade and rough volume, and
 * hands it to the yard. No form to fill in, no waiting on an email.
 */
export function QuickPrice() {
  const requestQuote = useRequestQuote()
  const [name, setName] = useState('')
  const [family, setFamily] = useState<Family | ''>('')
  const [grade, setGrade] = useState('')
  const [amount, setAmount] = useState<string>('')

  const grades = family ? metalsByFamily(family) : metals

  const described = [
    name ? `From: ${name}` : '',
    grade || (family ? `${family} scrap` : 'scrap metal'), 
    amount
  ]
    .filter(Boolean)
    .join(' — ')

  return (
    <div className="glass rounded-3xl p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-amber">Get a price</p>
        <span className="flex items-center gap-2 text-[12px] text-muted">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-[#25D366]" />
          Replies from 7am
        </span>
      </div>

      <p className="mt-4 font-display text-d3 text-bright">What have you got?</p>

      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor="quick-name" className="sr-only">
            Your name
          </label>
          <input
            id="quick-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full appearance-none rounded-xl border border-hairline bg-void/60 px-4 py-3 text-[15px] text-bright placeholder:text-muted transition-colors focus:border-flame focus:outline-none"
          />
        </div>
        <Select
          label="Metal type"
          value={family}
          onChange={(v) => {
            setFamily(v as Family | '')
            setGrade('')
          }}
          options={[
            { value: '', label: 'Any metal / not sure' },
            ...families.map((f) => ({ value: f, label: f })),
          ]}
        />
        <Select
          label="Grade (optional)"
          value={grade}
          onChange={setGrade}
          options={[
            { value: '', label: family ? `All ${family.toLowerCase()} grades` : 'Choose a grade' },
            ...grades.map((m) => ({ value: `${m.grade} (${m.family})`, label: m.grade })),
          ]}
        />
        <Select
          label="Roughly how much"
          value={amount}
          onChange={setAmount}
          options={[
            { value: '', label: 'Select an amount' },
            ...AMOUNTS.map((a) => ({ value: a, label: a })),
          ]}
        />
      </div>

      <div className="mt-6 space-y-2.5">
        <a
          href={waForMaterial(described)}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-[15px] font-semibold text-[#0d1b14] shadow-[0_12px_30px_-12px_rgba(37,211,102,0.8)] transition-transform duration-200 hover:scale-[1.015]"
        >
          <MessageCircle aria-hidden className="size-[18px]" strokeWidth={2.5} />
          Send it on WhatsApp
        </a>
        <a
          href={`sms:+61478555537?body=${encodeURIComponent(described)}`}
          className="flex w-full items-center justify-center gap-2.5 rounded-full border border-hairline bg-surface py-3.5 text-[15px] font-semibold text-bright transition-colors hover:border-flame hover:bg-surface/80"
        >
          <MessageSquare aria-hidden className="size-[18px] text-amber" strokeWidth={2.25} />
          Send SMS
        </a>
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={site.phones[0].href}
            className="flex items-center justify-center gap-2 rounded-full border border-hairline bg-surface py-3 text-[14px] font-semibold text-bright transition-colors hover:border-flame"
          >
            <Phone aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
            Call
          </a>
          <button
            type="button"
            onClick={() => requestQuote(described)}
            className="flex items-center justify-center rounded-full border border-hairline bg-surface py-3 text-[14px] font-semibold text-bright transition-colors hover:border-flame"
          >
            Use the form
          </button>
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-muted">
        No obligation. We price on the grade and we&rsquo;ll beat any genuine
        quote from another yard.
      </p>
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-')
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-hairline bg-void/60 px-4 py-3 pr-11 text-[15px] text-bright transition-colors focus:border-flame focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
          strokeWidth={2}
        />
      </div>
    </div>
  )
}
