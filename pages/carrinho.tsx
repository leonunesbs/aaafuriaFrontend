import Link from 'next/link'
import {
  Text,
  Heading,
  Flex,
  Box,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/core'
import { useFetch } from '../hooks/useFetch'
import Header from '../components/Header'

import { AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../config/auth'
import Head from 'next/head'

interface Item {
  carrinho: any
}

const Carrinho: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [produtos, setProdutos] = useState([])

  const cart: { data: any } = useFetch('carrinho/', 10000)

  useEffect(() => {
    setProdutos(cart.data && cart.data.produtos)
  })
  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  }, [])

  useEffect(() => {
    if (router.query.message) {
      toast({
        position: 'bottom',
        title: `${router.query.message}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }, [])

  if (!cart.data) {
    return (
      <Flex
        color="green.300"
        h="100vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Flex>
    )
  }

  async function removeFromCart(pk: number) {
    await api.post('remove-from-cart/', { pk: pk })
    produtos.forEach((element, index, array) => {
      if (element.pk == pk) {
        array.splice(index, 1)
        setProdutos(array)
      }
    })
    setProdutos([{ pk: 0 }])
  }

  return (
    <>
      <Head>
        <title>Carrinho - @aaafuria</title>
      </Head>
      <Flex flexDir="column">
        <Header />
        <Flex flexDirection="column">
          <Heading textAlign="center" mt={16} size={'xl'} color="green.600">
            Carrinho
          </Heading>
        </Flex>

        <Flex
          w="95%"
          mx="25%"
          alignSelf="center"
          borderColor="#ededed"
          borderWidth={1}
          flexDir="column"
          borderRadius="md"
          mt={6}
          p={6}
        >
          {produtos?.map(
            (item: {
              pk: number
              quantity: number
              item: string
              final_price: number
              size: string
            }) => (
              <Flex
                key={item.pk}
                flexGrow={1}
                fontSize={['xs', 'sm']}
                borderBottom="1px"
                borderColor="#ededed"
                borderRadius="sm"
              >
                <Flex h="45px" alignItems="center" justifyContent="center">
                  <Box
                    as={AiOutlineDelete}
                    size={5}
                    ml={4}
                    color="green.300"
                    onClick={() => removeFromCart(item.pk)}
                    cursor="pointer"
                  />
                </Flex>
                <Flex
                  h="45px"
                  alignItems="center"
                  w={['45px', '90px']}
                  justifyContent="flex-end"
                  pr={2}
                >
                  <Text fontWeight="thin">{item.quantity}x</Text>
                </Flex>
                <Flex h="45px" alignItems="center" flexGrow={1}>
                  <Text>{item.item}</Text>
                </Flex>
                <Flex
                  h="45px"
                  alignItems="center"
                  justifyContent="flex-end"
                  mr={4}
                >
                  {item.size}
                </Flex>

                <Flex
                  h="45px"
                  w="90px"
                  alignItems="center"
                  justifyContent="flex-end"
                  fontWeight="bold"
                >
                  R${item.final_price}
                </Flex>
              </Flex>
            )
          )}

          <Flex
            mt={4}
            flexGrow={1}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Text fontSize="normal" fontWeight="thin">
              TOTAL
            </Text>
            <Text fontSize="lg" ml={4} fontWeight="bold" color="green.600">
              R${cart.data?.total}
            </Text>
          </Flex>
        </Flex>
        <Flex w="95%" mt={6} justifyContent="flex-end" alignSelf="center">
          <Link href="/loja">
            <Button
              h="45px"
              borderRadius="sm"
              backgroundColor="gray.600"
              color="#fff"
              _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
              fontSize={['xs', 'sm', 'base']}
            >
              Continuar comprando
            </Button>
          </Link>

          <Button
            h="45px"
            ml={2}
            backgroundColor="green.300"
            borderRadius="sm"
            color="#fff"
            _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
            fontSize={['xs', 'sm', 'base']}
            onClick={() => router.push('/checkout')}
          >
            Finalizar pedido
            <Box as={AiOutlineArrowRight} size={6} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Carrinho
