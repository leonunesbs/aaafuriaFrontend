import { ApiResponse } from 'apisauce'
import api from './api'

interface AuthData {
  token: string,
  is_sócio: string,
  user: string,
  is_staff: string
}

export async function authenticate(username: string, password: string) {
  const response: ApiResponse<AuthData> = await api.create().post('core/api/authentication/', {
    username: username,
    password: password,
  })

  if (response.ok) {
    const { token, is_sócio, user, is_staff } = response.data
    console.log(response.data)
    localStorage.setItem('aaafuria:Token', token)
    localStorage.setItem('aaafuria:User', JSON.stringify(user))
    localStorage.setItem('aaafuria:isSócio', is_sócio)
    localStorage.setItem('aaafuria:isAdmin', is_staff)
    return response
  } else {
    logout()
    return response
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('aaafuria:Token')

  if (!token) {
    logout()
    return false
  }

  const isAuth = async () => {
    const response: ApiResponse<AuthData> = await api.create().get('core/api/authentication/')

    if (response.ok) {
      localStorage.setItem('aaafuria:isSócio', response.data.is_sócio)
      return true
    } else {
      logout()
      return false
    }
  }
  if (isAuth()) {
    return true
  } else {
    return false
  }
}

export function logout() {
  const response = api.create().delete('core/api/authentication/')
  localStorage.clear()
  return response
}
