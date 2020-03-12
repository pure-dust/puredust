import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music: {
      id: null,
      name: null,
      singer: null,
      data: null,
      album: null,
      cover: null
    },
    userMusicList: []
  },
  actions: {
    setMusic(context) {
      context.commit('setMusic')
    },
    setUserMusicList(context) {
      context.commit('setUserMusicList')
    }
  },
  getters: {
    getMusic: state => {
      return state.music
    },
    getUserMusicList: state => {
      return state.userMusicList
    }
  },
  mutations: {
    setMusic(state, payload) {
      state.music.id = payload.music.music_id
      state.music.name = payload.music.music_name
      state.music.singer = payload.music.music_singer
      state.music.data = payload.music.music_data
      state.music.album = payload.music.music_album
    },
    setUserMusicList(list) {}
  },
  modules: {}
})