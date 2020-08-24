import { create, ApisauceConfig, ApisauceInstance } from 'apisauce';

const api: ApisauceInstance = create({
    baseURL: 'http://127.0.0.1:8000/api/'

})

api.addAsyncRequestTransform(request => async () => {
    const token = localStorage.getItem('Token')

    if (token) {
        request.headers['Authorization'] = `Token ${token}`
    }
})

export default api
