import './globals.css'
import { Nobile } from 'next/font/google'
import Nav from './Nav'
import AuthContext from "./auth/AuthContext"
import QueryWrapper from './QueryWrapper'


const nobile = Nobile({ subsets: ['latin'], weight: ['400'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/icon.png" />
        <title>Postupy</title>
      </head>
      <body className={`mx-4 md:mx-48 xl:mx-96 ${nobile.variable} bg-[#e9e2fb]`}>
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
