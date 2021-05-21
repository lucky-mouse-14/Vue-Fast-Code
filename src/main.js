import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 引入插件
import './plugins'
// 引入 svg-icon
import './icons'

import './permission.js' // permission control

const isDebugMode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebugMode
Vue.config.devtools = isDebugMode
Vue.config.productionTip = isDebugMode

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
