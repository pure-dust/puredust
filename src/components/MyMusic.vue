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
            <div class="create-list">
              <span>+</span>
              <p>新建</p>
            </div>
          </div>
          <ul class="list" v-show="spread_flag_1">
            <li
              v-for="(item, i) in play_list"
              :key="i"
              :data-index="i"
              @click="getMusic(1,item.url, $event)"
              :class="{ 'selection': select_index_1 == i }"
            >
              <div class="img-container">
                <img :src="item.img" alt class="list-item" />
              </div>
              <div class="intro">
                <p>{{ item.name }}</p>
                <p>{{ item.number }}首</p>
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
              v-for="(item, i) in play_list"
              :key="i"
              :data-index="i"
              @click="getMusic(2,item.url, $event)"
              :class="{ 'selection': select_index_2 == i }"
            >
              <div class="img-container">
                <img :src="item.img" alt class="list-item" />
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
                <tr v-for="(item, i) in play_list" :key="i">
                  <td>{{ item.num }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.singer }}</td>
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
      spread_flag_1: false,
      spread_flag_2: false,
      select_index_1: 0,
      select_index_2: "",
      hover_index: "",
      play_list: []
    };
  },
  methods: {
    init() {
      this.play_list = [
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" },
        { name: "幻想国度", number: 0, img: "static/1.png", url: "" }
      ];
    },
    getMusic(num, url, event) {
      if (num === 1) {
        this.select_index_1 = event.currentTarget.dataset.index;
        this.select_index_2 = -1;
      } else {
        this.select_index_2 = event.currentTarget.dataset.index;
        this.select_index_1 = -1;
      }
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
    font-size: 14px;

    span {
      color: #337ab7;
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

  .music-content {
    table {
      width: 100%;
      border: 1px solid rgba(28, 28, 28, 0.3);
      border-collapse: collapse;

      th,
      td {
        font-weight: normal;
        color: darkgray;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
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
</style>