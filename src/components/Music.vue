<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
        <div class="music-detail">
          <div class="detail-left">
            <div class="img-container">
              <img :src="music.music_cover" alt />
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
              <button class="play-btn nor-btn e-btn" @click="playMusic">播放</button>
              <button class="plus-btn nor-btn e-btn">+</button>
              <button class="nor-btn" @click="collectMusic">收藏</button>
              <button class="nor-btn">下载</button>
              <button class="nor-btn">评论</button>
            </div>
            <div class="collect" v-if="collectedFlag">
              <div class="collect-header">
                <span class="close" @click="collectMusic"></span>
              </div>
              <div class="list-container">
                <ul>
                  <li v-for="(item, i) in play_list" :key="i" @click="addMusic(item.id)">
                    <div class="img-container">
                      <img :src="item.cover" alt />
                    </div>
                    <div class="list-name">
                      <p>{{ item.name }}</p>
                      <p>{{ item.length }}首</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
      id: "",
      collectedFlag: false
    };
  },
  methods: {
    getMusic() {
      let id = this.$route.query.id;
      this.axios({
        method: "get",
        url: "api/users/getmusic",
        params: {
          id: id
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
            this.$Toast({message: '当前歌曲已在歌单内', time: 3000})
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getMusic();
    this.play_list = this.$store.getters.getUserMusicList;
    this.collected_list = this.$store.getters.getUserCollectedList;
  },
  watch: {
    "this.$store.state.userMusicList"(val) {
      this.play_list = this.$store.getters.getUserMusicList;
    },
    "this.$store.state.userCollectedList"(val) {
      this.collected_list = this.$store.getters.getUserCollectedList;
    }
  }
};
</script>

<style lang="less" scoped>
.outer-box {
  width: 100%;
  height: 100%;
  padding: 0 13%;
  background: #f5f5f5;

  .border-line {
    height: 100%;
    border: 1px solid rgba(28, 28, 28, 0.3);
    border-top: none;
    display: flex;
    background: #ffffff;

    .left {
      flex: 2.5;
      border-right: 1px solid rgba(28, 28, 28, 0.3);
    }

    .right {
      flex: 1;
    }
  }
}

.left {
  padding: 40px;

  .music-detail {
    display: flex;

    .detail-left {
      .img-container {
        border: 30px solid #282828;
        border-radius: 50%;
        width: 180px;
        height: 180px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
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
    height: 100%;

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

        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
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