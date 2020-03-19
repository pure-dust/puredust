<template>
  <div class="outer-box">
    <div class="inner-box">
      <div class="left">
        <div class="my-video">
          <a href class="fun-title">我的视频</a>
        </div>
        <div class="my-play-list">
          <div class="list-header">
            <i class="arrow" :class="{'arrow-rotate': spread_flag_1}"></i>
            <span
              href="javascript:;"
              @click="spread_flag_1 = !spread_flag_1"
              class="fun-title"
            >创建的歌单</span>
            <div class="create-list" @click="createPanel">
              <span>+</span>
              <p>新建</p>
            </div>
          </div>
          <ul class="list" v-show="spread_flag_1">
            <li
              v-for="(item, i) in play_list"
              :key="i"
              :data-index="i"
              @click="getMusic(1,item.id, $event)"
              :class="{ 'selection': select_index_1 == i }"
            >
              <div class="img-container">
                <img :src="item.cover" alt class="list-item" />
              </div>
              <div class="intro">
                <p>{{ item.name }}</p>
                <p>{{ play_list.length }}首</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="my-play-list">
          <div class="list-header">
            <i class="arrow" :class="{'arrow-rotate': spread_flag_2}"></i>
            <span
              href="javascript:;"
              @click="spread_flag_2 = !spread_flag_2"
              class="fun-title"
            >收藏的歌单</span>
          </div>
          <ul class="list" v-show="spread_flag_2">
            <li
              v-for="(item, i) in collected_list"
              :key="i"
              :data-index="i"
              @click="getMusic(2,item.id, $event)"
              :class="{ 'selection': select_index_2 == i }"
            >
              <div class="img-container">
                <img :src="item.cover" alt class="list-item" />
              </div>
              <div class="intro">
                <p>{{ item.name }}</p>
                <p>{{ item.number }}首</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="content-box">
          <div class="header">
            <div class="img-container">
              <img src="static/1.png" alt class="list-item" />
              <div class="img-border"></div>
            </div>
            <div class="header-detail">
              <div class="title">11</div>
              <div class="intro">11</div>
              <div class="fun">
                <button type="button">播放</button>
                <button type="button">收藏</button>
                <button type="button">下载</button>
                <button type="button">评论</button>
              </div>
            </div>
          </div>
          <div class="music-box">
            <div class="music-intro">
              <h3>歌曲列表</h3>
            </div>
            <div class="music-content">
              <table>
                <tr>
                  <th></th>
                  <th>标题</th>
                  <th>时长</th>
                  <th>歌手</th>
                </tr>
                <tr v-for="(item, i) in song_list" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <router-link
                      :to="{path: '/song', query: {id: item.music_id}}"
                    >{{ item.music_name }}</router-link>
                  </td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.music_singer }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-panel" v-show="create_list_flag">
      <div class="create-header">
        <p>新建歌单</p>
        <span class="close" @click="createPanel"></span>
      </div>
      <div class="create-content">
        <label for="name">
          歌单名:
          <input type="text" id="name" autocomplete="off" ref="list_name" />
        </label>
        <div class="btn-box">
          <input type="button" value="创建" class="btn-create" @click="createList" />
          <input type="button" value="取消" class="btn-cancel" @click="createPanel" />
        </div>
      </div>
    </div>
    <div class="cover-panel" v-show="create_list_flag"></div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      spread_flag_1: true,
      spread_flag_2: true,
      select_index_1: this.$cookies.get("l_s1") || 0,
      select_index_2: this.$cookies.get("l_s2") || -1,
      hover_index: "",
      play_list: [],
      collected_list: [],
      create_list_flag: false,
      song_list: []
    };
  },
  methods: {
    getMusic(num, id, event) {
      if (num === 1) {
        this.select_index_1 = event.currentTarget.dataset.index;
        this.select_index_2 = -1;
      } else {
        this.select_index_2 = event.currentTarget.dataset.index;
        this.select_index_1 = -1;
      }
      this.$cookies.set("l_id", id, 0);
      this.$cookies.set("l_s1", this.select_index_1, 0);
      this.$cookies.set("l_s2", this.select_index_2, 0);
      this.$router.push({ path: "/my/playlist", query: { id: id } });
    },
    createPanel() {
      this.create_list_flag = !this.create_list_flag;
    },
    createList() {
      let name = this.$refs.list_name.value;
      let user_id = this.$store.getters.getUserInfo.id;
      this.axios({
        method: "post",
        url: "api/users/addplaylist",
        data: {
          userId: user_id,
          listName: name
        }
      })
        .then(res => {
          if (res.data === "success") {
            this.create_list_flag = !this.create_list_flag;
            this.getPlayList();
          } else {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSongList(id) {
      this.axios({
        method: "get",
        url: "api/users/getplaylistmusic",
        params: {
          id: id
        }
      })
        .then(res => {
          this.song_list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.play_list = this.$store.getters.getUserMusicList;
    this.collected_list = this.$store.getters.getUserCollectedList;
    if (this.$cookies.get("l_id")) {
      this.getSongList(this.$cookies.get("l_id"));
    } else {
      let clock = setInterval(() => {
        if (this.play_list.length > 0) {
          this.getSongList(this.play_list[0].id);
          clearInterval(clock);
        }
      });
    }
  },
  computed: {
    userMusicList() {
      return this.$store.getters.getUserMusicList;
    },
    userCollectedList() {
      return this.$store.getters.getUserCollectedList;
    },
    loginFlag() {
      return this.$store.getters.getLoginState;
    },
    getCurrentId() {
      return this.$route.query.id;
    }
  },
  watch: {
    userMusicList(val) {
      this.play_list = this.$store.getters.getUserMusicList;
    },
    userCollectedList(val) {
      this.collected_list = this.$store.getters.getUserCollectedList;
    },
    loginFlag(val) {
      this.reload();
    },
    getCurrentId(val) {
      this.getSongList(val);
    }
  }
};
</script>

<style lang="less" scoped>
//最外层容器
.outer-box {
  width: 100%;
  height: calc(100% - 60px);
  background-color: #f5f5f5;
  padding: 0 13%;

  .inner-box {
    border: 1px solid lightgray;
    display: flex;
    height: 100%;
  }

  .left {
    flex: 1;
    border-right: 1px solid lightgray;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fafafa;
    height: 100%;
  }

  .left::-webkit-scrollbar {
    width: 8px;
    height: 1px;
  }

  .left::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(51, 122, 183, 0.4);
  }

  .left::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #ededed;
  }

  .right {
    flex: 3;
    background-color: #ffffff;
  }
}
//列表标题
.fun-title {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  padding-left: 15%;
  font-size: 15px;
  font-weight: 600;
  color: black;
}

.my-video {
  height: 35px;
  line-height: 35px;
}

.my-video:hover {
  background-color: #eeeeee;
}
//列表头部
.list-header {
  height: 35px;
  line-height: 35px;
  position: relative;
  cursor: pointer;

  .arrow {
    width: 10px;
    border-width: 7px;
    border-color: transparent transparent transparent #aaaaaa;
    border-style: solid;
    transform: translateY(-50%);
    position: absolute;
    left: 20px;
    top: 50%;
  }

  .arrow-rotate {
    transform: translateX(-25%) rotateZ(90deg);
  }

  .create-list {
    width: 55px;
    height: 22px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 10px;
    line-height: 22px;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
    display: flex;
    justify-content: space-evenly;
    background: linear-gradient(#ffffff, #ebebeb);
    font-size: 12px;
    box-sizing: content-box;

    span {
      color: #337ab7;
      font-weight: 900;
      font-size: 16px;
    }
  }

  .create-list:hover {
    background: white;
  }
}
//左侧歌单列表
.list {
  li {
    padding: 5px 0;
    padding-left: 20px;
    display: flex;
    cursor: pointer;
  }

  .selection {
    background: #e6e6e6;
  }

  .selection:hover {
    background: #e6e6e6;
  }

  .intro {
    padding-left: 10px;
    line-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      font-size: 12px;
      margin: 0;
    }

    p:nth-child(2) {
      font-size: 10px;
      color: #aaaaaa;
    }
  }

  li:hover {
    background: #f4f2f2;
  }
}

//正方形容器
.img-container {
  width: 18%;
  height: 0;
  padding-bottom: 18%;
  position: relative;

  .list-item {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
//右侧容器
.content-box {
  .header {
    display: flex;
    align-items: center;
    padding: 40px;

    .header-detail {
      width: 70%;
      height: 100%;
      padding-left: 20px;

      .title {
        font-size: 24px;
      }

      .intro {
        color: darkgray;
      }

      .fun {
        display: flex;
        justify-content: space-around;

        button {
          width: 80px;
          height: 30px;
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
    width: 30%;
    padding-bottom: 30%;
  }
}
//歌曲表格
.music-box {
  padding: 0 40px;

  .music-intro {
    border-bottom: 2px solid #337ab7;
  }

  .music-content {
    table {
      width: 100%;
      border: 1px solid rgba(28, 28, 28, 0.3);
      border-collapse: collapse;

      a {
        color: #282828;
      }

      a:hover {
        text-decoration: underline;
      }

      th,
      td {
        font-weight: normal;
        color: #282828;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        font-size: 12px;
      }

      th {
        background: linear-gradient(rgb(255, 255, 255), rgb(235, 235, 235));
        border: 1px solid rgba(28, 28, 28, 0.3);
      }

      tr:nth-child(odd) {
        background-color: white;
      }

      tr:nth-child(even) {
        background-color: rgba(230, 230, 230, 0.6);
      }

      td {
        height: 30px;
        line-height: 30px;
      }

      td:nth-child(1),
      th:nth-child(1) {
        width: 10%;
      }

      td:nth-child(2),
      th:nth-child(2) {
        width: 55%;
      }

      td:nth-child(3),
      th:nth-child(3) {
        width: 15%;
      }
    }
  }
}

//创建歌单页
.create-panel {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin: auto;
  width: 450px;
  height: 200px;
  border-radius: 3px;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 0 10px #282828;
  cursor: default;

  .create-header {
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    background: #282828;
    color: white;
    display: flex;
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
      height: 3px;
      border-radius: 3px;
      background: white;
      transform: translateY(50%) translateX(-50%) rotateZ(45deg);
    }

    .close::after {
      content: "";
      display: block;
      width: 20px;
      height: 3px;
      border-radius: 3px;
      background: white;
      transform: translateY(-50%) translateX(-50%) rotateZ(-45deg);
    }
  }

  .create-content {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    padding: 40px;
  }

  #name {
    width: 300px;
    height: 35px;
    outline: none;
    padding: 5px 10px;
    border-radius: 2px;
    border: 1px solid #bbbbbb;
  }

  .btn-box {
    width: 100%;
    height: 35px;
    margin-top: 20px;
    display: flex;
    padding: 0 20%;
    justify-content: space-around;

    input {
      height: 30px;
      line-height: 30px;
      width: 70px;
      border-radius: 5px;
      border: 1px solid #bbbbbb;
      outline: none;
      cursor: pointer;
    }

    .btn-create {
      background: linear-gradient(#85bdee, #337ab7);
      color: white;
    }

    .btn-create:hover {
      background: linear-gradient(#92c9fa, #4d91cc);
    }

    .btn-create:active {
      background: linear-gradient(#337ab7, #72b1e9);
    }

    .btn-cancel {
      background: linear-gradient(#ffffff, #eeeeee);
    }

    .btn-cancel:hover {
      background: linear-gradient(#ffffff, #ffffff);
    }

    .btn-cancel:active {
      background: linear-gradient(#eeeeee, #ffffff);
    }
  }
}

.cover-panel {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>