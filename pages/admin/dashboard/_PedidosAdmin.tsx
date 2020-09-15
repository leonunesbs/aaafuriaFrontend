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
} from '@chakra-ui/core'
import { useFetch } from '../../../hooks/useFetch'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { CgNotes } from 'react-icons/cg'
import api from '../../../services/api'
import { useRouter } from 'next/router'

function MeuPedidoCard({ data, item, user, comprovante, ...rest }) {
  const router = useRouter()
  const [status, setStatus] = useState(item.status)

  const handleStatus = async (s: string) => {
    setStatus(s)

    const response: any = await api.post('core/api/status-pedido-admin/', {
      pk: item.pk,
      status:
        (s == 'AGUARDANDO' && 'AG') ||
        (s == 'PROCESSANDO' && 'PR') ||
        (s == 'CONLUÍDO' && 'CC') ||
        (s == 'CANCELADO' && 'XX'),
    })
    if (!response.ok) {
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
        <Menu>
          <MenuButton
            as={Badge}
            variantColor={
              (status == 'AGUARDANDO' && 'gray') ||
              (status == 'PROCESSANDO' && 'orange') ||
              (status == 'CONLUÍDO' && 'green') ||
              (status == 'CANCELADO' && 'red')
            }
          >
            {status}
          </MenuButton>
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
        >
          <Link isExternal href={comprovante} mr={4}>
            <Box as={CgNotes} color="green.300" size={6} />
          </Link>
        </Tooltip>
        <Tooltip
          label="Contactar Whatsapp"
          aria-label="Contactar Whatsapp"
          hasArrow
          placement="top"
        >
          <Link
            isExternal
            href={`https://api.whatsapp.com/send?phone=55${user.sócio.celular.replace(
              /[^0-9]/g,
              ''
            )}`}
          >
            <Box as={AiOutlineWhatsApp} color="green.300" size={6} />
          </Link>
        </Tooltip>
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
