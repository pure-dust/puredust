<template>
  <div class="outer-box">
    <div v-if="currentPath == 'home'" class="border-line">
      <div class="header">
        <div class="img-box">
          <div class="img-container">
            <img class="list-item" :src="this.$store.getters.getUserInfo.head_portrait" alt />
          </div>
        </div>
        <div class="user-info">
          <div class="user-name">
            <span>{{ userInfo.name }}</span>
            <i class="gender" :class="{'male':userInfo.gender==1,'female': userInfo.gender ==2 }"></i>
            <router-link
              :to="{ path: '/user/update',query:{id: userInfo.id} }"
              class="set-btn"
              href="javascript:void(0);"
            >编辑个人资料</router-link>
          </div>
          <div class="user-soical">
            <a class="dynamic soical-item">
              <strong>{{ socialInfo.dynamic }}</strong>
              <span>动态</span>
            </a>
            <a class="follow soical-item">
              <strong>{{ socialInfo.follow }}</strong>
              <span>关注</span>
            </a>
            <a class="fans soical-item">
              <strong>{{ socialInfo.fans }}</strong>
              <span>粉丝</span>
            </a>
          </div>
          <div class="soical-info">
            <div>
              <span class="info-t">
                所在地区:
                <span>{{ userInfo.province + "省 - " + userInfo.city }}</span>
              </span>
              <span class="info-t">
                年龄:
                <span>{{ age | age }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="play-list">
        <p class="title">
          我创建的歌单
          <span class="list-num">({{ musicList.length }})</span>
        </p>
        <ul class="list-box">
          <li class="list-el" v-for="(item,i) in musicList" :key="i">
            <div class="img-container">
              <img class="list-item" :src="item.cover" alt />
              <router-link :to="{ path: '/playlist',query:{id:item.id} }" class="list-item msk"></router-link>
            </div>
            <div class="intro">{{ item.name }}</div>
          </li>
        </ul>
      </div>
      <div class="play-list">
        <p class="title">
          我收藏的歌单
          <span class="list-num">({{ collectList.length }})</span>
        </p>
        <ul class="list-box">
          <li class="list-el" v-for="(item,i) in collectList" :key="i">
            <div class="img-container">
              <img class="list-item" :src="item.cover" alt />
              <router-link :to="{ path: '/playlist',query:{id:item.id} }" class="list-item msk"></router-link>
            </div>
            <div class="intro">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="currentPath == 'update'" class="border-line">
      <div class="title">个人设置</div>
      <div v-if="IMG" class="up-box">
        <form>
          <input
            type="file"
            name="head-img"
            id="headImg"
            accept="image/jpg, image/jpeg, image/png"
            ref="up"
            @change="upload($event)"
          />
        </form>
        <span class="upload" @click="openUpload">上传头像</span>
        <span class="uptips">支持jpg、png格式的图片，且文件小于20M</span>
      </div>

      <div class="set-box">
        <div v-if="!IMG" class="set">
          <form>
            <div class="set-item user-name">
              <span class="set-title">昵称:</span>
              <input type="text" id="name" autocomplete="off" v-model="updateInfo.name" />
            </div>
            <div class="set-item intro">
              <span class="set-title">介绍:</span>
              <textarea
                name="intro"
                id="intro"
                cols="30"
                rows="10"
                maxlength="300"
                v-model="updateInfo.intro"
              ></textarea>
              <span
                class="num-limit"
              >{{ 300 - (updateInfo.intro.length?updateInfo.intro.length:0) }}</span>
            </div>
            <div class="set-item sex">
              <span class="set-title">性别:</span>
              男
              <input
                type="radio"
                name="sex"
                id="fale"
                v-model="updateInfo.sex"
                value="1"
              />
              女
              <input
                type="radio"
                name="sex"
                id="female"
                v-model="updateInfo.sex"
                value="2"
              />
              保密
              <input
                type="radio"
                name="sex"
                id="secret"
                v-model="updateInfo.sex"
                value="3"
              />
            </div>
            <div class="set-item birthday">
              <span class="set-title">生日:</span>
              <div class="day">
                <span class="num year">{{ S_year }}</span>
                <i @click="openPanel(1)"></i>
                <ul v-if="P_year" class="panel" @click="setYear">
                  <li v-for="(el ,i) in year" :key="i" :data-id="el">{{ el }}</li>
                </ul>
              </div>
              <span class="com">年</span>
              <div class="day">
                <span class="num">{{ S_month }}</span>
                <i @click="openPanel(2)"></i>
                <ul v-if="P_month" class="panel" @click="setMonth">
                  <li v-for="(el,i) in month" :key="i" :data-id="el">{{ el }}</li>
                </ul>
              </div>
              <span class="com">月</span>
              <div class="day">
                <span class="num">{{ S_day }}</span>
                <i @click="openPanel(3)"></i>
                <ul v-if="P_day" class="panel" @click="setDay">
                  <li v-for="(el,i) in day" :key="i" :data-id="el">{{ el }}</li>
                </ul>
              </div>
              <span class="com">日</span>
            </div>
            <div class="set-item island">
              <span class="set-title">地区:</span>
              <div class="city">
                <span class="num area">{{ S_province }}</span>
                <i @click="openPanel(4)"></i>
                <ul v-if="P_province" class="panel" @click="setProvince">
                  <li v-for="(el,i) in province_city" :key="i" :data-id="i">{{ el.provinceName }}</li>
                </ul>
              </div>
              <div class="city">
                <span class="num area">{{ S_city }}</span>
                <i @click="openPanel(5)"></i>
                <ul v-if="P_city" class="panel" @click="setCity">
                  <li v-for="(el, i) in curCityList" :key="i" :data-id="i">{{ el.citysName }}</li>
                </ul>
              </div>
            </div>
          </form>
          <a href="javascript:void(0);" class="submit" @click="setUpdateInfo">保存</a>
          <router-link :to="{ path: '/user/home',query:{id: userInfo.id} }" class="cancel">取消</router-link>
        </div>
        <div
          v-if="IMG"
          class="img-preview"
          onselectstart="return false;"
          ondragstart="return false;"
        >
          <div class="img-container" onselectstart="return false;" ondragstart="return false;">
            <img class="list-item" style="opacity: 0.4" :src="default_head" alt />
            <img class="list-item" :src="default_head" alt ref="img" />
            <div v-if="ifUpload" class="cover" @mousedown.self="moveCover">
              <div class="drag-point" @mousedown.self="clip"></div>
            </div>
          </div>
        </div>
        <div class="set-img">
          <div v-if="!IMG" class="img-box">
            <div class="img-container">
              <img class="list-item" :src="userInfo.head_portrait" alt />
              <span v-if="!IMG" class="change-img" @click="openPanel(6)">更换头像</span>
            </div>
          </div>
          <div v-if="IMG" class="img-box">
            <div v-if="!ifUpload" class="img-container" ref="preBox">
              <img class="list-item" :src="userInfo.head_portrait" alt ref="pre" />
            </div>
            <div v-if="ifUpload" class="img-container img-cover" ref="preBox">
              <img
                class="preview-item"
                :src="this.$store.getters.getUserInfo.head_portrait"
                alt
                ref="pre"
              />
            </div>
            <span class="preview-tip">图像预览</span>
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
      userInfo: {},
      age: "",
      musicList: [],
      collectList: [],
      socialInfo: {},
      currentPath: "",
      year: [],
      month: [],
      day: [],
      S_year: "",
      S_month: "",
      S_day: "",
      S_province: "",
      S_city: "",
      P_year: false,
      P_month: false,
      P_day: false,
      P_province: false,
      P_city: false,
      IMG: false,
      province_city: [],
      curCityList: [],
      updateInfo: {
        name: "",
        intro: "",
        sex: "",
        birthday: "",
        area: {
          province: this.S_province,
          city: this.S_city
        }
      },
      default_head: "/assets/image/default_head.png",
      ifUpload: false
    };
  },
  methods: {
    getUserInfo() {
      return this.axios({
        method: "get",
        url: "api/users/getuserinfo",
        params: {
          id: this.$route.query.id
        }
      });
    },
    getSocialInfo() {
      this.axios({
        method: "get",
        url: "api/users/getsocialinfo",
        params: {
          id: this.userInfo.id
        }
      })
        .then(res => {
          this.socialInfo = res.data;
        })
        .catch(err => {
          throw err;
        });
    },
    getSetting() {
      return this.axios({
        method: "get",
        url: "api/users/getsetting"
      });
    },
    setYear() {
      let e = event || window.event;
      this.S_year = e.target.dataset.id;
      this.updateInfo.birthday =
        this.S_year + "-" + this.S_month + "-" + this.S_day;
      this.P_year = false;
    },
    setMonth() {
      let e = event || window.event;
      this.S_month = e.target.dataset.id;
      this.P_month = false;
      this.updateInfo.birthday =
        this.S_year + "-" + this.S_month + "-" + this.S_day;
    },
    setDay() {
      let e = event || window.event;
      this.S_day = e.target.dataset.id;
      this.P_day = false;
      this.updateInfo.birthday =
        this.S_year + "-" + this.S_month + "-" + this.S_day;
    },
    setProvince() {
      let e = event || window.event;
      this.S_province = this.province_city[e.target.dataset.id].provinceName;
      this.curCityList = this.province_city[e.target.dataset.id].citys;
      this.updateInfo.area.province = this.S_province;
      this.updateInfo.area.city = this.S_city;
      this.S_city = this.curCityList[0].citysName;
      this.P_province = false;
    },
    setCity() {
      let e = event || window.event;
      this.S_city = this.curCityList[e.target.dataset.id].citysName;
      this.updateInfo.area.province = this.S_province;
      this.updateInfo.area.city = this.S_city;
      this.P_city = false;
    },
    openPanel(id) {
      if (id == 1) this.P_year = !this.P_year;
      if (id == 2) this.P_month = !this.P_month;
      if (id == 3) this.P_day = !this.P_day;
      if (id == 4) this.P_province = !this.P_province;
      if (id == 5) this.P_city = !this.P_city;
      if (id == 6) this.IMG = !this.IMG;
    },
    getAll() {
      this.axios.all([this.getUserInfo(), this.getSetting()]).then(
        this.axios.spread((res1, res2) => {
          this.userInfo = res1.data;
          this.age = new Date(this.userInfo.birthday).getFullYear();
          this.S_year = this.age;
          this.S_month = new Date(this.userInfo.birthday).getMonth() + 1;
          this.S_day = new Date(this.userInfo.birthday).getDate();
          this.S_province = this.userInfo.province;
          this.S_city = this.userInfo.city;
          this.updateInfo.sex = this.userInfo.gender;
          this.updateInfo.intro = this.userInfo.intro;
          this.updateInfo.name = this.userInfo.name;
          this.updateInfo.birthday = new Date(this.userInfo.birthday);
          this.updateInfo.area.province = this.userInfo.province;
          this.updateInfo.area.city = this.userInfo.city;
          this.year = res2.data.year;
          this.month = res2.data.month;
          this.day = res2.data.day;
          this.province_city = res2.data.city;
          this.province_city.forEach((el, i) => {
            if (el.provinceName == this.userInfo.province)
              this.curCityList = el.citys;
          });
        })
      );
    },
    setUpdateInfo() {
      this.updateInfo.id = this.userInfo.id;
      this.axios({
        method: "post",
        url: "api/users/updateuserinfo",
        data: {
          info: this.updateInfo
        }
      }).then(res => {
        if (res.data == "success") this.$Toast("更新成功!");
        else this.$Toast("错误!");
      });
    },
    openUpload() {
      this.$refs.up.click();
    },
    upload(e) {
      let file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        this.$Toast("请上传小于20M的文件!");
        e.target.value = null;
      } else {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("id", this.userInfo.id);
        this.axios({
          method: "post",
          url: "api/users/upheadimg",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            this.userInfo.head_portrait = res.data;
            this.default_head = res.data;
            this.ifUpload = true;
            this.$refs.pre.style.width = (321 / 120) * 180 + "px";
            this.$refs.pre.style.height = (319 / 120) * 180 + "px";
            this.$refs.img.style.clip = "rect(0,120px,120px,0)";
          })
          .catch(err => {});
      }
    },
    clip() {
      var event = event || window.event;
      var cover = event.target.parentNode;
      var orginleft = event.pageX;
      var orginWidth = cover.offsetWidth;
      document.onmousemove = e => {
        if (
          orginWidth + e.clientX - orginleft <= 320 &&
          orginWidth + e.clientX - orginleft >= 0
        ) {
          cover.style.width = orginWidth + e.clientX - orginleft + "px";
          cover.style.height = orginWidth + e.clientX - orginleft + "px";
          this.$refs.img.style.clip = `rect(${
            cover.offsetTop
          }px,${cover.offsetLeft + cover.offsetWidth}px,${cover.offsetTop +
            cover.offsetHeight}px, ${cover.offsetLeft}px)`;
          this.$refs.pre.style.width = (180 / cover.offsetWidth) * 321 + "px";
          this.$refs.pre.style.height = (180 / cover.offsetHeight) * 321 + "px";
        }
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
    },
    moveCover() {
      var event = event || window.event;
      var cover = event.target;
      var orginLeft = event.clientX;
      var orginHeight = event.clientY;
      var left = cover.offsetLeft;
      var top = cover.offsetTop;
      document.onmousemove = e => {
        if (
          left + e.clientX - orginLeft + cover.offsetWidth <= 319 &&
          left + e.clientX - orginLeft >= 0
        ) {
          cover.style.left = left + e.clientX - orginLeft + "px";
          this.$refs.pre.style.left =
            -(((left + e.clientX - orginLeft) * 180) / cover.offsetWidth) +
            "px";
        }
        if (
          top + e.clientY - orginHeight + cover.offsetHeight <= 322 &&
          top + e.clientY - orginHeight >= 0
        ) {
          cover.style.top = top + e.clientY - orginHeight + "px";
          this.$refs.pre.style.top =
            -(((top + e.clientY - orginHeight) * 180) / cover.offsetHeight) +
            "px";
        }
        this.$refs.img.style.clip = `rect(${
          cover.offsetTop
        }px,${cover.offsetLeft + cover.offsetWidth}px,${cover.offsetTop +
          cover.offsetHeight}px, ${cover.offsetLeft}px)`;
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
    }
  },
  created() {
    this.musicList = this.$store.getters.getUserMusicList || [];
    this.collectList = this.$store.getters.getUserCollectedList || [];
    this.currentPath = this.$route.path.replace("/user/", "");
  },
  mounted() {
    this.getAll();
    this.getSocialInfo();
  },
  filters: {
    age(vl) {
      if (vl >= 2010) return "10后";
      else if (vl < 2010 && vl >= 2000) return "00后";
      else if (vl < 2000 && vl >= 1990) return "90后";
    }
  },
  computed: {
    userMusicList() {
      return this.$store.getters.getUserMusicList;
    },
    userCollectedList() {
      return this.$store.getters.getUserCollectedList;
    },
    path() {
      return this.$route.path;
    }
  },
  watch: {
    userMusicList(val) {
      this.musicList = val;
    },
    userCollectedList(val) {
      this.collectList = val;
    },
    path(val) {
      this.currentPath = val.replace("/user/", "");
    }
  }
};
</script>

