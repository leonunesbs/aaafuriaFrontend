import { create, ApisauceInstance } from 'apisauce'

const api: ApisauceInstance = create({
  baseURL: 'http://localhost:8000/api/',
})

api.addAsyncRequestTransform((request) => async () => {
  const token = localStorage.getItem('Token')

  if (token) {
    request.headers['Authorization'] = `Token ${token}`
  }
})

export default api
