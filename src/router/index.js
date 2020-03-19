import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

import FindMusic from '../components/FindMusic.vue'
import Friends from '../components/Friends.vue'
import Musician from '../components/Musician.vue'
import MyMusic from '../components/MyMusic.vue'
import Recommend from '../components/FindMusicSub/Recommend.vue'
import FindPlayList from '../components/FindMusicSub/PlayList.vue'
import TopList from '../components/FindMusicSub/TopList.vue'
import Artist from '../components/FindMusicSub/Artist.vue'
import UserInfo from '../components/UserInfo.vue'
import PlayList from '../components/PlayList.vue'
import Music from '../components/Music.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: FindMusic,
    children: [{
      path: '/',
      component: Recommend
    }]
  },
  {
    path: '/findmusic',
    component: FindMusic,
    children: [{
        path: '/findmusic',
        component: Recommend
      },
      {
        path: 'recommend',
        component: Recommend
      },
      {
        path: 'toplist',
        component: TopList,
        children: [{
          path: 'toplist:id',
          component: TopList
        }]
      },
      {
        path: 'playlist',
        component: FindPlayList
      },
      {
        path: 'artist',
        component: Artist
      }
    ]
  },
  {
    path: '/friends',
    component: Friends
  },
  {
    path: '/musician',
    component: Musician
  },
  {
    path: '/my',
    component: MyMusic
  },
  {
    path: '/my/playlist',
    component: MyMusic
  },
  {
    path: '/user/home',
    component: UserInfo
  },
  {
    path: '/playlist',
    component: PlayList
  },
  {
    path: '/song',
    component: Music
  }
]

const router = new VueRouter({
  routes
})

export default router