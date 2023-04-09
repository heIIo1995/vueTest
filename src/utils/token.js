export const setToken = (token) => {
  localStorage.setItem('login_token', token)
}

export const getToken = () => {
  return localStorage.getItem('login_token')
}

export const removeToken = () => {
  localStorage.removeItem('login_token')
}
