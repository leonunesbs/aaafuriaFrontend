import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import Head from 'next/head'
import InputMask from 'react-input-mask'
import {
  Heading,
  Flex,
  Image,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
  Divider,
  Skeleton,
} from '@chakra-ui/core'
import {
  AiOutlineUser,
  AiOutlineIdcard,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
  AiOutlineCamera,
  AiOutlineFieldNumber,
  AiOutlineNumber,
} from 'react-icons/ai'

import { TiGroupOutline } from 'react-icons/ti'
import Header from '../../components/Header'
import { useFetch } from '../../hooks/useFetch'
import api from '../../services/api'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import CarteirinhaSVG from '../../components/CarteirinhaSVG'
import { isAuthenticated } from '../../config/auth'

const CelularInputMask = ({ children, value, onChange, ...rest }) => (
  <InputMask mask="(99) 99999-9999" value={value} onChange={onChange} {...rest}>
    {() => children}
  </InputMask>
)
const CpfInputMask = ({ children, value, onChange, ...rest }) => (
  <InputMask mask="999.999.999-99" value={value} onChange={onChange} {...rest}>
    {() => children}
  </InputMask>
)

const CustomInput = ({ ident, type, placeholder, leftIcon, ...rest }) => {
  return (
    <FormControl mb={2} isRequired>
      <InputGroup>
        <InputLeftElement
          color="green.600"
          fontSize="1.2em"
          children={leftIcon}
        />
        <Input
          id={ident}
          type={type}
          h="45px"
          focusBorderColor="green.300"
          placeholder={placeholder}
          borderRadius="sm"
          _hover={{ borderColor: 'green.300' }}
          {...rest}
        />
      </InputGroup>
    </FormControl>
  )
}

const SejaSócio: React.FC = () => {
  const router = useRouter()
  const [matrícula, setMatrícula] = useState('')
  const handleMatrícula = (e: ChangeEvent<HTMLInputElement>) =>
    setMatrícula(e.target.value)

  const [turma, setTurma] = useState('')
  const handleTurma = (e: ChangeEvent<HTMLInputElement>) =>
    setTurma(e.target.value)

  const [nome, setNome] = useState('')
  const handleNome = (e: ChangeEvent<HTMLInputElement>) =>
    setNome(e.target.value.toUpperCase())

  const [email, setEmail] = useState('')
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const [celular, setCelular] = useState('')
  const handleCelular = (e: ChangeEvent<HTMLInputElement>) =>
    setCelular(e.target.value)

  const [birth, setBirth] = useState('')
  const handleBirth = (e: ChangeEvent<HTMLInputElement>) =>
    setBirth(e.target.value)

  const [cpf, setCpf] = useState('')
  const handleCpf = (e: ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)

  const [foto, setFoto]: any = useState('')
  const handleFoto = (e: any) => setFoto(e.target.files[0])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  })

  const handleSejaSócio = () => {
    const data = new FormData()
    data.append('matrícula', matrícula)
    data.append('turma', turma)
    data.append('nome_completo', nome)
    data.append('email', email)
    data.append('celular', celular)
    data.append('data_de_nascimento', birth)

    const response = api.post('core/api/seja-socio/', data)
  }

  const handleStart = async () => {
    setLoading(true)
    router.push('[[...param]]', 'start')
    const response: any = await api.get('core/api/seja-socio/')
    if (response.ok) {
      setMatrícula(response.data.matrícula)
      setTurma(response.data.turma)
      setNome(response.data.nome_completo)
      setEmail(response.data.email)
      setCelular(response.data.celular)
      setBirth(response.data.data_de_nascimento)
    }
    console.log(response.data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Seja Sócio - @aaafuria</title>
        <meta
          name="description"
          content="Seja Sócio da @aaafuria, a maior do Piauí!"
        ></meta>
      </Head>
      <Header />
      <Flex
        borderRadius="md"
        borderWidth="1px"
        m={6}
        mb={16}
        overflow="hidden"
        flexWrap="wrap"
        mt={16}
      >
        <Image
          maxH={['340px', '100%']}
          w={['100%', '100%', '100%', '65%']}
          objectFit="cover"
          src="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/sejasocio_bg.png"
        />
        <Flex flexDir="column" flexGrow={1} p={6} justify="center">
          <Heading color="green.600" mb={6}>
            Seja Sócio
          </Heading>

          <form>
            <Skeleton isLoaded={!loading}>
              {!router.query.param && (
                <Button
                  borderRadius="sm"
                  backgroundColor="green.300"
                  color="#fff"
                  h="45px"
                  w="100%"
                  onClick={handleStart}
                >
                  Começar
                </Button>
              )}

              {router.query.param == 'start' && (
                <>
                  <CarteirinhaSVG
                    nome={nome}
                    matrícula={matrícula}
                    birth={birth}
                    turma={turma}
                    cpf={cpf}
                  />
                  <Box mt={6} />

                  <CustomInput
                    // isDisabled
                    ident="nome"
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={handleNome}
                    leftIcon={<Box as={AiOutlineUser} />}
                  />
                  <CustomInput
                    // isDisabled
                    ident="matrícula"
                    type="text"
                    placeholder="Matrícula"
                    value={matrícula}
                    onChange={handleMatrícula}
                    leftIcon={<Box as={AiOutlineNumber} />}
                  />
                  <CustomInput
                    // isDisabled
                    ident="turma"
                    type="text"
                    placeholder="Turma"
                    value={turma}
                    onChange={handleTurma}
                    leftIcon={<Box as={TiGroupOutline} />}
                  />
                  <CustomInput
                    // isDisabled
                    ident="nascimento"
                    type="date"
                    placeholder="Data de nascimento"
                    value={birth}
                    onChange={handleBirth}
                    leftIcon={<Box as={AiOutlineCalendar} />}
                  />

                  <CpfInputMask value={cpf} onChange={handleCpf}>
                    <CustomInput
                      ident="cpf"
                      type="text"
                      placeholder="CPF"
                      leftIcon={<Box as={AiOutlineIdcard} />}
                    />
                  </CpfInputMask>

                  <CustomInput
                    // isDisabled
                    ident="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    leftIcon={<Box as={AiOutlineMail} />}
                  />
                  <CelularInputMask value={celular} onChange={handleCelular}>
                    <CustomInput
                      ident="celular"
                      type="tel"
                      placeholder="Celular"
                      leftIcon={<Box as={AiOutlinePhone} />}
                    />
                  </CelularInputMask>
                  <CustomInput
                    ident="foto"
                    type="file"
                    placeholder="Foto"
                    value={foto}
                    onChange={handleFoto}
                    leftIcon={<Box as={AiOutlineCamera} />}
                  />
                  <Divider mt={4} />

                  <Flex>
                    <Button
                      type="submit"
                      w="100%"
                      borderRadius="sm"
                      backgroundColor="gray.500"
                      color="#fff"
                      h="45px"
                      mr={1}
                    >
                      SEMESTRAL
                    </Button>
                    <Button
                      type="submit"
                      w="100%"
                      borderRadius="sm"
                      backgroundColor="green.600"
                      color="#fff"
                      h="45px"
                      ml={1}
                      onClick={() => router.push('[[...param]]', 'review')}
                    >
                      ANUAL
                    </Button>
                  </Flex>
                </>
              )}
              {router.query.param == 'review' && (
                <>
                  <CarteirinhaSVG
                    nome={nome}
                    matrícula={matrícula}
                    birth={birth}
                    turma={turma}
                    cpf={cpf}
                  />
                </>
              )}
            </Skeleton>
          </form>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}

export default SejaSócio
