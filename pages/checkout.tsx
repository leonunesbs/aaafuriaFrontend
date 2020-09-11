import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import {
  Flex,
  Heading,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Box,
  Text,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Stack,
} from '@chakra-ui/core'
import { CgArrowsExchange } from 'react-icons/cg'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useFetch } from '../hooks/useFetch'
import { isAuthenticated } from '../config/auth'
import { useRouter } from 'next/router'
import api from '../services/api'
import Head from 'next/head'
import Footer from '../components/Footer'

// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CardSection from '../components/CardElement'
import { BsCreditCard } from 'react-icons/bs'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

const Checkout: React.FC = () => {
  const router = useRouter()
  // const stripe = useStripe()
  // const elements = useElements()
  const toast = useToast()

  const [digitando, setDigitando] = useState(true)
  const [loading, setLoading] = useState(false)

  const [formaPagamento, setPagamento] = useState('')
  const handlePagamento = (event: any) => setPagamento(event.target.value)

  const [valor, setValor] = useState('')
  const handleValor = (event: any) => setValor(event.target.value)

  const [comprovante, setComprovante] = useState()
  const handleComprovante = (event: any) =>
    setComprovante(event.target.files[0])

  const [contaDestino, setContaDestino] = useState('')
  const handleContaDestino = (event: any) => setContaDestino(event.target.value)

  const cart: { data: any } = useFetch('ecommerce/api/carrinho/')

  const [produtos, setProdutos]: any = useState([])

  useEffect(() => {
    setProdutos(cart.data && cart.data.produtos)
  })

  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  }, [])

  useEffect(() => {
    if (formaPagamento === 'TR') {
      if (contaDestino != '' && comprovante != null && valor != '') {
        setDigitando(false)
      }
    }
  })

  useEffect(() => {
    if (formaPagamento === 'ST') {
      const f = async () => {
        const response: any = await api.get('ecommerce/api/create-payment/')
        if (response.ok) {
          localStorage.setItem(
            'clientSecret',
            JSON.stringify(response.data.clientSecret).slice(1, -1)
          )
        }
      }
      f()
    }
  }, [formaPagamento])

  const handleCheckout = async () => {
    setLoading(true)
    if (formaPagamento == 'ST') {
      // if (!stripe || !elements) {
      //   // Stripe.js has not yet loaded.
      //   // Make sure to disable form submission until Stripe.js has loaded.
      //   return
      // }
      // const result = await stripe.confirmCardPayment(
      //   `${localStorage.getItem('clientSecret')}`,
      //   {
      //     payment_method: {
      //       card: elements.getElement(CardElement),
      //       billing_details: {
      //         name: 'Jenny Rosen',
      //       },
      //     },
      //   }
      // )
      // if (result.error) {
      //   // Show error to your customer (e.g., insufficient funds)
      //   console.log(result.error.message)
      // } else {
      //   // The payment has been processed!
      //   if (result.paymentIntent.status === 'succeeded') {
      //     // Show a success message to your customer
      //     // There's a risk of the customer closing the window before callback
      //     // execution. Set up a webhook or plugin to listen for the
      //     // payment_intent.succeeded event that handles any business critical
      //     // post-payment actions.
      //     const response = await api.post('checkout/', {
      //       produtos: produtos,
      //     })
      //   }
      // }
    } else if (formaPagamento == 'TR') {
      const data = new FormData()
      data.append('produtos', JSON.stringify(produtos))
      data.append('gateway', formaPagamento)
      data.append('amount', valor)
      data.append('comprovante', comprovante)
      const response: any = await api.post('ecommerce/api/checkout/', data)

      if (response.ok) {
        toast({
          position: 'bottom',
          title: 'Pronto!',
          description: response.data.success,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/loja')
      } else {
        toast({
          position: 'bottom',
          title: 'Erro!',
          description:
            'Erro ao finalizar pedido. Entre em contato com um Diretor.',
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Checkout - @aaafuria</title>
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
        Finalizar pedido
      </Heading>
      <Flex p={6} flexWrap="wrap" mb={16}>
        <Flex
          flexGrow={1}
          borderColor="#ededed"
          backgroundColor="#fff"
          borderWidth={1}
          flexDir="column"
          borderRadius="md"
          minW="65%"
          p={6}
          m={2}
        >
          <Heading size="md" as="h4" mb={6} color="green.600">
            Forma de pagamento
          </Heading>

          <FormControl isRequired isDisabled={loading}>
            <Stack isInline align="center" justify="center" flexWrap="wrap">
              <Button
                mb={2}
                borderRadius="sm"
                backgroundColor="gray.500"
                color="#fff"
                onClick={() => setPagamento('TR')}
                isActive={formaPagamento == 'TR' ? true : false}
                _active={{ backgroundColor: 'green.300', color: 'gray.500' }}
                _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
                _focus={{}}
              >
                <Box as={CgArrowsExchange} mr={1} size={5} />
                Transferência
              </Button>
              <Button
                mb={2}
                borderRadius="sm"
                backgroundColor="gray.500"
                color="#fff"
                onClick={() => setPagamento('ST')}
                isDisabled
                _active={{ backgroundColor: 'green.300', color: 'gray.500' }}
                _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
                _focus={{}}
              >
                <Box as={BsCreditCard} mr={2} size={4} />
                Cartão de crédito
              </Button>
            </Stack>
            {formaPagamento == 'TR' && (
              <FormHelperText id="pagamento">
                <b>Santander</b> [Agência: 4326, Conta: 01050635-9, Iago Antunes
                Macedo de Souza, 025.449.773-02],
                <br />
                <b>Branco do Brasil</b> [Agência: 3507-6, Conta: 33266-6, Iago
                Antune Macedo de Souza, 025.449.773-02],
                <br />
                <b>Caixa Econômica</b> [Agência: 0728, Op: 13, Conta: 102903-7,
                Albérico Santana S Amorim G]
              </FormHelperText>
            )}
          </FormControl>
          <Flex mt={6} flexDir="column">
            {formaPagamento == 'ST' && (
              <FormControl isDisabled={loading}>
                <CardSection />
              </FormControl>
            )}
            {formaPagamento == 'TR' && (
              <>
                <Heading size="md" as="h4" mb={6} mt={6} color="green.600">
                  Dados da transferência
                </Heading>
                <FormControl as="fieldset" isRequired isDisabled={loading}>
                  <FormLabel as="legend">Conta destino</FormLabel>
                  <RadioGroup
                    value={contaDestino}
                    onChange={handleContaDestino}
                  >
                    <Radio variantColor="green" value="BB">
                      Banco do Brasil
                    </Radio>
                    <Radio variantColor="green" value="CX">
                      Caixa Econômica
                    </Radio>
                    <Radio variantColor="green" value="ST">
                      Santander
                    </Radio>
                  </RadioGroup>
                </FormControl>
                <FormControl mt={4} isRequired isDisabled={loading}>
                  <FormLabel htmlFor="valor">Valor</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      focusBorderColor="green.600"
                      placeholder="Valor"
                      borderRadius="sm"
                      value={valor}
                      onChange={handleValor}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired isDisabled={loading}>
                  <FormLabel as="legend">Comprovante</FormLabel>
                  <Input
                    focusBorderColor="green.600"
                    type="file"
                    borderRadius="sm"
                    onChange={handleComprovante}
                  />
                </FormControl>
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          flexGrow={[1, 0]}
          minW="25%"
          borderColor="#ededed"
          backgroundColor="#fff"
          borderWidth={1}
          flexDir="column"
          borderRadius="md"
          p={6}
          m={2}
        >
          <Heading size="md" mb={6} as="h4" color="green.600">
            Carrinho
          </Heading>
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
                fontSize={['xs', 'sm']}
                borderBottom="1px"
                borderColor="#ededed"
                borderRadius="sm"
              >
                <Flex h="45px" alignItems="center" mr={2}>
                  <Text fontWeight="thin">{item.quantity}x</Text>
                </Flex>
                <Flex h="45px" flexGrow={1} alignItems="center">
                  <Text>{item.item}</Text>
                </Flex>
                <Flex
                  h="45px"
                  flexGrow={1}
                  alignItems="center"
                  justifyContent="flex-end"
                  ml={2}
                  mr={4}
                >
                  {item.size}
                </Flex>

                <Flex
                  h="45px"
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
            mt={1}
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
          <Button
            h="45px"
            backgroundColor="green.300"
            borderRadius="sm"
            color="#fff"
            _hover={{ backgroundColor: 'green.600' }}
            fontSize={['xs', 'sm', 'base']}
            mt={4}
            onClick={handleCheckout}
            isLoading={loading}
            loadingText="Finalizando..."
            isDisabled={digitando}
          >
            Finalizar pedido
            <Box as={AiOutlineArrowRight} size={6} />
          </Button>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}

export default Checkout
