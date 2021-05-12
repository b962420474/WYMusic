import Axios, { AxiosInstance } from 'axios'

const service: AxiosInstance = Axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000
})
service.interceptors.request.use(config => {
  return config
})
service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  } else {
    return Promise.reject(response)
  }
},
error => {
  return Promise.reject(error)
}
)
export default {
  install (Vue: any) {
    Vue.prototype.$request = service
  }
}
export { Axios }
