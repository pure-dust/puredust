<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
        <div class="content-box">
          <div class="header">
            <div class="img-container">
              <img :src="info.cover" alt class="list-item" />
              <div class="img-border"></div>
            </div>
            <div class="header-detail">
              <div class="title">{{ info.name }}</div>
              <router-link
                class="intro"
                :to="{ path: '/user/home',query:{id: info.author} }"
              >{{ info.author }}</router-link>
              <div class="fun">
                <a href="javascript:;" @click="playList">播放</a>
                <a href="javascript:;" @click="collectList">收藏</a>
                <a href="javascript:;" @click="downLoad">下载</a>
                <a href="#comment">评论</a>
              </div>
            </div>
          </div>
          <div class="music-box">
            <div class="music-intro">
              <p>歌曲列表</p>
            </div>
            <div class="music-content">
              <songs :song_list="music_list" :flag="true"></songs>
            </div>
          </div>
          <div class="comments-box" id="comment">
            <comments v-if="info.id" :kind="'playlist'" :index="info.id"></comments>
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
      music_list: [],
      info: {}
    };
  },
  methods: {
    getMusic() {
      let id = this.$route.query.id;
      this.axios({
        method: "get",
        url: "api/users/getplaylistmusic",
        params: {
          id: id
        }
      })
        .then(res => {
          this.music_list = res.data.list;
          this.info = res.data.info;
        })
        .catch(err => {
          console.log(err);
        });
    },
    playList() {
      this.$store.commit("setCurrentPlayList", this.music_list);
    },
    collectList() {
      this.axios({
        method: "post",
        url: "api/users/addcollectlist",
        data: {
          id: this.info.id,
          author: this.info.author,
          owner: this.$store.getters.getUserInfo.id
        }
      }).then(res => {
        if (res.data == 1) this.$Toast("收藏成功");
        else if (res.data == 0) this.$Toast("列表已存在");
        else if (res.data == "err") this.$Toast("失败!");
      });
    },
    downLoad() {
      this.music_list.forEach(element => {
        let alink = document.createElement("a");
        alink.setAttribute(
          "href",
          `http://127.0.0.1:5050/users/downloadmusic?id=${element.music_id}`
        );
        alink.click();
      });
    }
  },
  created() {
    this.getMusic();
  }
};
</script>

<style lang="less" scoped>
.border-line {
  height: 100%;
  border: 1px solid rgba(28, 28, 28, 0.3);
  border-top: none;
  display: flex;
  background-color: #fff;

  .left {
    flex: 3;
    border-right: 1px solid rgba(28, 28, 28, 0.3);
  }

  .right {
    flex: 1;
  }
}

.content-box {
  .header {
    display: flex;
    align-items: center;
    padding: 40px;

    .header-detail {
      width: 78%;
      height: 100%;
      padding: 0 20px;

      .title {
        font-size: 24px;
        margin-bottom: 10px;
      }

      .intro {
        color: #337ab7;
        margin-bottom: 10px;
        display: block;
      }

      .fun {
        display: flex;
        justify-content: space-between;

        a {
          display: inline-block;
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: linear-gradient(#8ec3f1, #4a96d8);
          border: 1px solid #285c8a;
          color: #fff;
          font-size: 14px;
          border-radius: 3px;
        }
      }
    }
  }

  .img-border {
    width: 105%;
    height: 105%;
    border: 1px solid rgba(28, 28, 28, 0.2);
    position: absolute;
    transform: translateX(-2.5%) translateY(-2.5%);
  }
}

.img-container {
  width: 22%;
  padding-bottom: 22%;
}

.music-box {
  padding: 0 40px;

  .music-intro {
    margin-bottom: 5px;
    font-size: 20px;
  }

  .music-content {
    border-top: 2px solid #337ab7;
  }
}

.comments-box {
  padding: 40px;
}
</style>