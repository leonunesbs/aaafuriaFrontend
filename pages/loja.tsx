import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import { Heading, Box, Image, Badge, Flex, Button, Stack } from '@chakra-ui/core';
import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../services/auth';

interface Item {
    pk: number;
    title: string;
    price: number;
}

function Loja() {
    const router = useRouter()


    const { data } = useFetch<Item[]>('product-list/')
    if (!data) {
        return <p>Carregando...</p>
    }

    async function handleAddToCart(pk: number) {
        if (isAuthenticated()) {
            const response: any = await api.get(`add-to-cart/${pk}`)
            
            router.push('/carrinho')
        } else {
            alert('Você não está logado.')
        }
        
    }

    return (
        <>
            <Header />
            <Heading textAlign='center' mt={16} mb={6} size={'xl'} color='green.600'>Loja</Heading>
            <Flex mx={2} justify='center'>
                <Stack isInline justify='center' flexWrap='wrap'>
                    {data.map(item => (
                        <Box key={item.pk} maxW="420px" minW='30px' borderWidth="1px" borderRadius="md" mb={2} overflow=" hidden">
                            <Image src='/Body.png' alt='body' />

                            <Box p={2}>
                                <Box d="flex" alignItems="baseline">
                                    <Badge borderRadius='sm' px="2" variant='solid' backgroundColor="green.300">
                                        SÓCIO ATIVO
                            </Badge>
                                    <Box
                                        color="red"
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        SEM ESTOQUE
                                </Box>
                                </Box>

                                <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated
                                >
                                    {item.title}
                                </Box>

                                <Box>
                                    <Box as="span" color="gray.600" fontSize="sm">
                                        R$
                                    </Box>
                                    {item.price}
                                </Box>

                                <Box d="flex" mt="2" alignItems="center" justifyContent='center'>
                                    <Button
                                        isDisabled={isAuthenticated() ? false : true}
                                        w='100%'
                                        h='45px'
                                        borderRadius='sm'
                                        backgroundColor='green.300'
                                        _hover={{ color: 'gray.300', backgroundColor: 'green.600' }}
                                        color='#fff'
                                        onClick={() => handleAddToCart(item.pk)}

                                        fontSize={['sm', 'md']}
                                    >
                                        { isAuthenticated() ? 
                                        ('Adicionar ao carrinho') :
                                        ('Você não está logado')
                                        }
                                        
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))}

                </Stack>
            </Flex>


        </>
    );
}

export default Loja;