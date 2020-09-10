import React from 'react'
import { Flex, Box, Text, Button } from '@chakra-ui/core'
import { BsListCheck } from 'react-icons/bs'
import { MdAttachMoney, MdCardMembership } from 'react-icons/md'
import { useRouter } from 'next/router'

// import { Container } from './styles';
function MenuButton({ children, ...rest }) {
  return (
    <Button
      borderRadius="sm"
      backgroundColor="gray.600"
      color="green.300"
      m={1}
      _hover={{ backgroundColor: 'gray.300', color: 'green.600' }}
      _active={{ backgroundColor: 'green.300', color: 'gray.600' }}
      {...rest}
    >
      <Flex
        left={0}
        top={0}
        bottom={0}
        position="absolute"
        align="center"
        justify="center"
        pl={4}
      >
        {children}
      </Flex>
    </Button>
  )
}

const MenuAdmin: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Flex
        flexDir="column"
        h="100vh"
        w="18%"
        d={['none', 'flex']}
        minW="180px"
        borderRightWidth={2}
        borderColor="green.300"
        backgroundColor="green.600"
      >
        <Text textAlign="center" mb={16}>
          A.A.A. Fúria
        </Text>
        <MenuButton
          isActive={router.query.param == 'pedidos' && true}
          onClick={() => router.push('[[...param]]', 'pedidos')}
        >
          <Box as={BsListCheck} mr={2} size={5} />
          Pedidos
        </MenuButton>
        <MenuButton
          isActive={router.query.param == 'financeiro' && true}
          onClick={() => router.push('[[...param]]', 'financeiro')}
        >
          <Box as={MdAttachMoney} mr={2} size={5} />
          Financeiro
        </MenuButton>
        <MenuButton
          isActive={router.query.param == 'associacoes' && true}
          onClick={() => {
            router.push('[[...param]]', 'associacoes')
          }}
        >
          <Box as={MdCardMembership} mr={2} size={5} />
          Associações
        </MenuButton>
        <MenuButton isDisabled>
          {
            //<Box as={BsListCheck} mr={2} size={5} />
          }
          Em breve
        </MenuButton>
      </Flex>
    </>
  )
}

export default MenuAdmin
