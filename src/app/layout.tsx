import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '../lib/i18n/LocaleContext'
import { getServerLocale } from '../lib/i18n/getServerLocale'
import { SiteHeader } from '../components/SiteHeader'
import { Analytics } from '@vercel/analytics/next'
import SiteFooter from '@/components/SiteFooter'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Gotta Catch',
  description: 'A living field guide to the Pokemon world.',
  verification: {
    google: 'A3RGBl6T09P8eG-FUkzulD5qvNeqQDu8mOnfRe3PLK4'
  }
}

export default async function RootLayout ({
  children
}: {
  children: ReactNode
}) {
  const locale = await getServerLocale()

  return (
    <html
      lang='it'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <LocaleProvider initialLocale={locale}>
          <Analytics />
          <SiteHeader />
          {children}
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  )
}
