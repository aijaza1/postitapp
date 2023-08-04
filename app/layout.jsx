import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './auth/Nav'
import QueryWrapper from './auth/QueryWrapper'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 ${inter.variable} bg-gray-200`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
