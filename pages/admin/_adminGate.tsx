import React from 'react'
import api from '../../services/api'
import { useRouter } from 'next/router'

const AdminGate: React.FC = ({ children }) => {
  const router = useRouter()
  async function isStaff() {
    const response = await api.get('is-staff/')
    if (!response.ok) {
      return router.push('/')
    }
  }
  isStaff()
  return <>{children}</>
}

export default AdminGate
