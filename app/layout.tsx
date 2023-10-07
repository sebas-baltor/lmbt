import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMBT',
  description: 'Torneo de basquetbol patronal 2023 en Temascalapa; Edo Méx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100vh]`}>{children}</body>
    </html>  )
}
