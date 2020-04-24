<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
        <div class="music-detail">
          <div class="detail-left">
            <div class="img-container">
              <img class="list-item" :src="music.music_cover" alt />
            </div>
          </div>
          <div class="detail-right">
            <div class="intro">
              <em class="title">{{music.music_name}}</em>
              <p class="singer">
                歌手：
                <router-link :to="{path: '/user/home',query:{id: id}}">{{ music.music_singer }}</router-link>
              </p>
              <p class="album">
                专辑：
                <router-link :to="{path: '/playlist', query:{id: id}}">{{ music.music_album }}</router-link>
              </p>
            </div>
            <div class="fun-btn">
              <a class="play-btn nor-btn e-btn" href="javascript:;" @click="playMusic">播放</a>
              <a class="plus-btn nor-btn e-btn" href="javascript:;" @click="pushList">+</a>
              <a class="nor-btn" href="javascript:;" @click="collectMusic">收藏</a>
              <a class="nor-btn" href="javascript:;" @click="downLoad">下载</a>
              <a class="nor-btn" href="javascript:;" @click="scrolled('#comments')">评论</a>
            </div>
            <div class="collect" v-if="collectedFlag">
              <div class="collect-header">
                <span class="close" @click="collectMusic"></span>
              </div>
              <div class="list-container">
                <ul>
                  <li v-for="(item, i) in play_list" :key="i" @click="addMusic(item.id)">
                    <div class="img-container">
                      <img class="list-item" :src="item.cover" alt />
                    </div>
                    <div class="list-name">
                      <p>{{ item.name }}</p>
                      <p>{{ play_list.length }}首</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <comments
          :index="(typeof this.id == Number)?this.id:parseInt(this.id)"
          :kind="'music'"
          id="comments"
        ></comments>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      music: {},
      play_list: [],
      collected_list: [],
      id: this.$route.query.id,
      collectedFlag: false
    };
  },
  methods: {
    getMusic() {
      this.axios({
        method: "get",
        url: "api/users/getmusic",
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.music = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    playMusic() {
      this.$store.commit("setMusic", this.music);
      this.$store.commit("setCurrentPlayList", [this.music]);
    },
    collectMusic() {
      this.collectedFlag = !this.collectedFlag;
    },
    addMusic(list_id) {
      this.axios({
        method: "post",
        url: "api/users/addMusic",
        data: {
          listId: list_id,
          musicId: this.music.music_id
        }
      })
        .then(res => {
          if (res.data == "success") this.collectMusic();
          else {
            this.$Toast({ message: "当前歌曲已在歌单内", time: 3000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    scrolled(id) {
      let anchor = this.$el.querySelector(id);
      document.body.scrollTop = anchor.offsetTop;
      document.documentElement.scrollTop = anchor.offsetTop;
    },
    pushList() {
      this.$store.commit("addCurrentPlayList", this.music);
    },
    downLoad() {
      let alink = document.createElement("a");
      alink.setAttribute(
        "href",
        `http://127.0.0.1:5050/users/downloadmusic?id=${this.id}`
      );
      alink.click();
    }
  },
  created() {
    this.getMusic();
    this.play_list = this.$store.getters.getUserMusicList;
    this.collected_list = this.$store.getters.getUserCollectedList;
  },
  computed: {
    MusicList: {
      get() {
        return this.$store.getters.getUserMusicList;
      },
      set(value) {}
    }
  },
  watch: {
    MusicList(val) {
      this.play_list = val;
    },
    CollectedList(val) {
      this.collected_list = val;
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  flex: 2.5;
  border-right: 1px solid rgba(28, 28, 28, 0.3);
}

.right {
  flex: 1;
}

.left {
  padding: 40px;

  .music-detail {
    display: flex;
    margin-bottom: 40px;
    
    .img-container {
      border: 30px solid #282828;
      border-radius: 50%;
      width: 180px;
      height: 180px;
      overflow: hidden;
      padding: 0;
    }

    .detail-right {
      width: 100%;
      padding-left: 30px;

      a {
        color: #0c73c2;
      }

      .intro {
        .title {
          font-size: 24px;
          font-style: normal;
        }

        p {
          font-size: 12px;
          color: #999;
          margin: 10px 0;
        }
      }

      .fun-btn {
        margin-top: 30px;
        width: 100%;
        display: flex;

        .nor-btn {
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 3px;
          border: 1px solid #999;
          font-size: 12px;
          outline: none;
          margin-right: 20px;
          cursor: pointer;
          background: linear-gradient(#ffffff 50%, #d8d8d8);
          box-shadow: 0 0 1px #999;
        }

        .nor-btn:hover {
          background: linear-gradient(#ffffff 60%, #e9e9e9);
          border-color: #cccccc;
        }

        .nor-btn:active {
          background: linear-gradient(#d8d8d8 10%, #ffffff);
          border-color: #999;
        }

        .e-btn {
          background: linear-gradient(#8ec3f1, #4a96d8);
          border: 1px solid #285c8a;
        }

        .play-btn {
          color: white;
          margin: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .plus-btn {
          width: 30px;
          color: white;
          font-size: 20px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: none;
        }

        .e-btn:hover {
          background: linear-gradient(#95cdff, #5098d6);
          border-color: #285c8a;
        }

        .e-btn:active {
          background: linear-gradient(#4a96d8, #8ec3f1);
        }
      }
    }
  }
}

.collect {
  width: 400px;
  height: 360px;
  position: fixed;
  top: 160px;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid #999;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px #282828;
  overflow: hidden;
  z-index: 1000;

  .collect-header {
    padding: 5px;
    width: 100%;
    height: 40px;
    background: #282828;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close {
      width: 10px;
      height: 10px;
      margin-left: auto;
      cursor: pointer;
    }

    .close::before {
      content: "";
      display: block;
      width: 20px;
      height: 5px;
      border-radius: 5px;
      background: white;
      transform: translateY(50%) translateX(-50%) rotateZ(45deg);
    }

    .close::after {
      content: "";
      display: block;
      width: 20px;
      height: 5px;
      border-radius: 5px;
      background: white;
      transform: translateY(-50%) translateX(-50%) rotateZ(-45deg);
    }
  }

  .list-container {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 320px;

    ul {
      li {
        list-style: none;
        cursor: pointer;
        display: flex;
        padding: 5px;
        padding-left: 30px;
        border-bottom: 1px solid #ccc;
      }

      .img-container {
        position: relative;
        width: 12%;
        height: 0;
        padding-bottom: 12%;
        border: none;
      }

      .list-name {
        padding: 2px;
        width: 88%;
        font-size: 12px;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p:nth-child(2) {
          color: #aaaaaa;
        }
      }
    }
  }
}
</style>