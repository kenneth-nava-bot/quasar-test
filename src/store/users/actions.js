import Api from '../api'

export async function index (context) {
  return new Promise((resolve, reject) => {
    try {
      Api.get('/users').then((response) => {
        context.commit('setUsers', response.data)
      })
    } catch (error) {

    }
  })
}
