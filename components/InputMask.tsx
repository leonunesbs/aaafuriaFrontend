import React, { useRef, useEffect } from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'

import { useField } from '@unform/core'
import { Input } from '@chakra-ui/core'

interface Props extends InputProps {
  name: string
  placeholder?: string
  isDisabled?: any
}

const InputMask: React.FC<Props> = ({
  name,
  isDisabled,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value)
      },
    })
  }, [fieldName, registerField])

  return (
    <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest}>
      {() => (
        <Input
          mb={2}
          borderRadius="sm"
          height="40px"
          focusBorderColor="green.300"
          _hover={{ borderColor: 'green.300' }}
          isDisabled={isDisabled}
          placeholder={placeholder}
        />
      )}
    </ReactInputMask>
  )
}

export default InputMask
