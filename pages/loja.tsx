import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import {
  Heading,
  Text,
  Image,
  Badge,
  Flex,
  Button,
  Select,
  useToast,
  Skeleton,
} from '@chakra-ui/core'
import { useFetch } from '../hooks/useFetch'
import api from '../services/api'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../config/auth'
import Head from 'next/head'
import Footer from '../components/Footer'

function Loja() {
  const router = useRouter()
  const toast = useToast()
  const [produtos, setProdutos] = useState([])

  const [isSócio, setIsSócio] = useState(false)

  const [tamanho, setTamanho]: any = useState({})
  const handleTamanho = (event: any, pk: any) =>
    setTamanho({
      pk: pk,
      value: event.target.value,
    })

  const { data }: any = useFetch('ecommerce/api/product-list/')

  useEffect(() => {
    setProdutos(data && data)
  })

  useEffect(() => {
    isAuthenticated()
    if (localStorage.getItem('aaafuria:isSócio') === 'true') {
      setIsSócio(true)
    }
  }, [])
  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  }, [])

  // if (!data) {
  //   return (
  //     <Flex
  //       color="green.300"
  //       h="100vh"
  //       w="100%"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <Spinner size="xl" />
  //     </Flex>
  //   )
  // }

  async function handleAddToCart(pk: number, value?: string) {
    if (isAuthenticated()) {
      const response: any = await api.post('ecommerce/api/add-to-cart/', {
        pk: pk,
        tamanho: value,
      })
      if (response.ok) {
        router.push({
          pathname: 'carrinho/',
          query: response.data,
        })
      } else {
        toast({
          position: 'bottom',
          title: 'Erro!',
          description: `${response.data.error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } else {
      alert('Você não está logado.')
    }
  }
  return (
    <>
      <Head>
        <title>Loja - @aaafuria</title>
        <meta
          name="description"
          content="Loja de Produtos Oficiais @aaafuria"
        />
      </Head>
      <Header />
      <Heading
        as="h1"
        textAlign="center"
        mt={16}
        mb={6}
        size={'xl'}
        color="green.600"
      >
        Loja
      </Heading>
      <Skeleton isLoaded={data} minH="480px">
        <Flex mx={2} mb={16} justify="center" flexWrap="wrap">
          {produtos?.map((item) => (
            <Flex
              key={item.pk}
              flexDir="column"
              borderRadius="md"
              borderWidth="1px"
              backgroundColor="#fff"
              flexGrow={1}
              minW="200px"
              maxW="380px"
              m={2}
              overflow="hidden"
            >
              <Image src={item.image} alt={item.item} maxW="380px" />
              <Flex p={2}>
                <Flex flexDir="column">
                  {isSócio && (
                    <Badge
                      borderRadius="sm"
                      px="2"
                      variant="solid"
                      backgroundColor="green.300"
                    >
                      SÓCIO ATIVO
                    </Badge>
                  )}

                  <Text
                    as="h4"
                    fontWeight="semibold"
                    lineHeight="tight"
                    isTruncated
                  >
                    {item.title}
                  </Text>
                  {isSócio ? (
                    <Flex alignItems="baseline">
                      <Text color="gray.400" textDecoration="line-through">
                        R${item.price}
                      </Text>
                      <Text
                        color="green.600"
                        ml={1}
                        fontSize="xl"
                        fontWeight="bold"
                      >
                        R${item.socio_price}
                      </Text>
                    </Flex>
                  ) : (
                    <Text color="gray.500">R${item.price}</Text>
                  )}
                </Flex>
                <Flex flexDir="column" flexGrow={1} alignItems="flex-end">
                  <Flex>
                    {item.has_variations && (
                      <Select
                        size="sm"
                        borderRadius="sm"
                        focusBorderColor="green.300"
                        placeholder="Tamanho"
                        value={tamanho.pk == item.pk && tamanho.value}
                        onChange={(event) => handleTamanho(event, item.pk)}
                      >
                        <option value="PPBL">PP BL</option>
                        <option value="PBL">P BL</option>
                        <option value="MBL">M BL</option>
                        <option value="GBL">G BL</option>
                        <option value="GGBL">GG BL</option>
                        <option value="XGBL">EXGG BL</option>
                        <option value="PP">PP</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        <option value="EXGG">EXGG</option>
                      </Select>
                    )}
                  </Flex>
                </Flex>
              </Flex>
              <Button
                isDisabled={isAuthenticated() ? false : true}
                h="45px"
                borderRadius={0}
                backgroundColor="green.300"
                color="#FFF"
                _hover={{ backgroundColor: 'green.600', color: 'gray.300' }}
                fontSize={['sm', 'md']}
                onClick={() =>
                  handleAddToCart(tamanho.pk || item.pk, tamanho.value)
                }
              >
                {isAuthenticated()
                  ? 'Adicionar ao carrinho'
                  : 'Você não está logado'}
              </Button>
            </Flex>
          ))}
        </Flex>
      </Skeleton>
      <Footer />
    </>
  )
}

export default Loja
