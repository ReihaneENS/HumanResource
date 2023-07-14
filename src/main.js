import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

// IMPORTING MAIN.CSS
import '@/assets/css/main.scss/'
import '@/assets/css/index.css/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
