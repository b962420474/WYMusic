import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import '@/style.css'
import { CreateElement } from 'vue/types/umd'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css' // 加载样式
import request from '@/lib/request'
import store from '@/store/index'
import { Component } from 'vue-property-decorator'
Component.registerHooks([
  'beforeRouteEnter'
])
Vue.use(request)
Vue.use(MuseUI)
new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App)
}).$mount('#app')
