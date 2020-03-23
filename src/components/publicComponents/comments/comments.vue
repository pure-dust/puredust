<template>
  <div>
    <div class="header">
      <span class="title">评论</span>
      <span class="subtitle">{{ this.comments_list.length }} 条评论</span>
    </div>
    <div class="comment">
      <div class="left">
        <div class="img-container">
          <img :src="this.$store.getters.getUserInfo.head_portrait" alt />
        </div>
      </div>
      <div class="right">
        <div class="input-area">
          <textarea
            name="input"
            id="input"
            class="input"
            placeholder="评论"
            maxlength="140"
            v-model="inputvalue"
          ></textarea>
        </div>
        <div class="foot">
          {{ 140 - inputvalue.length }}
          <a
            href="javascript:;"
            class="release"
            @click="release(item.comments_id, 1)"
          >评论</a>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="header">
        <span class="subtitle">精彩评论</span>
      </div>
      <div v-for="(item, i) in comments_list" :key="i" class="comments-item">
        <div class="left">
          <div class="img-container">
            <img :src="item.head_portrait" alt />
          </div>
        </div>
        <div class="right">
          <div class="comment-content">
            <router-link
              :to="{path: '/user/home', query: {id: item.comments_user_id}}"
              class="user-name"
            >{{ item.comments_user_name }}</router-link>
            : {{ item.comments_content }}
          </div>
          <div class="reply-content comment-content" v-if="item.comments_reply_id != 0">
            <router-link
              class="user-name"
              :to="{path: '/user/home', query: {id: item.subcomments.comments_user_id}}"
            >{{ item.subcomments.comments_user_name }}</router-link>
            : {{ item.subcomments.comments_content }}
          </div>
          <div class="down">
            <span class="time">{{ item.comments_date | dataFormat }}</span>
            <div class="fun-box">
              <a href="javascript:;" class="like">( {{ item.comments_like }} )&nbsp;|</a>
              <a href="javascript:;" class="reply" @click="replyPage(i)">&nbsp;回复</a>
            </div>
          </div>
          <div class="reply-page" v-if="reply_id === i">
            <textarea
              name="input"
              id="input"
              class="input"
              placeholder="评论"
              maxlength="140"
              v-model="replyvalue"
            ></textarea>
            <div class="foot">
              {{ 140 - replyvalue.length }}
              <a
                href="javascript:;"
                class="release"
                @click="release(item.comments_id, 2)"
              >回复</a>
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
      comments_list: [],
      inputvalue: "",
      reply_id: -1,
      replyvalue: ""
    };
  },
  methods: {
    getComments() {
      this.axios({
        method: "get",
        url: "api/users/getcomments",
        params: {
          id: this.index,
          kind: this.kind
        }
      })
        .then(res => {
          this.comments_list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    release(id, k) {
      this.axios({
        method: "post",
        url: "api/users/release",
        data: {
          content: k == 1 ? this.inputvalue : this.replyvalue,
          music_id: this.index,
          user_id: this.$store.getters.getUserInfo.id,
          date: new Date(),
          name: this.$store.getters.getUserInfo.name,
          kind: "music",
          comments_id: k == 1 ? -1 : id
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.getComments();
      this.inputvalue = "";
      this.replyvalue = "";
      this.reply_id = -1;
    },
    replyPage(i) {
      if (i == this.reply_id) this.reply_id = -1;
      else this.reply_id = i;
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    kind: {
      type: String,
      required: true
    }
  },
  created() {
    this.getComments();
  },
  filters: {
    dataFormat(time) {
      let date = new Date(time);
      let currentDate = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      if (year == currentDate.getFullYear()) {
        if (month == currentDate.getMonth() + 1) {
          if (day == currentDate.getDate()) {
            if (hour == currentDate.getHours()) {
              return (
                parseInt(currentDate.getMinutes()) - parseInt(minute) + "分钟前"
              );
            } else {
              if (minute < 10) minute = "0" + minute;
              return hour + ":" + minute;
            }
          }
        } else {
          return month + "月" + day + "日 " + hour + ":" + minute;
        }
      } else {
        return year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 5px 0;
  border-bottom: 2px solid #337ab7;

  .title {
    font-size: 20px;
    color: #555555;
  }

  .subtitle {
    font-size: 12px;
    color: darkgray;
    padding-left: 20px;
  }
}

.comment {
  margin-top: 20px;
  width: 100%;
  display: flex;

  .input-area {
    flex: 1;
    padding-left: 5px;
    position: relative;
  }

  .input-area::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 0;
    width: 10px;
    height: 10px;
    border: 1px solid #dedede;
    background: white;
    border-width: 0 0 1px 1px;
    transform: rotate(45deg) translateX(-10%);
  }
}

.message {
  .subtitle {
    padding: 0;
    color: #282828;
    font-size: 14px;
    font-weight: 700;
  }

  .comments-item {
    padding: 15px 0;
    display: flex;
    border-bottom: 1px dotted gray;
  }
}

.img-container {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

.left {
  display: flex;
  width: 7%;
}
.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
  justify-content: space-between;

  .comment-content {
    font-size: 12px;
    color: #333;
    white-space: normal;
    word-break: break-word;
    word-wrap: break-word;
    line-height: 20px;
  }

  .user-name {
    color: #0c73c2;
    font-size: 12px;
  }
}

.down {
  display: flex;
  line-height: 20px;
  margin-top: 10px;
  .time {
    font-size: 12px;
    color: #999;
  }
  .fun-box {
    margin-left: auto;
    font-size: 12px;
    a {
      color: #282828;
    }
  }
}

.reply-content {
  width: 100%;
  background: #f4f4f4;
  border: 1px solid #dedede;
  padding: 10px 20px;
  position: relative;
  margin-top: 10px;
}

.reply-content::after {
  content: "";
  position: absolute;
  top: 0;
  left: 10px;
  width: 8px;
  height: 8px;
  background-color: #f4f4f4;
  border: 1px solid #dedede;
  border-width: 1px 0 0 1px;
  transform: rotate(45deg) translateY(-80%);
}

.reply-page {
  width: 100%;
  background: #f4f4f4;
  border: 1px solid #dedede;
  padding: 10px 20px;
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  color: #333;

  .input {
    height: 40px;
  }
}

.input {
  width: 100%;
  height: 70px;
  resize: none;
  overflow: auto;
  outline: none;
  padding: 8px 10px;
  border: 1px solid #dedede;
  color: #333;
}

.foot {
  margin-left: auto;
  font-size: 12px;
  height: 100%;
  margin-top: 10px;
  color: #aaa;
  .release {
    margin-left: 10px;
    color: white;
    background-color: #337fd0;
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 2px;
    background: linear-gradient(rgb(71, 149, 233), rgb(49, 106, 167));
    box-shadow: 0 0 1px black;
    .release:hover {
      background: linear-gradient(rgb(133, 192, 255), rgb(101, 147, 196));
    }
  }
}
</style>