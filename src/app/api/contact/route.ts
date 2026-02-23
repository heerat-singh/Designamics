import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, service, brand, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const brandLabel =
      brand === 'designamics'
        ? 'Interior Design (Designamics)'
        : brand === 'cityBuilders'
          ? 'Construction (City Builders)'
          : brand === 'both'
            ? 'Both Services'
            : 'Not specified'

    await resend.emails.send({
      from: 'Designamics Website <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'hello@designamics.com',
      replyTo: email,
      subject: `New Inquiry from ${name} — ${brandLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #e5e2dd;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6b6b6b;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Brand Interest</td><td style="padding: 8px 0;">${brandLabel}</td></tr>
            ${service ? `<tr><td style="padding: 8px 0; color: #6b6b6b;">Service</td><td style="padding: 8px 0;">${service}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 8px 0; color: #6b6b6b;">Budget</td><td style="padding: 8px 0;">${budget}</td></tr>` : ''}
          </table>
          <hr style="border: 1px solid #e5e2dd;" />
          <h3 style="color: #1a1a1a;">Message</h3>
          <p style="color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br />')}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}