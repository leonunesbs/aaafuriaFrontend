import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  Heading,
  Box,
  Flex,
  Image,
  Input,
  Button,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  InputRightElement,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/core'

import { MdPerson, MdLock } from 'react-icons/md'
import { FiLogIn } from 'react-icons/fi'
import { authenticate, isAuthenticated } from '../config/auth'
import Head from 'next/head'
import api from '../services/api'

export default function Login() {
  const router = useRouter()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const firstField = useRef()
  const firstFieldLogin: any = useRef()

  const [errorLogin, setErrorLogin] = useState(null)
  const [error, setError] = useState(null)

  // Login
  const [matrículaLogin, setMatrículaLogin] = useState('')
  const handleMatrículaLogin = (event: any) =>
    setMatrículaLogin(event.target.value)
  const [senhaLogin, setSenhaLogin] = useState('')
  const handleSenhaLogin = (event: any) => setSenhaLogin(event.target.value)
  // FIM LOGIN

  // CADASTRO
  const [nome, setNome] = useState('')
  const handleNome = (event: any) => setNome(event.target.value.toUpperCase())

  const [birth, setBirth] = useState('')
  const handleBirth = (event: any) => setBirth(event.target.value)

  const [isSócio, setIsSócio] = useState(false)

  const [email, setEmail] = useState('')
  const handleEmail = (event: any) => setEmail(event.target.value)

  const [matrícula, setMatrícula] = useState('')
  const handleMatrícula = (event: any) => setMatrícula(event.target.value)

  const [turma, setTurma] = useState('')
  const handleTurma = (event: any) => setTurma(event.target.value)

  const [senha, setSenha] = useState('')
  const handleSenha = (event: any) => setSenha(event.target.value)

  const [senhaAgain, setSenhaAgain] = useState('')
  const handleSenhaAgain = (event: any) => setSenhaAgain(event.target.value)

  const [loading, setLoading] = useState(false)

  const [digitando, setDigitando] = useState(true)

  useEffect(() => {
    if (matrícula.length == 8) setDigitando(false)
    else setDigitando(true)
  }, [matrícula])

  useEffect(() => {
    if (firstFieldLogin.current) {
      firstFieldLogin.current.focus()
    }
    if (matrícula.length == 8) setDigitando(false)
    else setDigitando(true)
  }, [])

  const handleLoadData = async () => {
    setLoading(true)
    const response: any = await api.get(
      `https://aaafuria.herokuapp.com/api/get-socio-data/${matrícula}`
    )
    if (response.data) {
      setNome(
        response.data.nome_completo && response.data.nome_completo.toUpperCase()
      )
      setEmail(response.data.email)
      setTurma(response.data.turma)
      setBirth(response.data.data_de_nascimento)
      setIsSócio(response.data.is_socio)
    }
    setLoading(false)

    if (response.ok != '') {
      toast({
        position: 'top',
        title: 'Sócio Fúria!',
        description:
          'Recuperamos alguns dos seus dados pra facilitar seu cadastro',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    const response: any = await api.post('cadastro/', {
      nome: nome,
      email: email,
      matrícula: matrícula,
      turma: turma,
      senha: senha,
      senha_again: senhaAgain,
      data_de_nascimento: birth,
      is_sócio: isSócio,
    })

    if (response.ok) {
      if (response.data.token) {
        localStorage.setItem('Token', response.data.token)
      }
      toast({
        position: 'bottom',
        title: 'Seja bem vindo, Furioso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    setError(response.data.error)
    setLoading(false)
  }
  // FIM CADASTRO

  const [loadingLogin, setLoadingLogin] = useState(false)

  async function handleLogin() {
    setLoadingLogin(true)
    setErrorLogin(null)
    const response: any = await authenticate(matrículaLogin, senhaLogin)
    if (response.ok) {
      router.push('/')
    } else {
      setErrorLogin(response.data.error)
    }
    setLoadingLogin(false)
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
  })

  return (
    <>
      <Head>
        <title>Login - @aaafuria</title>
      </Head>
      <Flex
        flexWrap="wrap"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        px={5}
      >
        <Flex
          flexDir="column"
          width={['250px', '50%', '50%', '480px']}
          alignItems="flex-start"
        >
          <Image
            src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_light.svg"
            alt="logo_light"
            height="90px"
            onClick={() => router.push('/')}
            cursor="pointer"
          />
          <Heading
            fontSize={['lg', '2xl', '3xl']}
            marginTop={15}
            textAlign={['center', 'left']}
            color="gray.500"
          >
            Faça seu login na plataforma
          </Heading>
        </Flex>
        <Flex
          flexDir="column"
          width={['100%', '50%', '50%', '480px']}
          backgroundColor="green.600"
          borderRadius="md"
          alignItems="stretch"
          padding={[10, 16]}
        >
          <InputGroup>
            <InputLeftElement
              children={<Box as={MdPerson} size={5} color="gray.300" />}
            />
            <Input
              ref={firstFieldLogin}
              value={matrículaLogin}
              onChange={handleMatrículaLogin}
              placeholder="Matrícula"
              height="45px"
              borderRadius="sm"
              focusBorderColor="green.300"
              isDisabled={loadingLogin}
            />
          </InputGroup>
          <InputGroup marginTop={2}>
            <InputLeftElement
              children={<Box as={MdLock} size={5} color="gray.300" />}
            />
            <Input
              value={senhaLogin}
              onChange={handleSenhaLogin}
              type="password"
              placeholder="Senha"
              height="45px"
              borderRadius="sm"
              focusBorderColor="green.300"
              isDisabled={loadingLogin}
            />
          </InputGroup>

          <Button
            backgroundColor="green.300"
            isLoading={loadingLogin}
            loadingText="Entrando..."
            height="45px"
            borderRadius="sm"
            marginTop={6}
            color="#fff"
            _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
            onClick={handleLogin}
            leftIcon={FiLogIn}
          >
            Entrar
          </Button>
          <Text
            alignSelf="center"
            color="white"
            fontWeight="bold"
            mt={1}
            fontSize="sm"
          >
            {errorLogin}
          </Text>

          <Flex alignSelf="center" fontSize="sm">
            <Text color="gray.300">Não consegue acessar? </Text>
            <Text
              ref={btnRef}
              color="gray.300"
              ml={1}
              onClick={onOpen}
              cursor="pointer"
            >
              <b>Clique aqui</b>.
            </Text>
          </Flex>

          <Drawer
            isOpen={isOpen}
            placement="bottom"
            size="full"
            onClose={onClose}
            finalFocusRef={btnRef}
            initialFocusRef={firstField}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Cadastre-se!</DrawerHeader>

              <DrawerBody>
                <Flex
                  alignSelf="center"
                  borderColor="#ededed"
                  flexDir="column"
                  borderWidth={1}
                  borderRadius="md"
                  p={4}
                >
                  <FormControl flexGrow={1}>
                    <FormLabel htmlFor="matrícula" fontSize={['sm', 'md']}>
                      Matrícula
                    </FormLabel>

                    <InputGroup size="md">
                      <Input
                        ref={firstField}
                        type="text"
                        id="matrícula"
                        aria-describedby="matrícula"
                        focusBorderColor="green.300"
                        borderRadius="sm"
                        _hover={{ borderColor: 'green.300' }}
                        isRequired
                        maxLength={8}
                        value={matrícula}
                        onChange={handleMatrícula}
                        isDisabled={loading ? true : false}
                      />
                      <InputRightElement width={['4.25rem', '4.75rem']} mr={2}>
                        <Button
                          h="1.75rem"
                          size="sm"
                          backgroundColor="green.600"
                          borderRadius="sm"
                          color="#fff"
                          fontSize={['xs', 'sm']}
                          isLoading={loading ? true : false}
                          onClick={handleLoadData}
                          isDisabled={digitando}
                        >
                          {'Recuperar'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl flexGrow={1}>
                    <FormLabel htmlFor="nome" fontSize={['sm', 'md']}>
                      Nome
                    </FormLabel>
                    <Input
                      type="text"
                      id="nome"
                      aria-describedby="nome"
                      focusBorderColor="green.300"
                      borderRadius="sm"
                      _hover={{ borderColor: 'green.300' }}
                      isDisabled={loading ? true : false}
                      value={nome}
                      onChange={handleNome}
                    />
                  </FormControl>

                  <Flex flexWrap="wrap">
                    <FormControl flexGrow={1}>
                      <FormLabel htmlFor="email" fontSize={['sm', 'md']}>
                        Email
                      </FormLabel>
                      <Input
                        type="email"
                        id="email"
                        aria-describedby="email"
                        focusBorderColor="green.300"
                        borderRadius="sm"
                        _hover={{ borderColor: 'green.300' }}
                        isDisabled={loading ? true : false}
                        value={email}
                        onChange={handleEmail}
                      />
                    </FormControl>
                    <FormControl flexGrow={1} mr={[0, 4]} ml={[0, 4]}>
                      <FormLabel htmlFor="birth" fontSize={['sm', 'md']}>
                        Data de nascimento
                      </FormLabel>
                      <Input
                        type="date"
                        id="birth"
                        aria-describedby="birth"
                        focusBorderColor="green.300"
                        borderRadius="sm"
                        _hover={{ borderColor: 'green.300' }}
                        isDisabled={loading ? true : false}
                        value={birth}
                        onChange={handleBirth}
                      />
                    </FormControl>
                    <FormControl flexGrow={1}>
                      <FormLabel htmlFor="turma" fontSize={['sm', 'md']}>
                        Turma
                      </FormLabel>
                      <NumberInput>
                        <NumberInputField
                          type="number"
                          id="turma"
                          focusBorderColor="green.300"
                          borderRadius="sm"
                          _hover={{ borderColor: 'green.300' }}
                          maxLength={2}
                          isDisabled={loading ? true : false}
                          value={turma}
                          onChange={handleTurma}
                        />
                      </NumberInput>
                    </FormControl>
                  </Flex>
                  <Flex mt={4}>
                    <FormControl flexGrow={1}>
                      <FormLabel htmlFor="senha" fontSize={['sm', 'md']}>
                        Senha
                      </FormLabel>
                      <Input
                        type="password"
                        id="senha"
                        aria-describedby="senha"
                        focusBorderColor="green.300"
                        borderRadius="sm"
                        _hover={{ borderColor: 'green.300' }}
                        value={senha}
                        onChange={handleSenha}
                        isDisabled={loading ? true : false}
                      />
                    </FormControl>
                    <Box w={4} />
                    <FormControl flexGrow={1}>
                      <FormLabel htmlFor="senha_again" fontSize={['sm', 'md']}>
                        Senha (novamente)
                      </FormLabel>
                      <Input
                        type="password"
                        id="senha_again"
                        aria-describedby="senha_again"
                        focusBorderColor="green.300"
                        borderRadius="sm"
                        _hover={{ borderColor: 'green.300' }}
                        isDisabled={loading ? true : false}
                        value={senhaAgain}
                        onChange={handleSenhaAgain}
                      />
                    </FormControl>
                  </Flex>
                </Flex>
                {error != '' && (
                  <Text
                    textAlign="center"
                    color="green.600"
                    fontWeight="bold"
                    mt={1}
                    fontSize="sm"
                  >
                    {error}
                  </Text>
                )}
                <Flex mt={6} justifyContent="center" alignSelf="center">
                  <Button
                    h="45px"
                    w="100%"
                    borderRadius="sm"
                    backgroundColor="green.300"
                    color="#fff"
                    _hover={{ backgroundColor: 'green.600' }}
                    fontSize={['xs', 'sm', 'base']}
                    isLoading={loading ? true : false}
                    onClick={handleSubmit}
                  >
                    Finalizar cadastro
                  </Button>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </>
  )
}
