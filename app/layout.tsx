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
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
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
