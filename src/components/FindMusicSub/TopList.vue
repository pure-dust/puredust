<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
        <div class="menu-container">
          <div class="list-menu" v-for="(item,i) in list_menu" :key="i">
            <div class="list-title">{{ item.title }}</div>
            <ul v-for="(item_1, i_1) in item.content" :key="i_1" class="menu-box">
              <router-link :to="{path: '/findmusic/toplist', query:{id: item_1.url}}">
                <li class="item-box">
                  <div class="img-container">
                    <img :src="item_1.img_url" alt class="list-item" />
                  </div>
                  <div class="menu-title">
                    <p>{{ item_1.name }}</p>
                    <p>{{ item_1.intro }}</p>
                  </div>
                </li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="content-box">
          <div class="header">
            <div class="img-container">
              <img :src="current.img_url" alt class="list-item" />
              <div class="img-border"></div>
            </div>
            <div class="header-detail">
              <div class="title">{{ current.name }}</div>
              <div class="intro">{{ current.intro }}</div>
              <div class="fun">
                <button type="button" @click="playList">播放</button>
                <button type="button">收藏</button>
                <button type="button">下载</button>
              </div>
            </div>
          </div>
          <div class="music-box">
            <div class="music-intro">
              <p>歌曲列表</p>
            </div>
            <div class="music-content">
              <table>
                <tr>
                  <th></th>
                  <th>标题</th>
                  <th>时长</th>
                  <th>歌手</th>
                </tr>
                <tr v-for="(item, i) in music_list" :key="i">
                  <td>{{ i+1 }}</td>
                  <td>
                    <router-link
                      :to="{path: '/song', query:{id: item.music_id}}"
                    >{{ item.music_name }}</router-link>
                  </td>
                  <td>{{ item.time }}</td>
                  <td>
                    <router-link
                      :to="{path: '/findmusic/artist', query:{id: item.singer_id}}"
                    >{{ item.music_singer }}</router-link>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list_menu: [],
      music_list: [],
      current: ""
    };
  },
  methods: {
    getMenu() {
      this.axios({
        method: "get",
        url: "api/users/getrankingmenu"
      })
        .then(res => {
          this.list_menu = res.data;
        })
        .catch(err => {
          throw err;
        });
    },
    getList() {
      this.axios({
        method: "get",
        url: "api/users/getrankinglist",
        params: {
          id: this.$route.query.id
        }
      })
        .then(res => {
          this.music_list = res.data;
          this.setImg();
        })
        .catch(err => {
          throw err;
        });
    },
    setImg() {
      if (typeof this.getPath != "number")
        this.current = this.list_menu[0].content[0];
      this.list_menu[0].content.forEach(element => {
        if (element.url == parseInt(this.$route.query.id)) {
          this.current = element;
        }
      });
    },
    playList() {
      this.$store.commit("setCurrentPlayList", this.music_list);
    }
  },
  mounted() {
    this.getMenu();
    this.getList();
  },
  computed: {
    getPath() {
      return this.$route.query.id;
    }
  },
  watch: {
    getPath(val) {
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
//外层容器
.border-line {
  height: 100%;
  border: 1px solid #ccc;
  border-top: none;
  display: flex;
}

.left {
  flex: 1;
  border-right: 1px solid rgba(28, 28, 28, 0.2);
  background-color: #fcfcfc;

  .menu-container {
    margin-top: 40px;
  }
}

.right {
  flex: 3;
  background-color: white;
}

//榜单菜单
.list-menu {
  .list-title {
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 600;
  }

  .menu-box {
    list-style: none;
    margin: 0;

    a {
      text-decoration: none;
      color: rgb(28, 28, 28);
    }

    .item-box {
      display: flex;
      align-items: center;
      padding: 8px 15px;

      .menu-title {
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          margin: 5px 0;
          font-size: 12px;
        }
        p:nth-child(2) {
          color: darkgray;
        }
      }
    }

    .item-box:hover {
      background-color: rgb(230, 230, 230);
    }

    .item-box:visited {
      background-color: rgb(230, 230, 230);
    }
  }
}

//榜单详情
.content-box {
  .header {
    display: flex;
    align-items: center;
    padding: 40px;

    .header-detail {
      width: 78%;
      height: 100%;
      padding-left: 20px;

      .title {
        font-size: 24px;
        margin-bottom: 10px;
      }

      .intro {
        color: #337ab7;
        margin-bottom: 10px;
        display: block;
        font-size: 12px;
      }

      .fun {
        display: flex;

        button {
          width: 80px;
          height: 30px;
          margin-right: 20px;
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

//歌曲列表
.music-box {
  padding: 0 40px;

  .music-intro {
    margin-bottom: 5px;
    font-size: 20px;
  }

  .music-content {
    border-top: 2px solid #337ab7;
    table {
      width: 100%;
      border: 1px solid rgba(28, 28, 28, 0.3);
      border-collapse: collapse;

      th,
      td {
        font-weight: normal;
        color: rgba(28, 28, 28, 0.8);
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        font-size: 12px;

        a {
          color: rgba(28, 28, 28, 0.8);
        }

        a:hover {
          text-decoration: underline;
        }
      }

      th {
        background: linear-gradient(rgb(255, 255, 255), rgb(235, 235, 235));
        border: 1px solid rgba(28, 28, 28, 0.3);
        text-align: left;
        color: rgba(28, 28, 28, 0.8);
        box-shadow: 0 1px 2px #aaaaaa;
        box-sizing: content-box;
      }

      tr:nth-child(odd) {
        background-color: white;
      }

      tr:nth-child(even) {
        background-color: rgba(230, 230, 230, 0.3);
      }

      td {
        height: 30px;
        line-height: 30px;
      }

      td:nth-child(1),
      th:nth-child(1) {
        width: 10%;
        padding-left: 3%;
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

//正方形容器
.img-container {
  width: 22%;
  padding-bottom: 22%;
}
</style>