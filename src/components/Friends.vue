<template>
  <div class="outer-box">
    <div class="border-line">
      <div class="left">
        <div class="header">
          <span class="title">动态</span>
          <div class="fun-box">
            <span class="fun-span" @click="releasePage">发动态</span>
            <span class="fun-span">发视频</span>
          </div>
        </div>
        <div class="dynamic-box">
          <div class="dynamic-detail" v-for="(item, i) in dynamic" :key="i">
            <div class="head-img">
              <div class="img-container">
                <img class="list-item" :src="item.head_portrait" alt />
              </div>
            </div>
            <div class="dynamic-content">
              <div class="dynamic-kind">
                <span class="user-name">{{ item.dynamic_user_name }}</span>
                <span class="kinds">{{ item.dynamic_kind }}</span>
              </div>
              <div class="dynamic-time">{{ item.dynamic_date | dateFormat }}</div>
              <div class="dynamic-message">{{ item.dynamic_content }}</div>
              <div class="dynamic-music" v-if="item.music">
                <div class="img-container">
                  <img class="list-item" :src="item.music.music_cover" alt />
                </div>
                <div class="music-detail">
                  <p class="name">{{ item.music.music_name }}</p>
                  <p>{{ item.music.music_singer }}</p>
                </div>
              </div>
              <div class="dynamic-video" v-if="item.video">
                <img :src="item.video.video_cover" alt />
              </div>
              <div class="dynamic-fun">
                <a href="javascript:;" class="like">( {{ item.comments_like }} )</a>
                <span>|</span>
                <a href="javascript:;" class="reply" @click="replyPage(i)">评论</a>
              </div>
              <div class="dynamic-comments" v-if="current_index == i">
                <comments v-if="current_index == i" :index="item.id" :kind="'dynamic'"></comments>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
      <div class="release-dynamic" v-if="release_flag">
        <div class="page-header">
          <span>分享</span>
        </div>
        <div class="page-body">
          <div class="input-area">
            <textarea
              name="input"
              id="input"
              placeholder="说点什么吧"
              maxlength="140"
              v-model="dynamic_value"
              class="input"
            ></textarea>
            <div class="add-music" @click="addMusicPage">
              <div v-if="!addFlag" class="add-detail">
                <img src alt />
                给动态配上音乐
              </div>
              <div class="add-detail" v-else-if="musicInfo != ''">
                <div class="img-container">
                  <img class="list-item" :src="musicInfo.music_cover" alt />
                </div>
                <div class="song-name">{{ musicInfo.music_name }}</div>
                <div class="singer">{{ musicInfo.music_singer }}</div>
              </div>
              <div class="add-detail" v-else-if="singerInfo != ''">
                <div class="img-container">
                  <img class="list-item" :src="singerInfo.head_portrait" alt />
                </div>
                <div class="song-name">{{ singerInfo.name }}</div>
              </div>
              <div class="add-detail" v-else-if="albumInfo != ''">
                <div class="img-container">
                  <img class="list-item" :src="albumInfo.cover" alt />
                </div>
                <div class="song-name">{{ albumInfo.name }}</div>
                <div class="singer">{{ albumInfo.author }}</div>
              </div>
              <div class="add-detail" v-else-if="listInfo != ''">
                <div class="img-container">
                  <img class="list-item" :src="listInfo.cover" alt />
                </div>
                <div class="song-name">{{ listInfo.name }}</div>
                <div class="singer">{{ listInfo.author }}</div>
              </div>
            </div>
          </div>
          <div class="add-fun">
            <span class="length">{{ 140 - dynamic_value.length }}</span>
          </div>
          <div class="release-fun">
            <a href="javascript:;" class="fun-btn release" @click="releaseDynamic">分享</a>
            <a href="javascript:;" class="fun-btn cancel" @click="releasePage">取消</a>
          </div>
        </div>
      </div>
      <div class="release-dynamic ad-m" v-if="addMusic_flag">
        <div class="page-header">
          <span>分享</span>
        </div>
        <div class="page-body">
          <div class="music-search">
            <i class="search-img"></i>
            <input type="text" v-model="searchValue" />
          </div>
          <div class="music-show">
            <ul class="show-menu">
              <li :class="{ 'selected': showMenuIndex == 1 }" @click="MenuIndex(1)">单曲</li>
              <li :class="{ 'selected': showMenuIndex == 2 }" @click="MenuIndex(2)">歌手</li>
              <li :class="{ 'selected': showMenuIndex == 3 }" @click="MenuIndex(3)">专辑</li>
              <li :class="{ 'selected': showMenuIndex == 4 }" @click="MenuIndex(4)">歌单</li>
            </ul>
            <div class="result-box">
              <div class="result" v-if="showMenuIndex == 1">
                <div
                  class="result-item"
                  v-for="(item, i) in searchResult"
                  :key="i"
                  @click="setInfo(item)"
                >
                  <div class="img-container">
                    <img :src="item.music_cover" alt />
                  </div>
                  <div class="song-name">{{ item.music_name }}</div>
                  <div class="singer">{{ item.music_singer }}</div>
                </div>
              </div>
              <div class="result" v-else-if="showMenuIndex == 2">
                <div
                  class="result-item"
                  v-for="(item, i) in searchResult"
                  :key="i"
                  @click="setInfo(item)"
                >
                  <div class="img-container">
                    <img :src="item.head_portrait" alt />
                  </div>
                  <div class="song-name">{{ item.name }}</div>
                </div>
              </div>
              <div class="result" v-else-if="showMenuIndex == 3">
                <div
                  class="result-item"
                  v-for="(item, i) in searchResult"
                  :key="i"
                  @click="setInfo(item)"
                >
                  <div class="img-container">
                    <img :src="item.cover" alt />
                  </div>
                  <div class="song-name">{{ item.name }}</div>
                  <div class="singer">{{ item.author }}</div>
                </div>
              </div>
              <div class="result" v-else-if="showMenuIndex == 4">
                <div
                  class="result-item"
                  v-for="(item, i) in searchResult"
                  :key="i"
                  @click="setInfo(item)"
                >
                  <div class="img-container">
                    <img :src="item.cover" alt />
                  </div>
                  <div class="song-name">{{ item.name }}</div>
                  <div class="singer">{{ item.author }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="release-fun">
            <a href="javascript:;" class="fun-btn release" @click="addMusicPage">返回</a>
          </div>
        </div>
      </div>
    </div>
    <div class="shelter" v-if="release_flag"></div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      dynamic: [],
      current_index: -1,
      dynamic_value: "",
      addMusic_flag: false,
      release_flag: false,
      showMenuIndex: 1,
      searchValue: "",
      searchResult: "",
      musicInfo: "",
      vedioInfo: "",
      albumInfo: "",
      singerInfo: "",
      listInfo: "",
      addFlag: false
    };
  },
  methods: {
    replyPage(i) {
      this.current_index = this.current_index == i ? -1 : i;
    },
    releasePage() {
      this.release_flag = !this.release_flag;
    },
    addMusicPage() {
      this.addMusic_flag = !this.addMusic_flag;
      this.addFlag = false;
    },
    MenuIndex(i) {
      this.showMenuIndex = i;
    },
    getSearchResult(url, val) {
      this.axios({
        method: "get",
        url: url,
        params: {
          sValue: val
        }
      })
        .then(res => {
          this.searchResult = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setSearchUrl(index) {
      let url = "";
      if (this.showMenuIndex == 1) url = "api/users/searchmusic";
      else if (this.showMenuIndex == 2) url = "api/users/searchsinger";
      else if (this.showMenuIndex == 3) url = "api/users/searchalbum";
      else if (this.showMenuIndex == 4) url = "api/users/searchlist";
      return url;
    },
    releaseDynamic() {
      if (this.dynamic_value == "") {
        this.$Toast("内容不能为空!");
        return;
      }
      let temp = { kind: -1, addition: -1 };
      if (this.musicInfo != "") {
        temp.kind = 1;
        temp.addition = this.musicInfo.music_id;
      } else if (this.singerInfo != "") {
        temp.kind = 2;
        temp.addition = this.singerInfo.user_id;
      } else if (this.albumInfo != "") {
        temp.kind = 3;
        temp.addition = this.albumInfo.id;
      } else if (this.listInfo != "") {
        temp.kind = 4;
        temp.addition = this.listInfo.id;
      }
      this.axios({
        method: "post",
        url: "api/users/releasedynamic",
        data: {
          name: this.$store.getters.getUserInfo.name,
          userId: this.$store.getters.getUserInfo.id,
          kind: 1,
          content: this.dynamic_value,
          date: new Date(),
          addition: temp,
          video: this.vedioInfo != "" ? this.vedioInfo.video_id : -1
        }
      })
        .then(res => {})
        .catch(err => {
          throw err;
        });
      this.releasePage();
      this.reload();
    },
    setInfo(item) {
      this.musicInfo = this.singerInfo = this.albumInfo = this.listInfo = "";
      switch (this.showMenuIndex) {
        case 1: {
          this.musicInfo = { ...item };
          break;
        }
        case 2: {
          this.singerInfo = { ...item };
          break;
        }
        case 3: {
          this.albumInfo = { ...item };
          break;
        }
        case 4: {
          this.listInfo = { ...item };
          break;
        }
      }
      this.addMusic_flag = !this.addMusic_flag;
      this.addFlag = true;
    },
    getDynamic() {
      this.axios({
        method: "get",
        url: "api/users/getdynamic",
        params: {
          id: this.$store.getters.getUserInfo.id
        }
      })
        .then(res => {
          this.dynamic = res.data;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {
    this.getDynamic();
  },
  watch: {
    searchValue(val) {
      if (val === "") {
        this.searchResult = {};
        return;
      }
      let url = this.setSearchUrl(this.showMenuIndex);
      this.getSearchResult(url, val);
    },
    showMenuIndex(val) {
      if (this.searchValue == "") return;
      else {
        let url = this.setSearchUrl(val);
        this.getSearchResult(url, this.searchValue);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.left {
  flex: 2;
  border-right: 1px solid #ccc;
  padding: 10px 20px;
}

.right {
  flex: 1;
}

.header {
  padding: 10px 0;
  border-bottom: 2px solid #337ab7;
  display: flex;
  align-items: center;

  .title {
    font-size: 24px;
  }

  .fun-box {
    margin-left: auto;
    .fun-span {
      height: 15px;
      margin-left: 10px;
      display: inline-block;
      font-size: 12px;
      padding: 4px 15px;
      border: 1px solid gray;
      border-radius: 15px;
      cursor: pointer;
    }

    .fun-span:hover {
      background: #f5f5f5;
    }
  }
}

.dynamic-box {
  padding: 15px 0;

  .dynamic-detail {
    display: flex;
    border-bottom: 1px solid #e8e8e9;
    padding: 20px 0;

    .head-img {
      width: 8%;
    }

    .dynamic-content {
      padding-left: 10px;
      flex: 1;

      .dynamic-kind {
        font-size: 14px;
        .user-name {
          color: #0c73c2;
        }
        .kinds {
          color: #666;
          margin-left: 5px;
          font-size: 12px;
        }
      }

      .dynamic-time {
        margin-top: 8px;
        font-size: 12px;
        color: #999;
      }

      .dynamic-message {
        color: #333;
        font-size: 14px;
        margin-top: 10px;
        word-break: break-word;
        word-wrap: break-word;
        white-space: normal;
      }

      .dynamic-music {
        margin-top: 10px;
        background: #f5f5f5;
        padding: 10px;
        display: flex;

        .img-container {
          width: 8%;
          padding-bottom: 8%;
        }

        .music-detail {
          display: flex;
          padding-left: 10px;
          flex: 1;
          color: #666;
          font-size: 12px;
          flex-direction: column;
          justify-content: space-around;

          .name {
            color: #333;
          }
        }
      }

      .dynamic-video {
        margin-top: 10px;

        img {
          width: 60%;
        }
      }

      .dynamic-fun {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        height: 14px;
        line-height: 14px;

        span,
        a {
          color: #0c73c2;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .dynamic-comments {
        margin-top: 10px;
        padding: 10px 15px;
        background: #f8f8f8;
        border: 1px solid #d9d9d9;
        box-shadow: inset 0 0 1px #fcfcfc;
      }
    }
  }
}

.release-dynamic {
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 320px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 0 10px #282828;
  z-index: 1000;

  .page-header {
    background: #282828;
    color: #fff;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
  }

  .page-body {
    height: 280px;
    background: #ffffff;
    padding: 20px 30px;
    z-index: 1000;

    .input-area {
      border: 1px solid #dedede;
      padding: 10px 0;
      padding-bottom: 0;
      .input {
        width: 100%;
        height: 100px;
        padding: 0 10px;
        resize: none;
        outline: none;
        color: #333;
        border: none;
      }

      .add-music {
        padding: 0 10px;
        .add-detail {
          color: #333;
          font-size: 14px;
          height: 50px;
          line-height: 50px;
          border-top: 1px solid #dedede;
          background-image: url(/assets/image/plus.png);
          background-repeat: no-repeat;
          background-size: 14px;
          background-position: 98% 50%;
          display: flex;
          align-items: center;
        }

        .img-container {
          width: 8%;
          padding-bottom: 8%;
        }
      }

      .add-music:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }
    .add-fun {
      margin-top: 10px;
      display: flex;

      .length {
        margin-left: auto;
        font-size: 12px;
        color: #666;
      }
    }
    .release-fun {
      margin-top: 10px;
      text-align: center;
      padding: 10px 0;

      .fun-btn {
        display: inline-block;
        padding: 5px 25px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 12px;
        margin: 0 5px;
      }

      .release {
        color: white;
        background: linear-gradient(rgb(74, 160, 201), rgb(31, 118, 199));
      }

      .release:hover {
        background: linear-gradient(rgb(73, 161, 202), rgb(38, 140, 235));
      }

      .release:active {
        background: linear-gradient(rgb(31, 118, 199), rgb(74, 160, 201));
      }

      .cancel {
        color: #333;
        background: linear-gradient(rgb(255, 255, 255), rgb(224, 224, 224));
      }

      .cancel:hover {
        background: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255));
      }

      .cancel:active {
        background: linear-gradient(rgb(224, 224, 224), rgb(255, 255, 255));
      }
    }
  }
}

.music-search {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  border: 1px solid #999;
  border-bottom: none;
  .search-img {
    height: 100%;
    width: 40px;
    background: white url(/assets/image/search.png) no-repeat 50% 50%;
    background-size: 50%;
  }
  input {
    flex: 1;
    outline: none;
    border: none;
  }
}

.ad-m {
  height: 400px;

  .page-body {
    height: 360px;
  }
}

.music-show {
  width: 100%;
  height: 230px;
  border: 1px solid #999;
  border-top: none;
  display: flex;
  flex-direction: column;

  .show-menu {
    list-style: none;
    display: flex;

    li {
      width: 25%;
      text-align: center;
      border: 1px solid #999;
      border-left: none;
      padding: 5px;
      font-size: 12px;
      color: #666;
      cursor: pointer;
    }

    li:nth-child(4) {
      border-right: none;
    }

    .selected {
      border-top: 2px solid #337ab7;
      border-bottom: none;
    }
  }
}

.result-box {
  flex: 1;
  overflow: hidden;

  .result {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .result-item {
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 12px;
      cursor: pointer;

      .img-container {
        width: 10%;
        padding-bottom: 10%;
      }
    }

    .result-item:nth-child(even) {
      background: #f2f2f2;
    }

    .result-item:hover {
      background: #ccc;
    }
  }
}

.song-name {
  padding-left: 10px;
  flex: 3;
}

.singer {
  flex: 2;
}

.shelter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>