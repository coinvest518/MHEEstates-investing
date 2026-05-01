import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { RevealObserver } from '@/components/reveal-observer'
import './globals.css'

export const metadata: Metadata = {
  title: 'CommunityAcre — Buy Land Together. Build Real Assets.',
  description:
    'A community-driven land acquisition and development platform by MHE Gardens. Pool from $20 to help acquire undervalued land and turn it into food gardens and community assets.',
  openGraph: {
    title: 'CommunityAcre — Buy Land Together. Build Real Assets.',
    description:
      'Pool with neighbors to acquire undervalued land at auction and turn it into food gardens and community assets. A project of MHE Gardens.',
    type: 'website',
    siteName: 'CommunityAcre',
  },
  icons: {
    icon: '/logo-source/favicon-32x32.png',
    apple: '/logo-source/apple-icon-180x180.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Toaster />
        <Analytics />
        <RevealObserver />
      </body>
    </html>
  )
}
