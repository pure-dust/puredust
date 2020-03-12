import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import swipe from './components/publicComponents/swipe/swipe-image.js'
import music_play from './components/publicComponents/play/play-music.js'
// import './assets/bootstrap/css/bootstrap.min.css'
// import './assets/bootstrap/js/bootstrap.min'

Vue.config.productionTip = false

Vue.use(Vueaxios, axios)
Vue.use(swipe)
Vue.use(music_play)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
