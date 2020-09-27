import api from './api'

export async function authenticate(username: string, password: string) {
  const response = await api.post('core/api/login/', {
    username: username,
    password: password,
  })

  if (response.ok) {
    const { token, is_sócio, user }: any = response.data
    localStorage.setItem('aaafuria:Token', token)
    localStorage.setItem('aaafuria:User', JSON.stringify(user))
    localStorage.setItem('aaafuria:isSócio', is_sócio)
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
    const response: any = await api.get('core/api/is-authenticated/')

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
  const response = api.delete('core/api/logout/')
  localStorage.clear()
  return response
}
