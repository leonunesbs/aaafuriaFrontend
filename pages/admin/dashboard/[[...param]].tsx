import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  Tooltip,
  PseudoBox,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/core'
import { AiOutlineHome } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { logout, isAuthenticated } from '../../../config/auth'
import { BsListCheck } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useFetch } from '../../../hooks/useFetch'
import Head from 'next/head'
import AdminGate from '../_adminGate'

function MenuButton({ children, ...rest }) {
  return (
    <Button
      borderRadius="sm"
      backgroundColor="gray.600"
      color="green.300"
      m={1}
      _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
      _active={{ backgroundColor: 'green.300', color: 'gray.600' }}
      {...rest}
    >
      <Flex
        left={0}
        top={0}
        bottom={0}
        position="absolute"
        align="center"
        justify="center"
        pl={4}
      >
        {children}
      </Flex>
    </Button>
  )
}

const Dashboard: React.FC = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  })

  const pedidos: any = useFetch('pedidos-admin/')

  if (!pedidos.data) {
    ;<p>Carregando...</p>
  }
  console.log(pedidos.data)

  return (
    <AdminGate>
      <Head>
        <title>Dashboard - @aaafuria</title>
      </Head>
      <Flex backgroundColor="gray.500">
        <Image
          alt="logo_branco"
          src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_dark.png"
          alignSelf="center"
          px={6}
          py={4}
          maxW="45%"
        />
        <Heading as="h1" alignSelf="center" color="green.300" size="sm">
          Painel Administrativo
        </Heading>
        <Flex flexGrow={1} justifyContent="flex-end" alignItems="flex-end">
          <Stack isInline mr={4} mb={4}>
            <Tooltip
              label="Início"
              aria-label="Início"
              hasArrow
              placement="bottom"
            >
              <Button
                p={0}
                borderRadius="sm"
                backgroundColor="gray.500"
                size="sm"
                _hover={{ backgroundColor: 'gray.600' }}
                onClick={() => router.push('/')}
              >
                <Box as={AiOutlineHome} m={0} size={5} color="green.300" />
              </Button>
            </Tooltip>
            <Tooltip label="Sair" aria-label="Sair" hasArrow placement="bottom">
              <Button
                p={0}
                borderRadius="sm"
                backgroundColor="gray.500"
                size="sm"
                _hover={{ backgroundColor: 'gray.600' }}
                ml={2}
                onClick={handleLogout}
              >
                <Box as={FiLogOut} m={0} size={5} color="green.300" />
              </Button>
            </Tooltip>
          </Stack>
        </Flex>
      </Flex>
      <Box w="100%" h="2px" backgroundColor="green.300" />
      <Flex backgroundColor="gray.500" d={['flex', 'none']} p={2}>
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
          placement="left"
          onClose={onClose}
          size="xs"
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Dashboard</DrawerHeader>
            <DrawerBody>
              <Flex flexDir="column">
                <MenuButton
                  isActive={router.query.param == 'pedidos' && true}
                  onClick={() => {
                    router.push('[[...param]]', 'pedidos')
                    onClose()
                  }}
                >
                  <Box as={BsListCheck} mr={2} size={5} />
                  Pedidos
                </MenuButton>
                <MenuButton
                  isDisabled
                  isActive={router.query.param == 'perfil' && true}
                  onClick={() => {
                    router.push('[[...param]]', 'perfil')
                    onClose()
                  }}
                >
                  <Box as={BsListCheck} mr={2} size={5} />
                  Perfil
                </MenuButton>
              </Flex>
            </DrawerBody>

            <DrawerFooter>@aaafuria</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Flex w="100%" minH="240px" borderTopColor="green.300" borderTopWidth={4}>
        <Flex
          flexDir="column"
          w="20%"
          d={['none', 'flex']}
          minW="180px"
          borderRightWidth={2}
          borderColor="green.300"
          backgroundColor="gray.500"
        >
          <Text textAlign="center" mb={16}>
            A.A.A. Fúria
          </Text>
          <MenuButton
            isActive={router.query.param == 'pedidos' && true}
            onClick={() => router.push('[[...param]]', 'pedidos')}
          >
            <Box as={BsListCheck} mr={2} size={5} />
            Pedidos
          </MenuButton>
          <MenuButton isDisabled>
            {
              //<Box as={BsListCheck} mr={2} size={5} />
            }
            Em breve
          </MenuButton>
        </Flex>
        <Flex flexDir="column" flexGrow={1} minW="60%" p={4}>
          {router.query.param == 'pedidos' && (
            <>
              <Heading
                as="h1"
                textAlign="center"
                mt={4}
                mb={6}
                size={'xl'}
                color="green.600"
              >
                Pedidos
              </Heading>
              <Flex
                w="95%"
                mx="25%"
                minH="240px"
                alignSelf="center"
                borderColor="#ededed"
                borderWidth={1}
                flexDir="column"
                borderRadius="md"
                mt={6}
                p={4}
                overflow="scroll"
              >
                <Stack spacing={4}>
                  {pedidos.data?.map((item) => (
                    <Flex
                      key={item.pk}
                      flexGrow={1}
                      borderBottom="1px"
                      borderColor="#ededed"
                      borderRadius="sm"
                    >
                      <Flex align="center" p={2}>
                        {item.pk}
                      </Flex>
                      <Flex align="center" p={2} minW="100px" overflow="hidden">
                        {item.user.sócio.nome_completo}
                      </Flex>
                      <Flex flexGrow={1} p={2} minW="90px" flexDir="column">
                        {item.items.map((i) => (
                          <Text key={i.pk}>
                            {i.quantity}x {i.item}
                          </Text>
                        ))}
                      </Flex>
                      <Flex alignItems="center" p={2}>
                        R${item.order_total}
                      </Flex>
                      <Flex alignItems="center" p={2}>
                        {new Date(item.ordered_date).toLocaleDateString()}
                      </Flex>

                      <Flex alignItems="center" p={2}>
                        {item.payment.gateway}
                      </Flex>
                      <Flex alignItems="center" p={2}>
                        {item.status}
                      </Flex>
                    </Flex>
                  ))}
                </Stack>
              </Flex>
            </>
          )}
          {router.query.param == 'perfil' && <p>Perfil</p>}
        </Flex>
      </Flex>
    </AdminGate>
  )
}

export default Dashboard
