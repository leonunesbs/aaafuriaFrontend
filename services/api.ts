import { create, ApisauceInstance } from 'apisauce'

const api: ApisauceInstance = create({
  baseURL: 'https://aaafuriav2.herokuapp.com/api/',
})

api.addAsyncRequestTransform((request) => async () => {
  const token = localStorage.getItem('Token')

  if (token) {
    request.headers['Authorization'] = `Token ${token}`
  }

  request.headers['Access-Control-Allow-Origin'] = 'https://aaafuria.com.br'
})

export default api