<style lang="less" scoped>
.border-line {
  padding: 40px;
  display: block;
}

.header {
  display: flex;

  .img-box {
    width: 20%;
    padding: 5px;
    border: 1px solid #ccc;
  }

  .user-info {
    flex: 1;
    padding: 10px 0 10px 30px;

    .user-name {
      display: flex;
      font-size: 24px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 15px;
      margin-bottom: 10px;

      .set-btn {
        display: block;
        margin-left: auto;
        font-size: 12px;
        border: 1px solid #ccc;
        text-align: center;
        padding: 3px 10px;
        line-height: 22px;
        border-radius: 5px;
        color: #333;
        background: linear-gradient(#fff, #f9f8eb, #dfd8c8 130%);
      }
      .set-btn:hover {
        background: linear-gradient(#fff, #fafaf1);
      }
      .set-btn:active {
        background: linear-gradient(#f9f8eb 50%, #fff);
      }

      .gender {
        margin-left: 10px;
        margin-top: 7px;
        width: 20px;
        height: 20px;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?98f8dd3b2a07613a9095db757dc5ae47)
          no-repeat 0 9999px;
      }

      .male {
        background-position: -41px -57px;
      }

      .female {
        background-position: -41px -27px;
      }
    }

    .user-soical {
      margin-bottom: 20px;
      display: flex;

      .soical-item {
        display: flex;
        border-right: 1px solid #ccc;
        flex-direction: column;
      }

      .soical-item span {
        font-size: 12px;
        color: #666;
      }

      .soical-item strong {
        font-size: 24px;
        font-weight: normal;
        cursor: pointer;
        color: #666;
      }

      .dynamic {
        width: 60px;
      }

      .follow {
        width: 70px;
        padding-left: 20px;
      }
      .fans {
        width: 70px;
        padding-left: 20px;
        border: none;
      }
    }

    .soical-info {
      .info-t {
        font-size: 12px;
        color: #666;
        margin-right: 20px;
      }
    }
  }
}

.play-list {
  margin-top: 30px;

  .list-el {
    width: 140px;
    float: left;
    margin-right: 54px;
    margin-bottom: 20px;
  }

  .list-el:nth-child(5n + 0) {
    margin: 0;
  }

  .list-box {
    position: relative;
  }
  .list-box::after {
    content: "";
    display: block;
    clear: both;
  }

  .intro {
    padding: 3px 5px;
  }

  .msk {
    background: url(https://s2.music.126.net/style/web2/img/coverall.png?5237dbf6076c71e0e24600ae03a32225)
      no-repeat;
    background-position: 0 0;
  }

  .img-container {
    width: 140px;
    padding-bottom: 140px;
  }
}

.title {
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #333;
  padding-bottom: 5px;
  border-bottom: 2px solid #337ab7;
  margin-bottom: 30px;
}

.set-box {
  display: flex;
}

.set {
  .set-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .set-title {
    font-size: 12px;
    color: #333;
    padding-right: 5px;
    display: block;
    display: block;
    height: 28px;
    line-height: 28px;
    margin-right: 5px;
  }

  .user-name {
    height: 35px;
    line-height: 35px;
    #name {
      height: 28px;
      width: 280px;
      outline: none;
      padding: 5px;
      border: 1px solid #cdcdcd;
      color: #333;
    }
  }

  .intro {
    position: relative;
    .set-title {
      align-self: start;
    }
    #intro {
      resize: none;
      width: 280px;
      height: 120px;
      outline: none;
      padding: 5px;
      border: 1px solid #cdcdcd;
      color: #333;
    }
    .num-limit {
      position: absolute;
      right: 20px;
      bottom: 5px;
      font-size: 12px;
      color: #999;
    }
  }

  .sex {
    font-size: 12px;
    input {
      margin: 0 20px 0 5px;
    }
  }

  .birthday {
    margin-bottom: 15px;
    span {
      font-size: 12px;
    }

    .day {
      display: flex;
      position: relative;
      height: 28px;
      box-shadow: inset 1px 1px 3px #999;
      margin-right: 5px;
      border-radius: 2px;
      cursor: pointer;
    }
    .com {
      margin-right: 15px;
    }
    .year {
      width: 36px;
    }
  }

  .city {
    display: flex;
    position: relative;
    height: 28px;
    box-shadow: inset 1px 1px 3px #999;
    margin-right: 20px;
    border-radius: 2px;
    cursor: pointer;

    .area {
      width: 60px;
    }
  }

  .island {
    margin-bottom: 20px;
  }

  i {
    height: 100%;
    width: 32px;
    background: url(https://s2.music.126.net/style/web2/img/sprite.png?fabd66669af927de9beaf886d0dacb74)
      no-repeat;
    background-position: -169px -47px;
  }

  .num {
    padding: 0 5px;
    border: 1px solid #ccc;
    border-right: none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    width: 16px;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
  }

  .panel {
    position: absolute;
    top: 28px;
    left: 0;
    width: 100%;
    height: 120px;
    overflow: auto;
    border: 1px solid #ccc;
    background: #fff;
    z-index: 10;
    li {
      height: 28px;
      width: 100%;
      font-size: 12px;
      line-height: 28px;
      padding-left: 8px;
      color: #999;
    }

    li:hover {
      background-color: #eee;
    }
  }

  .submit {
    display: inline-block;
    font-size: 14px;
    padding: 5px 20px;
    border: 1px solid #1965df;
    border-radius: 4px;
    color: #fbeeff;
    background: linear-gradient(#1a7beb, #1965df);
    box-shadow: inset 0 0 1px #fff, 0 0 1px #fff;
    cursor: pointer;
    margin-left: 37px;
  }
  .submit:hover {
    background: linear-gradient(#278cff, #2a77f3);
  }

  .submit:active {
    background: linear-gradient(#2b73e6, #1279ee);
  }

  .cancel {
    display: inline-block;
    font-size: 14px;
    padding: 5px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #303841;
    background: linear-gradient(#fafafa, #eeeeee);
    box-shadow: inset 0 2px 1px #fff, 0 0 1px #fff;
    cursor: pointer;
    margin-left: 20px;
  }

  .cancel:hover {
    background: linear-gradient(#fafafa, #ffffff);
  }

  .cancel:active {
    background: linear-gradient(#eeeeee, #fafafa 40%);
  }
}

.set-img {
  flex: 1;
  padding-left: 10px;
  .img-box {
    width: 24%;
  }

  .change-img {
    position: absolute;
    display: block;
    width: 100%;
    height: 26px;
    left: 0;
    bottom: 0;
    text-align: center;
    background: #333;
    opacity: 0.4;
    color: #fff;
    font-size: 12px;
    line-height: 26px;
    cursor: pointer;
  }

  .change-img:hover {
    text-decoration: underline;
  }
}

.img-preview {
  width: 362px;
  padding-right: 40px;
  border-right: 1px solid #ccc;
  margin-right: 20px;
  -webkit-user-select: none;
  .img-container {
    border: 1px solid #ccc;
  }

  .cover {
    width: 120px;
    height: 120px;
    position: absolute;
    border: 1px solid #fff;
    cursor: move;
  }
  .drag-point {
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    right: 0;
    bottom: 0;
    background-color: #000;
    cursor: se-resize;
  }
}

.up-box {
  margin-bottom: 20px;
  #headImg {
    display: none;
  }
  .upload {
    padding: 6px 20px;
    border: 1px solid #999;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .uptips {
    font-size: 10px;
    margin-left: 10px;
    color: #666;
  }
}

.preview-tip {
  display: block;
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 12px;
  padding: 5px 0;
}

.preview-item {
  position: absolute;
  width: 280px;
  height: 280px;
}

.img-cover {
  overflow: hidden;
  width: 180px;
  padding-bottom: 180px;
}
</style>