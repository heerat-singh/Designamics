import Link from 'next/link'
import { Container, Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="text-center max-w-lg">
        <p className="font-display text-8xl font-bold text-foreground/10 mb-4">404</p>
        <h1 className="font-display text-2xl font-semibold mb-3">Page Not Found</h1>
        <p className="text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Button href="/" variant="primary">
            Go Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </Container>
    </div>
  )
}