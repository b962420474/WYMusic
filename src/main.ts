import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import './style.less'
import { CreateElement } from 'vue/types/umd'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css' // 加载样式

Vue.use(MuseUI)
new Vue({
  router,
  render: (h: CreateElement) => h(App)
}).$mount('#app')
