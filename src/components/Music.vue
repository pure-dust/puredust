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
              <button class="nor-btn">收藏</button>
              <button class="nor-btn">下载</button>
              <button class="nor-btn">评论</button>
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
      id: ""
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
    }
  },
  created() {
    this.getMusic();
  }
};
</script>

<style lang="less" scoped>
.outer-box {
  width: 100%;
  height: 100%;
  padding: 0 13%;

  .border-line {
    height: 100%;
    border: 1px solid rgba(28, 28, 28, 0.3);
    border-top: none;
    display: flex;

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
</style>