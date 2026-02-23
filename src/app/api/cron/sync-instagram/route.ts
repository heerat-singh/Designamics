import { NextResponse } from 'next/server'
import { getWriteClient } from '@sanity/lib/writeClient'
import { groq } from 'next-sanity'

const INSTAGRAM_GRAPH_URL = 'https://graph.instagram.com'
const MEDIA_FIELDS = 'id,caption,media_type,media_url,timestamp,permalink'

interface InstagramMedia {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  timestamp: string
  permalink: string
}

interface AccountConfig {
  token: string
  tokenExpiresAt: string | null
  brand: 'designamics' | 'cityBuilders'
  tokenField: string
  expiresField: string
}

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Fetch instagramConfig from Sanity
    const config = await getWriteClient().fetch(groq`
      *[_type == "instagramConfig"][0] {
        syncEnabled,
        designamicsToken,
        designamicsTokenExpiresAt,
        cityBuildersToken,
        cityBuildersTokenExpiresAt
      }
    `)

    if (!config?.syncEnabled) {
      return NextResponse.json({ message: 'Sync disabled' })
    }

    const accounts: AccountConfig[] = []

    if (config.designamicsToken) {
      accounts.push({
        token: config.designamicsToken,
        tokenExpiresAt: config.designamicsTokenExpiresAt,
        brand: 'designamics',
        tokenField: 'designamicsToken',
        expiresField: 'designamicsTokenExpiresAt',
      })
    }

    if (config.cityBuildersToken) {
      accounts.push({
        token: config.cityBuildersToken,
        tokenExpiresAt: config.cityBuildersTokenExpiresAt,
        brand: 'cityBuilders',
        tokenField: 'cityBuildersToken',
        expiresField: 'cityBuildersTokenExpiresAt',
      })
    }

    if (accounts.length === 0) {
      return NextResponse.json({ message: 'No accounts configured' })
    }

    const results: Record<string, { synced: number; skipped: number; errors: string[] }> = {}

    for (const account of accounts) {
      results[account.brand] = { synced: 0, skipped: 0, errors: [] }

      try {
        // Auto-refresh token if expiring within 7 days
        await maybeRefreshToken(account)

        // Fetch recent media
        const mediaRes = await fetch(
          `${INSTAGRAM_GRAPH_URL}/me/media?fields=${MEDIA_FIELDS}&access_token=${account.token}`
        )

        if (!mediaRes.ok) {
          const err = await mediaRes.text()
          results[account.brand].errors.push(`API error: ${err}`)
          continue
        }

        const mediaData = await mediaRes.json()
        const posts: InstagramMedia[] = mediaData.data ?? []

        // Filter to IMAGE and CAROUSEL_ALBUM only
        const imagePosts = posts.filter(
          (p) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM'
        )

        for (const post of imagePosts) {
          try {
            const docId = `instagram-${post.id}`

            // Check if already exists
            const existing = await getWriteClient().fetch(
              groq`*[_id == $id][0]{ _id }`,
              { id: docId }
            )

            if (existing) {
              results[account.brand].skipped++
              continue
            }

            // Download image and upload to Sanity
            const imageRes = await fetch(post.media_url)
            if (!imageRes.ok) {
              results[account.brand].errors.push(`Failed to download image for ${post.id}`)
              continue
            }

            const imageBuffer = Buffer.from(await imageRes.arrayBuffer())
            const imageAsset = await getWriteClient().assets.upload('image', imageBuffer, {
              filename: `instagram-${post.id}.jpg`,
            })

            // Extract title from caption (first line, truncated)
            const title = extractTitle(post.caption, account.brand)

            // Create project document
            await getWriteClient().createIfNotExists({
              _id: docId,
              _type: 'project',
              title,
              brand: account.brand,
              coverImage: {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageAsset._id },
              },
              instagramId: post.id,
              instagramPermalink: post.permalink,
              syncStatus: 'needs_review',
              isFeatured: false,
              sortOrder: 0,
            })

            results[account.brand].synced++
          } catch (postErr) {
            const message = postErr instanceof Error ? postErr.message : String(postErr)
            results[account.brand].errors.push(`Post ${post.id}: ${message}`)
          }
        }
      } catch (accountErr) {
        const message = accountErr instanceof Error ? accountErr.message : String(accountErr)
        results[account.brand].errors.push(message)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function extractTitle(caption: string | undefined, brand: string): string {
  if (!caption) {
    const label = brand === 'designamics' ? 'Designamics' : 'City Builders'
    return `${label} Instagram Post`
  }

  // Take first line, strip hashtags, truncate
  const firstLine = caption.split('\n')[0].replace(/#\S+/g, '').trim()
  if (firstLine.length === 0) {
    const label = brand === 'designamics' ? 'Designamics' : 'City Builders'
    return `${label} Instagram Post`
  }

  return firstLine.length > 80 ? firstLine.slice(0, 77) + '...' : firstLine
}

async function maybeRefreshToken(account: AccountConfig) {
  if (!account.tokenExpiresAt) return

  const expiresAt = new Date(account.tokenExpiresAt)
  const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  if (expiresAt > sevenDaysFromNow) return

  try {
    const res = await fetch(
      `${INSTAGRAM_GRAPH_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${account.token}`
    )

    if (!res.ok) return

    const data = await res.json()
    const newExpiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString()

    await getWriteClient().patch('instagramConfig').set({
      [account.tokenField]: data.access_token,
      [account.expiresField]: newExpiresAt,
    }).commit()

    account.token = data.access_token
    account.tokenExpiresAt = newExpiresAt
  } catch {
    // Token refresh failed — continue with existing token
  }
}
