import Api from '../api'

export async function authenticate (context, credentials) {
  context.commit('loading', true)
  context.commit('setErrors', [])

  return new Promise((resolve, reject) => {
    try {
      Api.post('get-token', credentials)
        .then((response) => {
          localStorage.setItem('hris_token', JSON.stringify(response.data.token))
          Api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.access_token
          context.commit('setToken', response.data.token)
          resolve()
        })
        .catch((e) => {
          context.commit('setErrors', e.response.data.errors)
          reject()
        })
        .finally(() => {
          context.commit('loading', false)
        })
    } catch (error) {}
  })
}

export async function user (context) {
  context.commit('loading', true)
  return new Promise((resolve, reject) => {
    try {
      Api.get('auth-user')
        .then((response) => {
          context.commit('setUser', response.data)
          resolve()
        })
        .finally(() => context.commit('loading', false))
    } catch (error) {
      reject()
    }
  })
}

export async function logout (context) {
  await Api.post('remove-tokens')
    .then(() => {
      localStorage.removeItem('hris_token')
      context.commit('setToken', null)
      Api.defaults.headers.common['Authorization'] = ''
    })
    .catch((error) => console.log(error.response))
}

export function resetValidation (context) {
  context.commit('setErrors', [])
}
