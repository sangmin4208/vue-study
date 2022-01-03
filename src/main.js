import { createApp } from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import './assets/css/main.css'

const app = createApp(App)
app.use(VueClipboard)
app.mount('#app')
