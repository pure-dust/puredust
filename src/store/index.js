import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_info: {
      id: null,
      name: null,
      password: null,
      indro: null,
      gender: null,
      birthday: null,
      head_portrait: null,
      province: null,
      city: null
    },
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
    setUserMusicList(list) {},
    setUserInfo(state, info) {
      state.user_info.id = info.id,
      state.user_info.name = info.name,
      state.user_info.password = info.password,
      state.user_info.indro = info.indro,
      state.user_info.gender = info.gender,
      state.user_info.birthday = info.birthday,
      state.user_info.head_portrait = info.head_portrait,
      state.user_info.province = info.province,
      state.user_info.city = info.city
    }
  },
  modules: {}
})