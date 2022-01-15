import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Layout from '~/components/Layout'
import { useUser } from '~/components/UserContext'
import Connecting from '~/components/Loading/Loading'

const Home: NextPage = () => {
  const { session } = useUser()

  useEffect(() => {
    console.log('session', session)
    return () => {}
  }, [])

  return (
    <Layout title="Homepage">
      <div className="text-gray-800 dark:text-stone-50 dark:text-gray-100"><Connecting /></div>
    </Layout>
  )
}

export default Home
