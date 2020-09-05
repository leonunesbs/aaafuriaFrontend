import React, { useEffect, useState, useRef } from 'react'
import {
  Heading,
  Flex,
  Text,
  Box,
  Tooltip,
  Button,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInputField,
  NumberInput,
  Textarea,
} from '@chakra-ui/core'
import { ImArrowUp } from 'react-icons/im'
import { useFetch } from '../../../hooks/useFetch'
import api from '../../../services/api'

// import { Container } from './styles';

const Financeiro: React.FC = () => {
  const [page, setPage] = useState(1)

  const { data }: any = useFetch(`financeiro/?page=${page}`, 5000)
  const lastIn: any = useFetch('financeiro-last-in/')
  const lastOut: any = useFetch('financeiro-last-out/')

  const entrada = useDisclosure()
  const saída = useDisclosure()

  const [uEntrada, setUEntrada] = useState()
  const [uEntradaDesc, setUEntradaDesc] = useState()
  const [uSaída, setUSaída] = useState()
  const [uSaídaDesc, setUSaídaDesc] = useState()

  const [fluxo, setFluxo] = useState('')
  const [finalidade, setFinalidade] = useState('')
  const handleFinalidade = (event: any) => setFinalidade(event.target.value)
  const [valor, setValor] = useState('')
  const handleValor = (event: any) => setValor(event.target.value)
  const [observações, setObservações] = useState('')
  const handleObservações = (event: any) => setObservações(event.target.value)
  const [responsável, setResponsável] = useState('')
  const handleResponsável = (event: any) => setResponsável(event.target.value)
  const [data_da_movimentação, setDataDaMovimentação] = useState('')
  const handleDataDaMovimentação = (event: any) =>
    setDataDaMovimentação(event.target.value)

  const entradaBtnRef = useRef()
  const saídaBtnRef = useRef()

  useEffect(() => {
    setUEntrada(lastIn.data?.valor)
    setUEntradaDesc(lastIn.data?.finalidade)
    setUSaída(lastOut.data?.valor)
    setUSaídaDesc(lastOut.data?.finalidade)
  })

  const handleNovaEntrada = async () => {
    const response = await api.post('core/api/financeiro-entries/', {
      fluxo: 'E',
      finalidade: finalidade,
      valor: valor,
      observações: observações,
      responsável: responsável,
      data_da_movimentação: data_da_movimentação,
    })
    if (response.ok) {
      console.log(response)
    }

    entrada.onClose()
  }

  const handleNovaSaída = async () => {
    const response = await api.post('core/api/financeiro-entries/', {
      fluxo: 'S',
      finalidade: finalidade,
      valor: valor,
      observações: observações,
      responsável: responsável,
      data_da_movimentação: data_da_movimentação,
    })
    if (response.ok) {
      console.log(response)
    }
    saída.onClose()
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
        Financeiro
      </Heading>
      <Flex
        w="100%"
        alignSelf="center"
        borderColor="#ededed"
        borderWidth={1}
        borderRadius="md"
        mt={6}
        p={4}
        flexDir="column"
      >
        <Flex
          flexGrow={1}
          justifyContent={['center', 'space-between']}
          flexWrap="wrap"
        >
          <Tooltip
            label={uSaídaDesc}
            aria-label="saída"
            placement="bottom"
            hasArrow
          >
            <Flex
              flexDir="column"
              minW="200px"
              flexGrow={[1, 0]}
              h="80px"
              shadow="md"
              m={2}
              borderRadius="sm"
              backgroundColor="#ededed"
              justify="center"
              align="center"
            >
              <Text fontSize="sm">Última saída</Text>
              <Flex alignItems="baseline">
                <Text fontSize="xs" color="red.500" fontWeight="thin">
                  R$
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  color="red.500"
                  lineHeight={1}
                >
                  {uSaída}
                </Text>
              </Flex>
            </Flex>
          </Tooltip>
          <Tooltip
            label={uEntradaDesc}
            aria-label="saída"
            placement="bottom"
            hasArrow
          >
            <Flex
              flexDir="column"
              minW="200px"
              h="80px"
              shadow="md"
              m={2}
              flexGrow={[1, 0]}
              borderRadius="sm"
              backgroundColor="#ededed"
              justify="center"
              align="center"
            >
              <Text fontSize="sm">Última entrada</Text>
              <Flex alignItems="baseline">
                <Text fontSize="xs" color="green.500" fontWeight="thin">
                  R$
                </Text>
                <Text
                  fontWeight="bold"
                  color="green.500"
                  fontSize="xl"
                  lineHeight={1}
                >
                  {uEntrada}
                </Text>
              </Flex>
            </Flex>
          </Tooltip>
          <Flex
            flexDir="column"
            minW="200px"
            h="80px"
            flexGrow={[1, 0]}
            m={2}
            shadow="md"
            borderRadius="sm"
            backgroundColor="#ededed"
            justify="center"
            align="center"
          >
            <Text fontSize="sm">Balanço</Text>
            <Flex alignItems="baseline">
              <Text fontSize="xs" fontWeight="thin">
                R$
              </Text>
              <Text fontWeight="bold" fontSize="xl" lineHeight={1}>
                0,00
              </Text>
              <Box as={ImArrowUp} color="green.500" size={4} ml={2} />
            </Flex>
          </Flex>
        </Flex>

        <Divider />
        <Heading as="h4" my={2} size="md" color="green.600" textAlign="center">
          Histórico
        </Heading>
        <Flex flexDir="column">
          {data?.results.map((item) => (
            <Flex
              key={item.pk}
              flexGrow={1}
              backgroundColor="#ededed"
              p={4}
              borderRadius="sm"
              flexWrap="wrap"
              mb={2}
            >
              <Flex flexDir="column" w="50%">
                {item.fluxo == 'ENTRADA' && (
                  <Text color="green.500">{item.fluxo}</Text>
                )}
                {item.fluxo == 'SAÍDA' && (
                  <Text color="red.500">{item.fluxo}</Text>
                )}
                <Text>{item.finalidade}</Text>
                <Flex fontWeight="thin">{item.observações}</Flex>
              </Flex>
              <Flex flexDir="column" w="50%">
                <Text textAlign="right">{item.data_da_movimentação}</Text>
                <Text textAlign="right">{item.responsável}</Text>
                <Text textAlign="right" fontWeight="bold">
                  R${item.valor}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
        <Flex>
          <Flex justifyContent="flex-start" w="45%">
            {data?.previous && (
              <Text m={2} cursor="pointer" onClick={() => setPage(page - 1)}>
                {'<'} Anterior
              </Text>
            )}
          </Flex>
          <Flex justifyContent="center">
            <Text m={2}>{page}</Text>
          </Flex>
          <Flex justifyContent="flex-end" w="45%">
            {data?.next && (
              <Text m={2} cursor="pointer" onClick={() => setPage(page + 1)}>
                Próxima {'>'}
              </Text>
            )}
          </Flex>
        </Flex>
        <Divider />
        <Flex px={2} my={4}>
          <Button
            ref={saídaBtnRef}
            borderRadius="sm"
            w="50%"
            mr={1}
            backgroundColor="red.500"
            color="#fff"
            onClick={saída.onOpen}
          >
            + Saída
          </Button>
          <Drawer
            isOpen={saída.isOpen}
            placement="bottom"
            onClose={saída.onClose}
            finalFocusRef={saídaBtnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Nova saída</DrawerHeader>

              <DrawerBody>
                <FormControl>
                  <FormLabel htmlFor="finalidade">Finalidade</FormLabel>
                  <Input
                    type="text"
                    h="45px"
                    borderRadius="sm"
                    id="finalidade"
                    aria-describedby="finalidade"
                    focusBorderColor="green.300"
                    autoComplete="off"
                    value={finalidade}
                    onChange={handleFinalidade}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="valor">Valor</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      h="45px"
                      type="number"
                      borderRadius="sm"
                      id="valor"
                      aria-describedby="valor"
                      focusBorderColor="green.300"
                      autoComplete="off"
                      value={valor}
                      onChange={handleValor}
                    />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="observações">Observações</FormLabel>
                  <Textarea
                    borderRadius="sm"
                    id="observações"
                    placeholder="Observações..."
                    value={observações}
                    onChange={handleObservações}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="responsável">Responsável</FormLabel>
                  <Input
                    type="text"
                    h="45px"
                    borderRadius="sm"
                    id="responsável"
                    aria-describedby="responsável"
                    focusBorderColor="green.300"
                    autoComplete="off"
                    value={responsável}
                    onChange={handleResponsável}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="data_da_movimentação">
                    Data da movimentação
                  </FormLabel>
                  <Input
                    type="date"
                    h="45px"
                    borderRadius="sm"
                    id="data_da_movimentação"
                    aria-describedby="data_da_movimentação"
                    focusBorderColor="green.300"
                    value={data_da_movimentação}
                    onChange={handleDataDaMovimentação}
                  />
                </FormControl>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  variant="outline"
                  mr={3}
                  borderRadius="sm"
                  onClick={saída.onClose}
                >
                  Cancel
                </Button>
                <Button
                  backgroundColor="green.300"
                  borderRadius="sm"
                  color="#fff"
                  onClick={handleNovaSaída}
                >
                  Salvar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Button
            ref={entradaBtnRef}
            borderRadius="sm"
            w="50%"
            ml={1}
            backgroundColor="green.500"
            color="#fff"
            onClick={entrada.onOpen}
          >
            + Entrada
          </Button>
          <Drawer
            isOpen={entrada.isOpen}
            placement="bottom"
            onClose={entrada.onClose}
            finalFocusRef={entradaBtnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Nova entrada</DrawerHeader>

              <DrawerBody>
                <FormControl>
                  <FormLabel htmlFor="finalidade">Finalidade</FormLabel>
                  <Input
                    type="text"
                    h="45px"
                    borderRadius="sm"
                    id="finalidade"
                    aria-describedby="finalidade"
                    focusBorderColor="green.300"
                    autoComplete="off"
                    value={finalidade}
                    onChange={handleFinalidade}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="valor">Valor</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      h="45px"
                      type="number"
                      borderRadius="sm"
                      id="valor"
                      aria-describedby="valor"
                      focusBorderColor="green.300"
                      autoComplete="off"
                      value={valor}
                      onChange={handleValor}
                    />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="observações">Observações</FormLabel>
                  <Textarea
                    borderRadius="sm"
                    id="observações"
                    placeholder="Observações..."
                    value={observações}
                    onChange={handleObservações}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="responsável">Responsável</FormLabel>
                  <Input
                    type="text"
                    h="45px"
                    borderRadius="sm"
                    id="responsável"
                    aria-describedby="responsável"
                    focusBorderColor="green.300"
                    autoComplete="off"
                    value={responsável}
                    onChange={handleResponsável}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="data_da_movimentação">
                    Data da movimentação
                  </FormLabel>
                  <Input
                    type="date"
                    h="45px"
                    borderRadius="sm"
                    id="data_da_movimentação"
                    aria-describedby="data_da_movimentação"
                    focusBorderColor="green.300"
                    value={data_da_movimentação}
                    onChange={handleDataDaMovimentação}
                  />
                </FormControl>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  variant="outline"
                  mr={3}
                  borderRadius="sm"
                  onClick={entrada.onClose}
                >
                  Cancel
                </Button>
                <Button
                  backgroundColor="green.300"
                  borderRadius="sm"
                  color="#fff"
                  onClick={handleNovaEntrada}
                >
                  Salvar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </>
  )
}

export default Financeiro
