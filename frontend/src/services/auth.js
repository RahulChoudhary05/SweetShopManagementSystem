import { login as apiLogin, register as apiRegister } from "./api"

export const authService = {
  login: apiLogin,
  register: apiRegister,

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getToken: () => {
    return localStorage.getItem("token")
  },

  getUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },
}
