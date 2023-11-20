import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
  },
  {
    path: '*',
    redirect: '/',
  }
]
const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
