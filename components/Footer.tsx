import { Fragment, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

// create a footer component
export default function Footer() {
  return (
    <footer className="bg-white dark:border-gray-500 border-gray-200  px-2 sm:px-4 py-2.5  dark:bg-gray-800 mt-auto border-t ">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <Image src="/images/money_flat_icon.svg" alt="logo" width={80} height={80} className="mr-2" />
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">Hand of Midas</span>
          </a>
        </Link>
      </div>
    </footer>
  )
}
