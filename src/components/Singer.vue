<template>
  <div class="outer-box">
    <error v-if="!this.$route.query.id"></error>
    <div v-else class="border-line">
      <div class="left">
        <p class="singer-name">{{ info.name }}</p>
        <div class="head-img">
          <img :src="info.cover" alt />
        </div>
        <ul class="singer-menu">
          <li
            v-for="(item, i) in singer_menu"
            :key="i"
            @click="menu_index = i"
            :class="{'li-selected': i == menu_index}"
          >{{ item }}</li>
        </ul>
        <div class="btn-box" v-if="menu_index == 0">
          <button class="play nor-btn f-btn">▶ 播放</button>
          <button class="plus nor-btn f-btn">
            <i>+</i>
          </button>
          <button class="nor-btn c-btn">收藏全部</button>
        </div>
        <songs v-if="menu_index == 0" :song_list="songs" :flag="false"></songs>
        <div class="singer-album">
          <ul>
            <li v-for="(item, i) in album_list" :key="i">
              <div class="img-container">
                <img src alt />
              </div>
              <div class="intro-info">
                <p class="album-name"></p>
                <p class="time"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="singer-intro" v-if="menu_index == 3">
          <div>
            <p class="l-title f-title">{{ info.name }}简介</p>
            <p class="intro-text">{{ info.intro }}</p>
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
      singer_menu: ["热门作品", "所有专辑", "相关MV", "艺人介绍"],
      menu_index: 0,
      songs: [],
      info: "",
      album_list: []
    };
  },
  methods: {
    getMusic() {
      this.axios({
        method: "get",
        url: "api/users/getartistsongs",
        params: {
          id: this.$route.query.id
        }
      })
        .then(res => {
          this.songs = res.data.list;
          this.info = res.data.info;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  mounted() {
    this.getMusic();
  }
};
</script>

<style lang="less" scoped>
.border-line {
  height: 100%;
  border: 1px solid #ccc;
  border-top: none;
  display: flex;
  background-color: #fff;
  .left {
    flex: 2.5;
    border-right: 1px solid #ccc;
    padding: 40px;
  }

  .right {
    flex: 1;
  }
}

.singer-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.head-img {
  width: 100%;
  padding-bottom: 45%;
  position: relative;
  overflow: hidden;
  border: 1px solid #999;
  border-bottom: none;
  img {
    width: 100%;
    position: absolute;
    top: -25%;
  }
}

.singer-menu {
  display: flex;
  width: 100%;
  border-left: 1px solid #ccc;

  li {
    flex: 1;
    text-align: center;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-left: none;
    cursor: pointer;
    background-color: #f5f5f5;
  }

  .li-selected {
    border-top: 2px solid #337ab7;
    border-bottom: none;
    background: linear-gradient(#f5f5f5, #fff);
  }
}

.btn-box {
  width: 100%;
  height: 40px;
  margin: 20px 0;

  .nor-btn {
    border: none;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    padding: 0 12px;
    outline: none;
    cursor: pointer;
  }

  .f-btn {
    background: linear-gradient(rgb(248, 56, 56), rgb(241, 25, 25));
    box-shadow: 0 0 2px #000;
  }

  .f-btn:hover {
    background: linear-gradient(rgb(255, 86, 86), rgb(255, 55, 55));
  }

  .f-btn:active {
    background: linear-gradient(rgb(241, 25, 25), rgb(248, 56, 56));
  }

  .play {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-right: 0.5px solid #999;
  }
  .plus {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top-left-radius: 1px;
    border-bottom-left-radius: 1px;
    position: relative;
    top: 28%;
    i {
      text-align: center;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 20px;
    }
  }

  .c-btn {
    background: #fff;
    color: #333;
    box-shadow: 0 0 2px #000;
    border-radius: 3px;
    background: linear-gradient(#fff, #eee);
    margin-left: 15px;
    padding: 0 16px;
  }
}

.singer-intro {
  width: 100%;
  padding-top: 20px;

  .l-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .f-title {
    padding-left: 10px;
    border-left: 3px solid #337ab7;
  }

  .intro-text {
    font-size: 12px;
    text-indent: 2em;
    line-height: 24px;
    color: #666;
  }
}

// .singer-album {
// }
</style>