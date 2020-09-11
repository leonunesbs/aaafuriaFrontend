import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useRouter } from 'next/router'

const SócioGate: React.FC = ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    async function isSócio() {
      const response = await api.get('core/api/get-user-associacao/')
      if (response.ok) {
        alert('Olá, já possuimos sua ficha de associação.')
        return router.push('/loja')
      }
    }
    isSócio()
  }, [])

  return <>{children}</>
}

export default SócioGate
