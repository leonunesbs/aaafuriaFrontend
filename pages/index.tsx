import { useRouter } from 'next/router'

import { Heading, Link } from '@chakra-ui/core';
import { logout } from '../services/auth';
import Header from '../components/Header';

export default function Home() {
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }
  return (
    <>
      <Header />
      <Heading>Hello World!</Heading>
      <Link onClick={handleLogout}>Sair</Link>
    </>
  )
}
