import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Designamics & City Builders'
  const brand = searchParams.get('brand') || 'both'
  const subtitle = searchParams.get('subtitle') || 'Interior Design & Construction in Ludhiana'

  const brandColor =
    brand === 'designamics'
      ? '#e8b96e'
      : brand === 'cityBuilders'
        ? '#768a99'
        : '#c87856'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px 80px',
          backgroundColor: '#1a1a1a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: brandColor,
          }}
        />

        {/* Brand label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: brandColor,
              marginRight: '12px',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: brandColor,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            {brand === 'designamics'
              ? 'Designamics'
              : brand === 'cityBuilders'
                ? 'City Builders'
                : 'Designamics & City Builders'}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: title.length > 40 ? '48px' : '64px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '16px',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
          }}
        >
          {subtitle}
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
            designamics.com
          </span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
            Ludhiana, Punjab
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}