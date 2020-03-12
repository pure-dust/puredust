<template>
  <div class="play-container" :class="{'play-container-lock': hiddenFlag,'play-container-unlock': !hiddenFlag}">
    <div class="play-tool">
      <div class="backward" @click="backward"></div>
      <div class="play" @click="playOrPause"></div>
      <div class="forward" @click="forward"></div>
    </div>
    <div class="play-area">
      <div class="cover-container">
        <div class="img-container">
          <img :src="music_info.cover" alt />
        </div>
      </div>
      <div class="progress-container">
        <div class="lyric">
          <a href class="song-title">{{ music_info.name }}</a>
          <a href class="singer">{{ music_info.singer }}</a>
        </div>
        <div class="progress-tool">
          <div class="progress-line" ref="progress_line" @click.self="setTime">
            <div class="cover-line" ref="cover_line"></div>
            <div class="point" @mousedown="move" ref="point"></div>
          </div>
          <div class="song-time">
            <span>{{ this.currentTime | timeFormat}} /</span>
            <span>{{ this.Time | timeFormat }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="fun-area">
      <div class="collection"></div>
      <div class="play-mode"></div>
      <div class="sound"></div>
    </div>
    <audio :src="music_info.data" ref="audio" loop="loop" @ended="music_init"></audio>
    <div class="hand"></div>
    <i class="fun-btn" @click="hidden"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: {
        cover: ''
      },
      music_info: {
        id: '',
        name: '',
        singer: '',
        data: '',
        album: '',
        cover: ''
      },
      playFlag: false,
      hiddenFlag: false,
      Time: null,
      clock: null,
      width: 0,
      point: null,
      cover_line: null,
      audio: null,
      currentTime: 0
    };
  },
  methods: {
    init() {
      //获取音乐信息
      this.music = this.$store.getters.getMusic;
      //初始化组件
      this.point = this.$refs.point;
      this.cover_line = this.$refs.cover_line;
      this.width = this.$refs.progress_line.offsetWidth;
    },
    music_init() {
      if (this.name === null) return;
      this.point.style.left = "0";
      this.cover_line.style.width = "0px";
      this.audio = this.$refs.audio;
      this.audio.load();
      this.audio.oncanplay = () => {
        this.Time = parseInt(this.audio.duration);
      };
    },
    move() {
      let el = event.target;
      var disx = event.pageX - el.offsetLeft;
      document.onmousemove = e => {
        if (e.pageX - disx >= 0 && e.pageX - disx <= this.width) {
          el.style.left = event.pageX - disx + "px";
          this.cover_line.style.width = e.pageX - disx + "px";
          this.currentTime = this.audio.currentTime =
            ((e.pageX - disx) / this.width) * this.Time;
        }
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
    },
    setTime() {
      let el = event.target;
      var disx = event.pageX - event.target.getBoundingClientRect().left;
      this.point.style.left = disx + "px";
      this.cover_line.style.width = disx + "px";
      this.currentTime = this.audio.currentTime =
        (disx / this.width) * this.Time;
    },
    musicHandler() {
      let audio = this.$refs.audio;
    },
    playOrPause() {
      this.audio.onended = () => {
        event.target.style.backgroundPosition = "0 -204px";
        clearInterval(this.clock);
        this.music_init();
      };
      if (!this.playFlag) {
        event.target.style.backgroundPosition = "0 -165px";
        this.audio.play();
        this.clock = setInterval(() => {
          this.currentTime++;
          this.point.style.left =
            (this.currentTime / this.Time) * this.width + "px";
          this.cover_line.style.width =
            (this.currentTime / this.Time) * this.width + "px";
          if (this.currentTime >= this.Time) {
            clearInterval(this.clock);
            this.music_init();
          }
        }, 1000);
      } else {
        clearInterval(this.clock);
        event.target.style.backgroundPosition = "0 -204px";
        this.audio.pause();
      }
      this.playFlag = !this.playFlag;
    },
    backward() {
      let audio = this.$refs.audio;
    },
    forward() {
      let audio = this.$refs.audio;
    },
    hidden() {
      this.hiddenFlag = !this.hiddenFlag;
    }
  },

  created() {
    this.$nextTick(() => {
      this.init();
      this.music_init();
    });
  },
  filters: {
    timeFormat(length) {
      if (length < 600) {
        if (length % 60 < 10)
          return "0" + parseInt(length / 60) + ":0" + parseInt(length % 60);
        else return "0" + parseInt(length / 60) + ":" + parseInt(length % 60);
      } else {
        if (length % 60 < 10)
          return parseInt(length / 60) + ":0" + parseInt(length % 60);
        else return parseInt(length / 60) + ":" + parseInt(length % 60);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.play-container {
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  padding: 0 15%;
  display: flex;
  transition: all 0.2s ease-out;
  bottom: -49px;

  .play-tool {
    height: 50px;
    display: flex;
    justify-content: space-around;
    flex: 1.5;

    .backward {
      height: 28px;
      width: 28px;
      background: url(/assets/image/playbar.png) no-repeat 0 -130px;
      align-self: center;
    }

    .play {
      height: 36px;
      width: 36px;
      background: url(/assets/image/playbar.png) no-repeat;
      background-position: 0 -204px;
      align-self: center;
    }

    .forward {
      height: 28px;
      width: 28px;
      background: url(/assets/image/playbar.png) no-repeat -80px -130px;
      align-self: center;
    }
  }

  .play-area {
    flex: 8;
    display: flex;
    padding: 0 0 0 2%;

    .cover-container {
      width: 35px;
      align-self: center;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: inset 0 0 3px black;
      border: 1px solid black;

      .img-container {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          position: absolute;
          background: url(/assets/image/playbar.png) no-repeat 0 -80px;
        }
      }
    }

    .progress-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 5px 20px;
      font-size: 12px;

      .lyric {
        display: flex;

        .song-title {
          color: white;
        }

        .singer {
          color: lightgray;
          margin-left: 20px;
        }
      }

      .progress-tool {
        width: 100%;
        height: 10px;
        line-height: 10px;
        font-size: 0;

        .progress-line {
          width: 85%;
          height: 10px;
          border-radius: 5px;
          background-color: darkgray;
          position: relative;
          display: inline-block;

          .cover-line {
            background-color: #337ab7;
            width: 0;
            height: 10px;
            border-radius: 5px;
          }
          .point {
            width: 16px;
            height: 16px;
            position: absolute;
            border-radius: 50%;
            background-color: #fff;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
          }
          .point::after {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            background-color: #337ab7;
            top: 50%;
            transform: translateY(-50%) translateX(50%);
          }
        }

        .song-time {
          width: 15%;
          display: inline-block;
          color: darkgray;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }

  .fun-area {
    flex: 1;
    display: flex;
    justify-content: center;

    div {
      width: 25px;
      height: 25px;
      align-self: center;
      margin: 0 5px;
    }

    .collection {
      background: url(/assets/image/playbar.png) -88px -163px;
    }

    .play-mode {
      background: url(/assets/image/playbar.png) -66px -248px;
    }

    .sound {
      background: url(/assets/image/playbar.png) -2px -248px;
    }
  }
}

.play-container-lock {
  bottom: 0px;
}

.play-container:hover {
  bottom: 0px;
}

.play-container-unlock {
  bottom: -49px;
}

.fun-btn {
  width: 30px;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: -15px;
  right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.hand {
  width: 100%;
  height: 10px;
  position: absolute;
  top: -10px;
  left: 0;
}
</style>