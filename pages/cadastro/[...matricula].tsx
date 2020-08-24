import Link from 'next/link'
import { Text, Heading, Flex, Button, Spinner, FormControl, FormLabel, Input, FormHelperText, } from "@chakra-ui/core"
import { useFetch } from '../../hooks/useFetch';
import Header from '../../components/Header';

import { useState } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';


interface Item {
    carrinho: any;
}


const Carrinho: React.FC = () => {
    const router = useRouter()
    const [error, setError] = useState('')

    const cart: { data: any } = useFetch<Item[]>('carrinho/')

    if (!cart.data) {
        return <Flex color='green.300' h='100vh' w='100%' alignItems='center' justifyContent='center'><Spinner size='xl' /></Flex>
    }

    async function removeFromCart(pk: number) {
        router.reload()
        await api.get(`remove-from-cart/${pk}`)
    }

    return (
        <Flex flexDir='column'>
            <Header />
            <Flex flexDirection='column'>
                <Heading textAlign='center' mt={16} size={'xl'} color='green.600'>Cadastro</Heading>
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
                <FormControl>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input type="email" id="email" aria-describedby="email-helper-text" />
                    <FormHelperText id="email-helper-text">
                        {router.query.matricula}
                    </FormHelperText>
                </FormControl>
            </Flex>
            <Flex
                w='95%'
                mt={6}
                justifyContent='center'
                alignSelf='center'
            >
                <Link href='/loja'>
                    <Button
                        h='45px'
                        w='100%'
                        borderRadius='sm'
                        backgroundColor='green.300'
                        color='#fff'
                        _hover={{ backgroundColor: 'green.600' }}
                        fontSize={['xs', 'sm', 'base']}
                    >
                        Finalizar cadastro
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
}

export default Carrinho;