import {
  Text,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  useToast,
} from '@chakra-ui/core'
import { Form } from '@unform/web'
import { error } from 'console'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import api from '../../services/api'
import GeneralInput from '../GeneralInput'
import InputMask from '../InputMask'

// import { Container } from './styles';

interface Props {
  isOpen: any
  btnRef: any
}

const CadastroDrawer: React.FC<Props> = ({ isOpen, btnRef }) => {
  const router = useRouter()

  const cadastroFormRef = useRef(null)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [digitando, setDigitando] = useState(true)

  const [recuperado, setRecuperado] = useState(false)

  const [isSócio, setIsSócio] = useState(false)

  const toast = useToast()

  const handleLoadData = async () => {
    setLoading(true)
    const response: any = await api
      .create()
      .get(
        `https://aaafuria.herokuapp.com/api/get-socio-data/${cadastroFormRef.current.getFieldValue(
          'matrícula'
        )}`
      )
    if (response.ok) {
      setIsSócio(response.data.is_socio)
      cadastroFormRef.current.setData({
        nome: response.data.nome_completo.toUpperCase(),
        email: response.data.email,
        celular: response.data.celular,
        turma: response.data.turma,
        birth: response.data.data_de_nascimento,
      })
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
    setDigitando(false)
    setRecuperado(true)
    setLoading(false)
  }

  const handleSubmit = async (data: {
    nome: string | Blob
    email: string | Blob
    matrícula: string | Blob
    turma: string | Blob
    senha: string | Blob
    senhaAgain: string | Blob
    celular: string | Blob
    birth: string | Blob
  }) => {
    setLoading(true)
    setError(null)

    const response: any = await api.create().post('core/api/cadastro/', {
      nome: data.nome,
      email: data.email,
      matrícula: data.matrícula,
      turma: data.turma,
      senha: data.senha,
      senha_again: data.senhaAgain,
      celular: data.celular,
      data_de_nascimento: data.birth,
      is_sócio: JSON.stringify(isSócio),
    })

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

  const resetData = () => {
    cadastroFormRef.current.reset()
    setRecuperado(false)
  }
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      size="full"
      onClose={() => router.back()}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cadastre-se!</DrawerHeader>

        <DrawerBody>
          <Form onSubmit={handleSubmit} ref={cadastroFormRef}>
            <Flex
              alignSelf="center"
              borderColor="#ededed"
              flexDir="column"
              borderWidth={1}
              borderRadius="md"
              p={4}
            >
              <FormControl flexGrow={1} isRequired>
                <GeneralInput
                  name="matrícula"
                  placeholder="Matrícula"
                  maxLength={8}
                  rIcon={
                    <Button
                      h="1.75rem"
                      size="sm"
                      backgroundColor="green.600"
                      borderRadius="sm"
                      color="#fff"
                      fontSize={['xs', 'sm']}
                      isLoading={loading ? true : false}
                      onClick={handleLoadData}
                    >
                      {'Recuperar'}
                    </Button>
                  }
                />
              </FormControl>

              <FormControl flexGrow={1} isRequired>
                <GeneralInput
                  name="nome"
                  placeholder="Nome completo"
                  isDisabled={
                    digitando ? true : false || loading ? true : false
                  }
                />
              </FormControl>
              <FormControl flexGrow={1} isRequired>
                <GeneralInput
                  name="email"
                  placeholder="Email"
                  isDisabled={
                    digitando ? true : false || loading ? true : false
                  }
                />
              </FormControl>

              <Flex flexWrap="wrap">
                <FormControl flexGrow={1} isRequired>
                  <InputMask
                    name="celular"
                    mask="(99) 99999-9999"
                    isDisabled={
                      digitando ? true : false || loading ? true : false
                    }
                    placeholder="Celular"
                  />
                </FormControl>
                <FormControl flexGrow={1} mr={[0, 2]} ml={[0, 2]} isRequired>
                  <GeneralInput
                    type="date"
                    name="birth"
                    isDisabled={
                      digitando ? true : false || loading ? true : false
                    }
                  />
                </FormControl>
                <FormControl flexGrow={1} isRequired>
                  <GeneralInput
                    name="turma"
                    placeholder="Turma"
                    maxLength={2}
                    isDisabled={
                      digitando ? true : false || loading ? true : false
                    }
                  />
                </FormControl>
              </Flex>
              <Flex>
                <FormControl flexGrow={1} isRequired>
                  <GeneralInput
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    isDisabled={
                      digitando ? true : false || loading ? true : false
                    }
                  />
                </FormControl>
                <Box w={2} />
                <FormControl flexGrow={1} isRequired>
                  <GeneralInput
                    type="password"
                    name="senhaAgain"
                    placeholder="Senha (novamente)"
                    isDisabled={
                      digitando ? true : false || loading ? true : false
                    }
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
          </Form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CadastroDrawer
