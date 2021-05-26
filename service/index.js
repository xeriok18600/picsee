import axios from 'axios'
import camelCase from 'lodash/camelCase'

// 'http://10.11.202.23:3010/'

export default ({ store, app }, inject) => {
  const apiWorker = axios.create({
    baseURL:
      'https://api.pics.ee/v1/links/?access_token=20f07f91f3303b2f66ab6f61698d977d69b83d64',
  })
  /* Request Interceptor */
  apiWorker.interceptors.request.use((config) => {
    return config
  })

  /* Response Interceptor */
  apiWorker.interceptors.response.use(
    (response) => {
      const { data, status } = response
      if (status && status === 20001 && data.error_code) {
        return Promise.reject(data.error_code)
      }
      return data
    },
    (err) => {
      const { data, status } = err.response
      switch (status) {
        case 400:
          break
        case 401:
          break
        case 404:
          break
        default:
          break
      }
      return Promise.reject(data)
    }
  )

  // Collect API modules
  const apiModules = {}
  const requireApiModule = require.context('./api', false, /\.js$/)
  requireApiModule.keys().forEach((fileName) => {
    const moduleConfig = requireApiModule(fileName)
    const moduleName = camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )

    apiModules[moduleName] = moduleConfig.default(apiWorker)
  })

  inject('service', apiModules)
}
