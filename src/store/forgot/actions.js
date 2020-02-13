import Api from '../api'

export async function sendResetEmail (context, email) {
  context.commit('setLoading', true)

  return new Promise((resolve, reject) => {
    Api.post('forgot-password', { email: email })
      .then((response) => {
        resolve()
      })
      .catch((error) => {
        context.commit('setErrors', error.response.data.errors)
        reject()
      })
      .finally(() => context.commit('setLoading', false))
  })
}

export function resetValidation (context) {
  context.commit('setErrors', [])
}
