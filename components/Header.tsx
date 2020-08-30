import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import {
  Image,
  Text,
  Box,
  Flex,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Divider,
} from '@chakra-ui/core'

import { isAuthenticated, logout } from '../config/auth'
import { useRouter } from 'next/router'

import { GiHamburgerMenu } from 'react-icons/gi'
import { BsListCheck } from 'react-icons/bs'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import {
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineDashboard,
} from 'react-icons/ai'

function MenuButton({ children, ...rest }) {
  return (
    <Button
      w="100%"
      backgroundColor="green.600"
      borderRadius="sm"
      p={2}
      my={1}
      color="#FFF"
      fontWeight="bold"
      _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
      {...rest}
    >
      {children}
    </Button>
  )
}

const Header: React.FC = () => {
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const [user, setUser]: any = useState({})

  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    async function auth() {
      if (isAuthenticated()) {
        return setIsAuth(true)
      } else {
        return setIsAuth(false)
      }
    }
    auth()
  }, [])

  useEffect(() => {
    const u = localStorage.getItem('User')
    setUser(JSON.parse(u))
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <>
      <Flex
        backgroundColor="gray.500"
        alignItems="center"
        justifyContent="space-around"
        p={2}
        h={24}
        w="100%"
      >
        <Flex flexDir="column" w="20%" maxW="130px">
          <MenuButton
            backgroundColor="gray.600"
            color="#fff"
            p={1}
            h={['30px', '35px']}
            fontSize={['xs', 'sm', 'md']}
            borderWidth="1px"
            borderColor="green.300"
            _hover={{ backgroundColor: 'green.300' }}
            _active={{ backgroundColor: 'gray.700' }}
            fontWeight={['thin', 'normal', 'bold']}
          >
            Seja Sócio
          </MenuButton>
          <MenuButton
            backgroundColor="gray.600"
            color="#fff"
            p={1}
            h={['30px', '35px']}
            borderWidth="1px"
            borderColor="green.300"
            fontSize={['xs', 'sm', 'md']}
            fontWeight={['thin', 'normal', 'bold']}
            _hover={{ backgroundColor: 'green.300' }}
            _active={{ backgroundColor: 'gray.700' }}
            onClick={() => router.push('/loja')}
            leftIcon={AiOutlineShopping}
          >
            Loja
          </MenuButton>
        </Flex>

        <Flex minW="150px" w="80%" justifyContent="center">
          <Link href="/">
            <a>
              <Image
                alt="logo_branco"
                src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_dark.png"
                alignSelf="center"
                px={6}
                py={4}
              />
            </a>
          </Link>
        </Flex>

        <Flex maxW="20%">
          <Button
            ref={btnRef}
            as={Button}
            p={0}
            backgroundColor="gray.600"
            borderWidth="1px"
            borderColor="green.300"
            onClick={onOpen}
            borderRadius="sm"
            _hover={{ backgroundColor: 'green.300' }}
            _active={{ backgroundColor: 'green.600' }}
          >
            <Box as={GiHamburgerMenu} size={6} m={0} p={0} color="#fff" />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              {user ? (
                <DrawerHeader>Olá, {user.username}!</DrawerHeader>
              ) : (
                <DrawerHeader>Olá!</DrawerHeader>
              )}

              <DrawerBody>
                {isAuth ? (
                  <>
                    <MenuButton
                      leftIcon={AiOutlineShoppingCart}
                      onClick={() => router.push('/carrinho')}
                    >
                      Carrinho
                    </MenuButton>
                    <MenuButton
                      leftIcon={BsListCheck}
                      onClick={() => router.push('/pedidos')}
                    >
                      Meus pedidos
                    </MenuButton>

                    <Divider />
                    <MenuButton
                      leftIcon={AiOutlineDashboard}
                      color="#fff"
                      backgroundColor="gray.500"
                      onClick={() => router.push('/user/dashboard')}
                    >
                      Painel
                    </MenuButton>
                    <MenuButton
                      color="#fff"
                      backgroundColor="gray.500"
                      onClick={handleLogout}
                      leftIcon={FiLogOut}
                    >
                      Sair
                    </MenuButton>
                  </>
                ) : (
                  <>
                    <MenuButton
                      color="#fff"
                      backgroundColor="gray.500"
                      onClick={() => router.push('/login')}
                      leftIcon={FiLogIn}
                    >
                      Entrar
                    </MenuButton>
                  </>
                )}
              </DrawerBody>

              <DrawerFooter>@aaafuria</DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
      <Box w="100%" h="2px" backgroundColor="green.300" />
      <Box w="100%" h="8px" backgroundColor="gray.500" />
    </>
  )
}

export default Header
