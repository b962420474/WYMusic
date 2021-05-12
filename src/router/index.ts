import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/index',
      component: () => import('@/views/main/index.vue'),
      children: [
        {
          path: 'rage',
          component: () => import('@/views/rage/index.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: '/index/rage'
    }
  ]
})
