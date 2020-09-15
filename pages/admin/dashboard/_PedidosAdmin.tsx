import React, { useState } from 'react'
import {
  Heading,
  Flex,
  Stack,
  Text,
  Box,
  Badge,
  Divider,
  Link,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/core'
import { useFetch } from '../../../hooks/useFetch'
import { AiOutlineClose, AiOutlineWhatsApp } from 'react-icons/ai'
import { CgNotes } from 'react-icons/cg'
import api from '../../../services/api'
import { useRouter } from 'next/router'

const CustomMenuButton = ({ children, ...rest }) => (
  <MenuButton {...rest}>{children}</MenuButton>
)

function MeuPedidoCard({ data, item, user, comprovante, ...rest }) {
  const router = useRouter()
  const [status, setStatus] = useState(item.status)

  const [isOpen, setIsOpen] = useState(null)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const handleStatus = async (s: string) => {
    setStatus('...')

    const response: any = await api.post('core/api/status-pedido-admin/', {
      pk: item.pk,
      status:
        (s == 'AGUARDANDO' && 'AG') ||
        (s == 'PROCESSANDO' && 'PR') ||
        (s == 'CONLUÍDO' && 'CC') ||
        (s == 'CANCELADO' && 'XX'),
    })
    if (!response.ok) {
      setStatus(s)
    } else {
      router.reload()
    }
  }
  return (
    <Box
      key={item.pk}
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="sm"
      {...rest}
    >
      <Heading fontSize="xl">{user.sócio.nome_completo}</Heading>
      <Flex align="center" mt={2}>
        {status == 'CANCELADO' ? (
          <Badge variantColor="red">CANCELADO</Badge>
        ) : (
          <Menu>
            <CustomMenuButton
              as={Badge}
              variantColor={
                (status == 'AGUARDANDO' && 'gray') ||
                (status == 'PROCESSANDO' && 'orange') ||
                (status == 'CONLUÍDO' && 'green') ||
                (status == 'CANCELADO' && 'red')
              }
            >
              {status}
            </CustomMenuButton>
            <MenuList>
              <MenuGroup title="Status">
                <MenuItem onClick={() => handleStatus('AGUARDANDO')}>
                  AGUARDANDO
                </MenuItem>
                <MenuItem onClick={() => handleStatus('PROCESSANDO')}>
                  PROCESSANDO
                </MenuItem>
                <MenuItem onClick={() => handleStatus('CONLUÍDO')}>
                  CONCLUIDO
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <Divider />
      <Flex>
        <Flex flexDir="column" w="70%" maxH="100px" flexWrap="wrap">
          {item.items.map((i) => (
            <Text key={i.pk}>
              {i.quantity}x {i.item} {i.size && ` - ${i.size}`}
            </Text>
          ))}
        </Flex>
        <Flex flexDir="column" w="50%" alignItems="flex-end">
          <Text fontWeight="bold">R${item.order_total}</Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex justify="flex-end">
        <Tooltip
          label="Ver comprovante"
          aria-label="Ver comprovante"
          hasArrow
          placement="top"
          ml={4}
        >
          <Flex ml={4}>
            <Link href={comprovante}>
              <Box as={CgNotes} color="green.600" size={6} />
            </Link>
          </Flex>
        </Tooltip>
        <Tooltip
          label="Contactar Whatsapp"
          aria-label="Contactar Whatsapp"
          hasArrow
          placement="top"
        >
          <Flex ml={4}>
            <Link
              isExternal
              href={`https://api.whatsapp.com/send?phone=55${user.sócio.celular.replace(
                /[^0-9]/g,
                ''
              )}`}
            >
              <Box as={AiOutlineWhatsApp} color="green.600" size={6} />
            </Link>
          </Flex>
        </Tooltip>
        <Tooltip
          label="Cancelar pedido"
          aria-label="Cancelar pedido"
          hasArrow
          placement="top"
        >
          <Flex ml={4}>
            <Box
              as={AiOutlineClose}
              color="red.500"
              cursor="pointer"
              size={6}
              onClick={() => setIsOpen(true)}
            />
          </Flex>
        </Tooltip>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancelar pedido
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja cancelar o pedido ID: {item.pk} de{' '}
              {user.sócio.nome_completo}? Esta ação não poderá ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} borderRadius="sm">
                Voltar
              </Button>
              <Button
                variantColor="red"
                onClick={() => {
                  onClose()
                  handleStatus('CANCELADO')
                }}
                ml={3}
                borderRadius="sm"
              >
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>
    </Box>
  )
}

const Pedidos: React.FC = () => {
  const [page, setPage] = useState(1)
  const pedidos: any = useFetch(`core/api/pedidos-admin/?page=${page}`)

  if (!pedidos.data) {
    ;<p>Carregando...</p>
  }
  return (
    <>
      <Heading
        as="h1"
        textAlign="center"
        mt={4}
        mb={6}
        size={'xl'}
        color="green.600"
      >
        Pedidos
      </Heading>
      <Flex
        w="95%"
        mx="25%"
        minH="240px"
        alignSelf="center"
        borderColor="#ededed"
        borderWidth={1}
        flexDir="column"
        borderRadius="md"
        mt={6}
        p={4}
      >
        <Stack spacing={4}>
          {pedidos.data?.results.map((item): any => (
            <MeuPedidoCard
              key={item.pk}
              data={new Date(item.ordered_date).toLocaleDateString()}
              item={item}
              comprovante={item.payment.comprovante}
              user={item.user}
            />
          ))}
        </Stack>
      </Flex>
      <Flex>
        <Flex justifyContent="flex-start" w="45%">
          {pedidos.data?.previous && (
            <Text m={2} cursor="pointer" onClick={() => setPage(page - 1)}>
              {'<'} Anterior
            </Text>
          )}
        </Flex>
        <Flex>
          <Text m={2}>{page}</Text>
        </Flex>
        <Flex justifyContent="flex-end" w="45%">
          {pedidos.data?.next && (
            <Text m={2} cursor="pointer" onClick={() => setPage(page + 1)}>
              Próxima {'>'}
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Pedidos
