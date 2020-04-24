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
import NeedLogin from '../components/NeedLogin.vue'

import Singer from '../components/Singer.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: FindMusic,
    children: [{
      path: '/',
      component: Recommend
    }],
    meta: {
      requireLogin: false
    }
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
        component: Artist,
        children: [{
            path: 'signed',
            component: Artist
          },
          {
            path: 'cat',
            component: Artist
          }
        ]
      }
    ],
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/friends',
    component: Friends,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/musician',
    component: Musician,
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/my',
    component: MyMusic,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/my/playlist',
    component: MyMusic,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/user/home',
    component: UserInfo,
    meta: {
      requireLogin: false
    }
  }, 
  {
    path: '/user/update',
    component: UserInfo,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/playlist',
    component: PlayList,
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/song',
    component: Music,
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/needlogin',
    component: NeedLogin,
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/artist',
    component: Singer,
    meta: {
      requireLogin: false
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (localStorage.getItem('login_flag'))
      next()
    else {
      next({
        path: '/needlogin',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else next()
})
export default router