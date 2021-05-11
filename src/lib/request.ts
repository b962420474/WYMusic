import Axios, { AxiosInstance } from 'axios'

const service: AxiosInstance = Axios.create({
  baseURL: '',
  timeout: 10000
})
service.interceptors.request.use(config => {
  return config
})
export default {
  install (Vue: any) {
    Vue.prototype.$request = service
  }
}
export { Axios }
