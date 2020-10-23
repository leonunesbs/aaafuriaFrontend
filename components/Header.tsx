import React, { useEffect, useState, useRef } from 'react'
import {
  Image,
  Link,
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
  Box,
} from '@chakra-ui/core'

import { isAuthenticated, logout } from '../services/auth'
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
  const [isStaff, setIsStaff] = useState(false)

  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    setIsStaff(
      (localStorage.getItem('aaafuria:isAdmin') === 'true' && true) ||
      (localStorage.getItem('aaafuria:isAdmin') === 'false' && false)
    )
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
    const u = localStorage.getItem('aaafuria:User')
    setUser(JSON.parse(u))
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <Flex flexDir="column" boxShadow="0 0 14px 2px #9aca3c" zIndex={1000}>
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
            as="a"
            href="/sejasocio"
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
            as="a"
            href="/loja"
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
            leftIcon={AiOutlineShopping}
          >
            Loja
          </MenuButton>
        </Flex>

        <Flex minW="150px" w="65%" justifyContent="center">
          <Link href="/">
            <Image
              alt="logo_branco"
              src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_dark.png"
              alignSelf="center"
              px={6}
              py={4}
            />
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
                      as="a"
                      href="/carrinho"
                      leftIcon={AiOutlineShoppingCart}
                    >
                      Carrinho
                    </MenuButton>

                    <MenuButton
                      as="a"
                      href="/user/dashboard/pedidos"
                      leftIcon={BsListCheck}
                    >
                      Meus pedidos
                    </MenuButton>

                    <Divider />
                    <MenuButton
                      as="a"
                      href="/user/dashboard"
                      leftIcon={AiOutlineDashboard}
                      color="#fff"
                      backgroundColor="gray.500"
                    >
                      Painel
                    </MenuButton>

                    {isStaff && (
                      <MenuButton
                        as="a"
                        href="/admin/dashboard"
                        leftIcon={AiOutlineDashboard}
                        color="#fff"
                        backgroundColor="gray.500"
                      >
                        Painel do Diretor
                      </MenuButton>
                    )}
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
                        as="a"
                        href="/login"
                        color="#fff"
                        backgroundColor="gray.500"
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
    </Flex>
  )
}

export default Header
