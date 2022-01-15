import { useEffect, useContext, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserDropdownItem } from '~/types'
import { ThemeContext } from '../ThemeContext'
import { Switch } from '@headlessui/react'

type UserProfileProps = {
  isProfileOpen: boolean
}

export default function UserProfile({ isProfileOpen }: UserProfileProps) {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  const ref = useRef(null)
  const profileDropdownItems: UserDropdownItem[] = [
    {
      id: 1,
      title: 'Profile',
      href: '/profile',
      icon: 'user',
    },
    { id: 2, title: 'Theme', href: '/settings', icon: 'settings' },
    {
      id: 3,
      title: 'Logout',
      href: '/logout',
      icon: 'logout',
    },
  ]

  useEffect(() => {
    import('@lottiefiles/lottie-player')
  })

  return (
    <div
      className={clsx(
        'absolute w-full top-4 z-50 my-4 text-base list-none',
        'transition-all duration-300 ease-in-out -z-10 transform origin-top-right',
        'bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600',
        isProfileOpen
          ? 'block opacity-100 pointer-events-auto translate-y-0 z-10'
          : 'hidden opacity-0 pointer-events-none -translate-y-full'
      )}
      id="dropdown"
      data-popper-placement="bottom-start"
    >
      <div className="px-4 py-3 ">
        <span className="block text-sm text-gray-900 dark:text-white">Bonnie gray</span>
        <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@afsdfasdfasdfs</span>
      </div>
      <ul className="py-1" aria-labelledby="dropdown">
        {profileDropdownItems.map((item) => {
          if (item.id === 2)
            return (
              <li key={item.id} className='grid border-b place-items-center'>
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className={`${
                    darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex items-center h-6 rounded-full w-11 mx-auto`}
                >
                  <span className="sr-only">{darkMode ? 'Light' : 'Dark'}</span>
                  <span
                    className={`${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                  />
                </Switch>
              </li>
            )
          else
            return (
              <li key={item.id} className='border-b'>
                <Link href={item.href}>
                  <a className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    {item.title}
                  </a>
                </Link>
              </li>
            )
        })}
      </ul>
    </div>
  )
}
