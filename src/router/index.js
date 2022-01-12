import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome'
import Chatroom from '@/views/Chatroom'
import { auth } from '../firebase/config'
// auth gaurd

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Welcome' })
  }
  next()
}
const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next({ name: 'Chatroom' })
  }
  next()
}
const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requireAuth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
