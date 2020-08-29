import { useRouter } from 'next/router'

import { Heading, Link } from '@chakra-ui/core'
import { logout } from '../config/auth'
import Header from '../components/Header'
import Head from 'next/head'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }
  return (
    <>
      <Head>
        <title>Início - @aaafuria</title>
      </Head>
      <Header />
      <Heading>Hello World!</Heading>
      <Link onClick={handleLogout}>Sair</Link>
      <Footer />
    </>
  )
}
