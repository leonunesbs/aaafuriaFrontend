import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { useRouter } from 'next/router'

import InputMask from 'react-input-mask'

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
  Link,
} from '@chakra-ui/core'

import { MdPerson, MdLock } from 'react-icons/md'
import { FiLogIn } from 'react-icons/fi'
import { authenticate, isAuthenticated } from '../config/auth'
import Head from 'next/head'
import api from '../services/api'

const CelularInput = ({ children, value, onChange, ...rest }) => (
  <InputMask mask="(99) 99999-9999" value={value} onChange={onChange} {...rest}>
    {() => children}
  </InputMask>
)

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

  const [celular, setCelular] = useState('')
  const handleCelular = (event: any) => setCelular(event.target.value)

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
    if (matrícula.length == 8) {
      setDigitando(false)
    } else {
      setDigitando(true)
    }
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
      setCelular(response.data.celular)
      setTurma(response.data.turma)
      setBirth(response.data.data_de_nascimento)
      setIsSócio(response.data.is_socio)
    }

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
    setLoading(false)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const data = new FormData()
    data.append('nome', nome)
    data.append('email', email)
    data.append('matrícula', matrícula)
    data.append('turma', turma)
    data.append('senha', senha)
    data.append('senha_again', senhaAgain)
    data.append('celular', celular)
    data.append('data_de_nascimento', birth)
    data.append('is_sócio', JSON.stringify(isSócio))
    const response: any = await api.post('core/api/cadastro/', data)

    if (response.ok) {
      if (response.data.token) {
        localStorage.setItem('aaafuria:Token', response.data.token)
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

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setLoadingLogin(true)
    setErrorLogin(null)
    const response: any = await authenticate(matrículaLogin, senhaLogin)
    if (response.ok) {
      router.push('/')
    } else {
      setErrorLogin(response.data.error)
      setLoadingLogin(false)
    }
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
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
          <Link href="/">
            <Image
              src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/logo_light.svg"
              alt="logo_light"
              height="90px"
              cursor="pointer"
            />
          </Link>

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
          <form onSubmit={handleLogin}>
            <Flex flexDir="column">
              <InputGroup>
                <InputLeftElement
                  children={<Box as={MdPerson} size={5} color="green.600" />}
                />
                <Input
                  id="username"
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
                  children={<Box as={MdLock} size={5} color="green.600" />}
                />
                <Input
                  id="password"
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
                type="submit"
                backgroundColor="green.300"
                isLoading={loadingLogin}
                loadingText="Entrando..."
                height="45px"
                borderRadius="sm"
                marginTop={6}
                color="#fff"
                _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
                leftIcon={FiLogIn}
              >
                Entrar
              </Button>
            </Flex>
          </form>
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
                <form onSubmit={handleSubmit}>
                  <Flex
                    alignSelf="center"
                    borderColor="#ededed"
                    flexDir="column"
                    borderWidth={1}
                    borderRadius="md"
                    p={4}
                  >
                    <FormControl flexGrow={1} isRequired>
                      <FormLabel htmlFor="username" fontSize={['sm', 'md']}>
                        Matrícula
                      </FormLabel>

                      <InputGroup size="md">
                        <Input
                          ref={firstField}
                          type="text"
                          id="username"
                          aria-describedby="username"
                          focusBorderColor="green.300"
                          borderRadius="sm"
                          _hover={{ borderColor: 'green.300' }}
                          isRequired
                          maxLength={8}
                          value={matrícula}
                          onChange={handleMatrícula}
                          isDisabled={loading ? true : false}
                        />
                        <InputRightElement
                          width={['4.25rem', '4.75rem']}
                          mr={2}
                        >
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

                    <FormControl flexGrow={1} isRequired>
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
                        isDisabled={
                          digitando ? true : false || loading ? true : false
                        }
                        value={nome}
                        onChange={handleNome}
                      />
                    </FormControl>
                    <FormControl flexGrow={1} isRequired>
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
                        isDisabled={
                          digitando ? true : false || loading ? true : false
                        }
                        value={email}
                        onChange={handleEmail}
                      />
                    </FormControl>

                    <Flex flexWrap="wrap">
                      <FormControl flexGrow={1} isRequired>
                        <FormLabel htmlFor="celular" fontSize={['sm', 'md']}>
                          Celular
                        </FormLabel>
                        <CelularInput value={celular} onChange={handleCelular}>
                          <Input
                            type="text"
                            id="celular"
                            aria-describedby="celular"
                            focusBorderColor="green.300"
                            borderRadius="sm"
                            _hover={{ borderColor: 'green.300' }}
                            isDisabled={
                              digitando ? true : false || loading ? true : false
                            }
                          />
                        </CelularInput>
                      </FormControl>
                      <FormControl
                        flexGrow={1}
                        mr={[0, 4]}
                        ml={[0, 4]}
                        isRequired
                      >
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
                          isDisabled={
                            digitando ? true : false || loading ? true : false
                          }
                          value={birth}
                          onChange={handleBirth}
                        />
                      </FormControl>
                      <FormControl flexGrow={1} isRequired>
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
                            isDisabled={
                              digitando ? true : false || loading ? true : false
                            }
                            value={turma}
                            onChange={handleTurma}
                          />
                        </NumberInput>
                      </FormControl>
                    </Flex>
                    <Flex mt={4}>
                      <FormControl flexGrow={1} isRequired>
                        <FormLabel htmlFor="password" fontSize={['sm', 'md']}>
                          Senha
                        </FormLabel>
                        <Input
                          type="password"
                          id="password"
                          aria-describedby="password"
                          focusBorderColor="green.300"
                          borderRadius="sm"
                          _hover={{ borderColor: 'green.300' }}
                          value={senha}
                          onChange={handleSenha}
                          isDisabled={
                            digitando ? true : false || loading ? true : false
                          }
                        />
                      </FormControl>
                      <Box w={4} />
                      <FormControl flexGrow={1} isRequired>
                        <FormLabel
                          htmlFor="senha_again"
                          fontSize={['sm', 'md']}
                        >
                          Senha (novamente)
                        </FormLabel>
                        <Input
                          type="password"
                          id="senha_again"
                          aria-describedby="senha_again"
                          focusBorderColor="green.300"
                          borderRadius="sm"
                          _hover={{ borderColor: 'green.300' }}
                          isDisabled={
                            digitando ? true : false || loading ? true : false
                          }
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
                      type="submit"
                      h="45px"
                      w="100%"
                      borderRadius="sm"
                      backgroundColor="green.300"
                      color="#fff"
                      _hover={{ backgroundColor: 'green.600' }}
                      fontSize={['xs', 'sm', 'base']}
                      isLoading={loading ? true : false}
                      loadingText="Quase lá..."
                    >
                      Finalizar cadastro
                    </Button>
                  </Flex>
                </form>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </>
  )
}
