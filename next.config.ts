import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Services are listed in the home page's "What We Do" section; detail pages stay at /services/[slug].
  async redirects() {
    return [{ source: '/services', destination: '/#services', permanent: false }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig