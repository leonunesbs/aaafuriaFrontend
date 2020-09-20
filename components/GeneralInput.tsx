import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
} from '@chakra-ui/core'

interface Props {
  name: string
  rIcon?: any
  lIcon?: any
}
type InProps = InputProps & Props

const GeneralInput: React.FC<InProps> = ({ name, rIcon, lIcon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, defaultValue])

  return (
    <InputGroup mb={2}>
      {lIcon && <InputLeftElement children={lIcon} />}
      <Input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        borderRadius="sm"
        height="40px"
        focusBorderColor="green.300"
        _hover={{ borderColor: 'green.300' }}
        {...rest}
      />
      {rIcon && (
        <InputRightElement
          width={['4.25rem', '4.75rem']}
          mr={2}
          children={rIcon}
        />
      )}
    </InputGroup>
  )
}

export default GeneralInput
