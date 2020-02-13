export default function () {
  return {
    token: JSON.parse(localStorage.getItem('hris_token')) || null,
    errors: [],
    isLoading: false,
    user: {
      name: '',
      email: ''
    }
  }
}
