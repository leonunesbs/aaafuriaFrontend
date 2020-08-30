import { useRouter } from 'next/router'

import { Heading, Link, Flex, Button, Text, Box } from '@chakra-ui/core'
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
      <Flex
        backgroundImage="linear-gradient(to bottom, rgba(0,173,52,0.2), rgba(2,42,6,0.95)),
        url('home_background.jpg')"
        backgroundPosition="25% 50%"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        flexWrap="wrap"
        h="480px"
      >
        <Flex flexDir="column" flexGrow={1}></Flex>
        <Flex flexDir="column" flexGrow={1} align="flex-end" justify="center">
          <Flex
            backgroundColor="rgba(0,0,0, 0.4)"
            borderRadius="md"
            maxW={['100%', '60%']}
            ml={4}
            px={10}
            py={16}
            flexDir="column"
          >
            <Text fontSize="2xl" fontWeight="bold" color="#fff">
              Venha fazer parte da maior do Nordeste!
            </Text>
            <Button
              borderRadius="sm"
              size="lg"
              mt={4}
              backgroundColor="green.300"
              color="#fff"
              _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
            >
              Seja Sócio
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}
