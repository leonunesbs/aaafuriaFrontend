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
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { logout } from '../../../config/auth'
import { BsListCheck } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

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
  return (
    <>
      <Flex backgroundColor="gray.500">
        <Image
          alt="logo_branco"
          src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_dark.png"
          alignSelf="center"
          px={6}
          py={4}
          maxH="80px"
        />
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
                    router.push(
                      '/user/dashboard/[[...param]]',
                      '/user/dashboard/pedidos'
                    )
                    onClose()
                  }}
                >
                  <Box as={BsListCheck} mr={2} size={5} />
                  Meus pedidos
                </MenuButton>
                <MenuButton
                  isActive={router.query.param == 'perfil' && true}
                  onClick={() => {
                    router.push(
                      '/user/dashboard/[[...param]]',
                      '/user/dashboard/perfil'
                    )
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
            Leonardo Nunes
          </Text>
          <MenuButton
            isActive={router.query.param == 'pedidos' && true}
            onClick={() =>
              router.push(
                '/user/dashboard/[[...param]]',
                '/user/dashboard/pedidos'
              )
            }
          >
            <Box as={BsListCheck} mr={2} size={5} />
            Meus pedidos
          </MenuButton>
          <MenuButton isDisabled>
            {
              //<Box as={BsListCheck} mr={2} size={5} />
            }
            Em breve
          </MenuButton>
        </Flex>
        <Flex
          flexDir="column"
          flexGrow={1}
          minW="60%"
          p={4}
          backgroundColor="gray.300"
        >
          {router.query.param == 'pedidos' && (
            <>
              <Heading color="green.600">Meus pedidos</Heading>
            </>
          )}
          {router.query.param == 'perfil' && <p>Perfil</p>}
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard
