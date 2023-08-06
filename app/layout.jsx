import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './Nav'
import AuthContext from "./auth/AuthContext"
import QueryWrapper from './QueryWrapper'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 ${inter.variable} bg-gray-200`}>
        <QueryWrapper>
          <AuthContext>
            <Nav />
            {children}
          </AuthContext>
        </QueryWrapper>
      </body>
    </html>
  )
}
