import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="">
      <div className="flex flex-col flex-1 min-h-screen mx-auto ">
        <Navbar />
        <main className="container flex-1  dark:bg-gray-700">{children}</main>
        <Footer />
      </div>
    </div>

    // <div className="con">
    //   <div className="flex flex-col w-screen min-h-screen ">
    //     <Navbar />
    //     <main className="relative flex-1 w-full h-full overflow-auto dark:bg-gray-900">{children}</main>
    //     <Footer />
    //   </div>
    // </div>
  )
}
