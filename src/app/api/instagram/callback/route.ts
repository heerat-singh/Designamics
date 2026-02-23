import { NextResponse } from 'next/server'
import { writeClient } from '@sanity/lib/client'

const INSTAGRAM_GRAPH_URL = 'https://graph.instagram.com'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const brand = searchParams.get('state')

  if (!code || !brand) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })
  }

  if (!['designamics', 'cityBuilders'].includes(brand)) {
    return NextResponse.json({ error: 'Invalid brand state' }, { status: 400 })
  }

  const appId = process.env.INSTAGRAM_APP_ID!
  const appSecret = process.env.INSTAGRAM_APP_SECRET!
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/instagram/callback`

  try {
    // Step 1: Exchange code for short-lived token
    const tokenRes = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code,
      }),
    })

    if (!tokenRes.ok) {
      const err = await tokenRes.text()
      return NextResponse.json({ error: 'Token exchange failed', details: err }, { status: 500 })
    }

    const shortLived = await tokenRes.json()

    // Step 2: Exchange short-lived for long-lived token
    const longLivedRes = await fetch(
      `${INSTAGRAM_GRAPH_URL}/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${shortLived.access_token}`
    )

    if (!longLivedRes.ok) {
      const err = await longLivedRes.text()
      return NextResponse.json({ error: 'Long-lived token exchange failed', details: err }, { status: 500 })
    }

    const longLived = await longLivedRes.json()
    const expiresAt = new Date(Date.now() + longLived.expires_in * 1000).toISOString()

    // Step 3: Store in Sanity instagramConfig singleton
    const tokenField = brand === 'designamics' ? 'designamicsToken' : 'cityBuildersToken'
    const expiresField = brand === 'designamics' ? 'designamicsTokenExpiresAt' : 'cityBuildersTokenExpiresAt'

    await writeClient.createIfNotExists({
      _id: 'instagramConfig',
      _type: 'instagramConfig',
      syncEnabled: true,
    })

    await writeClient.patch('instagramConfig').set({
      [tokenField]: longLived.access_token,
      [expiresField]: expiresAt,
    }).commit()

    // Redirect to success
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    return NextResponse.redirect(
      `${siteUrl}/?instagram_connected=${brand}`
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
