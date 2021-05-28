import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@v/Index/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@v/Editor')
  }
]

const router = new VueRouter({
  routes
})

export default router
