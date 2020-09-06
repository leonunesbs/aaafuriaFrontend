import React from 'react'
import { Heading, Flex, Stack } from '@chakra-ui/core'

const Vendas: React.FC = () => {
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
        Vendas
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
        overflow="scroll"
      ></Flex>
    </>
  )
}

export default Vendas
