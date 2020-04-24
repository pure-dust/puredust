import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_info: {
      id: window.localStorage.getItem('user_id'),
      name: window.localStorage.getItem('username'),
      head_portrait: window.localStorage.getItem('head_image')
    },
    music: {
      id: null,
      name: null,
      singer: null,
      data: null,
      album: null,
      cover: null
    },
    userMusicList: [],
    userCollectedList: [],
    loginFlag: window.localStorage.getItem('login_flag') || false,
    currentPlayList: []
  },
  getters: {
    getMusic: state => {
      return state.music
    },
    getUserMusicList: state => {
      return state.userMusicList
    },
    getUserCollectedList: state => {
      return state.userCollectedList
    },
    getUserInfo: state => {
      return state.user_info
    },
    getLoginState: state => {
      return state.loginFlag
    },
    getCurrentPlayList: state => {
      return state.currentPlayList
    }
  },
  mutations: {
    setMusic(state, music) {
      state.music = music
    },
    setCurrentPlayList(state, list) {
      state.currentPlayList = list
    },
    addCurrentPlayList(state, music) {
      let f = true
      state.currentPlayList.forEach(el => {
        if (el.music_id == music.music_id)
          f = false
      })
      if (f)
        state.currentPlayList.push(music)
    },
    setUserMusicList(state, list) {
      state.userMusicList = list
    },
    setUserCollectedList(state, list) {
      state.userCollectedList = list
    },
    setUserInfo(state, info) {
      state.user_info.id = info.id
      state.user_info.name = info.name
      state.user_info.head_portrait = info.head_portrait
      window.localStorage.setItem('user_id', info.id)
      window.localStorage.setItem('username', info.name)
      window.localStorage.setItem('head_image', info.head_portrait)
    },
    setLoginState(state, flag) {
      state.loginFlag = flag
      window.localStorage.setItem('login_flag', flag)
    },
    infoInit(state) {
      state.user_info = {}
      state.music = {}
      state.userMusicList = [],
        state.userCollectedList = [],
        this.loginFlag = false
    }
  },
  modules: {}
})