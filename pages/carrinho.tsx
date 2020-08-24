import Link from 'next/link'
import { Text, Heading, Flex, Box, Button, Spinner, } from "@chakra-ui/core"
import { useFetch } from '../hooks/useFetch';
import Header from '../components/Header';

import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../services/auth';



interface Item {
    carrinho: any;
}


const Carrinho: React.FC = () => {
    const router = useRouter()
    const [error, setError] = useState('')

    const cart: { data: any } = useFetch('carrinho/')
    
    if (!cart.data) {
        return <Flex color='green.300' h='100vh' w='100%' alignItems='center' justifyContent='center'><Spinner size='xl' /></Flex>
    }
    !isAuthenticated() && router.push('/login')

    async function removeFromCart(pk: number) {
        router.reload()
        await api.get(`remove-from-cart/${pk}`)
    }

    

    return (
        <Flex flexDir='column'>
            <Header />
            <Flex flexDirection='column'>
                <Heading textAlign='center' mt={16} size={'xl'} color='green.600'>Carrinho</Heading>
            </Flex>

            <Flex
                w='95%'
                mx='25%'
                alignSelf='center'
                borderColor='#ededed'
                borderWidth={1}
                flexDir='column'
                borderRadius='md'
                mt={6}
                p={6}
            >
                {
                cart.data.carrinho 
                &&
                    cart.data.carrinho.map((item: {
                        pk: number;
                        quantity: number;
                        item: string;
                        final_price: number;
                    }) => (
                            <Flex
                                key={item.pk}
                                flexGrow={1}
                                fontSize={['xs', 'sm']}
                                borderBottom='1px'
                                borderColor='#ededed'
                                borderRadius='sm'
                            >
                                <Flex
                                    h='45px'
                                    alignItems='center'
                                    justifyContent='center'
                                >

                                    <Box
                                        as={AiOutlineDelete}
                                        size={5}
                                        ml={4}
                                        color='green.300'
                                        onClick={() => removeFromCart(item.pk)}
                                        cursor='pointer'

                                    />

                                </Flex>
                                <Flex
                                    h='45px'
                                    alignItems='center'
                                    w={['45px', '90px']}
                                    justifyContent='flex-end'
                                    pr={2}
                                >
                                    <Text
                                        fontWeight='thin'
                                    >
                                        {item.quantity}x

                                </Text>
                                </Flex>
                                <Flex
                                    h='45px'
                                    alignItems='center'
                                    flexGrow={1}
                                >
                                    <Text>
                                        {item.item}
                                    </Text>
                                </Flex>
                                <Flex
                                    h='45px'
                                    alignItems='center'
                                    justifyContent='flex-end'
                                    mr={4}
                                >

                                    50
                            </Flex>

                                <Flex
                                    h='45px'
                                    w='90px'
                                    alignItems='center'
                                    justifyContent='flex-end'
                                    fontWeight='bold'

                                >
                                    R${item.final_price}</Flex>
                            </Flex>
                        ))
                }

                <Flex
                    mt={4}
                    flexGrow={1}
                    justifyContent='flex-end'
                    alignItems='flex-end'
                >
                    <Text fontSize='normal' fontWeight='thin'>TOTAL</Text>
                    <Text fontSize='lg' ml={4} fontWeight='bold' color='green.600'>R${cart.data?.total}</Text>
                </Flex>

            </Flex>
            <Flex
                w='95%'
                mt={6}
                justifyContent='flex-end'
                alignSelf='center'
            >
                <Link href='/loja'>
                    <Button
                        h='45px'
                        borderRadius='sm'
                        backgroundColor='gray.300'
                        color='#fff'
                        _hover={{ backgroundColor: 'green.600' }}
                        fontSize={['xs', 'sm', 'base']}
                    >
                        Continuar comprando
                    </Button>
                </Link>

                <Button
                    h='45px'
                    ml={2}
                    backgroundColor='green.300'
                    borderRadius='sm'
                    color='#fff'
                    _hover={{ backgroundColor: 'green.600' }}
                    fontSize={['xs', 'sm', 'base']}

                >
                    Finalizar pedido
                        <Box as={AiOutlineArrowRight} size={6} />
                </Button>
            </Flex>
        </Flex>
    );
}

export default Carrinho;