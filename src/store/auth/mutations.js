export function loading (state, payload) {
  state.isLoading = payload
}

export function setToken (state, payload) {
  state.token = payload
}

export function setErrors (state, payload) {
  state.errors = payload
}

export function setUser (state, payload) {
  state.user = payload
}
