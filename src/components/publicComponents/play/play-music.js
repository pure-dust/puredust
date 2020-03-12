import music_play from './play-music.vue';

export default {
    install:function(Vue) {
        Vue.component('music-play', music_play)
    }
};