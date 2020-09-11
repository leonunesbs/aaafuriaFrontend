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
  Stack,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  Text,
} from '@chakra-ui/core'
import {
  AiOutlineUser,
  AiOutlineIdcard,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
  AiOutlineCamera,
  AiOutlineNumber,
} from 'react-icons/ai'

import { TiGroupOutline } from 'react-icons/ti'
import Header from '../../components/Header'
import api from '../../services/api'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import CarteirinhaSVG from '../../components/CarteirinhaSVG'
import { isAuthenticated } from '../../config/auth'
import { CgArrowsExchange } from 'react-icons/cg'
import { BsCreditCard } from 'react-icons/bs'
import SócioGate from './_sócioGate'

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

const CustomInput = ({
  ident,
  type,
  placeholder,
  leftIcon,
  loading,
  ...rest
}) => {
  return (
    <FormControl mb={2} isRequired isDisabled={loading}>
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

  const [pk, setPk] = useState()

  const [matrícula, setMatrícula] = useState('')
  const handleMatrícula = (e: ChangeEvent<HTMLInputElement>) =>
    setMatrícula(e.target.value)

  const [turma, setTurma] = useState('')
  const handleTurma = (e: ChangeEvent<HTMLInputElement>) =>
    setTurma(e.target.value)

  const [nomeCompleto, setNome] = useState('')
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

  const [foto, setFoto]: any = useState(undefined)
  const handleFoto = (e: any) => setFoto(e.target.files[0])

  const [comprovante, setComprovante]: any = useState(undefined)
  const handleComprovante = (e: any) => setComprovante(e.target.files[0])

  const [categoria, setCategoria] = useState('')

  const [formaPagamento, setPagamento] = useState('')

  const [contaDestino, setContaDestino] = useState('')
  const handleContaDestino = (e: ChangeEvent<HTMLInputElement>) =>
    setContaDestino(e.target.value)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [valores, setValores] = useState({
    primeira: 0,
    reassociação: 0,
  })

  useEffect(() => {
    !isAuthenticated() && router.push('/login')
  }, [])

  useEffect(() => {}, [formaPagamento])

  const handleSejaSócio = async (categoria: string) => {
    setLoading(true)

    const data = new FormData()
    data.append('matrícula', matrícula)
    data.append('turma', turma)
    data.append('nome_completo', nomeCompleto)
    data.append('email', email)
    data.append('celular', celular)
    data.append('cpf', cpf)
    data.append('data_de_nascimento', birth)
    data.append('categoria', categoria)
    data.append('foto', foto)
    const responseSejaSócio: any = await api.post('core/api/seja-socio/', data)
    if (responseSejaSócio.ok) {
      setMatrícula(responseSejaSócio.data.matrícula)
      setTurma(responseSejaSócio.data.turma)
      setNome(responseSejaSócio.data.nome_completo)
      setEmail(responseSejaSócio.data.email)
      setCelular(responseSejaSócio.data.celular)
      setBirth(responseSejaSócio.data.data_de_nascimento)
      setFoto(responseSejaSócio.data.foto)
      setCpf(responseSejaSócio.data.cpf)
      setPk(responseSejaSócio.data.pk)
      setCategoria(categoria)
      router.push('[[...param]]', 'review')

      const responseAssociaçãoCategoria: any = await api.get(
        `core/api/get-associacao-category/${categoria}/`
      )
      if (responseAssociaçãoCategoria.ok) {
        setValores({
          primeira: responseAssociaçãoCategoria.data.primeira,
          reassociação: responseAssociaçãoCategoria.data.reassociação,
        })
        console.log(responseAssociaçãoCategoria.data)
      }
    } else {
      setError(responseSejaSócio.data.error)
    }
    setLoading(false)
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

      setFoto(response.data.foto || '')
      setCpf(response.data.cpf || '')
    }
    setLoading(false)
  }

  const handleAssociação = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append('comprovante', comprovante)
    data.append('categoria', categoria)
    data.append('conta_destino', contaDestino)
    const response: any = await api.post('core/api/create-associacao/', data)
    if (response.ok) {
      router.reload()
    }
    setLoading(false)
  }
  return (
    <SócioGate>
      <Head>
        <title>Seja Sócio - @aaafuria</title>
        <meta
          name="description"
          content="Seja Sócio da A.A.A. Fúria! Venha fazer parte da nossa História."
        />
      </Head>
      <Header />
      <Flex
        borderRadius="md"
        borderWidth="1px"
        m={6}
        mb={16}
        overflow="hidden"
        flexWrap="wrap"
        backgroundColor="#fff"
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
                <CustomInput
                  // isDisabled
                  ident="nome"
                  type="text"
                  placeholder="Nome"
                  loading={loading}
                  value={nomeCompleto}
                  onChange={handleNome}
                  leftIcon={<Box as={AiOutlineUser} />}
                />
                <CustomInput
                  // isDisabled
                  ident="matrícula"
                  type="text"
                  loading={loading}
                  placeholder="Matrícula"
                  value={matrícula}
                  onChange={handleMatrícula}
                  leftIcon={<Box as={AiOutlineNumber} />}
                />
                <CustomInput
                  // isDisabled
                  ident="turma"
                  type="text"
                  loading={loading}
                  placeholder="Turma"
                  value={turma}
                  onChange={handleTurma}
                  leftIcon={<Box as={TiGroupOutline} />}
                />
                <CustomInput
                  // isDisabled
                  ident="nascimento"
                  type="date"
                  loading={loading}
                  placeholder="Data de nascimento"
                  value={birth}
                  onChange={handleBirth}
                  leftIcon={<Box as={AiOutlineCalendar} />}
                />

                <CpfInputMask value={cpf} onChange={handleCpf}>
                  <CustomInput
                    ident="cpf"
                    loading={loading}
                    type="text"
                    placeholder="CPF"
                    leftIcon={<Box as={AiOutlineIdcard} />}
                  />
                </CpfInputMask>

                <CustomInput
                  // isDisabled
                  ident="email"
                  type="email"
                  loading={loading}
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                  leftIcon={<Box as={AiOutlineMail} />}
                />
                <CelularInputMask value={celular} onChange={handleCelular}>
                  <CustomInput
                    ident="celular"
                    type="tel"
                    loading={loading}
                    placeholder="Celular"
                    leftIcon={<Box as={AiOutlinePhone} />}
                  />
                </CelularInputMask>
                <CustomInput
                  ident="foto"
                  type="file"
                  loading={loading}
                  placeholder="Foto"
                  onChange={handleFoto}
                  leftIcon={<Box as={AiOutlineCamera} />}
                />
                <Divider mt={4} />
                <Text textAlign="center" color="green.600">
                  {error}
                </Text>
                <Flex>
                  <Button
                    w="100%"
                    borderRadius="sm"
                    backgroundColor="gray.500"
                    color="#fff"
                    h="45px"
                    mr={1}
                    onClick={() => handleSejaSócio('S')}
                  >
                    SEMESTRAL
                  </Button>
                  <Button
                    w="100%"
                    borderRadius="sm"
                    backgroundColor="green.600"
                    color="#fff"
                    h="45px"
                    ml={1}
                    onClick={() => handleSejaSócio('A')}
                  >
                    ANUAL
                  </Button>
                </Flex>
              </>
            )}
            {router.query.param == 'review' && (
              <>
                <CarteirinhaSVG
                  pk={pk}
                  nome={nomeCompleto}
                  birth={birth}
                  cpf={cpf}
                  foto={foto}
                  turma={turma}
                  matrícula={matrícula}
                  categoria={categoria}
                />
                <Flex flexDir="column" mt={6}>
                  <Text color="green.600" fontWeight="bold">
                    Primeira associação: R${valores.primeira}
                  </Text>
                  <Text color="green.600" fontWeight="bold">
                    Reassociação: R${valores.reassociação}
                  </Text>
                  {/* <Heading
                    as="h4"
                    size="sm"
                    mb={4}
                    color="green.600"
                    textAlign="center"
                  >
                    Pagamento
                  </Heading> */}
                  <FormControl isRequired isDisabled={loading} mt={4}>
                    <Stack
                      isInline
                      align="center"
                      justify="center"
                      flexWrap="wrap"
                    >
                      <Button
                        mb={2}
                        borderRadius="sm"
                        backgroundColor="gray.500"
                        color="#fff"
                        onClick={() => setPagamento('TR')}
                        isActive={formaPagamento == 'TR' ? true : false}
                        _active={{
                          backgroundColor: 'green.300',
                          color: 'gray.500',
                        }}
                        _hover={{
                          backgroundColor: 'gray.300',
                          color: 'green.600',
                        }}
                        _focus={{}}
                      >
                        <Box as={CgArrowsExchange} mr={1} size={5} />
                        Transferência
                      </Button>
                      <Button
                        mb={2}
                        borderRadius="sm"
                        backgroundColor="gray.500"
                        color="#fff"
                        onClick={() => setPagamento('ST')}
                        isDisabled
                        _active={{
                          backgroundColor: 'green.300',
                          color: 'gray.500',
                        }}
                        _hover={{
                          backgroundColor: 'gray.300',
                          color: 'green.600',
                        }}
                        _focus={{}}
                      >
                        <Box as={BsCreditCard} mr={2} size={4} />
                        Cartão de crédito
                      </Button>
                    </Stack>
                    {formaPagamento == 'TR' && (
                      <FormHelperText id="pagamento" maxW={['400px']}>
                        <b>Santander</b> [Agência: 4326, Conta: 01050635-9, Iago
                        Antunes Macedo de Souza, 025.449.773-02],
                        <br />
                        <b>Branco do Brasil</b> [Agência: 3507-6, Conta:
                        33266-6, Iago Antune Macedo de Souza, 025.449.773-02],
                        <br />
                        <b>Caixa Econômica</b> [Agência: 0728, Op: 13, Conta:
                        102903-7, Albérico Santana S Amorim G]
                      </FormHelperText>
                    )}
                  </FormControl>
                  {formaPagamento == 'TR' && (
                    <Flex flexDir="column">
                      <form onSubmit={handleAssociação}>
                        <Heading
                          size="md"
                          as="h4"
                          mb={6}
                          mt={6}
                          color="green.600"
                        >
                          Dados da transferência
                        </Heading>
                        <FormControl
                          as="fieldset"
                          isRequired
                          isDisabled={loading}
                        >
                          <FormLabel as="legend">Conta destino</FormLabel>
                          <RadioGroup
                            value={contaDestino}
                            onChange={handleContaDestino}
                          >
                            <Radio variantColor="green" value="BB">
                              Banco do Brasil
                            </Radio>
                            <Radio variantColor="green" value="CX">
                              Caixa Econômica
                            </Radio>
                            <Radio variantColor="green" value="ST">
                              Santander
                            </Radio>
                          </RadioGroup>
                        </FormControl>
                        <FormControl mt={4} isRequired isDisabled={loading}>
                          <FormLabel as="legend">Comprovante</FormLabel>
                          <Input
                            focusBorderColor="green.600"
                            type="file"
                            borderRadius="sm"
                            onChange={handleComprovante}
                          />
                        </FormControl>
                        <Flex>
                          <Button
                            isDisabled={loading}
                            type="submit"
                            borderRadius="sm"
                            backgroundColor="green.300"
                            color="#fff"
                            w="100%"
                            m={1}
                          >
                            Finalizar
                          </Button>
                        </Flex>
                      </form>
                    </Flex>
                  )}
                  <Button
                    isDisabled={loading}
                    onClick={() => router.back()}
                    borderRadius="sm"
                    backgroundColor="gray.500"
                    color="#fff"
                    w="100%"
                    mt={6}
                  >
                    Voltar
                  </Button>
                </Flex>
              </>
            )}
          </Skeleton>
        </Flex>
      </Flex>
      <Footer />
    </SócioGate>
  )
}

export default SejaSócio
