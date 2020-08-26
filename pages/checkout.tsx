import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Flex, Heading, RadioGroup, Radio, FormControl, FormLabel, Button, Box, Text, FormHelperText } from '@chakra-ui/core';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useFetch } from '../hooks/useFetch';
import { isAuthenticated } from '../services/auth';
import { useRouter } from 'next/router';


const Checkout: React.FC = () => {
    const router = useRouter()

    const [formaPagamento, setPagamento] = useState()
    const handlePagamento = (event: any) => setPagamento(event.target.value)
    
    const cart: { data: any } = useFetch('carrinho/', 5000)

    const [produtos, setProdutos] = useState([])
    
    useEffect(() => {setProdutos(cart.data && cart.data.produtos)})
    
    useEffect(() => {!isAuthenticated() && router.push('/login')}, [])
    
    

  return (
      <>
        <Header />
        <Heading textAlign='center' mt={16} mb={6} size={'xl'} color='green.600'>Finalizar pedido</Heading>
        <Flex p={6} flexWrap='wrap'>
            <Flex
                flexGrow={1}
                borderColor='#ededed'
                borderWidth={1}
                flexDir='column'
                borderRadius='md'
                minW='65%'
                p={6}
                m={2}
            >   
            <Heading size='md' as='h4' mb={6} color='green.600'>Dados do pagamento</Heading>

            <FormControl isRequired>
                <FormLabel htmlFor="pagamento" fontWeight='bold'>Forma de pagamento</FormLabel>
                <RadioGroup id='pagamento' value={formaPagamento} onChange={handlePagamento} >
                    <Radio variantColor='green' value="T">Transferência</Radio>
                </RadioGroup>
                {
                formaPagamento == 'T' && 
                <FormHelperText id='pagamento'>
                    Contas
                </FormHelperText>
                }
            </FormControl>
                
                
                
            </Flex>
            <Flex
                flexGrow={[1, 0]}
                minW='25%'
                borderColor='#ededed'
                borderWidth={1}
                flexDir='column'
                borderRadius='md'
                p={6}
                m={2}
                >
                <Heading size='md' mb={6} as='h4' color='green.600'>Carrinho</Heading>
                {
                    produtos?.map((item: {
                        pk: number;
                        quantity: number;
                        item: string;
                        final_price: number;
                        size: string;
                    }) => (
                        <Flex
                        key={item.pk}
                        fontSize={['xs', 'sm']}
                        borderBottom='1px'
                        borderColor='#ededed'
                        borderRadius='sm'
                        >   
                                
                                <Flex
                                    h='45px'
                                    alignItems='center'
                                    mr={2}
                                    >
                                    <Text
                                        fontWeight='thin'
                                        >
                                        {item.quantity}x
                                    </Text>
                                </Flex>
                                <Flex
                                    h='45px'
                                    flexGrow={1}
                                    alignItems='center'
                                    >
                                    <Text>
                                        {item.item}
                                    </Text>
                                </Flex>
                                <Flex
                                    h='45px'
                                    flexGrow={1}
                                    alignItems='center'
                                    justifyContent='flex-end'
                                    ml={2}
                                    mr={4}
                                    >

                                    {item.size}
                            </Flex>

                            <Flex
                                h='45px'
                                alignItems='center'
                                justifyContent='flex-end'
                                fontWeight='bold'
                                
                                >
                                R${item.final_price}</Flex>
                            </Flex>
                        ))
                    }
                    <Flex
                    mt={1}
                    flexGrow={1}
                    justifyContent='flex-end'
                    alignItems='flex-end'
                    >
                    <Text fontSize='normal' fontWeight='thin'>TOTAL</Text>
                    <Text fontSize='lg' ml={4} fontWeight='bold' color='green.600'>R${cart.data?.total}</Text>
                </Flex>
                <Button
                    h='45px'
                    backgroundColor='green.300'
                    borderRadius='sm'
                    color='#fff'
                    _hover={{ backgroundColor: 'green.600' }}
                    fontSize={['xs', 'sm', 'base']}
                    mt={4}
                    >
                    Finalizar
                        <Box as={AiOutlineArrowRight} size={6} />
                </Button>
            </Flex>
        </Flex>
      </>
  );
}

export default Checkout;