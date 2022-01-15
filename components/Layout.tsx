import { useState, useContext } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Navbar from '~/components/Navbar/Navbar'
import Footer from './Footer'
import Head from './Head'
import { ThemeContext } from './ThemeContext'

interface Props {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = '' }: Props) => {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div className={clsx('', darkMode ? 'dark bg-slate-900' : '')}>
      <Head title={title} />
      <div className="flex flex-col flex-1 min-h-screen mx-auto">
        <Navbar />
        <main className="container flex-1 mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
