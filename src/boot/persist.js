import { boot } from 'quasar/wrappers'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default boot(({ app }) => {
  // Ambil instance pinia yang sudah terpasang di app
  const pinia = app.config.globalProperties.$pinia
  if (pinia) {
    pinia.use(piniaPluginPersistedstate)
  }
})
