import Head from 'next/head'
import Logo from '/public/image/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

export default function Layout(props) {
  const {
    children = <></>,
    title = 'Pokemon Site',
    description = 'Already got your Pokemon? Check their stats today! We will guide you to know your Pokemon better and grow them into their fully potential'
  } = props

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState('')
  const selectedStyle = 'font-black text-primary'

  useEffect(() => {
    setCurrentPage(router.pathname)
  }, [router.isReady])

  return (
    <div className=' w-full overflow-x-hidden'>

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navbar bg-base-100">
        <div className='w-full max-w-5xl mx-auto flex flex-row items-center gap-8 justify-start'>
          <Link href={'/'}><Image src={Logo} alt='Pokemon site logo' width={80} height={20} /></Link>
          <Link href={'/'} className={` text-sm ${currentPage === '/' ? selectedStyle : ''}`}>Home</Link>
          <Link href={'/type'} className={` text-sm ${currentPage === '/type' ? selectedStyle : ''}`}>Pokemon Type</Link>
        </div>
      </div>

      {children}
    </div>
  )
}