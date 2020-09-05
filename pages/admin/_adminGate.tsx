import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/core'

const AdminGate: React.FC = ({ children }) => {
  const router = useRouter()
  const [message, setMessage] = useState('Verificando permissões...')
  async function isStaff() {
    const response = await api.get('core/api/is-staff/')
    if (!response.ok) {
      setMessage('Não autorizado')
      return router.push('/')
    } else {
      return <>{children}</>
    }
  }
  isStaff()
  return <Link href="/">{message}</Link>
}

export default AdminGate
