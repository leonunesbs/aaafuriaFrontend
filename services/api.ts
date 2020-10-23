import { create, ApisauceInstance } from 'apisauce'

const url = 'https://aaafuriav2.herokuapp.com/'

const api = {
  create() {
    const instance: ApisauceInstance = create({
      baseURL: url,
    })

    instance.addAsyncRequestTransform((request) => async () => {
      const token = localStorage.getItem('aaafuria:Token')

      if (token) {
        request.headers['Authorization'] = `Token ${token}`
      }
    })

    return instance
  },
  create_bypassed() {
    const instance: ApisauceInstance = create({
      baseURL: url,
    })

    return instance
  },
}

export default api
