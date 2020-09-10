import React, { useState, useRef } from 'react'
import { useFetch } from '../../../hooks/useFetch'
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
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/core'

import { CgNotes } from 'react-icons/cg'
import {
  AiOutlineCheck,
  AiOutlinePause,
  AiOutlineWhatsApp,
} from 'react-icons/ai'
import api from '../../../services/api'
import { useRouter } from 'next/router'

function AssociaçõesCard({ item, router, ...rest }) {
  const [isValidadeOpen, setValidadeIsOpen] = useState(null)
  const onValidadeClose = () => setValidadeIsOpen(false)
  const validateRef = useRef()

  const [isPauseOpen, setPauseIsOpen] = useState(null)
  const onPauseClose = () => setPauseIsOpen(false)
  const pauseRef = useRef()

  const toggleAssociação = async () => (
    await api.get(`core/api/toggle-associacao/${item.pk}`),
    isPauseOpen && onPauseClose(),
    isValidadeOpen && onValidadeClose(),
    router.reload()
  )

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="sm" {...rest}>
      <Text fontWeight="bold" fontSize="1.15rem">
        {item.sócio.nome_completo}
      </Text>
      {item.is_active ? (
        <Badge fontSize="0.8em" variantColor="green" variant="solid">
          SÓCIO FÚRIA ATIVO
        </Badge>
      ) : (
        <Badge fontSize="0.8em" variantColor="red" variant="solid">
          SÓCIO FÚRIA INATIVO
        </Badge>
      )}
      <Text fontWeight="thin" fontSize="sm" lineHeight="1.3" mt={1}>
        Matrícula {item.sócio.matrícula}
      </Text>
      <Text fontWeight="thin" fontSize="sm" lineHeight="1.3">
        Turma: {item.sócio.turma}
      </Text>
      <Text fontWeight="thin" fontSize="sm" lineHeight="1.3">
        {`Categoria: ${
          (item.categoria.duração == 'S' && 'SEMESTRAL') ||
          (item.categoria.duração == 'A' && 'ANUAL')
        }`}
      </Text>
      <Divider />
      <Flex>
        <Flex flexGrow={1}></Flex>
        <Flex justify="flex-end">
          <Tooltip
            label="Contactar Whatsapp"
            aria-label="Contactar Whatsapp"
            hasArrow
            placement="top"
          >
            <Link
              isExternal
              href={`https://api.whatsapp.com/send?phone=55${item.sócio.celular.replace(
                /[^0-9]/g,
                ''
              )}`}
              mr={4}
            >
              <Box as={AiOutlineWhatsApp} color="green.600" size={6} />
            </Link>
          </Tooltip>

          <Tooltip
            label="Ver comprovante"
            aria-label="Ver comprovante"
            hasArrow
            placement="top"
          >
            <Link isExternal href={item.comprovante} mr={4}>
              <Box as={CgNotes} color="green.600" size={6} />
            </Link>
          </Tooltip>
          {item.is_active ? (
            <Tooltip
              label="Pausar associação"
              aria-label="Pausar associação"
              hasArrow
              placement="top"
              mr={4}
            >
              <Box>
                <Box
                  as={AiOutlinePause}
                  color="red.500"
                  size={6}
                  cursor="pointer"
                  onClick={() => setPauseIsOpen(true)}
                />
                <AlertDialog
                  isOpen={isPauseOpen}
                  leastDestructiveRef={pauseRef}
                  onClose={onPauseClose}
                >
                  <AlertDialogOverlay />
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Pausar associação
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Pausar associação de {item.sócio.nome_completo}?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button
                        ref={validateRef}
                        borderRadius="sm"
                        onClick={onPauseClose}
                      >
                        Cancelar
                      </Button>
                      <Button
                        backgroundColor="red.500"
                        color="#fff"
                        borderRadius="sm"
                        onClick={toggleAssociação}
                        ml={3}
                      >
                        Pausar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Box>
            </Tooltip>
          ) : (
            <Tooltip
              label="Validar associação"
              aria-label="Validar associação"
              hasArrow
              placement="top"
              mr={4}
            >
              <Box>
                <Box
                  as={AiOutlineCheck}
                  cursor="pointer"
                  color="green.600"
                  size={6}
                  onClick={() => setValidadeIsOpen(true)}
                />
                <AlertDialog
                  isOpen={isValidadeOpen}
                  leastDestructiveRef={validateRef}
                  onClose={onValidadeClose}
                >
                  <AlertDialogOverlay />
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Validar associação
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Validar associação de {item.sócio.nome_completo}?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button
                        ref={validateRef}
                        borderRadius="sm"
                        onClick={onValidadeClose}
                      >
                        Cancelar
                      </Button>
                      <Button
                        backgroundColor="green.300"
                        color="#fff"
                        borderRadius="sm"
                        onClick={toggleAssociação}
                        ml={3}
                      >
                        Validar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Box>
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

const Associações: React.FC = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const associações: any = useFetch(
    `core/api/get-admin-associacao/?page=${page}`
  )

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
        Associações
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
          {associações.data?.results.map((item): any => (
            <AssociaçõesCard key={item.pk} router={router} item={item} />
          ))}
        </Stack>
      </Flex>
      <Flex>
        <Flex justifyContent="flex-start" w="45%">
          {associações.data?.previous && (
            <Text m={2} cursor="pointer" onClick={() => setPage(page - 1)}>
              {'<'} Anterior
            </Text>
          )}
        </Flex>
        <Flex>
          <Text m={2}>{page}</Text>
        </Flex>
        <Flex justifyContent="flex-end" w="45%">
          {associações.data?.next && (
            <Text m={2} cursor="pointer" onClick={() => setPage(page + 1)}>
              Próxima {'>'}
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Associações
