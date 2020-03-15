<template>
  <div class="outer-box">
    <div class="left">
      <div class="menu-container">
        <div class="list-menu" v-for="(item,i) in list_menu" :key="i">
          <div class="list-title">{{ item.title }}</div>
          <ul v-for="(item_1, i_1) in item.content" :key="i_1" class="menu-box">
            <router-link :to="{path: '/findmusic/toplist', query:{id: item_1.url}}" @click="getData(item_1.url)">
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
                <td> <router-link :to="{path: '/song', query:{id: item.music_id}}"> {{ item.name }} </router-link> </td>
                <td>{{ item.time }}</td>
                <td><router-link :to="{path: '/findmusic/artist', query:{id: item.singer_id}}"> {{ item.singer }} </router-link></td>
              </tr>
            </table>
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
      title: 1,
      intro: 1,
      music_list: [],
      comment: []
    };
  },
  methods: {
    init() {
      this.list_menu = [
        {
          title: "尘心音乐特色榜",
          content: [
            {
              name: " 尘心音乐飙升榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 1
            },
            {
              name: " 尘心音乐新歌榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 2
            },
            {
              name: "尘心原创歌曲榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 3
            },
            {
              name: " 尘心音乐热歌榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 4
            }
          ]
        },
        {
          title: "尘心音乐特色榜",
          content: [
            {
              name: " 尘心音乐飙升榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 5
            },
            {
              name: " 尘心音乐新歌榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 6
            },
            {
              name: "尘心原创歌曲榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 7
            },
            {
              name: " 尘心音乐热歌榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 8
            }
          ]
        },
        {
          title: "尘心音乐特色榜",
          content: [
            {
              name: " 尘心音乐飙升榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 9
            },
            {
              name: " 尘心音乐新歌榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 10
            },
            {
              name: "尘心原创歌曲榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 11
            },
            {
              name: " 尘心音乐热歌榜",
              intro: "每天更新",
              img_url: "static/1.png",
              url: 12
            }
          ]
        }
      ];
      this.music_list = [
        {
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        },{
          num: "1",
          name: "有没有那么一首歌",
          time: "3:44",
          singer: "周华健"
        }
      ];
    },
    getData(url) {
    }
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>

<style lang="less" scoped>
//外层容器
.outer-box {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 13%;
  background-color: #f5f5f5;

  .left {
    flex: 1;
    border: 1px solid rgba(28, 28, 28, 0.2);
    background-color: #fcfcfc;

    .menu-container {
      margin-top: 40px;
    }
  }

  .right {
    flex: 3;
    border-right: 1px solid rgba(28, 28, 28, 0.2);
    background-color: white;
  }
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
  height: 0;
  padding-bottom: 22%;
  position: relative;

  .list-item {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>