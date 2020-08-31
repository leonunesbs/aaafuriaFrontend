import React, { useRef, useState, useEffect } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  NumberInput,
  NumberInputField,
  Box,
  useDisclosure,
} from '@chakra-ui/core'
import api from '../services/api'

const Cadastro: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState(null)

  // CADASTRO
  const [nome, setNome] = useState('')
  const handleNome = (event: any) => setNome(event.target.value.toUpperCase())

  const [birth, setBirth] = useState('')
  const handleBirth = (event: any) => setBirth(event.target.value)

  const [email, setEmail] = useState('')
  const handleEmail = (event: any) => setEmail(event.target.value)

  const [matricula, setMatricula] = useState('')
  const handleMatricula = (event: any) => setMatricula(event.target.value)

  const [turma, setTurma] = useState('')
  const handleTurma = (event: any) => setTurma(event.target.value)

  const [senha, setSenha] = useState('')
  const handleSenha = (event: any) => setSenha(event.target.value)

  const [senhaAgain, setSenhaAgain] = useState('')
  const handleSenhaAgain = (event: any) => setSenhaAgain(event.target.value)

  const [loading, setLoading] = useState(false)

  const [digitando, setDigitando] = useState(true)

  useEffect(() => {
    if (matricula.length == 8) setDigitando(false)
    else setDigitando(true)
  }, [matricula])

  useEffect(() => {
    if (matricula.length == 8) setDigitando(false)
    else setDigitando(true)
  }, [])

  const handleLoadData = async () => {
    setLoading(true)
    const response: any = await api.get(
      `https://aaafuria.herokuapp.com/api/get-socio-data/${matricula}`
    )
    if (response.data) {
      setNome(
        response.data.nome_completo && response.data.nome_completo.toUpperCase()
      )
      setEmail(response.data.email)
      setTurma(response.data.turma)
      setBirth(response.data.data_de_nascimento)
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
      matricula: matricula,
      turma: turma,
      senha: senha,
      senha_again: senhaAgain,
    })

    if (response.ok) {
      if (response.data.token) {
        localStorage.setItem('Token', response.data.token)
      }
    }
    setError(response.data.error)
    setLoading(false)
  }
  // FIM CADASTRO

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      size="full"
      onClose={onClose}
      finalFocusRef={btnRef}
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
              <FormLabel htmlFor="matricula" fontSize={['sm', 'md']}>
                Matrícula
              </FormLabel>

              <InputGroup size="md">
                <Input
                  type="text"
                  id="matricula"
                  aria-describedby="matricula"
                  focusBorderColor="green.300"
                  borderRadius="sm"
                  _hover={{ borderColor: 'green.300' }}
                  isRequired
                  maxLength={8}
                  value={matricula}
                  onChange={handleMatricula}
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
            <>
              <Text
                textAlign="center"
                color="green.600"
                fontWeight="bold"
                mt={1}
                fontSize="sm"
              >
                {error}
              </Text>
            </>
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
  )
}

export default Cadastro
