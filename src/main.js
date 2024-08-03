import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()

app.use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')
