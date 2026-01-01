import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://gym-be.xianly.cloud/' })

export default defineBoot(({ app }) => {
  // AMBIL TOKEN DARI STORAGE SAAT REFRESH
  const token = localStorage.getItem('access_token')

  if (token) {
    // Tempelkan kembali ke header agar request selanjutnya tidak 401
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
