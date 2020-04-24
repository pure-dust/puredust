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
import comments from './components/publicComponents/comments/comments.js'
import error from './components/publicComponents/error/error.js'
import songs from './components/publicComponents/songs/songs.js'

Vue.config.productionTip = false

Vue.use(Cookie)
Vue.use(Vueaxios, axios)
Vue.use(swipe)
Vue.use(music_play)
Vue.use(Toast)
Vue.use(comments)
Vue.use(error)
Vue.use(songs)

$cookies.config('', '/')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('dateFormat', time => {
  let date = new Date(time);
  let currentDate = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (year == currentDate.getFullYear()) {
    if (month == currentDate.getMonth() + 1) {
      if (day == currentDate.getDate()) {
        if (hour == currentDate.getHours()) {
          return (
            parseInt(currentDate.getMinutes()) - parseInt(minute) + "分钟前"
          );
        } else {
          if (minute < 10) minute = "0" + minute;
          return hour + ":" + minute;
        }
      } else {
        return month + "月" + day + "日 " + hour + ":" + minute;
      }
    } else {
      return month + "月" + day + "日 " + hour + ":" + minute;
    }
  } else {
    return year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
  }
})