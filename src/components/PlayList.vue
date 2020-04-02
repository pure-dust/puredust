<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
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
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      music_list: []
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
          this.music_list = res.data;
        })
        .catch(err => {
          console.log(err);
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
</style>