import React from 'react'
import api from '../services/api'

export async function authenticate(username: string, password: string) {
  const response = await api.post('login/', {
    username: username,
    password: password,
  })

  if (response.ok) {
    const { token, is_socio, user }: any = response.data
    localStorage.setItem('Token', token)
    localStorage.setItem('User', JSON.stringify(user))
    localStorage.setItem('isSócio', is_socio)
    return response
  } else {
    localStorage.clear()
    return response
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('Token')

  if (!token) {
    localStorage.clear()
    return false
  }

  const isAuth = async () => {
    const response: any = await api.post('is-authenticated/')

    if (response.ok) {
      localStorage.setItem('isSócio', response.data.is_sócio)
      return true
    } else {
      localStorage.clear()
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
  localStorage.clear()
}
