import { create, ApisauceInstance } from 'apisauce'

const api: ApisauceInstance = create({
  baseURL: 'https://aaafuriav2.herokuapp.com/',
})

api.addAsyncRequestTransform((request) => async () => {
  const token = localStorage.getItem('Token')

  if (token) {
    request.headers['Authorization'] = `Token ${token}`
  }
})

export default api
