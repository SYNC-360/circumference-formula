import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Circumference of a Circle Formula - Calculator & Complete Guide',
  description: 'Learn the three circumference formulas: C=2πr, C=πd, C=√(4πA). Interactive calculator, step-by-step examples, quiz, and free PDF guide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}