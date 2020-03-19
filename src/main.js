import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import swipe from './components/publicComponents/swipe/swipe-image.js'
import music_play from './components/publicComponents/play/play-music.js'
import Toast from './plugins/toast/toast.js'
import Cookie from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(Cookie)
Vue.use(Vueaxios, axios)
Vue.use(swipe)
Vue.use(music_play)
Vue.use(Toast)

$cookies.config('', '/')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
