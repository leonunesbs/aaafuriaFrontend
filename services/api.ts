import { create, ApisauceInstance } from 'apisauce'

const api = {
  create() {
    const instance: ApisauceInstance = create({
      baseURL: 'https://aaafuriav2.herokuapp.com/',
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
      baseURL: 'https://aaafuriav2.herokuapp.com/',
    })

    return instance
  },
}

export default api
