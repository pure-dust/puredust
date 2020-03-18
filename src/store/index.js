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
    loginFlag: window.localStorage.getItem('login_flag') || false
  },
  actions: {
    setMusic(context) {
      context.commit('setMusic')
    },
    setUserMusicList(context) {
      context.commit('setUserMusicList')
    },
    setUserInfo(context, info) {
      context.commit('setUserInfo', info)
    }
  },
  getters: {
    getMusic: state => {
      return state.music
    },
    getUserMusicList: state => {
      return state.userMusicList
    },
    getUserInfo: state => {
      return state.user_info
    },
    getLoginState: state => {
      return state.loginFlag
    },
    getMusic: state => {
      return state.music
    }
  },
  mutations: {
    setMusic(state, music) {
      state.music = music
    },
    setUserMusicList(list) {},
    setUserInfo(state, info) {
      state.user_info.id = info.id,
        state.user_info.name = info.name,
        state.user_info.head_portrait = info.head_portrait
    },
    setUesrId(state, id) {
      state.user_info.id = id
      window.localStorage.setItem('user_id', id)
    },
    setUserName(state, name) {
      state.user_info.name = name
      window.localStorage.setItem('username', name)
    },
    setUserImage(state, image) {
      state.user_info.head_portrait = image
      window.localStorage.setItem('head_image', image)
    },
    setLoginState(state, flag) {
      state.loginFlag = flag
      window.localStorage.setItem('login_flag', flag)
    },
    infoInit(state) {
      state.user_info = {}
      state.music = {}
      state.userMusicList = []
    }
  },
  modules: {}
})