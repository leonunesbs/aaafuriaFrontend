import { Flex, Box, Button, Text, useDisclosure } from '@chakra-ui/core'
import { Form } from '@unform/web'
import { error } from 'console'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdPerson, MdLock } from 'react-icons/md'
import { authenticate } from '../../config/auth'
import CadastroDrawer from './CadastroDrawer'
import GeneralInput from '../GeneralInput'

const LoginBox: React.FC = () => {
  const router = useRouter()

  const [loadingLogin, setLoadingLogin] = useState(false)
  const [errorLogin, setErrorLogin] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const handleLogin = async (data: { matrícula: string; senha: string }) => {
    setLoadingLogin(true)
    const response: any = await authenticate(data.matrícula, data.senha)
    if (response.ok) {
      router.push('/')
    } else {
      setErrorLogin(response.data.error)
      setLoadingLogin(false)
    }
  }

  useEffect(() => {
    if (router.query.param == 'cadastro') {
      onOpen()
    } else {
      onClose()
    }
  }, [router])
  return (
    <Flex
      flexDir="column"
      width={['100%', '50%', '50%', '480px']}
      backgroundColor="green.600"
      borderRadius="md"
      alignItems="stretch"
      padding={[10, 16]}
    >
      <Form onSubmit={handleLogin}>
        <Flex flexDir="column">
          <GeneralInput
            name="matrícula"
            placeholder="Matrícula"
            lIcon={<Box as={MdPerson} size={5} color="green.600" />}
            isDisabled={loadingLogin}
          />
          <GeneralInput
            type="password"
            name="senha"
            lIcon={<Box as={MdLock} size={5} color="green.600" />}
            placeholder="Senha"
            isDisabled={loadingLogin}
          />

          <Button
            type="submit"
            backgroundColor="green.300"
            isLoading={loadingLogin}
            loadingText="Entrando..."
            height="45px"
            borderRadius="sm"
            marginTop={4}
            color="#fff"
            _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
            leftIcon={FiLogIn}
          >
            Entrar
          </Button>
        </Flex>
      </Form>
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
          onClick={() => router.push('[[...param]]', 'cadastro')}
          cursor="pointer"
        >
          <b>Clique aqui</b>.
        </Text>
      </Flex>
      <CadastroDrawer isOpen={isOpen} btnRef={btnRef} />
    </Flex>
  )
}

export default LoginBox
