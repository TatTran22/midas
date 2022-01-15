import { Fragment, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserDropdownItem, MenuItem } from '~/types'

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const navRef = useRef(null)
  const router = useRouter()

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Home',
      href: '/',
      icon: 'home',
      isActive: router.pathname === '/',
    },
    {
      id: 2,
      title: 'Budget',
      href: '/budget',
      icon: 'money',
      isActive: router.pathname === '/budget',
    },
    {
      id: 3,
      title: 'About',
      href: '/about',
      icon: 'info',
      isActive: router.pathname === '/about',
    },
  ]

  const profileDropdownItems: UserDropdownItem[] = [
    {
      id: 1,
      title: 'Profile',
      href: '/profile',
      icon: 'user',
    },
    { id: 2, title: 'Settings', href: '/settings', icon: 'settings' },
    {
      id: 3,
      title: 'Logout',
      href: '/logout',
      icon: 'logout',
    },
  ]

  const handleProfileDropDown = () => {
    setIsProfileOpen((isProfileOpen) => {
      if (isNavOpen) {
        setIsNavOpen(false)
      }

      return !isProfileOpen
    })
  }
  const handleMobileMenu = () => {
    setIsNavOpen((currentNavState) => {
      if (isProfileOpen) {
        setIsProfileOpen(false)
      }
      return !currentNavState
    })
  }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavOpen(false)
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isNavOpen, isProfileOpen])

  return (
    <nav
      className="bg-white dark:border-gray-500 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-800 border-b "
      ref={navRef}
    >
      <div className="container relative flex flex-wrap items-center justify-between mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <Image src="/images/money_flat_icon.svg" alt="logo" width={80} height={80} className="mr-2" />
            <span className="text-2xl font-bold text-green-700 dark:text-gray-200">Hand of Midas</span>
          </a>
        </Link>

        <div className="relative flex items-center justify-center w-40 md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={handleProfileDropDown}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/images/user_anonymous_female_avatar.png" alt="user photo" />
          </button>

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
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                name@afsdfasdfasdfs
              </span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              {profileDropdownItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      {item.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={handleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            {!isNavOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <div
          className={clsx(
            'items-center justify-between w-full md:flex md:w-auto md:order-1 absolute top-full right-0 z-50 md:static md:inset-x-0 md:flex-1 md:justify-end md:items-center',
            isNavOpen ? 'block' : 'hidden'
          )}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 bg-white md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>
                  <a
                    className={clsx(
                      'block relative px-4 py-2 text-sm dark:bg-gray-900 md:dark:bg-transparent md:dark:hover:bg-transparent md:hover:bg-transparent hover:bg-gray-200  dark:hover:bg-gray-600  ',
                      // item.isActive ? 'underline decoration-sky-500 decoration-2' : '',
                      'border-gray-200 border-b md:border-transparent decoration-0',
                      'menu-item',
                      item.isActive ? 'active' : ''
                    )}
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
