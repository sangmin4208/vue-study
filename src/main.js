import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/config'
// global styles
import './assets/main.css'
import { onAuthStateChanged } from 'firebase/auth'

let app

onAuthStateChanged(auth, () => {
  if (app) {
    return
  }
  app = createApp(App).use(router).mount('#app')
})
