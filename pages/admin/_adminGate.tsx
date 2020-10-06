import React, { useEffect } from 'react'
import api from '../../services/api'
import { useRouter } from 'next/router'

const AdminGate: React.FC = ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    async function isStaff() {
      const response: any = await api.create().get('core/api/authentication/')
      const { is_staff: isAdmin } = response.data

      if (!(response.ok && isAdmin)) {
        return router.push('/')
      }
    }
    isStaff()
  }, [])

  return <>{children}</>
}

export default AdminGate
