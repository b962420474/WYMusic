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
        },
        {
          path: 'songList',
          component: () => import('@/views/songList/index.vue')
        },
        {
          path: 'leaderBoard',
          component: () => import('@/views/leaderBoard/index.vue')
        },
        {
          path: 'hostSinger',
          component: () => import('@/views/hostSinger/index.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: '/index/rage'
    },
    {
      path: '/playListDetail/:id',
      name: 'playListDetail',
      component: () => import('@/views/playListDetail/index.vue')
    }
  ]
})
