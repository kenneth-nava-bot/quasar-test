import Axios from 'axios'

const Api = Axios.create({
  baseURL: 'http://local-hris/api/',
  timeout: 10000
})

try {
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('hris_token'))['access_token']
} catch (error) {
  console.log('Token not found... redirecting to login...')
}

export default Api
