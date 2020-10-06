import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useRouter } from 'next/router'

const SócioGate: React.FC = ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    async function isSócio() {
      const response = await api.create().get('core/api/associacao/')
      if (response.ok && response.status == 200) {
        alert('Olá, já possuimos sua ficha de associação.')
        return router.push('/loja')
      }
    }
    isSócio()
  }, [])

  return <>{children}</>
}

export default SócioGate
