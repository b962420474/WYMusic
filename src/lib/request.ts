import Axios, { AxiosInstance } from 'axios'

const service: AxiosInstance = Axios.create({
  baseURL: process.env.baseURL,
  timeout: 10000
})
service.interceptors.request.use(config => {
  return config
})
export default service
export { Axios }
