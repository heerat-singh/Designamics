import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature as checkSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// Same behaviour as next-sanity's parseBody: verify the signature, then wait
// briefly so the Content Lake has the update before we revalidate.
async function parseBody<T>(req: NextRequest, secret?: string) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  if (!signature) {
    console.error('Missing signature header')
    return { body: null, isValidSignature: null }
  }

  const raw = await req.text()
  const isValidSignature = secret ? await checkSignature(raw, signature, secret.trim()) : null

  if (isValidSignature !== false) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  return {
    body: raw.trim() ? (JSON.parse(raw) as T) : null,
    isValidSignature,
  }
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // Revalidate based on document type
    revalidateTag(body._type, 'default')

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new NextResponse('Error revalidating', { status: 500 })
  }
}