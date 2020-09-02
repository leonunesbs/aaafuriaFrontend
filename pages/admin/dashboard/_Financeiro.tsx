import React, { useEffect, useState } from 'react'
import { Heading, Flex, Text, Box, Tooltip } from '@chakra-ui/core'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import { useFetch } from '../../../hooks/useFetch'

// import { Container } from './styles';

const Financeiro: React.FC = () => {
  const { data }: any = useFetch('financeiro/')
  const lastIn: any = useFetch('financeiro-last-in/')
  const lastOut: any = useFetch('financeiro-last-out/')

  const [uEntrada, setUEntrada] = useState()
  const [uEntradaDesc, setUEntradaDesc] = useState()
  const [uSaída, setUSaída] = useState()
  const [uSaídaDesc, setUSaídaDesc] = useState()

  useEffect(() => {
    setUEntrada(lastIn.data?.valor)
    setUEntradaDesc(lastIn.data?.finalidade)
    setUSaída(lastOut.data?.valor)
    setUSaídaDesc(lastOut.data?.finalidade)
  })

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
        minH="240px"
        alignSelf="center"
        borderColor="#ededed"
        borderWidth={1}
        borderRadius="md"
        mt={6}
        p={4}
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
              borderRadius="sm"
              backgroundColor="#ededed"
              justify="center"
              align="center"
              m={2}
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
              flexGrow={[1, 0]}
              borderRadius="sm"
              backgroundColor="#ededed"
              justify="center"
              align="center"
              m={2}
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
            borderRadius="sm"
            backgroundColor="#ededed"
            justify="center"
            align="center"
            m={2}
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
      </Flex>
    </>
  )
}

export default Financeiro
