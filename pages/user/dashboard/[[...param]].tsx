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
  Badge,
  Divider,
} from '@chakra-ui/core'
import { AiOutlineHome } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { logout, isAuthenticated } from '../../../config/auth'
import { BsListCheck } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useFetch } from '../../../hooks/useFetch'
import Head from 'next/head'

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

function MeuPedidoCard({ data, item, user, ...rest }) {
  return (
    <Box
      key={item.pk}
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="sm"
      {...rest}
    >
      <Heading fontSize="xl">{data}</Heading>
      <Flex align="center" mt={2}>
        <Badge
          variantColor={
            (item.status == 'AGUARDANDO' && 'gray') ||
            (item.status == 'PROCESSANDO' && 'orange') ||
            (item.status == 'CONCLUIDO' && 'green') ||
            (item.status == 'CANCELADO' && 'red')
          }
        >
          {item.status}
        </Badge>
      </Flex>

      <Divider />
      <Flex>
        <Flex flexDir="column" w="70%" maxH="100px" flexWrap="wrap">
          {item.items.map((i) => (
            <Text key={i.pk}>
              {i.quantity}x {i.item} {i.size && ` - ${i.size}`}
            </Text>
          ))}
        </Flex>
        <Flex flexDir="column" w="50%" alignItems="flex-end">
          <Text fontWeight="bold">R${item.order_total}</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

const Dashboard: React.FC = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const [page, setPage] = useState(1)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  })

  const pedidos: any = useFetch(`core/api/pedidos-user/?page=${page}`)

  if (!pedidos.data) {
    ;<p>Carregando...</p>
  }

  return (
    <>
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
                  Meus pedidos
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
            Meus pedidos
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
                Meus pedidos
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
                overflowX="scroll"
              >
                <Stack spacing={4}>
                  {pedidos.data?.results.map((item): any => (
                    <MeuPedidoCard
                      key={item.pk}
                      data={new Date(item.ordered_date).toLocaleDateString()}
                      item={item}
                      user={item.user}
                    />
                  ))}
                </Stack>
              </Flex>
              <Flex>
                <Flex justifyContent="flex-start" w="45%">
                  {pedidos.data?.previous && (
                    <Text
                      m={2}
                      cursor="pointer"
                      onClick={() => setPage(page - 1)}
                    >
                      {'<'} Anterior
                    </Text>
                  )}
                </Flex>
                <Flex justifyContent="center">
                  <Text m={2}>{page}</Text>
                </Flex>
                <Flex justifyContent="flex-end" w="45%">
                  {pedidos.data?.next && (
                    <Text
                      m={2}
                      cursor="pointer"
                      onClick={() => setPage(page + 1)}
                    >
                      Próxima {'>'}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </>
          )}
          {router.query.param == 'perfil' && <p>Perfil</p>}
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard
