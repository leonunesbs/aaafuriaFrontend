import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import { Heading, Box, Image, Badge, Flex, Button, Stack, Spinner, Select } from '@chakra-ui/core';
import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../services/auth';
import Head from 'next/head';



function Loja() {
    const router = useRouter()
    const [produtos, setProdutos] = useState([])

    const [tamanho, setTamanho] = useState()
    const handleTamanho = (event: any) => (setTamanho(event.target.value))

    const { data }: any = useFetch('product-list/')

    useEffect(() => {setProdutos(data && data)})


    if (!data) {
        return <Flex color='green.300' h='100vh' w='100%' alignItems='center' justifyContent='center'><Spinner size='xl' /></Flex>
    }

    async function handleAddToCart(pk: number) {
        if (isAuthenticated()) {
            await api.post('add-to-cart/', {pk: pk, tamanho: tamanho})
            router.push('/carrinho')
        } else {
            alert('Você não está logado.')
        }
        
    }

    return (
        <>
            <Head>
                <title>Loja</title>
            </Head>
            <Header />
            <Heading textAlign='center' mt={16} mb={6} size={'xl'} color='green.600'>Loja</Heading>
            <Flex mx={2} justify='center'>
                <Stack isInline justify='center' flexWrap='wrap'>
                    {produtos?.map((item:any) => (
                        <Box key={item.pk} maxW="420px" minW='30px' borderWidth="1px" borderRadius="md" mb={2} overflow=" hidden">
                            <Image src='/Body.png' alt='body' />

                            <Flex p={2} flexDir='column'>
                                <Flex>
                                    <Flex flexDir='column' flexGrow={1}>
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
                                    </Flex>  
                                    <Flex flexDir='column' flexGrow={1} alignItems='flex-end'>
                                        {
                                            item.has_variations 
                                            && 
                                            <Select 
                                                size='sm' 
                                                borderRadius='sm'
                                                focusBorderColor='green.300'
                                                placeholder='Tamanho'
                                                value={tamanho}
                                                onChange={handleTamanho}
                                            >
                                                    <option value="PPBL">PP BL</option>
                                                    <option value="PBL">P BL</option>
                                                    <option value="MBL">M BL</option>
                                                    <option value="GBL">G BL</option>
                                                    <option value="GGBL">GG BL</option>
                                                    <option value="PP">PP</option>
                                                    <option value="P">P</option>
                                                    <option value="M">M</option>
                                                    <option value="G">G</option>
                                                    <option value="GG">GG</option>
                                            </Select>
                                        }
                                        
                                    </Flex>
                                </Flex>
                                

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
                            </Flex>
                        </Box>
                    ))}

                </Stack>
            </Flex>


        </>
    );
}

export default Loja;