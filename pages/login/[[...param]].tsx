import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Heading, Flex, Image, Link } from '@chakra-ui/core'

import { isAuthenticated, logout } from '../../services/auth'
import Head from 'next/head'

import LoginBox from '../../components/login/LoginBox'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    function isAuth() {
      if (isAuthenticated()) {
        return router.push('/')
      } else {
        logout()
      }
    }
    isAuth()
  })

  return (
    <>
      <Head>
        <title>Login - @aaafuria</title>
      </Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <Flex
        flexWrap="wrap"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        px={5}
      >
        <Flex
          flexDir="column"
          width={['250px', '50%', '50%', '480px']}
          alignItems="flex-start"
        >
          <Link href="/">
            <Image
              src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_light.svg"
              alt="logo_light"
              height="90px"
              cursor="pointer"
            />
          </Link>

          <Heading
            fontSize={['lg', '2xl', '3xl']}
            marginTop={15}
            textAlign={['center', 'left']}
            color="gray.500"
          >
            Faça seu login na plataforma
          </Heading>
        </Flex>
        <LoginBox />
      </Flex>
    </>
  )
}
