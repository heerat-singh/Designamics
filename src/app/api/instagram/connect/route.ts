import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const brand = searchParams.get('brand')

  if (!brand || !['designamics', 'cityBuilders'].includes(brand)) {
    return NextResponse.json(
      { error: 'Missing or invalid brand param. Use ?brand=designamics or ?brand=cityBuilders' },
      { status: 400 }
    )
  }

  const appId = process.env.INSTAGRAM_APP_ID
  if (!appId) {
    return NextResponse.json({ error: 'INSTAGRAM_APP_ID not configured' }, { status: 500 })
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/instagram/callback`

  const authUrl = new URL('https://api.instagram.com/oauth/authorize')
  authUrl.searchParams.set('client_id', appId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', 'instagram_business_basic')
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('state', brand)

  return NextResponse.redirect(authUrl.toString())
}
