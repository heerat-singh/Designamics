'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  brand: string
  budget: string
  message: string
}

const initialState: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  brand: '',
  budget: '',
  message: '',
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialState)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setFormData(initialState)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 rounded-xl bg-accent/5 border border-accent/20 text-center">
        <h3 className="font-display text-xl font-semibold mb-2">Thank you!</h3>
        <p className="text-muted">We&apos;ve received your message and will get back to you within 24 hours.</p>
        <Button onClick={() => setStatus('idle')} variant="ghost" className="mt-4">
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          placeholder="+91 98765 43210"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium mb-1.5">Interested In</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          >
            <option value="">Select brand</option>
            <option value="designamics">Interior Design (Designamics)</option>
            <option value="cityBuilders">Construction (City Builders)</option>
            <option value="both">Both Services</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-1.5">Budget Range</label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          >
            <option value="">Select range</option>
            <option value="under-5L">Under 5 Lakh</option>
            <option value="5L-15L">5 - 15 Lakh</option>
            <option value="15L-50L">15 - 50 Lakh</option>
            <option value="50L-1Cr">50 Lakh - 1 Crore</option>
            <option value="above-1Cr">Above 1 Crore</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-1.5">Service Interest</label>
        <input
          id="service"
          name="service"
          type="text"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          placeholder="e.g., Living room design, Home construction"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}