import React from 'react'
import { Flex, Text } from '@chakra-ui/core'

const Footer: React.FC = () => {
  return (
    <Flex
      w="100%"
      h="50px"
      mt={16}
      flexDir="column"
      justify="center"
      backgroundColor="green.600"
    >
      <Text color="gray.300" fontWeight="thin" fontSize="sm" textAlign="center">
        &copy; <b>A.A.A. Fúria 2020</b>. Diretoria de Marketing.
      </Text>
    </Flex>
  )
}

export default Footer
