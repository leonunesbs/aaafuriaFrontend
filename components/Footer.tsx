import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'

const Footer: React.FC = () => {
  return (
    <>
      <Box w="100%" h="8px" backgroundColor="gray.500" />
      <Box w="100%" h="2px" backgroundColor="green.300" />
      <Flex
        w="100%"
        h="50px"
        flexDir="column"
        justify="center"
        backgroundColor="gray.500"
      >
        <Text
          color="gray.200"
          fontWeight="thin"
          fontSize="sm"
          textAlign="center"
        >
          &copy; <b>A.A.A. Fúria 2020</b>. Diretoria de Marketing.
        </Text>
      </Flex>
    </>
  )
}

export default Footer
