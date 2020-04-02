<template>
  <div class="content-box">
    <div class="rotationChart">
      <swipe :auto="4000" :image="rotationChartData" v-if="rotationChartData.length > 0"></swipe>
    </div>
    <div class="outer-box">
      <div class="border-line">
        <div class="main-left">
          <div class="recommend-container">
            <div class="music-recommend">
              <i class="icon"></i>
              <a href class="title">热门推荐</a>
              <ul class="recommend-menu">
                <li v-for="(item, i) in recommend_menu" :key="i" class="rec-menu-list">
                  <a href>{{ item }}</a>
                </li>
              </ul>
              <a href class="more">更多</a>
            </div>
            <div class="song-sheet">
              <div v-for="(item, i) in music_list" :key="i" class="detail-container">
                <div class="img-container">
                  <router-link
                    :to="{path: '/playlist', query:{id: item.id}}"
                    :title="item.title"
                    class="link"
                  >
                    <img :src="item.music_cover" alt class="list-item" />
                  </router-link>
                </div>
                <div class="bottom">
                  <router-link
                    :to="{path: '/playlist', query:{id: item.id}}"
                    :title="item.title"
                  >{{ item.music_name }}</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="recommend-container">
            <div class="music-recommend">
              <i class="icon"></i>
              <a href class="title">新曲上架</a>
              <a href class="more">更多</a>
            </div>
            <div class="music-list">
              <div class="music-container">
                <div class="left move-arrow" @click="list_move('left', $event)"></div>
                <div class="list-container">
                  <ul ref="move_list1">
                    <li v-for="(item ,i) in song_list_1" :key="i" class="detail-container">
                      <div class="img-container">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.music_name"
                          class="link"
                        >
                          <img :src="item.music_cover" alt class="list-item" />
                        </router-link>
                      </div>
                      <div class="bottom">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.title"
                        >{{ item.music_name }}</router-link>
                      </div>
                    </li>
                  </ul>
                  <ul ref="move_list2">
                    <li v-for="(item ,i) in song_list_2" :key="i" class="detail-container">
                      <div class="img-container">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.music_name"
                          class="link"
                        >
                          <img :src="item.music_cover" alt class="list-item" />
                        </router-link>
                      </div>
                      <div class="bottom">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.title"
                        >{{ item.music_name }}</router-link>
                      </div>
                    </li>
                  </ul>
                  <ul ref="move_list3">
                    <li v-for="(item ,i) in song_list_1" :key="i" class="detail-container">
                      <div class="img-container">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.music_name"
                          class="link"
                        >
                          <img :src="item.music_cover" alt class="list-item" />
                        </router-link>
                      </div>
                      <div class="bottom">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.title"
                        >{{ item.music_name }}</router-link>
                      </div>
                    </li>
                  </ul>
                  <ul ref="move_list4">
                    <li v-for="(item ,i) in song_list_2" :key="i" class="detail-container">
                      <div class="img-container">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.music_name"
                          class="link"
                        >
                          <img :src="item.music_cover" alt class="list-item" />
                        </router-link>
                      </div>
                      <div class="bottom">
                        <router-link
                          :to="{path: '/song', query: {id: item.music_id}}"
                          :title="item.title"
                        >{{ item.music_name }}</router-link>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="right move-arrow" @click="list_move('right', $event)"></div>
              </div>
            </div>
          </div>
          <div class="recommend-container">
            <div class="music-recommend">
              <i class="icon"></i>
              <a href class="title">榜单</a>
              <a href class="more">更多</a>
            </div>
            <div class="ranking-list">
              <div class="ranking-container">
                <div class="ranking-header">
                  <div class="detail-container">
                    <div class="img-container">
                      <a href class="link">
                        <img src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100" alt class="list-item" />
                      </a>
                    </div>
                  </div>
                  <div class="ranking-title">
                    <a href>飙升榜</a>
                    <div class="fun-button">
                      <a href class="glyphicon glyphicon-play-circle"></a>
                      <a href class="glyphicon glyphicon-plus"></a>
                    </div>
                  </div>
                </div>
                <ul ref="link">
                  <li v-for="(item, i) in ranking_list[0]" :key="i">
                    <span>{{ i+1 }}</span>
                    <router-link
                      :style="{width: width + 'px'}"
                      :to="{path: '/song', query:{id: item.music_id}}"
                    >{{ item.music_name }}</router-link>
                  </li>
                </ul>
                <div class="all-ranking">
                  <a href>查看全部></a>
                </div>
              </div>
              <div class="ranking-container">
                <div class="ranking-header">
                  <div class="detail-container">
                    <div class="img-container">
                      <a href class="link">
                        <img src="http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100" alt class="list-item" />
                      </a>
                    </div>
                  </div>
                  <div class="ranking-title">
                    <a href>飙升榜</a>
                    <div class="fun-button">
                      <a href class="glyphicon glyphicon-play-circle"></a>
                      <a href class="glyphicon glyphicon-plus"></a>
                    </div>
                  </div>
                </div>
                <ul>
                  <li v-for="(item, i) in ranking_list[0]" :key="i">
                    <span>{{ i+1 }}</span>
                    <router-link
                      :style="{width: width + 'px'}"
                      :to="{path: '/song', query:{id: item.music_id}}"
                    >{{ item.music_name }}</router-link>
                  </li>
                </ul>
                <div class="all-ranking">
                  <a href>查看全部></a>
                </div>
              </div>
              <div class="ranking-container">
                <div class="ranking-header">
                  <div class="detail-container">
                    <div class="img-container">
                      <a href class="link">
                        <img src="http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100" alt class="list-item" />
                      </a>
                    </div>
                  </div>
                  <div class="ranking-title">
                    <a href>飙升榜</a>
                    <div class="fun-button">
                      <a href class="glyphicon glyphicon-play-circle"></a>
                      <a href class="glyphicon glyphicon-plus"></a>
                    </div>
                  </div>
                </div>
                <ul>
                  <li v-for="(item, i) in ranking_list[0]" :key="i">
                    <span>{{ i+1 }}</span>
                    <router-link
                      :style="{width: width + 'px'}"
                      :to="{path: '/song', query:{id: item.music_id}}"
                    >{{ item.music_name }}</router-link>
                  </li>
                </ul>
                <div class="all-ranking">
                  <a href>查看全部></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-right">
          <div class="user-area">
            <div class="login"></div>
            <div class="logout">
              <p>登录尘心音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
              <button>用户登录</button>
            </div>
          </div>
          <div>
            <ul class="singer-container">
              <div class="singer-title">
                <span>入驻歌手</span>
                <a href>查看更多></a>
              </div>
              <li class="singer-list" v-for="(item, i) in musician" :key="i">
                <a :href="item.url" class="content-box">
                  <div class="detail-container">
                    <div class="img-container">
                      <img :src="item.head_portrait" alt class="list-item" />
                    </div>
                  </div>
                  <div class="singer-detail">
                    <div class="singer-name">{{ item.name }}</div>
                    <div class="singer-intro">{{ item.intro }}</div>
                  </div>
                </a>
              </li>
            </ul>
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
      //轮播图数据
      rotationChartData: [],
      //歌曲封面
      image: [],
      //歌曲推荐分类菜单
      recommend_menu: [],
      //歌单
      music_list: [],
      //歌曲菜单
      song_list_1: [],
      song_list_2: [],
      //歌曲滑动标识
      temp: 1,
      //排行榜
      ranking_list: [],
      musician: [],
      width: 0
    };
  },
  methods: {
    getRotation() {
      this.axios({
        methods: "GET",
        url: "api/users/rotation"
      })
        .then(res => {
          this.rotationChartData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMusicList() {
      this.axios({
        method: "GET",
        url: "api/users/musiclist"
      })
        .then(res => {
          this.music_list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSongList() {
      this.axios({
        method: "GET",
        url: "api/users/songlist"
      })
        .then(res => {
          this.song_list_1 = res.data.slice(0, 5);
          this.song_list_2 = res.data.slice(5);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRankingList() {
      this.axios({
        methods: "GET",
        url: "api/users/getrankinglist"
      })
        .then(res => {
          this.ranking_list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMusician() {
      this.axios({
        methods: "GET",
        url: "api/users/musician"
      })
        .then(res => {
          this.musician = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    move_action(list_1, list_2, list_3, list_4, direction) {
      if (direction == "left") {
        list_1.style.left = "0";
        list_2.style.left = "100%";
        list_3.style.left = "200%";
        list_4.style.transition = "none";
        list_4.style.left = "-100%";
        setTimeout(() => {
          list_4.style.transition = "all 1s ease-out";
        }, 1000);
        if (this.temp == 4) this.temp = 1;
        else this.temp++;
      } else {
        list_1.style.transition = "none";
        list_1.style.left = "200%";
        list_2.style.left = "-100%";
        list_3.style.left = 0;
        list_4.style.left = "100%";
        setTimeout(() => {
          list_1.style.transition = "all 1s ease-out";
        }, 1000);
        if (this.temp == 1) this.temp = 4;
        else this.temp--;
      }
    },
    list_move(direction, event) {
      let list1 = this.$refs.move_list1;
      let list2 = this.$refs.move_list2;
      let list3 = this.$refs.move_list3;
      let list4 = this.$refs.move_list4;

      event.target.parentElement.style.pointerEvents = "none";
      setTimeout(() => {
        event.target.parentElement.style.pointerEvents = "";
      }, 1000);
      switch (this.temp) {
        case 1: {
          this.move_action(list1, list2, list3, list4, direction);
          break;
        }
        case 2: {
          this.move_action(list4, list1, list2, list3, direction);
          break;
        }
        case 3: {
          this.move_action(list3, list4, list1, list2, direction);
          break;
        }
        case 4: {
          this.move_action(list2, list3, list4, list1, direction);
          break;
        }
      }
    }
  },
  created() {
    this.getRotation();
    this.getMusicList();
    this.getSongList();
    this.getRankingList();
    this.getMusician();
    this.$nextTick(() => {
      let width = this.$refs.link.clientWidth;
      this.width = width * 0.8;
    });
  },
  mounted() {
    let list1 = this.$refs.move_list1;
    let list2 = this.$refs.move_list2;
    let list3 = this.$refs.move_list3;
    let list4 = this.$refs.move_list4;
    list1.style.left = "-100%";
    list2.style.left = 0;
    list3.style.left = "100%";
    list4.style.left = "200%";
  }
};
</script>

<style lang="less" scoped>
//外层容器
.content-box {
  width: 100%;
  min-height: 100%;
}
//轮播图
.rotationChart {
  width: 100%;
  height: 280px;
  padding: 0 13%;
  border-bottom: 1px solid rgba(28, 28, 28, 0.5);
}
//主体区域
.outer-box {
  border-top: none;

  .border-line {
    width: 100%;
    border: 1px solid rgba(28, 28, 28, 0.3);
    border-top: none;
    display: flex;
  }

  .main-left {
    flex: 3;
    padding: 15px 20px 0 20px;
    border-right: 1px solid rgba(28, 28, 28, 0.3);
    background-color: #fcfcfc;
  }

  .main-right {
    flex: 1;
    background-color: #fcfcfc;
  }
}
//歌单推荐
.song-sheet {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  div:nth-child(4n + 0) {
    margin-right: 0;
  }
}
//歌曲推荐
.music-list {
  border: 1px solid rgba(28, 28, 28, 0.3);
  background-color: #eeeeee;
  padding: 10px 0;

  .music-container {
    display: flex;
    justify-content: space-around;
    height: 180px;
    padding: 0 10px;

    .move-arrow {
      height: 12px;
      width: 12px;
      border-width: 3px;
      border-style: solid;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      align-self: center;
      cursor: pointer;
    }

    .left {
      border-color: transparent transparent #aaaaaa #aaaaaa;
    }

    .right {
      border-color: #aaaaaa #aaaaaa transparent transparent;
    }

    .list-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      .detail-container {
        width: 18%;
        margin: 0;
        height: 100%;
      }
    }

    ul {
      display: flex;
      list-style: none;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #eeeeee;
      top: 0;
      bottom: 0;
      position: absolute;
      padding: 10px 10px 0 10px;
      transition: all 1s ease-out;

      li {
        width: 18%;
        padding: 0 5px;

        .link {
          padding: 0;
        }
      }
    }

    .move-arrow {
      align-self: center;
      z-index: 1000;
    }
    .move-arrow:hover {
      cursor: pointer;
    }
  }
}
//排行榜
.ranking-list {
  width: 100%;
  display: flex;

  a {
    color: #282828;
    font-size: 14px;
    font-weight: 600;
  }

  .ranking-container {
    width: 100%;
    flex: 1;
    border: 1px solid rgba(28, 28, 28, 0.3);
    border-right: none;
    background-color: #eeeeee;
    padding-bottom: 0;

    .ranking-header {
      display: flex;
      padding: 25px 25px 10px 25px;

      .detail-container {
        margin: 0;
      }
    }

    .ranking-title {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .fun-button {
        margin-top: 10px;

        a::before {
          font-size: 18px;
          color: #bdc3c7;
          font-weight: 100;
        }
      }
    }

    ul {
      padding-top: 10px;
      list-style: none;
      font-size: 16px;
      margin: auto;
      width: 100%;

      li {
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        display: flex;

        span {
          padding-left: 20px;
          display: block;
          width: 10%;
          font-size: 12px;
        }

        a {
          display: block;
          font-weight: normal;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        a:hover {
          text-decoration: underline;
        }
      }
      li:nth-child(odd) {
        background-color: #dfe6e9;
      }

      li:nth-child(-n + 3) {
        color: #337ab7;
      }
    }

    .all-ranking {
      height: 35px;
      line-height: 35px;
      background-color: #dfe6e9;
      text-align: right;

      a {
        font-weight: normal;
        font-size: 12px;
        padding-right: 20px;
      }
    }

    .detail-container {
      width: 50%;
      .link {
        padding: 0;
      }
    }
  }

  .ranking-container:nth-child(3) {
    border-right: 1px solid rgba(28, 28, 28, 0.3);
  }
}
//区域头部标题
.recommend-container {
  margin-bottom: 10%;
  .music-recommend {
    width: 100%;
    display: flex;
    padding: 0 10px 5px 10px;
    border-bottom: 2px solid #337ab7;
    margin-bottom: 20px;

    .icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #337ab7;
      align-self: center;
      margin-right: 10px;
    }

    .icon:before {
      content: "";
      display: block;
      transform: translateX(50%) translateY(50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: white;
    }

    a {
      color: rgba(28, 28, 28, 0.8);
      font-size: 14px;
    }

    .title {
      padding-right: 10px;
      font-size: 22px;
      text-decoration: none;
    }

    .recommend-menu {
      list-style: none;
      display: flex;
      justify-content: start;
      align-self: center;
      margin: 0;

      .rec-menu-list {
        list-style: none;
        padding-right: 10px;
        height: 100%;
      }
    }

    .more {
      align-self: center;
      margin-left: auto;
    }
  }
}
//正方形容器
.detail-container {
  margin: 0 8% 0 0;
  width: 19%;

  .img-container {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;

    .link {
      width: 100%;
      height: 100%;
      position: absolute;
      display: block;
      // padding: 10px;
    }

    .list-item {
      width: 100%;
      height: 100%;
    }

    .list-item:hover {
      cursor: pointer;
    }
  }

  .bottom {
    width: 100%;
    padding: 0 10px 10px 10px;

    a {
      color: #282828;
      font-size: 12px;
    }
    a:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
//用户展示区域
.user-area {
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);
  // .login {
  // }

  .logout {
    background: linear-gradient(
      rgba(200, 200, 200, 0.1),
      rgba(28, 28, 28, 0.2)
    );
    padding: 5px 20px;
    font-size: 12px;

    p {
      margin: 10px auto;
      color: #282828;
      line-height: 20px;
    }

    button {
      margin: 10px auto;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      padding: 5px 25px;
      background: linear-gradient(
        rgba(51, 122, 183, 0.5),
        rgba(51, 122, 183, 1)
      );
      color: white;
      cursor: pointer;
      outline: none;
    }

    button:hover {
      background: linear-gradient(rgba(61, 145, 218, 0.5), rgb(59, 140, 211));
    }

    button:active {
      background: linear-gradient(
        rgba(51, 122, 183, 0.5),
        rgba(51, 122, 183, 1)
      );
    }
  }
}
//音乐人推荐
.singer-container {
  list-style: none;
  margin: 10px 20px;

  .singer-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(28, 28, 28, 0.3);
    font-size: 12px;
    padding-bottom: 5px;

    span {
      font-weight: 800;
    }

    a {
      color: gray;
      font-size: 12px;
    }
  }

  .detail-container {
    width: 30%;
    margin: 0;
  }

  .singer-list {
    margin: 15px 0;
  }

  .content-box {
    display: flex;
    color: rgba(28, 28, 28, 0.8);
    text-decoration: none;
    cursor: pointer;
    background: #fafafa;

    .singer-detail {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;
      font-size: 14px;
      border: 0.5px solid rgba(28, 28, 28, 0.3);
      border-left: none;

      .singer-name {
        font-weight: 900;
      }
    }
  }

  .content-box:hover {
    background: linear-gradient(
      rgba(129, 129, 129, 0.1) 10%,
      rgba(199, 194, 194, 0.1)
    );
  }

  img {
    position: absolute;
  }
}
</style>