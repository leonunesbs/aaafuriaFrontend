import React, { useRef } from 'react'
import {
  Button,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  DrawerFooter,
  useDisclosure,
} from '@chakra-ui/core'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsListCheck } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { MdAttachMoney, MdCardMembership } from 'react-icons/md'

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

const DrawerMenuAdmin: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const router = useRouter()

  return (
    <>
      <Button
        ref={btnRef}
        as={Button}
        p={0}
        backgroundColor="gray.600"
        borderWidth="1px"
        borderColor="green.300"
        onClick={onOpen}
        borderRadius="sm"
        _hover={{ backgroundColor: 'green.300' }}
        _active={{ backgroundColor: 'green.600' }}
      >
        <Box as={GiHamburgerMenu} size={6} m={0} p={0} color="#fff" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dashboard</DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column">
              <MenuButton
                isActive={router.query.param == 'pedidos' && true}
                onClick={() => {
                  router.push('[[...param]]', 'pedidos')
                  onClose()
                }}
              >
                <Box as={BsListCheck} mr={2} size={5} />
                Pedidos
              </MenuButton>
              <MenuButton
                isActive={router.query.param == 'financeiro' && true}
                onClick={() => {
                  router.push('[[...param]]', 'financeiro')
                  onClose()
                }}
              >
                <Box as={MdAttachMoney} mr={2} size={5} />
                Fianceiro
              </MenuButton>
              <MenuButton
                isActive={router.query.param == 'associacoes' && true}
                onClick={() => {
                  router.push('[[...param]]', 'associacoes')
                  onClose()
                }}
              >
                <Box as={MdCardMembership} mr={2} size={5} />
                Associações
              </MenuButton>
            </Flex>
          </DrawerBody>

          <DrawerFooter>@aaafuria</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerMenuAdmin
