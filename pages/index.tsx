import { useRouter } from 'next/router'

import { Heading, Link, Flex, Button, Text, Box } from '@chakra-ui/core'
import { logout } from '../config/auth'
import Header from '../components/Header'
import Head from 'next/head'
import Footer from '../components/Footer'

function CTAButton({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>
}
export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Início - @aaafuria</title>
        <meta
          name="description"
          content="Página inicial da plataforma de Sócios e Loja @aaafuria"
        />
      </Head>
      <Header />
      <Flex
        backgroundImage="linear-gradient(to bottom, rgba(0,173,52,0.2), rgba(2,42,6,0.95)),
        url('https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/home_background.jpg')"
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
            maxW={['100%', '50%']}
            ml={4}
            mr={[0, 10]}
            px={10}
            py={16}
            flexDir="column"
          >
            <Text
              as="h1"
              color="#fff"
              fontSize={['2xl']}
              fontWeight="bold"
              lineHeight="45px"
            >
              Venha fazer parte da nossa História!
            </Text>
            <CTAButton
              as="a"
              href="/sejasocio"
              borderRadius="sm"
              size="lg"
              mt={6}
              backgroundColor="green.300"
              color="#fff"
              _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
            >
              Seja Sócio
            </CTAButton>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}
