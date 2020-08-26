import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import { Heading, Text, Image, Badge, Flex, Button, Spinner, Select, Box } from '@chakra-ui/core';
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
            <Flex mx={2} justify='center' flexWrap='wrap'>
                    {produtos?.map((item:any) => (
                    <Flex 
                    flexDir='column'
                    borderRadius='md'
                    borderWidth='1px'
                    flexGrow={1}
                    m={1}
                    w='20%'
                    minW='200px'
                    maxW='380px'
                    overflow='hidden'
                    >
                        <Image src='/Body.png' alt='body' />
                        <Flex p={2}>
                            <Flex flexDir='column' flexGrow={1}>
                                <Box>
                                    <Badge borderRadius='sm' px="2" variant='solid' backgroundColor="green.300">
                                                    SÓCIO ATIVO
                                    </Badge>

                                    <Text 
                                    as='h4'
                                    fontWeight='semibold'
                                    lineHeight='tight'
                                    isTruncated
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                    color='gray.600'
                                    >
                                        R${item.price}
                                    </Text>
                                </Box>
                                
                            </Flex>
                            <Flex flexDir='column' flexGrow={1} alignItems='flex-end'>
                                <Box>
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
                                </Box>
                            </Flex>
                        </Flex>
                        <Button
                            isDisabled={isAuthenticated() ? false : true}
                            h='45px'
                            borderRadius={0}
                            backgroundColor='green.300'
                            color='#FFF'
                            _hover={{backgroundColor: 'green.600', color: 'gray.300'}}
                            fontSize={['sm', 'md']}

                            onClick={() => handleAddToCart(item.pk)}
                        >
                                { isAuthenticated() ? 
                                        ('Adicionar ao carrinho') :
                                        ('Você não está logado')
                                }
                        </Button>
                    </Flex>
                    ))
                    }
            </Flex>


        </>
    );
}

export default Loja;