import type { NextPage } from 'next'
import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Layout from '~/components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="container text-gray-800 dark:text-stone-50 dark:text-gray-100">About</div>
    </Layout>
  )
}

export default Home
