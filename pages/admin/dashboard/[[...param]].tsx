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
  Heading,
  Divider,
  Badge,
} from '@chakra-ui/core'
import { AiOutlineHome } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { logout, isAuthenticated } from '../../../services/auth'
import Head from 'next/head'
import AdminGate from '../_adminGate'
import Pedidos from './_PedidosAdmin'
import DrawerMenuAdmin from '../../../components/admin/DrawerMenuAdmin'
import MenuAdmin from '../../../components/admin/MenuAdmin'
import Financeiro from './_Financeiro'
import Associações from './_Associações'

const Dashboard: React.FC = () => {
  const router = useRouter()

  const [page, setPage] = useState(1)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  })

  return (
    <AdminGate>
      <Head>
        <title>Dashboard - @aaafuria</title>
      </Head>
      <Flex backgroundColor="green.600">
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
      <Flex backgroundColor="green.600" d={['flex', 'none']} p={2}>
        <DrawerMenuAdmin />
      </Flex>
      <Flex w="100%" minH="240px" borderTopColor="green.300" borderTopWidth={4}>
        <MenuAdmin />
        {
          //content
        }
        <Flex
          flexDir="column"
          flexGrow={1}
          minW="60%"
          p={4}
          backgroundColor="#fff"
        >
          {router.query.param == 'pedidos' && <Pedidos />}
          {router.query.param == 'financeiro' && <Financeiro />}
          {router.query.param == 'associacoes' && <Associações />}
        </Flex>
      </Flex>
    </AdminGate>
  )
}

export default Dashboard
