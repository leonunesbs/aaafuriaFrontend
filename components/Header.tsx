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
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'

function MenuButton({ children, ...rest }) {
  return (
    <Button
      w="100%"
      backgroundColor="green.600"
      borderRadius="sm"
      p={2}
      mb={1}
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

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <Flex
      backgroundColor="green.600"
      alignItems="center"
      justifyContent="space-around"
      p={2}
      h={24}
      w="100%"
    >
      <Flex flexDir="column" w="20%" maxW="130px">
        <MenuButton
          backgroundColor="green.300"
          color="#fff"
          p={1}
          fontSize={['xs', 'sm', 'md']}
          fontWeight={['thin', 'normal', 'bold']}
        >
          Seja Sócio
        </MenuButton>
        <MenuButton
          backgroundColor="gray.600"
          color="#fff"
          p={1}
          fontSize={['xs', 'sm', 'md']}
          fontWeight={['thin', 'normal', 'bold']}
          onClick={() => router.push('/loja')}
        >
          <Box as={AiOutlineShopping} />
          Loja
        </MenuButton>
      </Flex>

      <Flex minW="150px" w="80%" justifyContent="center">
        <Link href="/">
          <a>
            <Image
              alt="logo_branco"
              src="logo_dark.png"
              alignSelf="center"
              p={6}
            />
          </a>
        </Link>
      </Flex>

      <Flex maxW="20%">
        <Button
          ref={btnRef}
          as={Button}
          p={0}
          backgroundColor="green.600"
          borderColor="green.300"
          onClick={onOpen}
          borderRadius="sm"
          _hover={{ backgroundColor: 'green.900' }}
          _active={{ backgroundColor: 'green.900' }}
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
            <DrawerHeader>Olá!</DrawerHeader>

            <DrawerBody>
              <MenuButton onClick={() => router.push('/carrinho')}>
                <Box as={AiOutlineShoppingCart} mr={2} />
                Carrinho
              </MenuButton>
              <MenuButton onClick={() => router.push('/pedidos')}>
                Meus pedidos
              </MenuButton>
              <Divider />
              {isAuth ? (
                <>
                  <MenuButton color="#fff" backgroundColor="gray.600">
                    Perfil
                  </MenuButton>
                  <MenuButton
                    color="#fff"
                    backgroundColor="gray.600"
                    onClick={handleLogout}
                  >
                    Sair
                  </MenuButton>
                </>
              ) : (
                <>
                  <MenuButton
                    color="#fff"
                    backgroundColor="gray.600"
                    onClick={() => router.push('/login')}
                  >
                    Entrar
                  </MenuButton>
                </>
              )}
            </DrawerBody>

            <DrawerFooter>Footer</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  )
}

export default Header
