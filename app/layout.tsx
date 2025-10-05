import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Circumference of a Circle Formula - Calculator & Complete Guide',
  description: 'Learn the three circumference formulas: C=2πr, C=πd, C=√(4πA). Interactive calculator, step-by-step examples, quiz, and free PDF guide.',
  keywords: 'circumference formula, circle calculator, 2πr, πd, circumference of circle, circle math, geometry calculator',
  authors: [{ name: 'Circle Calculator Network' }],
  creator: 'Circle Calculator Network',
  publisher: 'Circle Calculator Network',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Circumference of a Circle Formula - Calculator & Complete Guide',
    description: 'Learn the three circumference formulas with our interactive calculator, step-by-step examples, and quiz.',
    url: 'https://circumferenceofacircleformula.com',
    siteName: 'Circumference of a Circle Formula',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Circumference of a Circle Formula - Calculator & Guide',
    description: 'Learn C=2πr, C=πd, C=√(4πA) with interactive tools',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: 'https://circumferenceofacircleformula.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JJHRM1GYZ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JJHRM1GYZ6');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}