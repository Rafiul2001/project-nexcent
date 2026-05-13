import type { PropsWithChildren } from 'react'
import React from 'react'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/Navbar'

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full mx-auto min-h-dvh">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout
