import type { Metadata } from 'next'
import { clashDisplay, generalSans } from '@/styles/fonts'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Interior Design & Construction in Ludhiana`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'interior design Ludhiana',
    'construction company Ludhiana',
    'builders Punjab',
    'home interior design',
    'commercial construction',
    'Designamics',
    'City Builders',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${generalSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
