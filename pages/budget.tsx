import type { NextPage } from 'next'
import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Layout from '~/components/Layout'
import Connecting from '~/components/Loading/Loading'

const Home: NextPage = () => {
  return (
    <Layout title="Budget">
       <div className="text-gray-800 dark:text-stone-50 dark:text-gray-100"><Connecting /></div>
    </Layout>
  )
}

export default Home
