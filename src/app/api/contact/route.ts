import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Visitors' input goes into an HTML email, so escape it.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const service = String(body.service ?? '').trim()
    const message = String(body.message ?? '').trim()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Contact form error: RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Designamics Website <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'hello@designamics.com',
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #e5e2dd;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Name</td><td style="padding: 8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6b6b6b;">Phone</td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>` : ''}
            ${service ? `<tr><td style="padding: 8px 0; color: #6b6b6b;">Service</td><td style="padding: 8px 0;">${escapeHtml(service)}</td></tr>` : ''}
          </table>
          <hr style="border: 1px solid #e5e2dd;" />
          <h3 style="color: #1a1a1a;">Message</h3>
          <p style="color: #333; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        </div>
      `,
    })

    // Resend reports failures (bad key, unverified sender, etc.) in the result instead of throwing.
    if (error) {
      console.error('Contact form error: Resend rejected the email:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
