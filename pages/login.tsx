import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { Heading, Box, Flex, Image, Input, Button, Text, InputGroup, InputLeftElement, Icon } from '@chakra-ui/core';


import { MdPerson, MdLock } from "react-icons/md";
import { authenticate, isAuthenticated } from '../services/auth';

export default function Login() {
    const router = useRouter()

    const [error, setError] = useState('');

    const [matricula, setMatricula] = useState('');
    const handleMatricula = (event: any) => setMatricula(event.target.value)
    const [senha, setSenha] = useState('');
    const handleSenha = (event: any) => setSenha(event.target.value)

    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        setLoading(true)
        setError(null)
        const response: any = await authenticate(matricula, senha)
        if (response.ok) {
            router.push('/')
        } else {
            setError(response.data.error)
        }
        setLoading(false)
    }

    useEffect(() => {
        function isAuth() {
            if (isAuthenticated()) {
                return router.push('/')
            } else {
                localStorage.clear()
            }
        }
        isAuth()
    }, [])

    return (
        <>
            <Flex
                flexWrap='wrap'
                height='100vh'
                alignItems='center'
                justifyContent='center'
                px={5}
            >
                <Flex 
                flexDir='column' 
                width={['250px', '50%', '50%', '480px']} 
                alignItems='flex-start' 
                >
                    <Image
                        src="/logo_light.svg"
                        alt="logo_light"
                        height='90px'
                        onClick={() => router.push('/')}
                        cursor='pointer'
                    />
                    <Heading
                        fontSize={['lg', '2xl', '3xl']}
                        marginTop={15}
                        textAlign={['center', 'left']}
                        color='gray.600'
                    >
                        Faça seu login na plataforma
                    </Heading>
                </Flex>
                <Flex
                    flexDir='column'
                    width={['100%', '50%', '50%', '480px']}
                    backgroundColor='green.600'
                    borderRadius='md'
                    alignItems='stretch'
                    padding={[10, 16]}
                >
                    <InputGroup>
                        <InputLeftElement children={<Box as={MdPerson} size={5} color='gray.300' />} />
                        <Input
                            value={matricula}
                            onChange={handleMatricula}
                            placeholder='Matrícula'
                            height='45px'
                            borderRadius='sm'
                            focusBorderColor='green.300'
                        />
                    </InputGroup>
                    <InputGroup
                        marginTop={2}
                    >
                        <InputLeftElement children={<Box as={MdLock} size={5} color='gray.300' />} />
                        <Input
                            value={senha}
                            onChange={handleSenha}
                            type='password'
                            placeholder='Senha'
                            height='45px'
                            borderRadius='sm'
                            focusBorderColor='green.300'
                        />

                    </InputGroup>
                    <Link href='#'>
                        <a>
                            <Text
                                alignSelf='flex-start'
                                fontSize='sm'
                                fontWeight='bold'
                                color='green.300'
                                marginTop={2}
                            >
                                Esqueci minha senha
                        </Text>
                        </a>
                    </Link>

                    <Button
                        backgroundColor='green.300'
                        isLoading={loading}
                        height='45px'
                        borderRadius='sm'
                        marginTop={6}
                        color='#fff'
                        _hover={{ backgroundColor: 'green.800' }}
                        onClick={handleLogin}
                    >
                        ENTRAR
                </Button>
                    <Text alignSelf='center' color='white' fontWeight='bold' mt={1} fontSize='sm'>
                        {error}
                    </Text>
                    
                    <Text alignSelf='center' color='gray.300' mt={4} fontSize='sm'>
                        Não tem uma conta? <b><Link href='/cadastro'><a>Cadastre-se</a></Link></b>
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}
